import React, { useRef, useState, useEffect } from 'react';
import { Text } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import * as THREE from 'three';

export default function WordleBox({ posX, letter, match, fontSize }) {
  const leftFaceRef = useRef();
  const topFaceRef = useRef();

  const [leftFaceText, setLeftFaceText] = useState();
  const [topFaceText, setTopFaceText] = useState();

  const [delayedPosX, setDelayedPosX] = useState(0);
  const [angleX, setAngleX] = useState(0);
  const [angleY, setAngleY] = useState(Math.PI / 2);

  useEffect(() => {
    leftFaceRef.current.rotation.y = -Math.PI / 2;
    leftFaceRef.current.position.x = -(fontSize / 2 + 0.01);

    topFaceRef.current.rotation.x = -Math.PI / 2;
    topFaceRef.current.position.y = fontSize / 2 + 0.01;
  }, [fontSize]);
  console.log(letter);

  useEffect(() => {
    setLeftFaceText(letter);
    setAngleY((current) => current - Math.PI / 2 + (letter ? Math.PI : 0));
  }, [letter]);

  const fontColor = '#FFFFFF';
  const boxColor = '#1F1F1F';

  const [topFaceColor, setTopFaceColor] = useState(boxColor);

  useEffect(() => {
    const style = getComputedStyle(document.body);

    const matchColor = new THREE.Color(
      parseInt(style.getPropertyValue('--darkendGreen').replace('#', '0x'), 16)
    );
    const closeColor = new THREE.Color(
      parseInt(style.getPropertyValue('--darkendYellow').replace('#', '0x'), 16)
    );
    const missColor = new THREE.Color(
      parseInt(style.getPropertyValue('--darkendRed').replace('#', '0x'), 16)
    );

    const updateTopFace = () => {
      setAngleX((current) => current + Math.PI / 2);
      topFaceRef.current.rotation.z = -Math.PI / 2;
      setTopFaceText(letter);
    };
    switch (match) {
      case 'match':
        updateTopFace();
        setTopFaceColor(matchColor);
        break;
      case 'close':
        updateTopFace();
        setTopFaceColor(closeColor);
        break;
      case 'miss':
        updateTopFace();
        setTopFaceColor(missColor);
        break;
      default:
    }
  }, [match, letter]);

  useEffect(() => {
    setDelayedPosX(posX);
  }, [posX]);

  const { positionX } = useSpring({
    delay: 1500,
    positionX: delayedPosX,
    config: { duration: 500 },
  });

  const { rotationX } = useSpring({
    rotationX: angleX,
    config: { duration: 500 },
  });

  const { rotationY } = useSpring({
    rotationY: angleY,
    config: { duration: 500 },
  });

  return (
    <>
      <a.mesh
        rotation-x={rotationX}
        rotation-y={rotationY}
        position-x={positionX}>
        <boxBufferGeometry args={[fontSize, fontSize, fontSize]} />
        {/* LEFT - RIGHT - TOP - BOTTOM - FRONT - BACK */}
        <meshStandardMaterial attachArray='material' color={boxColor} />
        <meshStandardMaterial attachArray='material' color={boxColor} />
        <meshStandardMaterial attachArray='material' color={topFaceColor} />
        <meshStandardMaterial attachArray='material' color={boxColor} />
        <meshStandardMaterial attachArray='material' color={boxColor} />
        <meshStandardMaterial attachArray='material' color={boxColor} />
        <Text ref={leftFaceRef} color={fontColor} fontSize={fontSize}>
          {leftFaceText}
        </Text>
        <Text ref={topFaceRef} color={fontColor} fontSize={fontSize}>
          {topFaceText}
        </Text>
      </a.mesh>
    </>
  );
}

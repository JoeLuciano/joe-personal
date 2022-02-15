import { useRef, useState, useEffect } from 'react';
import { Text } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

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

  useEffect(() => {
    setLeftFaceText(letter);

    if (letter) {
      setAngleY((current) => current + Math.PI / 2);
    } else {
      setAngleY((current) => current - Math.PI / 2);
    }
  }, [letter]);

  const fontColor = '#EC2D2D';
  const boxColor = '#2F2F2F';
  const [topFaceColor, setTopFaceColor] = useState(boxColor);

  useEffect(() => {
    const updateTopFace = () => {
      setAngleX((current) => current + Math.PI / 2);
      topFaceRef.current.rotation.z = -Math.PI / 2;
      setTopFaceText(letter);
    };
    switch (match) {
      case 'match':
        updateTopFace();
        setTopFaceColor('green');
        break;
      case 'close':
        updateTopFace();
        setTopFaceColor('yellow');
        break;
      case 'miss':
        updateTopFace();
        setTopFaceColor('red');
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

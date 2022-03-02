import WordleBox from './WordleBox';
import { useEffect, useState } from 'react';
import { useSpring, a } from '@react-spring/three';
import { Text } from '@react-three/drei';

export default function WordleRow({
  positionY,
  currentGuess,
  matchingLetters,
  fontSize,
}) {
  const [boxScale, setBoxScale] = useState(0);

  const leftMost = -(2.6 * fontSize);
  const left = -(1.3 * fontSize);
  const middle = 0 * fontSize;
  const right = 1.3 * fontSize;
  const rightMost = 2.6 * fontSize;

  useEffect(() => {
    setBoxScale(1);
  }, []);

  const { scale } = useSpring({
    delay: 800,
    scale: boxScale,
    config: { duration: 500 },
  });

  const { position } = useSpring({
    position: [0, positionY, 0],
    config: { duration: 500 },
  });

  return (
    <a.group rotation={[0, 0, 0]} scale={scale} position={position}>
      <WordleBox
        posX={leftMost}
        letter={currentGuess[0]}
        match={matchingLetters[0]}
        fontSize={fontSize}
      />
      <WordleBox
        posX={left}
        letter={currentGuess[1]}
        match={matchingLetters[1]}
        fontSize={fontSize}
      />
      <WordleBox
        posX={middle}
        letter={currentGuess[2]}
        match={matchingLetters[2]}
        fontSize={fontSize}
      />
      <WordleBox
        posX={right}
        letter={currentGuess[3]}
        match={matchingLetters[3]}
        fontSize={fontSize}
      />
      <WordleBox
        posX={rightMost}
        letter={currentGuess[4]}
        match={matchingLetters[4]}
        fontSize={fontSize}
      />
    </a.group>
  );
}

import WordleBox from './WordleBox';
import { useEffect, useState, useContext } from 'react';
import { useSpring, a } from '@react-spring/three';
import { GuessObjectsContext, GuessesContext } from 'contexts/TweedleContexts';

export default function WordleRow({ positionY }) {
  const [boxScale, setBoxScale] = useState(0);

  const { fontSize, guessCount } = useContext(GuessObjectsContext);
  const { currentGuess, matchingLetters } = useContext(GuessesContext);

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
    position: [0, (guessCount - positionY) / 1.5, 0],
    config: { duration: 500 },
  });

  const [rowGuess, setRowGuess] = useState([]);
  const [rowMatches, setRowMatches] = useState([]);

  useEffect(() => {
    const isCurrentRow = positionY === guessCount;
    if (isCurrentRow) {
      setRowGuess(currentGuess);
      setRowMatches(matchingLetters);
    }
  }, [positionY, guessCount, currentGuess, matchingLetters]);

  return (
    <a.group rotation={[0, 0, 0]} scale={scale} position={position}>
      <WordleBox
        posX={leftMost}
        letter={rowGuess[0]}
        match={rowMatches[0]}
        fontSize={fontSize}
      />
      <WordleBox
        posX={left}
        letter={rowGuess[1]}
        match={rowMatches[1]}
        fontSize={fontSize}
      />
      <WordleBox
        posX={middle}
        letter={rowGuess[2]}
        match={rowMatches[2]}
        fontSize={fontSize}
      />
      <WordleBox
        posX={right}
        letter={rowGuess[3]}
        match={rowMatches[3]}
        fontSize={fontSize}
      />
      <WordleBox
        posX={rightMost}
        letter={rowGuess[4]}
        match={rowMatches[4]}
        fontSize={fontSize}
      />
    </a.group>
  );
}

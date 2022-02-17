import React, { useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import WordleRow from './WordleRow';
import Info from './Info';
import Keyboard from 'react-simple-keyboard';
import './Tweedle.css';

export const Tweedle = ({ smartFetch }) => {
  const [guesses, setGuesses] = useState();
  const [allowInput, setAllowInput] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [currentGuess, setCurrentGuess] = useState('');
  const [matchingLetters, setMatchingLetters] = useState(Array(5).fill('none'));
  const [guessCount, setGuessCount] = useState(0);
  const [gameState, setGameState] = useState('starting');

  const fontSize = 0.5;

  document.onkeydown = handleKeyboardChange;

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  useEffect(() => {
    async function delayStart() {
      await delay(2400);
      setAllowInput(true);
    }
    delayStart();
  }, []);

  useEffect(() => {
    if (currentGuess.length === 5) {
      setAllowSubmit(true);
    } else {
      setAllowSubmit(false);
    }
  }, [currentGuess]);

  async function handleKeyboardChange(event) {
    if (allowInput) {
      if (currentGuess.length < 5 && String(event.key).length === 1) {
        const alpha_chars_only = event.key.replace(/[^a-zA-Z]/gi, '');
        setCurrentGuess((prev) => prev.concat(alpha_chars_only.toUpperCase()));
      } else if (event.key === 'Backspace') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (event.key === 'Enter') {
        allowSubmit && handleSubmit();
      }
    }
  }

  async function handleSubmit() {
    if (allowInput) {
      setGameState('playing');
      setAllowSubmit(false);
      setAllowInput(false);

      const guessResult = await smartFetch({
        url: '/api/tweedle',
        type: 'POST',
        payload: currentGuess,
      });

      if (guessResult.ok) {
        const setMatches = (index) => (prev) => {
          let currentResult = [...prev];
          currentResult.splice(index, 1, guessResult.result[index]);
          return currentResult;
        };
        for (var index = 0; index < currentGuess.length; index++) {
          setMatchingLetters(setMatches(index));
          await delay(300);
        }
        await delay(200);
        if (guessResult.result.every((element) => element === 'match')) {
          setGameState('won');
        } else if (guessCount === 5) {
          setGameState('lost');
        } else {
          setGuessCount((prev) => prev + 1);
          await delay(2400);
          setAllowInput(true);
        }
      } else {
        setAllowInput(true);
      }
    }
  }

  // UPDATE CURRENT GUESS
  useEffect(() => {
    setGuesses((prev) => {
      return {
        ...prev,
        [guessCount]: (
          <WordleRow
            key={guessCount}
            positionY={0}
            currentGuess={currentGuess}
            matchingLetters={matchingLetters}
            fontSize={fontSize}
          />
        ),
      };
    });
  }, [currentGuess, guessCount, matchingLetters]);

  // ADD NEW ROW
  useEffect(() => {
    setGuesses((prev) => {
      setCurrentGuess('');
      setMatchingLetters(Array(5).fill('none'));

      let shiftedRows = [];
      if (prev) {
        for (const rowNum in prev) {
          const row = prev[rowNum];
          const shiftedRow = React.cloneElement(row, {
            positionY: row.props.positionY + fontSize * 1.2,
          });
          shiftedRows.push(shiftedRow);
        }
      }

      return {
        ...shiftedRows,
        [guessCount]: (
          <WordleRow
            key={guessCount}
            positionY={0}
            currentGuess={[]}
            matchingLetters={[]}
            fontSize={fontSize}
          />
        ),
      };
    });
  }, [guessCount]);

  const cameraPosition = new Vector3(0, 0, 5);
  const lookAtPos = new Vector3(0, 1, 0);

  const CameraAdjustment = () => {
    useFrame((state, delta) => {
      state.camera.lookAt(lookAtPos);
    });
    return <></>;
  };

  async function handleOnScreenKeyboardChange(key) {
    if (allowInput) {
      if (currentGuess.length < 5 && String(key).length === 1) {
        const alpha_chars_only = key.replace(/[^a-zA-Z]/gi, '');
        setCurrentGuess((prev) => prev.concat(alpha_chars_only.toUpperCase()));
      } else if (key === '{bksp}') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (key === '{enter}') {
        allowSubmit && handleSubmit();
      }
    }
  }

  return (
    <>
      <Info gameState={gameState} />
      <Canvas camera={{ position: cameraPosition }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        {guesses && Object.values(guesses)}
        <OrbitControls />
        <CameraAdjustment />
      </Canvas>
      <div className='react-container'>
        <Keyboard
          onKeyPress={handleOnScreenKeyboardChange}
          display={{ '{bksp}': '⌫', '{enter}': '⏏' }}
          layout={{
            default: [
              'Q W E R T Y U I O P',
              'A S D F G H J K L',
              '{enter} Z X C V B N M {bksp}',
            ],
          }}
        />
      </div>
    </>
  );
};

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import WordleRow from './WordleRow';
import Info from './Info';
import AccountStats from './AccountStats';
import * as THREE from 'three';
import './Tweedle.css';
import { SmartFetchContext } from 'contexts/GlobalContexts';
import { OnScreenKeyboard } from './onScreenKeyboard/OnScreenKeyboard';
import {
  GuessesContext,
  HandleOnScreenKeyboardChangeContext,
} from 'contexts/TweedleContexts';

function delay(delayInms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}

const getTodayDate = () => {
  var today = new Date();
  var dd = String(today.getUTCDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  return mm + '/' + dd + '/' + yyyy;
};

export const Tweedle = () => {
  const [guessObjects, setGuessObjects] = useState(null);

  // useEffect(() => {
  //   const todaysGuess = JSON.parse(window.localStorage.getItem(getTodayDate()));
  //   if (guesses !== todaysGuess) {
  //     setGuesses(todaysGuess);
  //   }
  // }, []);

  // useEffect(() => {
  //   const todaysGuess = JSON.parse(window.localStorage.getItem(getTodayDate()));
  //   if (guesses !== todaysGuess) {
  //     window.localStorage.setItem(getTodayDate(), JSON.stringify(guesses));
  //   }
  // }, [guesses]);

  const [allowInput, setAllowInput] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [currentGuess, setCurrentGuess] = useState('');
  const [matchingLetters, setMatchingLetters] = useState(Array(5).fill('none'));
  const [guessCount, setGuessCount] = useState(0);
  const [gameState, setGameState] = useState('starting');

  const smartFetch = useContext(SmartFetchContext);

  const fontSize = 0.5;

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

  const handleSubmit = useCallback(
    async (guess) => {
      if (allowInput) {
        setGameState('playing');
        setAllowSubmit(false);
        setAllowInput(false);

        const guessResult = await smartFetch({
          url: '/api/tweedle',
          type: 'POST',
          payload: guess,
        });

        if (guessResult.ok) {
          const setMatches = (index) => (prev) => {
            let currentResult = [...prev];
            currentResult.splice(index, 1, guessResult.result[index]);
            return currentResult;
          };
          for (var index = 0; index < guess.length; index++) {
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
    },
    [smartFetch, allowInput, guessCount]
  );

  const updateCurrentGuess = useCallback(() => {
    setGuessObjects((prev) => {
      return {
        ...prev,
        [guessCount]: (
          <WordleRow
            id={`GUESSCOUNT${guessCount}`}
            key={guessCount}
            positionY={0}
            currentGuess={currentGuess}
            matchingLetters={matchingLetters}
            fontSize={fontSize}
          />
        ),
      };
    });

    if (currentGuess.length === 5) {
      setAllowSubmit(true);
    } else {
      setAllowSubmit(false);
    }
  }, [currentGuess, guessCount, matchingLetters]);

  useEffect(() => {
    updateCurrentGuess();
  }, [updateCurrentGuess]);

  const addNewRow = useCallback(() => {
    setGuessObjects((prev) => {
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

  useEffect(() => {
    addNewRow();
  }, [addNewRow]);

  // const updateGameFromPreviousSession = useCallback(
  //   async (word) => {
  //     setCurrentGuess(word);
  //     await delay(300);
  //     handleSubmit(word);
  //   },
  //   [handleSubmit]
  // );

  // useEffect(() => {
  //   updateGameFromPreviousSession('PANTS');
  // }, [updateGameFromPreviousSession]);

  const cameraPosition = new Vector3(0, 0, 6);
  const lookAtPos = new Vector3(0, 1, 0);

  const CameraAdjustment = () => {
    useFrame((state, delta) => {
      state.camera.lookAt(lookAtPos);
    });
    return <></>;
  };

  document.onkeydown = (event) => handleOnScreenKeyboardChange(event.key);

  async function handleOnScreenKeyboardChange(key) {
    if (allowInput) {
      if (key === '⌫' || key === 'Backspace') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (key === '⏏' || key === 'Enter') {
        allowSubmit && handleSubmit(currentGuess);
      } else if (currentGuess.length < 5 && key.length === 1) {
        const alpha_chars_only = key.replace(/[^a-zA-Z]/gi, '');
        setCurrentGuess((prev) => prev.concat(alpha_chars_only.toUpperCase()));
      }
    }
  }

  return (
    <>
      <Info gameState={gameState} />
      {gameState === 'won' && <AccountStats />}
      <div className='react-container'>
        <React.Suspense fallback={null}>
          <Canvas
            camera={{ position: cameraPosition }}
            onCreated={({ gl }) => {
              /* BETTER COLORS */
              gl.toneMapping = THREE.NoToneMapping;
            }}>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} />
            {guessObjects && Object.values(guessObjects)}
            <CameraAdjustment />
            <OrbitControls />
          </Canvas>
        </React.Suspense>

        <HandleOnScreenKeyboardChangeContext.Provider
          value={handleOnScreenKeyboardChange}>
          <GuessesContext.Provider value={{ matchingLetters, currentGuess }}>
            <OnScreenKeyboard />
          </GuessesContext.Provider>
        </HandleOnScreenKeyboardChangeContext.Provider>
      </div>
    </>
  );
};

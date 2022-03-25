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
import { AnimatePresence } from 'framer-motion';

const fontSize = 0.5;

const getTodayDate = () => {
  var today = new Date();
  var dd = String(today.getUTCDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  return mm + '/' + dd + '/' + yyyy;
};

export const Tweedle = () => {
  const [guesses, setGuesses] = useState(Array);
  const [guessObjects, setGuessObjects] = useState(null);
  const [allowInput, setAllowInput] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [currentGuess, setCurrentGuess] = useState('');
  const [matchingLetters, setMatchingLetters] = useState(Array(5).fill('none'));
  const [guessCount, setGuessCount] = useState(0);
  const [gameState, setGameState] = useState('playing');
  const [showAccountStats, setShowAccountStats] = useState(true);
  const [updatingFromPreviousSession, setUpdatingFromPreviousSession] =
    useState(true);

  const smartFetch = useContext(SmartFetchContext);

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const updateMatches = useCallback(async (guess, result) => {
    const setMatches = (index) => (prev) => {
      let currentResult = [...prev];
      currentResult.splice(index, 1, result[index]);
      return currentResult;
    };
    for (var index = 0; index < guess.length; index++) {
      setMatchingLetters(setMatches(index));
      await delay(300);
    }

    await delay(200);
  }, []);

  const updateGameState = useCallback(async (result) => {
    if (result.every((element) => element === 'match')) {
      setGameState('won');
      setAllowInput(false);
    } else {
      setGuessCount((prev) => prev + 1);
      await delay(2200);
      if (!updatingFromPreviousSession) {
        setAllowInput(true);
      }
    }
  }, []);

  const getGuessResult = useCallback(
    async (guess) => {
      return smartFetch({
        url: '/api/tweedle',
        type: 'POST',
        payload: guess,
      });
    },
    [smartFetch]
  );

  const submitGuess = useCallback(
    async (guess) => {
      const guessResult = await getGuessResult(guess);
      if (guessResult.ok) {
        await updateMatches(guess, guessResult.result);
        await updateGameState(guessResult.result);
      } else {
        setAllowInput(true);
      }
    },
    [updateMatches, getGuessResult, updateGameState]
  );

  const handleSubmit = useCallback(
    async (guess) => {
      if (allowInput) {
        setGuesses((prev) => [...prev, guess]);
        setAllowInput(false);
        setAllowSubmit(false);
        await submitGuess(guess);
      }
    },
    [allowInput, submitGuess]
  );

  const updateCurrentGuess = useCallback(() => {
    if (guessCount < 6) {
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

      if (currentGuess.length === 5 && !updatingFromPreviousSession) {
        setAllowSubmit(true);
      } else {
        setAllowSubmit(false);
      }
    }
  }, [currentGuess, guessCount, matchingLetters, updatingFromPreviousSession]);

  useEffect(() => {
    updateCurrentGuess();
  }, [updateCurrentGuess]);

  const updateGameFromPreviousSession = useCallback(
    async (words) => {
      for (var wordIndex = 0; wordIndex < words.length; wordIndex++) {
        const word = words[wordIndex];
        for (var i = 0; i < word.length; i++) {
          addLetterToGuess(word.charAt(i));
        }

        const guessResult = await getGuessResult(word);
        await delay(100);
        await updateMatches(word, guessResult.result);
        await updateGameState(guessResult.result);
      }
    },
    [updateMatches, getGuessResult, updateGameState]
  );

  useEffect(() => {
    async function loadPreviousSession() {
      const sessionGuesses = JSON.parse(
        window.localStorage.getItem(getTodayDate())
      );
      await delay(1800);
      if (sessionGuesses && sessionGuesses.length !== 0) {
        await updateGameFromPreviousSession(sessionGuesses);
        setGuesses(sessionGuesses);
      }
      await delay(400);
      setUpdatingFromPreviousSession(false);
      setAllowInput(true);
    }
    loadPreviousSession();
  }, [updateGameFromPreviousSession]);

  useEffect(() => {
    window.localStorage.setItem(getTodayDate(), JSON.stringify(guesses));
  }, [guesses]);

  useEffect(() => {
    function addNewRow() {
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
    }

    if (guessCount === 6) {
      setAllowInput(false);
      setGameState('lost');
    } else {
      addNewRow();
    }
  }, [guessCount]);

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
        addLetterToGuess(alpha_chars_only);
      }
    }
  }

  function addLetterToGuess(letter) {
    setCurrentGuess((prev) => prev.concat(letter.toUpperCase()));
  }

  return (
    <>
      <Info gameState={gameState} />
      <AnimatePresence>
        {gameState === 'won' && showAccountStats && (
          <AccountStats setShowAccountStats={setShowAccountStats} />
        )}
      </AnimatePresence>
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

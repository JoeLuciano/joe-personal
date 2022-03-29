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
  GuessObjectsContext,
  GuessesContext,
  HandleOnScreenKeyboardChangeContext,
} from 'contexts/TweedleContexts';
import { AnimatePresence } from 'framer-motion';

const fontSize = 0.5;

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
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
  const [allowInput, setAllowInput] = useState(false);
  const [currentGuess, setCurrentGuess] = useState('');
  const [matchingLetters, setMatchingLetters] = useState(Array(5).fill('none'));
  const [guessCount, setGuessCount] = useState(0);
  const [gameState, setGameState] = useState('playing');
  const [showAccountStats, setShowAccountStats] = useState(true);

  const smartFetch = useContext(SmartFetchContext);

  const updateMatches = useCallback(async (guess, result) => {
    const getMatchForLetter = (index) => (prev) => {
      let currentResult = [...prev];
      currentResult.splice(index, 1, result[index]);
      return currentResult;
    };
    for (var index = 0; index < guess.length; index++) {
      setMatchingLetters(getMatchForLetter(index));
      await delay(300);
    }

    await delay(200);
  }, []);

  const updateGame = useCallback(
    async (guess, result) => {
      await updateMatches(guess, result);
      if (result.every((element) => element === 'match')) {
        setGameState('won');
      } else {
        setGuessCount((prev) => prev + 1);
        setCurrentGuess('');
        setMatchingLetters(Array(5).fill('none'));
        await delay(2200);
      }
    },
    [updateMatches]
  );

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

  const handleSubmit = useCallback(
    async (guess) => {
      setAllowInput(false);
      const guessResult = await getGuessResult(guess);
      if (guessResult.ok) {
        const sessionGuesses = getSessionGuesses();
        if (sessionGuesses && sessionGuesses.length !== 0) {
          updateSessionGuesses([...sessionGuesses, guess]);
        } else {
          updateSessionGuesses([guess]);
        }
        await updateGame(guess, guessResult.result);
      }
    },
    [getGuessResult, updateGame]
  );

  useEffect(() => {
    const updateCurrentGuess = () => {
      setGuessObjects((prev) => {
        return {
          ...prev,
          [guessCount]: (
            <WordleRow
              id={`GUESSCOUNT${guessCount}`}
              key={guessCount}
              positionY={guessCount}
            />
          ),
        };
      });
    };

    async function handleGuessCountChange() {
      if (guessCount === 6) {
        setGameState('lost');
      } else {
        updateCurrentGuess();
        await delay(2200);
      }
    }

    handleGuessCountChange();
  }, [guessCount]);

  useEffect(() => {
    async function updateGameFromPreviousSession(words) {
      for (var wordIndex = 0; wordIndex < words.length; wordIndex++) {
        const word = words[wordIndex];
        for (var i = 0; i < word.length; i++) {
          addLetterToGuess(word.charAt(i));
        }

        const guessResult = await getGuessResult(word);
        await delay(100);
        await updateGame(word, guessResult.result);
      }
    }

    async function loadPreviousSession() {
      await delay(1800);
      const sessionGuesses = getSessionGuesses();
      if (sessionGuesses && sessionGuesses.length !== 0) {
        await updateGameFromPreviousSession(sessionGuesses);
        updateSessionGuesses(sessionGuesses);
      }
      await delay(400);
      setAllowInput(true);
    }

    loadPreviousSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateSessionGuesses = (guesses) => {
    window.localStorage.setItem(getTodayDate(), JSON.stringify(guesses));
  };

  const getSessionGuesses = () => {
    const currentGuesses = window.localStorage.getItem(getTodayDate());
    if (currentGuesses !== 'undefined') {
      return JSON.parse(currentGuesses);
    }
    return [];
  };

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
    if (allowInput && gameState === 'playing') {
      if (key === '⌫' || key === 'Backspace') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (key === '⏏' || key === 'Enter') {
        if (currentGuess.length === 5) {
          setAllowInput(false);
          await handleSubmit(currentGuess);
          setAllowInput(true);
        }
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
            <GuessObjectsContext.Provider value={{ fontSize, guessCount }}>
              <GuessesContext.Provider
                value={{ matchingLetters, currentGuess }}>
                {guessObjects && Object.values(guessObjects)}
              </GuessesContext.Provider>
            </GuessObjectsContext.Provider>
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

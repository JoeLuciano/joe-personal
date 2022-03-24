import styles from './KeyboardKey.module.css';
import { motion } from 'framer-motion';
import { useState, useEffect, useContext } from 'react';
import { HandleOnScreenKeyboardChangeContext } from 'contexts/TweedleContexts';

const guessVariants = {
  match: {
    backgroundColor: 'var(--key-green)',
    scale: 1.1,
  },
  close: {
    backgroundColor: 'var(--key-yellow)',
    scale: 1,
  },
  miss: { backgroundColor: 'var(--key-red)', scale: 0.7 },
  notInGuess: {
    backgroundColor: 'var(--key-white)',
    scale: 1,
  },
  inGuess: {
    backgroundColor: 'var(--key-gray)',
    scale: 0.9,
  },
};

export const KeyboardKey = ({ keySymbol, isInCurrentGuess, matchState }) => {
  const [keyState, setKeyState] = useState('notInGuess');

  const handleOnScreenKeyboardChange = useContext(
    HandleOnScreenKeyboardChangeContext
  );

  useEffect(() => {
    const isNewLetterGuess =
      keyState === 'inGuess' &&
      (matchState === 'miss' ||
        matchState === 'close' ||
        matchState === 'match');

    const isMatchFromClose = keyState === 'close' && matchState === 'match';

    if (isNewLetterGuess || isMatchFromClose) {
      setKeyState(matchState);
    } else if (keyState === 'notInGuess' && isInCurrentGuess) {
      setKeyState('inGuess');
    } else if (keyState === 'inGuess' && !isInCurrentGuess) {
      setKeyState('notInGuess');
    }
  }, [isInCurrentGuess, matchState, keyState]);

  return (
    <>
      <motion.button
        className={styles.keyboardButton}
        onClick={() => handleOnScreenKeyboardChange(keySymbol)}
        variants={guessVariants}
        animate={keyState}>
        {keySymbol}
      </motion.button>
    </>
  );
};

import { useContext } from 'react';
import styles from './OnScreenKeyboard.module.css';
import { motion } from 'framer-motion';
import { GuessesContext } from 'contexts/TweedleContexts';
import { KeyboardKey } from './keyboardKey/KeyboardKey';

const KeyboardRow = ({ keys }) => {
  const { guesses, currentGuess, matchingLetters } = useContext(GuessesContext);

  return (
    <motion.div className={styles.keyboardRow}>
      {keys.map((key) => (
        <KeyboardKey
          key={key}
          keySymbol={key}
          isInCurrentGuess={currentGuess.includes(key)}
          matchState={matchingLetters[currentGuess.indexOf(key)]}
        />
      ))}
    </motion.div>
  );
};

export const OnScreenKeyboard = () => {
  const topRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const middleRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const bottomRow = ['⏏', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'];
  return (
    <motion.div className={styles.keyboardWrapper}>
      <KeyboardRow keys={topRow} />
      <KeyboardRow keys={middleRow} />
      <KeyboardRow keys={bottomRow} />
    </motion.div>
  );
};

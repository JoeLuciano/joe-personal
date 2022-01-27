import { motion } from 'framer-motion';
import styles from './NameLogo.module.css';
import { Link } from 'react-router-dom';

const lLetter = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1,
      duration: 1.8,
    },
  },
};

const l = 'l'.split('').map((char, index) => {
  return (
    <motion.span key={char + '-' + index} variants={lLetter}>
      {char}
    </motion.span>
  );
});

const ucianoLetter = {
  hidden: {
    opacity: 0,
    y: '5rem',
    transition: {
      ease: [0.455, 0.03, 0.515, 0.955],
      duration: 0.4,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.455, 0.03, 0.515, 0.955],
      duration: 0.4,
    },
  },
};

const uciano = 'uciano'.split('').map((char, index) => {
  return (
    <motion.span key={char + '-' + index} variants={ucianoLetter}>
      {char}
    </motion.span>
  );
});

const joeVariant = {
  hidden: {
    opacity: 0,
    x: '-1rem',
  },
  visible: {
    opacity: 1,
    x: '-.1rem',
    transition: {
      duration: 1,
    },
  },
};

const lucianoVariant = {
  hidden: { y: '-1.5rem' },
  visible: {
    y: 0,
    transition: {
      delay: 1.5,
      duration: 1,
      delayChildren: 2,
      staggerChildren: 0.1,
    },
  },
};

export const NameLogo = () => (
  <motion.div className={styles['name--logo']}>
    <Link className={styles['link']} to='/home'>
      <motion.h1 className={styles['joe']} variants={joeVariant}>
        Joe
      </motion.h1>
      <motion.h1 className={styles['luciano']} variants={lucianoVariant}>
        {l}
        {uciano}
      </motion.h1>
    </Link>
  </motion.div>
);

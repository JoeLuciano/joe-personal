import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './ShimmerText.module.css';

const letterContainer = {
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letter = {
  hidden: {
    opacity: 0.4,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatDelay: 10,
    },
  },
  hover: {
    opacity: 0.2,
    transition: { duration: 1 },
  },
};

export const ShimmerAnchor = ({ text, link }) => {
  const letters = text.split('');
  return (
    <motion.a
      className={styles.shimmerAnchor}
      href={link}
      target='_blank'
      variants={letterContainer}
      initial='hidden'
      animate='visible'
      whileHover='hover'>
      {letters.map((char, index) => {
        return (
          <motion.span key={char + '-' + index} variants={letter}>
            {char}
          </motion.span>
        );
      })}
    </motion.a>
  );
};

export const ShimmerLink = ({ text, link }) => {
  const letters = text.split('');
  return (
    <Link to={link} target='_blank'>
      <motion.div
        variants={letterContainer}
        initial='hidden'
        animate='visible'
        whileHover='hover'>
        {letters.map((char, index) => {
          return (
            <motion.span key={char + '-' + index} variants={letter}>
              {char}
            </motion.span>
          );
        })}
      </motion.div>
    </Link>
  );
};

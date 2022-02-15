import { motion, AnimatePresence } from 'framer-motion';

const infoVariants = (gameState) => {
  return {
    start: {
      y: '-20rem',
      opacity: 0,
    },
    end: {
      y: '2rem',
      opacity: 1,
      backgroundColor:
        gameState === 'won'
          ? '#0bc71b'
          : gameState === 'lost'
          ? '#c90c0c'
          : '#1F1F1F',
      transition: {
        duration: 1,
      },
    },
    exit: {
      y: '-20rem',
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };
};

export default function Info({ gameState }) {
  return (
    <AnimatePresence exitBeforeEnter onExitComplete={() => null}>
      {gameState === 'starting' && (
        <motion.div className='react-container'>
          <motion.h1
            variants={infoVariants(gameState)}
            initial='start'
            animate='end'
            exit='exit'>
            You know what to do
          </motion.h1>
        </motion.div>
      )}
      {gameState === 'won' && (
        <motion.div className='react-container'>
          <motion.h1
            variants={infoVariants(gameState)}
            initial='start'
            animate='end'
            exit='exit'>
            Congrats Tweedle Dee!
          </motion.h1>{' '}
        </motion.div>
      )}
      {gameState === 'lost' && (
        <motion.div className='react-container'>
          <motion.h1
            variants={infoVariants(gameState)}
            initial='start'
            animate='end'
            exit='exit'>
            You can leave now Tweedle Dum!
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

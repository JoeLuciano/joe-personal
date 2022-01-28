import { motion, AnimatePresence } from 'framer-motion';
import styles from './Flash.module.css';
import { useState, useEffect } from 'react';

const flashVariant = {
  start: {
    y: '-200%',
    opacity: 0,
  },
  end: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: '-200%',
    opacity: 0,
  },
};

export const Flash = ({
  message,
  type = 'info',
  duration = '5000',
  setFlash,
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setShow(false);
    }, parseInt(duration));
    return () => {
      clearTimeout(timeout);
    };
  }, [duration, setFlash]);

  return (
    <AnimatePresence exitBeforeEnter={true} oxExitComplete={() => null}>
      {show && (
        <motion.div
          className={styles['flash']}
          variants={flashVariant}
          initial='start'
          animate='end'
          exit='exit'>
          <motion.div className={styles[type]}>{message}</motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

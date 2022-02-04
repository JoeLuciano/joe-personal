import PythonWheel from 'customImages/PythonWheel.svg';
import { motion } from 'framer-motion';
import { styles } from './Education.module.css';

const pythonWheel = {
  start: { x: '-120vw', y: 0, rotate: 0 },
  end: {
    x: '30vw',
    y: 0,
    rotate: 1080,
    transition: { duration: 6 },
  },
};

const pythonText = {
  hidden: { y: '-10rem', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 6 },
  },
};

export const PythonExperience = (props) => {
  return (
    <>
      {' '}
      <motion.p variants={pythonText}>
        I've been using Python for a few years now
      </motion.p>
      <motion.img
        src={PythonWheel}
        alt='PythonWheel'
        width='200'
        variants={pythonWheel}
        initial='start'
        animate='end'
      />
    </>
  );
};

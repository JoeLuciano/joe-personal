import { BasePage } from './BasePage';
import { motion } from 'framer-motion';
import PythonWheel from 'customImages/PythonWheel.svg';

const pythonWheel = {
  start: { x: '-100vw', rotate: 0 },
  end: { x: 0, y: [-100, 100, 0], rotate: 720, transition: { duration: 2 } },
};

const bounceTransition = {
  x: {
    duration: 2,
    yoyo: Infinity,
    ease: 'easeOut',
  },
  y: {
    duration: 2,
    yoyo: Infinity,
    type: 'spring',
    damping: 100,
    mass: 0.75,
    stiffness: 100,
  },
  rotate: {
    duration: 5,
    ease: 'linear',
  },
};

const bounceAnimation = {
  x: [-500, -100],
  y: [-200, 400],
  rotate: 360,
};

export const ExperiencePage = (props) => {
  return (
    <BasePage
      {...props}
      pageContent={
        <motion.img
          src={PythonWheel}
          alt='PythonWheel'
          width='200'
          // variants={test}
          transition={bounceTransition}
          animate={bounceAnimation}
        />
      }
    />
  );
};

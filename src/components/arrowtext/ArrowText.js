import './ArrowText.css';
import { motion } from 'framer-motion';

export const ArrowText = ({ mainText, subText }) => {
  return (
    <motion.div className='text-container'>
      <motion.span className='main-text'>{mainText}</motion.span>
      <motion.a
        initial={{ x: '-6.5rem', y: '1.8rem' }}
        animate={{ x: '-6.5rem', y: '1.8rem' }}
        className='sub-text'
        href='https://en.wikipedia.org/wiki/System_on_a_chip'
        target='_blank'
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.1 },
        }}>
        {subText}
      </motion.a>
    </motion.div>
  );
};

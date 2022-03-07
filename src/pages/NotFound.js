import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BasePage } from './BasePage';

export const NotFound = () => {
  return (
    <BasePage
      pageContent={
        <motion.h1>
          Your lost, head on <Link to='/home'>Home</Link>
        </motion.h1>
      }
    />
  );
};

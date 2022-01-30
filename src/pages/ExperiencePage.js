import { BasePage } from './BasePage';
import { motion } from 'framer-motion';

export const ExperiencePage = (props) => {
  return (
    <BasePage
      {...props}
      pageContent={<motion.h1>work in progress</motion.h1>}
    />
  );
};

import { Header } from '../components/pageComponents/header/Header';
import { motion } from 'framer-motion';

const experiencePage = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 3.2,
    },
  },
};

export const ExperiencePage = ({ isMobile }) => {
  return (
    <motion.div variants={experiencePage} initial='hidden' animate='visible'>
      <Header isMobile={isMobile} />
    </motion.div>
  );
};

import { Header } from '../components/pageComponents/header/Header';
import { MobileNav } from '../components/pageComponents/mobilenav/MobileNav.js';
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

export const ExperiencePage = ({ isMobile, user, headerItems, userItems }) => {
  return (
    <motion.div variants={experiencePage} initial='hidden' animate='visible'>
      <Header
        isMobile={isMobile}
        headerItems={headerItems}
        userItems={userItems}
      />
      work in progress
      <MobileNav
        isMobile={isMobile}
        headerItems={headerItems}
        userItems={userItems}
      />
    </motion.div>
  );
};

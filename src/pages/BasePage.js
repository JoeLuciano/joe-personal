import { Header } from 'components/pageComponents/header/Header';
import { MobileNav } from 'components/pageComponents/mobilenav/MobileNav.js';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { useContext } from 'react';
import { PageContext } from 'contexts/GlobalContexts';

const page = {
  hidden: { opacity: 0, x: 0 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: '100%', transition: { duration: 0.5 } },
};

const pageAppear = {
  hidden: { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 1 } },
};

export const BasePage = ({ pageContent }) => {
  const { isMobile } = useContext(PageContext);

  return (
    <motion.div
      className={styles.page}
      variants={page}
      initial='hidden'
      animate='visible'
      exit='exit'>
      <Header />
      <motion.div
        className={isMobile ? styles.mobileContent : styles.desktopContent}
        variants={pageAppear}>
        {pageContent}
      </motion.div>
      {isMobile && <MobileNav key='mobile-nav' />}
    </motion.div>
  );
};

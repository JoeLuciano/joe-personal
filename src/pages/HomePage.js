import { Header } from 'components/pageComponents/header/Header';
import { Intro } from 'components/pageComponents/intro/Intro';
import { MobileNav } from 'components/pageComponents/mobilenav/MobileNav.js';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

const homepage = {
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

export const HomePage = ({
  doAnimate = true,
  headerItems,
  userItems,
  isMobile,
}) => {
  return (
    <motion.div
      variants={homepage}
      initial={doAnimate && 'hidden'}
      animate='visible'>
      <Header
        isMobile={isMobile}
        headerItems={headerItems}
        userItems={userItems}
      />
      <motion.div className={styles.pageContent}>
        <Intro isMobile={isMobile} />
      </motion.div>
      <MobileNav
        isMobile={isMobile}
        headerItems={headerItems}
        userItems={userItems}
      />
    </motion.div>
  );
};

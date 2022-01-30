import { Header } from 'components/pageComponents/header/Header';
import { MobileNav } from 'components/pageComponents/mobilenav/MobileNav.js';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

const page = {
  hidden: { opacity: 0, x: 0 },
  visible: { opacity: 1, x: 0 },

  exit: { opacity: 0, x: '100%', transition: { duration: 0.5 } },
};

const pageAppear = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const BasePage = (props) => {
  return (
    <motion.div
      className={styles.page}
      variants={page}
      initial={props.doAnimate && 'hidden'}
      animate='visible'
      exit='exit'>
      <Header {...props} />
      <motion.div className={styles.pageContent} variants={pageAppear}>
        {props.pageContent}
      </motion.div>
      <MobileNav {...props} key='mobile-nav' />
    </motion.div>
  );
};

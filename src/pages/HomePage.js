import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { Header } from '../components/pageComponents/header/Header';
import { MobileNav } from '../components/pageComponents/mobilenav/MobileNav.js';
import { motion } from 'framer-motion';
import { ArrowText } from '../components/arrowtext/ArrowText';

const introText = {
  hidden: {
    opacity: 0,
    x: 0,
    y: '1rem',
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    tranistion: {
      duration: 2,
    },
  },
};

const intro = {
  hidden: {
    opacity: 0,
    x: 0,
    y: '1rem',
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      staggerChildren: 1,
    },
  },
};

const Intro = ({ isMobile }) => {
  return (
    <motion.div
      className={isMobile ? styles['mobile-intro'] : styles['intro']}
      variants={intro}>
      <motion.h1
        className={
          isMobile ? styles['mobile-salutation'] : styles['salutation']
        }
        variants={introText}>
        Hi!
      </motion.h1>
      <br />
      <motion.h2 variants={introText} className={styles['block-text']}>
        I'm currently a <ArrowText mainText='SoC' subText='System-on-a-Chip' />
        Design Engineer at <span style={{ color: '#2FBFEC' }}>Intel</span>{' '}
        working in Pre-Silicon Validation
      </motion.h2>
      <br />
      <motion.h2 variants={introText}>
        Check out{' '}
        <Link className={styles['link']} to='/experience'>
          Experience
        </Link>{' '}
        for some of my interests and{' '}
        <Link className={styles['link']} to='/resume'>
          Resume
        </Link>{' '}
        for official work
      </motion.h2>
      <br />
      <motion.h2 variants={introText}>
        Feel free to{' '}
        <Link className={styles['link']} to='/contact'>
          reach out
        </Link>{' '}
        too!
      </motion.h2>
    </motion.div>
  );
};

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

export const HomePage = ({ doAnimate = true, isMobile, user }) => {
  const headerItems = [
    'Experience',
    'Resume',
    'Posts',
    'Library',
    ...(user ? ['Account'] : ['Register', 'Login']),
  ];

  return (
    <motion.div
      variants={homepage}
      initial={doAnimate && 'hidden'}
      animate='visible'>
      <Header isMobile={isMobile} headerItems={headerItems} />
      <motion.div className={styles['page-content']}>
        <Intro isMobile={isMobile} />
      </motion.div>
      <MobileNav isMobile={isMobile} headerItems={headerItems} />
    </motion.div>
  );
};

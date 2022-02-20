import { ArrowText } from 'components/pageComponents/textComponents/arrowtext/ArrowText';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Intro.module.css';

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
      delayChildren: 1.5,
      staggerChildren: 1,
    },
  },
};

export const Intro = ({ isMobile }) => {
  return (
    <motion.div
      className={isMobile ? styles.mobileIntro : styles.intro}
      variants={intro}>
      <motion.h1
        className={isMobile ? styles.mobileSalutation : styles.salutation}
        variants={introText}>
        Hi!
      </motion.h1>
      <br />
      <motion.h2 variants={introText} className={styles.blockText}>
        I'm currently a <ArrowText mainText='SoC' subText='System-on-a-Chip' />
        Design Engineer at <span style={{ color: '#2FBFEC' }}>Intel</span>{' '}
        working in Pre-Silicon Validation
      </motion.h2>
      <br />
      <motion.h2 variants={introText}>
        Check out{' '}
        <Link className={styles.link} to='/experience'>
          Experience
        </Link>{' '}
        for some of my interests and{' '}
        <Link className={styles.link} to='/resume'>
          Resume
        </Link>{' '}
        for official work
      </motion.h2>
      <br />
      <motion.h2 variants={introText}>
        Feel free to{' '}
        <motion.a className={styles.link} href='mailto:joeluciano@outlook.com'>
          reach out
        </motion.a>{' '}
        too!
      </motion.h2>
    </motion.div>
  );
};

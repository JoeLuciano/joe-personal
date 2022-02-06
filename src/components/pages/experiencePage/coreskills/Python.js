import { useState, useEffect } from 'react';
import PythonWheelImage from 'customImages/PythonWheel.svg';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Python.module.css';
import { FaRegFrown } from 'react-icons/fa';
import { SiFlask } from 'react-icons/si';
import { SiKeras } from 'react-icons/si';
import { SiTensorflow } from 'react-icons/si';
import { VscCircuitBoard } from 'react-icons/vsc';

const pythonWheel = {
  start: { x: '-120vw', y: '-14rem', rotate: 0 },
  end: {
    x: '35vw',
    y: '-20rem',
    rotate: 1080,
    transition: { duration: 5 },
  },
  exit: { x: 0, y: 0, opacity: 0, scale: 3, transition: { duration: 2 } },
};

const PythonWheel = ({ showWheel }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {showWheel && (
        <motion.img
          className={styles.pythonWheel}
          src={PythonWheelImage}
          alt='PythonWheel'
          width='200'
          variants={pythonWheel}
          initial='start'
          animate='end'
          exit='exit'
        />
      )}
    </AnimatePresence>
  );
};

const pythonSection = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 6, staggerChildren: 0.3 },
  },
};

const pythonText = {
  hidden: { y: '-2rem', opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const PythonListItem = (props) => {
  const pythonLink = { scale: 1.5 };
  const Icon = props.icon ? props.icon : <></>;
  const anchorProps = props.link ? { href: props.link, target: 'blank' } : '';
  return (
    <motion.li whileHover={pythonLink}>
      <motion.a {...anchorProps}>
        {props.icon && <Icon size={'3rem'} />}
        <motion.h3>{props.main}</motion.h3>
        {props.sub}
      </motion.a>
    </motion.li>
  );
};

const PythonList = (props) => {
  return (
    <motion.ul className={styles.pythonUnorderedList} variants={pythonText}>
      <PythonListItem
        main='Tools'
        sub='Protocol Implementation and Automation'
        link=''
        icon=''
      />
      <PythonListItem
        main='Flask'
        sub='Web Framework'
        link='https://flask.palletsprojects.com/en/2.0.x/'
        icon={SiFlask}
      />
      <PythonListItem
        main='TensorFlow'
        sub='Machine Learning'
        link='https://www.tensorflow.org/'
        icon={SiTensorflow}
      />
      <PythonListItem
        main='Keras'
        sub='Deep Learning'
        link='https://keras.io/'
        icon={SiKeras}
      />
      <PythonListItem
        main='cocotb'
        sub='Hardware Verification'
        link='https://www.cocotb.org/'
        icon={VscCircuitBoard}
      />
    </motion.ul>
  );
};

const PythonBlurb = () => {
  return (
    <motion.p variants={pythonText} className={styles.pythonText}>
      Interning at Intel really taught me what software can truly do. I
      developed a few Python scripts and I continued using it in my grad courses
      for{' '}
      <motion.a href='link to education' target='blank'>
        Deep Learning
      </motion.a>{' '}
      as well as my{' '}
      <motion.a href='link to education' target='blank'>
        grad project
      </motion.a>{' '}
      . I've used it on a daily basis since and have used it in some cool{' '}
      <motion.a href='link to personal projects' target='blank'>
        projects
      </motion.a>{' '}
      . Sadly I can't share some of my proudest work{' '}
      <FaRegFrown size={'1rem'} />
    </motion.p>
  );
};

export const Python = (props) => {
  const [showWheel, setShowWheel] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowWheel(false), 5500);
    return () => clearTimeout(timer);
  }, []);
  const { isMobile } = props;
  return (
    <>
      <motion.div
        className={styles.pythonTextContainer}
        variants={pythonSection}>
        <motion.h2 className={styles.pythonHeader} variants={pythonText}>
          Python - Automation Tools and Data Processing
        </motion.h2>
        <PythonList />
        <PythonBlurb />
      </motion.div>
      <PythonWheel showWheel={showWheel} />
    </>
  );
};

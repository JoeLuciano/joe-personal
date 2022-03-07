import { useState, useEffect, useContext } from 'react';
import PythonWheelImage from 'customImages/PythonWheel.svg';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Experience.module.css';
import { SiFlask } from 'react-icons/si';
import { SiKeras } from 'react-icons/si';
import { SiTensorflow } from 'react-icons/si';
import { VscCircuitBoard } from 'react-icons/vsc';
import {
  ShimmerAnchor,
  ShimmerLink,
} from 'components/pageComponents/textComponents/shimmer/ShimmerText';
import { PageContext } from 'contexts/GlobalContexts';

const pythonWheel = {
  start: { x: '-120vw', y: '-14rem', rotate: 0 },
  end: {
    x: '35vw',
    y: '0rem',
    rotate: 1080,
    transition: { duration: 4 },
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

const section = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 6, staggerChildren: 0.3 },
  },
};

const text = {
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

const PythonList = () => {
  const { isMobile } = useContext(PageContext);

  return (
    <motion.ul
      className={isMobile ? styles.unorderedListMobile : styles.unorderedList}
      variants={text}>
      <PythonListItem
        main='Tools/Scripts'
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

const PythonBlurb = ({ setSelectedView }) => {
  return (
    <motion.div variants={text} className={styles.text}>
      Bare metal programming to such a high level program as Python has been an
      eye-opening experience. I began scripting with Python while interning at
      Intel and I continued using it in my{' '}
      <motion.span onClick={() => setSelectedView('EDUCATION')}>
        <ShimmerAnchor text='grad courses' />
      </motion.span>
      as well as my{' '}
      <motion.span onClick={() => setSelectedView('EDUCATION')}>
        <ShimmerAnchor text='masters project' />
      </motion.span>
      . I've written Python code on a daily basis since and have used it in some
      cool{' '}
      <motion.span>
        <ShimmerLink text='projects.' link='/tweedle' />
      </motion.span>
    </motion.div>
  );
};

export const Python = (props) => {
  const [showWheel, setShowWheel] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowWheel(false), 4200);
    return () => clearTimeout(timer);
  }, []);
  const { isMobile, setSelectedView } = props;
  return (
    <>
      <motion.div className={styles.textContainer} variants={section}>
        <motion.h2 className={styles.header} variants={text}>
          Python - Automation Tools and Data Processing
        </motion.h2>
        <PythonList isMobile={isMobile} />
        <PythonBlurb setSelectedView={setSelectedView} />
      </motion.div>
      <PythonWheel showWheel={showWheel} />
    </>
  );
};

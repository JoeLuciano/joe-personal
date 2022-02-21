import { motion } from 'framer-motion';
import styles from './Experience.module.css';
import { ShimmerAnchor } from 'components/pageComponents/textComponents/shimmer/ShimmerText';

const section = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 7, staggerChildren: 0.3 },
  },
};

const text = {
  hidden: { y: '-2rem', opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const Web = (props) => {
  return (
    <motion.div className={styles.textContainer} variants={section}>
      <motion.h2 className={styles.header} variants={text}>
        Web Development
      </motion.h2>

      <motion.div variants={text} className={styles.text}>
        I began learning JavaScript over a year and a half ago for one of my{' '}
        <motion.span onClick={() => props.setSelectedView('EDUCATION')}>
          <ShimmerAnchor text='Senior Capstone projects.' />
        </motion.span>
        The vibrant ecosystem and seemingly endless possibilities caught my
        attention. I took various online courses including FreeCodeCamp.org's
        suite of HTML, CSS, JavaScript, and React courses. At the end of my
        start I felt confident with the basics and had this to show for it:{' '}
        <motion.span>
          <ShimmerAnchor
            link='https://joeluciano.github.io/react-router-website/#/'
            text='GitHub Pages Website.'
          />
        </motion.span>
      </motion.div>
      <br />
      <motion.div variants={text} className={styles.text}>
        This website represents my attempt to reinforce my frontend skills while
        developing a thorough understanding of backend systems. I decided to
        build this website with Flask given how much time I've spent writing
        Python code. I feel like I've learned an extraordinary amount and have
        been able to leverage skils gained in other areas.
      </motion.div>
      <br />
      <motion.div variants={text} className={styles.text}>
        Source code:{' '}
        <motion.span>
          <ShimmerAnchor
            link='https://github.com/JoeLuciano/joe-personal'
            text='GitHub for personal website.'
          />
        </motion.span>
      </motion.div>
      <br />
      <br />
    </motion.div>
  );
};

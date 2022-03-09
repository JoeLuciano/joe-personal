import { motion } from 'framer-motion';
import styles from './ExpandButton.module.css';

export const ExpandButton = ({
  togglePost,
  bigView,
  width = 20,
  height = 20,
}) => {
  return (
    <motion.button
      onClick={() => togglePost()}
      animate={bigView ? 'open' : 'closed'}
      className={styles.expandButton}>
      <motion.svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}>
        <Path
          variants={{
            closed: {
              d: `M ${width * 0.1} ${height / 2}
                  L ${width / 2} ${height * 0.9}`,
              transition: {
                duration: 0.5,
              },
            },
            open: {
              d: `M ${width * 0.1} ${height / 2} L ${width / 2} ${
                height * 0.1
              }`,
              transition: {
                duration: 0.5,
              },
            },
          }}
        />
        <Path
          variants={{
            closed: {
              d: `M ${width * 0.9} ${height / 2}
                  L ${width / 2} ${height * 0.9}`,
              transition: {
                duration: 0.5,
              },
            },
            open: {
              d: `M ${width * 0.9} ${height / 2} L ${width / 2} ${
                height * 0.1
              }`,
              transition: {
                duration: 0.5,
              },
            },
          }}
        />
      </motion.svg>
    </motion.button>
  );
};

const Path = (props) => (
  <motion.path
    fill='transparent'
    strokeWidth='3'
    stroke='hsl(0, 0%, 18%)'
    strokeLinecap='round'
    {...props}
  />
);

import { motion } from 'framer-motion';
import styles from './Selector.module.css';

const ViewButton = ({ name, onClick }) => {
  return (
    <motion.button className={styles.btn} onClick={onClick}>
      <motion.h1>{name}</motion.h1>
    </motion.button>
  );
};

export const Selector = ({ views, setSelectedView }) => {
  return (
    <motion.div>
      {views.map((name) => (
        <ViewButton
          key={name}
          name={name}
          onClick={() => {
            setSelectedView(name);
          }}
        />
      ))}
    </motion.div>
  );
};

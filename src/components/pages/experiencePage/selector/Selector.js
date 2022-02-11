import { motion } from 'framer-motion';
import styles from './Selector.module.css';

const buttonVariant = {
  unselected: {
    backgroundColor: 'rgb(0, 0, 0, 0.1)',
    boxShadow: '0px',
  },
  selected: {
    color: 'rgb(240, 240, 240)',
    backgroundColor: 'rgb(22, 148, 66)',
    boxShadow: '1px 1px 4px 2px rgba(0, 0, 0, 1)',
    transition: {
      duration: 0.5,
    },
  },
};

const ViewButton = ({ name, selectedView, onClick }) => {
  const isActive = selectedView === name;
  return (
    <motion.button
      className={styles.btn}
      variants={buttonVariant}
      animate={isActive ? 'selected' : 'unselected'}
      onClick={onClick}>
      {name}
    </motion.button>
  );
};

export const Selector = ({ views, selectedView, setSelectedView }) => {
  return (
    <motion.div className={styles.selector}>
      {views.map((name) => (
        <ViewButton
          key={name}
          name={name}
          selectedView={selectedView}
          onClick={() => {
            setSelectedView(name);
          }}
        />
      ))}
    </motion.div>
  );
};

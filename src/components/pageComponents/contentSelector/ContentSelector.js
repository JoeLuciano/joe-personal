import { motion, AnimateSharedLayout } from 'framer-motion';
import styles from './ContentSelector.module.css';

const selectorColors = {
  PERSONAL: '#0099ff',
  PROFESSIONAL: '#909090',
  EDUCATION: '#169442',
};

const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};

function Selector({ name, color, isSelected, onClick }) {
  return (
    <motion.li
      className={styles.selector}
      onClick={onClick}
      style={{ backgroundColor: color, boxShadow: `0 0 7px 1px ${color}` }}>
      {isSelected && (
        <motion.div
          layoutId='selectedView'
          className={styles.outline}
          initial={false}
          animate={{ borderColor: color }}
          transition={spring}></motion.div>
      )}
      <motion.h2>{name}</motion.h2>
    </motion.li>
  );
}

export const ContentSelector = (props) => {
  return (
    <AnimateSharedLayout>
      <motion.div
        id='experienceContentSelectorWrapper'
        className={styles.contentSelectorWarpper}>
        <motion.ul className={styles.selectorList}>
          {props.views.map((view) => (
            <Selector
              key={view}
              name={view}
              color={selectorColors[view]}
              isSelected={props.selectedView === view}
              onClick={() => props.setSelectedView(view)}
            />
          ))}
        </motion.ul>
      </motion.div>
    </AnimateSharedLayout>
  );
};

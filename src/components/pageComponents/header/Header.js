import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { NameLogo } from '../nameLogo/NameLogo';
import { motion } from 'framer-motion';

const headerVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const headerItemsVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.4,
      staggerChildren: 0.2,
    },
  },
};

const headerItem = {
  hidden: {
    opacity: 0,
    x: '-1rem',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
};

const HeaderLinks = ({ headerItems }) => {
  return (
    <motion.div
      className={styles['header-items']}
      variants={headerItemsVariant}>
      {headerItems.map((item) => (
        <Link
          key={item}
          to={`/${item.toLowerCase()}`}
          className={styles['header-item']}>
          <motion.h3
            variants={headerItem}
            whileHover={{
              scale: 1.5,
            }}>
            {item}
          </motion.h3>
        </Link>
      ))}
    </motion.div>
  );
};

const UserLinks = ({ userItems }) => {
  return (
    <motion.div className={styles['user-items']} variants={headerItemsVariant}>
      {userItems.map((item) => (
        <Link
          key={item}
          to={`/${item.toLowerCase()}`}
          className={styles['user-item']}>
          <motion.h3
            variants={headerItem}
            whileHover={{
              scale: 1.5,
            }}>
            {item}
          </motion.h3>
        </Link>
      ))}
    </motion.div>
  );
};

export const Header = ({
  isMobile = false,
  setFlash,
  headerItems,
  userItems,
}) => {
  return (
    <motion.div className={styles['header']} variants={headerVariant}>
      <NameLogo />
      {!isMobile && <HeaderLinks headerItems={headerItems} />}
      {!isMobile && <UserLinks userItems={userItems} />}
    </motion.div>
  );
};

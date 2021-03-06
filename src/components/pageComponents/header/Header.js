import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { NameLogo } from '../nameLogo/NameLogo';
import { motion } from 'framer-motion';
import { UserContext, PageContext } from 'contexts/GlobalContexts';

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

const HeaderLinks = () => {
  const { headerItems } = useContext(PageContext);
  return (
    <motion.div className={styles.headerItems} variants={headerItemsVariant}>
      {headerItems.map((item) => (
        <Link
          key={item}
          to={`/${item.toLowerCase()}`}
          className={styles.headerItem}>
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

const UserLinks = () => {
  const { userItems } = useContext(UserContext);

  return (
    <motion.div className={styles.userItems} variants={headerItemsVariant}>
      {userItems.map((item) => (
        <Link
          key={item}
          to={`/${item.toLowerCase()}`}
          className={styles.userItem}>
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

export const Header = () => {
  const { isMobile } = useContext(PageContext);

  return (
    <motion.div className={styles.header} variants={headerVariant}>
      <NameLogo />
      {!isMobile && <HeaderLinks />}
      {!isMobile && <UserLinks />}
    </motion.div>
  );
};

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './MobileNav.module.css';

const navItemsVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.4,
      staggerChildren: 0.2,
    },
  },
};

const navItem = {
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

const MobileHeaderLinks = ({ navItems }) => {
  return (
    <motion.div className={styles.mobileHeaderItems} variants={navItemsVariant}>
      {navItems.map((item) => (
        <Link
          key={item}
          to={`/${item.toLowerCase()}`}
          className={styles.mobileHeaderItem}>
          <motion.h3
            variants={navItem}
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

const mobileNavVariant = {
  offScreen: { x: '10rem' },
  onScreen: { x: 0 },
};

const posX = `calc(var(--nav-width) - var(--button-position-right) - var(--button-width)/2)`;
const posY = `calc(var(--nav-height) - var(--button-position-bottom) - var(--button-height)/2)`;

const mobileNavViewVariant = {
  open: {
    clipPath: `circle(30rem at ${posX} ${posY})`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: `circle(1.5rem at ${posX} ${posY})`,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
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

export const MobileNav = ({ isMobile, headerItems, userItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    isMobile && (
      <motion.div
        className={styles.mobileNav}
        variants={mobileNavVariant}
        initial='offScreen'
        animate={show && 'onScreen'}>
        <motion.div
          className={styles.mobileNavContents}
          variants={mobileNavViewVariant}
          animate={isOpen ? 'open' : 'closed'}>
          <motion.button
            className={styles.mobileNavButton}
            onClick={() => setIsOpen((prev) => !prev)}>
            <motion.svg width='23' height='23' viewBox='0 0 23 23'>
              <Path
                variants={{
                  closed: { d: 'M 2 2.5 L 20 2.5' },
                  open: { d: 'M 3 16.5 L 17 2.5' },
                }}
              />
              <Path
                d='M 2 9.423 L 20 9.423'
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
              />
              <Path
                variants={{
                  closed: { d: 'M 2 16.346 L 20 16.346' },
                  open: { d: 'M 3 2.5 L 17 16.346' },
                }}
              />
            </motion.svg>
          </motion.button>
          {isOpen && (
            <MobileHeaderLinks navItems={headerItems.concat(userItems)} />
          )}
        </motion.div>
      </motion.div>
    )
  );
};

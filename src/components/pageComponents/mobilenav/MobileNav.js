import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './MobileNav.module.css';

const navItemsVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const navItem = {
  hidden: {
    opacity: 0,
    x: '-1rem',
    y: '-1rem',
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const MobileHeaderLinks = ({ navItems }) => {
  return (
    <motion.div
      className={styles.mobileHeaderItems}
      variants={navItemsVariant}
      initial='hidden'
      animate='visible'>
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

const posX = `calc( - var(--button-width)/2)`;
const posY = `calc( - var(--button-height)/2)`;

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
    clipPath: `circle(2rem at ${posX} ${posY})`,
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

  let leftConstraint = 0;
  let topConstraint = 0;
  const mobileNavObject = document.getElementById('mobilenav');
  if (mobileNavObject) {
    leftConstraint = -window.innerWidth + mobileNavObject.offsetWidth * 1.2;
    topConstraint = -window.innerHeight + mobileNavObject.offsetHeight * 1.5;
  }

  const mobileNavVariant = {
    offScreen: {
      width: isOpen ? 'var(--nav-width)' : 'var(--button-width)',
      height: isOpen ? 'var(--nav-height)' : 'var(--button-height)',
      x: '10rem',
      transition: { duration: 1, delayChildren: 5 },
    },
    onScreen: {
      width: isOpen ? 'var(--nav-width)' : 'calc(var(--button-width) + 1rem)',
      height: isOpen
        ? 'var(--nav-height)'
        : 'calc(var(--button-height) + 1rem)',
      x: 0,
    },
  };

  return (
    isMobile && (
      <motion.div
        id='mobilenav'
        drag
        dragConstraints={{
          left: leftConstraint,
          top: topConstraint,
          right: 10,
          bottom: 10,
        }}
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
          <AnimatePresence>
            {isOpen && (
              <MobileHeaderLinks navItems={headerItems.concat(userItems)} />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    )
  );
};

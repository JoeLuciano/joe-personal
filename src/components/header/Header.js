import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
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

const headerItems = ['Experience', 'Resume', 'Posts', 'Library'];

const HeaderLinks = () => {
  return (
    <motion.div className='header-items' variants={headerItemsVariant}>
      {headerItems.map((item) => (
        <Link key={item} to={`/${item.toLowerCase()}`} className='header-item'>
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

const MobileHeaderLinks = () => {
  return (
    <motion.div className='mobile-header-items' variants={headerItemsVariant}>
      {headerItems.map((item) => (
        <Link
          key={item}
          to={`/${item.toLowerCase()}`}
          className='mobile-header-item'>
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

const headerBackground = {
  open: (height = 100) => ({
    clipPath: `circle(${height * 2 + 200}px at 50% 90%)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(1.5rem at 50% 85%)',
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

const MenuToggle = ({ toggle }) => (
  <motion.button className='mobile-header-button' onClick={toggle}>
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
);

const HeaderMenu = ({ isOpen, toggle }) => {
  return (
    <motion.div
      className='mobile-header'
      initial={{ x: '50rem' }}
      animate={{ x: 0, transition: { delay: 1, duration: 1 } }}>
      <motion.div
        className='mobile-header-background'
        variants={headerBackground}
        animate={isOpen ? 'open' : 'closed'}>
        {isOpen && <MobileHeaderLinks />}
        <MenuToggle styles={{ position: 'absolute' }} toggle={toggle} />
      </motion.div>
    </motion.div>
  );
};

export const Header = ({ isMobile = false, doAnimate }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [show, setShow] = useState(!doAnimate);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div className='header' variants={headerVariant}>
      <Link className='logo' to='/home'>
        <NameLogo />
      </Link>
      {isMobile ? (
        show && (
          <HeaderMenu
            isOpen={isOpen}
            toggle={() => setIsOpen((isOpen) => !isOpen)}
          />
        )
      ) : (
        <HeaderLinks />
      )}
    </motion.div>
  );
};

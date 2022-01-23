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

export const Header = ({ isMobile = false, doAnimate }) => {
  return (
    <motion.div className='header' variants={headerVariant}>
      <Link className='logo' to='/home'>
        <NameLogo />
      </Link>
      {!isMobile && <HeaderLinks />}
    </motion.div>
  );
};

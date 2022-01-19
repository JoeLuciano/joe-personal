import { Link } from 'react-router-dom';
import './Header.css';
import { NameLogo } from '../nameLogo/NameLogo';
import { motion } from 'framer-motion';

const headerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.7,
    },
  },
};

const headerItemsVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
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
const HeaderLinks = headerItems.map((item) => (
  <Link to={`/${item.toLowerCase()}`} className='headerItem'>
    <motion.h3
      variants={headerItem}
      whileHover={{
        scale: 1.5,
        textShadow: '0px 0px 1px gray',
      }}>
      {item}
    </motion.h3>
  </Link>
));

export const Header = () => (
  <motion.div className='header' variants={headerVariant}>
    <Link className='logo' to='/home'>
      <NameLogo />
    </Link>
    <motion.div className='headerItems' variants={headerItemsVariant}>
      {HeaderLinks}
    </motion.div>
  </motion.div>
);

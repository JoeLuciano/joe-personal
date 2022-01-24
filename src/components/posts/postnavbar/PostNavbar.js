import { motion } from 'framer-motion';
import styles from './PostNavbar.module.css';
import { useState, useEffect } from 'react';

export const PostNavbar = ({ isMobile, document }) => {
  return (
    <motion.div className={styles['navbar']}>
      <motion.div className={styles['navbar-content']}>
        This will be a 'nav' 'bar'
      </motion.div>
    </motion.div>
  );
};

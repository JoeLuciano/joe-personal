import { motion } from 'framer-motion';
import styles from './PostNavbar.module.css';
import { useState, useEffect } from 'react';

export const PostNavbar = ({ isMobile, document }) => {
  const [todo, setTodo] = useState({});

  useEffect(() => {
    fetch(`/api/todolist/Implement Firestore DB`, {
      method: 'GET',
      headers: { 'content-type': 'application/json; charset=UTF-8' },
    })
      .then((respone) => respone.json())
      .then((data) => {
        setTodo(data);
      });
  }, [document]);

  return (
    <motion.div className={styles['navbar']}>
      <motion.div>This will be a 'nav' 'bar'</motion.div>
    </motion.div>
  );
};

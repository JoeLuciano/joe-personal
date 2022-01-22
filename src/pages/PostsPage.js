import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { PostCard } from '../components/postcard/PostCard';
import { motion } from 'framer-motion';

const Posts = ({ isMobile }) => {
  const [getMessage, setGetMessage] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setGetMessage(data);
      });
  }, []);

  return <motion.div></motion.div>;
};

const postPage = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const PostsPage = ({ doAnimate = true, isMobile }) => {
  return (
    <motion.div
      variants={postPage}
      initial={doAnimate && 'hidden'}
      animate='visible'>
      <Header isMobile={isMobile} doAnimate={doAnimate} />
      <motion.div className={styles['page-content']}>
        <PostCard isMobile={isMobile} />
      </motion.div>
    </motion.div>
  );
};

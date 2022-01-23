import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Header } from '../components/pageComponents/header/Header';
import { PostCard } from '../components/posts/postcard/PostCard';
import { PostNavbar } from '../components/posts/postnavbar/PostNavbar';
import { MobileNav } from '../components/pageComponents/mobilenav/MobileNav.js';
import { motion } from 'framer-motion';

const Posts = (isMobile) => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    fetch(`/api/posts`, {
      method: 'GET',
      headers: { 'content-type': 'application/json; charset=UTF-8' },
    })
      .then((respone) => respone.json())
      .then((data) => {
        setAllPosts(data);
      });
  }, []);

  return (
    <motion.div className={styles['posts']}>
      {allPosts.map((post, index) => {
        return <PostCard key={index} isMobile={isMobile} data={post} />;
      })}
    </motion.div>
  );
};

const postPage = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const PostsPage = ({ doAnimate = true, isMobile }) => {
  return (
    <motion.div
      className={styles['page']}
      variants={postPage}
      initial={doAnimate && 'hidden'}
      animate='visible'>
      <Header isMobile={isMobile} doAnimate={doAnimate} />
      <motion.div className={styles['page-content']}>
        <motion.div className={styles['posts-page']}>
          <PostNavbar isMobile={isMobile} />
          {Posts(isMobile)}
        </motion.div>
      </motion.div>
      <MobileNav isMobile={isMobile} />
    </motion.div>
  );
};

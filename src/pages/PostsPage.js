import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import { Header } from '../components/pageComponents/header/Header';
import { PostCard } from '../components/posts/postcard/PostCard';
import { PostView } from '../components/posts/postview/PostView';
import { PostNavbar } from '../components/posts/postnavbar/PostNavbar';
import { MobileNav } from '../components/pageComponents/mobilenav/MobileNav.js';
import { motion } from 'framer-motion';

const Post = (isMobile, title) => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch(`/api/posts?title=${title}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json; charset=UTF-8' },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setPost(data[0]);
        } else {
          setPost({ title: 'INVALID POST' });
        }
      });
  }, [title]);

  if (post.title === 'INVALID POST') {
    return <motion.h1>INVALID POST</motion.h1>;
  } else {
    return <PostView isMobile={isMobile} data={post} />;
  }
};

const AllPosts = (isMobile) => {
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
  const { search } = useLocation();
  let query = useMemo(() => new URLSearchParams(search), [search]);
  const currentTitle = query.get('title');
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
          {currentTitle ? Post(isMobile, currentTitle) : AllPosts(isMobile)}
        </motion.div>
      </motion.div>
      <MobileNav isMobile={isMobile} />
    </motion.div>
  );
};

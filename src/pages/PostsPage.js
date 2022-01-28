import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import { Header } from 'components/pageComponents/header/Header';
import { PostCard } from 'components/posts/postcard/PostCard';
import { PostView } from 'components/posts/postview/PostView';
import { CreatePostForm } from 'components/formComponents/createPostForm/CreatePostForm';
import { MobileNav } from 'components/pageComponents/mobilenav/MobileNav';
import { motion } from 'framer-motion';

const Post = (isMobile, title) => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch(`/api/posts?title=${title}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
      },
    }).then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        const error = data || data.message || response.statusText;
        console.log(error);
      } else {
        console.log(data);
        if (data) {
          setPost(data[0]);
        } else {
          setPost({ title: 'INVALID POST' });
        }
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
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        Accept: 'application/json',
      },
    }).then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        const error = data || data.message || response.statusText;
        console.log(error);
      } else {
        console.log(data);
        setAllPosts(data);
      }
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

export const PostsPage = ({
  doAnimate = true,
  isMobile,
  headerItems,
  userItems,
}) => {
  const { search } = useLocation();
  let query = useMemo(() => new URLSearchParams(search), [search]);
  const currentTitle = query.get('title');
  return (
    <motion.div
      className={styles['page']}
      variants={postPage}
      initial={doAnimate && 'hidden'}
      animate='visible'>
      <Header
        isMobile={isMobile}
        doAnimate={doAnimate}
        headerItems={headerItems}
        userItems={userItems}
      />
      <motion.div className={styles['page-content']}>
        <motion.div className={styles['posts-page']}>
          {currentTitle ? Post(isMobile, currentTitle) : AllPosts(isMobile)}
        </motion.div>
      </motion.div>
      <CreatePostForm />
      <MobileNav
        isMobile={isMobile}
        headerItems={headerItems}
        userItems={userItems}
      />
    </motion.div>
  );
};

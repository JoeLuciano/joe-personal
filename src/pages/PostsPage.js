import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Header } from 'components/pageComponents/header/Header';
import { PostCard } from 'components/postComponents/postcard/PostCard';
import { CreatePostForm } from 'components/formComponents/createPostForm/CreatePostForm';
import { MobileNav } from 'components/pageComponents/mobilenav/MobileNav';
import { motion } from 'framer-motion';

const AllPosts = (isMobile, allPosts) => {
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
  setFlash,
}) => {
  const [allPosts, setAllPosts] = useState([]);

  const getAllPosts = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    fetch('/api/posts', requestOptions).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error = data || data.message || response.statusText;
        console.log(error);
      } else {
        console.log(data);
        setAllPosts(data);
      }
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

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
          {AllPosts(isMobile, allPosts)}
        </motion.div>
        <CreatePostForm setFlash={setFlash} getAllPosts={getAllPosts} />
      </motion.div>
      <MobileNav
        isMobile={isMobile}
        headerItems={headerItems}
        userItems={userItems}
      />
    </motion.div>
  );
};

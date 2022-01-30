import { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';
import { Header } from 'components/pageComponents/header/Header';
import { PostCard } from 'components/postComponents/postcard/PostCard';
import { CreatePostForm } from 'components/formComponents/createPostForm/CreatePostForm';
import { MobileNav } from 'components/pageComponents/mobilenav/MobileNav';
import { motion } from 'framer-motion';

const AllPosts = (isMobile, allPosts) => {
  console.log(allPosts);
  return (
    <motion.div className={styles.posts}>
      {!allPosts[0] && <motion.h1>No Posts... Why not post one?</motion.h1>}
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
  smartFetch,
}) => {
  const [allPosts, setAllPosts] = useState([]);

  const getAllPosts = useCallback(async () => {
    const allPostsResponse = await smartFetch('/api/allposts', 'GET');
    if (allPostsResponse.ok) {
      setAllPosts(allPostsResponse.result);
    } else {
      setAllPosts([{ title: 'ERROR: Could not get posts' }]);
    }
  }, [smartFetch]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <motion.div
      className={styles.page}
      variants={postPage}
      initial={doAnimate && 'hidden'}
      animate='visible'>
      <Header
        isMobile={isMobile}
        doAnimate={doAnimate}
        headerItems={headerItems}
        userItems={userItems}
      />
      <motion.div className={styles.pageContent}>
        <motion.div className={styles.postsPage}>
          {AllPosts(isMobile, allPosts)}
        </motion.div>
        <CreatePostForm
          setFlash={setFlash}
          getAllPosts={getAllPosts}
          smartFetch={smartFetch}
        />
      </motion.div>
      <MobileNav
        isMobile={isMobile}
        headerItems={headerItems}
        userItems={userItems}
      />
    </motion.div>
  );
};

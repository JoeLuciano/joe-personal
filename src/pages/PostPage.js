import { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';
import { Header } from 'components/pageComponents/header/Header';
import { MobileNav } from 'components/pageComponents/mobilenav/MobileNav';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { PostView } from 'components/postComponents/postview/PostView';

const postPage = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const PostPage = ({
  doAnimate = true,
  isMobile,
  headerItems,
  userItems,
  setFlash,
  smartFetch,
}) => {
  const [post, setPost] = useState([]);
  const { title } = useParams();

  const getPost = useCallback(async () => {
    const postResponse = await smartFetch(`/api/post/${title}`, 'GET');
    if (postResponse.ok) {
      setPost(postResponse.result);
    } else {
      setPost([{ title: 'ERROR: Could not get post' }]);
    }
  }, [smartFetch, title]);

  useEffect(() => {
    getPost();
  }, [getPost]);

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
          <PostView
            isMobile={isMobile}
            data={post}
            setFlash={setFlash}
            smartFetch={smartFetch}
          />
        </motion.div>
      </motion.div>
      <MobileNav
        isMobile={isMobile}
        headerItems={headerItems}
        userItems={userItems}
      />
    </motion.div>
  );
};

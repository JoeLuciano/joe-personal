import { useState, useEffect } from 'react';
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
}) => {
  const [post, setPost] = useState([]);
  const { title } = useParams();

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    fetch(`/api/post/${title}`, requestOptions).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error = data || data.message || response.statusText;
        console.log(error);
      } else {
        console.log(data);
        setPost(data);
      }
    });
  }, [title]);

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
          <PostView isMobile={isMobile} data={post} setFlash={setFlash} />
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

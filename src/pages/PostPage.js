import { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';
import { BasePage } from './BasePage';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { PostView } from 'components/postComponents/postview/PostView';

export const PostPage = (props) => {
  const [post, setPost] = useState([]);
  const { title } = useParams();
  const { smartFetch } = props;
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
    <BasePage
      {...props}
      pageContent={
        <motion.div className={styles.postsPage}>
          <PostView {...props} data={post} />
        </motion.div>
      }
    />
  );
};

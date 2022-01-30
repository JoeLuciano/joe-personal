import { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';
import { BasePage } from './BasePage';
import { PostCard } from 'components/postComponents/postcard/PostCard';
import { CreatePostForm } from 'components/formComponents/createPostForm/CreatePostForm';
import { motion } from 'framer-motion';

const AllPosts = (isMobile, allPosts) => {
  return (
    <motion.div className={styles.posts}>
      {!allPosts[0] && <motion.h1>No Posts... Why not post one?</motion.h1>}
      {allPosts.map((post, index) => {
        return <PostCard key={index} isMobile={isMobile} data={post} />;
      })}
    </motion.div>
  );
};

export const PostsPage = (props) => {
  const [allPosts, setAllPosts] = useState([]);
  const { smartFetch } = props;
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
    <BasePage
      {...props}
      pageContent={
        <motion.div className={styles.postsPage}>
          {AllPosts(props.isMobile, allPosts)}
          <CreatePostForm {...props} getAllPosts={getAllPosts} />
        </motion.div>
      }
    />
  );
};

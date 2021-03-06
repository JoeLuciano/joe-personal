import { useState, useEffect, useCallback, useContext } from 'react';
import { PostCard } from 'components/postComponents/postcard/PostCard';
import { CreatePostForm } from 'components/formComponents/createPostForm/CreatePostForm';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './PostView.module.css';
import { SmartFetchContext } from 'contexts/GlobalContexts';

export const PostView = (props) => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState();

  const smartFetch = useContext(SmartFetchContext);

  const getAllPosts = useCallback(async () => {
    const allPostsResponse = await smartFetch({
      url: '/api/allposts',
      type: 'GET',
    });
    if (allPostsResponse.ok) {
      setAllPosts(allPostsResponse.result);
    } else {
      setAllPosts([{ title: 'ERROR: Could not get posts' }]);
    }
  }, [smartFetch]);

  const removePost = (title) => {
    setAllPosts((prev) => prev.filter((post) => post.title !== title));
  };

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <motion.div className={styles.posts}>
      <AnimatePresence>
        {!allPosts[0] && <motion.h1>No Posts... Why not post one?</motion.h1>}
        {allPosts &&
          allPosts.map((post, index) => {
            const postCardProps = {
              key: index,
              data: post,
              ...props,
              removePost: () => removePost(post.title),
              togglePost:
                currentPost === post
                  ? () => setCurrentPost(undefined)
                  : () => setCurrentPost(post),
              bigView: currentPost === post,
            };
            return <PostCard {...postCardProps} />;
          })}
      </AnimatePresence>
      <CreatePostForm {...props} getAllPosts={getAllPosts} />
    </motion.div>
  );
};

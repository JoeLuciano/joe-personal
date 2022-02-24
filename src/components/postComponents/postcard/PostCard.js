import { useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './PostCard.module.css';

const postCardVariants = {
  small: { opacity: 1, height: '5.5rem' },
  big: { opacity: 1, height: 'auto' },
};

const PostCreationInfo = ({ image, author, date }) => {
  const relevantDate = new Date(date).toLocaleDateString();
  return (
    <motion.div className={styles['post-creation-info']}>
      <motion.img className={styles['pfp']} src={image} alt='test' />
      <motion.h3>
        Created by {author} on {relevantDate}
      </motion.h3>
    </motion.div>
  );
};

const PostContentInfo = ({ title, body }) => {
  return (
    <motion.div className={styles['post-content-info']}>
      <motion.div className={styles['post-content-info-text']}>
        <motion.h1>{title}</motion.h1>
        <motion.p>{body}</motion.p>
      </motion.div>
    </motion.div>
  );
};

export const PostCard = ({
  isMobile,
  data,
  user,
  smartFetch,
  bigView,
  removePost,
  togglePost,
}) => {
  const [postImage, setPostImage] = useState();
  const [userPfp, setUserPfp] = useState();

  const deletePost = useCallback(async () => {
    const deleteResponse = await smartFetch({
      url: '/api/post/delete',
      type: 'POST',
      payload: {
        title: data.title,
      },
    });
    if (deleteResponse.ok) {
      removePost();
    }
  }, [smartFetch, data.title, removePost]);

  useEffect(() => {
    async function getPostImage() {
      const imageResponse = await smartFetch({
        url: `/api/image/get/${data.image_file}`,
        type: 'GET',
        is_image: true,
      });
      if (imageResponse.ok) {
        setPostImage(imageResponse.result);
      }
    }
    if (data.image_file) {
      getPostImage();
    }
  }, [smartFetch, data.image_file]);

  useEffect(() => {
    async function getUserPfp() {
      const imageResponse = await smartFetch({
        url: `/api/image/get/${user.image_file}`,
        type: 'GET',
        is_image: true,
      });
      if (imageResponse.ok) {
        setUserPfp(imageResponse.result);
      }
    }
    if (user.image_file) {
      getUserPfp();
    }
  }, [smartFetch, user.image_file]);

  return (
    <motion.div
      className={styles.postcardWrapper}
      whileHover={{ boxShadow: '1px 4px 20px rgba(50, 50, 0, 0.5)' }}>
      <motion.img className={styles.postImage} src={postImage} alt='' />
      <motion.div
        className={styles.postcard}
        animate={bigView ? 'big' : 'small'}
        variants={postCardVariants}>
        <PostCreationInfo
          image={userPfp}
          author={data.author}
          date={data.date_posted}
        />
        <PostContentInfo title={data.title} body={data.content} />
      </motion.div>
      <motion.button onClick={() => togglePost()}>Expand</motion.button>
      {user.username === data.author && (
        <motion.button onClick={() => deletePost()}>Delete</motion.button>
      )}
    </motion.div>
  );
};

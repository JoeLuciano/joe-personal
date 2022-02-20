import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './PostCard.module.css';

const postCardVariants = {
  small: { opacity: 0.5 },
  big: { opacity: 1 },
  hidden: { opacity: 0 },
};

const PostCreationInfo = ({ image, author, date }) => {
  return (
    <motion.div className={styles['post-creation-info']}>
      <img className={styles['pfp']} src={image} alt='test' />
      <motion.h3>
        {author} · {date}
      </motion.h3>
    </motion.div>
  );
};

const PostContentInfo = ({ title, body, image, togglePost }) => {
  return (
    <motion.div className={styles['post-content-info']}>
      <motion.div className={styles['post-content-info-text']}>
        <motion.button onClick={() => togglePost()}>
          <motion.h1>{title}</motion.h1>
        </motion.button>
        <motion.p>{body}</motion.p>
      </motion.div>
      <img className={styles['post-pic']} src={image} alt='test' />
    </motion.div>
  );
};

export const PostCard = ({
  isMobile,
  data,
  user,
  smartFetch,
  bigView,
  togglePost,
}) => {
  const [postImage, setPostImage] = useState();
  const [userPfp, setUserPfp] = useState();

  const navigate = useNavigate();

  const deletePost = useCallback(
    async (event) => {
      event.preventDefault();
      const deleteResponse = await smartFetch({
        url: '/api/post/delete',
        type: 'POST',
        payload: {
          title: data.title,
        },
      });
      if (deleteResponse.ok) {
        navigate('/posts');
      }
    },
    [smartFetch, data.title, navigate]
  );

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
      className={bigView ? styles.bigViewPostcard : styles['postcard']}
      animate={bigView ? 'big' : 'small'}
      exit='hidden'
      variants={postCardVariants}
      whileHover={{ boxShadow: '1px 4px 20px rgba(50, 50, 0, 0.5)' }}>
      <PostCreationInfo
        image={userPfp}
        author={data.author}
        date={data.date_posted}
      />
      <PostContentInfo
        title={data.title}
        body={data.content}
        image={postImage}
        togglePost={() => togglePost()}
      />
    </motion.div>
  );
};

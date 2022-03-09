import { ExpandButton } from 'components/pageComponents/buttonComponents/expandButton/ExpandButton';
import { useCallback, useState, useEffect, useContext } from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';
import styles from './PostCard.module.css';
import { UserContext, SmartFetchContext } from 'contexts/GlobalContexts';

const postCardTransitionLength = 0.5;

const postCardVariants = {
  small: {
    opacity: 1,
    height: '5.5rem',
    transition: { duration: postCardTransitionLength },
  },
  big: {
    opacity: 1,
    height: 'auto',
    transition: { duration: postCardTransitionLength },
  },
};

const postImageVariants = {
  small: { width: '100%', transition: { duration: postCardTransitionLength } },
  big: {
    opacity: 1,
    width: '20%',
    transition: { duration: postCardTransitionLength },
  },
};

const PostCreationInfo = ({ image, author, date }) => {
  const relevantDate = new Date(date).toLocaleDateString();
  return (
    <motion.div className={styles.postCreationInfo}>
      <motion.img className={styles.pfp} src={image} alt='test' />
      <motion.h3>
        Created by {author} on {relevantDate}
      </motion.h3>
    </motion.div>
  );
};

const PostContentInfo = ({ title, body }) => {
  return (
    <motion.div className={styles.postContentInfo}>
      <motion.div className={styles.postContentInfoText}>
        <motion.h1>{title}</motion.h1>
        <motion.p>{body}</motion.p>
      </motion.div>
    </motion.div>
  );
};

export const PostCard = ({ data, bigView, removePost, togglePost }) => {
  const [postImage, setPostImage] = useState();
  const [userPfp, setUserPfp] = useState();

  const { user } = useContext(UserContext);
  const smartFetch = useContext(SmartFetchContext);

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
        url: `/api/image/get/${data.author.image_file}`,
        type: 'GET',
        is_image: true,
      });
      if (imageResponse.ok) {
        setUserPfp(imageResponse.result);
      }
    }
    if (data.author.image_file) {
      getUserPfp();
    }
  }, [smartFetch, data.author.image_file]);

  return (
    <motion.div
      className={styles.postcardWrapper}
      whileHover={{ boxShadow: '1px 4px 20px rgba(50, 50, 0, 0.5)' }}>
      <AnimateSharedLayout>
        <motion.img
          layout
          variants={postImageVariants}
          className={styles.postImage}
          animate={bigView ? 'big' : 'small'}
          src={postImage}
          alt=''
        />
        <motion.div
          layout
          className={styles.postcard}
          animate={bigView ? 'big' : 'small'}
          variants={postCardVariants}>
          <PostCreationInfo
            image={userPfp}
            author={data.author.username}
            date={data.date_posted}
          />
          <PostContentInfo title={data.title} body={data.content} />
        </motion.div>
        <ExpandButton
          togglePost={togglePost}
          bigView={bigView}
          width={20}
          height={20}
        />
        {user.username === data.author.username && (
          <motion.button
            className={styles.deleteButton}
            onClick={() => deletePost()}>
            Delete Post
          </motion.button>
        )}
      </AnimateSharedLayout>
    </motion.div>
  );
};

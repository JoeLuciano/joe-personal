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

        <motion.button
          onClick={() => togglePost()}
          animate={bigView ? 'open' : 'closed'}
          className={styles.expandButton}>
          <motion.svg
            width={EXPAND_WIDTH}
            height={EXPAND_HEIGHT}
            viewBox={`0 0 ${EXPAND_WIDTH} ${EXPAND_HEIGHT}`}>
            <Path
              variants={{
                closed: {
                  d: `M ${EXPAND_WIDTH * 0.1} ${EXPAND_HEIGHT / 2}
                  L ${EXPAND_WIDTH / 2} ${EXPAND_HEIGHT * 0.9}`,
                  transition: { duration: 0.5 },
                },
                open: {
                  d: `M ${EXPAND_WIDTH * 0.1} ${EXPAND_HEIGHT / 2} L ${
                    EXPAND_WIDTH / 2
                  } ${EXPAND_HEIGHT * 0.1}`,
                  transition: { duration: 0.5 },
                },
              }}
            />
            <Path
              variants={{
                closed: {
                  d: `M ${EXPAND_WIDTH * 0.9} ${EXPAND_HEIGHT / 2}
                  L ${EXPAND_WIDTH / 2} ${EXPAND_HEIGHT * 0.9}`,
                  transition: { duration: 0.5 },
                },
                open: {
                  d: `M ${EXPAND_WIDTH * 0.9} ${EXPAND_HEIGHT / 2} L ${
                    EXPAND_WIDTH / 2
                  } ${EXPAND_HEIGHT * 0.1}`,
                  transition: { duration: 0.5 },
                },
              }}
            />
          </motion.svg>
        </motion.button>
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

const EXPAND_WIDTH = 20;
const EXPAND_HEIGHT = 20;

const Path = (props) => (
  <motion.path
    fill='transparent'
    strokeWidth='3'
    stroke='hsl(0, 0%, 18%)'
    strokeLinecap='round'
    {...props}
  />
);

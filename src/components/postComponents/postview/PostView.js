import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './PostView.module.css';
import { Link } from 'react-router-dom';

const PostCreationInfo = ({ image, author, date }) => {
  return (
    <motion.div className={styles['post-creation-info']}>
      {/* <img className={styles['pfp']} src={image} alt='test' /> */}
      <motion.h3>
        {author} · {date}
      </motion.h3>
    </motion.div>
  );
};

const PostContentInfo = ({ title, body, image, deletePost }) => {
  return (
    <motion.div className={styles['post-content-info']}>
      <motion.div className={styles['post-content-info-text']}>
        <motion.h1>
          {title} <motion.button onClick={deletePost}>Delete</motion.button>
        </motion.h1>
        <motion.p>{body}</motion.p>
      </motion.div>
      <img className={styles['post-pic']} src={image} alt='test' />
    </motion.div>
  );
};

const PostOptions = ({ tags, info }) => {
  return (
    <motion.div className={styles['post-options']}>
      <Link
        to={{
          pathname: '/courses',
          search: '?sort=name',
          hash: '#the-hash',
          state: { fromDashboard: true },
        }}>
        {tags}
      </Link>
      <motion.div>{info}</motion.div>
      <motion.div>some fancy options</motion.div>
    </motion.div>
  );
};

export const PostView = ({ isMobile, data, smartFetch }) => {
  const [postImage, setPostImage] = useState();

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

  return (
    <motion.div className={styles['postview']}>
      <PostCreationInfo
        image='get user pfp'
        author={data.author}
        date={data.date_posted}
      />
      <PostContentInfo
        title={data.title}
        body={data.content}
        image={postImage}
        deletePost={deletePost}
      />
      <PostOptions tags={data.tags} info={data.info} />
    </motion.div>
  );
};

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './PostCard.module.css';

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

const PostContentInfo = ({ title, body, image }) => {
  return (
    <motion.div className={styles['post-content-info']}>
      <motion.div className={styles['post-content-info-text']}>
        <Link to={`/post/${title}`}>
          <motion.h1>{title}</motion.h1>
        </Link>
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

export const PostCard = ({ isMobile, data, smartFetch }) => {
  const [postImage, setPostImage] = useState();

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
    <motion.div
      className={styles['postcard']}
      whileHover={{ boxShadow: '1px 4px 20px rgba(50, 50, 0, 0.5)' }}>
      <PostCreationInfo
        image='get user pfp'
        author={data.author}
        date={data.date_posted}
      />
      <PostContentInfo
        title={data.title}
        body={data.content}
        image={postImage}
      />
      <PostOptions tags={data.tags} info={data.info} />
    </motion.div>
  );
};

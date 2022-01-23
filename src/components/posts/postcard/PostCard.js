import { motion } from 'framer-motion';
import styles from './PostCard.module.css';
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

const PostContentInfo = ({ title, body, image }) => {
  return (
    <motion.div className={styles['post-content-info']}>
      <motion.div className={styles['post-content-info-text']}>
        <motion.h1>{title}</motion.h1>
        <motion.p>{body}</motion.p>
      </motion.div>
      {/* <img className={styles['post-pic']} src={image} alt='test' /> */}
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

export const PostCard = ({ isMobile, data }) => {
  return (
    <motion.div className={styles['postcard']}>
      <PostCreationInfo
        image='get user pfp'
        author={data.author}
        date={data.date}
      />
      <PostContentInfo title={data.title} body={data.body} image={data.image} />
      <PostOptions tags={data.tags} info={data.info} />
    </motion.div>
  );
};

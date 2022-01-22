import { motion } from 'framer-motion';
import styles from './PostCard.module.css';
import image from './../../logo.svg';
import { Link } from 'react-router-dom';

const PostCreationInfo = () => {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  const newdate = year + '/' + month + '/' + day;
  return (
    <motion.div className={styles['post-creation-info']}>
      <img className={styles['pfp']} src={image} alt='test' />
      <motion.h3>Joe Luciano · {newdate}</motion.h3>
    </motion.div>
  );
};

const PostContentInfo = () => {
  return (
    <motion.div className={styles['post-content-info']}>
      <motion.div className={styles['post-content-info-text']}>
        <motion.h1>First Post Title</motion.h1>
        <motion.p>
          So this is my first post... I'm really excited to start this. Wanted
          to leave this card completely hard coded from the very beginning!
          Don't believe me? Go check out the{' '}
          <motion.a
            className={styles['link']}
            href='https://github.com/JoeLuciano/joe-personal'
            target='_blank'
            whileHover={{ scale: [1, 5], rotate: [-720, 0] }}>
            source code
          </motion.a>
          . My plan at first is to record my thoughts as I go build up this
          website and other projects linked from here. A bit of a blog/personal
          portfolio that's tailored towards my personal use to store and share
          things. If you're reading this, I may have changed my mind :)
        </motion.p>
      </motion.div>
      <img className={styles['post-pic']} src={image} alt='test' />
    </motion.div>
  );
};

const PostOptions = () => {
  return (
    <motion.div className={styles['post-options']}>
      <Link
        to={{
          pathname: '/courses',
          search: '?sort=name',
          hash: '#the-hash',
          state: { fromDashboard: true },
        }}>
        Tags...
      </Link>
      <motion.div>other helpful information</motion.div>
      <motion.div>some fancy options</motion.div>
    </motion.div>
  );
};

export const PostCard = ({ isMobile }) => {
  return (
    <motion.div className={styles['postcard']}>
      <PostCreationInfo />
      <PostContentInfo />
      <PostOptions />
    </motion.div>
  );
};

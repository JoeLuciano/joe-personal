import styles from './AllPosts.module.css';
import { PostCard } from 'components/postComponents/postcard/PostCard';
import { motion } from 'framer-motion';

export const AllPosts = ({ isMobile, allPosts }) => {
  return (
    <motion.div className={styles.posts}>
      {!allPosts[0] && <motion.h1>No Posts... Why not post one?</motion.h1>}
      {allPosts.map((post, index) => {
        return <PostCard key={index} isMobile={isMobile} data={post} />;
      })}
    </motion.div>
  );
};
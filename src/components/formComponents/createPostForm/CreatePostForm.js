import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import styles from './CreatePostForm.module.css';

const buttonHover = {
  color: 'rgba(0, 0, 0)',
  backgroundColor: 'rgba(20, 20, 20, .1)',
  transition: {
    duration: 0.1,
  },
};

export const CreatePostForm = ({ setFlash, getAllPosts, smartFetch }) => {
  const [postInfo, setPostInfo] = useState();

  function handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setPostInfo({ ...postInfo, [name]: value });
  }

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      console.log('test');
      await smartFetch('/api/posts/create', 'POST', postInfo);
      getAllPosts();
    },
    [smartFetch, postInfo, getAllPosts]
  );

  return (
    <motion.form onSubmit={handleSubmit} className={styles['form']}>
      <motion.h1 className={styles['header']}>Create a post</motion.h1>
      <motion.div className={styles['text-input-container']}>
        <motion.input
          className={styles['text-input']}
          type='text'
          placeholder='Title'
          name='title'
          onChange={handleChange}
          required
        />
      </motion.div>
      <motion.div className={styles['text-input-container']}>
        <motion.textarea
          className={styles['text-input']}
          type='text'
          placeholder="What's on your mind?"
          name='content'
          onChange={handleChange}
          required
        />
      </motion.div>
      <motion.input
        type='submit'
        value='Post'
        className={styles['submit-button']}
        whileHover={buttonHover}
      />
    </motion.form>
  );
};

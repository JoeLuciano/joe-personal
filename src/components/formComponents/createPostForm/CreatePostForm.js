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

export const CreatePostForm = ({ setFlash, smartFetch, getAllPosts }) => {
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
      await smartFetch('/api/post/create', 'POST', postInfo);
      getAllPosts();
    },
    [smartFetch, postInfo, getAllPosts]
  );

  return (
    <motion.form onSubmit={handleSubmit} className={styles.form}>
      <motion.h1 className={styles.header}>Create a post</motion.h1>
      <motion.div className={styles.textInputContainer}>
        <motion.input
          className={styles.textInput}
          type='text'
          placeholder='Title'
          name='title'
          onChange={handleChange}
          required
        />
      </motion.div>
      <motion.div className={styles.textInputContainer}>
        <motion.textarea
          className={styles.textInput}
          type='text'
          placeholder="What's on your mind?"
          name='content'
          onChange={handleChange}
          rows={5}
          required
        />
      </motion.div>
      <motion.input
        type='submit'
        value='Post'
        className={styles.submitButton}
        whileHover={buttonHover}
      />
    </motion.form>
  );
};

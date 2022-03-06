import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import styles from './CreatePostForm.module.css';

const buttonHover = {
  color: 'rgba(0, 0, 0)',
  backgroundColor: 'rgba(20, 20, 20, .1)',
  transition: {
    duration: 0.1,
  },
};

export const CreatePostForm = ({ smartFetch, getAllPosts }) => {
  const [formLoading, setFormLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    var formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('image', data.image[0]);
    setFormLoading(true);
    await smartFetch({
      url: '/api/post/create',
      type: 'POST',
      payload: formData,
      has_files: true,
    });
    setFormLoading(false);
    getAllPosts();
  };

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {formLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <motion.h1 className={styles.header}>Create a post</motion.h1>
          <motion.div className={styles.textInputContainer}>
            <motion.input
              required
              className={styles.textInput}
              type='text'
              placeholder='Title'
              {...register('title', { required: true })}
            />
          </motion.div>
          <motion.div className={styles.textInputContainer}>
            <motion.textarea
              required
              className={styles.textInput}
              type='text'
              placeholder="What's on your mind?"
              {...register('content', { required: true })}
              rows={5}
            />
          </motion.div>
          <motion.input type='file' {...register('image')} />
          <motion.input
            type='submit'
            value='Post'
            className={styles.submitButton}
            whileHover={buttonHover}
          />
        </>
      )}
    </motion.form>
  );
};

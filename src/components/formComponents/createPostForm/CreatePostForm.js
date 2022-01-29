import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flash } from 'components/pageComponents/flash/Flash';
import styles from './CreatePostForm.module.css';

const buttonHover = {
  color: 'rgba(0, 0, 0)',
  backgroundColor: 'rgba(20, 20, 20, .1)',
  transition: {
    duration: 0.1,
  },
};

export const CreatePostForm = ({ setFlash }) => {
  const [postInfo, setPostInfo] = useState();

  function handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setPostInfo({ ...postInfo, [name]: value });
  }

  function handleSubmit(event) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(postInfo),
    };
    fetch('/api/posts/create', requestOptions)
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = data || data.message || response.statusText;
          console.log(error);
          setFlash(<></>);
          setFlash(
            <Flash
              message={error}
              type='error'
              duration='5000'
              setFlash={setFlash}
            />
          );
        } else {
          console.log(data.message);
          setFlash(
            <Flash
              message={data.message}
              type='success'
              duration='5000'
              setFlash={setFlash}
            />
          );
        }
      })
      .catch((error) => {
        console.error('There was an error!', error.toString());
      });
  }

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

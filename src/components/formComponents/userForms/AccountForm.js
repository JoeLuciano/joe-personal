import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import styles from './Form.module.css';

const buttonHover = {
  color: 'rgba(0, 0, 0)',
  backgroundColor: 'rgba(20, 20, 20, .1)',
  transition: {
    duration: 0.1,
  },
};

export const UpdateAccountForm = ({ user, setUser, smartFetch }) => {
  const [userImage, setUserImage] = useState();
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const logout = useCallback(
    async (event) => {
      event.preventDefault();
      const logoutResponse = await smartFetch({
        url: '/api/logout',
        type: 'POST',
      });
      if (logoutResponse.ok) {
        setUser(undefined);
        navigate('/home');
      }
    },
    [smartFetch, navigate, setUser]
  );

  useEffect(() => {
    async function getPostImage() {
      const imageResponse = await smartFetch({
        url: `/api/image/get/${user.image_file}`,
        type: 'GET',
        is_image: true,
      });
      if (imageResponse.ok) {
        setUserImage(imageResponse.result);
      }
    }
    if (user.image_file) {
      getPostImage();
    }
  }, [smartFetch, user.image_file]);

  const onSubmit = async (data) => {
    var formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('image', data.image[0]);
    await smartFetch({
      url: '/api/user/update',
      type: 'POST',
      payload: formData,
      has_files: true,
    });
  };

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <motion.h1 className={styles.header}>
        Update Account Information
      </motion.h1>
      <motion.div className={styles.pfpContainer}>
        <motion.img className={styles.pfp} src={userImage} alt='No PFP' />
        <motion.input type='file' {...register('image')} />
      </motion.div>
      <motion.div className={styles.textInputContainer}>
        <motion.input
          className={styles.textInput}
          placeholder='Username'
          type='username'
          name='username'
          {...register('username')}
        />
      </motion.div>
      <motion.div className={styles.textInputContainer}>
        <motion.input
          className={styles.textInput}
          placeholder='E-mail'
          type='email'
          name='email'
          {...register('email')}
        />
      </motion.div>
      <motion.input
        type='submit'
        value='Update'
        className={styles.submitButton}
        whileHover={buttonHover}
      />
      <motion.button
        onClick={logout}
        className={styles.submitButton}
        style={{ backgroundColor: 'rgb(190, 0, 25)' }}
        whileHover={buttonHover}>
        Logout
      </motion.button>
    </motion.form>
  );
};

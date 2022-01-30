import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Form.module.css';

const buttonHover = {
  color: 'rgba(0, 0, 0)',
  backgroundColor: 'rgba(20, 20, 20, .1)',
  transition: {
    duration: 0.1,
  },
};

export const UpdateAccountForm = ({ setFlash, setUser, smartFetch }) => {
  const [userInfo, setUserInfo] = useState();

  function handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setUserInfo({ ...userInfo, [name]: value });
  }

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      await smartFetch('/api/user/update', 'POST', userInfo);
    },
    [smartFetch, userInfo]
  );

  const logout = useCallback(
    async (event) => {
      event.preventDefault();
      const logoutResponse = await smartFetch('/api/logout', 'POST');
      if (logoutResponse.ok) {
        setUser(undefined);
        navigate('/home');
      }
    },
    [smartFetch, navigate, setUser]
  );

  return (
    <motion.form onSubmit={handleSubmit} className={styles.form}>
      <motion.h1 className={styles.header}>
        Update Account Information
      </motion.h1>
      <motion.div className={styles.textInputContainer}>
        <motion.input
          className={styles.textInput}
          placeholder='Username'
          type='username'
          name='username'
          onChange={handleChange}
        />
      </motion.div>
      <motion.div className={styles.textInputContainer}>
        <motion.input
          className={styles.textInput}
          placeholder='E-mail'
          type='email'
          name='email'
          onChange={handleChange}
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

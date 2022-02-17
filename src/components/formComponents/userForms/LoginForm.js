import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flash } from 'components/pageComponents/flash/Flash';
import styles from './Form.module.css';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const buttonHover = {
  color: 'rgba(0, 0, 0)',
  backgroundColor: 'rgba(20, 20, 20, .1)',
  transition: {
    duration: 0.1,
  },
};

export const LoginForm = ({ setFlash, setUser, smartFetch }) => {
  const [userInfo, setUserInfo] = useState();
  const [showPassword, setShowPassword] = useState(false);

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
      const registerResponse = await smartFetch({
        url: '/api/login',
        type: 'POST',
        payload: userInfo,
      });
      if (registerResponse.ok) {
        setUser(registerResponse.result);
        navigate('/home');
      } else {
        setUser(undefined);
      }
    },
    [smartFetch, userInfo, setUser, navigate]
  );

  return (
    <motion.form onSubmit={handleSubmit} className={styles.form}>
      <motion.h1 className={styles.header}>Log in</motion.h1>
      <motion.div className={styles.textInputContainer}>
        <motion.input
          className={styles.textInput}
          placeholder='E-mail'
          type='email'
          name='email'
          onChange={handleChange}
          required
        />
      </motion.div>
      <motion.div className={styles.textInputContainer}>
        <motion.input
          className={styles.textInput}
          placeholder='Password'
          type={showPassword ? 'text' : 'password'}
          name='password'
          onChange={handleChange}
          required
        />
        <motion.button
          className={styles.passwordButton}
          type='button'
          onClick={() => setShowPassword((previous) => !previous)}
          whileHover={buttonHover}>
          {showPassword ? <BsEye /> : <BsEyeSlash />}
        </motion.button>
      </motion.div>
      <motion.label className={styles.checkboxLabel}>
        Stay logged in?
        <motion.input
          name='remember'
          type='checkbox'
          onChange={handleChange}
          className={styles.checkbox}
        />
      </motion.label>
      <motion.input
        type='submit'
        value='Log in'
        className={styles.submitButton}
        whileHover={buttonHover}
      />
      <motion.button // TODO: CHANGE TO A LINK
        type='button'
        onClick={() => setFlash(<Flash message='Come back to this' />)}>
        Forgot password?
      </motion.button>
    </motion.form>
  );
};

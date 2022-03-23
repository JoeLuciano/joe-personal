import { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Form.module.css';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { UserContext, SmartFetchContext } from 'contexts/GlobalContexts';

const buttonHover = {
  color: 'rgba(0, 0, 0)',
  backgroundColor: 'rgba(20, 20, 20, .1)',
  transition: {
    duration: 0.1,
  },
};

export const RegisterForm = () => {
  const [userInfo, setUserInfo] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showSecretCode, setShowSecretCode] = useState(false);

  const { setUser } = useContext(UserContext);
  const smartFetch = useContext(SmartFetchContext);

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
        url: '/api/register',
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
      <motion.h1 className={styles.header}>Register</motion.h1>
      <motion.div className={styles.textInputContainer}>
        <motion.input
          className={styles.textInput}
          type='email'
          placeholder='E-mail'
          name='email'
          onChange={handleChange}
        />
      </motion.div>
      <motion.div className={styles.textInputContainer}>
        <motion.input
          className={styles.textInput}
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          name='password'
          onChange={handleChange}
        />
        <motion.button
          className={styles.passwordButton}
          type='button'
          onClick={() => setShowPassword((previous) => !previous)}
          whileHover={buttonHover}>
          {showPassword ? <BsEye /> : <BsEyeSlash />}
        </motion.button>
      </motion.div>
      <motion.div className={styles.textInputContainer}>
        <motion.input
          className={styles.textInput}
          type={showSecretCode ? 'text' : 'password'}
          placeholder='Secret Code'
          name='secretCode'
          onChange={handleChange}
        />
        <motion.button
          className={styles.passwordButton}
          type='button'
          onClick={() => setShowSecretCode((previous) => !previous)}
          whileHover={buttonHover}>
          {showPassword ? <BsEye /> : <BsEyeSlash />}
        </motion.button>
      </motion.div>

      <motion.h1>OR</motion.h1>

      <motion.div className={styles.textInputContainer}>
        <motion.input
          className={styles.textInput}
          type='phone'
          placeholder='Phone #'
          name='phone'
          onChange={handleChange}
        />
      </motion.div>

      <motion.button // TODO: CHANGE TO A LINK
        type='button'
        onClick={() => navigate('/login')}>
        Already have an account?
      </motion.button>
      <motion.input
        type='submit'
        value='Register'
        className={styles.submitButton}
        whileHover={buttonHover}
      />
    </motion.form>
  );
};

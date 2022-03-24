import { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Form.module.css';
import { UserContext, SmartFetchContext } from 'contexts/GlobalContexts';

const buttonHover = {
  color: 'rgba(0, 0, 0)',
  backgroundColor: 'rgba(20, 20, 20, .1)',
  transition: {
    duration: 0.1,
  },
};

const formVariants = {
  hidden: { x: '200%' },
  visible: { x: 0 },
  exit: { x: '-200%' },
};

export const PhoneLoginForm = () => {
  const [userInfo, setUserInfo] = useState();
  const [displayCodeEntry, setDisplayCodeEntry] = useState(false);

  const { setUser } = useContext(UserContext);
  const smartFetch = useContext(SmartFetchContext);

  function handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setUserInfo({ ...userInfo, [name]: value });
  }

  const navigate = useNavigate();

  const handlePhoneSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const response = await smartFetch({
        url: '/api/login',
        type: 'POST',
        payload: userInfo,
      });
      if (response.ok) {
        setDisplayCodeEntry(true);
      } else {
        setUser(undefined);
      }
    },
    [smartFetch, userInfo, setUser]
  );

  const handleCodeSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const response = await smartFetch({
        url: '/api/check_phone_code',
        type: 'POST',
        payload: userInfo,
      });
      if (response.ok) {
        setUser(response.result);
        navigate('/home');
      } else {
        setUser(undefined);
      }
    },
    [smartFetch, userInfo, setUser, navigate]
  );

  return (
    <AnimatePresence
      exitBeforeEnter
      initial='hidden'
      animate='visible'
      exit='exit'>
      {displayCodeEntry ? (
        <motion.form
          onSubmit={handleCodeSubmit}
          className={styles.form}
          variants={formVariants}>
          <motion.h1 className={styles.header}>Enter Code</motion.h1>

          <motion.div className={styles.textInputContainer}>
            <motion.input
              className={styles.textInput}
              type='code'
              placeholder='6-Digit Code'
              name='code'
              onChange={handleChange}
            />
          </motion.div>

          <motion.input
            type='submit'
            value='Login'
            className={styles.submitButton}
            whileHover={buttonHover}
          />
        </motion.form>
      ) : (
        <motion.form
          onSubmit={handlePhoneSubmit}
          className={styles.form}
          variants={formVariants}>
          <motion.h1 className={styles.header}>Login with Phone #</motion.h1>

          <motion.div className={styles.textInputContainer}>
            <motion.input
              className={styles.textInput}
              type='phone'
              placeholder='Phone #'
              name='phone'
              onChange={handleChange}
            />
          </motion.div>

          <motion.input
            type='submit'
            value='Get Code'
            className={styles.submitButton}
            whileHover={buttonHover}
          />
        </motion.form>
      )}
    </AnimatePresence>
  );
};

import { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Form.module.css';
import { UserContext, SmartFetchContext } from 'contexts/GlobalContexts';

const buttonHover = {
  color: 'rgba(0, 0, 0)',
  backgroundColor: 'rgba(20, 20, 20, .1)',
  transition: {
    duration: 0.1,
  },
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
        console.log(response.result);
        if (response.result === 'A verification code has been sent') {
          setDisplayCodeEntry(true);
        } else {
          console.log('VERIFICATION CODE WAS NOT SENT');
        }
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
    <>
      <motion.form onSubmit={handlePhoneSubmit} className={styles.form}>
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
          value='Log in'
          className={styles.submitButton}
          whileHover={buttonHover}
        />
      </motion.form>

      {displayCodeEntry && (
        <motion.form onSubmit={handleCodeSubmit} className={styles.form}>
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
            value='Log in'
            className={styles.submitButton}
            whileHover={buttonHover}
          />
        </motion.form>
      )}
    </>
  );
};

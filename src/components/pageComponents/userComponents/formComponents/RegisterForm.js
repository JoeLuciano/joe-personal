import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flash } from 'components/pageComponents/flash/Flash';
import { useNavigate } from 'react-router-dom';
import styles from './Form.module.css';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const buttonHover = {
  color: 'rgba(0, 0, 0)',
  backgroundColor: 'rgba(20, 20, 20, .1)',
  transition: {
    duration: 0.1,
  },
};

export const RegisterForm = ({ setFlash }) => {
  const [userInfo, setUserInfo] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showSecretCode, setShowSecretCode] = useState(false);

  function handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setUserInfo({ ...userInfo, [name]: value });
  }

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userInfo),
    };
    fetch('/api/register', requestOptions)
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
          console.log(data);
          navigate('/home');
        }
      })
      .catch((error) => {
        console.error('There was an error!', error.toString());
      });
  }

  return (
    <motion.form onSubmit={handleSubmit} className={styles['form']}>
      <motion.h1 className={styles['header']}>Register</motion.h1>
      <motion.div className={styles['text-input-container']}>
        <motion.input
          className={styles['text-input']}
          type='email'
          placeholder='E-mail'
          name='email'
          onChange={handleChange}
          required
        />
      </motion.div>
      <motion.div className={styles['text-input-container']}>
        <motion.input
          className={styles['text-input']}
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          name='password'
          onChange={handleChange}
          required
        />
        <motion.button
          className={styles['password-button']}
          type='button'
          onClick={() => setShowPassword((previous) => !previous)}
          whileHover={buttonHover}>
          {showPassword ? <BsEye /> : <BsEyeSlash />}
        </motion.button>
      </motion.div>
      <motion.div className={styles['text-input-container']}>
        <motion.input
          className={styles['text-input']}
          type={showSecretCode ? 'text' : 'password'}
          placeholder='Secret Code'
          name='secretCode'
          onChange={handleChange}
          required
        />
        <motion.button
          className={styles['password-button']}
          type='button'
          onClick={() => setShowSecretCode((previous) => !previous)}
          whileHover={buttonHover}>
          {showPassword ? <BsEye /> : <BsEyeSlash />}
        </motion.button>
      </motion.div>
      <motion.button // TODO: CHANGE TO A LINK
        type='button'
        onClick={() => navigate('/login')}>
        Already have an account?
      </motion.button>
      <motion.input
        type='submit'
        value='Register'
        className={styles['submit-button']}
        whileHover={buttonHover}
      />
    </motion.form>
  );
};

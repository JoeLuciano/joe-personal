import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flash } from 'components/pageComponents/flash/Flash';
import styles from './Form.module.css';

const buttonHover = {
  color: 'rgba(0, 0, 0)',
  backgroundColor: 'rgba(20, 20, 20, .1)',
  transition: {
    duration: 0.1,
  },
};

export const UpdateAccountForm = ({ setFlash, setUser }) => {
  const [userInfo, setUserInfo] = useState();

  function handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setUserInfo({ ...userInfo, [name]: value });
  }

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
    fetch('/api/user/update', requestOptions)
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
          setFlash(
            <Flash
              message={data}
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

  const navigate = useNavigate();

  function logout(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    fetch('/api/logout', requestOptions)
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
          setUser();
          navigate('/home');
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
      <motion.h1 className={styles['header']}>
        Update Account Information
      </motion.h1>
      <motion.div className={styles['text-input-container']}>
        <motion.input
          className={styles['text-input']}
          placeholder='Username'
          type='username'
          name='username'
          onChange={handleChange}
        />
      </motion.div>
      <motion.div className={styles['text-input-container']}>
        <motion.input
          className={styles['text-input']}
          placeholder='E-mail'
          type='email'
          name='email'
          onChange={handleChange}
        />
      </motion.div>
      <motion.input
        type='submit'
        value='Update'
        className={styles['submit-button']}
        whileHover={buttonHover}
      />
      <motion.button
        onClick={logout}
        className={styles['submit-button']}
        style={{ backgroundColor: 'rgb(190, 0, 25)' }}
        whileHover={buttonHover}>
        Logout
      </motion.button>
    </motion.form>
  );
};

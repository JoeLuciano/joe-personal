import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flash } from './../components/pageComponents/flash/Flash';

const RegisterForm = () => {
  const [userInfo, setUserInfo] = useState();
  const [flash, setFlash] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showSecretCode, setShowSecretCode] = useState(false);

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
    fetch('/api/register', requestOptions)
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = data || data.message || response.statusText;
          console.log(error);
          setFlash(<></>);
          setFlash(<Flash message={error} type='error' duration='5000' />);
        } else {
          setFlash(<Navigate to='/home' />);
        }
      })
      .catch((error) => {
        console.error('There was an error!', error.toString());
      });
  }

  return (
    <motion.div>
      <motion.form onSubmit={handleSubmit}>
        <motion.label>
          Email:
          <motion.input
            type='email'
            name='email'
            onChange={handleChange}
            required
          />
        </motion.label>
        <motion.div>
          <motion.label>
            Password:
            <motion.input
              type={showPassword ? 'text' : 'password'}
              name='password'
              onChange={handleChange}
              required
            />
          </motion.label>
          <button
            type='button'
            onClick={() => setShowPassword((previous) => !previous)}>
            Show Password
          </button>
        </motion.div>
        <motion.div>
          <motion.label>
            Secret Code:
            <motion.input
              type={showSecretCode ? 'text' : 'password'}
              name='secretCode'
              onChange={handleChange}
              required
            />
          </motion.label>
          <button
            type='button'
            onClick={() => setShowSecretCode((previous) => !previous)}>
            Show Secret Code
          </button>
        </motion.div>
        <motion.input type='submit' value='Submit' />
        {flash}
      </motion.form>
    </motion.div>
  );
};

export const RegisterPage = () => {
  return (
    <motion.div>
      <RegisterForm />
    </motion.div>
  );
};
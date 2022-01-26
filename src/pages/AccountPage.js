import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flash } from '../components/pageComponents/flash/Flash';

const UpdateAccountForm = () => {
  const [userInfo, setUserInfo] = useState();
  const [flash, setFlash] = useState();

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
          setFlash(<Flash message={error} type='error' duration='5000' />);
        } else {
          console.log(data);
          setFlash(<Flash message={data} type='success' duration='5000' />);
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
          Username:
          <motion.input
            type='username'
            name='username'
            onChange={handleChange}
          />
        </motion.label>
        <motion.label>
          Email:
          <motion.input type='email' name='email' onChange={handleChange} />
        </motion.label>
        <motion.input type='submit' value='Update' />
        {flash}
      </motion.form>
    </motion.div>
  );
};

export const AccountPage = () => {
  return (
    <motion.div>
      <UpdateAccountForm />
    </motion.div>
  );
};

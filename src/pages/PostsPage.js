import logo from '../logo.svg';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { NameLogo } from '../components/nameLogo/NameLogo';

export const PostsPage = () => {
  const [getMessage, setGetMessage] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setGetMessage(data);
      });
  }, []);

  return (
    <>
      <NameLogo />
      <div className={styles['horizantal-list-center']}>
        <h1>Hi!</h1>
        <img src={logo} className='App-logo' alt='logo' />
      </div>
      <h2>{getMessage.message}</h2>
      <h2>
        I'm currently a SoC Design Engineer at Intel working in Pre-Silicon
        Validation
      </h2>
    </>
  );
};

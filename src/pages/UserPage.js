import { motion } from 'framer-motion';
import { LoginForm } from 'components/formComponents/userForms/LoginForm';
import { RegisterForm } from 'components/formComponents/userForms/RegisterForm';
import { UpdateAccountForm } from 'components/formComponents/userForms/AccountForm';
import { NameLogo } from 'components/pageComponents/nameLogo/NameLogo';
import styles from './styles.module.css';
import { Navigate } from 'react-router-dom';

export const UserPage = ({
  login,
  register,
  account,
  user,
  setUser,
  isMobile,
  setFlash,
  smartFetch,
}) => {
  const formState = {
    setUser: setUser,
    setFlash: setFlash,
    smartFetch: smartFetch,
  };
  return (
    <motion.div className={styles.page}>
      <NameLogo />
      <motion.div className={styles.pageContent}>
        {user === undefined || (user === 'not logged in' && !account) ? (
          register ? (
            <RegisterForm {...formState} />
          ) : login ? (
            <LoginForm {...formState} />
          ) : (
            <Navigate to='/home' />
          )
        ) : account ? (
          <UpdateAccountForm {...formState} />
        ) : (
          <Navigate to='/account' />
        )}
      </motion.div>
    </motion.div>
  );
};

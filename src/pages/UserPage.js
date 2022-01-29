import { motion } from 'framer-motion';
import { LoginForm } from 'components/formComponents/userForms/LoginForm';
import { RegisterForm } from 'components/formComponents/userForms/RegisterForm';
import { UpdateAccountForm } from 'components/formComponents/userForms/AccountForm';
import { NameLogo } from 'components/pageComponents/nameLogo/NameLogo';
import styles from './styles.module.css';
import { Navigate } from 'react-router-dom';

export const UserPage = ({
  isMobile,
  setUser,
  user,
  setFlash,
  login,
  register,
  account,
}) => {
  return (
    <motion.div className={styles.page}>
      <NameLogo />
      <motion.div className={styles.pageContent}>
        {user === undefined ? (
          register ? (
            <RegisterForm setFlash={setFlash} setUser={setUser} />
          ) : login ? (
            <LoginForm setFlash={setFlash} setUser={setUser} />
          ) : (
            <Navigate to='/home' />
          )
        ) : account ? (
          <UpdateAccountForm setFlash={setFlash} setUser={setUser} />
        ) : (
          <Navigate to='/account' />
        )}
      </motion.div>
    </motion.div>
  );
};

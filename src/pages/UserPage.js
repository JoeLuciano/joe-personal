import { motion } from 'framer-motion';
import { LoginForm } from 'components/pageComponents/userComponents/formComponents/LoginForm';
import { RegisterForm } from 'components/pageComponents/userComponents/formComponents/RegisterForm';
import { UpdateAccountForm } from 'components/pageComponents/userComponents/formComponents/AccountForm';
import { NameLogo } from 'components/pageComponents/nameLogo/NameLogo';
import styles from './styles.module.css';
import { Navigate } from 'react-router-dom';

export const UserPage = ({
  isMobile,
  user,
  setFlash,
  login,
  register,
  account,
}) => {
  return (
    <motion.div className={styles['page']}>
      <NameLogo />
      <motion.div className={styles['page-content']}>
        {user ? (
          account ? (
            <UpdateAccountForm setFlash={setFlash} />
          ) : (
            <Navigate to='/account' />
          )
        ) : register ? (
          <RegisterForm setFlash={setFlash} />
        ) : login ? (
          <LoginForm setFlash={setFlash} />
        ) : (
          <Navigate to='/home' />
        )}
      </motion.div>
    </motion.div>
  );
};

import { motion } from 'framer-motion';
import { LoginForm } from 'components/formComponents/userForms/LoginForm';
import { RegisterForm } from 'components/formComponents/userForms/RegisterForm';
import { UpdateAccountForm } from 'components/formComponents/userForms/AccountForm';
import { BasePage } from './BasePage';
import styles from './styles.module.css';
import { Navigate } from 'react-router-dom';

export const UserPage = (props) => {
  const { user, account, login, register } = props;
  return (
    <BasePage
      {...props}
      pageContent={
        <motion.div className={styles.pageContent}>
          {user === undefined || (user === 'not logged in' && !account) ? (
            register ? (
              <RegisterForm {...props} />
            ) : login ? (
              <LoginForm {...props} />
            ) : (
              <Navigate to='/home' />
            )
          ) : account ? (
            <UpdateAccountForm {...props} />
          ) : (
            <Navigate to='/account' />
          )}
        </motion.div>
      }
    />
  );
};

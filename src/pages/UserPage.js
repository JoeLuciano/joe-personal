import { useContext } from 'react';
import { LoginForm } from 'components/formComponents/userForms/LoginForm';
import { RegisterForm } from 'components/formComponents/userForms/RegisterForm';
import { UpdateAccountForm } from 'components/formComponents/userForms/AccountForm';
import { BasePage } from './BasePage';
import { UserContext } from 'contexts/GlobalContexts';

export const UserPage = (props) => {
  const { account, login, register } = props;
  const { user } = useContext(UserContext);

  return (
    <BasePage
      {...props}
      pageContent={
        user === undefined || user === 'not logged in' ? (
          register ? (
            <RegisterForm {...props} />
          ) : (
            login && <LoginForm {...props} />
          )
        ) : (
          account && <UpdateAccountForm {...props} />
        )
      }
    />
  );
};

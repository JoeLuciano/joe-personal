import { LoginForm } from 'components/formComponents/userForms/LoginForm';
import { RegisterForm } from 'components/formComponents/userForms/RegisterForm';
import { UpdateAccountForm } from 'components/formComponents/userForms/AccountForm';
import { BasePage } from './BasePage';

export const UserPage = (props) => {
  const { user, account, login, register } = props;

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

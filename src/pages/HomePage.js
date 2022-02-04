import { Intro } from 'components/pages/homePage/intro/Intro';
import { BasePage } from './BasePage';

export const HomePage = (props) => {
  return <BasePage {...props} pageContent={<Intro {...props} />} />;
};

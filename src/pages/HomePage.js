import { Intro } from 'components/pageComponents/intro/Intro';
import { BasePage } from './BasePage';

export const HomePage = (props) => {
  return <BasePage {...props} pageContent={<Intro {...props} />} />;
};

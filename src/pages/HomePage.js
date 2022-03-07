import { Intro } from 'components/pages/homePage/intro/Intro';
import { BasePage } from './BasePage';

export const HomePage = () => {
  return <BasePage pageContent={<Intro />} />;
};

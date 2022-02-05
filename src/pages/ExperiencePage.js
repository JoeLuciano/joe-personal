import { BasePage } from './BasePage';
import { Python } from 'components/pages/experiencePage/coreskills/Python';
import { Cpp } from 'components/pages/experiencePage/coreskills/Cpp';
import { WebDevelopment } from 'components/pages/experiencePage/coreskills/Web';
import { Education } from 'components/pages/experiencePage/education/Education';
import { Professional } from 'components/pages/experiencePage/professional/Professional';
import { Personal } from 'components/pages/experiencePage/personal/Personal';
import { motion } from 'framer-motion';

export const ExperiencePage = (props) => {
  return (
    <BasePage
      {...props}
      pageContent={
        <>
          <Python {...props} />
        </>
      }
    />
  );
};

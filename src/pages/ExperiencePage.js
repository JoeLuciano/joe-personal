import { useState } from 'react';
import { BasePage } from './BasePage';
import { Python } from 'components/pages/experiencePage/coreskills/Python';
import { Cpp } from 'components/pages/experiencePage/coreskills/Cpp';
import { WebDevelopment } from 'components/pages/experiencePage/coreskills/Web';
import { Education } from 'components/pages/experiencePage/education/Education';
import { Professional } from 'components/pages/experiencePage/professional/Professional';
import { Personal } from 'components/pages/experiencePage/personal/Personal';
import { Selector } from 'components/pages/experiencePage/selector/Selector';

export const ExperiencePage = (props) => {
  const [selectedView, setSelectedView] = useState('Education');
  const views = ['Education', 'Professional', 'Personal'];

  return (
    <BasePage
      {...props}
      pageContent={
        <>
          <Selector views={views} setSelectedView={setSelectedView} />
          {selectedView === 'Education' && <Education {...props} />}
          {/* <Python {...props} /> */}
        </>
      }
    />
  );
};

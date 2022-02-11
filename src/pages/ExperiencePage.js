import { useState, useRef } from 'react';
import { BasePage } from './BasePage';
import { Python } from 'components/pages/experiencePage/coreskills/Python';
import { Cpp } from 'components/pages/experiencePage/coreskills/Cpp';
import { WebDevelopment } from 'components/pages/experiencePage/coreskills/Web';
import { Education } from 'components/pages/experiencePage/education/Education';
import { Professional } from 'components/pages/experiencePage/professional/Professional';
import { Personal } from 'components/pages/experiencePage/personal/Personal';
import { Selector } from 'components/pages/experiencePage/selector/Selector';

export const ExperiencePage = (props) => {
  const [selectedView, setSelectedView] = useState('PERSONAL');
  const views = ['PERSONAL', 'PROFESSIONAL', 'EDUCATION'];

  return (
    <BasePage
      {...props}
      pageContent={
        <>
          <Selector
            views={views}
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />
          {selectedView === 'PERSONAL' && (
            <Python setSelectedView={setSelectedView} {...props} />
          )}
          {selectedView === 'PROFESSIONAL' && <Professional {...props} />}
          {selectedView === 'EDUCATION' && <Education {...props} />}
        </>
      }
    />
  );
};

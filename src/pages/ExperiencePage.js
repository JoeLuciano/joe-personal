import { useState } from 'react';
import { BasePage } from './BasePage';
import { Education } from 'components/pages/experiencePage/education/Education';
import { Professional } from 'components/pages/experiencePage/professional/Professional';
import { Personal } from 'components/pages/experiencePage/personal/Personal';
import { ContentSelector } from 'components/pageComponents/contentSelector/ContentSelector';

export const ExperiencePage = (props) => {
  const [selectedView, setSelectedView] = useState('EDUCATION');
  const views = ['PERSONAL', 'PROFESSIONAL', 'EDUCATION'];

  const selectorObject = document.getElementById(
    'experienceContentSelectorWrapper'
  );
  let selectorHeight = 160;
  if (selectorObject) {
    selectorHeight = selectorObject.offsetHeight;
  }

  return (
    <BasePage
      {...props}
      pageContent={
        <>
          <ContentSelector
            views={views}
            selectedView={selectedView}
            setSelectedView={setSelectedView}
            {...props}
          />
          <div style={{ height: selectorHeight }} />
          {selectedView === 'PERSONAL' && (
            <Personal setSelectedView={setSelectedView} {...props} />
          )}
          {selectedView === 'PROFESSIONAL' && <Professional {...props} />}
          {selectedView === 'EDUCATION' && <Education {...props} />}
        </>
      }
    />
  );
};

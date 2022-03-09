import { useState } from 'react';
import { BasePage } from './BasePage';
import { Education } from 'components/pages/experiencePage/education/Education';
import { Professional } from 'components/pages/experiencePage/professional/Professional';
import { Personal } from 'components/pages/experiencePage/personal/Personal';
import { ContentSelector } from 'components/pageComponents/buttonComponents/contentSelector/ContentSelector';

export const ExperiencePage = () => {
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
      pageContent={
        <>
          <ContentSelector
            views={views}
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />
          <div style={{ height: selectorHeight }} />
          {selectedView === 'PERSONAL' && (
            <Personal setSelectedView={setSelectedView} />
          )}
          {selectedView === 'PROFESSIONAL' && <Professional />}
          {selectedView === 'EDUCATION' && <Education />}
        </>
      }
    />
  );
};

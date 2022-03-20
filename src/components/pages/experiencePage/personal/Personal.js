import { Python } from 'components/pages/experiencePage/coreskills/Python';
import { Web } from 'components/pages/experiencePage/coreskills/Web';

export const Personal = (props) => {
  return (
    <>
      <Python {...props} />
      <Web {...props} />
    </>
  );
};

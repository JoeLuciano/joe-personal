import { Python } from 'components/pages/experiencePage/coreskills/Python';
import { Cpp } from 'components/pages/experiencePage/coreskills/Cpp';
import { Web } from 'components/pages/experiencePage/coreskills/Web';
import { motion } from 'framer-motion';
import { styles } from './Personal.module.css';

export const Personal = (props) => {
  return (
    <>
      <Python setSelectedView={props.setSelectedView} {...props} />
      <Cpp />
      <Web />
    </>
  );
};

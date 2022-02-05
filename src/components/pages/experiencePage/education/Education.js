import { motion } from 'framer-motion';
import { styles } from './Education.module.css';

export const Education = (props) => {
  return (
    <>
      <motion.h1>Education</motion.h1>
      <motion.p>
        I recieved my undergraduate and graduate degrees in Computer Engineering
        at Binghamton University from 2017 to 2021.
      </motion.p>
      <motion.p>Watson course</motion.p>
      <motion.p>C projects - Pololu Robot, </motion.p>
      <motion.p>VHDL Courses</motion.p>
      <motion.p>
        Capstones - Image recognition with Nvidia chip, Javascript app for
        Digital Design
      </motion.p>
      <motion.p>
        Grad courses - Baremetal Programming in Embedded systems with C,{' '}
        <motion.a href='https://youtu.be/HcxlbCVMm9Y' target='blank'>
          IoT
        </motion.a>
        final project, link report and code.
      </motion.p>
      <motion.p>Innovation Scholars</motion.p>
    </>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Professional.module.css';

const profSection = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const profText = {
  hidden: { y: '-2rem', opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const ProfessionalSectionWrapper = ({ children }) => {
  return (
    children && (
      <motion.div variants={profSection} initial='hidden' animate='visible'>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { variants: profText })
        )}
      </motion.div>
    )
  );
};

export const Professional = (props) => {
  return (
    <ProfessionalSectionWrapper>
      <motion.div>
        <motion.h1 className={styles.intel}>Intel</motion.h1>
        <motion.p>
          Automated weekly regression triage with Python scripts to greatly
          reduce time to identify 'real' hardware bugs
        </motion.p>
        <motion.p>
          Implemented communication protocols to construct insightful Python
          logs
        </motion.p>
        <motion.p>
          Built effective test infrastructure in C++ to validate architect
          expectations
        </motion.p>
        <motion.p>
          Cooperated with dozens of engineers across multiple departments to
          root cause test failures
        </motion.p>
      </motion.div>
      <motion.div>
        <motion.h1>Saab</motion.h1>
        <motion.p>
          Triaged and developed solutions for dozens of customer issues using
          internal documentation and tools
        </motion.p>
        <motion.p>
          Collaborated with a team of 9 engineers over Atlassian's Jira to
          manage workflow and communicate with customers
        </motion.p>
        <motion.p>
          Debugged customer issues with a Voice Communication Control System
          alongside a supplier's software engineer
        </motion.p>
        <motion.h2>Summary</motion.h2>
        <motion.p>
          Began learning the absurd complexity of solving real world problems as
          a Systems Engineer. Triaging failures in airport monitoring systems
          exposed me to absurd complexity as well as time (and life) sensitive
          issues.
        </motion.p>
      </motion.div>
      <motion.div>
        <motion.h1>Tutoring</motion.h1>
        <motion.p>
          Began tutoring the Math and Sciences in High School. I continued
          tutoring SAT/ACT students in College. My first experience with the
          beauty and horrors of remote work.
        </motion.p>
      </motion.div>
      <motion.div>
        <motion.h1>Construction {'&'} Landscaping</motion.h1>
        <motion.p>
          Always worked in construction as a kid until I went off for college.
          Got to learn EVERYTHING that goes into building a residential home.
          Continued working summers before internships and starting my career.
        </motion.p>
      </motion.div>
    </ProfessionalSectionWrapper>
  );
};

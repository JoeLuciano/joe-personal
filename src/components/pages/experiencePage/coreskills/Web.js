import { motion } from 'framer-motion';
import { styles } from './Web.module.css';

export const Web = (props) => {
  return (
    <>
      I began learning JavaScript over a year and a half ago for one of my
      Senior Capstone projects (((LINK TO EDUCATION))). The vibrant ecosystem
      and seemingly endless possibilities caught my attention. I took various
      online courses including FreeCodeCamp.org's suite of HTML, CSS,
      JavaScript, and React courses. At the end of my start I had this to show
      for it:{' '}
      <a
        href='https://joeluciano.github.io/react-router-website/#/'
        target='blank'>
        GitHub Pages Website
      </a>
      . It was fairly superficial but I felt I had the basics down. I put a lot
      of my learning on the back seat while I developed my general programming
      skills. I've began reinforcing my frontend development learnings while
      building a strong foundation all across the stack. This website represents
      my attempt to practice fronted while developing a thorough understanding
      of backend systems. I decided to build this website with Flask given how
      much time I've spent writing Python code. I feel like I've learned an
      extraordinary amount. You can review the source code here:{' '}
      <a href='https://github.com/JoeLuciano/joe-personal' target='blank'>
        GitHub for personal website
      </a>
      I've developed a strong idea of how data CAN flow throughout a web
      application, and enjoy finding better ways every day.
    </>
  );
};

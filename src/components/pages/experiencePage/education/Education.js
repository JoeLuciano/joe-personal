import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Education.module.css';
import { FaRegSadTear } from 'react-icons/fa';
import { FaRegSadCry } from 'react-icons/fa';
import Binghamton from 'customImages/Binghamton.png';
import {
  ShimmerAnchor,
  ShimmerLink,
} from 'components/pageComponents/textComponents/shimmer/ShimmerText';

export const Education = ({ isMobile, ...props }) => {
  return (
    <>
      <motion.div
        className={
          isMobile ? styles.headerDescriptionMobile : styles.headerDescription
        }>
        <motion.h3>BS {'&'} MS in Computer Engineering (2017-2021)</motion.h3>
        <motion.img src={Binghamton} alt='Binghamton University' height='120' />
      </motion.div>
      <motion.ul className={styles.gradList}>
        <motion.h2>Graduate Highlights</motion.h2>
        <motion.li>
          <motion.h3>Internet of Things</motion.h3>
          Beyond learning{' '}
          <ShimmerAnchor link='http://www.tinyos.net/' text='TinyOs' />
          and IoT standards, I created a{' '}
          <ShimmerAnchor
            link='https://youtu.be/HcxlbCVMm9Y'
            text='Frozen Pipe Detection System'
          />
        </motion.li>
        <motion.li>
          <motion.h3>Deep Learning</motion.h3>
          Developed and deployed (Python) convolutional neural networks which
          emulated widely known architectures such as ResNet.
        </motion.li>
        <motion.li>
          <motion.h3>Masters Project</motion.h3>
          <ShimmerLink
            link='/document/msProjectReport'
            text='ARM Processor Hardware Verification in cocotb'
          />
          Created a cocotb template for verifying the design for an
          undergraduate final project (constructing a Multi-Cycle ARM processor
          in VHDL). Displayed the benefits of doing hardware verification in
          Python.
        </motion.li>
        <motion.li>
          <motion.h3>Microfabrication</motion.h3>
          <ShimmerLink link='/document/' text='ADD PROJECT' />
          Investigated modern semiconductor manufacturing techniques and
          computed the steps required to construct real-world devices.
        </motion.li>
        <motion.li>
          <motion.h3>Bioenergy</motion.h3>
          Designed a Microbial Fuel Cell (MFC) with paper, bacteria, and printed
          electrodes. Huge disappointment when Covid hit before we could get in
          the lab and bring the designs to life <FaRegSadCry />
        </motion.li>
        <motion.li>
          <motion.h3>Energy Systems Concentration</motion.h3>
          Electrical Entergy Storage {'&'} Devices for Energy Materials {'&'}{' '}
          Physics and Tech of Solar Cells - Studied material physics up to
          energy applications at the grid level with a primary focus on
          renewables.{' '}
          <ShimmerLink
            link='/document/virtualPowerPlants'
            text='Virtual Power Plants Report'
          />
        </motion.li>
        <motion.li>
          <motion.h3>Embedded Systems Design</motion.h3>
          Baremetal programming in C with a programmable Papilio board. Utilized
          motion, light, and touch sensors in various projects.
        </motion.li>
      </motion.ul>
      <motion.ul className={styles.gradList}>
        <motion.h2>Undergraduate Highlights</motion.h2>
        <motion.li>
          <motion.h3>Autonomous Warehouse Robot (Regeneron)</motion.h3>
          Integrated an Nvidia Jetson Nano into a rover to follow designated
          paths and pick up objects in a warehouse. No demos due to Covid{' '}
          <FaRegSadTear />
        </motion.li>
        <motion.li>
          <motion.h3>Digital Systems Design Web App</motion.h3>
          Iterated on a JavaScript web application for students to create gate
          diagrams. Added bus notation, component imports, and simulation. Users
          could view their VHDL/Verilog code generate in real time.
        </motion.li>
        <motion.li>
          <motion.h3>Innovation Scholars</motion.h3>
          3-year program in cooperation with SAP's Hasso Plattner Institute to
          execute Design Thinking methodologies. Got cut short due to Covid
          during the 'Execution' phase. This layered a much different way of
          thinking on my education. There was nothing I looked forward to more
          my Sophomore and Junior years.
        </motion.li>
        <motion.li>
          <motion.h3>Programming</motion.h3>
          VHDL and C languages were formally taught in my degree. Designed and
          verified schematics on FPGA boards. Conducted baremetal programming on
          devices such as the 3Pi. The techniques and fundamentals I learned
          here have allowed me to build my understanding from the bottom-up.
        </motion.li>
        <motion.li>
          <motion.h3>Minors</motion.h3>
          Minors in sustainability engineering and economics helped round out my
          experience by providing different perspectives. Sustainability plays a
          huge role in how I attack problems; I believe programming should only
          solve the problem at hand (KISS - Keep It Simple Stupid), and I take a
          long range approach in how I solve systemic problems (do it right).
          Economics comes fairly natural to me and it made sense to explore my
          interests there. Check out the <Link to='/library'>
            Library
          </Link> or <Link to='/posts'>Posts</Link> to hear more about this.
        </motion.li>
      </motion.ul>
    </>
  );
};

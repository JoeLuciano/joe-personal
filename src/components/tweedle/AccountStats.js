import { useContext } from 'react';
import { motion } from 'framer-motion';
import { PhoneLoginForm } from 'components/formComponents/userForms/PhoneLoginForm';
import { UserContext } from 'contexts/GlobalContexts';

const modalVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 2, delayChildren: 2.5 } },
};

const statsVariant = {
  hidden: { y: '100vh' },
  visible: { y: 0, transition: { ease: 'easeInOut', duration: 1 } },
};

const UserStats = () => {
  return <motion.h1>You're STATS!</motion.h1>;
};

export default function AccountStats() {
  const { user } = useContext(UserContext);

  return (
    <motion.div
      className='stats-modal'
      variants={modalVariant}
      initial='hidden'
      animate='visible'>
      <motion.div className='stats-display' variants={statsVariant}>
        Congrats you won!
        {user ? <UserStats /> : <PhoneLoginForm />}
      </motion.div>
    </motion.div>
  );
}

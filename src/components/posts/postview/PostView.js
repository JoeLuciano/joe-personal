import { motion } from 'framer-motion';
import styles from './PostView.module.css';
import { Link } from 'react-router-dom';
import { Flash } from 'components/pageComponents/flash/Flash';
import { useNavigate } from 'react-router-dom';

const PostCreationInfo = ({ image, author, date }) => {
  return (
    <motion.div className={styles['post-creation-info']}>
      {/* <img className={styles['pfp']} src={image} alt='test' /> */}
      <motion.h3>
        {author} · {date}
      </motion.h3>
    </motion.div>
  );
};

const PostContentInfo = ({ title, body, image, setFlash, getAllPosts }) => {
  const navigate = useNavigate();

  const remove = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ title: title }),
    };
    fetch('/api/posts/remove', requestOptions).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error = data || data.message || response.statusText;
        setFlash(<></>);
        setFlash(<Flash message={data} type='error' />);
        console.log(error);
      } else {
        setFlash(<></>);
        setFlash(<Flash message={data.message} type='success' />);
        navigate('/posts');
      }
    });
  };

  return (
    <motion.div className={styles['post-content-info']}>
      <motion.div className={styles['post-content-info-text']}>
        <motion.h1>
          {title} <motion.button onClick={remove}>Delete</motion.button>
        </motion.h1>
        <motion.p>{body}</motion.p>
      </motion.div>
      {/* <img className={styles['post-pic']} src={image} alt='test' /> */}
    </motion.div>
  );
};

const PostOptions = ({ tags, info }) => {
  return (
    <motion.div className={styles['post-options']}>
      <Link
        to={{
          pathname: '/courses',
          search: '?sort=name',
          hash: '#the-hash',
          state: { fromDashboard: true },
        }}>
        {tags}
      </Link>
      <motion.div>{info}</motion.div>
      <motion.div>some fancy options</motion.div>
    </motion.div>
  );
};

export const PostView = ({ isMobile, data, setFlash }) => {
  return (
    <motion.div className={styles['postview']}>
      <PostCreationInfo
        image='get user pfp'
        author={data.author}
        date={data.date_posted}
      />
      <PostContentInfo
        title={data.title}
        body={data.content}
        image={data.image}
        setFlash={setFlash}
      />
      <PostOptions tags={data.tags} info={data.info} />
    </motion.div>
  );
};

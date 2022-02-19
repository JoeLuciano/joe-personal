import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Flash } from 'components/pageComponents/flash/Flash';
import {
  HomePage,
  PostsPage,
  PostPage,
  NotFound,
  ExperiencePage,
  UserPage,
  DocumentPage,
} from './pages/pageIndex';
import { Tweedle } from 'components/tweedle/Tweedle';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [width, setWindowWidth] = useState(0);
  const [user, setUser] = useState('not logged in');
  const [flash, setFlash] = useState();
  const [userItems, setUserItems] = useState([]);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const smartFetch = useCallback(
    async ({
      url,
      type,
      payload,
      setLoading = () => {},
      has_files,
      is_image,
    }) => {
      let requestOptions = {};
      if (has_files) {
        requestOptions = {
          method: type,
          ...(payload && { body: payload }),
        };
      } else {
        requestOptions = {
          method: type,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          ...(payload && { body: JSON.stringify(payload) }),
        };
      }
      const response = await fetch(url, requestOptions)
        .then(async (response) => {
          if (is_image) {
            const imageBlob = await response.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            console.groupCollapsed(`${type} Request - ${url}`);
            console.info(imageObjectURL);
            console.groupEnd(`${type} Request - ${url}`);
            return { ok: true, result: imageObjectURL };
          }

          const data = await response.json();

          console.groupCollapsed(`${type} Request - ${url}`);
          if (!response.ok) {
            const error = data || data.message || response.statusText;
            console.error(`Error from ${url}: ${error}`);
            setFlash(<></>);
            setFlash(<Flash message={error.message} type='error' />);
            return { ok: false, result: data };
          } else {
            console.info(`Data from ${url}: ${JSON.stringify(data, null, 4)}`);
            if (data.message) {
              console.info(data.message);
              setFlash(<></>);
              setFlash(<Flash message={data.message} type='success' />);
            }
            return { ok: true, result: data.payload };
          }
        })
        .catch((error) => {
          console.error('There was an error!\n', error.toString());
          if (!flash) {
            setFlash(<Flash message='Action unsuccessful' type='error' />);
          }
          return { ok: false, result: error };
        });
      setLoading(false);
      console.groupEnd(`${type} Request - ${url}`);
      return response;
    },
    [flash]
  );

  const getUser = useCallback(async () => {
    const userResponse = await smartFetch({ url: '/api/user', type: 'GET' });
    if (userResponse.ok) {
      setUser(userResponse.result);
    }
  }, [smartFetch]);

  const headerItems = ['Experience', 'Resume', 'Posts', 'Tweedle'];

  useEffect(() => {
    updateDimensions();
    getUser();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, [getUser]);

  useEffect(() => {
    if (user === undefined) {
      setUserItems(['Register', 'Login']);
    } else if (user !== 'not logged in') {
      setUserItems(['Account']);
    }
  }, [user]);

  const isMobile = width < 1000;
  const pageState = {
    user: user,
    setUser: setUser,
    headerItems: headerItems,
    userItems: userItems,
    isMobile: isMobile,
    setFlash: setFlash,
    smartFetch: smartFetch,
    doAnimate: true,
  };
  const location = useLocation();
  return (
    <div className='App'>
      {flash}
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route path='*' element={<NotFound {...pageState} />} />
          <Route exact path='/' element={<HomePage {...pageState} />}></Route>
          <Route
            exact
            path='/home'
            element={<HomePage {...pageState} />}></Route>
          <Route
            exact
            path='/posts'
            element={<PostsPage {...pageState} />}></Route>
          <Route
            exact
            path='/post/:title'
            element={<PostPage {...pageState} />}></Route>
          <Route
            exact
            path='/experience'
            element={<ExperiencePage {...pageState} />}></Route>
          <Route
            exact
            path='/register'
            element={<UserPage register {...pageState} />}></Route>
          <Route
            exact
            path='/login'
            element={<UserPage login {...pageState} />}></Route>
          <Route
            exact
            path='/account'
            element={<UserPage account {...pageState} />}></Route>
          <Route
            exact
            path='/resume'
            element={<DocumentPage file='resume' {...pageState} />}></Route>
          <Route
            exact
            path='/document/:document'
            element={<DocumentPage {...pageState} />}></Route>
          <Route
            exact
            path='/tweedle'
            element={<Tweedle {...pageState} />}></Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

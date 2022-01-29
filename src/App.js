import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Flash } from 'components/pageComponents/flash/Flash';
import {
  HomePage,
  PostsPage,
  PostPage,
  NotFound,
  ExperiencePage,
  UserPage,
} from './pages/pageIndex';

function App() {
  const [width, setWindowWidth] = useState(0);
  const [user, setUser] = useState('not logged in');
  const [flash, setFlash] = useState();

  useEffect(() => {
    updateDimensions();
    getUser();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const getUser = () => {
    fetch('/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error = data || data.message || response.statusText;
        console.log(error);
      } else {
        console.log(`Username: ${data.username}`);
        setUser(data.username);
      }
    });
  };

  const smartFetch = async (
    url,
    type,
    payload = null,
    setLoading = () => {}
  ) => {
    console.groupCollapsed(`${type} Request - ${url}`);
    const requestOptions = {
      method: type,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      ...(payload && { body: JSON.stringify(payload) }),
    };
    const response = await fetch(url, requestOptions)
      .then(async (response) => {
        const data = await response.json();
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
        return { ok: false, result: error };
      });
    setLoading(false);
    console.groupEnd(`${type} Request - ${url}`);
    return response;
  };

  const headerItems = ['Experience', 'Resume', 'Posts', 'Library'];
  let userItems = [];
  if (user === undefined) {
    userItems = ['Register', 'Login'];
  } else if (user !== 'not logged in') {
    userItems = ['Account'];
  }

  const isMobile = width < 1000;
  const pageState = {
    user: user,
    setUser: setUser,
    headerItems: headerItems,
    userItems: userItems,
    isMobile: isMobile,
    setFlash: setFlash,
    smartFetch: smartFetch,
  };

  return (
    <div className='App'>
      <Router>
        {flash}
        <Routes>
          <Route path='*' element={<NotFound isMobile={isMobile} />} />
          <Route exact path='/' element={<HomePage {...pageState} />}></Route>
          <Route
            exact
            path='/home'
            element={<HomePage doAnimate={false} {...pageState} />}></Route>
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;

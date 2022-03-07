import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { Flash } from 'components/pageComponents/flash/Flash';
import {
  UserContext,
  SmartFetchContext,
  PageContext,
} from 'contexts/GlobalContexts';
import { PageRoutes } from './pages/PageRoutes';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState('not logged in');
  const [flash, setFlash] = useState();
  const [userItems, setUserItems] = useState([]);

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

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1000);
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const getUser = async () => {
      const userResponse = await smartFetch({ url: '/api/user', type: 'GET' });
      if (userResponse.ok) {
        setUser(userResponse.result);
      }
    };
    getUser();

    return () => window.removeEventListener('resize', updateDimensions);
  }, [smartFetch]);

  useEffect(() => {
    if (user === undefined) {
      setUserItems(['Register', 'Login']);
    } else if (user !== 'not logged in') {
      setUserItems(['Account']);
    }
  }, [user]);

  const headerItems = ['Experience', 'Resume', 'Posts', 'Tweedle'];

  return (
    <UserContext.Provider value={{ user, setUser, userItems }}>
      <SmartFetchContext.Provider value={smartFetch}>
        <PageContext.Provider value={{ headerItems, isMobile }}>
          <div className='App'>
            {flash}
            <AnimatePresence exitBeforeEnter>
              <PageRoutes />
            </AnimatePresence>
          </div>
        </PageContext.Provider>
      </SmartFetchContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

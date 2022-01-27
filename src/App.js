import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PostsPage } from './pages/PostsPage';
import { NotFound } from './pages/NotFound';
import { ExperiencePage } from './pages/ExperiencePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { AccountPage } from './pages/AccountPage';

function App() {
  const [width, setWindowWidth] = useState(0);
  const [user, setUser] = useState({});

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
        console.log(data);
        if (data === 'No current user') {
          setUser(undefined);
        } else {
          setUser(data);
        }
      }
    });
  };

  const isMobile = width < 1000;

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route
            exact
            path='/'
            element={<HomePage isMobile={isMobile} user={user} />}></Route>
          <Route
            exact
            path='/home'
            element={
              <HomePage doAnimate={false} isMobile={isMobile} user={user} />
            }></Route>
          <Route
            exact
            path='/posts'
            element={<PostsPage isMobile={isMobile} />}></Route>
          <Route
            path='*'
            element={<NotFound isMobile={isMobile} user={user} />}
          />
          <Route
            exact
            path='/experience'
            element={
              <ExperiencePage isMobile={isMobile} user={user} />
            }></Route>
          <Route
            exact
            path='/register'
            element={<RegisterPage isMobile={isMobile} user={user} />}></Route>
          <Route
            exact
            path='/login'
            element={<LoginPage isMobile={isMobile} user={user} />}></Route>
          <Route
            exact
            path='/account'
            element={<AccountPage isMobile={isMobile} user={user} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

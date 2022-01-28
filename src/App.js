import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PostsPage } from './pages/PostsPage';
import { NotFound } from './pages/NotFound';
import { ExperiencePage } from './pages/ExperiencePage';
import { UserPage } from './pages/UserPage';

function App() {
  const [width, setWindowWidth] = useState(0);
  const [user, setUser] = useState(null);
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
        console.log(data.username);
        if (data === 'No current user') {
          setUser(undefined);
        } else {
          setUser(data.username);
        }
      }
    });
  };

  const isMobile = width < 1000;

  const headerItems = ['Experience', 'Resume', 'Posts', 'Library'];
  let userItems = [];
  if (user === undefined) {
    userItems = ['Register', 'Login'];
  } else if (user) {
    userItems = ['Account'];
  }

  return (
    <div className='App'>
      <Router>
        {flash}
        <Routes>
          <Route
            path='*'
            element={
              <NotFound isMobile={isMobile} user={user} setFlash={setFlash} />
            }
          />
          <Route
            exact
            path='/'
            element={
              <HomePage
                isMobile={isMobile}
                user={user}
                setFlash={setFlash}
                headerItems={headerItems}
                userItems={userItems}
              />
            }></Route>
          <Route
            exact
            path='/home'
            element={
              <HomePage
                doAnimate={false}
                isMobile={isMobile}
                user={user}
                setFlash={setFlash}
                headerItems={headerItems}
                userItems={userItems}
              />
            }></Route>
          <Route
            exact
            path='/posts'
            element={
              <PostsPage
                isMobile={isMobile}
                setFlash={setFlash}
                headerItems={headerItems}
                userItems={userItems}
              />
            }></Route>
          <Route
            exact
            path='/experience'
            element={
              <ExperiencePage
                isMobile={isMobile}
                user={user}
                setFlash={setFlash}
                headerItems={headerItems}
                userItems={userItems}
              />
            }></Route>
          <Route
            exact
            path='/register'
            element={
              <UserPage
                isMobile={isMobile}
                setUser={setUser}
                user={user}
                setFlash={setFlash}
                register={true}
              />
            }></Route>
          <Route
            exact
            path='/login'
            element={
              <UserPage
                isMobile={isMobile}
                setUser={setUser}
                user={user}
                setFlash={setFlash}
                login={true}
              />
            }></Route>
          <Route
            exact
            path='/account'
            element={
              <UserPage
                isMobile={isMobile}
                setUser={setUser}
                user={user}
                setFlash={setFlash}
                account={true}
              />
            }></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

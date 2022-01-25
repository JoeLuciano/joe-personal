import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PostsPage } from './pages/PostsPage';
import { NotFound } from './pages/NotFound';
import { ExperiencePage } from './pages/ExperiencePage';
import { RegisterPage } from './pages/RegisterPage';

function App() {
  const [width, setWindowWidth] = useState(0);
  const [user, setUser] = useState({});
  useEffect(() => {
    updateDimensions();
    // isUserLoggedIn();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  // const isUserLoggedIn = () => {
  //   fetch('/api/user', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //   }).then(async (response) => {
  //     const data = await response.json();
  //     if (!response.ok) {
  //       const error = data || data.message || response.statusText;
  //       console.log(error);
  //       //  setFlash(<></>);
  //       //   setFlash(<Flash message={error} type='error' duration='5000' />);
  //     } else {
  //       console.log(data);
  //       //   setFlash(<Navigate to='/home' />);
  //     }
  //   });
  // };

  const isMobile = width < 1000;

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route
            exact
            path='/'
            element={<HomePage isMobile={isMobile} />}></Route>
          <Route
            path='/home'
            element={
              <HomePage doAnimate={false} isMobile={isMobile} />
            }></Route>
          <Route
            exact
            path='/posts'
            element={<PostsPage isMobile={isMobile} />}></Route>
          <Route path='*' element={<NotFound isMobile={isMobile} />} />
          <Route
            exact
            path='/experience'
            element={<ExperiencePage isMobile={isMobile} />}></Route>
          <Route
            exact
            path='/register'
            element={<RegisterPage isMobile={isMobile} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

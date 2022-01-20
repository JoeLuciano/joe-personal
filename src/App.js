import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PostsPage } from './pages/PostsPage';
import { NotFound } from './pages/NotFound';
import { ExperiencePage } from './pages/ExperiencePage';

function App() {
  const [width, setWindowWidth] = useState(0);
  useEffect(() => {
    updateDimensions();

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;

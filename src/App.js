import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PostsPage } from './pages/PostsPage';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />}></Route>
          <Route path='/home' element={<HomePage doAnimate={false} />}></Route>
          <Route exact path='/posts' element={<PostsPage />}></Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

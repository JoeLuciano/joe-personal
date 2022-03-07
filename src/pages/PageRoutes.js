import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './HomePage';
import { UserPage } from './UserPage';
import { PostsPage } from './PostsPage';
import { ExperiencePage } from './ExperiencePage';
import { DocumentPage } from './DocumentPage';
import { NotFound } from './NotFound';
import { Tweedle } from 'components/tweedle/Tweedle';

export const PageRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.key}>
      <Route path='*' element={<NotFound />} />
      <Route exact path='/' element={<HomePage />}></Route>
      <Route exact path='/home' element={<HomePage />}></Route>
      <Route exact path='/posts' element={<PostsPage />}></Route>
      <Route exact path='/experience' element={<ExperiencePage />}></Route>
      <Route exact path='/register' element={<UserPage register />}></Route>
      <Route exact path='/login' element={<UserPage login />}></Route>
      <Route exact path='/account' element={<UserPage account />}></Route>
      <Route
        exact
        path='/resume'
        element={<DocumentPage file='resume' />}></Route>
      <Route
        exact
        path='/document/:document'
        element={<DocumentPage />}></Route>
      <Route exact path='/tweedle' element={<Tweedle />}></Route>
    </Routes>
  );
};

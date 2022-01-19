import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div>
      Your lost, head on <Link to='/home'>Home</Link>
    </div>
  );
};

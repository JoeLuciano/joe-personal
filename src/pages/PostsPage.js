import { BasePage } from './BasePage';
import { PostView } from 'components/postComponents/postview/PostView';

export const PostsPage = () => {
  return <BasePage pageContent={<PostView />} />;
};

import { BasePage } from './BasePage';
import { PostView } from 'components/postComponents/postview/PostView';

export const PostsPage = (props) => {
  return (
    <BasePage
      {...props}
      pageContent={
        <>
          <PostView {...props} />
        </>
      }
    />
  );
};

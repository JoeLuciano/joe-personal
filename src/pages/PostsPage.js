import { useState, useEffect, useCallback } from 'react';
import { BasePage } from './BasePage';
import { AllPosts } from 'components/postComponents/allPosts/AllPosts';
import { CreatePostForm } from 'components/formComponents/createPostForm/CreatePostForm';

export const PostsPage = (props) => {
  const [allPosts, setAllPosts] = useState([]);
  const { smartFetch } = props;
  const getAllPosts = useCallback(async () => {
    const allPostsResponse = await smartFetch('/api/allposts', 'GET');
    if (allPostsResponse.ok) {
      setAllPosts(allPostsResponse.result);
    } else {
      setAllPosts([{ title: 'ERROR: Could not get posts' }]);
    }
  }, [smartFetch]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <BasePage
      {...props}
      pageContent={
        <>
          <AllPosts {...props} allPosts={allPosts} />
          <CreatePostForm {...props} getAllPosts={getAllPosts} />
        </>
      }
    />
  );
};

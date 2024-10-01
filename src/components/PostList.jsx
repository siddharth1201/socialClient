import React from 'react';
import Post from './Post';
import './css/PostList.css'; // Import the CSS file

const PostList = ({ posts, updatePostLikes }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post._id} post={post} updatePostLikes={updatePostLikes} />
      ))}
    </div>
  );
};

export default PostList;

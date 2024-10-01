import React from 'react';
import { likePost } from '../api/posts';
import './css/Post.css';

const handleLike = async (postId, updatePostLikes) => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  
  const res = await likePost(postId, { userId: user._id });
  console.log(res);

  // Call the update function passed as a prop
  if (res.status === 200) {
    updatePostLikes(postId, user._id);
  }
};

const Post = ({ post, updatePostLikes }) => {
  console.log(post);
  const imgURL = post.img;

  return (
    <div className="post">
      <h3>{post.desc}</h3>
      {post.img && <img src={imgURL} style={{ maxWidth: '100%', height: 'auto' }} alt="Post" />}
      <button onClick={() => handleLike(post._id, updatePostLikes)}>Likes: {post.likes.length}</button>
    </div>
  );
};

export default Post;

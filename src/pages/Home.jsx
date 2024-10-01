import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from '../components/PostList';
import Navbar from '../components/Navbar';
import CreatePost from '../components/CreatePost';
import { getPosts } from '../api/posts';
import './css/Home.css'; // Import the CSS file

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate("/login");
  };

  useEffect(() => {

    const fetchPosts = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await getPosts(user._id);
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  // Function to add a new post to the list
  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // Function to update likes count
  const updatePostLikes = (postId, userId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes: post.likes.includes(userId)
                ? post.likes.filter((id) => id !== userId)
                : [...post.likes, userId],
            }
          : post
      )
    );
  };

  return (
    <div className="home-container">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="home-content">
        <button type="submit" onClick={handleLogout}>Logout</button>
      
        <CreatePost addPost={addPost} />
        <PostList posts={posts} updatePostLikes={updatePostLikes} />
      </div>
    </div>
  );
};

export default Home;

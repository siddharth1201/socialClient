import React, { useState } from 'react';
import { createPost } from '../api/posts';
import './css/CreatePost.css'; // Import the CSS file

const CreatePost = ({ addPost }) => {
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    const newPost = {
      desc,
      img,
      userId: user._id,
    };

    const res = await createPost(newPost);
    if (res.status === 200) {
      addPost(res.data);
    }

    setDesc('');
    setImg('');
  };

  return (
    <div className="create-post-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="What's on your mind?"
        />
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          placeholder="Image URL"
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;

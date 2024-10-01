// src/components/ProfilePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserById, updateUserProfile } from '../api/users'; // Import update API function
import Navbar from '../components/Navbar';
import './css/Profile.css'; // Import the CSS file

const ProfilePage = () => {
  const userId = JSON.parse(localStorage.getItem('user'))._id;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const isAdmin = ''
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    isAdmin: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserById(userId);
        setUser(response.data);
        
        
        setFormData({
          ...formData,
          name: response.data.name,
          username: response.data.username,
          email: response.data.email,
          isAdmin: response.data.isAdmin

        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(userId, formData); // API call to update user profile
      alert('Profile updated successfully!');
      setIsEditing(false);
      window.location.reload(); // Reload to reflect changes
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="profile-container">
      <Navbar className="navbar" />
      {user ? (
        <div className="profile-card">
          <img
            src={user.profilePicture || 'default-image-url.jpg'}
            alt="Profile"
            className="profile-picture"
          />
          <div className="profile-details">
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Joined: {new Date(user.joinedDate).toLocaleDateString()}</p>
          </div>
          <div className="follow-info">
            <p>Followers: {user.followers.length}</p>
            <p>Following: {user.followings.length}</p>
          </div>
          <button className="edit-button" onClick={handleEditClick}>
            Edit Profile
          </button>
        </div>
      ) : (
        <p>User not found</p>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="edit-modal">
          <form className="edit-form" onSubmit={handleFormSubmit}>
            <h2>Edit Profile</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleInputChange}
            />
            <button type="submit">Save Changes</button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

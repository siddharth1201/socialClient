import axios from 'axios';

const API_URL = "http://localhost:8800/api/users/";

export const getUserById = (userId) => axios.get(`${API_URL}/${userId}`);

export const updateUserProfile = (userId,formData) => axios.put(`${API_URL}/${userId}`, {userId,...formData});
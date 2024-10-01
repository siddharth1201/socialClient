import axios from 'axios';

const API_URL = "http://localhost:8800/api/posts/";

export const getPosts = (id) => axios.get(`${API_URL}timeline/all/${id}`);
export const createPost = (postData) => axios.post(API_URL, postData);
export const likePost = (postId,user) => axios.put(`${API_URL}${postId}/like`, user)


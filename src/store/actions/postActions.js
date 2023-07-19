import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';

const API_BASE_URL = 'https://my-json-server.typicode.com/MrNedNikita/fakeServer';
// const API_BASE_URL = 'http://localhost:3000';

export const fetchPosts = () => async (dispatch) => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  dispatch({ type: FETCH_POSTS, payload: response.data });
};

export const addPost = (id, title, body) => async (dispatch) => {
  const response = await axios.post(`${API_BASE_URL}/posts`, { id, title, body });
  dispatch({ type: ADD_POST, payload: response.data });
};

export const deletePost = (id) => async (dispatch) => {
  await axios.delete(`${API_BASE_URL}/posts/${id}`);
  dispatch({ type: DELETE_POST, payload: id });
};

export const editPost = (id, title, body) => async (dispatch) => {
  await axios.put(`${API_BASE_URL}/posts/${id}`, { title, body });
  dispatch({ type: EDIT_POST, payload: { id, title, body } });
};

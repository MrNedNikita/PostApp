import axios from 'axios';

export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

const API_BASE_URL = 'https://my-json-server.typicode.com/MrNedNikita/fakeServer';

export const fetchComments = () => async (dispatch) => {
  const response = await axios.get(`${API_BASE_URL}/comments`);
  dispatch({ type: FETCH_COMMENTS, payload: response.data });
};

export const addComment = (postId, text) => async (dispatch) => {
  const response = await axios.post(`${API_BASE_URL}/comments`, { postId, text });
  dispatch({ type: ADD_COMMENT, payload: response.data });
};

export const deleteComment = (id) => async (dispatch) => {
  await axios.delete(`${API_BASE_URL}/comments/${id}`);
  dispatch({ type: DELETE_COMMENT, payload: id });
};

export const editComment = (id, text) => async (dispatch) => {
  await axios.put(`${API_BASE_URL}/comments/${id}`, { text });
  dispatch({ type: EDIT_COMMENT, payload: { id, text } });
};

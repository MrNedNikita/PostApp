export const FETCH_POSTS = 'FETCH_POSTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const SET_LOADING = 'SET_LOADING';

const API_BASE_URL = 'https://my-json-server.typicode.com/MrNedNikita/PostApp/blob/main';
// const API_BASE_URL = 'https://my_json_server.typicode.com/MrNedNikita/fakeServer';
// const API_BASE_URL = 'http://localhost:3000';

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const fetchPosts = () => async (dispatch) => {
  try {
    dispatch(setLoading(true)); 
    const response = await fetch(`${API_BASE_URL}/posts`);
    const data = await response.json();
    dispatch({ type: FETCH_POSTS, payload: data });
    dispatch(setLoading(false)); 
  } catch (error) {
    console.error('Error fetching posts:', error);
    dispatch(setLoading(false)); 
  }
};

export const addPost = (id, title, body) => async (dispatch) => {
  try {
    dispatch(setLoading(true)); 
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, title, body }),
    });
    const data = await response.json();
    dispatch({ type: ADD_POST, payload: data });
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error adding post:', error);
    dispatch(setLoading(false));
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true)); 
    await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    dispatch({ type: DELETE_POST, payload: id });
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error deleting post:', error);
    dispatch(setLoading(false));
  }
};

export const editPost = (id, title, body) => async (dispatch) => {
  try {
    dispatch(setLoading(true)); 
    await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });
    dispatch({ type: EDIT_POST, payload: { id, title, body } });
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error editing post:', error);
    dispatch(setLoading(false));
  }
};


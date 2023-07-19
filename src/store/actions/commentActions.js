export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

const API_BASE_URL = 'https://my-json-server.typicode.com/MrNedNikita/PostApp/blob/main';
// const API_BASE_URL = 'https://my_json_server.typicode.com/MrNedNikita/fakeServer';
// const API_BASE_URL = 'http://localhost:3000';

export const fetchComments = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comments`);
      const data = await response.json();
      dispatch({ type: FETCH_COMMENTS, payload: data });
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
};

export const addComment = (id, text, postId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, text, postId }),
      });
      const data = await response.json();
      dispatch({ type: ADD_COMMENT, payload: data });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
};

export const deleteComment = (id) => async (dispatch) => {
  try {
    await fetch(`${API_BASE_URL}/comments/${id}`, {
      method: 'DELETE',
    });
    dispatch({ type: DELETE_COMMENT, payload: id });
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};

export const editComment = (id, text, postId) => async (dispatch) => {
  try {
    await fetch(`${API_BASE_URL}/comments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, postId }),
    });
    dispatch({ type: EDIT_COMMENT, payload: { id, text, postId } });
  } catch (error) {
    console.error('Error editing comment:', error);
  }
};

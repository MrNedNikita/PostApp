import { FETCH_POSTS, ADD_POST, DELETE_POST, EDIT_POST } from '../actions/postActions.js';

const initialState = [];

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    case ADD_POST:
      return [action.payload, ...state];
    case DELETE_POST:
      return state.filter((post) => post.id !== action.payload);
    case EDIT_POST:
      return state.map((post) =>
        post.id === action.payload.id ? { ...post, title: action.payload.title, body: action.payload.body } : post
      );
    default:
      return state;
  }
};

export default postReducer;

import { FETCH_POSTS, ADD_POST, DELETE_POST, EDIT_POST, SET_LOADING } from '../actions/postActions.js';

const initialState = {
  posts: [],
  loading: {
    fetchPosts: false,
    addPost: false,
    deletePost: false,
    editPost: false,
  },
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: { ...state.loading, ...action.payload },
      };
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.sort((a, b) => b.id - a.id),
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? { ...post, title: action.payload.title, body: action.payload.body } : post
        ),
      };
    default:
      return state;
  }
};

export default postReducer;


export default postReducer;

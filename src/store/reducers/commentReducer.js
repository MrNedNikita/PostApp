import { FETCH_COMMENTS, ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT } from '../actions/commentActions.js'

const initialState = [];

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return action.payload.sort((a, b) => b.id - a.id);
    case ADD_COMMENT:
      return [action.payload, ...state];
    case DELETE_COMMENT:
      return state.filter((comment) => comment.id !== action.payload);
    case EDIT_COMMENT:
      return state.map((comment) =>
        comment.id === action.payload.id ? { ...comment, text: action.payload.text } : comment
      );
    default:
      return state;
  }
};

export default commentReducer;

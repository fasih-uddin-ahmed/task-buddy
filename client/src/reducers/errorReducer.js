import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {};
//here we are receiving error action and sending error info to components for displaying
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}

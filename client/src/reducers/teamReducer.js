import { GET_USERS } from "../actions/types";

const initialState = {
  users: []
};
//here we are receiving error action and sending error info to components for displaying
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS: {
      console.log("inside getUSers reducer");

      return {
        ...state,
        users: action.payload
      };
    }

    default:
      return state;
  }
}

import { SET_ACTIVE_BOARD } from "../actions/types";

const initialState = {
  id: ""
};

const activeBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_BOARD: {
      return {
        id: action.payload
      };
    }

    default:
      return state;
  }
};

export default activeBoardReducer;

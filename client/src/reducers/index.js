import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
//import mainListsReducer from "./mainListsReducer";
import boardsReducer from "./boardsReducer";
import activeBoardReducer from "./activeBoardReducer";
import modalReducer from "./modalReducer";
import teamReducer from "./teamReducer";

//here we are including all ov our reducers and combining them to make rootReducer so store will use them as a single reducer
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  // lists: mainListsReducer,
  boards: boardsReducer,
  activeBoard: activeBoardReducer,
  modal: modalReducer,
  team: teamReducer
});

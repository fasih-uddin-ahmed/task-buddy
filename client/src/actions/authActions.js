import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";


//Register
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      history.push("/login")
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login - Get user token
export const loginUser = userData => dispatch => {
  axios
    .post("api/users/login", userData)
    .then(res => {
      //save to local storage
      const { token } = res.data;
      //Set token to localstorage
      localStorage.setItem("jwtToken", token);
      //Set token to auth header
      setAuthToken(token);
      //decode token to get userdata
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loggedin user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Log user out
export const logoutUser = () => dispatch => {
  // remove the token from local storage
  localStorage.removeItem("jwtToken");
  //remove auth header for future requests
  setAuthToken(false);
  //set the current user to an empty object{} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

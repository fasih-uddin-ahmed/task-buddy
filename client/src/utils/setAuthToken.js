import axios from "axios";

//if user is successfully logged in then we are assigning token with header of request
const setAuthToken = token => {
  if (token) {
    //then apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //then delete the auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;

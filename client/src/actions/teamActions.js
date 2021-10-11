import axios from "axios";

import {
  GET_ERRORS,
  GET_USERS
  // ADD_LAST_DATE,
  // ADD_DESCRIPTION
} from "./types";

//Add
export const getUsers = () => dispatch => {
  axios
    .get("/api/users/getUsers")
    .then(res => {
      console.log(res.data);
      console.log("inside get users action");
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("inside catch of getUSers");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const createTeam = team => dispatch => {
  axios
    .post(`/api/users/team`, { team: team })
    .then(res => {
      dispatch(getUsers());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//for sending Request
export const sendRequest = (email, userID) => dispatch => {
  axios
    .post(`/api/users/search/${userID}`, {
      email: email
    })
    .then(res => {
      if (res.data === "found") {
        if (window.confirm("Email found and request sent!")) {
          axios
            .post(`/api/users/sendRequest/${userID}`, { email: email })
            .then(res => {
              dispatch(getUsers());
            });
        }
      } else {
        if (window.confirm(res.data)) {
          console.log("else of send request ");
          console.log(res.data);
        }
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//for accepting request
export const acceptRequest = (email, team, userID) => dispatch => {
  axios
    .post(`/api/users/acceptRequest/${userID}`, {
      email: email,
      team: team
    })
    .then(res => {
      if (res.data === "request approved") {
        axios
          .post(`/api/users/acceptRequest/senderr/${userID}`, {
            email: email
          })
          .then(res => {
            dispatch(getUsers());
          });
      } else {
        console.log(res.data);
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//for accepting request
export const rejectRequest = (email, userID) => dispatch => {
  axios
    .post(`/api/users/rejectRequest/${userID}`, {
      email: email
    })
    .then(res => {
      if (res.data === "request rejected") {
        axios
          .post(`/api/users/rejectRequest/senderr/${userID}`, {
            email: email
          })
          .then(res => {
            dispatch(getUsers());
          });
      } else {
        console.log(res.data);
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

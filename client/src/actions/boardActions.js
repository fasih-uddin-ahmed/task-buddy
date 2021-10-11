//addBoard, getBoard

import axios from "axios";

import {
  ADD_BOARD,
  GET_ERRORS,
  GET_BOARDS,
  SET_ACTIVE_BOARD,
  BOARD_LOADING,
  DELETE_BOARD
} from "./types";

//Add BOARD

export const addBoard = title => dispatch => {
  axios
    .post("/api/boards", { title: title })
    .then(res => {
      dispatch({
        type: ADD_BOARD,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//get boards

export const getBoards = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/boards")
    .then(res => {
      dispatch({
        type: GET_BOARDS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_BOARDS,
        payload: null
      });
    });
};

//edit Title of board
export const editTitle = (id, title) => dispatch => {
  console.log(id.idd, title);
  axios
    .post(`/api/boards/title/${id.idd}`, {
      title: title
    })
    .then(res => {
      dispatch(getBoards());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//edit Description of board
export const editDescription = (id, description) => dispatch => {
  console.log(id.idd, description);
  axios
    .post(`/api/boards/description/${id.idd}`, {
      description: description
    })
    .then(res => {
      dispatch(getBoards());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Add members
export const addMember = (id, name, avatar, userID) => dispatch => {
  axios
    .post(`/api/boards/members/${id}`, {
      name: name,
      avatar: avatar,
      userID: userID
    })
    .then(res => {
      if (window.confirm(res.data)) {
        console.log("inside action of add members");
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


//Add members through search
export const addMemberr = (id, email, userName) => dispatch => {
  axios
    .post(`/api/boards/members/search/${id}`, {
      email: email,
      userr: userName
    })
    .then(res => {
      if (window.confirm(res.data)) {
        console.log("inside action of add members");
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



//delete members
export const deleteMember = (boardID, memberID) => dispatch => {
  if (window.confirm("Are u sure! you wanna remove that member")) {
    axios
      .delete(`/api/boards/members/${boardID}/${memberID}`)
      .then(res => {
        if (window.confirm(res.data)) {
          dispatch(getBoards());
        }
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};

//deleteBoard
export const deleteBoard = id => dispatch => {
  if (window.confirm("Are u sure! you wanna remove that board")) {
    axios
      .delete(`/api/boards/${id}`)
      .then(res => {
        dispatch(getBoards());
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};

//set active board
export const setActiveBoard = id => {
  return {
    type: SET_ACTIVE_BOARD,
    payload: id
  };
};

export const setPostLoading = () => {
  return {
    type: BOARD_LOADING
  };
};

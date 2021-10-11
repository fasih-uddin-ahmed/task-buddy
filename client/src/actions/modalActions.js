import axios from "axios";

import {
  GET_ERRORS,
  GET_MODALS,
  ADD_MEMBERS,
  REMOVE_MEMBERS,
  GET_COMMENTS,
  DELETE_CHECKLIST,
  ADD_CHECKLIST,
  ADD_DESCRIPTION,
  ADD_DUEDATE
} from "./types";

//Add CARD
export const getModals = () => dispatch => {
  axios
    .get(`/api/cardModal`)
    .then(res => {
      dispatch({
        type: GET_MODALS,
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

//initialize
export const initModal = (cardID, userID) => dispatch => {
  axios
    .post(`/api/cardModal/${cardID}/${userID}`)
    .then(res => {
      console.log("inside action of init Modals");
      console.log(res.data);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Add Description

//here we are updating description and updating in store too by sending it to store with (cardid and updated desc)
export const addDescription = (cardID, description) => dispatch => {
  console.log("inside action of add desc and");
  console.log(cardID, description);
  const id = cardID.idd;
  axios
    .post(`/api/cardModal/description/update/${id}`, {
      description: description
    })
    .then(res => {
      if (res.data === "User not authorized") {
        if (window.confirm("You are not authorized for this action")) {
        }
      } else {

        const chk = res.data;
        dispatch({
          type: ADD_DESCRIPTION,
          payload: {
            chk,
            id
          }
        })
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//here we are updating dating and updating in store too by sending it to store with (cardid and updated date) 
export const addDueDate = (cardID, dueDate) => dispatch => {
  const id = cardID.idd;
  axios
    .post(`/api/cardModal/duedate/update/${id}`, { dueDate: dueDate })
    .then(res => {
      const chk = res.data;
      if (res.data === "User not authorized") {
        if (window.confirm("You are not authorized for this action")) {
        }
      } else {
        dispatch({
          type: ADD_DUEDATE,
          payload: {
            chk,
            id
          }
        })
      }

    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });

    });
};

//Add checklist
//here we are receiving full array of checklists from server and then sending only (new array with card id) to reducer through (chk variable)
export const addChecklist = (cardID, checklist) => dispatch => {
  const id = cardID.idd;
  axios
    .post(`/api/cardModal/checklists/update/${id}`, {
      name: checklist
    })
    .then(res => {
      if (res.data === "User not authorized") {
        if (window.confirm("You are not authorized for this action")) {
        }
      } else {
        let chk;
        res.data.map(item => {
          if (item.name === checklist) {
            chk = item;
          }
        });
        dispatch({

          type: ADD_CHECKLIST,
          payload: {
            chk,
            id
          }
        });
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });

    });
};


//change status of checklist
export const changeStatus = (cardsID, status, checklistID) => dispatch => {
  axios
    .post(`/api/cardModal/checklists/update/${cardsID}/${checklistID}`, {
      status: status
    })
    .then(res => {
      if (res.data === "User not authorized") {
        if (window.confirm("You are not authorized for this action")) {
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

//delete checklist
//here we are deleting checklist and sending(card id and checklist id) to reducer to remove it from store too
export const deleteChecklist = (cardsID, checklistID) => dispatch => {
  axios
    .delete(`/api/cardModal/checklists/update/${cardsID}/${checklistID}`)
    .then(res => {
      console.log("inside action of delete checklist");
      dispatch({
        type: DELETE_CHECKLIST,
        payload: {
          checklistID,
          cardsID
        }
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Add comments
export const addComment = (cardID, comment) => dispatch => {
  axios
    .post(`/api/cardModal/comments/update/${cardID}`, comment)
    .then(res => {
      console.log("inside action of add comments");
      console.log(res.data);
      dispatch({
        type: GET_COMMENTS,
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

//delete comments
export const deleteComment = (cardsID, commentID) => dispatch => {
  axios
    .delete(`/api/cardModal/comments/update/${cardsID}/${commentID}`)
    .then(res => {
      console.log("inside action of delete comments");
      console.log(res.data);
      dispatch({
        type: GET_COMMENTS,
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

//get comments by cardIDD
export const getComments = cardID => dispatch => {
  axios
    .get(`/api/cardModal/comments/update/${cardID}`)
    .then(res => {
      console.log("inside action of get comments");
      console.log(res.data);
      dispatch({
        type: GET_COMMENTS,
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

//Add members
//here we are receiving full array of members from server and then sending only (new array with card id) to reducer through (chk variable)

export const addMembers = (cardID, userID, email) => dispatch => {
  axios
    .post(`/api/cardModal/members/update/${cardID}`, {
      email: email,
      user_id: userID
    })
    .then(res => {
      if (res.data === "User not authorized") {
        if (window.confirm("You are not authorized for this action")) { }
      } else {
        let chk;
        res.data.map(item => {
          if (item.email === email) {
            chk = item;
          }
        });
        console.log("inside action of add members and new member is and card id is");
        dispatch({
          type: ADD_MEMBERS,
          payload: {
            chk,
            cardID
          }
        });
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
//here we are deleting member and sending(card id and member id) to reducer to remove it from store too

export const deleteMembers = (cardsID, MembersID) => dispatch => {
  if (window.confirm("Are u sure! you wanna remove that user")) {
    axios
      .delete(`/api/cardModal/members/update/${cardsID}/${MembersID}`)
      .then(res => {
        if(res.data === "User not authorized"){
          if (window.confirm("You are not authorized for this action")) {
          }   
        }else{
        dispatch({
          type: REMOVE_MEMBERS,
          payload: {
            MembersID,
            cardsID
          }
        });
        }
      })
      .catch(err => {
       dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
      });
  }
}

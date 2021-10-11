import axios from "axios";

import { GET_ERRORS, GET_LISTS } from "./types";

//Add CARD
export const addCards = (boardID, listID, title) => dispatch => {
  axios
    .post(`/api/boards/${boardID}/lists/${listID}/cards`, { text: title })
    .then(res => {
      console.log("inside action of addcards");
      console.log(res.data);
      dispatch({
        type: GET_LISTS,
        payload: res.data
      });
    })
    .catch(err => {
      if (window.confirm("Not authorized for this action ")) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
    });
};

// //get cards
// export const getCards = listID => dispatch => {
//   axios
//     .get(`/api/cards/${listID}`)
//     .then(res => {
//       dispatch({
//         type: GET_CARDS,
//         payload: res.data
//       });
//     })
//     .catch(err => {
//       dispatch({
//         type: GET_CARDS,
//         payload: null
//       });
//     });
// };

//get cards
export const getCards = (boardID, listID) => dispatch => {
  axios
    .get(`/api/boards/${boardID}/lists/${listID}/cards`)
    .then(res => {
      dispatch({
        type: GET_LISTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_LISTS,
        payload: null
      });
    });
};

export const deleteCard = (boardID, listID, id) => dispatch => {
  axios
    .delete(`/api/boards/${boardID}/lists/${listID}/cards/${id}`)
    .then(res => {
      dispatch({
        type: GET_LISTS,
        payload: res.data
      });
    })
    .catch(err => {
      if (window.confirm("Not authorized for this action ")) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
    });
};

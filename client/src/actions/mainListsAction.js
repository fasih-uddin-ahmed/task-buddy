import axios from "axios";

import { GET_LISTS, GET_ERRORS, DELETE_LIST, DRAG_LIST, DRAG_CARDS } from "./types";

//get lists

export const getLists = boardID => dispatch => {
  axios
    .get(`/api/boards/${boardID}/lists`)
    .then(res => {
      console.log("inside getLists action");
      dispatch({
        type: GET_LISTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("inside catch no list found ..in acvtion");
      dispatch({
        type: GET_LISTS,
        payload: null
      });
    });
};

export const addLists = (title, boardID) => dispatch => {
  axios
    .post(`/api/boards/${boardID}/lists`, { title: title })
    .then(res => {
      console.log("inside lists action");
      console.log(title);
      dispatch(getLists(boardID));
    })
    .catch(err => {
      if (window.confirm("You are not authorized to add list")) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
    });
};

//this case is for handling the dragging of cards

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type,
  lists,
  boardidd
) => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;

    console.log(
      "now we are inside sort reducer of dragging and gonna check if its list or card"
    );
    // draggin lists around - the listOrderReducer should handle this
    if (type === "list") {
      console.log("as its listt");
      axios
        .delete(
          `/api/boards/${boardidd}/lists/draggss/${droppableIndexStart}/${droppableIndexEnd}`
        )
        .then(res => {
          console.log("inside response of drag lists");
          console.log(res.data);
          let arr = [];
          res.data.map(item => {
            arr.push(item);
          })
          dispatch({
            type: DRAG_LIST,
            payload: {

              arr
            }
          });
        })
        .catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
        });
    } else {
      console.log(droppableIndexStart);
      console.log(droppableIndexEnd);
      console.log(droppableIdStart);
      console.log(droppableIdEnd);
      console.log(boardidd);
      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        console.log(
          "so dragging happens inside same list and displaying droppableindexStart ,droppableIndexEnd,droppable IdStart and droppableidend and boardID"
        );

        console.log("now we are dispatching dragcards of same lists");
        dispatch(
          dragCards(
            boardidd,
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd
          )
        );
      }

      // drag happened in different lists
      // other list

      if (droppableIdStart !== droppableIdEnd) {
        console.log("so drag happened in different lists ");
        console.log("now we are dispatching dragcards of different lists");
        dispatch(
          dragCards(
            boardidd,
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd
          )
        );

        // console.log("now gonna dispatch DRAG_HAPPENED");
        // dispatch({
        //   type: DRAG_HAPPENED,
        //   payload: {
        //     droppableIdStart,
        //     droppableIdEnd
        //   }
        // });
      }
    }
  };
};

export const editTitle = (boardID, listID, newTitle) => dispatch => {
  axios
    .post(`/api/boards/${boardID}/lists/${listID}`, { title: newTitle })
    .then(res => {
      dispatch(getLists(boardID));
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

export const deleteList = (boardID, listID) => dispatch => {
  axios
    .delete(`/api/boards/${boardID}/lists/${listID}`)
    .then(res => {
      dispatch({
        type: DELETE_LIST,
        payload: listID
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

export const dragCards = (
  boardID,
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd
) => dispatch => {
  axios
    .delete(
      `/api/boards/${boardID}/lists/${droppableIdStart}/listss/${droppableIdEnd}/cardss/${droppableIndexStart}/${droppableIndexEnd}`
    )
    .then(res => {
      console.log("inside response of drag cards ");
      console.log(res.data);
      let arr = [];
      res.data.map(item => {
        arr.push(item);
      })
      dispatch({
        type: DRAG_CARDS,
        payload: {
          arr
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

//for editing card
export const editCard = (boardID, listID, id, cardText) => dispatch => {
  axios
    .post(`/api/boards/${boardID}/lists/${listID}/cards/${id}`, {
      text: cardText
    })
    .then(res => {
      dispatch(getLists(boardID));
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

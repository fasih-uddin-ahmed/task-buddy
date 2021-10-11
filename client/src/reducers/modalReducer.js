import {
  GET_MODALS,
  GET_CHECKLISTS,
  DELETE_CHECKLIST,
  ADD_MEMBERS,
  REMOVE_MEMBERS,
  GET_COMMENTS,
  ADD_CHECKLIST,
  ADD_DESCRIPTION,
  ADD_DUEDATE
} from "../actions/types";
import { element } from "prop-types";

const initialState = {
  modals: [],
  checklists: [],
  members: [],
  desc: [],
  dueDate: [],
  comments: []
};
//here we are receiving error action and sending error info to components for displaying
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MODALS: {
      return {
        ...state,
        modals: action.payload
      };
    }
    case GET_COMMENTS: {
      return {
        ...state,
        comments: action.payload
      };
    }
    case GET_CHECKLISTS: {
      return {
        ...state,
        checklists: action.payload
      };
    }
    //here we are getting new checklist and adding it to state immutably
    case ADD_CHECKLIST: {
      const { chk, id } = action.payload;
      console.log(chk);
      //console.log("before .....checklists were/......");
      //console.log(state.modals[removeIndex].checklist);
      // getting the index of target card's modal through (cardID)
      const removeIndex = state.modals.map(modal => modal.card_id).indexOf(id);
      return {
        ...state,
        modals: [
          ...state.modals,
          {
            //...state.modals[removeIndex],
            checklist: state.modals[removeIndex].checklist.unshift(chk)
          }
        ]
      };
    }



    //here we are deleting checklist and removing it from state
    case DELETE_CHECKLIST: {
      const { checklistID, cardsID } = action.payload;
      // getting the index of target card's modal through (cardID)
      const removeIndex = state.modals
        .map(modal => modal.card_id)
        .indexOf(cardsID);

      const chklists = state.modals[removeIndex].checklist.filter(chk => chk._id !== checklistID);
      console.log(chklists);
      return {
        ...state,
        modals: [
          ...state.modals,
          {
            ...state.modals[removeIndex].checklist = chklists
          }
        ]
      }
    };



    //here we are getting new member and adding it to state immutably
    case ADD_MEMBERS: {
      const { chk, cardID } = action.payload;
      console.log('inside add members reducer and new member and card id is');
      console.log(chk, cardID);
      // getting the index of target card's modal through (cardID)
      const removeIndex = state.modals.map(modal => modal.card_id).indexOf(cardID);

      console.log("before .....members were/......");
      console.log(state.modals[removeIndex].members);
      return {
        ...state,
        modals: [
          ...state.modals,
          {
            ...state.modals[removeIndex],
            members: state.modals[removeIndex].members.unshift(chk)
          }
        ]
      };
    }



    //here we are deleting members and removing it from state
    case REMOVE_MEMBERS: {
      const { MembersID, cardsID } = action.payload;
      // getting the index of target card's modal through (cardID)
      const removeIndex = state.modals
        .map(modal => modal.card_id)
        .indexOf(cardsID);

      const mmbrs = state.modals[removeIndex].members.filter(m => m._id !== MembersID);
      console.log(mmbrs);
      return {
        ...state,
        modals: [
          ...state.modals,
          {
            ...state.modals[removeIndex].members = mmbrs
          }
        ]
      }
    };

    case ADD_DESCRIPTION: {
      const { chk, id } = action.payload;
      console.log('inside add description reducer  and card id is');
      console.log(chk, id);
      // getting the index of target card's modal through (cardID)
      const removeIndex = state.modals.map(modal => modal.card_id).indexOf(id);
      return {
        ...state,
        modals: [
          ...state.modals,
          {
            ...state.modals[removeIndex].description = chk
          }
        ]
      };
    }

    case ADD_DUEDATE: {
      const { chk, id } = action.payload;
      console.log('inside add duedate reducer  and card id is');
      console.log(chk, id);
      // getting the index of target card's modal through (cardID)
      const removeIndex = state.modals.map(modal => modal.card_id).indexOf(id);
      return {
        ...state,
        modals: [
          ...state.modals,
          {
            ...state.modals[removeIndex].dueDate = chk
          }
        ]
      };
    }

    // case GET_MEMBERS: {
    //   return {
    //     ...state,
    //     members: action.payload
    //   };
    // }
    default:
      return state;
  }
}

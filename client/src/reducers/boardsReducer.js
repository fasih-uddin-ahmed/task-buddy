import {
  ADD_BOARD,
  GET_BOARDS,
  ADD_LIST,
  GET_LISTS,
  DRAG_HAPPENED,
  DELETE_LIST,
  JUST_STATE,
  ADD_CARD,
  GET_CARDS,
  DELETE_CARD,
  BOARD_LOADING,
  DELETE_BOARD,
  DRAG_LIST,
  DRAG_CARDS
} from "../actions/types";

const initialState = {
  boards: [],
  lists: [],
  cards: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOARDS:
      return {
        ...state,
        boards: action.payload
      };
    case ADD_BOARD: {
      return {
        ...state,
        boards: [action.payload, ...state.boards]
      };
    }
    //case for deleting board
    case DELETE_BOARD: {
      return {
        ...state,
        boards: state.boards.filter(board => board._id !== action.payload)
      };
    }
    case ADD_LIST: {
      return {
        ...state,
        lists: [action.payload, ...state.lists]
      };
    }

    //for getting lists
    case GET_LISTS:
      console.log("inside GETLISTS reducer");
      console.log(action.payload);
      return {
        ...state,
        lists: action.payload
      };

    //
    //
    //
    //
    //for dragging lists
    case DRAG_LIST: {
      const { arr } = action.payload;
      console.log("inside DRAGLISTS reducer");

      return {
        ...state,
        lists: [
          ...state.lists = arr

        ]
      }

    }

    //
    //
    //
    //this case is for handling the dragging of cards
    case DRAG_CARDS: {
      const {
        arr
      } = action.payload;
      //

      return {
        ...state,
        lists: [
          ...state.lists = arr
        ]
      };
    }

    //case for deleting list
    case DELETE_LIST: {
      return {
        ...state,
        lists: state.lists.filter(list => list._id !== action.payload)
      };
    }
    case ADD_CARD: {
      const { newCard, listID } = action.payload;
      console.log("inside add card reducer");
      console.log(newCard);
      return {
        ...state,
        lists: state.lists.map(list => {
          if (list._id === listID) {
            list.cards.unshift(newCard);
          }
        })
      };
    }
    // //case for getting cards
    case GET_CARDS: {
      return {
        ...state,
        boards: action.payload
      };
    }

    //case for deleting card
    case DELETE_CARD: {
      const { listID, id } = action.payload;
      console.log("inside delete card reducer");
      console.log(listID, id);
      return {
        ...state,
        lists: state.lists.map(list => {
          if (list._id === listID) {
            list.cards.filter(card => card._id !== id);
          }
        })
      };
    }

    case JUST_STATE: {
      return state;
    }

    case DRAG_HAPPENED: {
      const { droppableIdStart, droppableIdEnd } = action.payload;
      return {
        ...state,
        lists: state.lists.unshift(droppableIdStart, droppableIdEnd)
      };
    }

    case BOARD_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

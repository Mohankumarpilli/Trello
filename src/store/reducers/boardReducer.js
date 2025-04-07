import * as types from '../types';

const initialState = {
  board: null,
  lists: [],
  cardsByList: {},
  checklistsByCard: {},
  selectedCard: null,
  showModal: false,
  showListForm: false,
  loading: true,
  error: null
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case types.FETCH_BOARD_SUCCESS:
      return {
        ...state,
        board: action.payload,
        error: null
      };

    case types.FETCH_BOARD_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case types.FETCH_LISTS_SUCCESS:
      return {
        ...state,
        lists: action.payload
      };

    case types.ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload],
        cardsByList: {
          ...state.cardsByList,
          [action.payload.id]: []
        },
        showListForm: false
      };

    case types.DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.payload),
        cardsByList: Object.keys(state.cardsByList).reduce((acc, key) => {
          if (key !== action.payload) {
            acc[key] = state.cardsByList[key];
          }
          return acc;
        }, {})
      };

    case types.FETCH_CARDS_SUCCESS:
      return {
        ...state,
        cardsByList: action.payload
      };

    case types.ADD_CARD:
      return {
        ...state,
        cardsByList: {
          ...state.cardsByList,
          [action.payload.listId]: [
            ...state.cardsByList[action.payload.listId],
            action.payload.card
          ]
        },
        checklistsByCard: {
          ...state.checklistsByCard,
          [action.payload.card.id]: []
        }
      };

    case types.DELETE_CARD:
      return {
        ...state,
        cardsByList: {
          ...state.cardsByList,
          [action.payload.listId]: state.cardsByList[action.payload.listId].filter(
            card => card.id !== action.payload.cardId
          )
        },
        checklistsByCard: Object.keys(state.checklistsByCard).reduce((acc, key) => {
          if (key !== action.payload.cardId) {
            acc[key] = state.checklistsByCard[key];
          }
          return acc;
        }, {})
      };

    case types.TOGGLE_CARD_COMPLETION:
      return {
        ...state,
        cardsByList: {
          ...state.cardsByList,
          [action.payload.listId]: state.cardsByList[action.payload.listId].map(card =>
            card.id === action.payload.cardId
              ? { ...card, dueComplete: !card.dueComplete }
              : card
          )
        }
      };

    case types.FETCH_CHECKLISTS_SUCCESS:
      return {
        ...state,
        checklistsByCard: action.payload
      };

    case types.SELECT_CARD:
      return {
        ...state,
        selectedCard: action.payload,
        showModal: true
      };

    case types.ADD_CHECKLIST:
      return {
        ...state,
        checklistsByCard: {
          ...state.checklistsByCard,
          [action.payload.cardId]: [
            ...state.checklistsByCard[action.payload.cardId],
            action.payload.checklist
          ]
        }
      };

    case types.DELETE_CHECKLIST:
      return {
        ...state,
        checklistsByCard: {
          ...state.checklistsByCard,
          [action.payload.cardId]: state.checklistsByCard[action.payload.cardId].filter(
            checklist => checklist.id !== action.payload.checklistId
          )
        }
      };

    case types.ADD_CHECKLIST_ITEM:
      return {
        ...state,
        checklistsByCard: {
          ...state.checklistsByCard,
          [action.payload.cardId]: state.checklistsByCard[action.payload.cardId].map(
            checklist =>
              checklist.id === action.payload.checklistId
                ? {
                    ...checklist,
                    checkItems: [...checklist.checkItems, action.payload.item]
                  }
                : checklist
          )
        }
      };

    case types.DELETE_CHECKLIST_ITEM:
      return {
        ...state,
        checklistsByCard: {
          ...state.checklistsByCard,
          [action.payload.cardId]: state.checklistsByCard[action.payload.cardId].map(
            checklist =>
              checklist.id === action.payload.checklistId
                ? {
                    ...checklist,
                    checkItems: checklist.checkItems.filter(
                      item => item.id !== action.payload.itemId
                    )
                  }
                : checklist
          )
        }
      };

    case types.TOGGLE_CHECKLIST_ITEM:
      return {
        ...state,
        checklistsByCard: {
          ...state.checklistsByCard,
          [action.payload.cardId]: state.checklistsByCard[action.payload.cardId].map(
            checklist =>
              checklist.id === action.payload.checklistId
                ? {
                    ...checklist,
                    checkItems: checklist.checkItems.map(item =>
                      item.id === action.payload.itemId
                        ? {
                            ...item,
                            state: item.state === 'complete' ? 'incomplete' : 'complete'
                          }
                        : item
                    )
                  }
                : checklist
          )
        }
      };

    case types.TOGGLE_MODAL:
      return {
        ...state,
        showModal: action.payload
      };

    case types.TOGGLE_LIST_FORM:
      return {
        ...state,
        showListForm: action.payload
      };

    default:
      return state;
  }
};

export default boardReducer;
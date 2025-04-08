import * as types from "./types";
import { trelloApi } from "../utils/api";

// UI actions
export const setLoading = (isLoading) => {
  return {
    type: types.SET_LOADING,
    payload: isLoading,
  };
};

export const toggleModal = (isOpen) => ({
  type: types.TOGGLE_MODAL,
  payload: isOpen,
});

export const toggleListForm = (isOpen) => ({
  type: types.TOGGLE_LIST_FORM,
  payload: isOpen,
});

export const selectCard = (card) => ({
  type: types.SELECT_CARD,
  payload: card,
});

export const fetchBoardsDetails = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const boardsResponse = await trelloApi.getBoardsDetails();
    const boards = boardsResponse.data;
    dispatch({ type: types.FETCH_BOARDS_SUCCESS, payload: boards });
  } catch (error) {
    console.error("Failed to fetch boards:", error);
    dispatch({ type: types.FETCH_BOARDS_FAILURE, payload: error.message });
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch board data
export const fetchBoardData = (boardId) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    // Get board details and lists in parallel
    const [boardResponse, listsResponse] = await Promise.all([
      trelloApi.getBoardDetails(boardId),
      trelloApi.getBoardLists(boardId),
    ]);

    const board = boardResponse.data;
    const lists = listsResponse.data;

    dispatch({ type: types.FETCH_BOARD_SUCCESS, payload: board });
    dispatch({ type: types.FETCH_LISTS_SUCCESS, payload: lists });

    // Get all cards for all lists
    const cardsPromises = lists.map((list) => trelloApi.getListCards(list.id));
    const cardsResponses = await Promise.all(cardsPromises);

    // Build cards by list mapping
    const cardsMap = {};
    lists.forEach((list, index) => {
      cardsMap[list.id] = cardsResponses[index].data;
    });

    dispatch({ type: types.FETCH_CARDS_SUCCESS, payload: cardsMap });

    // Gather all cards in a flat array
    const allCards = Object.values(cardsMap).flat();

    // Get all checklists for all cards
    const checklistPromises = allCards.map((card) =>
      trelloApi.getCardChecklists(card.id)
    );
    const checklistResponses = await Promise.all(checklistPromises);

    // Build checklists by card mapping
    const checklistsMap = {};
    allCards.forEach((card, index) => {
      checklistsMap[card.id] = checklistResponses[index].data;
    });

    dispatch({ type: types.FETCH_CHECKLISTS_SUCCESS, payload: checklistsMap });
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error fetching data:", error);
    dispatch({
      type: types.FETCH_BOARD_FAILURE,
      payload: error.message || "Failed to load board data",
    });
    dispatch(setLoading(false));
  }
};

// List actions
export const createList = (boardId, listName) => async (dispatch) => {
  try {
    const response = await trelloApi.createList(boardId, listName);
    dispatch({
      type: types.ADD_LIST,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error creating list:", error);
  }
};

export const deleteList = (listId) => async (dispatch) => {
  try {
    // Get all cards in the list
    const cardsResponse = await trelloApi.getListCards(listId);
    const cards = cardsResponse.data;

    // Delete all cards first
    await Promise.all(cards.map((card) => trelloApi.deleteCard(card.id)));

    // Then close the list (Trello doesn't allow deleting lists, only closing them)
    await trelloApi.closeList(listId);

    dispatch({
      type: types.DELETE_LIST,
      payload: listId,
    });
  } catch (error) {
    console.error("Error deleting list:", error);
  }
};

// Card actions
export const createCard = (listId, cardName) => async (dispatch) => {
  try {
    const response = await trelloApi.createCard(listId, cardName);
    dispatch({
      type: types.ADD_CARD,
      payload: {
        listId,
        card: response.data,
      },
    });
  } catch (error) {
    console.error("Error creating card:", error);
  }
};

export const deleteCard = (cardId, listId) => async (dispatch) => {
  try {
    await trelloApi.deleteCard(cardId);
    dispatch({
      type: types.DELETE_CARD,
      payload: {
        cardId,
        listId,
      },
    });
  } catch (error) {
    console.error("Error deleting card:", error);
  }
};

export const toggleCardCompletion = (card, listId) => async (dispatch) => {
  try {
    const newDueComplete = !card.dueComplete;
    await trelloApi.updateCard(card.id, { dueComplete: newDueComplete });

    dispatch({
      type: types.TOGGLE_CARD_COMPLETION,
      payload: {
        cardId: card.id,
        listId,
      },
    });
  } catch (error) {
    console.error("Error toggling card completion:", error);
  }
};

// Checklist actions
export const addChecklist = (cardId, checklistName) => async (dispatch) => {
  try {
    const response = await trelloApi.createChecklist(cardId, checklistName);

    // Make sure the checkItems property exists
    const checklist = {
      ...response.data,
      checkItems: [],
    };

    dispatch({
      type: types.ADD_CHECKLIST,
      payload: {
        cardId,
        checklist,
      },
    });

    return checklist;
  } catch (error) {
    console.error("Error adding checklist:", error);
  }
};

export const deleteChecklist = (checklistId, cardId) => async (dispatch) => {
  try {
    await trelloApi.deleteChecklist(checklistId);
    dispatch({
      type: types.DELETE_CHECKLIST,
      payload: {
        checklistId,
        cardId,
      },
    });
  } catch (error) {
    console.error("Error deleting checklist:", error);
  }
};

export const addChecklistItem =
  (checklistId, cardId, itemName) => async (dispatch) => {
    try {
      const response = await trelloApi.createCheckItem(checklistId, itemName);
      dispatch({
        type: types.ADD_CHECKLIST_ITEM,
        payload: {
          checklistId,
          cardId,
          item: response.data,
        },
      });
    } catch (error) {
      console.error("Error adding checklist item:", error);
    }
  };

export const deleteChecklistItem =
  (checklistId, itemId, cardId) => async (dispatch) => {
    try {
      await trelloApi.deleteCheckItem(checklistId, itemId);
      dispatch({
        type: types.DELETE_CHECKLIST_ITEM,
        payload: {
          checklistId,
          itemId,
          cardId,
        },
      });
    } catch (error) {
      console.error("Error deleting checklist item:", error);
    }
  };

export const toggleChecklistItem =
  (cardId, checklistId, item) => async (dispatch) => {
    try {
      const newState = item.state === "complete" ? "incomplete" : "complete";
      await trelloApi.updateCheckItem(cardId, item.id, newState);

      dispatch({
        type: types.TOGGLE_CHECKLIST_ITEM,
        payload: {
          cardId,
          checklistId,
          itemId: item.id,
        },
      });
    } catch (error) {
      console.error("Error toggling checklist item:", error);
    }
  };

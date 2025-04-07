import { useCallback } from 'react';
import { trelloApi } from '../utils/api';

/**
 * Custom hook for Trello API operations
 * Provides a cleaner interface for components to interact with the API
 */
const useTrelloApi = () => {
  // Board operations
  const fetchBoardDetails = useCallback(async (boardId) => {
    try {
      const response = await trelloApi.getBoardDetails(boardId);
      return response.data;
    } catch (error) {
      console.error('Error fetching board details:', error);
      throw error;
    }
  }, []);

  const fetchBoardLists = useCallback(async (boardId) => {
    try {
      const response = await trelloApi.getBoardLists(boardId);
      return response.data;
    } catch (error) {
      console.error('Error fetching board lists:', error);
      throw error;
    }
  }, []);

  // List operations
  const createList = useCallback(async (boardId, listName) => {
    try {
      const response = await trelloApi.createList(boardId, listName);
      return response.data;
    } catch (error) {
      console.error('Error creating list:', error);
      throw error;
    }
  }, []);

  const closeList = useCallback(async (listId) => {
    try {
      const response = await trelloApi.closeList(listId);
      return response.data;
    } catch (error) {
      console.error('Error closing list:', error);
      throw error;
    }
  }, []);

  const fetchListCards = useCallback(async (listId) => {
    try {
      const response = await trelloApi.getListCards(listId);
      return response.data;
    } catch (error) {
      console.error('Error fetching list cards:', error);
      throw error;
    }
  }, []);

  // Card operations
  const createCard = useCallback(async (listId, cardName) => {
    try {
      const response = await trelloApi.createCard(listId, cardName);
      return response.data;
    } catch (error) {
      console.error('Error creating card:', error);
      throw error;
    }
  }, []);

  const deleteCard = useCallback(async (cardId) => {
    try {
      await trelloApi.deleteCard(cardId);
      return true;
    } catch (error) {
      console.error('Error deleting card:', error);
      throw error;
    }
  }, []);

  const updateCard = useCallback(async (cardId, params) => {
    try {
      const response = await trelloApi.updateCard(cardId, params);
      return response.data;
    } catch (error) {
      console.error('Error updating card:', error);
      throw error;
    }
  }, []);

  const fetchCardChecklists = useCallback(async (cardId) => {
    try {
      const response = await trelloApi.getCardChecklists(cardId);
      return response.data;
    } catch (error) {
      console.error('Error fetching card checklists:', error);
      throw error;
    }
  }, []);

  // Checklist operations
  const createChecklist = useCallback(async (cardId, name) => {
    try {
      const response = await trelloApi.createChecklist(cardId, name);
      return response.data;
    } catch (error) {
      console.error('Error creating checklist:', error);
      throw error;
    }
  }, []);

  const deleteChecklist = useCallback(async (checklistId) => {
    try {
      await trelloApi.deleteChecklist(checklistId);
      return true;
    } catch (error) {
      console.error('Error deleting checklist:', error);
      throw error;
    }
  }, []);

  const createCheckItem = useCallback(async (checklistId, name) => {
    try {
      const response = await trelloApi.createCheckItem(checklistId, name);
      return response.data;
    } catch (error) {
      console.error('Error creating check item:', error);
      throw error;
    }
  }, []);

  const deleteCheckItem = useCallback(async (checklistId, itemId) => {
    try {
      await trelloApi.deleteCheckItem(checklistId, itemId);
      return true;
    } catch (error) {
      console.error('Error deleting check item:', error);
      throw error;
    }
  }, []);

  const updateCheckItem = useCallback(async (cardId, itemId, state) => {
    try {
      const response = await trelloApi.updateCheckItem(cardId, itemId, state);
      return response.data;
    } catch (error) {
      console.error('Error updating check item:', error);
      throw error;
    }
  }, []);

  return {
    // Board methods
    fetchBoardDetails,
    fetchBoardLists,
    
    // List methods
    createList,
    closeList,
    fetchListCards,
    
    // Card methods
    createCard,
    deleteCard,
    updateCard,
    fetchCardChecklists,
    
    // Checklist methods
    createChecklist,
    deleteChecklist,
    createCheckItem,
    deleteCheckItem,
    updateCheckItem
  };
};

export default useTrelloApi;
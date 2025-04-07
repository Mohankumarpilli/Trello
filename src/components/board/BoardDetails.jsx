import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import boardReducer from '../../store/reducers/boardReducer';
import * as actions from '../../store/actions';
import ListComponent from './ListComponent';
import AddListForm from './AddListForm';
import CardModal from '../cards/CardModal';

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

const BoardDetails = () => {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const { id } = useParams();
  
  const { 
    board, 
    lists, 
    cardsByList, 
    checklistsByCard, 
    selectedCard, 
    showModal, 
    showListForm, 
    loading, 
    error 
  } = state;
  
  useEffect(() => {
    const loadBoardData = async () => {
      actions.fetchBoardData(id)(dispatch);
    };

    loadBoardData();
  }, [id]);
  
  // Handlers
  const handleToggleListForm = () => {
    dispatch(actions.toggleListForm(!showListForm));
  };
  
  const handleCreateList = async (listName) => {
    await actions.createList(id, listName)(dispatch);
  };
  
  const handleDeleteList = async (listId) => {
    await actions.deleteList(listId)(dispatch);
  };
  
  const handleCardClick = (card) => {
    dispatch(actions.selectCard(card));
  };
  
  const handleCloseModal = () => {
    dispatch(actions.toggleModal(false));
  };
  
  // Background styling
  const getBoardStyle = () => {
    if (!board) return {};
    
    const color = board.prefs.backgroundColor;
    const img = board.prefs.backgroundImage;
    
    return color
      ? { backgroundColor: color, backgroundSize: 'cover' }
      : {
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        };
  };
  
  if (loading) {
    return (
      <h1 className="mt-20 text-5xl text-center font-extrabold">
        Please wait, loading...
      </h1>
    );
  }
  
  if (error) {
    return (
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-red-600">Error</h2>
        <p className="mt-2">{error}</p>
      </div>
    );
  }
  
  return (
    <div style={getBoardStyle()} className="flex flex-col pl-10 h-full">
      <h1 className="text-4xl font-extrabold m-3">{board?.name}</h1>
      
      <div className="flex gap-4 m-5 overflow-x-auto pb-4 flex-nowrap h-full scroll-smooth">
        {/* Render all lists */}
        {lists.map((list) => (
          <ListComponent
            key={list.id}
            list={list}
            cards={cardsByList[list.id] || []}
            onDeleteList={handleDeleteList}
            onCardClick={handleCardClick}
            dispatch={dispatch}
          />
        ))}
        
        {/* Add new list component */}
        <div className="flex-shrink-0">
          {!showListForm ? (
            <div
              className="flex flex-col w-72 bg-white h-fit text-black font-bold p-2 text-center rounded-xl gap-4 cursor-pointer"
              onClick={handleToggleListForm}
            >
              Add new List +
            </div>
          ) : (
            <AddListForm
              onSubmit={handleCreateList}
              onCancel={handleToggleListForm}
            />
          )}
        </div>
      </div>
      
      {/* Card detail modal */}
      {showModal && selectedCard && (
        <CardModal
          card={selectedCard}
          checklists={checklistsByCard[selectedCard.id] || []}
          onClose={handleCloseModal}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default BoardDetails;
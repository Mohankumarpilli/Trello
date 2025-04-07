import React, { useState } from 'react';
import CardComponent from '../cards/CardComponent';
import AddCardForm from '../cards/AddCardForm';
import * as actions from '../../store/actions';

const ListComponent = ({ list, cards, onDeleteList, onCardClick, dispatch }) => {
  const [showCardForm, setShowCardForm] = useState(false);
  
  const handleToggleCardForm = () => {
    setShowCardForm(!showCardForm);
  };
  
  const handleCreateCard = async (cardName) => {
    await actions.createCard(list.id, cardName)(dispatch);
    setShowCardForm(false);
  };
  
  const handleDeleteCard = async (e, cardId) => {
    e.stopPropagation();
    await actions.deleteCard(cardId, list.id)(dispatch);
  };
  
  const handleToggleCardCompletion = async (e, card) => {
    e.stopPropagation();
    await actions.toggleCardCompletion(card, list.id)(dispatch);
  };
  
  const handleDeleteList = (e) => {
    e.stopPropagation();
    onDeleteList(list.id);
  };
  
  return (
    <div className="flex flex-col w-72 bg-gray-200 h-fit text-black font-bold p-2 rounded-xl gap-4 flex-shrink-0">
      <div className="flex justify-between items-center">
        <h1>{list.name}</h1>
        <div
          className="p-1 bg-red-100 rounded-full hover:bg-red-200 text-red-600 cursor-pointer"
          onClick={handleDeleteList}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" />
            <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
        </div>
      </div>
      
      {/* Cards */}
      {cards.map((card) => (
        <CardComponent
          key={card.id}
          card={card}
          listId={list.id}
          onClick={() => onCardClick(card)}
          onDelete={handleDeleteCard}
          onToggleCompletion={handleToggleCardCompletion}
        />
      ))}
      
      {/* Add Card */}
      <div className="bg-white rounded-xl p-4">
        {!showCardForm ? (
          <div
            onClick={handleToggleCardForm}
            className="cursor-pointer text-blue-600 font-semibold"
          >
            + Add Card
          </div>
        ) : (
          <AddCardForm
            onSubmit={handleCreateCard}
            onCancel={handleToggleCardForm}
          />
        )}
      </div>
    </div>
  );
};

export default ListComponent;
import React from 'react';

const CardComponent = ({ card, listId, onClick, onDelete, onToggleCompletion }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-4 group relative cursor-pointer ${
        card.dueComplete ? "border-l-4 border-green-500" : ""
      }`}
    >
      <h1>{card.name}</h1>

      {/* Hover actions */}
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <div
          className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
          onClick={(e) => onToggleCompletion(e, card)}
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
            {card.dueComplete ? (
              <path d="M20 6L9 17l-5-5" />
            ) : (
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                ry="2"
              />
            )}
          </svg>
        </div>

        <div
          className="p-1 bg-red-100 rounded-full hover:bg-red-200 text-red-600"
          onClick={(e) => onDelete(e, card.id)}
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
    </div>
  );
};

export default CardComponent;
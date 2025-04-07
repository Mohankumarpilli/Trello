import React from 'react';

const ChecklistItem = ({ item, onToggle, onDelete }) => {
  return (
    <div className="flex items-center gap-2 mb-1 group">
      <input
        type="checkbox"
        checked={item.state === "complete"}
        onChange={onToggle}
      />
      <span className="flex-grow">{item.name}</span>
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

export default ChecklistItem;
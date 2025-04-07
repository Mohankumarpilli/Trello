import React, { useState } from 'react';
import ChecklistItem from './ChecklistItem';

const ChecklistComponent = ({
  checklist,
  onDeleteChecklist,
  onAddCheckItem,
  onToggleCheckItem,
  onDeleteCheckItem
}) => {
  const [newItemName, setNewItemName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItemName.trim()) {
      onAddCheckItem(checklist.id, newItemName);
      setNewItemName('');
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{checklist.name}</h3>
        <button
          onClick={(e) => onDeleteChecklist(e, checklist.id)}
          className="text-red-500 hover:text-red-700"
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
        </button>
      </div>

      {checklist.checkItems && checklist.checkItems.map((item) => (
        <ChecklistItem
          key={item.id}
          item={item}
          onToggle={() => onToggleCheckItem(checklist.id, item)}
          onDelete={(e) => onDeleteCheckItem(e, checklist.id, item.id)}
        />
      ))}

      <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
        <input
          type="text"
          className="border p-1 text-sm rounded w-full"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New checklist item"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default ChecklistComponent;
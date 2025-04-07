import React, { useState } from 'react';

const AddCardForm = ({ onSubmit, onCancel }) => {
  const [cardName, setCardName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardName.trim()) {
      onSubmit(cardName);
      setCardName('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2"
    >
      <input
        type="text"
        placeholder="Card name"
        className="border rounded px-2 py-1 text-sm w-full"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
      >
        Add
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400 text-sm"
      >
        Cancel
      </button>
    </form>
  );
};

export default AddCardForm;
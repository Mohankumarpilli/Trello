import React, { useState } from 'react';

const AddListForm = ({ onSubmit, onCancel }) => {
  const [listName, setListName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim()) {
      onSubmit(listName);
      setListName('');
    }
  };

  return (
    <form
      className="border-2 bg-white shadow-xl flex flex-col gap-2 justify-center items-center h-40 rounded-xl p-4 text-xl font-extrabold w-72"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="Enter List name"
        className="p-2 rounded border text-base font-normal w-full"
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Create List
        </button>
        <button
          type="button"
          className="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddListForm;
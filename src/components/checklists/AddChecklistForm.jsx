import React from 'react';

const AddChecklistForm = ({ value, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="mb-4">
      <input
        type="text"
        placeholder="New checklist name"
        className="border p-1 text-sm rounded w-full mb-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        Add Checklist
      </button>
    </form>
  );
};

export default AddChecklistForm;
import React, { useState } from 'react';
import ChecklistComponent from '../checklists/ChecklistComponent';
import AddChecklistForm from '../checklists/AddChecklistForm';
import * as actions from '../../store/actions';

const CardModal = ({ card, checklists, onClose, dispatch }) => {
  const [newChecklistName, setNewChecklistName] = useState('');

  const handleAddChecklist = async (e) => {
    e.preventDefault();
    if (newChecklistName.trim()) {
      await actions.addChecklist(card.id, newChecklistName)(dispatch);
      setNewChecklistName('');
    }
  };

  const handleDeleteChecklist = async (e, checklistId) => {
    e.preventDefault();
    e.stopPropagation();
    await actions.deleteChecklist(checklistId, card.id)(dispatch);
  };

  const handleAddCheckItem = async (checklistId, itemName) => {
    if (!itemName.trim()) return;
    await actions.addChecklistItem(checklistId, card.id, itemName)(dispatch);
  };

  const handleToggleCheckItem = async (checklistId, item) => {
    await actions.toggleChecklistItem(card.id, checklistId, item)(dispatch);
  };

  const handleDeleteCheckItem = async (e, checklistId, itemId) => {
    e.preventDefault();
    e.stopPropagation();
    await actions.deleteChecklistItem(checklistId, itemId, card.id)(dispatch);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{card.name}</h2>

        <AddChecklistForm
          value={newChecklistName}
          onChange={setNewChecklistName}
          onSubmit={handleAddChecklist}
        />

        {checklists.map((checklist) => (
          <ChecklistComponent
            key={checklist.id}
            checklist={checklist}
            onDeleteChecklist={handleDeleteChecklist}
            onAddCheckItem={handleAddCheckItem}
            onToggleCheckItem={handleToggleCheckItem}
            onDeleteCheckItem={handleDeleteCheckItem}
          />
        ))}

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CardModal;
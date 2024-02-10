import React from 'react';

interface SaveButtonProps {
  onSave: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onSave }) => {
  return (
    <button onClick={onSave}>
      Save
    </button>
  );
};

export default SaveButton;

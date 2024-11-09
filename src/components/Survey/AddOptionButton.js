import React, { useState, useRef, useEffect } from 'react';

function AddOptionButton({ onAdd, placeholder }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 rounded-lg border border-primary bg-background">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSubmit}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit();
            }
          }}
          className="w-full bg-transparent text-text focus:outline-none"
          placeholder={placeholder}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      className="p-4 rounded-lg border border-dashed border-gray-700 hover:border-primary text-text-muted hover:text-text transition-colors"
    >
      + Add Custom Option
    </button>
  );
}

export default AddOptionButton; 
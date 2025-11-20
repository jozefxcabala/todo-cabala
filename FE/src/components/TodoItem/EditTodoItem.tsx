import React, { useState } from 'react';
import './TodoItem.css';
import { Todo } from '../../types';

interface EditTodoItemProps {
  todo: Todo;
  onSave: (todo: Todo) => Promise<boolean>;
  onCancel: () => void;
}

function EditTodoItem({ todo, onSave, onCancel }: EditTodoItemProps) {
  const [editTitle, setEditTitle] = useState<string>(todo.title);
  const [editDescription, setEditDescription] = useState<string>(todo.description || '');
  const [error, setError] = useState<string>('');

  const handleSave = async () => {
    setError('');
    
    if (!editTitle.trim()) {
      setError('Title is required');
      return;
    }

    const success = await onSave({
      ...todo,
      title: editTitle.trim(),
      description: editDescription.trim() || undefined
    });
    
    if (success) {
      setError('');
    }
  };

  return (
    <div className="todo-item editing">
      <div className="todo-edit-form">
        <div className="edit-input-wrapper">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder="Todo title"
            className={`edit-input ${error ? 'edit-input-error' : ''}`}
          />
          {error && <span className="edit-error">{error}</span>}
        </div>
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Description (optional)"
          className="edit-textarea"
          rows={3}
        />
        <div className="edit-actions">
          <button onClick={handleSave} className="btn btn-save">Save</button>
          <button onClick={onCancel} className="btn btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditTodoItem;


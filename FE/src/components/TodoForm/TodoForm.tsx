import React, { useState, FormEvent } from 'react';
import './TodoForm.css';
import { TodoFormData } from '../../types';

interface TodoFormProps {
  onSubmit: (data: TodoFormData) => Promise<boolean>;
}

function TodoForm({ onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    const success = await onSubmit({
      title: title.trim(),
      description: description.trim() || undefined
    });
    
    if (success) {
      setTitle('');
      setDescription('');
      setError('');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h2>New Todo</h2>
      <div className="form-group">
        <label htmlFor="title">Todo Title *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          placeholder="Enter todo title"
          className={`form-input ${error ? 'form-input-error' : ''}`}
        />
        {error && <span className="form-error">{error}</span>}
      </div>
      <div className="form-group form-group-textarea">
        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter todo description"
          rows={3}
          className="form-textarea"
        />
      </div>
      <button type="submit" className="btn btn-submit">
        Create Todo
      </button>
    </form>
  );
}

export default TodoForm;


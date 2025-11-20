import React, { useState } from 'react';
import './TodoItem.css';
import { Todo } from '../../types';
import EditTodoItem from './EditTodoItem';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, todo: Todo) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
}

function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSave = async (updatedTodo: Todo): Promise<boolean> => {
    const success = await onUpdate(todo.id, updatedTodo);
    if (success) {
      setIsEditing(false);
    }
    return success;
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleToggleComplete = async () => {
    await onUpdate(todo.id, {
      ...todo,
      completed: !todo.completed
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isEditing) {
    return (
      <EditTodoItem
        todo={todo}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-header">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            className="todo-checkbox"
          />
          <h3 className="todo-title">{todo.title}</h3>
        </div>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        <div className="todo-footer">
          <span className="todo-date">
            Created: {formatDate(todo.createdAt)}
          </span>
          <div className="todo-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-edit"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this todo?')) {
                  onDelete(todo.id);
                }
              }}
              className="btn btn-delete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;


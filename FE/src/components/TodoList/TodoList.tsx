import React from 'react';
import TodoItem from '../TodoItem';
import './TodoList.css';
import { Todo } from '../../types';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: number, todo: Todo) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
}

function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="todo-list empty">
        <p>You don't have any todos yet. Create a new todo above.</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <h2>Todo List ({todos.length})</h2>
      <div className="todo-items">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;


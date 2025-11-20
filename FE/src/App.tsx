import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { Todo, TodoFormData } from './types';

// Using proxy from package.json (http://localhost:3001) or direct URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Load todos from API
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/todos`);
      if (!response.ok) throw new Error('Error loading todos');
      const data: Todo[] = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load todos. Please check if the API server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Create new todo
  const createTodo = async (todoData: TodoFormData): Promise<boolean> => {
    try {
      const newTodo: Partial<Todo> = {
        ...todoData,
        completed: false,
        createdAt: new Date().toISOString()
      };
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) throw new Error('Error creating todo');
      const createdTodo: Todo = await response.json();
      setTodos([...todos, createdTodo]);
      return true;
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create todo.');
      return false;
    }
  };

  // Update todo
  const updateTodo = async (id: number, todoData: Todo): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });
      if (!response.ok) throw new Error('Error updating todo');
      const updatedTodo: Todo = await response.json();
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      return true;
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update todo.');
      return false;
    }
  };

  // Delete todo
  const deleteTodo = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error deleting todo');
      setTodos(todos.filter(todo => todo.id !== id));
      return true;
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete todo.');
      return false;
    }
  };

  // Sort todos by creation date
  const sortedTodos = [...todos].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <img src="/checklist.png" alt="Checklist" className="header-icon" />
          <h1>To-Do App</h1>
        </div>
      </header>
      <main className="App-main">
        <div className="two-column-layout">
          <div className="left-column">
            <TodoForm onSubmit={createTodo} />
          </div>
          <div className="right-column">
            <div className="sort-controls">
              <label>
                Sort by date:
                <select 
                  value={sortOrder} 
                  onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                  className="sort-select"
                >
                  <option value="desc">Newest first</option>
                  <option value="asc">Oldest first</option>
                </select>
              </label>
            </div>
            {loading ? (
              <div className="loading">Loading todos...</div>
            ) : (
              <TodoList
                todos={sortedTodos}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;


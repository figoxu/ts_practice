import React, { useState, useEffect } from 'react';
import './Todo.css';
import { TodoItem } from '../services/TodoStorage';
import { TodoStorageFactory } from '../services/TodoStorageFactory';

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const todoStorage = TodoStorageFactory.getInstance().getStorage('local');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const loadedTodos = await todoStorage.getAll();
    setTodos(loadedTodos);
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() !== '') {
      const addedTodo = await todoStorage.add(newTodo);
      setTodos([...todos, addedTodo]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    await todoStorage.delete(id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleTodo = async (id: number) => {
    await todoStorage.toggle(id);
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-container">
      <h1>待办事项列表</h1>
      <div className="todo-content">
        <div className="todo-input">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="请输入新的待办事项"
          />
          <button onClick={handleAddTodo}>添加</button>
        </div>
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
              <button onClick={() => handleDeleteTodo(todo.id)}>删除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo; 
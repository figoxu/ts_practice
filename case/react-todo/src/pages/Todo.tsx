import React from 'react';
import './Todo.css';

const Todo: React.FC = () => {
  return (
    <div className="todo-container">
      <h1>待办事项列表</h1>
      <div className="todo-content">
        <p>这里将是待办事项的列表内容</p>
        <button className="add-todo-btn">添加新任务</button>
      </div>
    </div>
  );
};

export default Todo; 
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/todo">本地待办事项</Link>
        </li>
        <li>
          <Link to="/todo-server">在线待办事项</Link>
        </li>
        <li>
          <Link to="/about">关于我们</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation; 
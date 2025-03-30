import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/todo">Todo</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation; 
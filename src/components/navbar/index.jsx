import React, { useState } from 'react';

import './index.css';

const Navbar = ({ group, order, onGroupChange, onOrderChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="display-button" onClick={() => setIsOpen(!isOpen)}>
        <img src="Display.svg" alt="" />
        <span>Display</span>
        <img src="down.svg" alt="down arrow" />
      </div>
      
      {isOpen && (
        <div className="dropdown-menu" onMouseLeave={() => setIsOpen(!isOpen)} >
          <div className="dropdown-item">
            <span>Grouping</span>
            <select
              value={group}
              onChange={(e) => onGroupChange(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          
          <div className="dropdown-item">
            <span>Ordering</span>
            <select
              value={order}
              onChange={(e) => onOrderChange(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
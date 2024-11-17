import React from 'react';
import Card from '../card';
import { MoreHorizontal, Circle, AlertCircle, Clock, CircleCheck } from 'lucide-react';
import { TbBrightnessFilled } from "react-icons/tb";
import './index.css';

const Lane = ({ title, tickets, users, grouping }) => {
  const getStatusIcon = () => {
    switch (title.toLowerCase()) {
      case 'backlog':
        return <Clock size={16} />;
      case 'todo':
        return <Circle size={16} />;
      case 'in progress':
        return <TbBrightnessFilled  size={16} color="#f1c950" />;
      case 'done':
        return <CircleCheck size={16} color="#5cb85c" />;
      default:
        return null;
    }
  };

  const getPriorityIcon = () => {
    // Add priority icons based on your design
    return null;
  };

  const getIcon = () => {
    if (grouping === 'status') return getStatusIcon();
    if (grouping === 'priority') return getPriorityIcon();
    return null;
  };

  return (
    <div className="lane">
      <div className="lane-header">
        <div className="lane-header-left">
          {getIcon()}
          <h3>{title}</h3>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="lane-header-right">
          <button className="add-button">+</button>
          <MoreHorizontal size={16} />
        </div>
      </div>
      <div className="lane-content">
        {tickets.map(ticket => (
          <Card
            key={ticket.id}
            ticket={ticket}
            user={users.find(u => u.id === ticket.userId)}
          />
        ))}
      </div>
    </div>
  );
};

export default Lane;
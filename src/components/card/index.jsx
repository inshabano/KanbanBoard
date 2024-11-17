import React from 'react';
import { AlertCircle, Circle, CheckCircle2, Clock } from 'lucide-react';
import './index.css';

const Card = ({ ticket, user }) => {
  const getStatusIcon = () => {
    switch (ticket.status.toLowerCase()) {
      case 'backlog':
        return <Clock size={14} />;
      case 'todo':
        return <Circle size={14} />;
      case 'in progress':
        return <AlertCircle size={14} color="#f1c950" />;
      case 'done':
        return <CheckCircle2 size={14} color="#5cb85c" />;
      default:
        return null;
    }
  };

  const getPriorityIcon = () => {
    // Add priority icons based on ticket.priority
    return null;
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="user-avatar">
          <img 
            src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} 
            alt={user.name}
            title={user.name}
          />
          <span className={`status-indicator ${user.available ? 'available' : ''}`} />
        </div>
      </div>
      <div className="card-title">
        {getStatusIcon()}
        <p>{ticket.title}</p>
      </div>
      <div className="card-footer">
        {getPriorityIcon()}
        <div className="tag">
          <span>●</span>
          <span>{ticket.tag}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
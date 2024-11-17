import React from 'react';
import Card from '../card';
import { MoreHorizontal, Circle, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import './index.css';

const Lane = ({ title, tickets, users, grouping }) => {

  const sortedTickets = React.useMemo(() => {
    const sortedArray = [...tickets];

    switch (grouping) {
      case 'priority':
       
        return sortedArray.sort((a, b) => b.priority - a.priority);
        
      case 'user':
        return sortedArray.sort((a, b) => {
          const userA = users.find(u => u.id === a.userId)?.name || '';
          const userB = users.find(u => u.id === b.userId)?.name || '';
          return userA.localeCompare(userB);
        });
        
      case 'status':
        const statusOrder = {
          'backlog': 0,
          'todo': 1,
          'in progress': 2,
          'done': 3,
          'canceled': 4
        };
        return sortedArray.sort((a, b) => {
          const statusA = statusOrder[a.status.toLowerCase()] || 0;
          const statusB = statusOrder[b.status.toLowerCase()] || 0;
          return statusA - statusB;
        });
        
      default:
        return sortedArray;
    }
  }, [tickets, users, grouping]);

  const getStatusIcon = () => {
    switch (title.toLowerCase()) {
      case 'backlog':
        return <img src="Backlog.svg" alt="" />;
      case 'todo':
        return <Circle size={16} />;
      case 'in progress':
        return <img src="in-progress.svg" alt="" />;
      case 'done':
        return <img src="Done.svg" alt="" />;  
      default:
        return <img src="Cancelled.svg" alt="" />;
    }
  };

  const getPriorityIcon = () => {
    const priorities = sortedTickets.map(ticket => ticket.priority);
    switch (priorities[0]) {
   
      case 1:
        return <img src="lowPriority.svg" alt="Low Priority" />;
      case 2:
        return <img src="mediumPriority.svg" alt="Low Priority" />;
      case 3:
        return <img src="highPriority.svg" alt="Medium Priority" />;
      case 4:
        return <img src="UrgentPriority.svg" alt="High Priority" />;
      default:
        return <img src="No-priority.svg" alt="No Priority" />;
    }
  };

  const getUserIcon = () => {
    const user = users.find(u => u.id === sortedTickets[0]?.userId);
    return user ? (
      <div className="user-avatar">
        <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
              alt={user.name}
              title={user.name}
            />
             <span className={`status-indicator ${user.available ? 'online' : 'offline'}`} />
      </div>
    ) : null;
  };

  const getIcon = () => {
    if (grouping === 'status') return getStatusIcon();
    if (grouping === 'priority') return getPriorityIcon();
    if (grouping === 'user') return getUserIcon();
    return null;
  };

  return (
    <div className="lane">
      <div className="lane-header">
        <div className="lane-header-left">
          {getIcon()}
          <h3>{title}</h3>
          <span className="ticket-count">{sortedTickets.length}</span>
        </div>
        <div className="lane-header-right">
          <button className="add-button">+</button>
          <MoreHorizontal size={16} />
        </div>
      </div>
      <div className="lane-content">
        {sortedTickets.map(ticket => (
          <Card
            key={ticket.id}
            ticket={ticket}
            user={users.find(u => u.id === ticket.userId)}
            grouping={grouping}
          />
        ))}
      </div>
    </div>
  );
};

export default Lane;
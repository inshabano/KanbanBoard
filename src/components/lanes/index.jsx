import React from 'react';
import Card from '../card';
import './index.css';

const Lane = ({ title, tickets, users, group }) => {

  const orderedTickets = React.useMemo(() => {
    const orderedArray = [...tickets];

    switch (group) {
      case 'priority':
       
        return orderedArray.sort((a, b) => b.priority - a.priority);
        
      case 'user':
        return orderedArray.sort((a, b) => {
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
        return orderedArray.sort((a, b) => {
          const statusA = statusOrder[a.status.toLowerCase()] || 0;
          const statusB = statusOrder[b.status.toLowerCase()] || 0;
          return statusA - statusB;
        });
        
      default:
        return orderedArray;
    }
  }, [tickets, users, group]);

  const getStatusIcon = () => {
    switch (title.toLowerCase()) {
      case 'backlog':
        return <img src="Backlog.svg" alt="" />;
      case 'todo':
        return <img src="To-do.svg" alt="" />
      case 'in progress':
        return <img src="in-progress.svg" alt="" />;
      case 'done':
        return <img src="Done.svg" alt="" />;  
      default:
        return <img src="Cancelled.svg" alt="" />;
    }
  };

  const getPriorityIcon = () => {
    const priorities = orderedTickets.map(ticket => ticket.priority);
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
    const user = users.find(u => u.id === orderedTickets[0]?.userId);
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
    if (group === 'status') return getStatusIcon();
    if (group === 'priority') return getPriorityIcon();
    if (group === 'user') return getUserIcon();
    return null;
  };

  return (
    <div className="lane">
      <div className="lane-header">
        <div className="lane-header-left">
          {getIcon()}
          <h3>{title}</h3>
          <span className="ticket-count">{orderedTickets.length}</span>
        </div>
        <div className="lane-header-right">
          <button className="add-button">
          <img src="add.svg" alt="add" />
          </button>
         <img src="3 dot menu.svg" alt="" />
        </div>
      </div>
      <div className="lane-content">
        {orderedTickets.map(ticket => (
          <Card
            key={ticket.id}
            ticket={ticket}
            user={users.find(u => u.id === ticket.userId)}
            group={group}
          />
        ))}
      </div>
    </div>
  );
};

export default Lane;
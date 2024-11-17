import React from 'react';
import Lane from '../lanes';
import './index.css';

const Board = ({ tickets, users, grouping, sorting }) => {
  const getPriorityName = (priority) => {
    const priorities = {
      4: 'Urgent',
      3: 'High',
      2: 'Medium',
      1: 'Low',
      0: 'No priority'
    };
    return priorities[priority];
  };

  const organizeTickets = () => {
    let groupedTickets = {};

    if (grouping === 'status') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        if (!acc[ticket.status]) acc[ticket.status] = [];
        acc[ticket.status].push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'user') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        const user = users.find(u => u.id === ticket.userId);
        if (!acc[user.name]) acc[user.name] = [];
        acc[user.name].push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'priority') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        const priority = getPriorityName(ticket.priority);
        if (!acc[priority]) acc[priority] = [];
        acc[priority].push(ticket);
        return acc;
      }, {});
    }

    // Sort tickets within each group
    Object.keys(groupedTickets).forEach(key => {
      groupedTickets[key].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority;
        }
        return a.title.localeCompare(b.title);
      });
    });

    return groupedTickets;
  };

  const groupedTickets = organizeTickets();

  return (
    <div className="board">
      {Object.entries(groupedTickets).map(([groupName, tickets]) => (
        <Lane
          key={groupName}
          title={groupName}
          tickets={tickets}
          users={users}
          grouping={grouping}
        />
      ))}
    </div>
  );
};

export default Board;
import React from "react";
import Lane from "../lanes";
import "./index.css";

const Board = ({ tickets, users, group, order }) => {
  const getPriorityName = (priority) => {
    const priorities = {
      0: "No priority",
      4: "Urgent",
      3: "High",
      2: "Medium",
      1: "Low",
    };
    return priorities[priority];
  };

  const orderLanes = (groupedTickets) => {
    const entries = Object.entries(groupedTickets);

    if (group === 'priority') {
      const priorityOrder = {
        "Urgent": 1,
        "High": 2,
        "Medium": 3,
        "Low": 4,
        "No priority": 0
      };
      
      return entries.sort(([a], [b]) => 
        priorityOrder[a] - priorityOrder[b]
      );
    }

    if (group === 'status') {
      const statusOrder = {
        "Backlog": 0,
        "Todo": 1,
        "In Progress": 2,
        "Done": 3,
        "Canceled": 4
      };
      
      return entries.sort(([a], [b]) => 
        statusOrder[a.toLowerCase()] - statusOrder[b.toLowerCase()]
      );
    }

   
    return entries.sort(([a], [b]) => a.localeCompare(b));
  };

  const organizeTickets = () => {
    let groupedTickets = {};

    if (group === "status") {
      groupedTickets = tickets.reduce((acc, ticket) => {
        if (!acc[ticket.status]) acc[ticket.status] = [];
        acc[ticket.status].push(ticket);
        return acc;
      }, {});
    } else if (group === "user") {
      groupedTickets = tickets.reduce((acc, ticket) => {
        const user = users.find((u) => u.id === ticket.userId);
        if (!acc[user.name]) acc[user.name] = [];
        acc[user.name].push(ticket);
        return acc;
      }, {});
    } else if (group === "priority") {
      groupedTickets = tickets.reduce((acc, ticket) => {
        const priority = getPriorityName(ticket.priority);
        if (!acc[priority]) acc[priority] = [];
        acc[priority].push(ticket);
        return acc;
      }, {});
    }

    Object.keys(groupedTickets).forEach((key) => {
      groupedTickets[key].sort((a, b) => {
        if (order === "priority") {
          return b.priority - a.priority;
        }
        return a.title.localeCompare(b.title);
      });
    });

    return groupedTickets;
  };

  const groupedTickets = organizeTickets();
  const orderedLanes = orderLanes(groupedTickets);

  return (
    <div className="board">
      {orderedLanes.map(([groupName, tickets]) => (
        <Lane
          key={groupName}
          title={groupName}
          tickets={tickets}
          users={users}
          group={group}
        />
      ))}
    </div>
  );
};

export default Board;
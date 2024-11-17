import React from "react";
import "./index.css";

const Card = ({ ticket, user, grouping }) => {
  const getStatusIcon = () => {
    switch (ticket.status.toLowerCase()) {
      case "backlog":
        return <img src="Backlog.svg" alt="" />;
      case "todo":
        return <img src="To-do.svg" alt="" />;
      case "in progress":
        return <img src="in-progress.svg" alt="" />;
      case "done":
        return <img src="Done.svg" alt="" />;
      default:
        return <img src="Cancelled.svg" alt="" />;
    }
  };

  const getPriorityIcon = () => {
    const priority = ticket?.priority;
    switch (priority) {
      case 0:
        return <img src="No-priority.svg" alt="No Priority" />;
      case 1:
        return <img src="lowPriority.svg" alt="Low Priority" />;
      case 2:
        return <img src="lowPriority.svg" alt="Low Priority" />;
      case 3:
        return <img src="mediumPriority.svg" alt="Medium Priority" />;
      case 4:
        return <img src="highPriority.svg" alt="High Priority" />;
      default:
        return <img src="No-priority.svg" alt="No Priority" />;
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {grouping !== "user" && 
            <div className="user-avatar">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
              alt={user.name}
              title={user.name}
            />
            <span
              className={`status-indicator ${user.available ? "available" : ""}`}
            />
          </div>
        }
        
      </div>
      <div className="card-title">
        {
            grouping !== "status" &&  <div className="status-icon">{getStatusIcon()}</div>
        }
       

        <p className="ticket-title">{ticket.title}</p>
      </div>
      <div className="card-footer">
        {grouping !== "priority" && 
        <div className="priority-icon">{getPriorityIcon()}</div>
        }
        <div className="tag">
          <span>●</span>
          <span>{ticket.tag}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;

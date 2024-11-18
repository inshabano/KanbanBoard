import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Board from "./components/board";
import { fetchTickets, fetchUsers } from "./API/api";
import "./App.css";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState(() => {
    return localStorage.getItem("grouping") || "status";
  });
  const [order, setOrder] = useState(() => {
    return localStorage.getItem("ordering") || "priority";
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ticketsData, usersData] = await Promise.all([
          fetchTickets(),
          fetchUsers(),
        ]);
        setTickets(ticketsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", group);
  }, [group]);

  useEffect(() => {
    localStorage.setItem("ordering", order);
  }, [order]);

  const handleGroupChange = (value) => {
    setGroup(value);
  };

  const handleOrderChange = (value) => {
    setOrder(value);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        group={group}
        order={order}
        onGroupChange={handleGroupChange}
        onOrderChange={handleOrderChange}
      />
      <Board tickets={tickets} users={users} group={group} order={order} />
    </div>
  );
};

export default App;

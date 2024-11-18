import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Board from './components/board';
import { fetchTickets, fetchUsers } from './API/api';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState(localStorage.getItem('group') || 'status');
  const [order, setOrder] = useState(localStorage.getItem('order') || 'priority');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketsData, usersData] = await Promise.all([
          fetchTickets(),
          fetchUsers()
        ]);
        setTickets(ticketsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGroupChange = (value) => {
    setGroup(value);
    localStorage.setItem('grouping', value);
  };

  const handleOrderChange = (value) => {
    setOrder(value);
    localStorage.setItem('order', value);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <Navbar
        group={group}
        order={order}
        onGroupChange={handleGroupChange}
        onOrderChange={handleOrderChange}
      />
      <Board
        tickets={tickets}
        users={users}
        group={group}
        order={order}
      />
    </div>
  );
}

export default App;
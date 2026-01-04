import React, { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [data, setData] = useState(null);

  // Function to fetch dashboard data
  const refreshDashboard = () => {
    fetch('http://localhost:5000/api/dashboard')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Dashboard fetch error:', err));
  };

  // Load once when component mounts
  useEffect(() => {
    refreshDashboard();
  }, []);

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats">
        <div className="stat-card">
          <h2>Total Users</h2>
          <p>{data.users}</p>
        </div>
        <div className="stat-card">
          <h2>Total Orders</h2>
          <p>{data.orders}</p>
        </div>
        <div className="stat-card">
          <h2>Total Reviews</h2>
          <p>{data.reviews}</p>
        </div>
      </div>

      <div className="top-products">
        <h2>Top Selling Products</h2>
        <ul>
          {data.topProducts.map((prod, i) => (
            <li key={i}>
              {prod.name} <span>{prod.total_sold} sold</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Refresh button */}
      <button className="refresh-btn" onClick={refreshDashboard}>
        Refresh Dashboard
      </button>
    </div>
  );
}

export default Dashboard;

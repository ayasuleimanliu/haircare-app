import React, { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [data, setData] = useState(null);
  const API_BASE = process.env.REACT_APP_API_BASE;

  const refreshDashboard = () => {
    fetch(`${API_BASE}/api/dashboard`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Dashboard fetch error:', err));
  };

  useEffect(() => {
    refreshDashboard();
  }, []);

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard">
      {/* ...rest of your component unchanged */}
    </div>
  );
}

export default Dashboard;

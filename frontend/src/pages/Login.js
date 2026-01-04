import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.username === 'admin' && form.password === '1234') {
      setMessage(' Welcome Admin 🌿');
      
      setMessage(`Welcome, ${form.username}!`);
      
    } else {
      setMessage('❌ Please enter valid credentials.');
    }
  };

  return (
    <div className="login">
      <h1>Login 🌿</h1>
      <p>Please enter your credentials to continue.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Login;

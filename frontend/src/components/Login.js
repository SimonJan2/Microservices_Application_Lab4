// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const location = useLocation();
  const isRegister = location.pathname === '/register';

  const handleSubmit = async () => {
    try {
      const endpoint = isRegister ? '/register' : '/login';
      const data = isRegister 
        ? { username, password, email }
        : { username, password };

      const response = await fetch(`${process.env.REACT_APP_USER_SERVICE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Failed:', error);
      alert('Operation failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{isRegister ? 'Register' : 'Login'}</h2>
      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 border rounded mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {isRegister && (
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button 
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {isRegister ? 'Register' : 'Login'}
      </button>
    </div>
  );
};

export default Login;
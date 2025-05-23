import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AgentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/agents/login', {
        email,
        password,
      });
      console.log(response.data);
      // localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.agentId);
      navigate(`/agent/dashboard/${response.data.agentId}`);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Agent Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-500">
          New agent?{' '}
          <Link to="/agents/register" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>

        <p className="text-sm text-center text-gray-500">
          Are you an admin?{' '}
          <Link to="/admin/login" className="text-purple-600 hover:underline">
            Admin Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AgentLogin;

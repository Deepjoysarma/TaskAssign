import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AgentSignup = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://taskassign-backend.onrender.com/api/agents/register', {
                username,
                email,
                password
            });
            // console.log(response.data);

            // localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', response.data.agentId);
            navigate(`/agent/dashboard/${response.data.agentId}`);

            setUsername('');
            setEmail('');
            setPassword('');

        } catch (error) {
            // console.error('Signup error:', error);
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Agent Signup</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>
        <p className="text-sm text-center text-gray-500">
          Already have a account ?{' '}
          <Link to="/agents/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AgentSignup;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://taskassign-backend.onrender.com/api/admin/login', {
        email,
        password,
      });
      // console.log(response.data);
      if(response.data.success) {
        // localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', 'admin');
        navigate('/admin/dashboard');
      } else alert('Invalid Password');
    } catch (error) {
      // console.error('Admin login error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleAdminLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-500">
          Are you an agent?{' '}
          <Link to="/agents/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;

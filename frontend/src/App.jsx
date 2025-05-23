import React from 'react'
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom'
import AgentSignup from './pages/AgentSignup'
import AgentLogin from './pages/AgentLogin'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AgentDashboard from './pages/AgentDashboard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/agents/login" />} />
        <Route path='/agents/register' element={<AgentSignup />} />
        <Route path='/agents/login' element={<AgentLogin />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/agent/dashboard/:id' element={<AgentDashboard />} />
      </Routes>
    </Router>
  )
}

export default App

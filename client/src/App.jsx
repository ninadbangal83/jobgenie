// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfileCard from './components/user/ProfileCard';
import AdminDashboard from './components/dashboard/AdminDashboard';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfileCard />} />
        <Route path="/admin" element={<AdminDashboard />} />


      </Routes>
    </Router>
  );
}

export default App;

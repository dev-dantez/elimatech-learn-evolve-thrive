
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '@/pages/dashboard/Dashboard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import CreateCourse from '@/pages/dashboard/CreateCourse';
import NotFoundPage from '@/pages/NotFound';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/courses/create" element={<CreateCourse />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;

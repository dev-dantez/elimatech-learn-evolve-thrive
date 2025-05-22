import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '@/pages/dashboard/Dashboard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import CoursesPage from '@/pages/courses/CoursesPage';
import CourseDetailsPage from '@/pages/courses/CourseDetailsPage';
import MyCoursesPage from '@/pages/courses/MyCoursesPage';
import InstructorDashboard from '@/pages/instructor/InstructorDashboard';
import SettingsPage from '@/pages/settings/SettingsPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import ContactPage from '@/pages/support/ContactPage';
import PrivacyPolicyPage from '@/pages/legal/PrivacyPolicyPage';
import TermsOfServicePage from '@/pages/legal/TermsOfServicePage';
import NotFoundPage from '@/pages/error/NotFoundPage';
import CourseEditPage from '@/pages/instructor/CourseEditPage';
import LessonDetailsPage from '@/pages/courses/LessonDetailsPage';
import CreateCourse from '@/pages/dashboard/CreateCourse';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoursesPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
        <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonDetailsPage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/instructor" element={<InstructorDashboard />} />
        <Route path="/instructor/courses/:courseId/edit" element={<CourseEditPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/dashboard/courses/create" element={<CreateCourse />} />
      </Routes>
    </Router>
  );
};

export default App;

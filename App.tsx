
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FacultyDirectoryPage from './pages/FacultyDirectoryPage';
import FacultyProfilePage from './pages/FacultyProfilePage';
import AdmissionsPage from './pages/AdmissionsPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import ContactPage from './pages/ContactPage';
import EventsPage from './pages/EventsPage';
import StudentPortalPage from './pages/StudentPortalPage';
import FacultyPortalPage from './pages/FacultyPortalPage';
import NotFoundPage from './pages/NotFoundPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faculty" element={<FacultyDirectoryPage />} />
          <Route path="/faculty/:id" element={<FacultyProfilePage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/student-portal" element={<StudentPortalPage />} />
          <Route path="/faculty-portal" element={<FacultyPortalPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;

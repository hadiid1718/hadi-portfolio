import React, { useState, useEffect } from 'react';
import { Router, Route } from './components/utils/Router';
import { Navigation } from './components/common/Navigation';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicePage';
import { WorkPage } from './pages/WorkPAge';
import { ContactPage } from './pages/Contact';
import { ResumePage } from './pages/ResumePage';
import CoursePage from './pages/CoursePage';
import Phishing from './components/courses/Topics/Phishing';
import AndroidHacking from './components/courses/Topics/AndroidHacking';
import Osint from './components/courses/Topics/Osint';
import { UserLogin } from './pages/UserLogin';
import { UserRegister } from './pages/UserRegister';
import { AdminLogin } from './pages/AdminLogin';
import  UserDashboard  from '../src/pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isAuthPage = currentPath.includes('#/login') || currentPath.includes('#/register') || currentPath.includes('#/admin-login');

  return (
    <div className="bg-slate-950 text-white">
      {!isAuthPage && <Navigation />}
      <Router>
        <Route path="/"><HomePage /></Route>
        <Route path="/services"><ServicesPage /></Route>
        <Route path="/work"><WorkPage /></Route>
        <Route path="/contact"><ContactPage /></Route>
        <Route path="/resume"><ResumePage /></Route>
        <Route path="/courses"><CoursePage /></Route>
        <Route path="/phishing"><Phishing /></Route>
        <Route path="/andrat"><AndroidHacking /></Route>
        <Route path="/osint"><Osint /></Route>
        <Route path="/login"><UserLogin /></Route>
        <Route path="/register"><UserRegister /></Route>
        <Route path="/admin-login"><AdminLogin /></Route>
        <Route path="/user-dashboard"><UserDashboard /></Route>
        <Route path="/admin-dashboard"><AdminDashboard /></Route>
      </Router>
      {!isAuthPage && <Footer />}
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Router, Route } from './components/utils/Router';
import { Navigation } from './components/common/Navigation';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicePage';
import { WorkPage } from './pages/WorkPAge';
import { ContactPage } from './pages/Contact';
import { ResumePage } from './pages/ResumePage';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { ChatbotWidget } from './components/common/ChatbotWidget'

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isAuthPage = currentPath.includes('#/haira.347-admin-login');
  const isAdminPage = isAuthPage || currentPath.includes('#/admin-dashboard');

  return (
    <div className="bg-slate-950 text-white">
      {!isAuthPage && <Navigation />}
      <Router>
        <Route path="/"><HomePage /></Route>
        <Route path="/services"><ServicesPage /></Route>
        <Route path="/work"><WorkPage /></Route>
        <Route path="/contact"><ContactPage /></Route>
        <Route path="/resume"><ResumePage /></Route>
        <Route path="/haira.347-admin-login"><AdminLogin /></Route>
        <Route path="/admin-dashboard"><AdminDashboard /></Route>
      </Router>
      {!isAuthPage && <Footer />}
      {/* Chatbot is available to visitors on every public page, hidden on admin pages */}
      {!isAdminPage && <ChatbotWidget />}
    </div>
  );
}
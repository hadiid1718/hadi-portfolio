import React, { useState, useEffect } from 'react';

// Navigates to a new path using the History API (no page reload, no #).
// Dispatches a 'popstate' event manually so every listener (Router, App, etc.)
// picks up the change the same way it would for browser back/forward.
export const navigate = (path) => {
  if (window.location.pathname === path) return;
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return React.Children.map(children, child => {
    if (child.props.path === currentPath) {
      return child;
    }
    return null;
  });
};

export const Route = ({ children }) => children;
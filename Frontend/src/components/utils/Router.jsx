import React, { useState, useEffect } from 'react';

export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname || '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return React.Children.map(children, (child) => {
    if (child.props.path === currentPath) {
      return child;
    }

    return null;
  });
};

export const Route = ({ children }) => children;
import React from 'react';
import { navigate } from '../utils/Router';

export const Link = ({ to, children, className = '', onClick }) => (
  <a
    href={to}
    className={className}
    onClick={(e) => {
      e.preventDefault();
      navigate(to);
      if (onClick) onClick(e);
    }}
  >
    {children}
  </a>
);
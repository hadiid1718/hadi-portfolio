import React from 'react';

export const Link = ({ to, children, className = '' }) => (
  <a href={`#${to}`} className={className}>
    {children}
  </a>
);
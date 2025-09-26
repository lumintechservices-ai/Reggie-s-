import React from 'react';

const EmptyCartIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M49.33 55.8H14.67a4 4 0 0 1-4-3.8l-3-32a4 4 0 0 1 4-4.2h40.66a4 4 0 0 1 4 4.2l-3 32a4 4 0 0 1-4 3.8z" strokeLinecap="round"/>
      <path d="M22.58 24.31V15.5a9.42 9.42 0 0 1 18.84 0v8.81" strokeLinecap="round"/>
    </svg>
  );
};

export default EmptyCartIcon;

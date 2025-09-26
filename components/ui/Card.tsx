import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  const cardClasses = `bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${className}`;

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};

export default Card;
import React from 'react';
import { Link } from 'react-router-dom';
import SpinnerIcon from '../icons/SpinnerIcon';

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  // FIX: Add 'type' prop to allow setting the button's type (e.g., 'submit').
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ to, onClick, children, variant = 'primary', className = '', disabled = false, loading = false, type }) => {
  const baseClasses = 'inline-flex items-center justify-center text-center font-semibold py-3 px-8 rounded-md transition-transform transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-brand-primary text-white hover:bg-brand-primary/90 focus:ring-brand-primary',
    secondary: 'bg-brand-secondary text-brand-dark hover:bg-brand-secondary/90 focus:ring-brand-secondary',
  };

  const finalDisabled = disabled || loading;
  const disabledClasses = finalDisabled ? 'opacity-50 cursor-not-allowed' : '';

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses} disabled={finalDisabled}>
      {loading ? <SpinnerIcon /> : children}
    </button>
  );
};

export default Button;
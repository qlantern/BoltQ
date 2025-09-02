import React from 'react';
import useBreakpoint from '../hooks/useBreakpoint';

interface TouchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const TouchButton: React.FC<TouchButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const { isMobile } = useBreakpoint();
  
  const baseClasses = 'flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-coral-500 hover:bg-coral-600 text-white focus:ring-coral-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
    outline: 'border-2 border-coral-500 text-coral-500 hover:bg-coral-50 focus:ring-coral-500',
    ghost: 'text-coral-500 hover:bg-coral-50 focus:ring-coral-500'
  };
  
  const sizeClasses = {
    sm: isMobile ? 'px-3 py-2 text-sm min-h-touch' : 'px-3 py-1.5 text-sm',
    md: isMobile ? 'px-4 py-3 text-base min-h-touch' : 'px-4 py-2 text-base',
    lg: isMobile ? 'px-6 py-4 text-lg min-h-touch' : 'px-6 py-3 text-lg'
  };
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default TouchButton;
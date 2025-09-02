import React from 'react';
import useBreakpoint from '../hooks/useBreakpoint';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    largeDesktop?: number;
  };
  gap?: string;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = '',
  cols = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    largeDesktop: 4
  },
  gap = 'gap-6'
}) => {
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useBreakpoint();
  
  const getGridCols = () => {
    if (isLargeDesktop && cols.largeDesktop) return `grid-cols-${cols.largeDesktop}`;
    if (isDesktop && cols.desktop) return `grid-cols-${cols.desktop}`;
    if (isTablet && cols.tablet) return `grid-cols-${cols.tablet}`;
    return `grid-cols-${cols.mobile || 1}`;
  };
  
  const gridClasses = `grid ${getGridCols()} ${gap} ${className}`;
  
  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;"
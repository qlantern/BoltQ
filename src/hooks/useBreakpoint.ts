import { useState, useEffect } from 'react';

// Breakpoints matching Tailwind configuration
const breakpoints = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export interface BreakpointInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  currentBreakpoint: string;
  width: number;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2Xl: boolean;
}

const useBreakpoint = (): BreakpointInfo => {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Set initial width
    handleResize();

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate breakpoint information
  const getCurrentBreakpoint = (width: number): string => {
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    if (width >= breakpoints.xs) return 'xs';
    return 'mobile';
  };

  const currentBreakpoint = getCurrentBreakpoint(windowWidth);

  return {
    // Device categories
    isMobile: windowWidth < breakpoints.md, // < 768px
    isTablet: windowWidth >= breakpoints.md && windowWidth < breakpoints.lg, // 768px - 1023px
    isDesktop: windowWidth >= breakpoints.lg, // >= 1024px
    isLargeDesktop: windowWidth >= breakpoints.xl, // >= 1280px
    
    // Individual breakpoints
    isXs: windowWidth >= breakpoints.xs && windowWidth < breakpoints.sm,
    isSm: windowWidth >= breakpoints.sm && windowWidth < breakpoints.md,
    isMd: windowWidth >= breakpoints.md && windowWidth < breakpoints.lg,
    isLg: windowWidth >= breakpoints.lg && windowWidth < breakpoints.xl,
    isXl: windowWidth >= breakpoints.xl && windowWidth < breakpoints['2xl'],
    is2Xl: windowWidth >= breakpoints['2xl'],
    
    // Additional info
    currentBreakpoint,
    width: windowWidth,
  };
};

export default useBreakpoint;
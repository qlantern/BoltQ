import React from 'react';
import useBreakpoint from '../hooks/useBreakpoint';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2';
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = '16/9',
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  loading = 'lazy'
}) => {
  const { isMobile } = useBreakpoint();

  // Generate different image sizes
  const generateSrcSet = (baseSrc: string) => {
    const sizes = [400, 800, 1200, 1600];
    return sizes.map(size => `${baseSrc}?w=${size} ${size}w`).join(', ');
  };

  const aspectRatioClass = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-4/3',
    '1/1': 'aspect-square',
    '3/2': 'aspect-3/2'
  }[aspectRatio];

  return (
    <div className={`relative w-full ${aspectRatioClass} ${className}`}>
      <img 
        src={`${src}?w=${isMobile ? 800 : 1200}`}
        srcSet={generateSrcSet(src)}
        alt={alt}
        className=\"w-full h-full object-cover\"
        loading={loading}
        sizes={sizes}
      />
    </div>
  );
};

export default ResponsiveImage;
'use client';

import React from 'react';

interface SpotlightImageProps {
  imageUrl: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}

const SpotlightImage: React.FC<SpotlightImageProps> = ({ 
  imageUrl, 
  alt, 
  className = "",
  children
}) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const spotlight = container.querySelector('.spotlight') as HTMLElement;
    if (spotlight) {
      spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.3), transparent 80%)`;
      spotlight.style.opacity = '1';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const spotlight = e.currentTarget.querySelector('.spotlight') as HTMLElement;
    if (spotlight) {
      spotlight.style.opacity = '0';
    }
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={imageUrl} 
        alt={alt}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {/* Spotlight Overlay */}
      <div 
        className="spotlight absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 0px 0px, rgba(255, 255, 255, 0.3), transparent 80%)'
        }}
      />
      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" /> */}
      
      {/* Children (buttons) */}
      {children}
    </div>
  );
};

export default SpotlightImage;
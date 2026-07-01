import React from 'react';

interface LogoProps {
  className?: string;
  darkMode?: boolean;
  size?: 'sm' | 'md' | 'lg';
  hideText?: boolean;
}

export default function Logo({ 
  className = '', 
  darkMode = true, 
  size = 'md', 
  hideText = false 
}: LogoProps) {
  const heights = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-16',
  };

  // Determine which logo to show
  let logoSrc;
  
  if (hideText) {
    // Icon only mode - use logo icon
    logoSrc = '/logo-icon.png';
  } else {
    // Full logo with text - use dark or light version
    logoSrc = darkMode ? '/logo-dark.png' : '/logo-light.png';
  }

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Natton Digital Marketing Logo"
        className={`${heights[size]} w-auto object-contain`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
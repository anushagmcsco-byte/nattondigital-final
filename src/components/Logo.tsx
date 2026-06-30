import React from 'react';

interface LogoProps {
  className?: string;
  darkMode?: boolean;
  size?: 'sm' | 'md' | 'lg';
  hideText?: boolean;
}

export default function Logo({ className = '', darkMode = true, size = 'md', hideText = false }: LogoProps) {
  const iconSizes = {
    sm: 'h-6 w-6',
    md: 'h-9 w-9',
    lg: 'h-14 w-14',
  };

  const titleSizes = {
    sm: 'text-[14px] tracking-[0.1em]',
    md: 'text-[22px] tracking-[0.12em]',
    lg: 'text-[34px] tracking-[0.14em]',
  };

  const subtitleSizes = {
    sm: 'text-[6px] tracking-[0.2em]',
    md: 'text-[9.5px] tracking-[0.24em]',
    lg: 'text-[14px] tracking-[0.26em]',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* High-Fidelity Vector Replica of the Natton Corporate Logo Icon */}
      <svg 
        className={`${iconSizes[size]} flex-shrink-0`} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Fresh corporate green-to-cyan gradient matching the brand assets */}
          <linearGradient id="natton-grad" x1="10%" y1="90%" x2="90%" y2="10%">
            <stop offset="0%" stopColor="#86EFAC" />   {/* Fresh light green */}
            <stop offset="50%" stopColor="#4FD1C5" />  {/* Mint Teal */}
            <stop offset="100%" stopColor="#38BDF8" /> {/* Electric Cyan */}
          </linearGradient>
        </defs>

        {/* Outer "D" frame that starts vertically at left, goes top, curves right and bottom, and goes left */}
        <path 
          d="M 18,30 V 12 H 60 A 36,36 0 0,1 60,84 H 18" 
          stroke="url(#natton-grad)" 
          strokeWidth="10" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />

        {/* Diagonal woven ribbon mesh (S-curves) matching the grid structure of the second logo */}
        {/* Curve 3: Top-left to top-middle step */}
        <path 
          d="M 18,48 C 18,39 27,30 36,30 C 45,30 54,21 54,12" 
          stroke="url(#natton-grad)" 
          strokeWidth="10" 
          strokeLinecap="round" 
          fill="none"
        />

        {/* Curve 2: Middle-left to top-right step */}
        <path 
          d="M 18,66 C 18,57 27,48 36,48 C 45,48 54,39 54,30 C 54,21 63,12 72,12" 
          stroke="url(#natton-grad)" 
          strokeWidth="10" 
          strokeLinecap="round" 
          fill="none"
        />

        {/* Curve 1: Bottom-left to middle-right step */}
        <path 
          d="M 18,84 C 18,75 27,66 36,66 C 45,66 54,57 54,48 C 54,39 63,30 72,30" 
          stroke="url(#natton-grad)" 
          strokeWidth="10" 
          strokeLinecap="round" 
          fill="none"
        />

        {/* Curve 0: Bottom-middle to bottom-right step */}
        <path 
          d="M 36,84 C 36,75 45,66 54,66 C 63,66 72,57 72,48" 
          stroke="url(#natton-grad)" 
          strokeWidth="10" 
          strokeLinecap="round" 
          fill="none"
        />
      </svg>

      {/* Corporate Brand Typography */}
      {!hideText && (
        <div className="flex flex-col leading-none mt-0.5">
          <span className={`font-sans font-black uppercase ${titleSizes[size]} ${
            darkMode ? 'text-white' : 'text-[#1E0E62]'
          }`}>
            Natton
          </span>
          <span className={`font-sans font-bold uppercase mt-1 ${subtitleSizes[size]} ${
            darkMode ? 'text-[#00C2FF]' : 'text-[#00A3D7]'
          }`}>
            Digital Marketing
          </span>
        </div>
      )}
    </div>
  );
}





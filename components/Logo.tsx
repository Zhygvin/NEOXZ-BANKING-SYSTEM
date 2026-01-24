import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 48 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Outer Glow & Background */}
      <div className="absolute inset-0 bg-cyan-500/10 rounded-xl blur-sm animate-pulse"></div>
      
      {/* SVG Icon Construction */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full relative z-10"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cybernetic Traces (The Infrastructure) */}
        <path 
          d="M20 50H30M70 50H80M50 20V30M50 70V80M30 30L35 35M65 65L70 70M30 70L35 65M65 30L70 35" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          className="text-cyan-500/40"
        />
        
        {/* Hexagonal Shield (Financial Sovereignty) */}
        <path 
          d="M50 15L80 32.5V67.5L50 85L20 67.5V32.5L50 15Z" 
          stroke="url(#sovereignGradient)" 
          strokeWidth="3"
          className="drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]"
        />
        
        {/* Quantum Neural Core */}
        <circle 
          cx="50" cy="50" r="12" 
          fill="url(#quantumGradient)"
          className="animate-pulse"
        />
        
        {/* Inner Logic Lines */}
        <path 
          d="M50 38V42M50 58V62M38 50H42M58 50H62" 
          stroke="white" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />

        {/* Orbiting Quantum Bits */}
        <circle cx="50" cy="50" r="22" stroke="white" strokeWidth="0.5" strokeDasharray="2 4" className="animate-[spin_10s_linear_infinite] opacity-30" />

        {/* Gradients */}
        <defs>
          <linearGradient id="sovereignGradient" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EAB308" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="quantumGradient" x1="38" y1="38" x2="62" y2="62" gradientUnits="userSpaceOnUse">
            <stop stopColor="#06B6D4" />
            <stop offset="1" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;

import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
}) => {
  const iconSize = size === 'sm' ? 36 : size === 'lg' ? 64 : 48;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Stylized Meat & Sweet Bull Mascot */}
      <div 
        className="relative shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-900 to-black p-1 border border-amber-500/30 shadow-lg shadow-red-950/40"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer glow ring */}
          <circle cx="60" cy="60" r="54" fill="#1C1917" stroke="#DC2626" strokeWidth="3" />
          
          {/* Golden Curved Horns */}
          <path
            d="M 28 42 C 16 30 18 10 32 8 C 30 20 38 32 44 38 Z"
            fill="#F59E0B"
            stroke="#B45309"
            strokeWidth="1.5"
          />
          <path
            d="M 92 42 C 104 30 102 10 88 8 C 90 20 82 32 76 38 Z"
            fill="#F59E0B"
            stroke="#B45309"
            strokeWidth="1.5"
          />

          {/* Bull Ears with Red Accent */}
          <ellipse cx="24" cy="54" rx="10" ry="7" fill="#DC2626" transform="rotate(-15 24 54)" />
          <ellipse cx="96" cy="54" rx="10" ry="7" fill="#DC2626" transform="rotate(15 96 54)" />

          {/* Bull Head Contour */}
          <path
            d="M 34 46 C 34 36 86 36 86 46 C 88 64 86 86 60 92 C 34 86 32 64 34 46 Z"
            fill="#171717"
            stroke="#451A03"
            strokeWidth="2"
          />

          {/* Cute Big Eyes */}
          <circle cx="46" cy="56" r="8" fill="#FFFFFF" />
          <circle cx="48" cy="56" r="4.5" fill="#0A0A0A" />
          <circle cx="49" cy="54" r="1.5" fill="#FFFFFF" />

          <circle cx="74" cy="56" r="8" fill="#FFFFFF" />
          <circle cx="72" cy="56" r="4.5" fill="#0A0A0A" />
          <circle cx="71" cy="54" r="1.5" fill="#FFFFFF" />

          {/* Snout / Muzzle */}
          <path
            d="M 40 70 C 40 64 80 64 80 70 C 80 84 40 84 40 70 Z"
            fill="#DC2626"
          />
          {/* Nostrils */}
          <ellipse cx="52" cy="74" rx="2.5" ry="3.5" fill="#450A0A" />
          <ellipse cx="68" cy="74" rx="2.5" ry="3.5" fill="#450A0A" />

          {/* Friendly Smirk */}
          <path
            d="M 54 81 Q 60 84 66 81"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>

        {/* Small trademark mark */}
        <span className="absolute -top-1 -right-1 text-[8px] font-bold text-red-500 font-mono">®</span>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-xl md:text-2xl font-black tracking-tight text-white font-['Tajawal',sans-serif]">
            Meat <span className="text-red-500">&</span> Sweet
          </span>
          <span className="text-[10px] text-amber-500 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
            بلدي 100%
          </span>
        </div>
        {showTagline && (
          <span className="text-xs text-neutral-400 font-medium">
            قطعيات اللحوم المدخنة والبرجر الفاخر
          </span>
        )}
      </div>
    </div>
  );
};

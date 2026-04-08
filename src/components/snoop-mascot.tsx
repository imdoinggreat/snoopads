'use client'

import { useState } from 'react'

export function SnoopMascot({ className = '' }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`mascot-glow inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width="200"
        height="160"
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-breathe"
        aria-label="SnoopAds mascot - a border collie sniffing for ads"
      >
        {/* Body */}
        <ellipse cx="110" cy="110" rx="50" ry="35" fill="#1A1A1A" stroke="white" strokeWidth="2.5" />

        {/* White chest patch */}
        <ellipse cx="90" cy="115" rx="15" ry="20" fill="white" />

        {/* Head */}
        <circle cx="65" cy="75" r="30" fill="#1A1A1A" stroke="white" strokeWidth="2.5" />

        {/* White face stripe */}
        <path d="M65 50 L60 75 L65 95 L70 75 Z" fill="white" />

        {/* Left ear */}
        <path
          d="M42 55 L35 30 L55 50 Z"
          fill="#1A1A1A"
          stroke="white"
          strokeWidth="2"
          className="animate-ear"
        />

        {/* Right ear */}
        <path
          d="M82 50 L90 28 L75 48 Z"
          fill="#1A1A1A"
          stroke="white"
          strokeWidth="2"
          className="animate-ear"
          style={{ animationDelay: '0.5s' }}
        />

        {/* Eyes */}
        <circle cx="55" cy="72" r="4" fill="white" />
        <circle cx="75" cy="70" r="4" fill="white" />
        <circle cx="56" cy="73" r="2" fill="#121212" />
        <circle cx="76" cy="71" r="2" fill="#121212" />

        {/* Eye shine */}
        <circle cx="54" cy="71" r="1" fill="white" opacity="0.8" />
        <circle cx="74" cy="69" r="1" fill="white" opacity="0.8" />

        {/* Nose - sniffing */}
        <g className="animate-sniff">
          <ellipse cx="45" cy="82" rx="5" ry="4" fill="#333" stroke="white" strokeWidth="1.5" />
          {/* Sniff lines */}
          <line x1="35" y1="78" x2="30" y2="76" stroke="white" strokeWidth="1" opacity="0.6" />
          <line x1="35" y1="82" x2="28" y2="82" stroke="white" strokeWidth="1" opacity="0.6" />
          <line x1="35" y1="86" x2="30" y2="88" stroke="white" strokeWidth="1" opacity="0.6" />
        </g>

        {/* Mouth */}
        <path d="M45 86 Q55 92 60 88" stroke="white" strokeWidth="1.5" fill="none" />

        {/* Front legs */}
        <rect x="75" y="130" width="10" height="25" rx="4" fill="#1A1A1A" stroke="white" strokeWidth="2" />
        <rect x="95" y="130" width="10" height="25" rx="4" fill="#1A1A1A" stroke="white" strokeWidth="2" />

        {/* White paws */}
        <rect x="75" y="148" width="10" height="7" rx="4" fill="white" />
        <rect x="95" y="148" width="10" height="7" rx="4" fill="white" />

        {/* Back legs */}
        <rect x="130" y="128" width="10" height="27" rx="4" fill="#1A1A1A" stroke="white" strokeWidth="2" />
        <rect x="148" y="130" width="10" height="25" rx="4" fill="#1A1A1A" stroke="white" strokeWidth="2" />

        {/* White back paws */}
        <rect x="130" y="148" width="10" height="7" rx="4" fill="white" />
        <rect x="148" y="148" width="10" height="7" rx="4" fill="white" />

        {/* Tail */}
        <path
          d="M155 95 Q170 80 175 90 Q178 98 165 100"
          stroke="white"
          strokeWidth="2.5"
          fill="#1A1A1A"
          className={isHovered ? 'animate-wag' : ''}
        />

        {/* Fluffy collar */}
        <path
          d="M80 90 Q75 100 80 110 Q85 105 90 100 Q95 110 100 105"
          fill="white"
          opacity="0.9"
        />
      </svg>

      {/* Hover tooltip bubble */}
      {isHovered && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg px-3 py-1 text-xs text-primary whitespace-nowrap" style={{ opacity: 1 }}>
          Sniffing for ads...
        </div>
      )}
    </div>
  )
}

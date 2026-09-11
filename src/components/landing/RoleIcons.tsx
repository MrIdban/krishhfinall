import React from 'react';

// Tile background: #8ca57f, Icon color: #4a331e

export const FarmerTileIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Hat brim & crown */}
    <path
      d="M50 82 C55 60 70 52 100 52 C130 52 145 60 150 82 C155 86 145 88 135 87 C125 86 115 86 100 86 C85 86 75 86 65 87 C55 88 45 86 50 82 Z"
      fill="#4a331e"
    />
    <path
      d="M68 76 C70 56 82 50 100 50 C118 50 130 56 132 76 Z"
      fill="#4a331e"
    />
    {/* Head */}
    <circle cx="100" cy="98" r="23" fill="#4a331e" />

    {/* Body / Shoulders */}
    <path
      d="M52 165 C52 135 70 125 90 123 L90 165 Z"
      fill="#4a331e"
    />
    <path
      d="M100 128 L100 165 L145 165 C145 142 138 132 120 125 L116 138 L100 138 Z"
      fill="#4a331e"
    />
    {/* Overalls center body */}
    <path
      d="M72 132 L82 132 L84 165 L72 165 Z"
      fill="#8ca57f"
    />
    <path
      d="M116 132 L126 132 L126 165 L114 165 Z"
      fill="#8ca57f"
    />
    {/* Overalls front bib */}
    <rect x="78" y="136" width="44" height="29" rx="3" fill="#4a331e" />

    {/* Seedling Sprout on the right */}
    <path
      d="M140 165 L175 165"
      stroke="#4a331e"
      strokeWidth="6"
      strokeLinecap="round"
    />
    {/* Vertical Stem */}
    <path
      d="M158 165 L158 126"
      stroke="#4a331e"
      strokeWidth="6"
      strokeLinecap="round"
    />
    {/* Left leaf */}
    <path
      d="M158 140 C144 140 138 130 142 124 C148 118 158 130 158 140 Z"
      fill="#4a331e"
    />
    {/* Right leaf */}
    <path
      d="M158 134 C172 134 178 124 174 118 C168 112 158 124 158 134 Z"
      fill="#4a331e"
    />
  </svg>
);

export const AdminTileIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Head */}
    <circle cx="86" cy="62" r="28" fill="#4a331e" />

    {/* Body / Suit */}
    <path
      d="M40 165 C40 125 58 108 92 106 C112 107 124 115 132 126 C124 133 118 143 118 156 C118 160 119 163 120 165 Z"
      fill="#4a331e"
    />
    {/* Tie & Collar */}
    <path
      d="M86 108 L80 120 L86 160 L92 120 Z"
      fill="#8ca57f"
    />
    <path
      d="M86 112 L77 122 L86 156 L95 122 Z"
      fill="#4a331e"
    />

    {/* Gear / Cogwheel on bottom right */}
    <g transform="translate(142, 145)">
      {/* 8 Gear Teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <rect
          key={angle}
          x="-5"
          y="-31"
          width="10"
          height="10"
          rx="2"
          fill="#4a331e"
          transform={`rotate(${angle})`}
        />
      ))}
      {/* Outer Gear Ring */}
      <circle cx="0" cy="0" r="25" fill="#4a331e" />
      {/* Inner Hole matching tile green */}
      <circle cx="0" cy="0" r="12" fill="#8ca57f" />
    </g>
  </svg>
);

export const BuyerTileIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Head */}
    <circle cx="88" cy="62" r="28" fill="#4a331e" />

    {/* Torso / Shoulders */}
    <path
      d="M42 165 C42 122 62 108 96 106 C115 107 128 115 136 128 C124 135 116 148 116 165 Z"
      fill="#4a331e"
    />

    {/* Shopping Bag Badge circle in bottom right */}
    <circle cx="140" cy="144" r="28" fill="#4a331e" />

    {/* Shopping bag interior cutout (green) */}
    {/* Bag body */}
    <path
      d="M126 138 L154 138 L151 160 C151 162 149 164 146 164 L134 164 C131 164 129 162 129 160 Z"
      fill="#8ca57f"
    />
    {/* Bag handles */}
    <path
      d="M134 138 V133 C134 130 136 127 140 127 C144 127 146 130 146 133 V138"
      stroke="#8ca57f"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
);

export const DeliverTileIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* 3D Isometric Box in center */}
    <g transform="translate(100, 72)">
      {/* Top face */}
      <path
        d="M0 -22 L26 -8 L0 6 L-26 -8 Z"
        fill="#4a331e"
      />
      {/* Left face */}
      <path
        d="M-26 -8 L0 6 L0 36 L-26 22 Z"
        fill="#4a331e"
      />
      {/* Right face */}
      <path
        d="M26 -8 L0 6 L0 36 L26 22 Z"
        fill="#4a331e"
      />
      {/* Inner seam line on box top */}
      <path
        d="M0 -22 L0 6"
        stroke="#8ca57f"
        strokeWidth="2.5"
      />
      {/* Side seam lines */}
      <path
        d="M-26 -8 L0 6 L26 -8"
        stroke="#8ca57f"
        strokeWidth="2"
      />
    </g>

    {/* Left Cradling Hand & Arm */}
    <path
      d="M44 126 C44 126 44 148 44 156 C44 162 48 165 54 165 L66 165 C72 165 76 162 78 156 L78 140 L88 152 C92 157 98 157 102 153 C106 149 106 143 101 138 L76 112 C71 107 63 107 58 112 L50 120"
      stroke="#4a331e"
      strokeWidth="11"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M45 130 V165 H65 V145"
      fill="#4a331e"
    />

    {/* Right Cradling Hand & Arm */}
    <path
      d="M156 126 C156 126 156 148 156 156 C156 162 152 165 146 165 L134 165 C128 165 124 162 122 156 L122 140 L112 152 C108 157 102 157 98 153 C94 149 94 143 99 138 L124 112 C129 107 137 107 142 112 L150 120"
      stroke="#4a331e"
      strokeWidth="11"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M155 130 V165 H135 V145"
      fill="#4a331e"
    />
  </svg>
);

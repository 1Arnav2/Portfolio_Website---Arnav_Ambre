
import React from 'react';

export const EnvelopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="url(#a)">
      <path d="M112 36H16a4 4 0 0 0-4 4v52a4 4 0 0 0 4 4h96a4 4 0 0 0 4-4V40a4 4 0 0 0-4-4Z" fill="#fff" />
      <path d="m111.4 38-46.8 35.1a1 1 0 0 1-1.2 0L16.6 38Z" fill="#E6E6E6" />
      <path d="M16 92V40.5l48 36 48-36V92Z" fill="#F2F2F2" />
    </g>
    <defs>
      <filter id="a" x="0" y="0" width="128" height="128" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="6"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
      </filter>
    </defs>
  </svg>
);

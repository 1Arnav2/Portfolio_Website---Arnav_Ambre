import React from 'react';

export const HarvardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="100" height="100" rx="10" fill="#A51C30"/>
        <text x="50" y="55" fontFamily="Arial, sans-serif" fontSize="18" fill="white" textAnchor="middle" fontWeight="bold">HARVARD</text>
        <text x="50" y="75" fontFamily="Arial, sans-serif" fontSize="12" fill="white" textAnchor="middle">BUSINESS SCHOOL</text>
    </svg>
);

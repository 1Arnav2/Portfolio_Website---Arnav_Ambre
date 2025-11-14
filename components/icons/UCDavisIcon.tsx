
import React from 'react';

export const UCDavisIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="100" height="100" rx="10" fill="#002855"/>
        <text x="50" y="45" fontFamily="Arial, sans-serif" fontSize="24" fill="#C7A952" textAnchor="middle" fontWeight="bold">UC</text>
        <text x="50" y="75" fontFamily="Arial, sans-serif" fontSize="24" fill="#C7A952" textAnchor="middle" fontWeight="bold">DAVIS</text>
    </svg>
);

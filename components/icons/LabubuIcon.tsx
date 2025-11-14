
import React from 'react';

export const LabubuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        {/* Head */}
        <circle cx="50" cy="60" r="30" fill="#E0F2FE"/>
        
        {/* Left Ear */}
        <path d="M30,45 C10,45 10,15 30,15 C40,15 40,45 30,45" fill="#E0F2FE"/>
        <path d="M30,45 C10,45 10,15 30,15" stroke="#0284C7" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        
        {/* Right Ear */}
        <path d="M70,45 C90,45 90,15 70,15 C60,15 60,45 70,45" fill="#E0F2FE"/>
        <path d="M70,45 C90,45 90,15 70,15" stroke="#0284C7" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Eyes */}
        <circle cx="42" cy="60" r="4" fill="#0284C7"/>
        <circle cx="58" cy="60" r="4" fill="#0284C7"/>
        
        {/* Mouth */}
        <path d="M48 70 Q 50 75 52 70" stroke="#0284C7" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
);


import React from 'react';

export const FramerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 4h16v8h-8z" fill="#000" />
        <path d="M4 12h8v8H4z" fill="#0055FF" />
    </svg>
);

export const ArcIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A566FF" />
                <stop offset="100%" stopColor="#4D8FFF" />
            </linearGradient>
        </defs>
        <path fill="url(#arcGradient)" d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" />
        <path fill="url(#arcGradient)" d="M12,7a5,5,0,1,0,5,5A5,5,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" />
    </svg>
);

export const SuperhumanIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2L2 12l10 10 10-10L12 2z" fill="#222" />
        <path d="M12 6l6 6-6 6-6-6 6-6z" fill="#555" />
    </svg>
);

export const RaycastIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#FF6363" />
        <path d="M2 17l10 5 10-5-10-5-10 5z" fill="#FF6363" fillOpacity="0.7" />
    </svg>
);

export const FigmaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 12a4 4 0 01-4-4h4v4z" fill="#F24E1E" />
        <path d="M16 8a4 4 0 01-4 4V8h4z" fill="#FF7262" />
        <path d="M16 12a4 4 0 11-4 4v-4h4z" fill="#A259FF" />
        <path d="M12 12a4 4 0 004 4v-4h-4z" fill="#1ABCFE" />
        <path d="M8 8a4 4 0 100 8h4V8H8z" fill="#0ACF83" />
    </svg>
);

export const LemonSqueezyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#FFC107" />
        <path d="M12 4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="#FFC107" />
    </svg>
);

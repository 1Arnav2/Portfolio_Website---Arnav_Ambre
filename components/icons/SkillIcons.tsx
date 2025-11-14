
import React from 'react';

export const SQLIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 6V18C4 19.6569 7.58172 21 12 21C16.4183 21 20 19.6569 20 18V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M4 12C4 13.6569 7.58172 15 12 15C16.4183 15 20 13.6569 20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

export const PowerBIIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 20V4h4v16H4z" fill="#F2C811"/>
        <path d="M10 20V12h4v8h-4z" fill="#F2C811"/>
        <path d="M16 20V8h4v12h-4z" fill="#F2C811"/>
    </svg>
);

export const ExcelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M2 3h20v18H2V3z" fill="#1D6C42"/>
        <path d="M15.5 8.5l-2.5 3-2.5-3M8.5 16.5l2.5-3 2.5 3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

export const GoogleAnalyticsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="4" y="14" width="4" height="6" rx="1" fill="#F9AB00"/>
        <rect x="10" y="8" width="4" height="12" rx="1" fill="#F9AB00"/>
        <rect x="16" y="2" width="4" height="18" rx="1" fill="#F9AB00"/>
    </svg>
);

export const JiraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M21.6 2.4c-1-1-2.4-1.6-3.9-1.6H6.2C3.2 0.8 0.8 3.2 0.8 6.2v11.5c0 1.5 0.6 2.9 1.6 3.9 1 1 2.4 1.6 3.9 1.6h11.5c3 0 5.4-2.4 5.4-5.4V6.2C23.2 4.7 22.6 3.4 21.6 2.4zM12 17.6l-5.4-5.4 5.4-5.4 5.4 5.4-5.4 5.4z" fill="#2684FF"/>
    </svg>
);

export const TrelloIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#0079BF"/>
        <rect x="7" y="7" width="4" height="10" rx="1" fill="white"/>
        <rect x="13" y="7" width="4" height="6" rx="1" fill="white"/>
    </svg>
);

export const PythonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 14.5a2.5 2.5 0 00-2.5-2.5H8v5h1.5a2.5 2.5 0 002.5-2.5z" fill="#FFD43B" />
        <path d="M15 2a5 5 0 00-5 5v2.5h2.5a2.5 2.5 0 010 5H10v2.5a5 5 0 0010 0v-10a5 5 0 00-5-5z" fill="#306998" />
        <path d="M12 9.5a2.5 2.5 0 012.5 2.5H16v-5h-1.5a2.5 2.5 0 00-2.5 2.5z" fill="#306998" />
        <path d="M9 22a5 5 0 005-5v-2.5H11.5a2.5 2.5 0 010-5H14V7a5 5 0 00-10 0v10a5 5 0 005 5z" fill="#FFD43B" />
    </svg>
);

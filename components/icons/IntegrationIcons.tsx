
import React from 'react';

export const KnotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M10 3L6 7V17L10 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 3L18 7V17L14 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const VeltixIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#3B82F6"/>
        <path d="M17 9.5C17 9.5 14.5 12 12 12C9.5 12 7 9.5 7 9.5C7 9.5 9.5 7 12 7C14.5 7 17 9.5 17 9.5Z" fill="white"/>
        <path d="M16 14.5C16 14.5 14 12.5 12 12.5C10 12.5 8 14.5 8 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const NuvioIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2L4 6.5V15.5L12 20L20 15.5V6.5L12 2Z" fill="#4F46E5"/>
        <path d="M12 11.5L16 9.25L12 7L8 9.25L12 11.5Z" fill="white"/>
        <path d="M12 15.5L16 13.25L12 11L8 13.25L12 15.5Z" fill="white" fillOpacity="0.7"/>
    </svg>
);

export const KlyraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="6" fill="#F97316"/>
        <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 13V17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const CheckmarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.1"/>
        <path d="M14 7L8.5 12.5L6 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

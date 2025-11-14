
import React, { useState, useEffect, useRef } from 'react';
import { FramerIcon, ArcIcon, SuperhumanIcon, RaycastIcon, FigmaIcon, LemonSqueezyIcon } from './icons/TechStackIcons';

const techTools = [
    { name: 'Framer', description: 'Website Builder', logo: <FramerIcon className="w-8 h-8" /> },
    { name: 'Arc', description: 'Chrome Alternative', logo: <ArcIcon className="w-8 h-8" /> },
    { name: 'Superhuman', description: 'Email Client', logo: <SuperhumanIcon className="w-8 h-8" /> },
    { name: 'Raycast', description: 'A Better Spotlight', logo: <RaycastIcon className="w-8 h-8" /> },
    { name: 'Figma', description: 'Design tool', logo: <FigmaIcon className="w-8 h-8" /> },
    { name: 'LemonSqueezy', description: 'Accept Payments', logo: <LemonSqueezyIcon className="w-8 h-8" /> },
];

const TechStack: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
          if(currentRef) observer.unobserve(currentRef);
        }
    }, []);

    return (
        <section 
            ref={sectionRef} 
            id="tech-stack" 
            className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
                        Tech Stack
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                        Some of the tools I use in my workflow.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {techTools.map((tool, index) => (
                        <div 
                            key={index}
                            className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-4"
                        >
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                                {tool.logo}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                                <p className="text-sm text-gray-500">{tool.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
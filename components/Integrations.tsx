import React, { useState, useEffect, useRef } from 'react';
import { CheckmarkIcon } from './icons/IntegrationIcons';
import { SQLIcon, PowerBIIcon, ExcelIcon, GoogleAnalyticsIcon, JiraIcon, TrelloIcon, PythonIcon } from './icons/SkillIcons';
import { TableauIcon } from './icons/TableauIcon';

const skills = [
    { name: 'SQL', logo: <SQLIcon className="w-8 h-8 text-blue-500" />, checked: true },
    { name: 'PowerBI', logo: <PowerBIIcon className="w-8 h-8" />, checked: true },
    { name: 'Tableau', logo: <TableauIcon className="w-8 h-8 text-blue-600" />, checked: true },
    { name: 'Excel', logo: <ExcelIcon className="w-8 h-8" />, checked: true },
    { name: 'Google Analytics', logo: <GoogleAnalyticsIcon className="w-8 h-8" />, checked: true },
    { name: 'Jira', logo: <JiraIcon className="w-8 h-8" />, checked: true },
    { name: 'Trello', logo: <TrelloIcon className="w-8 h-8" />, checked: true },
    { name: 'Python', logo: <PythonIcon className="w-8 h-8" />, checked: true },
];

const SkillCard: React.FC<{ name: string; logo: React.ReactElement; checked: boolean }> = ({ name, logo, checked }) => (
    <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-md flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            {logo}
        </div>
        <div className="flex-grow">
            <div className="flex items-center gap-2">
                {checked && <CheckmarkIcon className="w-5 h-5 text-blue-500" />}
                <p className="font-semibold text-gray-800">{name}</p>
            </div>
            <div className="h-2 w-2/3 bg-blue-200 rounded-full mt-2"></div>
            <div className="h-2 w-1/2 bg-blue-200 rounded-full mt-1.5"></div>
        </div>
    </div>
);


const Integrations: React.FC = () => {
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

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
          if(sectionRef.current) observer.unobserve(sectionRef.current);
        }
    }, []);

    const handleProjectLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetElement = document.getElementById('projects');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section 
            ref={sectionRef} 
            id="skills" 
            className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
        >
            <div className="max-w-6xl mx-auto text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
                    My Skills & Integrations
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                    A look at the technologies I work with and the tools I can seamlessly integrate into projects.
                </p>
            </div>
            <div className="max-w-6xl mx-auto w-full p-6 sm:p-8 lg:p-10 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200/80">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                            Tech Stack
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
                            My Technical Skills
                        </h2>
                        <p className="mt-5 max-w-md mx-auto lg:mx-0 text-lg text-gray-600">
                            Proficient in a variety of tools and technologies to analyze data, build models, and drive insights.
                        </p>
                        <div className="mt-8">
                            <a
                                href="#projects"
                                onClick={handleProjectLinkClick}
                                className="inline-block bg-blue-600 text-white font-medium px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-600/30 transform hover:-translate-y-0.5"
                            >
                                See My Projects
                            </a>
                        </div>
                    </div>

                    {/* Right Scrolling List */}
                    <div className="w-full h-[400px] overflow-hidden relative">
                         <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white/80 to-transparent z-10 pointer-events-none rounded-t-xl" />
                         <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/80 to-transparent z-10 pointer-events-none rounded-b-xl" />
                        <div className="animate-vertical-marquee">
                            <div className="space-y-4 py-2">
                                {[...skills, ...skills, ...skills].map((item, index) => (
                                    <SkillCard key={index} name={item.name} logo={item.logo} checked={item.checked} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Integrations;
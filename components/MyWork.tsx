
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

const projectsData = [
  {
    id: 1,
    title: 'Fintech SaaS Dashboard',
    description: 'A comprehensive financial management platform.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto-format&fit=crop',
    client: 'Finte Corp',
    category: 'Web Application',
    date: '2023',
    link: '#',
    fullDescription: [
      'Finte is a comprehensive SaaS platform designed to empower businesses with real-time financial insights. We developed a highly intuitive dashboard that consolidates data from multiple sources, offering visualizations for cash flow, expense tracking, and revenue forecasting.',
      'The project involved creating a modular component library in React, ensuring scalability and consistency. We focused on a clean UX to reduce cognitive load for users, enabling them to make faster, data-driven decisions. Security was paramount, implementing multi-factor authentication and end-to-end encryption.',
    ],
  },
  {
    id: 2,
    title: 'Taskgen Productivity App',
    description: 'A tool for effective team collaboration.',
    imageUrl: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto-format&fit=crop',
    client: 'Taskgen Inc.',
    category: 'Productivity SaaS',
    date: '2022',
    link: '#',
    fullDescription: [
      'Taskgen is a productivity tool that helps teams manage their workflows and collaborate more effectively. The platform features a drag-and-drop interface, real-time updates, and powerful integrations with other services like Slack and Google Calendar.',
      'Our goal was to create a delightful user experience that makes task management feel less like a chore. We implemented features like customizable boards, automated workflows, and detailed analytics to help teams stay organized and productive.',
    ],
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    description: 'A scalable online retail solution.',
    imageUrl: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto-format&fit=crop',
    client: 'Shopify',
    category: 'E-commerce',
    date: '2024',
    link: '#',
    fullDescription: [
        'This project involved building a high-performance e-commerce platform from the ground up. Key features include a custom product management system, secure payment gateway integration, and a personalized recommendation engine.',
        'We focused on creating a fast, responsive, and mobile-first shopping experience to maximize conversion rates. The architecture was designed to be highly scalable to handle traffic spikes during peak seasons.'
    ]
  },
  {
    id: 4,
    title: 'Mobile Health App',
    description: 'Connecting patients with healthcare providers.',
    imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1974&auto-format&fit=crop',
    client: 'HealthConnect',
    category: 'Mobile App',
    date: '2023',
    link: '#',
    fullDescription: [
        'A mobile application designed to bridge the gap between patients and healthcare professionals. The app allows users to schedule appointments, have virtual consultations, and manage their health records securely.',
        'We prioritized data privacy and HIPAA compliance throughout the development process. The user interface was designed to be simple and accessible for users of all ages and technical abilities.'
    ]
  }
];

const MyWork: React.FC = () => {
    const [activeProject, setActiveProject] = useState<(typeof projectsData)[0] | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isChangingProject, setIsChangingProject] = useState(false);
    
    const gridRef = useRef<HTMLDivElement>(null);
    const detailRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [activeProject]);

    const handleProjectClick = (project: typeof projectsData[0], event: React.MouseEvent<HTMLDivElement>) => {
        if (isAnimating || activeProject) return;

        const cardImage = event.currentTarget.querySelector('.project-card-image') as HTMLImageElement;
        if (!cardImage) return;

        setIsAnimating(true);
        
        const startRect = cardImage.getBoundingClientRect();

        const clone = cardImage.cloneNode() as HTMLImageElement;
        clone.style.position = 'fixed';
        clone.style.top = `${startRect.top}px`;
        clone.style.left = `${startRect.left}px`;
        clone.style.width = `${startRect.width}px`;
        clone.style.height = `${startRect.height}px`;
        clone.style.zIndex = '9999';
        clone.style.objectFit = 'cover';
        clone.style.margin = '0';
        document.body.appendChild(clone);
        
        cardImage.style.opacity = '0';

        setActiveProject(project);

        setTimeout(() => {
            if (!detailRef.current) return;
            
            const detailImageContainer = detailRef.current.querySelector('.hero-image-container') as HTMLElement;
            if (!detailImageContainer) {
                clone.remove();
                cardImage.style.opacity = '1';
                setIsAnimating(false);
                return;
            }

            const endRect = detailImageContainer.getBoundingClientRect();
            
            detailRef.current.style.visibility = 'visible';
            detailRef.current.style.opacity = '1';

            const detailImage = detailImageContainer.querySelector('img') as HTMLImageElement;
            detailImage.style.opacity = '0';

            detailRef.current.querySelectorAll('.detail-content-animating').forEach(el => {
                const htmlEl = el as HTMLElement;
                htmlEl.style.opacity = '0';
                htmlEl.style.transform = 'translateY(20px)';
            });

            clone.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            clone.style.top = `${endRect.top}px`;
            clone.style.left = `${endRect.left}px`;
            clone.style.width = `${endRect.width}px`;
            clone.style.height = `${endRect.height}px`;

            clone.addEventListener('transitionend', () => {
                detailImage.style.transition = 'opacity 0.3s ease-in';
                detailImage.style.opacity = '1';
                
                detailRef.current?.querySelectorAll('.detail-content-animating').forEach(el => {
                   const htmlEl = el as HTMLElement;
                   htmlEl.style.transition = 'opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s';
                   htmlEl.style.opacity = '1';
                   htmlEl.style.transform = 'translateY(0)';
                });
                
                clone.remove();
                setIsAnimating(false);
            }, { once: true });
        }, 50);
    };
    
    const handleBackClick = () => {
        if (isAnimating || !activeProject) return;

        const detailImage = detailRef.current?.querySelector('.hero-image') as HTMLImageElement;
        const cardImage = gridRef.current?.querySelector(`[data-project-id="${activeProject.id}"] .project-card-image`) as HTMLImageElement;

        if (!detailImage || !cardImage) return;

        setIsAnimating(true);
        
        const startRect = detailImage.getBoundingClientRect();
        const endRect = cardImage.getBoundingClientRect();

        const clone = detailImage.cloneNode() as HTMLImageElement;
        clone.style.position = 'fixed';
        clone.style.top = `${startRect.top}px`;
        clone.style.left = `${startRect.left}px`;
        clone.style.width = `${startRect.width}px`;
        clone.style.height = `${startRect.height}px`;
        clone.style.zIndex = '9999';
        clone.style.objectFit = 'cover';
        clone.style.margin = '0';
        document.body.appendChild(clone);

        detailImage.style.opacity = '0';
        detailRef.current?.querySelectorAll('.detail-content-animating').forEach(el => {
            (el as HTMLElement).style.opacity = '0';
        });

        requestAnimationFrame(() => {
            clone.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            clone.style.top = `${endRect.top}px`;
            clone.style.left = `${endRect.left}px`;
            clone.style.width = `${endRect.width}px`;
            clone.style.height = `${endRect.height}px`;
        });

        clone.addEventListener('transitionend', () => {
            if (detailRef.current) {
                detailRef.current.style.visibility = 'hidden';
                detailRef.current.style.opacity = '0';
            }
            
            cardImage.style.opacity = '1';
            clone.remove();
            setActiveProject(null);
            setIsAnimating(false);
        }, { once: true });
    };
    
    const handleMoreProjectsClick = (project: typeof projectsData[0]) => {
        if (isAnimating || isChangingProject) return;
        
        setIsChangingProject(true);
        
        if (detailRef.current) {
            detailRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }

        setTimeout(() => {
            setActiveProject(project);
            setIsChangingProject(false);
        }, 300);
    };

    const otherProjects = activeProject ? projectsData.filter(p => p.id !== activeProject.id) : [];

    return (
        <section id="my-work" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white relative">
            <div ref={gridRef} className="my-work-grid">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
                            My work
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {projectsData.map(project => (
                            <div 
                                key={project.id} 
                                data-project-id={project.id}
                                className="group cursor-pointer"
                                onClick={(e) => handleProjectClick(project, e)}
                            >
                                <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200/60 transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:border-gray-300 group-hover:-translate-y-1">
                                    <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover project-card-image transition-opacity duration-300" />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                                        <p className="mt-1 text-base text-gray-500">{project.description}</p>
                                        <div className="mt-4 flex justify-end">
                                            <ArrowRightIcon className="w-6 h-6 text-gray-400 transform transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div 
                ref={detailRef} 
                className="my-work-detail fixed inset-0 z-50 bg-white overflow-y-auto transition-opacity duration-300"
                style={{ visibility: activeProject ? 'visible' : 'hidden', opacity: activeProject ? 1 : 0 }}
            >
                <div className="pt-8 sm:pt-16 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8">
                    {activeProject && (
                        <div 
                            className={`max-w-4xl mx-auto transition-opacity duration-300 ${isChangingProject ? 'opacity-0' : 'opacity-100'}`}
                        >
                            <div className="mb-8 detail-content-animating">
                                <button onClick={handleBackClick} className="font-semibold text-gray-600 hover:text-black transition-colors">
                                    &larr; Back to projects
                                </button>
                            </div>
                            <div className="w-full h-[250px] sm:h-[450px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg hero-image-container">
                                <img src={activeProject.imageUrl} alt={activeProject.title} className="w-full h-full object-cover hero-image" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 detail-content-animating">
                                <div className="md:col-span-2">
                                    <h2 className="text-4xl font-bold text-black">{activeProject.title}</h2>
                                    {activeProject.fullDescription.map((p, i) => (
                                        <p key={i} className="mt-4 text-lg text-gray-600">{p}</p>
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    <div><span className="font-semibold text-gray-500">Client:</span> <span className="text-gray-800">{activeProject.client}</span></div>
                                    <div><span className="font-semibold text-gray-500">Category:</span> <span className="text-gray-800">{activeProject.category}</span></div>
                                    <div><span className="font-semibold text-gray-500">Date:</span> <span className="text-gray-800">{activeProject.date}</span></div>
                                    <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-500 font-semibold hover:underline">Visit Website &rarr;</a>
                                </div>
                            </div>
                            
                            <div className="mt-20 pt-12 border-t border-gray-200 detail-content-animating">
                                <h3 className="text-2xl font-bold text-center text-black">More projects</h3>
                                <div className="mt-8 space-y-8">
                                    {otherProjects.map(project => (
                                         <button 
                                            key={project.id}
                                            onClick={() => handleMoreProjectsClick(project)}
                                            className="w-full text-left bg-gray-50 p-6 rounded-2xl border border-gray-200/80 flex items-center gap-6 hover:bg-gray-100 transition-colors"
                                         >
                                            <img src={project.imageUrl} alt={project.title} className="w-32 h-20 object-cover rounded-lg flex-shrink-0 bg-gray-200" />
                                            <div>
                                                <h4 className="font-bold text-lg text-gray-900">{project.title}</h4>
                                                <p className="text-gray-500">{project.description}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MyWork;
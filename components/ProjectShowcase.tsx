
import React, { useState, useEffect, useRef } from 'react';
import { PlusCircleIcon } from './icons/PlusCircleIcon';

const showcaseProjects = [
  {
    id: 'showcase-1',
    title: 'Project Innovate',
    tagline: 'Redefining digital collaboration.',
    imageUrl: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1974&auto-format=fit=crop',
    heroUrl: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2500&auto-format=fit=crop',
    description: [
      'Project Innovate is a cutting-edge platform designed to streamline team workflows and boost productivity. By integrating real-time communication tools with advanced project management features, it provides a unified workspace for modern teams.',
      'The core challenge was to create an interface that was both powerful and intuitive. Through extensive user research and iterative design, we developed a clean, minimalist UI that allows users to focus on their work without distractions. The platform is built on a scalable architecture to support teams of all sizes.'
    ],
  },
  {
    id: 'showcase-2',
    title: 'Quantum Analytics',
    tagline: 'Data-driven insights for enterprise.',
    imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1974&auto-format=fit=crop',
    heroUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2500&auto-format=fit=crop',
    description: [
      'Quantum Analytics is an enterprise-level business intelligence tool that transforms complex datasets into actionable insights. It offers a suite of powerful visualization tools, predictive modeling capabilities, and customizable dashboards.',
      'We focused on performance and security, ensuring that large-scale data processing is fast and reliable. The platform helps organizations make informed decisions by uncovering hidden patterns and trends in their data.'
    ],
  },
  {
    id: 'showcase-3',
    title: 'ConnectSphere',
    tagline: 'A new era of social networking.',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto-format=fit=crop',
    heroUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2500&auto-format=fit=crop',
    description: [
      'ConnectSphere is a decentralized social media platform that puts users in control of their data. It features end-to-end encrypted messaging, community-governed content moderation, and a focus on authentic connections.',
      'The design philosophy was centered around privacy and user empowerment. By leveraging blockchain technology, we created a transparent and censorship-resistant network where users can freely express themselves.'
    ],
  },
  {
    id: 'showcase-4',
    title: 'StudioFlow',
    tagline: 'Creative workflow management for designers.',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto-format=fit=crop',
    heroUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2500&auto-format=fit=crop',
    description: [
      'StudioFlow is a project management tool built specifically for creative professionals. It combines asset management, version control, and client feedback into a single, elegant interface.',
      'Our goal was to simplify the complex process of creative production. The platform helps designers, artists, and agencies stay organized, collaborate effectively, and deliver high-quality work on time.'
    ],
  },
];

type Project = typeof showcaseProjects[0];

const ProjectShowcase: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);
    const detailRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedProject]);
    
    const handleProjectClick = (project: Project, event: React.MouseEvent<HTMLDivElement>) => {
        if (isAnimating) return;

        const card = event.currentTarget;
        const cardImage = card.querySelector('.project-card-image') as HTMLImageElement;
        if (!cardImage) return;

        setIsAnimating(true);
        const startRect = cardImage.getBoundingClientRect();
        
        const clone = cardImage.cloneNode() as HTMLImageElement;
        clone.style.position = 'fixed';
        clone.style.top = `${startRect.top}px`;
        clone.style.left = `${startRect.left}px`;
        clone.style.width = `${startRect.width}px`;
        clone.style.height = `${startRect.height}px`;
        clone.style.zIndex = '100';
        clone.style.objectFit = 'cover';
        clone.style.margin = '0';
        clone.style.borderRadius = '1.5rem'; // Same as card
        document.body.appendChild(clone);
        
        cardImage.style.opacity = '0';

        setSelectedProject(project);

        setTimeout(() => {
            if (!detailRef.current) return;
            
            const heroContainer = detailRef.current.querySelector('.project-hero-image') as HTMLElement;
            if (!heroContainer) return;

            const endRect = heroContainer.getBoundingClientRect();

            clone.style.transition = 'all 600ms cubic-bezier(0.4, 0, 0.2, 1)';
            clone.style.top = `${endRect.top}px`;
            clone.style.left = `${endRect.left}px`;
            clone.style.width = `${endRect.width}px`;
            clone.style.height = `${endRect.height}px`;
            clone.style.borderRadius = '0';

            clone.addEventListener('transitionend', () => {
                heroContainer.style.opacity = '1';
                detailRef.current?.querySelector('.project-detail-content')?.classList.remove('opacity-0');
                clone.remove();
                setIsAnimating(false);
            }, { once: true });

        }, 50);
    };

    const handleBackClick = () => {
        if (isAnimating || !selectedProject) return;

        const heroImage = detailRef.current?.querySelector('.project-hero-image') as HTMLElement;
        const cardImage = gridRef.current?.querySelector(`[data-project-id="${selectedProject.id}"] .project-card-image`) as HTMLImageElement;

        if (!heroImage || !cardImage) {
          setSelectedProject(null);
          return;
        };

        setIsAnimating(true);
        
        const startRect = heroImage.getBoundingClientRect();
        const endRect = cardImage.getBoundingClientRect();

        const clone = document.createElement('img');
        clone.src = selectedProject.heroUrl;
        clone.style.position = 'fixed';
        clone.style.top = `${startRect.top}px`;
        clone.style.left = `${startRect.left}px`;
        clone.style.width = `${startRect.width}px`;
        clone.style.height = `${startRect.height}px`;
        clone.style.zIndex = '100';
        clone.style.objectFit = 'cover';
        clone.style.margin = '0';
        document.body.appendChild(clone);

        heroImage.style.opacity = '0';
        detailRef.current?.querySelector('.project-detail-content')?.classList.add('opacity-0');

        setTimeout(() => {
            clone.style.transition = 'all 600ms cubic-bezier(0.4, 0, 0.2, 1)';
            clone.style.top = `${endRect.top}px`;
            clone.style.left = `${endRect.left}px`;
            clone.style.width = `${endRect.width}px`;
            clone.style.height = `${endRect.height}px`;
            clone.style.borderRadius = '1.5rem';

            clone.addEventListener('transitionend', () => {
                cardImage.style.opacity = '1';
                clone.remove();
                setSelectedProject(null);
                setIsAnimating(false);
            }, { once: true });
        }, 50);
    };

    const handleMoreProjectClick = (project: Project) => {
        if(isAnimating) return;
        
        setIsAnimating(true);
        const content = detailRef.current?.querySelector('.project-detail-content');
        if (content) {
            content.classList.add('opacity-0');
        }

        setTimeout(() => {
            setSelectedProject(project);
            if(detailRef.current) detailRef.current.scrollTop = 0;
            
            setTimeout(() => {
                if (content) content.classList.remove('opacity-0');
                setIsAnimating(false);
            }, 100);
        }, 300);
    };


    const otherProjects = selectedProject ? showcaseProjects.filter(p => p.id !== selectedProject.id) : [];

    return (
        <section id="project-showcase" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
                        Project Showcase
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                        A curated selection of my work, demonstrating my skills in product management and technology.
                    </p>
                </div>
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {showcaseProjects.map(project => (
                        <div 
                            key={project.id} 
                            data-project-id={project.id} 
                            className="group cursor-pointer relative"
                            onClick={(e) => handleProjectClick(project, e)}
                        >
                            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                                <img src={project.imageUrl} alt={project.title} className="w-full h-72 object-cover project-card-image transition-opacity duration-300 ease-in-out" />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                                    <p className="mt-1 text-base text-gray-500">{project.tagline}</p>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-3xl">
                                <PlusCircleIcon className="w-16 h-16 text-white" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail View Overlay */}
            <div
                ref={detailRef}
                className={`fixed inset-0 z-[60] bg-white overflow-y-auto transition-opacity duration-300 ${selectedProject ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                {selectedProject && (
                    <>
                        <button onClick={handleBackClick} className="fixed top-6 left-6 z-[110] bg-black/30 text-white rounded-full p-2 hover:bg-black/50 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        
                        <div className="relative">
                            <div 
                                className="w-full h-[60vh] bg-cover bg-center project-hero-image transition-opacity duration-300"
                                style={{ backgroundImage: `url(${selectedProject.heroUrl})`, opacity: 0 }}
                            ></div>
                        </div>

                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 project-detail-content opacity-0 transition-opacity duration-500 ease-out delay-200">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-black">{selectedProject.title}</h1>
                            <div className="mt-8 space-y-5 text-lg text-gray-600">
                                {selectedProject.description.map((p, i) => <p key={i}>{p}</p>)}
                            </div>
                            
                            <hr className="my-16 border-gray-200" />

                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-black">More Projects</h2>
                            </div>
                            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                                {otherProjects.map(project => (
                                     <button 
                                        key={project.id}
                                        onClick={() => handleMoreProjectClick(project)}
                                        className="w-full text-left bg-gray-50 p-6 rounded-2xl border border-gray-200/80 flex items-center gap-6 hover:bg-gray-100 transition-colors"
                                     >
                                        <img src={project.imageUrl} alt={project.title} className="w-32 h-20 object-cover rounded-lg flex-shrink-0 bg-gray-200" />
                                        <div>
                                            <h4 className="font-bold text-lg text-gray-900">{project.title}</h4>
                                            <p className="text-gray-500">{project.tagline}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default ProjectShowcase;
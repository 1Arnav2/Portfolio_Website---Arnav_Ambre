
// FIX: Import `useEffect` from `react` to resolve "Cannot find name 'useEffect'" error.
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon } from './icons/CloseIcon';

const projectsData = [
  {
    id: 'project-1',
    title: 'E-commerce Platform',
    description: 'A modern, scalable e-commerce solution with a focus on user experience.',
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800&auto-format=fit=crop',
    tags: ['React', 'Next.js', 'Stripe', 'GraphQL'],
    fullDescription: "This project involved building a high-performance e-commerce platform from the ground up. Key features include a custom product management system, secure payment gateway integration with Stripe, and a personalized recommendation engine. We focused on creating a fast, responsive, and mobile-first shopping experience to maximize conversion rates. The architecture was designed to be highly scalable to handle traffic spikes during peak seasons using Next.js for server-side rendering and static generation.",
  },
  {
    id: 'project-2',
    title: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets in real-time.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto-format=fit=crop',
    tags: ['React', 'D3.js', 'TypeScript', 'Node.js'],
    fullDescription: "This interactive dashboard allows users to explore and understand complex datasets through a variety of charts and graphs. Built with React and D3.js, it offers real-time data updates and a highly customizable interface. The backend, powered by Node.js, efficiently processes and serves large volumes of data. We prioritized performance and user experience, ensuring that even large datasets could be rendered smoothly and intuitively.",
  },
  {
    id: 'project-3',
    title: 'Collaborative Whiteboard App',
    description: 'A real-time collaborative tool for brainstorming and wireframing.',
    imageUrl: 'https://images.unsplash.com/photo-1581093450021-4a7362aa92a1?q=80&w=800&auto-format=fit=crop',
    tags: ['React', 'WebSockets', 'Canvas API', 'Firebase'],
    fullDescription: "This web application provides a shared digital canvas for teams to collaborate in real-time. It features drawing tools, sticky notes, and image uploads, all synchronized across clients using WebSockets. The Canvas API was used for high-performance drawing, and Firebase Firestore was used for state management and persistence. The app is designed to be a simple yet powerful tool for remote teams to brainstorm and visualize ideas together.",
  },
  {
    id: 'project-4',
    title: 'Mobile Fitness Tracker',
    description: 'A cross-platform mobile app to track workouts and monitor progress.',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto-format=fit=crop',
    tags: ['React Native', 'Redux', 'Chart.js', 'SQLite'],
    fullDescription: "A fitness tracking app built with React Native for both iOS and Android. It allows users to log various types of workouts, set goals, and view their progress over time with interactive charts. We used Redux for state management to handle the complex application state, and SQLite for local data storage to ensure offline functionality. The app has a clean and motivating UI to encourage users to stay on track with their fitness journey.",
  },
];

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut",
        },
    }),
};

const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.2,
            duration: 0.5,
            ease: "easeOut",
            staggerChildren: 0.1,
        },
    },
};


const ProjectsSection: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selectedProject = projectsData.find(p => p.id === selectedId);
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            setSelectedId(null);
          }
        };
        window.addEventListener('keydown', handleEsc);
        
        if (selectedId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [selectedId]);

    return (
        <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
                        Projects
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                        Here's a selection of my work. Click on any card to see more details.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projectsData.map((project, i) => (
                        <motion.div
                            key={project.id}
                            layoutId={project.id}
                            onClick={() => setSelectedId(project.id)}
                            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={cardVariants}
                        >
                            <div className="overflow-hidden rounded-xl mb-6">
                                <motion.img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-56 object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-black">{project.title}</h3>
                            <p className="mt-2 text-gray-600">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.tags.map(tag => (
                                    <span key={tag} className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full">{tag}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedId && selectedProject && (
                        <motion.div
                            className="fixed inset-0 bg-white z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                layoutId={selectedId}
                                className="relative bg-white w-full h-full overflow-hidden"
                            >
                                <div className="overflow-y-auto h-full">
                                    <div className="h-96">
                                        <motion.img
                                            src={selectedProject.imageUrl}
                                            alt={selectedProject.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <motion.div
                                        className="max-w-3xl mx-auto p-8"
                                        variants={contentVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                    >
                                        <motion.h2 variants={contentVariants} className="text-4xl font-bold text-black">{selectedProject.title}</motion.h2>
                                        <motion.div variants={contentVariants} className="flex flex-wrap gap-2 mt-4 mb-4">
                                            {selectedProject.tags.map(tag => (
                                                <span key={tag} className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full">{tag}</span>
                                            ))}
                                        </motion.div>
                                        <motion.p variants={contentVariants} className="mt-4 text-lg text-gray-700 leading-relaxed">{selectedProject.fullDescription}</motion.p>
                                    </motion.div>
                                </div>
                            </motion.div>
                             <motion.button
                                className="fixed top-6 right-6 bg-black/30 backdrop-blur-sm rounded-full p-2 hover:bg-black/50 transition-colors z-[51]"
                                onClick={() => setSelectedId(null)}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                aria-label="Close project details"
                            >
                                <CloseIcon className="w-6 h-6 text-white" />
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

export default ProjectsSection;

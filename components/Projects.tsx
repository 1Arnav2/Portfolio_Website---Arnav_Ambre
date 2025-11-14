
import React, { useState, useEffect, useRef } from 'react';
import Modal from '../Modal';

// --- ProjectCard Component ---
interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="block group h-full">
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 transition-all duration-300 ease-in-out hover:shadow-xl hover:border-gray-300 hover:-translate-y-1 h-full">
        <div className="bg-gray-50 overflow-hidden rounded-xl mb-6 border border-gray-200/60">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-48 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105 bg-gray-200" 
          />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="mt-1 text-base text-gray-500">{description}</p>
      </div>
    </div>
  );
};


// --- Projects Section Component ---
const projects = [
  {
    title: 'Finte',
    description: 'Fintech SaaS Dashboard',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto-format&fit=crop',
    details: {
      heading: 'Fintech SaaS Dashboard for Financial Management',
      text: [
        'Finte is a comprehensive SaaS platform designed to empower businesses with real-time financial insights. We developed a highly intuitive dashboard that consolidates data from multiple sources, offering visualizations for cash flow, expense tracking, and revenue forecasting.',
        'The project involved creating a modular component library in React, ensuring scalability and consistency. We focused on a clean UX to reduce cognitive load for users, enabling them to make faster, data-driven decisions. Security was paramount, implementing multi-factor authentication and end-to-end encryption.',
      ],
      stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'D3.js'],
    }
  },
  {
    title: 'Taskgen',
    description: 'Productivity SaaS',
    imageUrl: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto-format&fit=crop',
    details: {
      heading: 'Taskgen: A Productivity Powerhouse',
      text: [
        'Taskgen is a productivity tool that helps teams manage their workflows and collaborate more effectively. The platform features a drag-and-drop interface, real-time updates, and powerful integrations with other services like Slack and Google Calendar.',
        'Our goal was to create a delightful user experience that makes task management feel less like a chore. We implemented features like customizable boards, automated workflows, and detailed analytics to help teams stay organized and productive.'
      ],
      stack: ['Vue.js', 'Firebase', 'Tailwind CSS', 'GraphQL'],
    }
  },
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
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

  return (
    <>
      <section 
        ref={sectionRef} 
        id="projects" 
        className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
      >
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
            Featured Projects
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            A selection of my recent work. Click on a project to learn more.
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <div key={index}>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full h-full text-left focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-white focus:ring-gray-500 rounded-3xl"
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    imageUrl={project.imageUrl}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div>
            <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-64 object-cover rounded-xl mb-6 bg-gray-200" />
            <h2 className="text-3xl font-bold mb-2 text-gray-900">{selectedProject.details.heading}</h2>
            {selectedProject.details.text.map((p, i) => (
              <p key={i} className="text-gray-600 mb-4">{p}</p>
            ))}
            <div className="flex flex-wrap gap-2 mt-6">
              {selectedProject.details.stack.map(tech => (
                <span key={tech} className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full">{tech}</span>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Projects;
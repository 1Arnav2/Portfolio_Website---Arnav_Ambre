
import React from 'react';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { GitHubIcon } from './icons/GitHubIcon';
import { TableauIcon } from './icons/TableauIcon';
import { GmailIcon } from './icons/GmailIcon';

const Hero: React.FC = () => {
  const handleTestimonialsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('feedback');
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-12 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-4">
        
        {/* Profile Picture */}
        <div className="fade-in" style={{ animationDelay: '0s' }}>
            <img 
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&h=128&q=80"
                alt="Arnav Ambre"
                className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
            />
        </div>
        
        {/* Status Badge */}
        <div className="fade-in bg-white border border-gray-200 rounded-full px-4 py-2 text-sm shadow-sm text-gray-800" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            Available for new projects
          </div>
        </div>
        
        {/* Main Heading */}
        <div className="fade-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl md:text-6xl font-semibold text-gray-800">
            Hello! <span className="inline-block animate-wave">👋🏻</span> I'm
          </h1>
          <h2 className="animate-name-bounce text-5xl md:text-8xl font-extrabold text-black mt-2 tracking-tight">
            Arnav Ambre
          </h2>
        </div>

        {/* Subheading */}
        <p className="fade-in max-w-xl text-base md:text-lg text-gray-500" style={{ animationDelay: '0.3s' }}>
          NYU MOT grad student focused on product management, strategy, and innovation for impactful business solutions.
        </p>

        {/* Action Buttons */}
        <div className="fade-in flex flex-col sm:flex-row items-center gap-4 mt-4" style={{ animationDelay: '0.4s' }}>
          <a
            href="https://drive.google.com/drive/u/2/folders/19_XX0rRg5EbE05DlhsoDqK0au4SWQR8S"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white font-medium px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-md transform hover:-translate-y-0.5"
          >
            View My Work
          </a>
          <a
            href="#feedback"
            onClick={handleTestimonialsClick}
            className="bg-white text-black border border-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-md transform hover:-translate-y-0.5"
          >
            Testimonials
          </a>
        </div>
        
        {/* Social Icons */}
        <div className="fade-in flex items-center justify-center gap-6 mt-8" style={{ animationDelay: '0.5s' }}>
            <a href="https://www.linkedin.com/in/arnav-ambre/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-black transition-colors">
                <LinkedInIcon className="w-10 h-10" />
            </a>
            <a href="https://github.com/1Arnav2" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-black transition-colors">
                <GitHubIcon className="w-10 h-10" />
            </a>
            <a href="#" aria-label="Tableau" className="text-gray-400 hover:text-black transition-colors">
                <TableauIcon className="w-10 h-10" />
            </a>
            <a href="mailto:arnav.ambre2003@gmail.com" aria-label="Email" className="text-gray-400 hover:text-black transition-colors">
                <GmailIcon className="w-10 h-10" />
            </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

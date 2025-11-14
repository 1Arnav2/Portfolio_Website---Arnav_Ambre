
import React, { useState, useEffect, useRef } from 'react';

// Using simple divs as placeholders for logos
const FramerLogo = () => <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-500">F</div>;
const WebflowLogo = () => <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-500">W</div>;
const MemberstackLogo = () => <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-500">M</div>;


const workExperience = [
  {
    logo: <FramerLogo />,
    company: 'Framer',
    location: 'Amsterdam',
    role: 'Product Designer',
    years: '2022 - Present',
  },
  {
    logo: <WebflowLogo />,
    company: 'Webflow',
    location: 'San Francisco',
    role: 'UI/UX Designer',
    years: '2020 - 2022',
  },
  {
    logo: <MemberstackLogo />,
    company: 'Memberstack',
    location: 'Remote',
    role: 'Frontend Developer',
    years: '2018 - 2020',
  },
];

const Work: React.FC = () => {
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
    <section 
      ref={sectionRef} 
      id="experience" 
      className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
          Work
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
          A selection of companies I've worked with.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-16">
        <ul className="space-y-6">
          {workExperience.map((job, index) => (
            <li 
              key={index} 
              className={`bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex-shrink-0">
                  {job.logo}
                </div>
                <div className="flex-grow sm:text-left">
                  <h3 className="text-xl font-bold text-gray-900">{job.company}</h3>
                  <p className="text-gray-500">{job.location}</p>
                </div>
                <div className="w-full sm:w-auto mt-4 sm:mt-0 sm:text-right">
                  <p className="text-lg font-semibold text-gray-800">{job.role}</p>
                  <p className="text-gray-500">{job.years}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Work;
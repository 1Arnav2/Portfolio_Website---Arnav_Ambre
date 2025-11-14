
import React, { useRef, useState, useEffect } from 'react';
import { ProductStrategyIcon, UserResearchIcon, PRDsIcon, DataAnalysisIcon, AgileIcon, ABTestingIcon, StakeholderIcon, SystemsThinkingIcon } from './icons/CoreCompetenciesIcons';

const competencies = [
  {
    icon: <ProductStrategyIcon />,
    title: 'Product Strategy',
    description: 'Defining the why, what, and when of the product to drive market success.',
  },
  {
    icon: <UserResearchIcon />,
    title: 'User Research',
    description: 'Understanding user behaviors, needs, and motivations through qualitative and quantitative methods.',
  },
  {
    icon: <PRDsIcon />,
    title: 'PRDs',
    description: 'Crafting clear and concise Product Requirement Documents to align teams.',
  },
  {
    icon: <DataAnalysisIcon />,
    title: 'Data Analysis',
    description: 'Leveraging data to uncover insights, inform decisions, and measure success.',
  },
  {
    icon: <AgileIcon />,
    title: 'Agile Methodologies',
    description: 'Practicing iterative development and collaboration to deliver value faster.',
  },
  {
    icon: <ABTestingIcon />,
    title: 'A/B Testing',
    description: 'Conducting controlled experiments to optimize product features and user experience.',
  },
  {
    icon: <StakeholderIcon />,
    title: 'Stakeholder Management',
    description: 'Effectively communicating and collaborating with all stakeholders to ensure alignment.',
  },
  {
    icon: <SystemsThinkingIcon />,
    title: 'Systems Thinking',
    description: 'Analyzing complex systems to understand interdependencies and find holistic solutions.',
  },
];

const CoreCompetencies: React.FC = () => {
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
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="competencies" 
      className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
            Core Competencies
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            A brief description of my key skills and what I bring to the table.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {competencies.map((item, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-5">
                  {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-base text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreCompetencies;
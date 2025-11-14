
import React, { useState, useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowUpRight } from './icons/ProcessArrows';

const processSteps = [
  {
    step: '01',
    title: 'Book a free discovery call',
    description: 'Choose a time that works for you and we’ll define your goals, ideal outcome, and how I can help make it real.',
  },
  {
    step: '02',
    title: 'Review the first version',
    description: 'You’ll get a working version based on our call, already styled, responsive, and ready for feedback.',
  },
  {
    step: '03',
    title: 'Your website goes live',
    description: 'Your site is ready to go live, fully responsive, fast, and built to leave a great first impression.',
  },
];

const Process: React.FC = () => {
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
      id="process" 
      className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight leading-tight">
            Here’s what working <br className="hidden sm:block" /> together looks like
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-0 right-0">
            <div className="max-w-4xl mx-auto flex justify-between items-center px-20">
              <ArrowDownRight />
              <ArrowUpRight />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl border border-gray-200/80 p-8 shadow-sm transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1`}
              >
                <span className="text-gray-400 font-semibold">{step.step}</span>
                <h3 className="mt-4 text-2xl font-bold text-gray-900">{step.title}</h3>
                <p className="mt-3 text-base text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
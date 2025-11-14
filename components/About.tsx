import React, { useState, useEffect, useRef } from 'react';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { AwardIcon } from './icons/AwardIcon';
import { BookIcon } from './icons/BookIcon';

const stats = [
  {
    icon: <BriefcaseIcon className="h-8 w-8 text-gray-500" />,
    value: '1+',
    label: 'Years Experience',
  },
  {
    icon: <AwardIcon className="h-8 w-8 text-gray-500" />,
    value: '10+',
    label: 'Projects',
  },
  {
    icon: <BookIcon className="h-8 w-8 text-gray-500" />,
    value: 'Management of Technology',
    label: 'NYU',
  },
];

const About: React.FC = () => {
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
      id="about" 
      className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <div className="space-y-6 text-lg text-gray-600">
              <h3 className="text-2xl font-bold text-gray-800">
                Data Scientist & Data Analyst | Passionate about AI & Business Intelligence
              </h3>
              <p>
                I am a Data Science and Analytics professional with hands-on experience in data analysis, predictive modeling, and business intelligence. Currently pursuing an MSIM at the University of Washington, I specialize in data-driven decision-making and uncovering actionable insights from complex data.
              </p>
              <p>
                With a strong foundation in machine learning, NLP, and cloud analytics, I've delivered impactful data solutions that inform strategy and improve performance. My projects span across customer analytics, marketing performance, and operational efficiency—leveraging tools like Python, SQL, Tableau, and cloud platforms.
              </p>
              <p>
                Deeply interested in AI, I continuously explore how emerging technologies can solve real-world problems and fuel business innovation. Let's connect if you're looking for someone who bridges the gap between data science and strategic decision-making.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-5"
              >
                <div className="flex-shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-3xl font-bold text-black">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
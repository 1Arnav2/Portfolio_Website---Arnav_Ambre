
import React, { useState, useEffect, useRef } from 'react';
import { EnvelopeIcon } from './icons/EnvelopeIcon';

const Newsletter: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [envelopesVisible, setEnvelopesVisible] = useState({ left: true, right: true });

  const handleEnvelopeClick = (side: 'left' | 'right') => {
    setEnvelopesVisible(prev => ({ ...prev, [side]: false }));
    setTimeout(() => {
        setEnvelopesVisible(prev => ({ ...prev, [side]: true }));
    }, 2000); // Reappear after 2 seconds
  };

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

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="newsletter" 
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-5xl mx-auto">
        <div 
          className={`bg-white rounded-3xl border border-gray-200/80 shadow-lg overflow-hidden relative p-12 md:p-16 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full" style={{ filter: 'blur(80px)' }}></div>
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full" style={{ filter: 'blur(80px)' }}></div>
          </div>
          
          <button
            onClick={() => handleEnvelopeClick('left')}
            aria-label="Decorative envelope"
            className={`absolute top-1/2 left-4 sm:left-12 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 transition-all duration-500 ease-in-out hover:scale-110 focus:outline-none z-10 animate-float-1 ${envelopesVisible.left ? 'opacity-100' : 'opacity-0 scale-50 -translate-x-full rotate-[-45deg]'}`}
          >
            <EnvelopeIcon className="text-gray-300" />
          </button>
          
          <button
            onClick={() => handleEnvelopeClick('right')}
            aria-label="Decorative envelope"
            className={`absolute top-1/2 right-4 sm:right-12 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 transition-all duration-500 ease-in-out hover:scale-110 focus:outline-none z-10 animate-float-2 ${envelopesVisible.right ? 'opacity-100' : 'opacity-0 scale-50 translate-x-full rotate-[45deg]'}`}
          >
            <EnvelopeIcon className="text-gray-300" />
          </button>
          
          {/* Content */}
          <div className="relative z-10 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight max-w-xl">
              Subscribe To The Newsletter!
            </h2>
            <p className="mt-5 max-w-md text-lg text-gray-600">
              Get expert tips, updates, and smart analytics insights delivered straight to your inbox.
            </p>
            <div className="mt-8">
              <a
                href="#"
                className="inline-block bg-blue-600 text-white font-medium px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-600/30 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              >
                Subscribe Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
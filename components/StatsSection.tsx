import React, { useState, useEffect, useRef } from 'react';
import { WaveCheckIcon } from './icons/WaveCheckIcon';

// Custom hook to animate numbers counting up
const useCountUp = (end: number, duration = 2000, inView: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCount(0); // Reset when not in view
      return;
    }

    let frame = 0;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    
    const counter = setInterval(() => {
      frame++;
      // Ease-out cubic function for a smoother animation
      const progress = 1 - Math.pow(1 - (frame / totalFrames), 3);
      const currentCount = Math.round(end * progress);
      
      setCount(currentCount);

      if (frame === totalFrames) {
        clearInterval(counter);
        setCount(end); // Ensure it ends on the exact number
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [end, duration, inView]);

  return count;
};

const DotGrid: React.FC<{ inView: boolean }> = ({ inView }) => {
    const dots = Array.from({ length: 18 * 4 }); // 18 columns, 4 rows
    return (
        <div className="grid grid-cols-18" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))', gap: '6px' }}>
            {dots.map((_, i) => (
                <div 
                    key={i} 
                    className={`w-1.5 h-1.5 rounded-full bg-blue-400/80 transition-all duration-500 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                    style={{ 
                        transitionDelay: `${(i % 18) * 20 + Math.floor(i / 18) * 50}ms`,
                        background: `radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(96,165,250,0.5) 100%)`
                     }}
                />
            ))}
        </div>
    );
};

const StatsSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);

    const experienceCount = useCountUp(10, 1500, inView);
    const satisfactionCount = useCountUp(95, 2500, inView);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            { threshold: 0.3 } // Trigger when 30% of the element is visible
        );
        
        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <section 
            ref={sectionRef} 
            id="stats" 
            className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white"
        >
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Top Card */}
                <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-200/60 transition-all duration-500 transform hover:scale-[1.02]">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <div className="flex items-start">
                            <span className="text-7xl sm:text-8xl font-extrabold text-black tracking-tighter">
                                {experienceCount}
                            </span>
                            <span className="text-4xl sm:text-5xl font-bold text-blue-500 ml-1 -mt-2 sm:-mt-5">+</span>
                        </div>
                        <div className="ml-0 sm:ml-6 mt-2 sm:mt-0">
                            <p className="text-lg sm:text-xl font-medium text-gray-700 leading-tight">Years of experience</p>
                            <p className="text-lg sm:text-xl font-medium text-gray-500 leading-tight">in design and development</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-12 lg:gap-x-8 lg:gap-y-0">
                    <div className="lg:col-span-3 rounded-3xl shadow-xl overflow-hidden border border-gray-200/60 transition-all duration-500 transform hover:scale-[1.02]">
                        <img 
                            src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto-format=fit-crop"
                            alt="Developer working on a laptop" 
                            className="w-full h-full object-cover aspect-[4/3]"
                        />
                    </div>
                    <div className="relative lg:col-span-2 bg-blue-600 p-8 rounded-3xl shadow-xl flex flex-col justify-between text-white transition-all duration-500 transform hover:scale-[1.02]">
                         <div
                            className="absolute -top-8 left-1/2 -translate-x-1/2 lg:-left-8 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center shadow-xl border-4 border-blue-500 z-10"
                        >
                            <WaveCheckIcon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                           <DotGrid inView={inView} />
                        </div>
                        <div className="text-left mt-8">
                            <p className="text-8xl font-extrabold tracking-tighter">{satisfactionCount}%</p>
                            <p className="mt-2 text-lg font-medium text-blue-100 leading-tight">Client satisfaction rate <br/>built on trust and results.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
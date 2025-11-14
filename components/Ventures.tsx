
import React, { useState, useEffect, useRef } from 'react';
import { FramerItIcon } from './icons/SectionIcons';

const dummyImages = [
    "https://images.unsplash.com/photo-1604964432806-254d07c11f32?q=80&w=2080&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
];

const Ventures: React.FC = () => {
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

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
          if(currentRef) observer.unobserve(currentRef);
        }
    }, []);

    return (
        <section 
            ref={sectionRef} 
            id="ventures" 
            className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
                        Ventures
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                        Projects I'm currently building.
                    </p>
                </div>

                <div className="relative bg-gray-50 p-8 sm:p-12 rounded-3xl border border-gray-200/80 shadow-lg overflow-hidden h-[450px] flex items-end">
                    {/* Background rotating images */}
                    <div className="absolute inset-0 w-full h-full opacity-50 [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]">
                        <div className="absolute inset-0 flex animate-venture-slide">
                            {[0,1].map(set => (
                                <div key={set} className="relative flex-shrink-0 w-full h-full">
                                    {dummyImages.map((src, i) => (
                                        <img key={i} src={src} alt="" className="absolute w-[600px] h-auto rounded-lg shadow-2xl bg-gray-200" style={{
                                            top: `${10 + i * 30}%`,
                                            left: `${10 + i * 20}%`,
                                            transform: `rotate(${-15 + i*10}deg) scale(0.8)`,
                                        }} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md border border-gray-200">
                                <FramerItIcon className="w-8 h-8 text-black"/>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">FramerIt</h3>
                        <p className="mt-1 text-base max-w-sm text-gray-600">
                            A curated collection of elegant & practical Framer Templates designed with care & passion.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Ventures;
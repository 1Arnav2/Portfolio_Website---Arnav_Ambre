
import React, { useState, useEffect, useRef } from 'react';
import Modal from '../Modal';

// --- Placeholder Icons and Images ---
const FinteIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ProoflyIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/></svg>;
const TaskgenIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const userPlaceholderImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

const feedbackData = [
  {
    text: "Arnav has a remarkable ability to transform complex requirements into elegant, user-friendly designs. His attention to detail and creative vision were instrumental in the success of our project.",
    author: 'Emma Thompson',
    role: 'Product Manager, Finte',
    avatar: userPlaceholderImage,
    logo: <FinteIcon />,
    details: {
      heading: "A Vision for User-Centric Design",
      text: "Throughout our collaboration at Finte, Arnav consistently demonstrated a deep understanding of our users' needs. He wasn't just designing screens; he was crafting experiences. His wireframes and prototypes were always meticulously planned, and he was brilliant at iterating based on user feedback. The final product not only met but exceeded our expectations, largely thanks to his dedication and design prowess. He is a true asset to any team.",
    }
  },
  {
    text: "Working with Arnav was a fantastic experience. He is not only a talented designer but also an excellent communicator. He consistently delivered high-quality work on time and was always receptive to feedback.",
    author: 'Sam Wilson',
    role: 'Lead Developer, Taskgen',
    avatar: userPlaceholderImage,
    logo: <TaskgenIcon />,
    details: {
        heading: "Collaborative Spirit, Impeccable Results",
        text: "Arnav is one of the most collaborative designers I've had the pleasure of working with. He bridges the gap between design and development seamlessly, providing clear specifications and assets that make implementation a breeze. His positive attitude and proactive communication style made the entire process enjoyable and efficient.",
      }
  },
  {
    text: "Arnav's expertise in UI/UX is truly impressive. He took our initial concept and elevated it to a level we hadn't imagined. The final product is both beautiful and highly functional.",
    author: 'Alex Rodriguez',
    role: 'CEO, Proofly',
    avatar: userPlaceholderImage,
    logo: <ProoflyIcon />,
    details: {
        heading: "Elevating Concepts to Reality",
        text: "We came to Arnav with a rough idea, and he transformed it into a polished, market-ready product. His strategic approach to UX and his keen eye for visual design were invaluable. He was able to anticipate user needs we hadn't even considered, resulting in a product that is intuitive, engaging, and a delight to use.",
    }
  },
];

const Feedback: React.FC = () => {
  const [selectedFeedback, setSelectedFeedback] = useState<(typeof feedbackData)[0] | null>(null);
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
    <>
      <section 
        ref={sectionRef} 
        id="feedback" 
        className={`py-20 sm:py-28 bg-white transition-all duration-700 ease-out overflow-x-hidden ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
              What My Clients Say
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              Testimonials from people I've worked with.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className={`flex whitespace-nowrap py-4 ${inView ? 'animate-feedback-marquee' : ''}`}>
            {[...feedbackData, ...feedbackData].map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedFeedback(item)}
                className="flex-shrink-0 w-[24rem] mx-4 bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm text-left transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <div className="flex items-center gap-4 mb-6 text-gray-400">
                  <div className="w-8 h-8">{item.logo}</div>
                </div>
                <blockquote className="text-gray-600 whitespace-normal">
                  <p>"{item.text}"</p>
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <img src={item.avatar} alt={item.author} className="w-12 h-12 rounded-full object-cover bg-gray-200" />
                  <div>
                    <p className="font-bold text-gray-900">{item.author}</p>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      <Modal isOpen={!!selectedFeedback} onClose={() => setSelectedFeedback(null)}>
        {selectedFeedback && (
           <div className="text-center p-4">
             <div className="flex justify-center items-center gap-4 mb-6 text-gray-500">
               <div className="w-12 h-12">{selectedFeedback.logo}</div>
             </div>
             <h2 className="text-2xl font-bold mb-4 text-gray-900">{selectedFeedback.details.heading}</h2>
             <p className="text-gray-600 mb-6 text-left">{selectedFeedback.details.text}</p>
             <div className="mt-6 flex items-center gap-4 justify-center">
                <img src={selectedFeedback.avatar} alt={selectedFeedback.author} className="w-14 h-14 rounded-full object-cover bg-gray-200" />
                <div>
                  <p className="font-bold text-gray-900">{selectedFeedback.author}</p>
                  <p className="text-sm text-gray-500">{selectedFeedback.role}</p>
                </div>
              </div>
           </div>
        )}
      </Modal>
    </>
  );
};

export default Feedback;
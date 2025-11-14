import React, { useState, useEffect, useRef } from 'react';

const faqData = [
  {
    question: 'How long does it take to build a website?',
    answer: 'The timeline for building a website depends on its complexity. A simple brochure site might take 2-4 weeks, while a more complex e-commerce or custom web application could take several months. We will provide a detailed timeline after our initial consultation.',
  },
  {
    question: 'Can I update the site myself after it’s done?',
    answer: 'Absolutely! We build most of our websites on user-friendly content management systems (CMS) like WordPress or Webflow, which allow you to easily update text, images, and other content without any coding knowledge.',
  },
  {
    question: 'Do you offer just design, or full development too?',
    answer: 'We offer both. Whether you need a standalone design, full-stack development, or a complete design-to-development package, we can tailor our services to meet your specific needs.',
  },
  {
    question: 'What do you need from me to start?',
    answer: 'To get started, we typically need a clear understanding of your goals, target audience, desired features, and any content (text, images, branding guidelines) you already have. Our initial discovery call will cover all of these details.',
  },
];

const AccordionItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md">
      <button
        className="w-full flex justify-between items-center text-left p-5 sm:p-6"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-medium text-gray-800">{question}</span>
        <span className="flex-shrink-0 ml-4 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-full">
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m-6-6h12" />
          </svg>
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-600">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};


const FAQ: React.FC = () => {
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
      id="faq" 
      className={`py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="lg:sticky top-28">
          <div>
            <div className="inline-flex items-center gap-2 bg-white text-gray-800 rounded-lg px-4 py-2 border border-gray-200/80 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium">Available for new projects</span>
            </div>
          </div>
          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-black tracking-tight">
            Ready for a website that actually works?
          </h2>
          <p className="mt-5 text-lg text-gray-600">
            If your site isn't helping you grow, I'll help you build one that looks sharp, builds trust, and converts better.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="inline-block bg-black text-white font-medium px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-md transform hover:-translate-y-0.5"
            >
              Book your free call
            </a>
          </div>
        </div>
        
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

import React, { useState, useEffect, useRef } from 'react';
import { UserIcon, AtSymbolIcon, SubjectIcon, MessageBodyIcon } from './icons/ContactIcons';

const Contact: React.FC = () => {
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
      id="contact" 
      className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-700 ease-out ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95 translate-y-5'}`}
    >
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
          <div className="p-8 sm:p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
              Contact
            </h2>
            <p className="mt-4 text-base text-gray-500">
              Fill out the form, or reach out directly. I'll respond within 24 hours.
            </p>

            <form action="#" method="POST" className="mt-8 space-y-6">
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="block w-full pl-12 pr-4 py-3.5 bg-gray-100 text-gray-800 border-transparent rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  required
                />
              </div>
              <div className="relative">
                <AtSymbolIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="block w-full pl-12 pr-4 py-3.5 bg-gray-100 text-gray-800 border-transparent rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  required
                />
              </div>
              <div className="relative">
                <SubjectIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Subject"
                  className="block w-full pl-12 pr-4 py-3.5 bg-gray-100 text-gray-800 border-transparent rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  required
                />
              </div>
              <div className="relative">
                <MessageBodyIcon className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  name="message"
                  id="message"
                  placeholder="Message"
                  rows={4}
                  className="block w-full pl-12 pr-4 py-3.5 bg-gray-100 text-gray-800 border-transparent rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 resize-none"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-600/30 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                >
                  Send message
                </button>
              </div>
            </form>

            <div className="mt-12">
              <p className="text-sm text-gray-500">Let's chat!</p>
              <a 
                href="mailto:arnav.ambre2003@gmail.com"
                className="text-2xl font-bold text-black mt-1 block hover:underline"
              >
                arnav.ambre2003@gmail.com
              </a>
            </div>

            <p className="mt-8 text-xs text-gray-400">
              © {new Date().getFullYear()}. All rights Reserved.
            </p>
          </div>
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200/80">
            <div className="flex justify-center items-center gap-2">
              <span className="text-xs text-gray-500">Created by</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-gray-700">Arnav Ambre</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
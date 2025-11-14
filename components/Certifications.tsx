
import React, { useState, useEffect, useRef } from 'react';
import Modal from '../Modal';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';
import { LinkedInSimpleIcon } from './icons/LinkedInSimpleIcon';
import { GoogleIcon } from './icons/GoogleIcon';
import { HarvardIcon } from './icons/HarvardIcon';
import { UCDavisIcon } from './icons/UCDavisIcon';
import { AWSIcon } from './icons/AWSIcon';

const certificatePlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect width="800" height="600" fill="%23f1f5f9"/%3E%3Crect x="100" y="100" width="600" height="400" rx="12" fill="white"/%3E%3Crect x="140" y="140" width="200" height="24" rx="4" fill="%23e2e8f0"/%3E%3Crect x="140" y="180" width="120" height="16" rx="4" fill="%23e2e8f0"/%3E%3Crect x="140" y="240" width="520" height="12" rx="4" fill="%23f1f5f9"/%3E%3Crect x="140" y="265" width="520" height="12" rx="4" fill="%23f1f5f9"/%3E%3Crect x="140" y="290" width="480" height="12" rx="4" fill="%23f1f5f9"/%3E%3Ccircle cx="620" cy="420" r="40" fill="%23fde68a"/%3E%3Cpath d="M620 370 L630 410 L650 415 L630 420 L620 460 L610 420 L590 415 L610 410 Z" fill="%23fcd34d" /%3E%3C/svg%3E';

const certifications = [
  {
    logo: <UCDavisIcon className="w-12 h-12" />,
    title: 'SQL for Data Science',
    issuer: 'UC Davis (Coursera)',
    date: 'July 2025',
    imageUrl: certificatePlaceholder,
    link: 'https://www.coursera.org/account/accomplishments/verify/122C65Q8784B',
    description: 'Mastered SQL for data analysis, learning to write complex queries, manipulate large datasets, and perform advanced data analysis to extract actionable insights. This course covered topics from basic queries to advanced functions like window functions, subqueries, and CTEs for data science applications.',
  },
  {
    logo: <HarvardIcon className="w-12 h-12" />,
    title: 'Business Analytics Certificate',
    issuer: 'Harvard Business School Online',
    date: 'March 2025',
    imageUrl: certificatePlaceholder,
    link: 'https://online.hbs.edu/verify-certificate?dvid=HC5JNQ42',
    description: "Completed a rigorous, hands-on course from Harvard Business School Online that taught me how to use data to make smarter business decisions. I learned to interpret data, apply statistical analysis, and build models that support real-world business strategies. This course sharpened my problem-solving and data-driven thinking skills. I now carry into every project I take on.",
  },
  {
    logo: <GoogleIcon className="w-8 h-8" />,
    title: 'Foundations of Project Management',
    issuer: 'Google (Coursera)',
    date: 'June 2025',
    imageUrl: certificatePlaceholder,
    link: 'https://www.coursera.org/account/accomplishments/verify/UVUWB3CSV15D',
    description: 'Completed the first course of the Google Project Management Specialization, where I learned what project managers do, how they lead teams, communicate with stakeholders, and drive projects forward. Explored Agile and Waterfall methods, Six Sigma basics, and how different org structures impact projects. Also learned how to adapt to change and use tools to stay organized and productive.',
  },
  {
    logo: <AWSIcon className="w-12 h-12" />,
    title: 'AWS Academy Cloud Architecting Graduate',
    issuer: 'Amazon Web Services (AWS)',
    date: 'April 2025',
    imageUrl: certificatePlaceholder,
    link: 'https://www.credly.com/badges/a692f653-79a6-43a7-8bd2-34a253df7a41/print',
    description: 'Completed 60 hours of in-depth training on how to design and build secure, scalable cloud solutions using Amazon Web Services. Gained practical experience with core AWS services like EC2, S3, and VPC, and developed a strong foundation in cloud architecture, security, and high availability. This program helped me bridge technical knowledge with real-world cloud deployment skills.',
  },
];

const CertificationCard: React.FC<{ certification: (typeof certifications)[0], onClick: () => void }> = ({ certification, onClick }) => {
    return (
        <div 
            className="block group h-full cursor-pointer"
            onClick={onClick}
        >
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 transition-all duration-300 ease-in-out hover:shadow-xl hover:border-gray-300 hover:-translate-y-1 h-full flex items-center gap-5">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200/60 p-2">
                    {certification.logo}
                </div>
                <div className="flex-grow">
                    <h3 className="text-base font-bold text-gray-900 leading-tight">{certification.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{certification.issuer}</p>
                    <p className="mt-1 text-xs text-gray-400">{certification.date}</p>
                </div>
            </div>
        </div>
    );
};


const Certifications: React.FC = () => {
    const [selectedCert, setSelectedCert] = useState<(typeof certifications)[0] | null>(null);
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
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    return (
        <>
            <section
                ref={sectionRef}
                id="certifications"
                className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
                            Licenses & Certifications
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                           My commitment to continuous learning and professional development.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certifications.map((cert, index) => (
                           <CertificationCard 
                                key={index}
                                certification={cert}
                                onClick={() => setSelectedCert(cert)}
                           />
                        ))}
                    </div>
                </div>
            </section>
            <Modal isOpen={!!selectedCert} onClose={() => setSelectedCert(null)} size="2xl" padding="p-6">
                {selectedCert && (
                    <div>
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">{selectedCert.title}</h2>
                            <p className="text-md text-gray-600">Issued by {selectedCert.issuer} &bull; {selectedCert.date}</p>
                        </div>

                        {selectedCert.description && (
                            <p className="my-4 text-gray-600">{selectedCert.description}</p>
                        )}
                        
                        <a href={selectedCert.link} target="_blank" rel="noopener noreferrer" className="block group">
                          <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group-hover:border-blue-400 transition-colors duration-300">
                            <img src={selectedCert.imageUrl} alt={`${selectedCert.title} certificate`} className="w-full h-auto object-contain" />
                          </div>
                        </a>
                        <div className="mt-6 text-right">
                          <a
                            href={selectedCert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm"
                          >
                            View Credential <ExternalLinkIcon className="w-4 h-4" />
                          </a>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default Certifications;
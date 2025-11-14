import React from 'react';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b-2 border-gray-200 pb-2 mb-4 mt-2">
        {children}
    </h2>
);

const ResumeEntry: React.FC<{
    title: string;
    subtitle?: string;
    date: string;
    location?: string;
    details: string[];
}> = ({ title, subtitle, date, location, details }) => (
    <div className="mb-4 break-inside-avoid">
        <div className="flex justify-between items-start">
            <div className="pr-4">
                <h3 className="text-base font-bold text-black">{title}</h3>
                {subtitle && <p className="text-base font-medium text-gray-700">{subtitle}</p>}
            </div>
            <div className="text-right flex-shrink-0 ml-4">
                <p className="text-sm font-semibold text-gray-800">{date}</p>
                {location && <p className="text-sm text-gray-500">{location}</p>}
            </div>
        </div>
        <ul className="mt-2 list-disc list-inside space-y-1.5 text-gray-700">
            {details.map((detail, index) => (
                <li key={index} className="text-sm leading-relaxed">{detail}</li>
            ))}
        </ul>
    </div>
);

const SkillCategory: React.FC<{title: string, skills: string}> = ({title, skills}) => (
    <div className="mb-2">
        <p className="text-sm leading-relaxed">
            <strong className="font-semibold text-gray-800">{title}:</strong>{' '}
            <span className="text-gray-700">{skills}</span>
        </p>
    </div>
);


const ResumeContent: React.FC = () => {
    return (
        <div className="font-sans">
            <header className="text-center mb-8 border-b border-gray-200 pb-6">
                <h1 className="text-4xl font-extrabold text-black tracking-tight">Arnav Ambre</h1>
                <p className="mt-2 text-sm text-gray-500 space-x-2">
                    <span>347-203-8280</span>
                    <span>|</span>
                    <a href="mailto:aa14281@nyu.edu" className="text-blue-600 hover:underline">aa14281@nyu.edu</a>
                    <span>|</span>
                    <a href="https://linkedin.com/in/arnav-ambre" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">linkedin.com/in/arnav-ambre</a>
                    <span>|</span>
                    <a href="https://github.com/1Arnav2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/1Arnav2</a>
                </p>
            </header>

            <div className="space-y-8">
                <div>
                    <SectionTitle>Education</SectionTitle>
                    <div className="mb-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-bold text-black">New York University</h3>
                                <p className="text-base text-gray-700">Masters in Management of Technology</p>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4">
                                <p className="text-sm font-semibold text-gray-800">Sept. 2025 – May 2027</p>
                                <p className="text-sm text-gray-500">New York, USA</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-bold text-black">D. Y. Patil University</h3>
                                <p className="text-base text-gray-700">Bachelor of Technology</p>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4">
                                <p className="text-sm font-semibold text-gray-800">Sept. 2021 – May 2025</p>
                                <p className="text-sm text-gray-500">Navi Mumbai, IND</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <SectionTitle>Experience</SectionTitle>
                     <ResumeEntry
                        title="Technical Operations Intern"
                        subtitle="BizKonnect Technologies LLP"
                        date="Jan 2025 – May 2025"
                        location="Navi Mumbai, IND"
                        details={[
                            "Spearheaded the end-to-end migration and validation of organizational data into Onfinity (ERP/CRM), ensuring 98% accuracy and secure integration across multiple departments, reducing manual errors, refining data accessibility.",
                            "Acted as the primary product liaison, streamlining onboarding workflows and resolving system issues, which enhanced user adoption and minimized onboarding time by an estimated 25%.",
                            "Collaborated with cross-functional teams to analyze requirements and optimize workflows, aligning ERP/CRM features with business needs, which improved operational efficiency and boosted team productivity by 16%.",
                        ]}
                    />
                    <ResumeEntry
                        title="Product Analyst Intern"
                        subtitle="RAIT Summer Internship Program"
                        date="Feb 2024 – Apr 2024"
                        location="Navi Mumbai, IND"
                        details={[
                            "Conducted a comparative analysis of multiple OCR approaches for an Automatic Number Plate Recognition (ANPR) system, identifying EasyOCR + OpenCV as the most effective solution for balancing accuracy and processing efficiency.",
                            "Evaluated product performance data and consulted with the development team to refine preprocessing workflows, advancing data quality and elevating detection accuracy from 75% to 90% on test datasets.",
                            "Recommended product-level improvements such as region-of-interest (ROI) based processing and noise reduction, lowering image processing time by 30% and strengthening real-time applicability for traffic monitoring.",
                        ]}
                    />
                </div>

                <div>
                    <SectionTitle>Projects</SectionTitle>
                    <ResumeEntry
                        title="SmartScape – A Smart City Application | Flutter, Firebase, Google APIs"
                        date="July 2024 – Nov 2024"
                        details={[
                            "Architected a cross-platform mobile application in Flutter, building a real-time Firebase Cloud Firestore backend to manage and synchronize 5+ live data sources.",
                            "Integrated 6+ unique third-party REST APIs (e.g., Google Maps, air quality sensors) into a centralized data pipeline, successfully populating a unified dashboard.",
                            "Designed and streamlined an intuitive UI with Flutter, improving usability by translating complex data from 5+ distinct sources into a single, accessible interface.",
                        ]}
                    />
                     <ResumeEntry
                        title="Content Based Movie Recommendation System | Python, Pandas, Scikit-learn, NLTK"
                        date="Jan 2014 – May 2024"
                        details={[
                            "Processed and merged movie metadata from 4,800 records, parsing complex JSON columns to extract key features (e.g., cast, crew, genres).",
                            'Engineered a unified "content tag" for each movie by consolidating 5 distinct text features and implementing an NLP pipeline to create a 5,000-dimension Bag-of-Words (BoW) model.',
                            "Developed the final recommendation engine by calculating Cosine Similarity across the 4,800 × 5,000 vector matrix to return the top 5 most similar movies.",
                        ]}
                    />
                </div>

                <div>
                    <SectionTitle>Leadership Experience & Activities</SectionTitle>
                    <ResumeEntry
                        title="Chairperson"
                        subtitle="Association for Computing Machinery (ACM)"
                        date="July 2024 – July 2025"
                        location="Navi Mumbai, IND"
                        details={[
                            "Chaired a 50+ member council, designing knowledge-sharing frameworks that drove 30+ technical events and earned the Outstanding Chapter Activities Award (top 195+ ACM chapters in India), along with $850 funding to expand initiatives.",
                            "Directed national-level events (KLEOS 3.0 Hackathon, CodeSummit), using data-driven outreach to amplify participation 46% and secure $5,000 sponsorships (5.6x YoY growth), expanding reach and sponsor visibility.",
                        ]}
                    />
                </div>
                
                <div>
                    <SectionTitle>Technical Skills</SectionTitle>
                    <SkillCategory 
                        title="Analytical & Technical Proficiency" 
                        skills="Data Analysis (SQL, Python, Power BI), Excel (Scenario Modelling, Data Visualization), C, JavaScript, HTML/CSS"
                    />
                     <SkillCategory 
                        title="Tools" 
                        skills="Tableau, Figma, Miro, Jira, Git, VS Code"
                    />
                     <SkillCategory 
                        title="Product Management & Problem-Solving" 
                        skills="A/B Testing, Product Road Mapping, Stake Holder Communication, Metrics & Analysis, User Research, System Thinking"
                    />
                     <SkillCategory 
                        title="Certifications" 
                        skills="Project Management (Google), Cloud Architecture (AWS), Business Analytics (Harvard Business School)."
                    />
                </div>
            </div>
        </div>
    );
};

export default ResumeContent;

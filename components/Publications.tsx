
import React, { useState, useEffect, useRef } from 'react';
import Modal from '../Modal';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

// Placeholder logos, replace with actual SVGs or images if available
const DeGruyterLogo = () => (
  <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center border border-gray-200">
    <span className="text-xs font-bold text-gray-500 text-center leading-tight">DE GRUYTER</span>
  </div>
);

const SpringerLogo = () => (
    <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center border border-gray-200">
      <span className="text-xs font-bold text-gray-500">Springer</span>
    </div>
);

const NYULogo = () => (
    <div className="w-full h-full bg-violet-800 rounded-md flex items-center justify-center border border-violet-700 p-2">
      <span className="text-xs font-bold text-white text-center leading-tight">NYU TANDON</span>
    </div>
  );

const publications = [
  {
    logo: <NYULogo />,
    title: 'Impact of Information Sector on US Economy',
    publisher: 'NYU Tandon School of Engineering, 2024',
    description: 'A state-by-state GDP analysis and growth projection of the US information sector.',
    tags: ['Economic Analysis', 'Data Visualization', 'GDP Growth', 'Info Sector', 'Forecasting'],
    link: '#',
    pages: [
        'https://i.imgur.com/U1p3vZu.png',
        'https://i.imgur.com/2Y45TbS.png',
        'https://i.imgur.com/nJ5tvyW.png',
        'https://i.imgur.com/eE5WkCg.png',
    ]
  },
  {
    logo: <DeGruyterLogo />,
    title: 'Decision system for bone disease diagnosis using crisp rule set theory',
    publisher: 'De Gruyter, 2024',
    description: 'This research paper presents a novel approach to bone disease diagnosis using crisp rule set theory, improving diagnostic accuracy and efficiency in clinical settings.',
    tags: ['AI in healthcare', 'Medical image analysis', 'Predictive analytics', 'Deep learning applications', 'Clinical decision support'],
    link: 'https://drive.google.com/drive/u/2/folders/19_XX0rRg5EbE05DlhsoDqK0au4SWQR8S',
  },
  {
    logo: <SpringerLogo />,
    title: 'A comprehensive assessment of artificial intelligence applications for cancer diagnosis',
    publisher: 'Springer, 2024',
    description: 'A systematic review of AI applications in cancer diagnosis, evaluating effectiveness, limitations, and future directions across various cancer types and diagnostic techniques.',
    tags: ['AI in cancer diagnosis', 'Machine learning in oncology', 'Deep learning for medical imaging', 'Neural networks in healthcare', 'Cancer detection technologies'],
    link: 'https://drive.google.com/drive/u/2/folders/19_XX0rRg5EbE05DlhsoDqK0au4SWQR8S',
  },
];

const PublicationCard: React.FC<{ publication: (typeof publications)[0], onClick: () => void }> = ({ publication, onClick }) => {
    return (
        <div 
            className="block group h-full cursor-pointer"
            onClick={onClick}
        >
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 transition-all duration-300 ease-in-out hover:shadow-xl hover:border-gray-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="w-full h-48 bg-gray-50 overflow-hidden rounded-xl mb-6 border border-gray-200/60 flex items-center justify-center p-4">
                    <div className="w-24 h-24">
                        {publication.logo}
                    </div>
                </div>
                <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900">{publication.title}</h3>
                    <p className="mt-1 text-base text-gray-500">{publication.publisher}</p>
                    <p className="mt-2 text-base text-gray-600 line-clamp-3">{publication.description}</p>
                </div>
                 <div className="mt-4">
                    <span
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 group-hover:text-black transition-colors"
                    >
                        View Publication <ExternalLinkIcon className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </div>
    );
};

const Publications: React.FC = () => {
  const [selectedPub, setSelectedPub] = useState<(typeof publications)[0] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const pdfContentRef = useRef<HTMLDivElement>(null);

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
  
  const handleDownloadPdf = async () => {
    if (!selectedPub || !selectedPub.pages || isDownloadingPdf) return;
    setIsDownloadingPdf(true);

    // @ts-ignore
    if (!window.jspdf || !window.html2canvas) {
        console.error("PDF generation libraries not found on window object.");
        alert("Could not download PDF. Please try reloading the page.");
        setIsDownloadingPdf(false);
        return;
    }

    // @ts-ignore
    const { jsPDF } = window.jspdf;
    // @ts-ignore
    const html2canvas = window.html2canvas;

    const elementToCapture = pdfContentRef.current;
    if (!elementToCapture) {
        console.error("PDF content element not found");
        setIsDownloadingPdf(false);
        return;
    }

    try {
        const canvas = await html2canvas(elementToCapture, { 
            scale: 2,
            useCORS: true, // Important for external images
         });

        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = imgProps.width;
        const imgHeight = imgProps.height;

        const ratio = imgWidth / pdfWidth;
        const canvasHeightInPdf = imgHeight / ratio;

        let heightLeft = canvasHeightInPdf;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, canvasHeightInPdf);
        heightLeft -= pdfHeight;
        
        while (heightLeft > 0) {
            position -= pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, canvasHeightInPdf);
            heightLeft -= pdfHeight;
        }
        
        pdf.save(`${selectedPub.title.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("An error occurred while generating the PDF.");
    } finally {
        setIsDownloadingPdf(false);
    }
  };

  return (
    <>
      <section 
        ref={sectionRef} 
        id="publications" 
        className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
              Research Publications
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              My contributions to academic research and scientific literature.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {publications.map((pub, index) => (
               <PublicationCard 
                  key={index}
                  publication={pub}
                  onClick={() => setSelectedPub(pub)}
               />
            ))}
          </div>
        </div>
      </section>
      <Modal isOpen={!!selectedPub} onClose={() => setSelectedPub(null)} size={selectedPub?.pages ? "2xl" : "lg"} padding="p-6">
        {selectedPub && (
          <div>
            {selectedPub.pages ? (
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{selectedPub.title}</h2>
                            <p className="text-sm text-gray-500">{selectedPub.publisher}</p>
                        </div>
                        <button 
                            onClick={handleDownloadPdf}
                            disabled={isDownloadingPdf}
                            className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm flex-shrink-0 disabled:opacity-50 disabled:cursor-wait w-36"
                        >
                            {isDownloadingPdf ? 'Downloading...' : 'Download PDF'}
                            {!isDownloadingPdf && <ExternalLinkIcon className="w-4 h-4" />}
                        </button>
                    </div>
                    <div className="max-h-[75vh] overflow-y-auto pr-2 -mr-2 border-t border-gray-200 pt-4">
                        <div ref={pdfContentRef} className="space-y-4 bg-white">
                            {(selectedPub.pages as string[]).map((pageUrl, index) => (
                                <img key={index} src={pageUrl} alt={`Page ${index + 1}`} className="w-full h-auto rounded-md shadow-md bg-gray-100 border border-gray-200" />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 pt-1 w-16 h-16">
                        {selectedPub.logo}
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-xl font-bold mb-1 text-gray-900">{selectedPub.title}</h2>
                        <p className="text-sm text-gray-500 mb-3">{selectedPub.publisher}</p>
                    </div>
                    </div>
                    <p className="text-gray-600 my-3">{selectedPub.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                    {selectedPub.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full">{tag}</span>
                    ))}
                    </div>
                    <div className="mt-6">
                    <a
                        href={selectedPub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-black text-white font-medium px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-md transform hover:-translate-y-0.5"
                    >
                        Read Publication <ExternalLinkIcon className="w-5 h-5" />
                    </a>
                    </div>
                </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};
export default Publications;
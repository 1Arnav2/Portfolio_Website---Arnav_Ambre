import React, { useState, useEffect, useRef } from 'react';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';
import ResumeContent from './ResumeContent';

const Resume: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);
    const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
    const resumeContentRef = useRef<HTMLDivElement>(null);


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

    const handleDownloadPdf = async () => {
        if (isDownloadingPdf) return;
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

        const elementToCapture = resumeContentRef.current;
        if (!elementToCapture) {
            console.error("Resume content element not found");
            setIsDownloadingPdf(false);
            return;
        }

        try {
            const canvas = await html2canvas(elementToCapture, {
                scale: 2,
                useCORS: true,
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
            let page = 1;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, canvasHeightInPdf);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
                position = -(page * pdfHeight);
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, canvasHeightInPdf);
                heightLeft -= pdfHeight;
                page++;
            }
            
            pdf.save('Arnav_Ambre_Resume.pdf');
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("An error occurred while generating the PDF.");
        } finally {
            setIsDownloadingPdf(false);
        }
    };


    return (
        <section
            ref={sectionRef}
            id="resume"
            className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
                        My Resume
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                        A detailed overview of my professional journey.
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={handleDownloadPdf}
                            disabled={isDownloadingPdf}
                            className="inline-flex items-center justify-center gap-2 bg-black text-white font-medium px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-md transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-wait"
                        >
                            {isDownloadingPdf ? 'Downloading...' : 'Download PDF'}
                            {!isDownloadingPdf && <ExternalLinkIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                
                <div ref={resumeContentRef} className="bg-white p-8 md:p-12 shadow-2xl rounded-lg border border-gray-200/80 max-w-4xl mx-auto">
                    <ResumeContent />
                </div>
            </div>
        </section>
    );
};

export default Resume;
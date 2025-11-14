import React, { useState, useEffect, useRef } from 'react';
import Modal from '../Modal';
import ResumeContent from './ResumeContent';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';


const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [indicatorStyle, setIndicatorStyle] = useState<{left?: number, width?: number, opacity: number}>({ opacity: 0 });
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const navItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const resumeModalContentRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Ensure the refs array is clean
    navItemRefs.current = navItemRefs.current.slice(0, navLinks.length);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );

    const sectionIds = navLinks.map(link => link.href.substring(1));
    sectionIds.forEach(id => {
      const targetElement = document.getElementById(id);
      if (targetElement) {
        observer.observe(targetElement);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeLinkIndex = navLinks.findIndex(link => link.href.substring(1) === activeSection);
    const activeItem = activeLinkIndex > -1 ? navItemRefs.current[activeLinkIndex] : null;
    
    if (activeItem) {
        setIndicatorStyle({
            left: activeItem.offsetLeft,
            width: activeItem.offsetWidth,
            opacity: 1,
        });
    }
  }, [activeSection]);


  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(targetId);
    }
  };

    const handleDownloadPdf = async () => {
    if (isDownloadingPdf) return;
    setIsDownloadingPdf(true);
    
    // The jsPDF and html2canvas libraries are loaded via script tags in index.html,
    // making them available on the window object.
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

    // The element to capture is the direct child of our ref'd container.
    const elementToCapture = resumeModalContentRef.current?.querySelector(':scope > div') as HTMLElement;
    if (!elementToCapture) {
        console.error("Resume content element not found");
        setIsDownloadingPdf(false);
        return;
    }
    
    try {
        const canvas = await html2canvas(elementToCapture, { 
            scale: 2, // Higher scale for better quality
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
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
         <nav className={`flex items-center justify-center px-2 py-2 rounded-2xl border transition-all duration-300 ${scrolled ? 'bg-white/50 border-white/20 shadow-lg backdrop-blur-lg' : 'bg-white/40 border-white/10 shadow-md backdrop-blur-md'}`}>
            <ul className="hidden md:flex items-center space-x-1 relative">
              <li
                className="absolute top-0 h-full bg-gray-200/70 rounded-xl transition-all duration-300 ease-in-out"
                style={indicatorStyle}
              />
              {navLinks.map((link, index) => (
                <li key={link.name} className="relative z-10" ref={el => { navItemRefs.current[index] = el; }}>
                  <a 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`inline-block text-base px-4 py-2 transition-all duration-300 cursor-pointer rounded-xl transform hover:scale-105 ${activeSection === link.href.substring(1) ? 'font-semibold text-gray-900' : 'font-medium text-gray-600'}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="pl-2 relative z-10">
                <button
                  onClick={() => setIsResumeModalOpen(true)}
                  className="inline-block text-base font-medium bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all duration-300 flex items-center gap-2 transform hover:scale-105">
                  Resume
                </button>
              </li>
            </ul>
          </nav>
      </header>
      <Modal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)}
        size="2xl"
        padding="p-6"
      >
        <div>
           <div className="flex justify-between items-center mb-4">
             <h2 className="text-2xl font-bold text-gray-900">My Resume</h2>
            <button
                onClick={handleDownloadPdf}
                disabled={isDownloadingPdf}
                className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-wait w-36"
            >
                {isDownloadingPdf ? 'Downloading...' : 'Download PDF'}
                {!isDownloadingPdf && <ExternalLinkIcon className="w-4 h-4" />}
            </button>
          </div>
          <div ref={resumeModalContentRef} className="max-h-[75vh] overflow-y-auto pr-4 -mr-4 border-t border-gray-200 pt-4">
            <ResumeContent />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
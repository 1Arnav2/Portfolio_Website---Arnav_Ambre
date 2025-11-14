
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Dashboard from './components/Dashboard';
import Work from './components/Work';
import ProjectsSection from './components/ProjectsSection';
import Feedback from './components/Feedback';
import Newsletter from './components/Newsletter';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Publications from './components/Publications';
import Certifications from './components/Certifications';
import Integrations from './components/Integrations';
import Process from './components/Process';
import TechStack from './components/TechStack';
import Ventures from './components/Ventures';
import CoreCompetencies from './components/CoreCompetencies';
import Resume from './components/Resume';
import StatsSection from './components/StatsSection';

const App: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-gray-800 antialiased">
      <Header />
      <main>
        <Hero />
        <About />
        <Dashboard />
        <Work />
        <StatsSection />
        <Integrations />
        <CoreCompetencies />
        <TechStack />
        <Ventures />
        <ProjectsSection />
        <Resume />
        <Publications />
        <Certifications />
        <Process />
        <Feedback />
        <Newsletter />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
import React, { useEffect } from 'react';
import { StudioNavbar } from '../components/studio/StudioNavbar';
import { StudioHero } from '../components/studio/StudioHero';
import { AppShowcaseGrid } from '../components/studio/AppShowcaseGrid';
import { LabProjects } from '../components/studio/LabProjects';
import { StudioTechPillars } from '../components/studio/StudioTechPillars';
import { StudioPhilosophy } from '../components/studio/StudioPhilosophy';
import { StudioFooter } from '../components/studio/StudioFooter';

export const StudioHome: React.FC = () => {
  useEffect(() => {
    document.title = 'AndolaLabs | Software Studio & Digital Instruments';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07080c] text-slate-100 gradient-mesh overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Studio Navigation Bar */}
      <StudioNavbar />

      {/* Main Studio Content Area */}
      <main className="relative z-10 space-y-6 md:space-y-12">
        <StudioHero />
        <AppShowcaseGrid />
        <LabProjects />
        <StudioTechPillars />
        <StudioPhilosophy />
      </main>

      {/* Studio Global Footer */}
      <StudioFooter />

    </div>
  );
};

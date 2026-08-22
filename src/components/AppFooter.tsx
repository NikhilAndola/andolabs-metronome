import React from 'react';
import { ArrowUp, Github, ShieldCheck, FileText, RotateCcw, Mail } from 'lucide-react';
import { METRONOME_APP_INFO } from '../data/metronomeData';
import andolaLabsIcon from '../assets/andolalabs_icon.svg';

export const AppFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy.html', icon: ShieldCheck },
    { name: 'Terms & Conditions', href: '/terms.html', icon: FileText },
    { name: 'Cancellation & Refund Policy', href: '/cancellation-and-refund.html', icon: RotateCcw },
    { name: 'Contact Us', href: '/contact.html', icon: Mail },
  ];

  return (
    <footer className="relative border-t border-slate-800/80 bg-slate-950/95 text-slate-400 text-xs py-10 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Row: Brand, Socials & Back to Top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-slate-900 border border-cyan-500/40 flex items-center justify-center p-1.5 shadow-neon-cyan overflow-hidden shrink-0">
              <img 
                src={andolaLabsIcon} 
                alt="AndolaLabs Brand Icon" 
                className="w-full h-full object-contain drop-shadow-[0_0_6px_rgba(0,242,254,0.5)]" 
              />
            </div>
            <div>
              <div className="font-display font-bold text-white text-base flex items-center justify-center md:justify-start gap-2">
                <span>Andola<span className="gradient-text-cyan">Labs</span> Metronome</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  PRO DSP
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Ultra Low-Latency Audio Metronome & Polyrhythm Visualizer
              </div>
            </div>
          </div>

          {/* Social & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={METRONOME_APP_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-colors group"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* Navigation & Legal Links Row */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mr-2">Legal &amp; Support:</span>
          {legalLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-950/30 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-all shadow-sm"
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Bottom Row: Copyright & DSP Highlights */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} Andola Labs. Built with Web Audio API & React Native.
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-cyan-400/90 font-semibold">Zero Audio Jitter</span>
            <span>•</span>
            <span className="text-purple-400/90 font-semibold">Concentric Polyrhythms</span>
            <span>•</span>
            <span className="text-amber-400/90 font-semibold">Stage Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default AppFooter;

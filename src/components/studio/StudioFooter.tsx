import React from 'react';
import { ArrowUp, Github, ShieldCheck, FileText, RotateCcw, Mail, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { STUDIO_INFO } from '../../data/studioData';
import andolaLabsIcon from '../../assets/andolalabs_icon.svg';

export const StudioFooter: React.FC = () => {
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
    <footer className="relative border-t border-slate-800/80 bg-slate-950/95 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Top Row: Brand & Quick Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-slate-900 border border-cyan-500/40 flex items-center justify-center p-1.5 shadow-neon-cyan overflow-hidden shrink-0">
              <img 
                src={andolaLabsIcon} 
                alt="Andola Labs Icon" 
                className="w-full h-full object-contain drop-shadow-[0_0_6px_rgba(0,242,254,0.5)]" 
              />
            </div>
            <div>
              <div className="font-display font-bold text-white text-base flex items-center justify-center md:justify-start gap-2">
                <span>{STUDIO_INFO.brandName}<span className="gradient-text-cyan"> {STUDIO_INFO.brandSuffix}</span></span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  ANDOLA LABS
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {STUDIO_INFO.tagline}
              </div>
            </div>
          </div>

          {/* Actions & Back to Top */}
          <div className="flex items-center gap-3">
            <Link
              to="/metronome"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-950/70 border border-cyan-800 hover:border-cyan-400 text-cyan-300 font-mono text-xs transition-colors"
            >
              <Music className="w-3.5 h-3.5 text-cyan-400" />
              <span>MetroNome App</span>
            </Link>

            <a
              href={STUDIO_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-colors"
              title="GitHub"
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

        {/* Legal & Policy Navigation Row */}
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

        {/* Bottom Row: Copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} {STUDIO_INFO.name}. Independent Software Engineering. All rights reserved.
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-cyan-400/90 font-semibold">High Performance</span>
            <span>•</span>
            <span className="text-purple-400/90 font-semibold">Deterministic DSP</span>
            <span>•</span>
            <span className="text-amber-400/90 font-semibold">Offline Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

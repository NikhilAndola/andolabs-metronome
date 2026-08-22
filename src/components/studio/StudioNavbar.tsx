import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Sparkles, Menu, X, ArrowRight, Github } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioData';
import andolaLabsIcon from '../../assets/andolalabs_icon.svg';

export const StudioNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Applications', href: '#apps' },
    { label: 'Engineering', href: '#engineering' },
    { label: 'In The Lab', href: '#lab' },
    { label: 'Philosophy', href: '#philosophy' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Live Studio Badge */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-slate-900 border border-cyan-500/40 flex items-center justify-center p-1.5 shadow-neon-cyan group-hover:scale-105 transition-transform overflow-hidden">
            <img 
              src={andolaLabsIcon} 
              alt="AndolaLabs Studio Icon" 
              className="w-full h-full object-contain drop-shadow-[0_0_6px_rgba(0,242,254,0.6)]" 
            />
          </div>
          <div className="flex flex-col">
            <div className="font-display font-bold text-white text-base tracking-tight flex items-center gap-1.5">
              <span>{STUDIO_INFO.brandName}<span className="gradient-text-cyan">{STUDIO_INFO.brandSuffix}</span></span>
              <span className="inline-flex items-center gap-1 text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-800/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                STUDIO ACTIVE
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline-block">
              Digital Instruments &amp; Audio DSP
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="hover:text-cyan-400 transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all group-hover:w-full"></span>
            </a>
          ))}

          <a
            href={STUDIO_INFO.creatorPortfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 font-mono text-[11px] transition-colors pl-2 border-l border-slate-800"
          >
            <span>Portfolio</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </nav>

        {/* Action Button: MetroNome CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={STUDIO_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <Link
            to="/metronome"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-neon-cyan hover:shadow-neon-cyan-lg hover:scale-102 active:scale-98 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
            <span>Launch MetroNome</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            to="/metronome"
            className="p-2 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold"
            title="Launch MetroNome"
          >
            <Sparkles className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950/98 border-b border-slate-800/90 px-6 py-5 mt-3 space-y-4 backdrop-blur-2xl">
          <div className="flex flex-col space-y-3 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-slate-300 hover:text-cyan-400 py-1"
              >
                {link.label}
              </a>
            ))}
            <a
              href={STUDIO_INFO.creatorPortfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 pt-2 border-t border-slate-900"
            >
              <span>Developer Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <Link
            to="/metronome"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-neon-cyan"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Open MetroNome Web Simulator</span>
          </Link>
        </div>
      )}
    </header>
  );
};

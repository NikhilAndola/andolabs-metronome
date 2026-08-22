import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Activity, ChevronDown } from 'lucide-react';
import { STUDIO_METRICS } from '../../data/studioData';

export const StudioHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generative Particle Waveform Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render layered sine audio wave fields
      const lines = [
        { color: 'rgba(0, 242, 254, 0.25)', speed: 0.02, freq: 0.008, amp: 40 },
        { color: 'rgba(59, 130, 246, 0.20)', speed: 0.015, freq: 0.006, amp: 55 },
        { color: 'rgba(168, 85, 247, 0.15)', speed: 0.01, freq: 0.004, amp: 30 },
      ];

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = line.color;

        const centerY = height * 0.65;

        for (let x = 0; x < width; x += 4) {
          const y = centerY + Math.sin(x * line.freq + phase * (line.speed * 60)) * line.amp * Math.sin(x / width * Math.PI);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      phase += 0.02;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToApps = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('apps');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Interactive Generative Canvas */}
      <div className="absolute inset-0 pointer-events-none opacity-60 z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        
        {/* Lab Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-[0_0_20px_rgba(0,242,254,0.15)] animate-fade-in">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span>INDEPENDENT DIGITAL INSTRUMENT LABORATORY</span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.15] max-w-4xl mx-auto">
          Engineering Next-Gen <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,242,254,0.3)]">
            Digital Instruments
          </span> &amp; Audio DSP
        </h1>

        {/* Hero Subtitle */}
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
          AndolaLabs is a creative engineering studio crafting ultra low-latency Web Audio DSP engines, multisensory mobile applications, and high-performance cross-platform platforms.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          
          <Link
            to="/metronome"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-neon-cyan hover:shadow-neon-cyan-lg hover:scale-102 active:scale-98 transition-all group"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Explore MetroNome PRO</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#apps"
            onClick={scrollToApps}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-medium text-sm transition-all"
          >
            <span>Browse Products &amp; Lab R&amp;D</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </a>

        </div>

        {/* Real-time Studio Metrics Bar */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {STUDIO_METRICS.map((metric) => (
            <div 
              key={metric.label}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-center hover:border-cyan-500/40 transition-colors shadow-sm"
            >
              <div className="font-mono text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {metric.value}
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-0.5">
                {metric.label}
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                {metric.desc}
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

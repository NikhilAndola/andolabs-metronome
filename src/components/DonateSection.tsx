import React, { useState } from 'react';
import { 
  Coffee, Copy, Check, QrCode, Smartphone, 
  ShieldCheck, Zap, Heart
} from 'lucide-react';
import { METRONOME_APP_INFO } from '../data/metronomeData';

export const DonateSection: React.FC = () => {
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(150);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(METRONOME_APP_INFO.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const coffeeCups = Math.max(1, Math.round(amount / 150));
  const getCoffeeDescription = (val: number) => {
    if (val <= 150) return '1 Warm Cup of Espresso ☕';
    if (val <= 300) return '2 Large Cappuccinos ☕☕';
    if (val <= 600) return '4 Cups & Late-Night Coding Fuel ☕☕☕☕';
    return 'Supercharged Coffee Feast for the Month! ☕⚡';
  };

  const upiUri = `upi://pay?pa=${encodeURIComponent(METRONOME_APP_INFO.upiId)}&pn=${encodeURIComponent(METRONOME_APP_INFO.creator)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Buy ${coffeeCups} Coffee for AndoLabs Metronome Developer`)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(upiUri)}`;

  return (
    <section id="donate" className="pt-4 pb-10 md:pt-6 md:pb-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center space-y-2 mb-6 md:mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-[11px] font-mono text-amber-400">
          <Coffee className="w-3 h-3 text-amber-400 animate-pulse" />
          <span>Support App Development</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
          Support <span className="gradient-text-amber">Independent Music Tooling</span> ☕
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-xs sm:text-sm">
          If AndoLabs Metronome, the Web Audio DSP simulator, or open-source architecture brought you value, fuel development with a cup of coffee!
        </p>
      </div>

      {/* Main Card Container */}
      <div className="rounded-2xl glass-panel-glow border border-amber-500/30 bg-brand-dark/95 p-4 sm:p-6 relative overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* Left Column: Dynamic UPI QR Code (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center space-y-3">
            
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400">
              <QrCode className="w-3.5 h-3.5" />
              <span>Instant QR Scan & Pay</span>
            </div>

            {/* QR Code Container with Amber Glow Frame */}
            <div className="p-2.5 bg-white rounded-xl shadow-neon-amber border border-amber-400/80 inline-block transition-transform hover:scale-105">
              <img
                src={qrCodeUrl}
                alt={`UPI QR Code to Support Metronome Pro - ₹${amount}`}
                width={160}
                height={160}
                className="w-36 h-36 sm:w-40 sm:h-40 object-contain rounded-lg"
                loading="lazy"
              />
            </div>

            <div className="space-y-0.5">
              <div className="text-xs font-mono text-slate-200 font-bold">
                Amount: <span className="text-amber-400 text-sm">₹{amount} INR</span>
              </div>
              <p className="text-[10px] font-mono text-slate-500">
                GPay • PhonePe • Paytm • BHIM • UPI
              </p>
            </div>

            {/* Direct Mobile UPI Intent Link Button */}
            <a
              href={upiUri}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold font-mono text-xs shadow-neon-amber transition-all flex items-center justify-center gap-1.5 active:scale-98"
            >
              <Smartphone className="w-3.5 h-3.5 text-slate-950" />
              <span>Pay ₹{amount} via Mobile UPI</span>
            </a>

          </div>

          {/* Right Column: Amount Slider & Coffee Details (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Header / Pitch */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-950/50 border border-amber-500/30 text-[11px] font-mono text-amber-300">
                <Heart className="w-3 h-3 fill-current text-amber-400" />
                <span>Fueling Audio Software Engineering</span>
              </div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                Every Contribution Keeps the Audio Engine Running
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Support further research into zero-jitter DSP algorithms, cross-platform audio engines, and open hardware tools.
              </p>
            </div>

            {/* Interactive Amount Slider Box */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 space-y-3">
              
              {/* Header with Selected Amount & Cups Badge */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Contribution Amount
                  </span>
                  <div className="text-xs text-amber-300 font-mono mt-0.5 font-medium">
                    {getCoffeeDescription(amount)}
                  </div>
                </div>
                <div className="flex items-baseline gap-1 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg text-amber-400 font-mono font-bold text-base sm:text-lg">
                  <span>₹{amount}</span>
                  <span className="text-[10px] text-amber-500/80 font-normal">INR</span>
                </div>
              </div>

              {/* Slider Input */}
              <div className="space-y-1.5">
                <input
                  type="range"
                  min="150"
                  max="1000"
                  step="50"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
                />
                
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>₹150</span>
                  <span>₹300</span>
                  <span>₹500</span>
                  <span>₹750</span>
                  <span>₹1,000</span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {[150, 300, 500, 750, 1000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                      amount === val
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-neon-amber'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    ₹{val}
                  </button>
                ))}
              </div>

            </div>

            {/* UPI ID Display & Copy */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                UPI ID / VPA:
              </span>
              <div className="flex items-center justify-between gap-2.5 p-2 rounded-lg bg-slate-900 border border-slate-800">
                <div className="font-mono text-xs font-bold text-amber-400 select-all truncate">
                  {METRONOME_APP_INFO.upiId}
                </div>
                <button
                  onClick={handleCopyUpi}
                  className="px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1 shrink-0 active:scale-95"
                >
                  {copiedUpi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedUpi ? 'Copied' : 'Copy UPI'}</span>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Direct UPI settlement</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Zero gateway deduction</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

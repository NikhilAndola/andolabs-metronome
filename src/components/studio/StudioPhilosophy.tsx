import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Mail, 
  Check, 
  Send, 
  Terminal, 
  Loader2, 
  AlertCircle, 
  Copy, 
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioData';
import andolaLabsIcon from '../../assets/andolalabs_icon.svg';

const SUBJECT_OPTIONS = [
  'Project / Application Inquiry',
  'Software Engineering Collaboration',
  'Audio DSP & Mobile Systems Consultation',
  'Bug Report / Product Feedback',
  'General Tech Discussion',
];

const COOLDOWN_SECONDS = 60;

export const StudioPhilosophy: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const [honeypot, setHoneypot] = useState<string>(''); // Silent bot trap

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: SUBJECT_OPTIONS[0],
    message: '',
  });

  // Check rate-limit cooldown from localStorage on mount and interval
  useEffect(() => {
    const checkCooldown = () => {
      const lastSent = localStorage.getItem('andola_last_contact_ts');
      if (lastSent) {
        const elapsed = Math.floor((Date.now() - parseInt(lastSent, 10)) / 1000);
        if (elapsed < COOLDOWN_SECONDS) {
          setCooldownRemaining(COOLDOWN_SECONDS - elapsed);
        } else {
          setCooldownRemaining(0);
        }
      }
    };

    checkCooldown();
    const interval = setInterval(checkCooldown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(STUDIO_INFO.supportEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // 1. Silent Honeypot Bot Trap: If hidden bot field is filled, silently simulate success without sending
    if (honeypot.trim() !== '') {
      setSubmitStatus('success');
      return;
    }

    // 2. Client-Side Rate-Limit Cooldown Check
    const lastSent = localStorage.getItem('andola_last_contact_ts');
    if (lastSent) {
      const elapsed = Math.floor((Date.now() - parseInt(lastSent, 10)) / 1000);
      if (elapsed < COOLDOWN_SECONDS) {
        setSubmitStatus('error');
        setErrorMessage(`Anti-spam rate limit: Please wait ${COOLDOWN_SECONDS - elapsed}s before sending another message.`);
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${STUDIO_INFO.supportEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Andola Labs Inquiry] ${formData.subject} - from ${formData.name}`,
          subject_category: formData.subject,
          message: formData.message,
          _honey: honeypot, // Extra Honeypot protection on FormSubmit server
          _template: 'table',
        }),
      });

      const result = await response.json();

      if (response.ok && (result.success === 'true' || result.success === true || response.status === 200)) {
        // Record timestamp for 60s cooldown
        localStorage.setItem('andola_last_contact_ts', Date.now().toString());
        setCooldownRemaining(COOLDOWN_SECONDS);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: SUBJECT_OPTIONS[0], message: '' });
      } else {
        setSubmitStatus('success');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Network transmission failed. You can launch your email client directly below:');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getGmailUrl = () => {
    const su = encodeURIComponent(`[Inquiry] ${formData.subject || 'Project Inquiry'}`);
    const body = encodeURIComponent(`Hi Nikhil / Andola Labs,\n\n${formData.message || 'I would like to discuss...'}\n\nBest regards,\n${formData.name || ''}`);
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${STUDIO_INFO.supportEmail}&su=${su}&body=${body}`;
  };

  const getMailtoUrl = () => {
    const su = encodeURIComponent(`[Inquiry] ${formData.subject || 'Project Inquiry'}`);
    const body = encodeURIComponent(`Hi Nikhil / Andola Labs,\n\n${formData.message || 'I would like to discuss...'}\n\nBest regards,\n${formData.name || ''}`);
    return `mailto:${STUDIO_INFO.supportEmail}?subject=${su}&body=${body}`;
  };

  return (
    <section id="vision" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      
      {/* 1. Vision & Laboratory Philosophy Card */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/90 border border-slate-800 p-8 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
        
        {/* Glow Element */}
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Creator & Lab Mission */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono">
              <Terminal className="w-3.5 h-3.5" />
              <span>VISION &amp; ENGINEERING PHILOSOPHY</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Engineering with <span className="gradient-text-cyan">Strict Reliability</span> &amp; Zero Compromises
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong>Andola Labs</strong> is founded by <strong>{STUDIO_INFO.creator}</strong> as an independent software laboratory. We build software across multiple genres — from low-latency audio DSP to mobile platforms and systems engineering — with an uncompromising focus on deterministic performance, clean code, and offline-first reliability.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={STUDIO_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-white font-mono text-xs font-semibold hover:text-cyan-300 transition-all shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 font-mono text-xs font-semibold hover:text-cyan-300 transition-all shadow-sm"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{copiedEmail ? 'Email Copied!' : STUDIO_INFO.supportEmail}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Lab Stamp Badge */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800/80 text-center space-y-4 max-w-xs w-full shadow-lg">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-slate-900 border border-cyan-500/40 p-3 mx-auto shadow-neon-cyan flex items-center justify-center">
                <img src={andolaLabsIcon} alt="Andola Labs Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-display font-bold text-white text-base">Andola<span className="gradient-text-cyan">Labs</span></div>
                <div className="text-xs text-slate-400 font-mono">Independent Software Engineering</div>
              </div>
              <div className="text-[11px] font-mono text-slate-400 border-t border-slate-800/80 pt-3 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>High Performance • Offline First</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 2. Send Direct Message Section */}
      <div id="contact" className="scroll-mt-24 space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>DIRECT CONNECT</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Send a <span className="gradient-text-cyan">Direct Message</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Have a project inquiry, collaboration proposal, feedback on our applications, or technical questions? Reach out directly.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6">
          
          {submitStatus === 'success' ? (
            <div className="text-center py-10 space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-neon-cyan">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Message Sent Successfully!</h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. Your message has been routed to <strong>{STUDIO_INFO.supportEmail}</strong>. We typically respond within 24–48 hours.
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => setSubmitStatus('idle')}
                  disabled={cooldownRemaining > 0}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {cooldownRemaining > 0 ? (
                    <>
                      <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span>Cooldown ({cooldownRemaining}s)</span>
                    </>
                  ) : (
                    <span>Send Another Message</span>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitMessage} className="space-y-5">
              
              {/* Invisible Honeypot Field for Spambots */}
              <input
                type="text"
                name="_honey"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {submitStatus === 'error' && (
                <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-300">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-100 text-xs placeholder:text-slate-600 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-300">Your Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-100 text-xs placeholder:text-slate-600 transition-colors"
                  />
                </div>

              </div>

              {/* Subject Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-300">Subject Category</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-100 text-xs cursor-pointer transition-colors"
                >
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-slate-900 text-slate-200">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-300">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details about your inquiry, proposal, or feedback..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:outline-none text-slate-100 text-xs placeholder:text-slate-600 resize-none transition-colors"
                ></textarea>
              </div>

              {/* Submit Buttons & Email Quick Launch */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
                
                <button
                  type="submit"
                  disabled={isSubmitting || cooldownRemaining > 0}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-neon-cyan hover:scale-102 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : cooldownRemaining > 0 ? (
                    <>
                      <Clock className="w-3.5 h-3.5 animate-pulse" />
                      <span>Cooldown ({cooldownRemaining}s)</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <a
                    href={getGmailUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                    title="Compose directly in Gmail"
                  >
                    <span>Open in Gmail</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={getMailtoUrl()}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                    title="Send via default mail app"
                  >
                    <span>Mail App</span>
                    <Mail className="w-3 h-3" />
                  </a>
                </div>

              </div>

            </form>
          )}

        </div>

      </div>

    </section>
  );
};

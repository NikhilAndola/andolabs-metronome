import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Sparkles } from 'lucide-react';
import andolaLabsIcon from '../assets/andolalabs_icon.svg';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 flex flex-col items-center justify-center p-6 text-center gradient-mesh">
      <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-6">
        
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 p-3 mx-auto shadow-neon-cyan flex items-center justify-center">
          <img src={andolaLabsIcon} alt="AndolaLabs" className="w-full h-full object-contain" />
        </div>

        <div className="space-y-2">
          <div className="text-4xl font-extrabold font-mono text-cyan-400">404</div>
          <h1 className="text-xl font-bold text-white font-display">Page Not Found</h1>
          <p className="text-xs text-slate-400">
            The page or route you requested does not exist or has moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-neon-cyan hover:scale-102 transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Studio Home</span>
          </Link>

          <Link
            to="/metronome"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-850 border border-slate-700 text-slate-200 hover:text-cyan-300 text-xs font-medium transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>MetroNome App</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;

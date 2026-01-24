
import React from 'react';
import { Monitor, Smartphone, MoreVertical, PlusSquare, Download, X, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Logo from './Logo';

interface InstallationGuideProps {
  onClose: () => void;
}

const InstallationGuide: React.FC<InstallationGuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-8 animate-in fade-in duration-500">
      <div className="w-full max-w-2xl bg-slate-900/40 border border-emerald-500/30 rounded-[4rem] p-12 shadow-[0_0_100px_rgba(16,185,129,0.15)] relative overflow-hidden flex flex-col items-center text-center space-y-10">
        
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]"></div>

        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
          <Logo size={80} className="relative z-10" />
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Physical Tethering</h2>
          <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-md mx-auto">
            Pin the NEOXZ Sovereign Core to your device for low-latency command access and a borderless windowed experience.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-4 group hover:border-emerald-500/30 transition-all">
             <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500 text-black">
                   <Monitor className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Edge Desktop</span>
             </div>
             <div className="space-y-3 pl-2 border-l border-slate-800">
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   <p className="text-[11px] text-slate-400 font-medium">Click the <span className="text-white font-bold inline-flex items-center gap-1 bg-slate-800 px-1.5 py-0.5 rounded ml-1 mr-1"><Download className="w-3 h-3"/> App Available</span> icon in the address bar.</p>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   <p className="text-[11px] text-slate-400 font-medium">Or select <span className="text-white font-bold ml-1 mr-1">... > Apps > Install this site</span>.</p>
                </div>
             </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-4 group hover:border-emerald-500/30 transition-all">
             <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-indigo-500 text-black">
                   <Smartphone className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Mobile Sync</span>
             </div>
             <div className="space-y-3 pl-2 border-l border-slate-800">
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                   <p className="text-[11px] text-slate-400 font-medium">Tap <span className="text-white font-bold ml-1 mr-1">Share</span> or <span className="text-white font-bold ml-1 mr-1">...</span> in your browser.</p>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                   <p className="text-[11px] text-slate-400 font-medium">Select <span className="text-white font-bold ml-1 mr-1">Add to Home Screen</span>.</p>
                </div>
             </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-6">
           <div className="flex items-center justify-center gap-8 text-slate-600">
              <div className="flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4" />
                 <span className="text-[8px] font-black uppercase tracking-widest">SDS PWA SIGNED</span>
              </div>
              <div className="flex items-center gap-2">
                 <Zap className="w-4 h-4" />
                 <span className="text-[8px] font-black uppercase tracking-widest">ZERO-LATENCY ICON</span>
              </div>
           </div>
           
           <button 
             onClick={onClose}
             className="w-full py-6 rounded-3xl bg-white text-black font-black uppercase tracking-[0.4em] hover:bg-emerald-400 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4"
           >
             CONFIRM TETHER
             <ArrowRight className="w-5 h-5" />
           </button>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 rounded-full bg-slate-900/50 border border-slate-800 text-slate-500 hover:text-white transition-all"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default InstallationGuide;

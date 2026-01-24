
import React from 'react';
import { ShieldCheck, Landmark, Globe, Rocket, Zap, ArrowLeft, Fingerprint, Activity, Box, Lock, Scale, Sparkles } from 'lucide-react';
import { SystemStatus } from '../types';
import Logo from './Logo';

interface ManifestViewerProps {
  status: SystemStatus;
  manifest: { url: string; hash: string; scope: string; timestamp: string };
  onClose: () => void;
}

const ManifestViewer: React.FC<ManifestViewerProps> = ({ status, manifest, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-[#020202] text-slate-100 overflow-y-auto selection:bg-emerald-500/30 font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,_rgba(16,185,129,0.1)_0%,_transparent_50%)] pointer-events-none"></div>
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 h-24 border-b border-slate-900 bg-black/80 backdrop-blur-xl px-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo size={40} />
          <div className="h-8 w-[1px] bg-slate-800"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Public Mandate</span>
            <span className="text-sm font-black mono text-white">NEOXZ.SH/MANIFEST</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-2xl active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          RETURN TO CORE
        </button>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-12 py-24 space-y-32">
        {/* Hero Section */}
        <section className="text-center space-y-12">
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Cryptographically Signed reality</span>
          </div>
          
          <h1 className="text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white">
            THE SOVEREIGN <br />
            <span className="text-emerald-500">MANDATE</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-slate-400 font-medium leading-relaxed">
            NEOXZ represents the evolution of financial and infrastructural sovereignty. 
            This manifest is a live anchor of systemic capital, verified by the Truth Filter.
          </p>

          <div className="flex flex-col items-center gap-4 pt-8">
             <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
               <span className="uppercase tracking-widest">SDS HASH:</span>
               <span className="text-emerald-500/80">{manifest.hash}</span>
             </div>
             <div className="h-1 w-32 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 animate-pulse w-full"></div>
             </div>
          </div>
        </section>

        {/* Systemic Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { label: 'Systemic Capital', value: `$${status.neoxzBankCapital.toLocaleString()}`, icon: Landmark, color: 'text-emerald-400' },
            { label: 'Institutional ID', value: status.institutionalId, icon: Fingerprint, color: 'text-amber-400' },
            { label: 'Reality Parity', value: '1.000000', icon: Scale, color: 'text-cyan-400' }
          ].map((item, i) => (
            <div key={i} className="p-12 rounded-[3.5rem] bg-slate-900/30 border border-slate-800 flex flex-col items-center text-center space-y-6 hover:border-emerald-500/20 transition-all group">
              <div className={`p-6 rounded-3xl bg-black/60 border border-slate-800 ${item.color} group-hover:scale-110 transition-transform`}>
                <item.icon className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{item.label}</span>
                <p className="text-3xl font-black text-white mono tracking-tighter">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div className="p-16 rounded-[4rem] bg-emerald-500 text-black space-y-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                 <Rocket className="w-48 h-48 text-black" />
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter leading-none relative z-10">Automated <br />Deployment</h3>
              <p className="text-lg font-bold opacity-80 leading-relaxed relative z-10">
                The NEOXZ mandate is propagated via a federated mesh of 4,117 nodes. 
                Efficiency is absolute. Delay is incinerated.
              </p>
              <div className="pt-8 relative z-10">
                 <div className="px-8 py-4 rounded-2xl bg-black text-white inline-flex items-center gap-4 font-black uppercase tracking-widest text-xs">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    Live Broadcast active
                 </div>
              </div>
           </div>

           <div className="p-16 rounded-[4rem] bg-slate-900 border border-slate-800 space-y-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                 <Lock className="w-48 h-48 text-white" />
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter leading-none text-white">Truth Filter <br />Integrity</h3>
              <p className="text-lg font-medium text-slate-400 leading-relaxed">
                Every byte of data in this manifestation has passed the Truth Filter: Absolute protocol. 
                Identity parity is locked at the core level.
              </p>
              <div className="pt-8">
                 <div className="px-8 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 inline-flex items-center gap-4 font-black uppercase tracking-widest text-xs">
                    <Zap className="w-4 h-4" />
                    Verified by Manus AI
                 </div>
              </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="pt-32 pb-12 border-t border-slate-900 flex flex-col items-center gap-8 text-center">
           <Logo size={64} className="opacity-50 grayscale hover:grayscale-0 transition-all" />
           <div className="space-y-2">
             <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">Institutional Registration: 9850-NEO-XZ-PH-001</p>
             <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">© 2025 NEOXZ SYSTEMS. ALL REALITIES RESERVED.</p>
           </div>
        </footer>
      </main>
    </div>
  );
};

export default ManifestViewer;

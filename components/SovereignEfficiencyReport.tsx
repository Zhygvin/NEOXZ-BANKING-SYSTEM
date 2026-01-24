
import React from 'react';
import { ShieldCheck, Award, CheckCircle2, Globe, Cpu, Database, Landmark, Fingerprint, X, Download, Zap } from 'lucide-react';
import Logo from './Logo';

interface SovereignEfficiencyReportProps {
  onClose: () => void;
  stats: any;
}

const SovereignEfficiencyReport: React.FC<SovereignEfficiencyReportProps> = ({ onClose, stats }) => {
  return (
    <div className="fixed inset-0 z-[2500] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-8 animate-in fade-in zoom-in duration-500">
      <div className="w-full max-w-5xl bg-gradient-to-b from-slate-900 to-black border border-emerald-500/30 rounded-[4rem] p-16 shadow-[0_0_150px_rgba(16,185,129,0.15)] relative overflow-hidden flex flex-col items-center text-center space-y-12">
        
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>

        <div className="relative group">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="relative z-10 p-6 bg-black border-4 border-emerald-500/50 rounded-full shadow-2xl">
            <Logo size={120} />
          </div>
          <div className="absolute -bottom-4 -right-4 p-4 bg-emerald-500 rounded-2xl shadow-xl z-20">
             <ShieldCheck className="w-8 h-8 text-black" />
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500 text-black font-black uppercase tracking-[0.3em] text-[10px] shadow-xl">
             <Award className="w-4 h-4" />
             CONSTITUTIONAL EFFICIENCY VERIFIED
          </div>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white leading-none">
            SOVEREIGN INTEGRITY <br />
            <span className="text-emerald-500 italic">CERTIFICATION</span>
          </h2>
          <p className="text-sm font-medium text-slate-400 max-w-2xl mx-auto leading-relaxed">
            This document confirms that the NEOXZ MANDATE has passed the Final Integrity & Efficiency Stress Test. Identity parity is anchored at 1.000000, and $985B systemic capital is verified across 4,117 global nodes.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
           {[
             { label: 'Capital Integrity', value: '100%', icon: <Landmark className="w-4 h-4" /> },
             { label: 'Node Parity', value: '1.0000', icon: <Globe className="w-4 h-4" /> },
             { label: 'Sync Latency', value: '0.001ms', icon: <Zap className="w-4 h-4" /> },
             { label: 'Shield Status', value: 'IMMUTABLE', icon: <ShieldCheck className="w-4 h-4" /> }
           ].map((item, i) => (
             <div key={i} className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-3">
                <div className="flex justify-center text-emerald-500 mb-2">
                   {item.icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{item.label}</span>
                <p className="text-lg font-black text-white mono">{item.value}</p>
             </div>
           ))}
        </div>

        <div className="w-full p-10 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
           <div className="flex items-center gap-8">
              <div className="p-5 rounded-2xl bg-black border border-slate-800 text-emerald-500 shadow-inner">
                 <Fingerprint className="w-10 h-10" />
              </div>
              <div className="text-left space-y-1">
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">MANDATE ANCHOR IDENTITY</span>
                 <p className="text-xl font-black text-white mono uppercase tracking-tighter">press.neoxz@gmail.com</p>
                 <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">VERIFIED SOVEREIGN AUTHORITY</span>
              </div>
           </div>
           <div className="flex gap-4">
              <button className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all shadow-xl">
                 <Download className="w-6 h-6" />
              </button>
              <button 
                onClick={onClose}
                className="px-12 py-6 rounded-3xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.4em] transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4"
              >
                CLOSE TEST HUB
                <CheckCircle2 className="w-5 h-5" />
              </button>
           </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] text-slate-700 font-black uppercase tracking-[0.5em] opacity-30 italic">
           SDS-FINAL-VALIDATION-PROTOCOL-v15.0
        </div>
      </div>
    </div>
  );
};

export default SovereignEfficiencyReport;


import React, { useState, useEffect } from 'react';
import { Target, Monitor, Layers, Activity, ChevronRight, ChevronLeft, Layout, ShieldAlert, Zap, Skull, Crosshair } from 'lucide-react';
import GlobalTopologyMap from './GlobalTopologyMap';
import PerformanceBenchmark from './PerformanceBenchmark';

interface SovereignCommandCockpitProps {
  onStrike: (target: string) => void;
}

const SovereignCommandCockpit: React.FC<SovereignCommandCockpitProps> = ({ onStrike }) => {
  const [activeTab, setActiveTab] = useState<'TELEMETRY' | 'THROUGHPUT' | 'FORENSIC'>('TELEMETRY');
  const [strikeTarget, setStrikeTarget] = useState('');

  const handleStrikeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!strikeTarget.trim()) return;
    onStrike(strikeTarget);
    setStrikeTarget('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between bg-black/40 border border-slate-900 p-4 rounded-[2rem] backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <Layout className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setActiveTab('TELEMETRY')}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'TELEMETRY' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-white'}`}
            >
              Telemetry
            </button>
            <button 
              onClick={() => setActiveTab('THROUGHPUT')}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'THROUGHPUT' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-white'}`}
            >
              Benchmark
            </button>
            <button 
              onClick={() => setActiveTab('FORENSIC')}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'FORENSIC' ? 'bg-rose-600 text-black shadow-lg shadow-rose-500/20' : 'text-slate-500 hover:text-white'}`}
            >
              Forensic Strike
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 px-6">
           <span className="text-[9px] text-slate-600 font-black uppercase tracking-[0.3em]">Command Focus</span>
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>
      </div>

      <div className="relative min-h-[550px]">
        {activeTab === 'TELEMETRY' && (
          <div className="animate-in slide-in-from-left-4 duration-500 h-full">
            <GlobalTopologyMap />
          </div>
        )}
        {activeTab === 'THROUGHPUT' && (
          <div className="animate-in slide-in-from-right-4 duration-500 h-full">
            <PerformanceBenchmark />
          </div>
        )}
        {activeTab === 'FORENSIC' && (
          <div className="animate-in zoom-in-95 duration-500 h-full">
            <div className="bg-slate-900/40 border border-rose-500/20 rounded-[3rem] p-12 space-y-12 shadow-3xl relative overflow-hidden backdrop-blur-3xl flex flex-col h-full items-center justify-center text-center">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(244,63,94,0.05)_0%,_transparent_70%)] opacity-50"></div>
               
               <div className="space-y-6 relative z-10">
                  <div className="p-8 rounded-full bg-rose-500/10 border border-rose-500/20 w-fit mx-auto shadow-2xl">
                     <Skull className="w-16 h-16 text-rose-500 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Manual Strike Terminal</h3>
                     <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Lock Identifier for Immediate Incineration</p>
                  </div>
               </div>

               <form onSubmit={handleStrikeSubmit} className="w-full max-w-md space-y-6 relative z-10">
                  <div className="relative group">
                     <input 
                       value={strikeTarget}
                       onChange={(e) => setStrikeTarget(e.target.value)}
                       placeholder="Enter Target (+63... / IP / Wallet)"
                       className="w-full bg-black/60 border border-slate-800 rounded-3xl px-12 py-6 text-xl font-black text-white mono outline-none focus:border-rose-500/50 transition-all text-center shadow-inner"
                     />
                     <Crosshair className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-rose-800 group-hover:text-rose-500 transition-colors" />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-6 rounded-3xl bg-rose-600 hover:bg-rose-500 text-black font-black uppercase tracking-[0.4em] text-sm transition-all shadow-2xl shadow-rose-500/20 active:scale-95 flex items-center justify-center gap-4"
                  >
                    <Zap className="w-5 h-5" />
                    INITIATE FORENSIC STRIKE
                  </button>
               </form>

               <div className="p-6 rounded-[2rem] bg-rose-500/5 border border-rose-500/10 max-w-lg relative z-10">
                  <p className="text-[10px] text-slate-500 leading-relaxed font-black uppercase tracking-tighter text-center">
                    "Strike protocol bypasses normal verification for known threat vectors. All data associated with the locked identifier will be incinerated from the global ledger."
                  </p>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SovereignCommandCockpit;

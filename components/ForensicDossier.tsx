
import React, { useState, useEffect } from 'react';
import { Skull, Target, Zap, ShieldAlert, Crosshair, Search, Trash2, ShieldCheck, Activity, MapPin, Network, Cpu, Lock, Unlock, Phone, Globe } from 'lucide-react';
import { ForensicTarget } from '../types';

interface ForensicDossierProps {
  target: ForensicTarget;
  onNeutralized: (id: string) => void;
}

const ForensicDossier: React.FC<ForensicDossierProps> = ({ target, onNeutralized }) => {
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState<string[]>(['[Q-TEAM] Initializing Deep Forensic Trace...']);
  const [isGlitching, setIsGlitching] = useState(false);

  const steps = [
    { label: "Signal Triangulation", icon: <Phone className="w-5 h-5" /> },
    { label: "Metadata Isolation", icon: <Network className="w-5 h-5" /> },
    { label: "Digital Footprint Purge", icon: <Trash2 className="w-5 h-5" /> },
    { label: "Systemic Neutralization", icon: <ShieldCheck className="w-5 h-5" /> }
  ];

  useEffect(() => {
    const sequence = async () => {
      // Step 1: Triangulation
      await new Promise(r => setTimeout(r, 1000));
      setLogs(prev => [...prev, `[TRACE] Homing signal for ${target.identifier}...`, `[GPS] Estimated Lat/Long: 14.5995, 120.9842`]);
      setActiveStep(1);
      setProgress(25);

      // Step 2: Isolation
      await new Promise(r => setTimeout(r, 1500));
      setLogs(prev => [...prev, `[LOCK] Associated IP: 103.21.244.10 isolated.`, `[DB] Accessing cellular metadata...`, `[DB] Identity identified as: CRITICAL_VECTOR_01`]);
      setActiveStep(2);
      setProgress(50);

      // Step 3: Purge
      await new Promise(r => setTimeout(r, 2000));
      setIsGlitching(true);
      setLogs(prev => [...prev, `[PURGE] Scrubbing identifier from global nodes...`, `[FIRE] Incinerating digital presence.`, `[FIRE] Severing Maya/Wise/SWIFT linkages.`]);
      setActiveStep(3);
      setProgress(85);
      setTimeout(() => setIsGlitching(false), 800);

      // Step 4: Complete
      await new Promise(r => setTimeout(r, 1500));
      setLogs(prev => [...prev, `[SUCCESS] ${target.identifier} permanently severed from systemic rails.`, `[MANDATE] Target record incinerated.`]);
      setProgress(100);
      setTimeout(() => onNeutralized(target.id), 1500);
    };

    sequence();
  }, []);

  return (
    <div className={`fixed inset-0 z-[3500] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-700 font-sans ${isGlitching ? 'reality-glitch' : ''}`}>
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(244,63,94,0.15)_0%,_transparent_70%)]"></div>
        <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-rose-500/10 animate-pulse" />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-center">
        <div className="lg:col-span-7 space-y-12">
          <header className="space-y-6">
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-rose-600 text-black font-black uppercase tracking-[0.5em] text-[10px] shadow-[0_0_50px_rgba(244,63,94,0.4)] animate-pulse">
              <ShieldAlert className="w-4 h-4" />
              PRIORITY FORENSIC SANCTION: {target.riskLevel}
            </div>
            <h2 className="text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
              TRACE <span className="text-rose-500 italic">ACTIVE</span>
            </h2>
            <div className="flex items-center gap-8">
               <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-2 min-w-[280px]">
                  <div className="flex items-center gap-3">
                     <Target className="w-5 h-5 text-rose-500 animate-spin" />
                     <span className="text-[10px] text-slate-500 font-black uppercase">Identifier Locked</span>
                  </div>
                  <span className="text-3xl font-black text-white mono tracking-tighter">{target.identifier}</span>
               </div>
               <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-slate-600 font-black uppercase">Type</span>
                  <span className="text-sm font-black text-rose-400 mono">{target.type}</span>
                  <div className="flex items-center gap-2 mt-2">
                     <Globe className="w-3 h-3 text-rose-500" />
                     <span className="text-[8px] text-rose-500/60 font-black uppercase tracking-widest">Global Edge Sweep</span>
                  </div>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-4">
             {steps.map((s, i) => (
               <div key={i} className={`p-8 rounded-[2.5rem] border-2 transition-all duration-700 flex flex-col gap-4 ${
                 activeStep === i ? 'bg-rose-600 text-black border-white shadow-[0_0_50px_rgba(244,63,94,0.6)] scale-105' :
                 activeStep > i ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
                 'bg-black/40 border-slate-900 opacity-20'
               }`}>
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-black/20">
                       {activeStep > i ? <ShieldCheck className="w-6 h-6" /> : s.icon}
                    </div>
                    {activeStep === i && <Activity className="w-5 h-5 animate-pulse" />}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest leading-tight">{s.label}</span>
               </div>
             ))}
          </div>

          <div className="space-y-4">
             <div className="flex items-center justify-between px-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Identity Incineration Progress</span>
                <span className="text-2xl font-black text-white mono">{progress}%</span>
             </div>
             <div className="h-4 w-full bg-slate-950 border border-slate-900 rounded-full overflow-hidden shadow-inner relative p-1">
                <div 
                  className="h-full bg-gradient-to-r from-rose-600 via-white to-rose-600 animate-[shimmer_0.5s_infinite_linear] bg-[length:200%_100%] transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(244,63,94,0.8)]"
                  style={{ width: `${progress}%` }}
                />
             </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8 h-full">
           <div className="flex-1 bg-black border border-slate-800 rounded-[3.5rem] p-10 font-mono text-[11px] text-rose-500/80 space-y-3 overflow-y-auto custom-scrollbar shadow-inner relative">
              <div className="absolute top-6 right-10 text-[9px] text-slate-800 font-black uppercase">Forensic_Stream</div>
              {logs.map((log, i) => (
                <div key={i} className="animate-in slide-in-from-left-2 flex gap-4 border-b border-white/5 pb-2">
                  <span className="text-slate-800 font-black shrink-0">[{i}]</span>
                  <span className="break-all">{log}</span>
                </div>
              ))}
              <div className="flex gap-2">
                <span className="animate-pulse bg-rose-600 w-2 h-4"></span>
              </div>
           </div>

           <div className="p-8 rounded-[3rem] bg-rose-500/5 border border-rose-500/10 flex flex-col gap-6">
              <div className="flex items-center gap-5">
                 <Skull className="w-10 h-10 text-rose-500" />
                 <div className="flex flex-col">
                    <span className="text-[11px] font-black text-white uppercase tracking-widest">Q-TEAM NEUTRALIZER</span>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest italic">SDS SANCTION v15.0</span>
                 </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-black uppercase tracking-tighter text-center">
                "Caution: This procedure scrubs target metadata from the Global Identity Ledger. This action is systemic and irreversible."
              </p>
           </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 flex items-center gap-6 opacity-40 grayscale">
         <div className="flex flex-col">
            <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">NEOXZ FORENSICS</span>
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Mandate Verification Required</span>
         </div>
      </div>
    </div>
  );
};

export default ForensicDossier;

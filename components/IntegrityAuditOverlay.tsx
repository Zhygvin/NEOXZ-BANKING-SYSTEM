
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap, Activity, Globe, Cpu, Loader2, Network, Radio, Database, CheckCircle2, AlertTriangle, Fingerprint } from 'lucide-react';

interface IntegrityAuditOverlayProps {
  onComplete: () => void;
  level: string;
}

const IntegrityAuditOverlay: React.FC<IntegrityAuditOverlayProps> = ({ onComplete, level }) => {
  const [phase, setPhase] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [logs, setLogs] = useState<string[]>(['[AUDIT] Initializing Deep Forensic Probe...']);
  
  const phases = [
    { label: 'Identity Parity Check', icon: <Fingerprint className="w-5 h-5" />, sub: 'press.neoxz@gmail.com' },
    { label: 'Ledger Immutability Scan', icon: <Database className="w-5 h-5" />, sub: 'SDS-HASH Verification' },
    { label: 'Global Node Latency Test', icon: <Network className="w-5 h-5" />, sub: '4,117 Edges Active' },
    { label: 'Reality Parity Sync', icon: <Globe className="w-5 h-5" />, sub: '1.000000 Anchoring' }
  ];

  useEffect(() => {
    const sequence = async () => {
      for (let i = 0; i < phases.length; i++) {
        setPhase(i);
        setLogs(prev => [...prev, `[INIT] ${phases[i].label} sequence staged.`]);
        
        for (let j = 0; j < 5; j++) {
          await new Promise(r => setTimeout(r, 200));
          setEfficiency(prev => Math.min(100, prev + Math.floor(Math.random() * 5) + 3));
          setLogs(prev => [...prev, `[SCAN] Checking Node-0x${Math.random().toString(16).substr(2, 4).toUpperCase()}... OK`]);
        }
        
        setLogs(prev => [...prev, `[SUCCESS] ${phases[i].label} verified at 100% integrity.`]);
        await new Promise(r => setTimeout(r, 400));
      }
      
      await new Promise(r => setTimeout(r, 1000));
      onComplete();
    };
    sequence();
  }, []);

  return (
    <div className="fixed inset-0 z-[2000] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-500">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(6,182,212,0.1)_0%,_transparent_70%)]"></div>
        <div className="scanline"></div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        <div className="lg:col-span-7 space-y-12">
          <header className="space-y-4">
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-black uppercase tracking-[0.4em] text-[10px]">
               <Activity className="w-4 h-4 animate-pulse" />
               System Integrity Diagnostic: {level}
            </div>
            <h2 className="text-6xl font-black uppercase tracking-tighter text-white">
              EFFICIENCY <span className="text-cyan-500 italic">AUDIT</span>
            </h2>
            <div className="flex items-center gap-8">
               <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Global Stability</span>
                  <span className="text-2xl font-black text-white mono">99.9999%</span>
               </div>
               <div className="h-10 w-[1px] bg-slate-800"></div>
               <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Parity Index</span>
                  <span className="text-2xl font-black text-cyan-400 mono">1.000000</span>
               </div>
            </div>
          </header>

          <div className="space-y-4">
             {phases.map((p, i) => (
               <div key={i} className={`p-8 rounded-[2.5rem] border transition-all duration-700 flex items-center justify-between ${
                 phase === i ? 'bg-cyan-500/5 border-cyan-500/30 scale-105 shadow-[0_0_40px_rgba(6,182,212,0.1)]' :
                 phase > i ? 'bg-black/40 border-slate-800 opacity-60' : 'bg-black/20 border-slate-900 opacity-20'
               }`}>
                  <div className="flex items-center gap-8">
                     <div className={`p-4 rounded-2xl bg-black border ${phase >= i ? 'border-cyan-500/50 text-cyan-400' : 'border-slate-800 text-slate-700'}`}>
                        {p.icon}
                     </div>
                     <div className="flex flex-col">
                        <span className={`text-lg font-black uppercase tracking-widest ${phase >= i ? 'text-white' : 'text-slate-700'}`}>{p.label}</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{p.sub}</span>
                     </div>
                  </div>
                  {phase > i ? (
                    <div className="flex items-center gap-3 text-cyan-500 font-black text-[10px] uppercase tracking-widest">
                       <CheckCircle2 className="w-5 h-5" />
                       VERIFIED
                    </div>
                  ) : phase === i ? (
                    <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                  ) : (
                    <div className="text-[10px] font-black text-slate-800 uppercase italic">AWAITING LAYER</div>
                  )}
               </div>
             ))}
          </div>

          <div className="p-8 rounded-[2.5rem] bg-cyan-500/5 border border-cyan-500/10 space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-[10px] text-cyan-500 font-black uppercase tracking-widest">Efficiency Propagation</span>
                <span className="text-[10px] text-white font-black mono">{efficiency}%</span>
             </div>
             <div className="relative h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                  style={{ width: `${efficiency}%` }}
                ></div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8">
           <div className="flex-1 bg-black border border-slate-800 rounded-[3rem] p-10 font-mono text-[11px] text-cyan-500/70 space-y-2 overflow-y-auto custom-scrollbar shadow-inner">
              {logs.map((log, i) => (
                <div key={i} className="animate-in slide-in-from-left-2 flex gap-4">
                  <span className="text-slate-800 font-black">[{i.toString().padStart(2, '0')}]</span>
                  <span>{log}</span>
                </div>
              ))}
              <div className="flex gap-2">
                <span className="animate-pulse bg-cyan-500 w-2 h-4"></span>
              </div>
           </div>
           
           <div className="p-10 rounded-[3rem] bg-slate-900/60 border border-slate-800 flex flex-col gap-6">
              <div className="flex items-center gap-5">
                 <Cpu className="w-8 h-8 text-cyan-400" />
                 <div className="flex flex-col">
                    <span className="text-[11px] font-black text-white uppercase tracking-widest">Audit Engine v15.0</span>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Sovereign Parity Guaranteed</span>
                 </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-black uppercase tracking-tighter italic">
                "The NEOXZ mandate maintains absolute efficiency on all global server levels. Integrity is immutable."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrityAuditOverlay;

import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Activity, ShieldCheck, RefreshCw, Layers, Users, Gavel, Landmark, Radio, Scale, CheckCircle2 } from 'lucide-react';
import Logo from './Logo';

interface SystemCoordinationOverlayProps {
  onComplete: () => void;
  tier: 'GLOBAL_ALIGNMENT' | 'CORE_REBALANCING';
}

const SystemCoordinationOverlay: React.FC<SystemCoordinationOverlayProps> = ({ onComplete, tier }) => {
  const [progress, setProgress] = useState(0);
  const [activeAgent, setActiveAgent] = useState(0);
  const [logs, setLogs] = useState<string[]>(['[COORD] COORDINATION PROTOCOL v16.0 STAGED...']);
  const [consensus, setConsensus] = useState<boolean[]>([false, false, false, false]);

  const agents = [
    { name: 'NEOXZ AI', role: 'Quantum Logic', icon: <Cpu />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { name: 'Q-TEAM', role: 'Forensic Lock', icon: <ShieldCheck />, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { name: 'BANK AI', role: 'Capital Parity', icon: <Landmark />, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { name: 'HARVEY AI', role: 'Legal Sovereignty', icon: <Gavel />, color: 'text-cyan-400', bg: 'bg-cyan-500/10' }
  ];

  useEffect(() => {
    const sequence = async () => {
      setLogs(prev => [...prev, `[INIT] Analyzing ${tier.replace('_', ' ')} requirements...`]);
      
      for (let i = 0; i < agents.length; i++) {
        setActiveAgent(i);
        setLogs(prev => [...prev, `[BUS] ${agents[i].name}: Evaluating vector weights...`]);
        await new Promise(r => setTimeout(r, 1200));
        
        setConsensus(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
        setLogs(prev => [...prev, `[OK] ${agents[i].name}: Vector Balanced. Consensus Achieved.`]);
        setProgress(prev => prev + 25);
      }

      setLogs(prev => [...prev, '[FIN] Consolidating Consensus Hash...', '[FIN] Mandate Coordinated.']);
      await new Promise(r => setTimeout(r, 1500));
      onComplete();
    };
    sequence();
  }, []);

  return (
    <div className="fixed inset-0 z-[9600] bg-black flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-500 font-sans">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(99,102,241,0.15)_0%,_transparent_70%)]"></div>
        <div className="grid grid-cols-20 h-full opacity-10">
           {Array.from({ length: 200 }).map((_, i) => (
             <div key={i} className="border-r border-indigo-500/10 h-full w-full animate-[pulse_3s_infinite]" style={{ animationDelay: `${i * 15}ms` }} />
           ))}
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-center">
        <div className="lg:col-span-7 space-y-12">
          <header className="space-y-6">
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-indigo-500 text-black font-black uppercase tracking-[0.5em] text-[10px] shadow-[0_0_60px_rgba(99,102,241,0.5)]">
              <Users className="w-4 h-4" />
              CONSORTIUM SYSTEM COORDINATION
            </div>
            <h2 className="text-7xl font-black uppercase tracking-tighter text-white leading-none">
              CONSENSUS <span className="text-indigo-400 italic">VALLEY</span>
            </h2>
            <div className="flex items-center gap-6">
               <div className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol: QPP_ALIGN_v16</span>
               </div>
               <div className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Auth: MASTER_ANCHOR</span>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-6">
             {agents.map((a, i) => (
               <div key={i} className={`p-10 rounded-[3rem] border-2 transition-all duration-700 flex flex-col gap-4 ${
                 activeAgent === i ? 'bg-indigo-500 text-black border-white shadow-[0_0_60px_rgba(99,102,241,0.6)] scale-105' :
                 consensus[i] ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
                 'bg-black/40 border-slate-900 opacity-20'
               }`}>
                  <div className="flex items-center justify-between">
                    <div className="p-4 rounded-2xl bg-black/20">
                       {consensus[i] ? <CheckCircle2 className="w-8 h-8" /> : React.cloneElement(a.icon as React.ReactElement<any>, { className: 'w-8 h-8' })}
                    </div>
                    {activeAgent === i && <Activity className="w-6 h-6 animate-pulse" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black uppercase tracking-widest leading-tight">{a.name}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${activeAgent === i ? 'text-black/60' : 'text-slate-500'}`}>{a.role}</span>
                  </div>
               </div>
             ))}
          </div>

          <div className="space-y-6">
             <div className="flex items-center justify-between px-4">
                <span className="text-[11px] font-black uppercase tracking-widest text-indigo-500">System Coordination Completion</span>
                <span className="text-3xl font-black text-white mono">{progress}%</span>
             </div>
             <div className="h-6 w-full bg-slate-950 border-2 border-indigo-900/30 rounded-full overflow-hidden shadow-inner p-1 relative">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-600 via-white to-indigo-600 animate-[shimmer_0.3s_infinite_linear] bg-[length:200%_100%] transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(99,102,241,1)]"
                  style={{ width: `${progress}%` }}
                />
             </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8 h-full">
           <div className="flex-1 bg-black border border-slate-800 rounded-[3.5rem] p-10 font-mono text-[12px] text-indigo-400/80 space-y-3 overflow-y-auto custom-scrollbar shadow-2xl relative">
              <div className="absolute top-6 right-10 text-[10px] text-slate-800 font-black uppercase">Necessary_Work_Stream</div>
              {logs.map((log, i) => (
                <div key={i} className="animate-in slide-in-from-left-2 flex gap-4 border-b border-white/5 pb-3">
                  <span className="text-slate-800 font-black shrink-0">[{i}]</span>
                  <span className="break-all">{log}</span>
                </div>
              ))}
              <div className="flex gap-4 items-center">
                <span className="animate-pulse bg-indigo-500 w-3 h-5" />
                <span className="text-white font-black animate-pulse">Syncing Consortium Nodes...</span>
              </div>
           </div>

           <div className="p-10 rounded-[3.5rem] bg-indigo-500/5 border border-indigo-500/10 flex flex-col gap-6 text-center">
              <div className="relative mx-auto group">
                 <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/40 transition-all animate-pulse" />
                 <Logo size={80} className="relative z-10" />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-black uppercase tracking-widest italic">
                "System Coordination is the fundamental process of the mandate. Balancing Capital with Sovereign Identity ensures absolute reality parity."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SystemCoordinationOverlay;
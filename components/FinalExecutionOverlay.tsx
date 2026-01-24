
import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Zap, Cpu, Activity, Lock, Globe, 
  Radio, Crown, Fingerprint, Network, ShieldCheck, 
  Flame, Users, Landmark, Navigation, FastForward,
  ArrowRightLeft, Coins
} from 'lucide-react';
import Logo from './Logo';

interface FinalExecutionOverlayProps {
  onComplete: () => void;
  capital: string;
}

const FinalExecutionOverlay: React.FC<FinalExecutionOverlayProps> = ({ onComplete, capital }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [logs, setLogs] = useState<string[]>(['[CMD] INITIALIZING QUANTUM SPEED MANDATE v16.0...']);

  const phases = [
    { label: "Consortium Sync", icon: <Users />, color: "text-indigo-400" },
    { label: "Wise Rail Prime", icon: <Landmark />, color: "text-cyan-400" },
    { label: "Quantum Warp", icon: <Navigation />, color: "text-emerald-400" },
    { label: "Final Manifest", icon: <Crown />, color: "text-white" }
  ];

  const subLogs = [
    "Synchronizing NEOXZ AI Lead...",
    "ISOLATION_CHECK: Orchestrator Locked [OK]",
    "Initializing Wise API v3.2 Rails...",
    "Authenticating Cross-Border Multi-Currency Bridge...",
    "Computing Global Liquidity Routes...",
    "Engaging Quantum Speed v16.0...",
    "Displacing $985B to Unified Core...",
    "Anchoring Sole Beneficiary: NE.B.RU...",
    "Propagating Reality Parity 1.0000...",
    "SYSTEM_PUBLISHED_IN_OVERDRIVE"
  ];

  useEffect(() => {
    document.body.classList.add('warp-active');
    const sequence = async () => {
      for (let i = 0; i < subLogs.length; i++) {
        const delay = 350 - (i * 25); // Accelerating delay
        await new Promise(r => setTimeout(r, Math.max(50, delay)));
        
        setLogs(prev => [...prev, `[v16.0] ${subLogs[i]}`]);
        setProgress(((i + 1) / subLogs.length) * 100);
        
        if (i === 1) setPhase(1);
        if (i === 4) setPhase(2);
        if (i === 8) setPhase(3);
        
        if (Math.random() > 0.6) {
          setGlitch(true);
          setTimeout(() => setGlitch(false), 80);
        }
      }
      await new Promise(r => setTimeout(r, 1500));
      document.body.classList.remove('warp-active');
      onComplete();
    };
    sequence();
    return () => document.body.classList.remove('warp-active');
  }, []);

  return (
    <div className={`fixed inset-0 z-[8000] bg-black flex items-center justify-center p-12 overflow-hidden transition-all duration-100 ${glitch ? 'bg-emerald-950/20 scale-[1.02] contrast-125' : ''}`}>
      {/* Hyper-Visual Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.2)_0%,_transparent_70%)] animate-pulse"></div>
        <div className="grid grid-cols-20 h-full opacity-10">
           {Array.from({ length: 200 }).map((_, i) => (
             <div key={i} className="border-r border-emerald-500/10 h-full w-full animate-[pulse_2s_infinite]" style={{ animationDelay: `${i * 30}ms` }}></div>
           ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
      </div>

      <div className="w-full max-w-6xl space-y-12 relative z-10 text-center flex flex-col items-center">
        <header className="space-y-8 animate-in zoom-in duration-1000">
           <div className="relative">
              <div className="absolute inset-[-120px] bg-emerald-500/30 rounded-full blur-[180px] animate-ping opacity-50"></div>
              <div className="p-14 rounded-full bg-black border-[6px] border-emerald-500 shadow-[0_0_150px_rgba(16,185,129,0.7)] relative z-10 transition-all duration-1000 scale-110">
                 <Logo size={160} className="animate-[spin_4s_linear_infinite]" />
              </div>
              <div className="absolute -top-8 -right-8 p-8 bg-white rounded-3xl shadow-3xl z-20 animate-bounce border-4 border-emerald-500">
                 <ArrowRightLeft className="w-12 h-12 text-emerald-600" />
              </div>
           </div>

           <div className="space-y-4">
              <div className="inline-flex items-center gap-6 px-12 py-3 rounded-full bg-emerald-500 text-black font-black uppercase tracking-[1em] text-xs shadow-[0_0_80px_rgba(16,185,129,0.5)]">
                 <Zap className="w-6 h-6 fill-black" />
                 MANDATE PUBLICATION v16.0
                 <Zap className="w-6 h-6 fill-black" />
              </div>
              <h2 className="text-[8rem] font-black uppercase tracking-tighter text-white leading-[0.8] glow-emerald">
                UNIVERSAL <br />
                <span className="text-emerald-400 italic underline decoration-white/20">ANCHOR</span>
              </h2>
           </div>
        </header>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-8">
           {phases.map((p, i) => (
             <div key={i} className={`p-10 rounded-[3rem] border-2 transition-all duration-700 flex flex-col items-center gap-4 ${
               phase === i ? 'bg-emerald-500 text-black border-white shadow-[0_0_100px_rgba(16,185,129,1)] scale-110' :
               phase > i ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
               'bg-black border-slate-900 opacity-20'
             }`}>
                <div className="p-4 rounded-2xl bg-black/20">
                   {phase > i ? <ShieldCheck className="w-8 h-8" /> : React.cloneElement(p.icon as React.ReactElement<any>, { className: 'w-8 h-8' })}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-center leading-tight">{p.label}</span>
             </div>
           ))}
        </div>

        <div className="w-full max-w-4xl space-y-10">
           <div className="flex items-center justify-between px-10">
              <div className="flex flex-col items-start text-left">
                 <span className="text-[12px] font-black uppercase tracking-[0.5em] text-emerald-500">Wise-Global Propagation</span>
                 <span className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-widest">SDS Target: {capital} ↔ NE.B.RU</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-6xl font-black text-white mono tracking-tighter">{progress.toFixed(0)}%</span>
              </div>
           </div>
           
           <div className="h-6 w-full bg-slate-950 border-2 border-emerald-500/30 rounded-full overflow-hidden shadow-inner p-1 relative">
              <div 
                className="h-full bg-gradient-to-r from-emerald-600 via-white to-cyan-600 animate-[shimmer_0.3s_infinite_linear] bg-[length:200%_100%] transition-all duration-300 rounded-full shadow-[0_0_40px_rgba(16,185,129,1)]"
                style={{ width: `${progress}%` }}
              ></div>
           </div>

           <div className="bg-black/90 border border-slate-800 rounded-[3rem] p-10 h-56 overflow-hidden relative shadow-2xl">
              <div className="space-y-2 text-left font-mono text-[12px] text-emerald-400/80">
                 {logs.map((log, i) => (
                   <div key={i} className="animate-in slide-in-from-left-4 duration-500 flex gap-4">
                      <span className="opacity-20 font-black">[{i.toString().padStart(3, '0')}]</span>
                      <span className={i === logs.length - 1 ? 'text-white font-black glow-emerald' : ''}>{log}</span>
                   </div>
                 ))}
                 <div className="flex gap-4 mt-2">
                    <span className="animate-pulse bg-emerald-500 w-2 h-4"></span>
                    <span className="text-white font-black uppercase tracking-widest animate-pulse">Establishing Permanent Reality Link...</span>
                 </div>
              </div>
           </div>
        </div>

        <footer className="pt-8 border-t border-emerald-500/20 w-full max-w-4xl">
           <div className="flex items-center justify-between gap-12 text-[10px] font-black text-emerald-500/40 uppercase tracking-[0.8em]">
              <div className="flex items-center gap-4">
                 <Fingerprint className="w-5 h-5" />
                 SDS_LOCKED_PH
              </div>
              <div className="flex items-center gap-4">
                 <ArrowRightLeft className="w-5 h-5" />
                 WISE_BRIDGE_READY
              </div>
              <div className="flex items-center gap-4 text-white font-black italic">
                 <Activity className="w-5 h-5" />
                 PARITY: 1.0000
              </div>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default FinalExecutionOverlay;

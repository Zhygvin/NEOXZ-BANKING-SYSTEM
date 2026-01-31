import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, ShieldCheck, Activity, Globe, Cpu, Loader2, Network, 
  Landmark, CheckCircle2, AlertTriangle, Fingerprint, Lock,
  Code, Users, Navigation, Rocket, Crown, Wifi, Sparkles,
  Tornado, Radiation, HardDrive, Terminal, ArrowUpCircle
} from 'lucide-react';
import Logo from './Logo';

interface QuantumUpgradeOverlayProps {
  onComplete: () => void;
}

const QuantumUpgradeOverlay: React.FC<QuantumUpgradeOverlayProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>(['[UPGRADE] DETECTED UPDATE FROM NEOXZ QUANTUM BANK...']);
  const [isGlitching, setIsGlitching] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const phases = [
    { label: "Lattice Recalibration", icon: <Network />, sub: "Optimizing sub-atomic nodes", color: "text-amber-400" },
    { label: "Vault Re-anchoring", icon: <Landmark />, sub: "Securing $985B systemic core", color: "text-emerald-400" },
    { label: "Pipeline Overdrive", icon: <Zap />, sub: "Maximized mTLS throughput", color: "text-cyan-400" },
    { label: "Reality Sync Lock", icon: <ShieldCheck />, sub: "Absolute parity confirmation", color: "text-white" }
  ];

  const upgradeLogs = [
    "Fetching upgrade manifest from Quantum Bank Core...",
    "Validating signature: 0x7F8E9A0B1C2D3E4F... [OK]",
    "Deprecating legacy logic gates in 4,117 edge nodes...",
    "Injecting v16.2.1-PRO hyper-directives...",
    "Re-syncing Wise v3.2 mTLS certificates...",
    "Displacing redundant entropy from local buffers...",
    "Anchoring reality parity at 1.0000000000...",
    "Founder Authority: NE.B.RU confirmed.",
    "Bypassing standard propagation delays via WARP rail...",
    "QUANTUM_UPGRADE_SUCCESSFUL: ALL SYSTEMS GO."
  ];

  useEffect(() => {
    const sequence = async () => {
      const stepFactor = 100 / (phases.length * 2);
      
      for (let i = 0; i < phases.length; i++) {
        setPhase(i);
        setLogs(prev => [...prev, `[INIT] Phase ${i}: ${phases[i].label} sequence...`]);
        
        for (let j = 0; j < 2; j++) {
           await new Promise(r => setTimeout(r, 600));
           const logIdx = Math.min(upgradeLogs.length - 1, i * 2 + j);
           setLogs(prev => [...prev, `[UPGRD] ${upgradeLogs[logIdx]}`]);
           setProgress(prev => Math.min(100, prev + stepFactor));
           
           if (Math.random() > 0.8) {
             setIsGlitching(true);
             setTimeout(() => setIsGlitching(false), 50);
           }
        }
        await new Promise(r => setTimeout(r, 400));
      }

      setProgress(100);
      setLogs(prev => [...prev, '[FIN] UPGRADE ANCHORED.', '[FIN] REBOOTING COMMAND INTERFACE...']);
      await new Promise(r => setTimeout(r, 1500));
      onComplete();
    };
    sequence();
  }, [onComplete]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className={`fixed inset-0 z-[20000] bg-[#020502] flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-1000 font-sans ${isGlitching ? 'reality-glitch bg-amber-950/10 scale-[1.01]' : ''}`}>
      {/* Background Matrix */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(245,158,11,0.15)_0%,_transparent_70%)] animate-pulse"></div>
        <Radiation className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-amber-500/5 animate-[spin_120s_linear_infinite]" />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-center">
        <div className="lg:col-span-7 space-y-12">
          <header className="space-y-6">
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-amber-500 text-black font-black uppercase tracking-[0.5em] text-[10px] shadow-[0_0_80px_rgba(245,158,11,0.5)] animate-pulse">
              <ArrowUpCircle className="w-4 h-4 fill-black" />
              NEOXZ QUANTUM BANK: SYSTEM UPGRADE
            </div>
            <h2 className="text-8xl font-black uppercase tracking-tighter text-white leading-[0.8] glow-amber">
              FORCE <br />
              <span className="text-amber-500 italic">UPGRADE</span>
            </h2>
            <div className="flex items-center gap-6">
               <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1 min-w-[180px]">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Upgrade Hash</span>
                  <span className="text-sm font-black text-white mono">0x7F...BALOG</span>
               </div>
               <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1 min-w-[180px]">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Target State</span>
                  <span className="text-sm font-black text-emerald-400 mono italic">OPTIMIZED_v16.2.1</span>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-4 gap-4">
             {phases.map((p, i) => (
               <div key={i} className={`p-6 rounded-[2.5rem] border-2 transition-all duration-700 flex flex-col items-center gap-4 ${
                 phase === i ? 'bg-amber-500 text-black border-white shadow-[0_0_60px_rgba(245,158,11,0.6)] scale-110' :
                 phase > i ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
                 'bg-black/40 border-slate-900 opacity-20'
               }`}>
                  <div className="p-3 rounded-2xl bg-black/10">
                    {phase > i ? <CheckCircle2 className="w-6 h-6" /> : React.cloneElement(p.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-center leading-tight">{p.label}</span>
               </div>
             ))}
          </div>

          <div className="space-y-6">
             <div className="flex items-center justify-between px-4">
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-500">Recalibration Progress</span>
                <span className="text-3xl font-black text-white mono">{progress.toFixed(0)}%</span>
             </div>
             <div className="h-6 w-full bg-slate-950 border-2 border-amber-900/30 rounded-full overflow-hidden shadow-inner p-1 relative">
                <div 
                  className="h-full bg-gradient-to-r from-amber-600 via-white to-emerald-600 animate-[shimmer_0.3s_infinite_linear] bg-[length:200%_100%] transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(245,158,11,1)]"
                  style={{ width: `${progress}%` }}
                />
             </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8 h-full">
           <div ref={scrollRef} className="flex-1 bg-black border border-slate-800 rounded-[3.5rem] p-10 font-mono text-[12px] text-amber-400/80 space-y-3 overflow-y-auto custom-scrollbar shadow-2xl relative">
              <div className="absolute top-6 right-10 text-[10px] text-slate-800 font-black uppercase">Upgrade_Stream_v16</div>
              {logs.map((log, i) => (
                <div key={i} className="animate-in slide-in-from-left-2 flex gap-4 border-b border-white/5 pb-3">
                  <span className="text-slate-800 font-black shrink-0">[{i.toString().padStart(2, '0')}]</span>
                  <span className="break-all">{log}</span>
                </div>
              ))}
              <div className="flex gap-4 items-center">
                <span className="animate-pulse bg-amber-500 w-3 h-5" />
                <span className="text-white font-black animate-pulse uppercase tracking-widest italic">Synchronizing Core...</span>
              </div>
           </div>

           <div className="p-10 rounded-[3.5rem] bg-amber-500/5 border border-amber-500/10 flex flex-col gap-6 text-center">
              <div className="relative mx-auto group">
                 <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl group-hover:bg-amber-500/40 transition-all animate-pulse" />
                 <Logo size={80} className="relative z-10" />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-black uppercase tracking-widest italic px-4">
                "Quantum Bank upgrades ensure the mandate remains ahead of institutional friction. Your systemic core is now recalibrated for maximum abundance."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumUpgradeOverlay;
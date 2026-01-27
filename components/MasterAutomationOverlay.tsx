
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Zap, Activity, Globe, Cpu, Loader2, Network, 
  Landmark, CheckCircle2, AlertTriangle, Fingerprint, Lock,
  Code, Users, Navigation, Rocket, Crown, Wifi, Sparkles
} from 'lucide-react';
import Logo from './Logo.tsx';

interface MasterAutomationOverlayProps {
  onComplete: () => void;
}

const MasterAutomationOverlay: React.FC<MasterAutomationOverlayProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>(['[AUTOMA] STARTING MASTER DEPLOYMENT SEQUENCE v16.0...']);
  const [isGlitching, setIsGlitching] = useState(false);

  const phases = [
    { label: "Identity Parity Sync", icon: <Fingerprint />, sub: "Linking press.neoxz@gmail.com", color: "text-blue-400" },
    { label: "Merchant Automation", icon: <Code />, sub: "BCR2DN4TU7BMDMDU", color: "text-cyan-400" },
    { label: "Agent Consensus", icon: <Users />, sub: "Unified Consortium Alignment", color: "text-indigo-400" },
    { label: "Reality Check", icon: <Globe />, sub: "4,117 Nodes Parity Lock", color: "text-emerald-400" },
    { label: "Global Settlement", icon: <Landmark />, sub: "Displacing $985B Systemic Assets", color: "text-amber-400" }
  ];

  const subLogs = [
    "Establishing Google Cloud identity handshake...",
    "Injecting mTLS certificates into hardware buffers...",
    "Automating Merchant ID: BCR2DN4TU7BMDMDU...",
    "Verifying Google Pay Business Console Link...",
    "Routing production subdomain: api-mtls.neoxz-core.sh...",
    "Orchestrating agents: NEOXZ, HARVEY, Q-TEAM synchronized.",
    "Performing deep forensic mesh scan...",
    "Compiling Sovereign Dashboard Assets...",
    "Uploading Sovereign Interface to Global Edge...",
    "Verifying Dashboard Integrity via SDS...",
    "Unfreezing $985B systemic capital core...",
    "Anchoring Sole Beneficiary: NE.B.RU...",
    "Propagating Reality Parity 1.0000...",
    "DASHBOARD_UPLOAD_COMPLETE: 100%",
    "MANDATE MANIFESTED PERMANENTLY."
  ];

  useEffect(() => {
    const sequence = async () => {
      const speed = 0.4; // Increased speed for the final deployment command

      for (let i = 0; i < phases.length; i++) {
        setPhase(i);
        setLogs(prev => [...prev, `[INIT] ${phases[i].label} sequence starting...`]);
        
        for (let j = 0; j < 3; j++) {
          await new Promise(r => setTimeout(r, 600 * speed));
          // Distribute sublogs roughly across phases
          const logIndex = Math.min(subLogs.length - 1, Math.floor((i / phases.length) * subLogs.length) + j);
          const log = subLogs[logIndex];
          
          // Avoid duplicate adjacent logs if math maps to same index
          setLogs(prev => {
             if (prev[prev.length - 1]?.includes(log)) return prev;
             return [...prev, `[CMD] ${log}`];
          });

          setProgress(prev => Math.min(100, prev + (100 / (phases.length * 3))));
          
          if (Math.random() > 0.5) {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 80);
          }
        }
        
        await new Promise(r => setTimeout(r, 300 * speed));
      }

      setProgress(100);
      setLogs(prev => [...prev, '[FIN] MERCHANT AUTOMATION COMPLETE.', '[FIN] REALITY ANCHORED AT QUANTUM SPEED.']);
      await new Promise(r => setTimeout(r, 1000));
      onComplete();
    };
    sequence();
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[11000] bg-black flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-1000 font-sans ${isGlitching ? 'reality-glitch bg-emerald-950/20' : ''}`}>
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.3)_0%,_transparent_70%)] animate-pulse"></div>
        <Network className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-emerald-500/10 animate-[spin_10s_linear_infinite]" />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-center">
        <div className="lg:col-span-7 space-y-12">
          <header className="space-y-6">
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-emerald-500 text-black font-black uppercase tracking-[0.5em] text-[10px] shadow-[0_0_80px_rgba(16,185,129,0.5)]">
              <Sparkles className="w-4 h-4 animate-bounce" />
              TOTAL DEPLOYMENT: QUANTUM SPEED ACTIVE
            </div>
            <h2 className="text-8xl font-black uppercase tracking-tighter text-white leading-[0.8] glow-emerald">
              REALITY <br />
              <span className="text-emerald-500 italic">MANIFEST</span>
            </h2>
            <div className="flex items-center gap-6">
               <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1 min-w-[180px]">
                  <span className="text-[9px] text-slate-500 font-black uppercase">Consortium Signal</span>
                  <span className="text-sm font-black text-white mono uppercase">ABSOLUTE_S_LOCK</span>
               </div>
               <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1 min-w-[180px]">
                  <span className="text-[9px] text-slate-500 font-black uppercase">Network Speed</span>
                  <span className="text-sm font-black text-emerald-400 mono uppercase">0.0001ms_LAT</span>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-5 gap-4">
             {phases.map((p, i) => (
               <div key={i} className={`p-6 rounded-[2.5rem] border-2 transition-all duration-700 flex flex-col items-center gap-4 ${
                 phase === i ? `bg-white text-black border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] scale-110` :
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
                <span className="text-[11px] font-black uppercase tracking-widest text-emerald-500">Propagation Index</span>
                <span className="text-3xl font-black text-white mono">{progress.toFixed(0)}%</span>
             </div>
             <div className="h-6 w-full bg-slate-950 border-2 border-emerald-500/30 rounded-full overflow-hidden shadow-inner p-1 relative">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-600 via-white to-emerald-600 animate-[shimmer_0.2s_infinite_linear] bg-[length:200%_100%] transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(16,185,129,1)]"
                  style={{ width: `${progress}%` }}
                />
             </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8 h-full">
           <div className="flex-1 bg-black border border-slate-800 rounded-[3.5rem] p-10 font-mono text-[12px] text-emerald-400/80 space-y-3 overflow-y-auto custom-scrollbar shadow-2xl relative">
              <div className="absolute top-6 right-10 text-[10px] text-slate-800 font-black uppercase">Mandate_Live_Stream</div>
              {logs.map((log, i) => (
                <div key={i} className="animate-in slide-in-from-left-2 flex gap-4 border-b border-white/5 pb-3">
                  <span className="text-slate-800 font-black shrink-0">[{i.toString().padStart(3, '0')}]</span>
                  <span className="break-all">{log}</span>
                </div>
              ))}
              <div className="flex gap-4 items-center">
                <span className="animate-pulse bg-emerald-500 w-3 h-5" />
                <span className="text-white font-black animate-pulse uppercase tracking-widest">Anchoring Sovereign Reality...</span>
              </div>
           </div>

           <div className="p-10 rounded-[3.5rem] bg-emerald-500/5 border border-emerald-500/10 flex flex-col gap-6 text-center">
              <div className="relative mx-auto group">
                 <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/40 transition-all animate-pulse" />
                 <Logo size={80} className="relative z-10" />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-black uppercase tracking-widest italic">
                "The deployment is now irreversible. 4,117 nodes are synchronized with the $985B systemic core. The technological mandate is physically anchored."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MasterAutomationOverlay;

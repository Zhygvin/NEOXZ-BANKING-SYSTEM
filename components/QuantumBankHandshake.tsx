
import React, { useState, useEffect } from 'react';
import { 
  Landmark, Zap, ShieldCheck, Activity, Globe, Loader2, 
  ArrowRightLeft, Lock, Fingerprint, Network, Radio, HeartHandshake,
  Coins, Scale, CheckCircle2, AlertTriangle, FileCheck, Search
} from 'lucide-react';
import Logo from './Logo';

interface QuantumBankHandshakeProps {
  onComplete: () => void;
}

const QuantumBankHandshake: React.FC<QuantumBankHandshakeProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>(['[HANDSHAKE] INITIALIZING DIRECT ALIGNED PIPELINES...']);

  const phases = [
    { label: "Vault Auth", icon: <Lock />, sub: "Verifying Master Core" },
    { label: "Pipeline Sync", icon: <Radio />, sub: "Aligning Secured Rails" },
    { label: "Direct Directives", icon: <Landmark />, sub: "Injecting Disperse/Pay Logic" },
    // Added missing Search icon from lucide-react
    { label: "Forensic Audit", icon: <Search />, sub: "Digital Currency Integrity" },
    { label: "Handshake Lock", icon: <CheckCircle2 />, sub: "Protocol Immutable" }
  ];

  const handshakeLogs = [
    "Establishing direct link: https://aistudio.google.com/u/0/apps/drive/1CpdWsgivqX_PJF9Zzd6FGLd0DA2hzPaJ...",
    "Securing handshake protocol via Hardware Tether...",
    "MANDATE_VERIFIED: NE.B.RU Founder Authority detected.",
    "Injecting financial command set: DISPERSE, PAY, RECEIVE...",
    "Injecting asset directives: TRANSACT, AUDIT_FORENSICS...",
    "Calibrating sub-atomic latency for capital movement...",
    "Mesh nodes 4,117 reporting 100% pipeline alignment.",
    "Quantum Bank Core LATCHED. Sovereignty enforced."
  ];

  useEffect(() => {
    const sequence = async () => {
      const stepFactor = 100 / (phases.length * 2);
      
      for (let i = 0; i < phases.length; i++) {
        setPhase(i);
        setLogs(prev => [...prev, `[PHASE_${i}] Starting ${phases[i].label}...`]);
        
        for (let j = 0; j < 2; j++) {
           await new Promise(r => setTimeout(r, 600));
           const logIdx = Math.min(handshakeLogs.length - 1, i * 2 + j);
           setLogs(prev => [...prev, `[SYNC] ${handshakeLogs[logIdx]}`]);
           setProgress(prev => Math.min(100, prev + stepFactor));
        }
        
        await new Promise(r => setTimeout(r, 300));
      }

      setProgress(100);
      setLogs(prev => [...prev, '[FIN] HANDSHAKE COMPLETE.', '[FIN] DIRECT PIPELINES SECURED & ALIGNED.']);
      await new Promise(r => setTimeout(r, 1200));
      onComplete();
    };
    sequence();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[12000] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-700 font-sans">
      {/* Background Matrix */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.15)_0%,_transparent_70%)]"></div>
        <div className="grid grid-cols-12 h-full opacity-10">
           {Array.from({ length: 48 }).map((_, i) => (
             <div key={i} className="border border-emerald-500/10 h-32 w-full animate-pulse" style={{ animationDelay: `${i * 30}ms` }} />
           ))}
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-center">
        <div className="lg:col-span-7 space-y-12">
          <header className="space-y-6">
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-emerald-500 text-black font-black uppercase tracking-[0.5em] text-[10px] shadow-[0_0_50px_rgba(16,185,129,0.4)] animate-pulse">
              <HeartHandshake className="w-4 h-4" />
              NEOXZ QUANTUM BANK HANDSHAKE
            </div>
            <h2 className="text-7xl font-black uppercase tracking-tighter text-white leading-[0.9] glow-emerald">
              SECURED <span className="text-emerald-500 italic">PIPELINES</span>
            </h2>
            <div className="flex items-center gap-6">
               <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1 min-w-[180px]">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Alignment State</span>
                  <span className="text-sm font-black text-white mono">DIRECT_BYPASS</span>
               </div>
               <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1 min-w-[180px]">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Authority Lock</span>
                  <span className="text-sm font-black text-emerald-400 mono">NE.B.RU_MANDATE</span>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-5 gap-4">
             {phases.map((l, i) => (
               <div key={i} className={`p-6 rounded-[2.5rem] border-2 transition-all duration-700 flex flex-col items-center gap-4 ${
                 phase === i ? 'bg-emerald-500 text-black border-white shadow-[0_0_60px_rgba(16,185,129,0.6)] scale-110' :
                 phase > i ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
                 'bg-black/40 border-slate-900 opacity-20'
               }`}>
                  <div className="p-3 rounded-2xl bg-black/10">
                    {phase > i ? <CheckCircle2 className="w-6 h-6" /> : React.cloneElement(l.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-center leading-tight">{l.label}</span>
               </div>
             ))}
          </div>

          <div className="space-y-6">
             <div className="flex items-center justify-between px-4">
                <span className="text-[11px] font-black uppercase tracking-widest text-emerald-500">Alignment Progress</span>
                <span className="text-3xl font-black text-white mono">{progress.toFixed(0)}%</span>
             </div>
             <div className="h-6 w-full bg-slate-950 border-2 border-emerald-900/30 rounded-full overflow-hidden shadow-inner p-1 relative">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-600 via-white to-emerald-600 animate-[shimmer_0.3s_infinite_linear] bg-[length:200%_100%] transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(16,185,129,1)]"
                  style={{ width: `${progress}%` }}
                />
             </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8 h-full">
           <div className="flex-1 bg-black border border-slate-800 rounded-[3.5rem] p-10 font-mono text-[12px] text-emerald-400/80 space-y-3 overflow-y-auto custom-scrollbar shadow-2xl relative">
              <div className="absolute top-6 right-10 text-[10px] text-slate-800 font-black uppercase">Bank_Handshake_Stream</div>
              {logs.map((log, i) => (
                <div key={i} className="animate-in slide-in-from-left-2 flex gap-4 border-b border-white/5 pb-3">
                  <span className="text-slate-800 font-black shrink-0">[{i.toString().padStart(2, '0')}]</span>
                  <span className="break-all">{log}</span>
                </div>
              ))}
              <div className="flex gap-4 items-center">
                <span className="animate-pulse bg-emerald-500 w-3 h-5" />
                <span className="text-white font-black animate-pulse uppercase tracking-widest">Establishing Pipeline Handshake...</span>
              </div>
           </div>

           <div className="p-10 rounded-[3.5rem] bg-emerald-500/5 border border-emerald-500/10 flex flex-col gap-6 text-center">
              <div className="relative mx-auto group">
                 <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/40 transition-all animate-pulse" />
                 <Logo size={80} className="relative z-10" />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-black uppercase tracking-widest italic">
                "Direct aligned pipelines facilitate the execution of the Founder's mandate without intermediate friction. Collaboration with the Quantum Bank is absolute."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumBankHandshake;

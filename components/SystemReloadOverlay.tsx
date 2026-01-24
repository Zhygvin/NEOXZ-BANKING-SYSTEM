import React, { useState, useEffect, useRef } from 'react';
import { 
  RefreshCw, ShieldCheck, Zap, Activity, 
  Database, Network, Lock, Cpu, Globe,
  Terminal, ShieldAlert, Loader2
} from 'lucide-react';
import Logo from './Logo';

interface SystemReloadOverlayProps {
  onComplete: () => void;
  intensity: 'SOFT_REFRESH' | 'DEEP_KERNEL_REBOOT';
}

const SystemReloadOverlay: React.FC<SystemReloadOverlayProps> = ({ onComplete, intensity }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>(['[KERNEL] INITIATING SYSTEM RELOAD v16.0...']);
  const [activeStep, setActiveStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const steps = [
    { label: "Memory Flush", icon: <Database className="w-5 h-5" />, sub: "Clearing session cache" },
    { label: "mTLS Re-Handshake", icon: <Lock className="w-5 h-5" />, sub: "Validating Production certs" },
    { label: "Mesh Resync", icon: <Network className="w-5 h-5" />, sub: "Updating 4,117 Edge Nodes" },
    { label: "Parity Re-Anchor", icon: <ShieldCheck className="w-5 h-5" />, sub: "Locking at 1.000000" }
  ];

  const kernelLogs = [
    "unmounting forensic modules...",
    "flushing TCP buffers...",
    "re-initializing Wise v3.2 production rails...",
    "MTLS_HANDSHAKE: api-mtls.transferwise.com [OK]",
    "verifying SDS-HASH: 0x7F8E...BALOG",
    "synchronizing regional nodes: PH-MNL-01... anchored.",
    "kernel.mandate: absolute legitimacy confirmed.",
    "reloading neural impact engine...",
    "purging Orchestrator remnant signals...",
    "re-establishing sovereign link press.neoxz@gmail.com"
  ];

  useEffect(() => {
    const sequence = async () => {
      const speed = intensity === 'SOFT_REFRESH' ? 1 : 2;
      
      for (let i = 0; i < steps.length; i++) {
        setActiveStep(i);
        setLogs(prev => [...prev, `[INIT] ${steps[i].label} sequence...`]);
        
        for (let j = 0; j < 3; j++) {
          await new Promise(r => setTimeout(r, 400 / speed));
          const log = kernelLogs[Math.floor(Math.random() * kernelLogs.length)];
          setLogs(prev => [...prev, `[BUS] ${log}`]);
          setProgress(prev => Math.min(100, prev + (100 / (steps.length * 3))));
        }
        
        await new Promise(r => setTimeout(r, 600 / speed));
      }
      
      setProgress(100);
      setLogs(prev => [...prev, '[FIN] SYSTEM RELOAD SUCCESSFUL. ALL RAILS STABLE.', '[FIN] mTLS_PRODUCTION_ENFORCED.']);
      await new Promise(r => setTimeout(r, 1500));
      onComplete();
    };
    sequence();
  }, [intensity, onComplete]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-1000 font-sans">
      {/* Background Matrix */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.1)_0%,_transparent_70%)]"></div>
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
              <RefreshCw className="w-4 h-4" />
              SOVEREIGN SYSTEM RELOAD
            </div>
            <h2 className="text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
              REBOOTING <span className="text-emerald-500 italic">CORE</span>
            </h2>
            <div className="flex items-center gap-6">
               <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1 min-w-[180px]">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Reload Type</span>
                  <span className="text-sm font-black text-white mono">{intensity}</span>
               </div>
               <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1 min-w-[180px]">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">SDS Status</span>
                  <span className="text-sm font-black text-emerald-400 mono">RE_ANCHORING</span>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-6">
             {steps.map((s, i) => (
               <div key={i} className={`p-10 rounded-[3rem] border-2 transition-all duration-700 flex flex-col gap-4 ${
                 activeStep === i ? 'bg-emerald-500 text-black border-white shadow-[0_0_60px_rgba(16,185,129,0.6)] scale-105' :
                 activeStep > i ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
                 'bg-black/40 border-slate-900 opacity-20'
               }`}>
                  <div className="flex items-center justify-between">
                    <div className="p-4 rounded-2xl bg-black/20">
                       {activeStep > i ? <ShieldCheck className="w-8 h-8" /> : s.icon}
                    </div>
                    {activeStep === i && <Loader2 className="w-6 h-6 animate-spin" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black uppercase tracking-widest leading-tight">{s.label}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${activeStep === i ? 'text-black/60' : 'text-slate-500'}`}>{s.sub}</span>
                  </div>
               </div>
             ))}
          </div>

          <div className="space-y-6">
             <div className="flex items-center justify-between px-4">
                <span className="text-[11px] font-black uppercase tracking-widest text-emerald-500">System Convergence Progress</span>
                <span className="text-3xl font-black text-white mono">{progress.toFixed(0)}%</span>
             </div>
             <div className="h-6 w-full bg-slate-950 border-2 border-emerald-900/30 rounded-full overflow-hidden shadow-inner p-1 relative">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-600 via-white to-emerald-600 animate-[shimmer_0.1s_infinite_linear] bg-[length:200%_100%] transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(16,185,129,1)]"
                  style={{ width: `${progress}%` }}
                />
             </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8 h-full">
           <div 
             ref={scrollRef}
             className="flex-1 bg-black border border-slate-800 rounded-[3.5rem] p-10 font-mono text-[12px] text-emerald-400/80 space-y-3 overflow-y-auto custom-scrollbar shadow-2xl relative"
           >
              <div className="absolute top-6 right-10 text-[10px] text-slate-800 font-black uppercase">Kernel_Reload_Stream</div>
              {logs.map((log, i) => (
                <div key={i} className="animate-in slide-in-from-left-2 flex gap-4 border-b border-white/5 pb-3">
                  <span className="text-slate-800 font-black shrink-0">[{i.toString().padStart(3, '0')}]</span>
                  <span className="break-all">{log}</span>
                </div>
              ))}
              <div className="flex gap-4 items-center">
                <span className="animate-pulse bg-emerald-500 w-3 h-5" />
                <span className="text-white font-black animate-pulse">Synchronizing Kernels...</span>
              </div>
           </div>

           <div className="p-10 rounded-[3.5rem] bg-emerald-500/5 border border-emerald-500/10 flex flex-col gap-6 text-center">
              <div className="relative mx-auto group">
                 <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/40 transition-all animate-pulse" />
                 <Logo size={80} className="relative z-10" />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-black uppercase tracking-widest italic">
                "A system reload clears the digital fog and flushes rogue signal artifacts. Reality is rebooted into absolute 1:1 parity with the Founder's mandate."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SystemReloadOverlay;
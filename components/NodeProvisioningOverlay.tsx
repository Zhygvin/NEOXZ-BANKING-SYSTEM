
import React, { useState, useEffect } from 'react';
import { Cpu, Network, ShieldCheck, Zap, Radio, Loader2, Globe, Command, Fingerprint, Activity, Smartphone, Settings } from 'lucide-react';
// Added missing Logo import to resolve compilation error on line 144
import Logo from './Logo';

interface NodeProvisioningOverlayProps {
  nodeName: string;
  tier: string;
  onComplete: (id: string) => void;
}

const NodeProvisioningOverlay: React.FC<NodeProvisioningOverlayProps> = ({ nodeName, tier, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>(['[SYS] Initializing local hardware check...']);
  const [phase, setPhase] = useState(0);

  const phases = [
    { label: "Hardware Fingerprint", icon: <Fingerprint className="w-5 h-5" /> },
    { label: "Protocol Handshake", icon: <Radio className="w-5 h-5" /> },
    { label: "Reality Bridge Anchor", icon: <Network className="w-5 h-5" /> },
    { label: "Node Authorized", icon: <ShieldCheck className="w-5 h-5" /> }
  ];

  useEffect(() => {
    const sequence = async () => {
      // Phase 1: Hardware
      await new Promise(r => setTimeout(r, 800));
      setLog(prev => [...prev, `[HW] Screen: ${window.screen.width}x${window.screen.height}`, `[HW] User-Agent Verified.`]);
      setPhase(1);
      setProgress(25);

      // Phase 2: Handshake
      await new Promise(r => setTimeout(r, 1200));
      setLog(prev => [...prev, `[LINK] Syncing to global mesh...`, `[LINK] Latency: ${(Math.random() * 0.01).toFixed(4)}ms`]);
      setPhase(2);
      setProgress(50);

      // Phase 3: Bridge
      await new Promise(r => setTimeout(r, 1500));
      setLog(prev => [...prev, `[CORE] Anchoring Node ID: NEOX-NODE-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, `[CORE] Tier ${tier} Permissions Injected.`]);
      setPhase(3);
      setProgress(85);

      // Phase 4: Finalize
      await new Promise(r => setTimeout(r, 1000));
      setProgress(100);
      const nodeId = `NEOX-${nodeName.toUpperCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      setTimeout(() => onComplete(nodeId), 1000);
    };

    sequence();
  }, []);

  return (
    <div className="fixed inset-0 z-[4000] bg-black flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-500">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(6,182,212,0.15)_0%,_transparent_70%)]"></div>
        <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-cyan-500/20 animate-pulse" />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-center">
        <div className="lg:col-span-7 space-y-12">
          <header className="space-y-6">
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-cyan-600 text-white font-black uppercase tracking-[0.5em] text-[10px] shadow-2xl animate-pulse">
              <Cpu className="w-4 h-4" />
              NEOXZ NODE PROVISIONING
            </div>
            <h2 className="text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
              ANCHOR <span className="text-cyan-500 italic">DEVICE</span>
            </h2>
            <div className="flex items-center gap-6">
               <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1 min-w-[160px]">
                  <span className="text-[9px] text-slate-500 font-black uppercase">Terminal ID</span>
                  <span className="text-sm font-black text-white mono">{nodeName}</span>
               </div>
               <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1 min-w-[160px]">
                  <span className="text-[9px] text-slate-500 font-black uppercase">Authority Tier</span>
                  <span className="text-sm font-black text-cyan-400 mono">{tier}</span>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-4">
             {phases.map((p, i) => (
               <div key={i} className={`p-8 rounded-[2.5rem] border-2 transition-all duration-700 flex flex-col gap-4 ${
                 phase === i ? 'bg-cyan-500 text-black border-white shadow-[0_0_40px_rgba(34,211,238,0.5)] scale-105' :
                 phase > i ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
                 'bg-black/40 border-slate-900 opacity-20'
               }`}>
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-black/20">
                       {phase > i ? <ShieldCheck className="w-6 h-6" /> : p.icon}
                    </div>
                    {phase === i && <Loader2 className="w-5 h-5 animate-spin" />}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">{p.label}</span>
               </div>
             ))}
          </div>

          <div className="space-y-4">
             <div className="flex items-center justify-between px-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500">Device Displacement Progress</span>
                <span className="text-2xl font-black text-white mono">{progress}%</span>
             </div>
             <div className="h-4 w-full bg-slate-950 border border-slate-900 rounded-full overflow-hidden shadow-inner p-1">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-600 via-white to-cyan-600 animate-[shimmer_0.5s_infinite_linear] bg-[length:200%_100%] transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                  style={{ width: `${progress}%` }}
                />
             </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8 h-full">
           <div className="flex-1 bg-black border border-slate-800 rounded-[3rem] p-10 font-mono text-[11px] text-cyan-500/70 space-y-3 overflow-y-auto custom-scrollbar shadow-inner relative">
              <div className="absolute top-4 right-8 text-[9px] text-slate-800 font-black uppercase">Provisioning_Stream</div>
              {log.map((entry, i) => (
                <div key={i} className="animate-in slide-in-from-left-2 flex gap-4 border-b border-white/5 pb-2">
                  <span className="text-slate-800 font-black shrink-0">[{i}]</span>
                  <span className="break-all">{entry}</span>
                </div>
              ))}
              <div className="flex gap-2">
                <span className="animate-pulse bg-cyan-500 w-2 h-4"></span>
              </div>
           </div>

           <div className="p-8 rounded-[3rem] bg-cyan-500/5 border border-cyan-500/10 flex flex-col gap-6">
              <div className="flex items-center gap-5">
                 <Settings className="w-8 h-8 text-cyan-400 animate-spin-slow" />
                 <div className="flex flex-col">
                    <span className="text-[11px] font-black text-white uppercase tracking-widest">Sovereign OS v15.0</span>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest italic">Identity Anchoring Protocol</span>
                 </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-black uppercase tracking-tighter text-center">
                "Warning: Provisioning will tether this device's unique hardware hash to the NEOXZ Master Ledger. This action is immutable."
              </p>
           </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 flex items-center gap-6 opacity-40 grayscale">
         <Logo size={48} />
         <div className="h-8 w-[1px] bg-slate-800"></div>
         <div className="flex flex-col">
            <span className="text-[9px] font-black text-white uppercase">NEOXZ CORE</span>
            <span className="text-[8px] font-bold text-slate-500">MANDATE_SYSTEM_LINK</span>
         </div>
      </div>
    </div>
  );
};

export default NodeProvisioningOverlay;

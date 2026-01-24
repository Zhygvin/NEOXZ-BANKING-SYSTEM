
import React, { useState, useEffect } from 'react';
import { Rocket, Server, Globe, Zap, Cpu, ShieldCheck, Loader2, Network, Radio, Database, Cloud } from 'lucide-react';

interface GlobalDeploymentOverlayProps {
  onComplete: (link: string) => void;
  scope: string;
}

const GlobalDeploymentOverlay: React.FC<GlobalDeploymentOverlayProps> = ({ onComplete, scope }) => {
  const [phase, setPhase] = useState(0);
  const [syncedNodes, setSyncedNodes] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>(['[INIT] Sovereign Global Sync Engine v15.0 started.']);
  
  const phases = [
    { label: 'Layer 0: DNS/CDN Global Edge Optimization', icon: <Globe className="w-5 h-5" />, color: 'text-cyan-400' },
    { label: 'Layer 1: Distributed Ledger Node Handshake', icon: <Database className="w-5 h-5" />, color: 'text-blue-400' },
    { label: 'Layer 2: Sovereign Identity Parity Broadcast', icon: <ShieldCheck className="w-5 h-5" />, color: 'text-purple-400' },
    { label: 'Layer 3: Multi-Server Efficiency Calibration', icon: <Server className="w-5 h-5" />, color: 'text-emerald-400' },
    { label: 'Layer 4: Final Reality Mandate Manifestation', icon: <Rocket className="w-5 h-5" />, color: 'text-amber-400' }
  ];

  useEffect(() => {
    const sequence = async () => {
      for (let i = 0; i < phases.length; i++) {
        setPhase(i);
        setTerminalLogs(prev => [...prev, `[SYNC] Layer ${i}: ${phases[i].label} initiated...`]);
        
        // Simulate node syncing within each phase
        for (let j = 0; j < 10; j++) {
          await new Promise(r => setTimeout(r, 150));
          setSyncedNodes(prev => Math.min(4117, prev + Math.floor(Math.random() * 150) + 200));
        }
        
        setTerminalLogs(prev => [...prev, `[OK] Layer ${i} Synced across all server levels.`]);
        await new Promise(r => setTimeout(r, 600));
      }
      
      const manifestHash = `0x${Math.random().toString(16).substr(2, 24).toUpperCase()}`;
      onComplete(`https://neoxz.sh/manifest/${manifestHash}`);
    };
    sequence();
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-700">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.1)_0%,_transparent_70%)]"></div>
        <Network className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-emerald-500/20 animate-[spin_60s_linear_infinite]" />
      </div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-12 relative z-10">
        <div className="flex-1 space-y-12">
          <header className="space-y-4">
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black uppercase tracking-[0.4em] text-[10px]">
               <Zap className="w-4 h-4 animate-pulse" />
               Global Efficiency Broadcast
            </div>
            <h2 className="text-6xl font-black uppercase tracking-tighter text-white">
              SERVER <span className="text-emerald-500 italic">MANDATE</span>
            </h2>
            <div className="flex items-center gap-6 text-slate-500 font-mono text-xs">
               <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  SCOPE: {scope.replace(/_/g, ' ')}
               </span>
               <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  NODES_ACTIVE: {syncedNodes.toLocaleString()} / 4,117
               </span>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-4">
             {phases.map((p, i) => (
               <div key={i} className={`p-6 rounded-3xl border transition-all duration-700 flex items-center justify-between ${
                 phase === i ? 'bg-emerald-500/5 border-emerald-500/30 scale-105 shadow-[0_0_30px_rgba(16,185,129,0.1)]' :
                 phase > i ? 'bg-black/40 border-slate-800 opacity-60' : 'bg-black/20 border-slate-900 opacity-20'
               }`}>
                  <div className="flex items-center gap-6">
                     <div className={`p-3 rounded-2xl bg-black border ${phase >= i ? p.color.replace('text', 'border') + ' ' + p.color : 'border-slate-800 text-slate-700'}`}>
                        {p.icon}
                     </div>
                     <span className={`text-sm font-black uppercase tracking-widest ${phase >= i ? 'text-white' : 'text-slate-700'}`}>
                       {p.label}
                     </span>
                  </div>
                  {phase > i ? (
                    <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase">
                      <ShieldCheck className="w-4 h-4" />
                      Manifested
                    </div>
                  ) : phase === i ? (
                    <div className="flex items-center gap-3">
                       <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-75"></span>
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-150"></span>
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-300"></span>
                       </div>
                    </div>
                  ) : (
                    <div className="text-[10px] font-black text-slate-800 uppercase italic">Awaiting Sync</div>
                  )}
               </div>
             ))}
          </div>

          <div className="relative h-1 w-full bg-slate-900 rounded-full overflow-hidden">
             <div 
               className="h-full bg-gradient-to-r from-emerald-600 via-cyan-400 to-emerald-400 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
               style={{ width: `${((phase + 1) / phases.length) * 100}%` }}
             ></div>
          </div>
        </div>

        <div className="w-full lg:w-[400px] h-full flex flex-col gap-6">
          <div className="flex-1 bg-black/60 border border-slate-800 rounded-[2.5rem] p-8 font-mono text-[10px] text-emerald-500/80 space-y-3 overflow-y-auto custom-scrollbar shadow-inner">
             {terminalLogs.map((log, i) => (
               <div key={i} className="animate-in slide-in-from-left-2">
                 {log}
               </div>
             ))}
             <div className="flex gap-2">
                <span className="animate-pulse">_</span>
             </div>
          </div>
          
          <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 flex flex-col gap-4">
             <div className="flex items-center gap-4">
                <Cloud className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Global Cloud Parity</span>
             </div>
             <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter leading-relaxed">
               Broadcasting NEOXZ efficiency protocols to 4,117 globally distributed edge servers. Handshake latency verified at 0.001ms.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalDeploymentOverlay;

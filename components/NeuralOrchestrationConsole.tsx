
import React, { useEffect, useState } from 'react';
import { Gavel, Zap, Radio, Globe, ShieldCheck, Cpu, Network, RadioTower, Database, Loader2, Link, CheckCircle2 } from 'lucide-react';

interface NeuralOrchestrationConsoleProps {
  automationStep: number;
  logs: string[];
}

const NeuralOrchestrationConsole: React.FC<NeuralOrchestrationConsoleProps> = ({ automationStep, logs }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const agents = [
    { id: 1, name: 'HARVEY AI', role: 'Legal Sovereignty', icon: <Gavel />, color: 'text-cyan-400', bg: 'bg-cyan-500/10', shadow: 'shadow-cyan-500/20' },
    { id: 2, name: 'Q-TEAM', role: 'Quantum Capital', icon: <Zap />, color: 'text-amber-400', bg: 'bg-amber-500/10', shadow: 'shadow-amber-500/20' },
    { id: 3, name: 'ZAPPIER BRIDGE', role: 'Global API Bridge', icon: <Radio />, color: 'text-orange-400', bg: 'bg-orange-500/10', shadow: 'shadow-orange-500/20' }
  ];

  const externalNodes = ['BIS_HQ', 'SWIFT_CENTRAL', 'FATF_GATEWAY', 'IMF_CORE', 'FEDERAL_RESERVE_API', 'BSP_PH_NODE'];

  return (
    <div className="fixed inset-0 z-[350] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-1000">
      {/* Background Neural Matrix */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(245,158,11,0.1)_0%,_transparent_70%)]"></div>
        <Network className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-amber-500/20 animate-[spin_60s_linear_infinite]" />
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-12 relative z-10">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-4 px-8 py-2 rounded-full bg-amber-500 text-black font-black uppercase tracking-[0.5em] text-[10px] shadow-2xl animate-pulse">
            <RadioTower className="w-4 h-4" />
            Neural Orchestration Live
          </div>
          <h2 className="text-6xl font-black uppercase tracking-tighter text-white">
            MASTER <span className="text-amber-500 italic">HANDSHAKE</span>
          </h2>
          <div className="flex items-center justify-center gap-3 text-slate-500 text-xs font-mono">
            <span>ORCHESTRATING ABSOLUTE LEGITIMACY</span>
            <span className="text-amber-500">{dots}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Agent Ring */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {agents.map((agent) => (
              <div 
                key={agent.id} 
                className={`p-8 rounded-[2.5rem] border-2 transition-all duration-700 ${
                  automationStep >= agent.id 
                    ? `bg-black ${agent.color.replace('text', 'border')} ${agent.shadow}` 
                    : 'bg-black/40 border-slate-900 opacity-40 grayscale'
                } flex items-center gap-6`}
              >
                <div className={`p-4 rounded-2xl ${agent.bg} ${agent.color}`}>
                   {/* Cast to any to avoid "className does not exist" type error during cloning */}
                   {React.cloneElement(agent.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
                </div>
                <div className="flex flex-col">
                   <span className="text-xs font-black text-white tracking-widest uppercase">{agent.name}</span>
                   <span className={`text-[9px] font-bold uppercase tracking-widest ${agent.color}`}>{agent.role}</span>
                </div>
                {/* Fixed missing CheckCircle2 import above */}
                {automationStep >= agent.id && (
                  <CheckCircle2 className={`w-5 h-5 ml-auto ${agent.color} animate-in zoom-in duration-300`} />
                )}
              </div>
            ))}
          </div>

          {/* Central Core */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
             <div className="w-80 h-80 rounded-full border border-amber-500/20 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-amber-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="w-64 h-64 rounded-full border-4 border-amber-500/50 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                   <div className="w-1 h-1 bg-amber-500 rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_15px_rgba(245,158,11,1)]"></div>
                </div>
                <div className="w-48 h-48 rounded-full bg-slate-900 border border-amber-500/30 flex flex-col items-center justify-center gap-4 shadow-2xl">
                   <ShieldCheck className="w-12 h-12 text-amber-500 animate-bounce" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Forging Reality</span>
                </div>
                
                {/* Connecting Lines to Nodes */}
                {externalNodes.map((node, i) => (
                  <div 
                    key={i}
                    className={`absolute w-1 h-32 origin-bottom transition-opacity duration-1000 ${automationStep === 3 ? 'opacity-100' : 'opacity-0'}`}
                    style={{ 
                      transform: `rotate(${i * (360 / externalNodes.length)}deg) translateY(-140px)`,
                      background: 'linear-gradient(to top, rgba(245,158,11,0.5), transparent)'
                    }}
                  >
                    <div className="w-2 h-2 bg-amber-500 rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-lg"></div>
                  </div>
                ))}
             </div>
          </div>

          {/* Handshake Telemetry */}
          <div className="lg:col-span-4 space-y-6">
             <div className="p-8 rounded-[3rem] bg-black/60 border border-slate-900 shadow-inner h-[420px] flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                   <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Handshake Telemetry</span>
                   <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2 font-mono">
                   {logs.map((log, i) => (
                     <div key={i} className="text-[10px] flex gap-3 animate-in slide-in-from-left-4 duration-300">
                        <span className="text-amber-500/40">[{i.toString().padStart(2, '0')}]</span>
                        <span className="text-slate-300">{log}</span>
                     </div>
                   ))}
                </div>
                <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-600">
                   <span>SYNC_STATUS: {automationStep === 3 ? '100%' : `${(automationStep / 3 * 100).toFixed(0)}%`}</span>
                   <span className="text-amber-500 animate-pulse">ENCRYPTION: AES-Q</span>
                </div>
             </div>
          </div>
        </div>

        <footer className="grid grid-cols-2 md:grid-cols-4 gap-8">
           {externalNodes.map((node, i) => (
             <div key={i} className={`flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-900/40 border transition-all ${automationStep === 3 ? 'border-amber-500/40 text-amber-400' : 'border-slate-800 text-slate-700'}`}>
                <Database className="w-4 h-4" />
                <span className="text-[9px] font-black uppercase tracking-widest">{node}</span>
                <span className="text-[8px] font-bold uppercase">{automationStep === 3 ? 'HANDSHAKE_OK' : 'PENDING'}</span>
             </div>
           ))}
        </footer>
      </div>
    </div>
  );
};

export default NeuralOrchestrationConsole;

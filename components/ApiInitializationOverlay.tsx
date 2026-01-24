
import React, { useState, useEffect } from 'react';
import { Terminal, ShieldCheck, Zap, Globe, Cpu, Loader2, Network, Radio, Database, Code, Key, Braces } from 'lucide-react';
import Logo from './Logo';

interface ApiInitializationOverlayProps {
  onComplete: (apiKey: string) => void;
  tier: string;
}

const ApiInitializationOverlay: React.FC<ApiInitializationOverlayProps> = ({ onComplete, tier }) => {
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState<string[]>(['[CORE] API INITIALIZATION v16.0 STAGED...']);

  const steps = [
    { label: "Building Endpoint Mesh", icon: <Network className="w-5 h-5" /> },
    { label: "Injecting Wise v3.2 Rails", icon: <Database className="w-5 h-5" /> },
    { label: "Generating Authorization Key", icon: <Key className="w-5 h-5" /> },
    { label: "Opening Sovereign Gateway", icon: <Globe className="w-5 h-5" /> }
  ];

  const subLogs = [
    "Provisioning HTTPS/WSS dual-stacks...",
    "Handshaking with Wise Sandbox v3.2...",
    "Authorizing multi-currency vault access...",
    "Computing HMAC-Q512 signature hash...",
    "Registering neoxz.api.sovereign gateway...",
    "Finalizing SDS Immutability Anchor..."
  ];

  useEffect(() => {
    const sequence = async () => {
      for (let i = 0; i < steps.length; i++) {
        setActiveStep(i);
        setLogs(prev => [...prev, `[INIT] ${steps[i].label} initiated...`]);
        
        for (let j = 0; j < 3; j++) {
          await new Promise(r => setTimeout(r, 400));
          const log = subLogs[Math.floor(Math.random() * subLogs.length)];
          setLogs(prev => [...prev, `[BUS] ${log}`]);
          setProgress(prev => Math.min(100, prev + 8));
        }
        
        setLogs(prev => [...prev, `[OK] ${steps[i].label} Verified.`]);
        await new Promise(r => setTimeout(r, 600));
      }
      
      setProgress(100);
      await new Promise(r => setTimeout(r, 1200));
      const mockKey = `NX_${Math.random().toString(36).substr(2, 12).toUpperCase()}_${tier}`;
      onComplete(mockKey);
    };
    sequence();
  }, []);

  return (
    <div className="fixed inset-0 z-[9500] bg-black flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-500 font-sans">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(34,211,238,0.15)_0%,_transparent_70%)]"></div>
        <div className="grid grid-cols-20 h-full opacity-10">
           {Array.from({ length: 200 }).map((_, i) => (
             <div key={i} className="border-r border-cyan-500/10 h-full w-full animate-pulse" style={{ animationDelay: `${i * 20}ms` }} />
           ))}
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-center">
        <div className="lg:col-span-7 space-y-12">
          <header className="space-y-6">
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-cyan-500 text-black font-black uppercase tracking-[0.5em] text-[10px] shadow-[0_0_50px_rgba(34,211,238,0.4)] animate-pulse">
              <Code className="w-4 h-4" />
              NEOXZ API CORE CREATION
            </div>
            <h2 className="text-7xl font-black uppercase tracking-tighter text-white leading-none">
              SOVEREIGN <span className="text-cyan-400 italic">API RAILS</span>
            </h2>
            <div className="flex items-center gap-4">
               <div className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <Braces className="w-4 h-4 text-cyan-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol: JSON/REST v3.2</span>
               </div>
               <div className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Auth: SOVEREIGN_MANDATE</span>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-6">
             {steps.map((s, i) => (
               <div key={i} className={`p-10 rounded-[3rem] border-2 transition-all duration-700 flex flex-col gap-4 ${
                 activeStep === i ? 'bg-cyan-500 text-black border-white shadow-[0_0_60px_rgba(34,211,238,0.6)] scale-105' :
                 activeStep > i ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
                 'bg-black/40 border-slate-900 opacity-20'
               }`}>
                  <div className="flex items-center justify-between">
                    <div className="p-4 rounded-2xl bg-black/20">
                       {activeStep > i ? <ShieldCheck className="w-8 h-8" /> : s.icon}
                    </div>
                    {activeStep === i && <Loader2 className="w-6 h-6 animate-spin" />}
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest leading-tight">{s.label}</span>
               </div>
             ))}
          </div>

          <div className="space-y-6">
             <div className="flex items-center justify-between px-4">
                <span className="text-[11px] font-black uppercase tracking-widest text-cyan-500">API Manifest Synthesis</span>
                <span className="text-3xl font-black text-white mono">{progress}%</span>
             </div>
             <div className="h-6 w-full bg-slate-950 border-2 border-slate-800 rounded-full overflow-hidden shadow-inner p-1 relative">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-600 via-white to-cyan-600 animate-[shimmer_0.3s_infinite_linear] bg-[length:200%_100%] transition-all duration-300 rounded-full shadow-[0_0_25px_rgba(34,211,238,1)]"
                  style={{ width: `${progress}%` }}
                />
             </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8 h-full">
           <div className="flex-1 bg-black border border-slate-800 rounded-[3.5rem] p-10 font-mono text-[12px] text-cyan-400/80 space-y-3 overflow-y-auto custom-scrollbar shadow-2xl relative">
              <div className="absolute top-6 right-10 text-[10px] text-slate-800 font-black uppercase">Endpoint_Generation</div>
              {logs.map((log, i) => (
                <div key={i} className="animate-in slide-in-from-left-2 flex gap-4 border-b border-white/5 pb-3">
                  <span className="text-slate-800 font-black shrink-0">[{i}]</span>
                  <span className="break-all">{log}</span>
                </div>
              ))}
              <div className="flex gap-4 items-center">
                <span className="animate-pulse bg-cyan-500 w-3 h-5" />
                <span className="text-white font-black animate-pulse">Building Sovereign Gateway...</span>
              </div>
           </div>

           <div className="p-10 rounded-[3.5rem] bg-cyan-500/5 border border-cyan-500/10 flex flex-col gap-6 text-center">
              <div className="relative mx-auto group">
                 <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/40 transition-all animate-pulse" />
                 <Logo size={80} className="relative z-10" />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-black uppercase tracking-widest italic">
                "Initializing the NEOXZ API anchors the mandate to the global developer mesh. Programmatic displacement of $985B capital is now imminent."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ApiInitializationOverlay;

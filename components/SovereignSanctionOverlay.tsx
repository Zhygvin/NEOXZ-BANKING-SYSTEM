
import React, { useState, useEffect } from 'react';
import { Skull, Target, Zap, ShieldAlert, Crosshair, Search, Trash2, ShieldCheck, Activity } from 'lucide-react';

interface SovereignSanctionOverlayProps {
  target: string;
  onComplete: () => void;
}

const SovereignSanctionOverlay: React.FC<SovereignSanctionOverlayProps> = ({ target, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [glitch, setGlitch] = useState(false);

  const phases = [
    { label: "Isolating Digital Footprints", icon: <Search className="w-5 h-5" /> },
    { label: "Neutralizing Proxy Nodes", icon: <Target className="w-5 h-5" /> },
    { label: "Incinerating Identity Metadata", icon: <Trash2 className="w-5 h-5" /> },
    { label: "Systemic Sanction Anchored", icon: <ShieldCheck className="w-5 h-5" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1500);
          return 100;
        }
        const next = prev + 1;
        if (next === 25) setPhase(1);
        if (next === 50) setPhase(2);
        if (next === 85) setPhase(3);
        return next;
      });
    }, 60);

    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[3000] bg-black flex items-center justify-center p-12 overflow-hidden transition-all duration-300 ${glitch ? 'scale-[1.02] bg-rose-950/20' : ''}`}>
      {/* Background FX */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(244,63,94,0.15)_0%,_transparent_70%)]"></div>
        <div className="grid grid-cols-12 h-full opacity-30">
           {Array.from({ length: 120 }).map((_, i) => (
             <div key={i} className="border border-rose-500/10 h-12 w-full"></div>
           ))}
        </div>
      </div>

      <div className="w-full max-w-4xl space-y-16 relative z-10">
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-rose-600 text-black font-black uppercase tracking-[0.5em] text-xs shadow-[0_0_50px_rgba(244,63,94,0.5)] animate-pulse">
            <ShieldAlert className="w-6 h-6" />
            FORENSIC SANCTION ACTIVE
          </div>
          
          <div className="relative group">
             <div className="absolute inset-[-60px] bg-rose-500/20 rounded-full blur-[100px] animate-ping"></div>
             <Skull className="w-48 h-48 mx-auto text-rose-500 drop-shadow-[0_0_30px_rgba(244,63,94,0.8)]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-5xl font-black uppercase tracking-tighter text-white">TARGET ISOLATION</h2>
            <div className="flex items-center justify-center gap-4 text-rose-400 font-mono text-2xl tracking-[0.2em] bg-rose-500/5 px-10 py-3 rounded-3xl border border-rose-500/20">
               <Crosshair className="w-8 h-8 animate-spin" />
               {target}
            </div>
          </div>
        </header>

        <div className="space-y-10">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {phases.map((p, i) => (
                <div key={i} className={`p-6 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col items-center gap-4 ${
                  phase === i ? 'bg-rose-500 text-black border-white shadow-[0_0_40px_rgba(244,63,94,0.6)] scale-105' :
                  phase > i ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
                  'bg-black/40 border-slate-900 opacity-20'
                }`}>
                   <div className="p-3 rounded-2xl bg-black/20">
                      {phase > i ? <ShieldCheck className="w-6 h-6" /> : p.icon}
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight">{p.label}</span>
                </div>
              ))}
           </div>

           <div className="space-y-4">
              <div className="flex items-center justify-between px-4">
                 <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Sanction Completeness Index</span>
                 <span className="text-xl font-black text-white mono">{progress}%</span>
              </div>
              <div className="h-4 w-full bg-slate-950 border border-slate-900 rounded-full overflow-hidden shadow-inner relative p-1">
                 <div 
                   className="h-full bg-gradient-to-r from-rose-600 via-rose-400 to-rose-600 animate-[shimmer_0.5s_infinite_linear] bg-[length:200%_100%] transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(244,63,94,0.8)]"
                   style={{ width: `${progress}%` }}
                 />
                 {/* Scanning Sweep Effect */}
                 <div className="absolute inset-0 bg-white/20 w-12 h-full skew-x-[45deg] animate-[shimmer_1.5s_infinite_linear]"></div>
              </div>
           </div>
        </div>

        <footer className="flex flex-col items-center gap-4 pt-12">
           <div className="flex items-center gap-4 text-slate-500 uppercase tracking-[0.5em] text-[10px] font-black">
              <Activity className="w-4 h-4 text-rose-500" />
              NEOXZ FORENSIC Q-TEAM OVERRIDE
           </div>
           <p className="text-xs text-rose-500/60 font-mono italic max-w-xl text-center">
             "Identity incinerated. All systemic access for {target} has been permanently severed and metadata scrubbed from the global ledger."
           </p>
        </footer>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-12 left-12 w-24 h-24 border-t-4 border-l-4 border-rose-500/30"></div>
      <div className="absolute top-12 right-12 w-24 h-24 border-t-4 border-r-4 border-rose-500/30"></div>
      <div className="absolute bottom-12 left-12 w-24 h-24 border-b-4 border-l-4 border-rose-500/30"></div>
      <div className="absolute bottom-12 right-12 w-24 h-24 border-b-4 border-r-4 border-rose-500/30"></div>
    </div>
  );
};

export default SovereignSanctionOverlay;

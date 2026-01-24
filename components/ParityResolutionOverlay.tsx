
import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Activity, ShieldCheck, RefreshCw, Orbit, Tornado } from 'lucide-react';
import Logo from './Logo';

interface ParityResolutionOverlayProps {
  onComplete: () => void;
  intensity: 'STANDARD' | 'FORCED_OVERRIDE';
}

const ParityResolutionOverlay: React.FC<ParityResolutionOverlayProps> = ({ onComplete, intensity }) => {
  const [progress, setProgress] = useState(0);
  const [driftValue, setDriftValue] = useState(0.998421);
  const [status, setStatus] = useState('Detecting Drift...');

  useEffect(() => {
    const sequence = async () => {
      // Step 1: Initialize
      await new Promise(r => setTimeout(r, 800));
      setStatus('Engaging NEOXZ Core...');
      
      // Step 2: Recalibrate (Accelerating)
      const steps = intensity === 'FORCED_OVERRIDE' ? 100 : 60;
      for (let i = 0; i <= steps; i++) {
        const factor = i / steps;
        setProgress(factor * 100);
        setDriftValue(0.998421 + (1.0 - 0.998421) * factor);
        
        if (i === 10) setStatus('Computing Reality Delta...');
        if (i === 40) setStatus('Inhibiting Vector Leakage...');
        if (i === 80) setStatus('Locking Parity Index...');
        
        await new Promise(r => setTimeout(r, intensity === 'FORCED_OVERRIDE' ? 30 : 60));
      }

      setStatus('REALITY_SYNC_OK');
      await new Promise(r => setTimeout(r, 1200));
      onComplete();
    };
    sequence();
  }, [intensity, onComplete]);

  return (
    <div className="fixed inset-0 z-[9000] bg-black flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-500 font-sans">
      {/* Background Visuals */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.15)_0%,_transparent_70%)] animate-pulse"></div>
        <Orbit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] text-emerald-500/10 animate-[spin_10s_linear_infinite]" />
      </div>

      <div className="w-full max-w-4xl space-y-16 relative z-10 text-center">
        <div className="relative group mx-auto w-fit">
           <div className="absolute inset-[-60px] bg-emerald-500/20 rounded-full blur-[100px] animate-ping"></div>
           <div className="p-10 rounded-full bg-black border-4 border-emerald-500 shadow-[0_0_100px_rgba(16,185,129,0.4)] relative z-10">
              <Logo size={140} className="animate-pulse" />
           </div>
           <div className="absolute -top-4 -right-4 p-5 bg-emerald-500 rounded-3xl shadow-2xl z-20 animate-bounce">
              <Zap className="w-10 h-10 text-black fill-black" />
           </div>
        </div>

        <div className="space-y-4">
           <div className="inline-flex items-center gap-4 px-10 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black uppercase tracking-[0.5em] text-xs">
              <Cpu className="w-5 h-5" />
              NEOXZ AI REALITY STABILIZER
           </div>
           <h2 className="text-7xl font-black uppercase tracking-tighter text-white leading-none">
             PARITY <span className="text-emerald-500 italic">RESOLUTION</span>
           </h2>
        </div>

        <div className="bg-black/60 border border-emerald-500/20 rounded-[3rem] p-12 space-y-8 shadow-2xl backdrop-blur-xl">
           <div className="flex items-center justify-between">
              <div className="flex flex-col items-start text-left">
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500">Live Index Tuning</span>
                 <span className={`text-[12px] font-mono mt-1 ${progress === 100 ? 'text-emerald-400' : 'text-amber-400 animate-pulse'}`}>
                   {status}
                 </span>
              </div>
              <div className="text-right">
                 <span className="text-5xl font-black text-white mono tracking-tighter glow-emerald">
                   {driftValue.toFixed(6)}
                 </span>
              </div>
           </div>

           <div className="space-y-4">
              <div className="h-4 w-full bg-slate-950 border border-slate-900 rounded-full overflow-hidden shadow-inner p-1">
                 <div 
                   className="h-full bg-gradient-to-r from-emerald-600 via-white to-emerald-600 animate-[shimmer_0.2s_infinite_linear] bg-[length:200%_100%] transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                   style={{ width: `${progress}%` }}
                 />
              </div>
              <div className="flex justify-between text-[9px] font-black text-slate-700 uppercase tracking-widest px-2">
                 <span>System_Drift_ID: 0x84...21</span>
                 <span>Convergence_Factor: {intensity}</span>
              </div>
           </div>
        </div>

        <div className="flex items-center justify-center gap-12 text-[10px] font-black text-emerald-500/40 uppercase tracking-[0.6em]">
           <Activity className="w-5 h-5" />
           Quantum Tether Locked
           <ShieldCheck className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default ParityResolutionOverlay;


import React, { useState, useEffect } from 'react';
import { Activity, Zap, ShieldCheck, Globe, Server, Cpu, TrendingUp } from 'lucide-react';

const StabilityMonitor: React.FC = () => {
  const [parity, setParity] = useState(0.999982);
  const [efficiency, setEfficiency] = useState(98.4);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setParity(prev => Math.min(1.0, prev + (Math.random() * 0.000005 - 0.000002)));
      setEfficiency(prev => Math.min(100, Math.max(98, prev + (Math.random() * 0.4 - 0.2))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900/40 border border-emerald-500/20 rounded-[3rem] p-10 space-y-8 shadow-3xl relative overflow-hidden backdrop-blur-3xl group transition-all hover:border-emerald-500/40">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Activity className="w-48 h-48 text-emerald-500" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-5">
          <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20">
            <TrendingUp className="w-8 h-8 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white">Efficiency Parity Monitor</h3>
            <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase italic">POST-DEPLOYMENT STABILITY</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
           <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">REAL-TIME</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-4">
           <div className="flex items-center justify-between">
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Global Parity</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
           </div>
           <div className="flex flex-col">
              <span className="text-3xl font-black text-white mono tracking-tighter">{parity.toFixed(6)}</span>
              <div className="h-1 w-full bg-slate-900 rounded-full mt-3 overflow-hidden">
                 <div className="h-full bg-emerald-500" style={{ width: `${parity * 100}%` }}></div>
              </div>
           </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-4">
           <div className="flex items-center justify-between">
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Compute Efficiency</span>
              <Zap className="w-4 h-4 text-amber-400" />
           </div>
           <div className="flex flex-col">
              <span className="text-3xl font-black text-white mono tracking-tighter">{efficiency.toFixed(1)}%</span>
              <div className="h-1 w-full bg-slate-900 rounded-full mt-3 overflow-hidden">
                 <div className="h-full bg-amber-500" style={{ width: `${efficiency}%` }}></div>
              </div>
           </div>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
         <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-3">
            <Globe className="w-4 h-4" />
            Global Node Stabilization
         </h5>
         <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-8 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center">
                 <div className={`w-1.5 h-1.5 rounded-full ${i < 10 ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
              </div>
            ))}
         </div>
      </div>

      <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
         <p className="text-[9px] text-slate-500 leading-relaxed font-black uppercase tracking-tighter text-center italic">
           "Stability verified. All global server levels are operating at peak NEOXZ mandate efficiency."
         </p>
      </div>
    </div>
  );
};

export default StabilityMonitor;

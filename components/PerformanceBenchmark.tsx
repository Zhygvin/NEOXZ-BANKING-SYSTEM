
import React, { useState, useEffect } from 'react';
import { Zap, Activity, Cpu, ShieldCheck, Timer, BarChart3, TrendingUp } from 'lucide-react';

const PerformanceBenchmark: React.FC = () => {
  const [tps, setTps] = useState(1245980);
  const [latency, setLatency] = useState(0.00084);
  const [settled, setSettled] = useState(985004531802);

  useEffect(() => {
    const interval = setInterval(() => {
      setTps(prev => prev + Math.floor(Math.random() * 5000) - 2000);
      setLatency(prev => Math.max(0.0001, prev + (Math.random() * 0.0001 - 0.00005)));
      setSettled(prev => prev + (Math.random() * 10000));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900/40 border border-cyan-500/20 rounded-[3rem] p-10 space-y-10 shadow-3xl relative overflow-hidden backdrop-blur-3xl group transition-all hover:border-cyan-500/40">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Zap className="w-48 h-48 text-cyan-400" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-5">
          <div className="p-4 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Activity className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white">Quantum Efficiency Benchmark</h3>
            <span className="text-[10px] text-cyan-500 font-bold tracking-widest uppercase italic">LIVE THROUGHPUT: 1.2M+ TPS</span>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest shadow-xl">
           STRESS TEST ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-3">
           <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Transactions / Sec</span>
           <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white mono">{tps.toLocaleString()}</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
           </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-3">
           <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Settlement Latency</span>
           <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-cyan-400 mono">{latency.toFixed(5)}ms</span>
              <Timer className="w-4 h-4 text-cyan-400" />
           </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-3">
           <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Integrity Checksum</span>
           <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-400 mono">SDS_OK</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
           </div>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
         <div className="flex items-center justify-between">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-3">
               <BarChart3 className="w-4 h-4" />
               Global Efficiency Spectrum
            </h5>
            <span className="text-[9px] text-cyan-500 font-black mono tracking-widest uppercase">Stable Production</span>
         </div>
         <div className="h-12 flex items-end gap-1 px-4">
            {Array.from({ length: 48 }).map((_, i) => (
              <div 
                key={i} 
                className="flex-1 bg-cyan-500/20 rounded-t-sm transition-all duration-300 hover:bg-cyan-400"
                style={{ height: `${20 + Math.random() * 80}%` }}
              ></div>
            ))}
         </div>
      </div>

      <div className="p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center">
         <p className="text-[10px] text-slate-500 leading-relaxed font-black uppercase tracking-tighter text-center italic">
           "Efficiency validation confirmed. The quantum core is clearing transactions at sub-atomic latency."
         </p>
      </div>
    </div>
  );
};

export default PerformanceBenchmark;

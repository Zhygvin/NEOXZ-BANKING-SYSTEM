
import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Zap, Globe, Cpu, Radio, Network, Scale, RefreshCw, AlertTriangle } from 'lucide-react';

interface SystemParityMonitorProps {
  parity: number;
}

const SystemParityMonitor: React.FC<SystemParityMonitorProps> = ({ parity }) => {
  const [pulse, setPulse] = useState(false);
  const [history, setHistory] = useState<number[]>(new Array(20).fill(1.0));
  const isDrifting = parity < 1.0;

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
      setHistory(prev => {
        const next = [...prev.slice(1), parity + (Math.random() * 0.00001 - 0.000005)];
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [parity]);

  return (
    <div className={`bg-slate-900/60 border ${isDrifting ? 'border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.1)]' : 'border-emerald-500/20'} rounded-[3rem] p-10 shadow-3xl relative overflow-hidden backdrop-blur-3xl group transition-all hover:border-emerald-500/40`}>
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Scale className={`w-48 h-48 ${isDrifting ? 'text-amber-500' : 'text-emerald-500'}`} />
      </div>

      <div className="flex items-center justify-between relative z-10 mb-10">
        <div className="flex items-center gap-6 text-emerald-400">
          <div className={`p-4 rounded-[2rem] ${isDrifting ? 'bg-amber-500/10 border-amber-500/30' : 'bg-emerald-500/10 border-2 border-emerald-500/30'} shadow-[0_0_30px_rgba(16,185,129,0.2)]`}>
            {isDrifting ? <AlertTriangle className="w-8 h-8 text-amber-500 animate-pulse" /> : <Radio className={`w-8 h-8 ${pulse ? 'animate-pulse' : ''}`} />}
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-[0.4em] text-white leading-none">System Parity Lock</h3>
            <span className={`text-[10px] font-bold tracking-widest uppercase italic mt-1 block ${isDrifting ? 'text-amber-500 animate-pulse' : 'text-emerald-500'}`}>
              {isDrifting ? 'REALITY_DRIFT_DETECTED' : 'Reality Alignment: 1:1 Production'}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
           <div className={`px-4 py-1.5 rounded-full ${isDrifting ? 'bg-amber-500' : 'bg-emerald-500'} text-black text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              {isDrifting ? 'DRIFT_CONTAINED' : 'ABSOLUTE LEGITIMACY'}
           </div>
           <span className="text-[8px] font-mono text-slate-500 mr-2 uppercase">SDS_VERIFIED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        <div className="lg:col-span-5 space-y-6">
           <div className={`p-10 rounded-[3rem] bg-black/80 border-2 ${isDrifting ? 'border-amber-500/30 shadow-[inner_0_0_20px_rgba(245,158,11,0.2)]' : 'border-slate-800'} shadow-inner text-center relative overflow-hidden group/metric`}>
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity"></div>
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2 block relative z-10">Reality Parity Index</span>
              <div className={`text-6xl font-black mono tracking-tighter relative z-10 ${isDrifting ? 'text-amber-400' : 'text-white glow-emerald'}`}>
                {parity.toFixed(6)}
              </div>
              <div className="mt-8 flex justify-center gap-1.5 relative z-10">
                 {history.map((val, i) => (
                   <div 
                    key={i} 
                    className={`w-1.5 rounded-full flex flex-col justify-end h-12 overflow-hidden ${isDrifting ? 'bg-amber-500/10' : 'bg-emerald-500/20'}`}
                   >
                      <div 
                        className={`w-full transition-all duration-1000 ${isDrifting ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                        style={{ height: `${(val / 1.0) * 100}%` }}
                      ></div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
           <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-[2rem] bg-black/40 border border-slate-800 space-y-3">
                 <div className="flex items-center justify-between">
                    <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Network Load</span>
                    <Activity className="w-4 h-4 text-cyan-400" />
                 </div>
                 <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white mono">0.02%</span>
                    <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Optimized</span>
                 </div>
                 <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 w-[2%]"></div>
                 </div>
              </div>
              <div className="p-6 rounded-[2rem] bg-black/40 border border-slate-800 space-y-3">
                 <div className="flex items-center justify-between">
                    <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Bridge Latency</span>
                    <Zap className="w-4 h-4 text-amber-400" />
                 </div>
                 <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white mono">0.001ms</span>
                    <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest">Quantum</span>
                 </div>
                 <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-full animate-pulse"></div>
                 </div>
              </div>
           </div>

           <div className={`p-8 rounded-[2.5rem] ${isDrifting ? 'bg-amber-500/10 border-amber-500/30' : 'bg-emerald-500/5 border border-emerald-500/10'} flex items-center justify-between group/info transition-all hover:bg-opacity-20`}>
              <div className="flex items-center gap-6">
                 <div className={`p-4 rounded-2xl bg-black border ${isDrifting ? 'border-amber-500/20 text-amber-400' : 'border-emerald-500/20 text-emerald-500'} group-hover/info:scale-110 transition-transform`}>
                    <Network className="w-6 h-6" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-sm font-black text-white uppercase tracking-widest">Global Mesh Synchronized</span>
                    <span className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${isDrifting ? 'text-amber-500/80' : 'text-slate-500'}`}>
                      {isDrifting ? 'DRIFT_INDEX: 0.001579 ERROR' : '4,117 Nodes Reporting at 1.000000 Integrity'}
                    </span>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <span className={`text-[10px] font-mono font-black ${isDrifting ? 'text-amber-500' : 'text-emerald-400'}`}>PH_MNL_LOCKED</span>
                 <div className={`w-2 h-2 rounded-full ${isDrifting ? 'bg-amber-500 animate-bounce' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]'}`}></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SystemParityMonitor;

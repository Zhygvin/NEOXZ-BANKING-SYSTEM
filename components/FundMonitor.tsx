
import React from 'react';
import { Activity, ArrowRight, CircleDot, CheckCircle2, Navigation, Zap, ShieldAlert } from 'lucide-react';
import { TrackedTransaction } from '../types';

interface FundMonitorProps {
  transactions: TrackedTransaction[];
  onTriggerSignal?: (tx: TrackedTransaction) => void;
}

const FundMonitor: React.FC<FundMonitorProps> = ({ transactions, onTriggerSignal }) => {
  return (
    <div className="bg-slate-900/40 border border-emerald-500/20 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col h-full group">
      <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
        <Navigation className="w-32 h-32 text-emerald-500" />
      </div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Activity className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">Live Fund Tracking</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[9px] text-emerald-500/60 font-black uppercase tracking-widest animate-pulse">Syncing Rails</span>
        </div>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-1 relative z-10">
        {transactions.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-4 py-12">
            <CircleDot className="w-10 h-10 animate-ping text-slate-500" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">No Active Displacement</p>
          </div>
        ) : (
          transactions.map((tx) => (
            <div key={tx.id} className="space-y-4 p-4 rounded-2xl bg-slate-950/40 border border-slate-800 hover:border-emerald-500/30 transition-all group/item">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-emerald-400 mono">TX-{tx.id}</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tight">{tx.platform} → {tx.destination}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-white mono">${tx.amount.toLocaleString()}</span>
                  <div className={`text-[8px] font-black uppercase tracking-widest ${tx.status === 'AWAITING_SIGNAL' ? 'text-amber-500 animate-pulse' : 'text-emerald-500'}`}>
                    {tx.status}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`absolute top-0 left-0 h-full transition-all duration-1000 ${
                    tx.status === 'AWAITING_SIGNAL' ? 'bg-amber-500/50' : 'bg-gradient-to-r from-emerald-600 to-cyan-400'
                  }`}
                  style={{ width: `${tx.progress}%` }}
                />
              </div>

              {/* Hops Visualizer */}
              <div className="flex items-center justify-between gap-1">
                {tx.hops.map((hop, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center gap-1.5 min-w-[60px]">
                      <div className={`w-2 h-2 rounded-full border-2 transition-all ${
                        hop.status === 'COMPLETED' ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                        hop.status === 'AWAITING_SIGNAL' ? 'bg-amber-500 border-amber-400 animate-ping' :
                        hop.status === 'ACTIVE' ? 'bg-emerald-500/20 border-emerald-500 animate-pulse' :
                        'bg-slate-900 border-slate-700'
                      }`} />
                      <span className={`text-[8px] font-black uppercase tracking-tight text-center truncate w-full ${
                        hop.status === 'COMPLETED' ? 'text-slate-200' : 
                        hop.status === 'AWAITING_SIGNAL' ? 'text-amber-500' : 'text-slate-600'
                      }`}>
                        {hop.node}
                      </span>
                    </div>
                    {i < tx.hops.length - 1 && (
                      <div className="flex-1 h-[1px] bg-slate-800 mt-[-10px]"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {tx.status === 'AWAITING_SIGNAL' && onTriggerSignal && (
                 <button 
                   onClick={() => onTriggerSignal(tx)}
                   className="w-full mt-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-[0.2em] text-[9px] flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                 >
                   <Zap className="w-3.5 h-3.5" />
                   Issue Master Signal
                 </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FundMonitor;

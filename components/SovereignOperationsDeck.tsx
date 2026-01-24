
import React from 'react';
import { 
  Zap, ShieldCheck, Activity, Globe, Cpu, 
  Settings, Terminal, HardDrive, Network,
  BarChart3, SearchCheck, RefreshCw, Radio
} from 'lucide-react';

interface SovereignOperationsDeckProps {
  onTriggerAudit: () => void;
  onRecalibrateParity: () => void;
  isProcessing: boolean;
  isRecalibrating: boolean;
  stats: any;
}

const SovereignOperationsDeck: React.FC<SovereignOperationsDeckProps> = ({ 
  onTriggerAudit, 
  onRecalibrateParity,
  isProcessing, 
  isRecalibrating,
  stats 
}) => {
  return (
    <div className="bg-slate-900/40 border border-emerald-500/20 rounded-[3.5rem] p-10 shadow-3xl backdrop-blur-3xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-1000">
        <Settings className="w-96 h-96 animate-[spin_30s_linear_infinite]" />
      </div>

      <div className="flex items-center justify-between mb-12 relative z-10">
        <div className="flex items-center gap-6">
          <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Cpu className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-[0.5em] text-white">Operations Command Deck</h3>
            <span className="text-[10px] text-emerald-500 font-bold tracking-[0.3em] uppercase italic">Unified Mandate Efficiency Control</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-5 py-2 rounded-full bg-black/60 border border-slate-800 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">CORE_SYNC_OK</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
        {/* Column 1: Diagnostic Actions */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] px-4">Diagnostic Mandates</h4>
          <div className="space-y-4">
             <button 
               onClick={onTriggerAudit}
               disabled={isProcessing}
               className="w-full p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 hover:border-emerald-500/40 hover:bg-black/80 transition-all flex flex-col gap-4 text-left group/btn shadow-inner"
             >
                <div className="flex items-center justify-between w-full">
                   <div className={`p-3 rounded-2xl ${isProcessing ? 'bg-emerald-500 text-black' : 'bg-slate-900 text-emerald-400'} transition-colors`}>
                      <SearchCheck className={`w-5 h-5 ${isProcessing ? 'animate-spin' : 'group-hover/btn:scale-110 transition-transform'}`} />
                   </div>
                   <span className="text-[9px] font-black text-emerald-500/50 uppercase tracking-widest">QPP-AUDIT-v15</span>
                </div>
                <div className="space-y-1">
                   <span className="text-sm font-black text-white uppercase tracking-wider">Execute Forensic Audit</span>
                   <p className="text-[9px] text-slate-500 leading-relaxed font-bold uppercase tracking-tighter">Diagnostic of 4,117 server levels and capital parity.</p>
                </div>
             </button>

             <button 
               onClick={onRecalibrateParity}
               disabled={isRecalibrating}
               className="w-full p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-black/80 transition-all flex flex-col gap-4 text-left group/btn shadow-inner"
             >
                <div className="flex items-center justify-between w-full">
                   <div className={`p-3 rounded-2xl ${isRecalibrating ? 'bg-cyan-500 text-black' : 'bg-slate-900 text-cyan-400'} transition-colors`}>
                      <RefreshCw className={`w-5 h-5 ${isRecalibrating ? 'animate-spin' : 'group-hover/btn:rotate-90 transition-transform'}`} />
                   </div>
                   <span className="text-[9px] font-black text-cyan-500/50 uppercase tracking-widest">RECALIBRATE_PARITY</span>
                </div>
                <div className="space-y-1">
                   <span className="text-sm font-black text-white uppercase tracking-wider">Neural Sync Re-Anchor</span>
                   <p className="text-[9px] text-slate-500 leading-relaxed font-bold uppercase tracking-tighter">Forced alignment of reality parity to absolute 1.000000.</p>
                </div>
             </button>
          </div>
        </div>

        {/* Column 2: Stability Telemetry */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] px-4">Stability Telemetry</h4>
          <div className="p-8 rounded-[3rem] bg-black border border-slate-800 flex-1 flex flex-col gap-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-5">
                <Network className="w-32 h-32" />
             </div>
             
             <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                   <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">SDS Immutability</span>
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-lg"></div>
                      <span className="text-[10px] text-emerald-400 font-black uppercase">LOCKED</span>
                   </div>
                </div>
                <div className="text-2xl font-black text-white mono">0x7F8E...BALOG</div>
             </div>

             <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                   <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Mesh Efficiency</span>
                   <span className="text-[10px] text-cyan-400 font-black mono">99.98%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-emerald-600 via-cyan-400 to-indigo-600 w-[99.98%] animate-[shimmer_2s_infinite_linear] bg-[length:200%_100%]"></div>
                </div>
             </div>

             <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                   <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                   <span className="text-[9px] font-black text-white uppercase tracking-widest">Tether Signal</span>
                </div>
                <span className="text-[9px] font-mono text-emerald-500">STABLE_v15_ALPHA</span>
             </div>
          </div>
        </div>

        {/* Column 3: Resource Allocation */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] px-4">Resource Allocation</h4>
          <div className="grid grid-cols-1 gap-4">
             {[
               { label: 'Quantum Core', val: '8.4 THz', icon: <Cpu className="w-4 h-4" />, color: 'text-indigo-400' },
               { label: 'Vault Capacity', val: '$985.0B', icon: <HardDrive className="w-4 h-4" />, color: 'text-amber-400' },
               { label: 'Network Spread', val: '4,117 Nodes', icon: <Globe className="w-4 h-4" />, color: 'text-emerald-400' }
             ].map((item, i) => (
               <div key={i} className="p-6 rounded-[2rem] bg-slate-950/40 border border-slate-800 flex items-center justify-between group/item hover:border-slate-600 transition-all shadow-inner">
                  <div className="flex items-center gap-4">
                     <div className={`p-2.5 rounded-xl bg-black border border-slate-800 ${item.color}`}>
                        {item.icon}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{item.label}</span>
                        <span className="text-xs font-black text-white mono uppercase">{item.val}</span>
                     </div>
                  </div>
                  <BarChart3 className="w-4 h-4 text-slate-800 group-hover/item:text-slate-600 transition-colors" />
               </div>
             ))}
          </div>
        </div>
      </div>

      <footer className="mt-10 pt-8 border-t border-slate-900 flex items-center justify-between opacity-40 hover:opacity-100 transition-opacity">
         <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
               <ShieldCheck className="w-4 h-4 text-emerald-500" />
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Constitutional Integrity: 1.0000</span>
            </div>
            <div className="flex items-center gap-3">
               <Activity className="w-4 h-4 text-cyan-400" />
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Handshake Latency: 0.001ms</span>
            </div>
         </div>
         <div className="text-[8px] font-mono text-slate-700 uppercase tracking-[0.5em]">
            SYSTEM_MANDATE_DECREE_BY_NE.B.RU
         </div>
      </footer>
    </div>
  );
};

export default SovereignOperationsDeck;

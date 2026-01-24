
import React from 'react';
import { FileBarChart, ShieldCheck, Activity, Zap, Gavel, Scale, Fingerprint, ChevronRight } from 'lucide-react';

interface SystemicGovernanceHubProps {
  onTriggerAudit: (reason: string) => void;
  isProcessing: boolean;
  lastAuditTimestamp?: string;
}

const SystemicGovernanceHub: React.FC<SystemicGovernanceHubProps> = ({ onTriggerAudit, isProcessing, lastAuditTimestamp }) => {
  return (
    <div className="bg-slate-900/40 border border-emerald-500/20 rounded-[3rem] p-10 space-y-8 shadow-3xl relative overflow-hidden backdrop-blur-3xl group transition-all hover:border-emerald-500/40">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Gavel className="w-48 h-48 text-emerald-500" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-5 text-emerald-400">
          <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 shadow-lg">
            <Scale className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white">Systemic Governance Hub</h3>
            <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase italic">MANDATE ENFORCEMENT & AUDIT</span>
          </div>
        </div>
        <div className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${isProcessing ? 'bg-emerald-500 text-black animate-pulse' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
           {isProcessing ? 'AUDIT_IN_PROGRESS' : 'GOVERNANCE_IDLE'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-4 shadow-inner">
           <div className="flex items-center justify-between">
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Protocol Integrity</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
           </div>
           <div className="flex flex-col">
              <span className="text-2xl font-black text-white uppercase tracking-tighter">ABSOLUTE</span>
              <span className="text-[9px] text-emerald-500/70 font-bold uppercase mt-1">Status: COMPLIANT</span>
           </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-4 shadow-inner">
           <div className="flex items-center justify-between">
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Last Formal Audit</span>
              <Activity className="w-4 h-4 text-cyan-400" />
           </div>
           <div className="flex flex-col">
              <span className="text-xl font-black text-white mono truncate">{lastAuditTimestamp || 'NEVER'}</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase mt-1">SDS Signature Verified</span>
           </div>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
         <div className="p-8 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/10 space-y-6">
            <div className="flex items-center gap-4">
               <Fingerprint className="w-6 h-6 text-emerald-400" />
               <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
                 "Founder override: Triggering a systemic audit will force a 1:1 capital parity check across all edge nodes and refresh the global ledger manifest."
               </p>
            </div>
            
            <button 
              onClick={() => onTriggerAudit("Manual Sovereign Request")}
              disabled={isProcessing}
              className="w-full py-5 rounded-3xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.4em] transition-all shadow-2xl shadow-emerald-500/40 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4 group"
            >
              <FileBarChart className={`w-5 h-5 ${isProcessing ? 'animate-bounce' : 'group-hover:scale-125 transition-transform'}`} />
              {isProcessing ? 'PROCESSING FORENSICS...' : 'INITIATE SYSTEMIC AUDIT'}
            </button>
         </div>
      </div>

      <div className="flex items-center justify-between px-4 pt-2">
         <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-amber-500" />
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Transparency Protocol active</span>
         </div>
         <span className="text-[8px] font-mono text-slate-700 uppercase">GII-9850-PH-CORE</span>
      </div>
    </div>
  );
};

export default SystemicGovernanceHub;

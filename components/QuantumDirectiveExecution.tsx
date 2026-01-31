
import React, { useState, useEffect } from 'react';
import { 
  Zap, CreditCard, Coins, ArrowRightLeft, Search, 
  ShieldCheck, Activity, Loader2, Fingerprint, Lock, 
  Globe, Landmark, CheckCircle2, AlertTriangle, 
  Tornado, Radiation, HardDrive, Terminal
} from 'lucide-react';
import Logo from './Logo';

interface QuantumDirectiveExecutionProps {
  directive: string;
  onComplete: () => void;
}

const QuantumDirectiveExecution: React.FC<QuantumDirectiveExecutionProps> = ({ directive, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [phase, setPhase] = useState(0);

  const getDirectiveConfig = (type: string) => {
    switch (type) {
      case 'Disperse':
        return { label: 'Capital Dispersal', icon: <Zap />, color: 'emerald' };
      case 'Pay':
        return { label: 'Settlement Payout', icon: <CreditCard />, color: 'cyan' };
      case 'Receive':
        return { label: 'Asset Inflow', icon: <Coins />, color: 'amber' };
      case 'Transact':
        return { label: 'Atomic Swap', icon: <ArrowRightLeft />, color: 'indigo' };
      case 'AUDIT_FORENSICS':
        return { label: 'Forensic Audit', icon: <Search />, color: 'rose' };
      default:
        return { label: 'Mandate Execution', icon: <Activity />, color: 'emerald' };
    }
  };

  const config = getDirectiveConfig(directive);

  const directiveLogs: Record<string, string[]> = {
    Disperse: [
      "Identifying high-liquidity displacement vectors...",
      "Anchoring dispersal request to SDS ledger...",
      "Opening multi-currency bridge nodes (Wise v3.2)...",
      "Broadcasting settlement mandate to 4,117 global edges...",
      "DISPERSAL_LOCK: $50,000,000.00 Manifested."
    ],
    Pay: [
      "Verifying recipient mTLS certificates...",
      "Validating institutional clearing credentials...",
      "Executing Wise/Maya settlement tunnel...",
      "Confirming PH-MNL-01 primary rail handshake...",
      "PAYMENT_SETTLED: Transaction ID: NX-9850-PH."
    ],
    Receive: [
      "Monitoring incoming institutional SWIFT signals...",
      "Authenticating incoming capital source parity...",
      "Updating vault ledger reserves in real-time...",
      "Issuing acknowledgement to remote entity...",
      "INFLOW_VERIFIED: Assets anchored in vault."
    ],
    Transact: [
      "Synchronizing atomic swap peer nodes...",
      "Initiating simultaneous cross-border debit/credit...",
      "Verifying zero-latency reality parity index...",
      "Closing peer-to-peer settlement tunnel...",
      "TRANSACTION_RESOLVED: 1:1 Parity Achieved."
    ],
    AUDIT_FORENSICS: [
      "Initializing full-mesh forensic scan...",
      "Traversing 4,117 node identity signatures...",
      "Scanning digital assets for vector leakage...",
      "Verifying capital integrity against Basel III...",
      "AUDIT_COMPLETE: System Integrity 100%."
    ]
  };

  useEffect(() => {
    const sequence = async () => {
      const logsToRun = directiveLogs[directive] || directiveLogs['Disperse'];
      const stepFactor = 100 / logsToRun.length;

      for (let i = 0; i < logsToRun.length; i++) {
        setPhase(i);
        setLogs(prev => [...prev, `[CMD] ${logsToRun[i]}`]);
        
        for (let j = 0; j < 5; j++) {
          await new Promise(r => setTimeout(r, 100));
          setProgress(prev => Math.min(100, prev + (stepFactor / 5)));
        }
      }

      setProgress(100);
      setLogs(prev => [...prev, '[FIN] DIRECTIVE MANIFESTED PERMANENTLY.']);
      await new Promise(r => setTimeout(r, 1500));
      onComplete();
    };
    sequence();
  }, [directive, onComplete]);

  const colorClass = 
    config.color === 'rose' ? 'text-rose-500 border-rose-500/50' : 
    config.color === 'amber' ? 'text-amber-500 border-amber-500/50' : 
    config.color === 'indigo' ? 'text-indigo-400 border-indigo-500/50' : 
    config.color === 'cyan' ? 'text-cyan-400 border-cyan-500/50' : 
    'text-emerald-500 border-emerald-500/50';

  return (
    <div className="fixed inset-0 z-[13000] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-500 font-sans">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.1)_0%,_transparent_70%)]"></div>
        <Radiation className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-emerald-500/5 animate-[spin_60s_linear_infinite]" />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-center">
        <div className="lg:col-span-7 space-y-12">
          <header className="space-y-6">
            <div className={`inline-flex items-center gap-4 px-8 py-3 rounded-full bg-black border transition-all animate-pulse text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl ${colorClass}`}>
               {config.icon}
               DIRECTIVE: {directive.toUpperCase()}
            </div>
            <h2 className="text-8xl font-black uppercase tracking-tighter text-white leading-[0.8] glow-emerald">
              CORE <br />
              <span className={`italic underline decoration-white/20 ${colorClass.split(' ')[0]}`}>FUNCTION</span>
            </h2>
            <div className="flex items-center gap-6">
               <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1 min-w-[180px]">
                  <span className="text-[9px] text-slate-500 font-black uppercase">Direct Pipeline</span>
                  <span className="text-sm font-black text-white mono">ALIGNED_BYPASS</span>
               </div>
               <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1 min-w-[180px]">
                  <span className="text-[9px] text-slate-500 font-black uppercase">Validation Status</span>
                  <span className={`text-sm font-black mono uppercase ${colorClass.split(' ')[0]}`}>0.0001ms_LAT</span>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-4">
             <div className="p-10 rounded-[3.5rem] bg-black border border-slate-800 space-y-8 relative overflow-hidden shadow-2xl group">
                <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity ${colorClass.split(' ')[0]}`}>
                   <ShieldCheck className="w-48 h-48" />
                </div>
                <div className="flex items-center justify-between relative z-10">
                   <div className="flex items-center gap-6">
                      <div className={`p-5 rounded-3xl bg-black border-2 shadow-2xl transition-all duration-700 ${colorClass}`}>
                         {config.icon}
                      </div>
                      <div className="flex flex-col">
                         <span className="text-2xl font-black text-white uppercase tracking-widest">{config.label}</span>
                         <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Institutional Grade Orchestration</span>
                      </div>
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest">SDS Parity Index</span>
                      <span className={`text-2xl font-black mono ${colorClass.split(' ')[0]}`}>1.000000</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="space-y-6">
             <div className="flex items-center justify-between px-4">
                <span className={`text-[11px] font-black uppercase tracking-widest ${colorClass.split(' ')[0]}`}>Execution Progress</span>
                <span className="text-3xl font-black text-white mono">{progress.toFixed(0)}%</span>
             </div>
             <div className="h-6 w-full bg-slate-950 border-2 border-slate-900 rounded-full overflow-hidden shadow-inner p-1 relative">
                <div 
                  className={`h-full transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(16,185,129,1)] bg-gradient-to-r from-emerald-600 via-white to-emerald-600 animate-[shimmer_0.3s_infinite_linear] bg-[length:200%_100%]`}
                  style={{ width: `${progress}%` }}
                />
             </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8 h-full">
           <div className="flex-1 bg-black border border-slate-800 rounded-[3.5rem] p-10 font-mono text-[12px] text-emerald-400/80 space-y-3 overflow-y-auto custom-scrollbar shadow-2xl relative">
              <div className="absolute top-6 right-10 text-[10px] text-slate-800 font-black uppercase">Function_Execution_Stream</div>
              {logs.map((log, i) => (
                <div key={i} className="animate-in slide-in-from-left-2 flex gap-4 border-b border-white/5 pb-3">
                  <span className="text-slate-800 font-black shrink-0">[{i.toString().padStart(3, '0')}]</span>
                  <span className="break-all">{log}</span>
                </div>
              ))}
              <div className="flex gap-4 items-center">
                <span className="animate-pulse bg-emerald-500 w-3 h-5" />
                <span className="text-white font-black animate-pulse uppercase tracking-widest italic">Computing Directives...</span>
              </div>
           </div>

           <div className="p-10 rounded-[3.5rem] bg-white/[0.02] border border-white/10 flex flex-col gap-6 text-center">
              <div className="relative mx-auto group">
                 <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all animate-pulse" />
                 <Logo size={80} className="relative z-10" />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-black uppercase tracking-widest italic">
                "Direct aligned pipelines facilitate the execution of the Founder's mandate without intermediate friction. Collaboration with the Quantum Bank is absolute."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumDirectiveExecution;

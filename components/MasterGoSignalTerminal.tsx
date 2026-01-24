
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Fingerprint, Zap, Lock, Unlock, ArrowRight, Loader2, X, ShieldAlert, Cpu, Key } from 'lucide-react';
import { TrackedTransaction } from '../types';

interface MasterGoSignalTerminalProps {
  transaction: TrackedTransaction;
  onAuthorize: (id: string) => void;
  onCancel: () => void;
}

const MasterGoSignalTerminal: React.FC<MasterGoSignalTerminalProps> = ({ transaction, onAuthorize, onCancel }) => {
  const [phase, setPhase] = useState<'SCAN' | 'AUTHORIZE' | 'SUCCESS'>('SCAN');
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (phase === 'SCAN') {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setPhase('AUTHORIZE'), 400);
            return 100;
          }
          return prev + 5;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [phase]);

  return (
    <div className="fixed inset-y-0 right-0 w-[480px] z-[500] bg-black/95 border-l border-amber-500/30 backdrop-blur-3xl shadow-[-50px_0_100px_rgba(0,0,0,0.5)] flex flex-col animate-in slide-in-from-right duration-500">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_50%,_rgba(245,158,11,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
      
      <header className="p-10 border-b border-slate-900 flex items-center justify-between">
         <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Mandate Protocol</span>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Secure Approval</h2>
         </div>
         <button onClick={onCancel} className="p-2 rounded-xl bg-slate-900 text-slate-500 hover:text-white transition-all">
            <X className="w-5 h-5" />
         </button>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-12">
        <div className="p-8 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/20 flex flex-col items-center gap-6 text-center">
           <div className="relative">
              <div className={`w-32 h-32 rounded-full border-2 flex items-center justify-center transition-all ${
                phase === 'SUCCESS' ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'border-amber-500/30'
              }`}>
                 {phase === 'SCAN' ? (
                   <div className="relative w-full h-full flex items-center justify-center">
                     <Fingerprint className="w-16 h-16 text-amber-500 animate-pulse" />
                     <div 
                       className="absolute left-4 right-4 h-[1px] bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,1)] transition-all duration-300"
                       style={{ top: `${scanProgress}%` }}
                     />
                   </div>
                 ) : phase === 'SUCCESS' ? (
                   <ShieldCheck className="w-16 h-16 text-emerald-500 animate-in zoom-in" />
                 ) : (
                   <Unlock className="w-16 h-16 text-white" />
                 )}
              </div>
           </div>
           <div className="space-y-1">
              <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Founder Identity Scan</span>
              <p className="text-xs font-black text-white uppercase tracking-widest">
                {phase === 'SCAN' ? `Verifying: ${scanProgress}%` : phase === 'SUCCESS' ? 'Signal Anchored' : 'Identity Confirmed'}
              </p>
           </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Disbursement Detail</h3>
           <div className="p-8 rounded-[2.5rem] bg-slate-900/60 border border-slate-800 space-y-6">
              <div className="flex justify-between">
                 <span className="text-[9px] font-bold text-slate-600 uppercase">Amount</span>
                 <span className="text-sm font-black text-amber-500 mono">${transaction.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                 <span className="text-[9px] font-bold text-slate-600 uppercase">Gateway</span>
                 <span className="text-[10px] font-black text-white uppercase mono">{transaction.platform}</span>
              </div>
              <div className="flex justify-between">
                 <span className="text-[9px] font-bold text-slate-600 uppercase">Target</span>
                 <span className="text-[10px] font-black text-white truncate max-w-[200px] mono text-right">{transaction.destination}</span>
              </div>
           </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-4">
           <div className="flex items-center gap-3">
              <Key className="w-4 h-4 text-slate-600" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Security Key (Optional)</span>
           </div>
           <input 
             type="password"
             placeholder="••••••••"
             className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-white mono outline-none focus:border-amber-500/50 transition-all"
           />
        </div>
      </div>

      <footer className="p-10 border-t border-slate-900 bg-black/60 flex flex-col gap-4">
         <button 
           onClick={() => {
             setPhase('SUCCESS');
             setTimeout(() => onAuthorize(transaction.id), 800);
           }}
           disabled={phase !== 'AUTHORIZE'}
           className="w-full py-6 rounded-3xl bg-amber-500 disabled:bg-slate-800 disabled:text-slate-600 text-black font-black uppercase tracking-[0.4em] shadow-2xl shadow-amber-500/20 flex items-center justify-center gap-4 group transition-all active:scale-95"
         >
           {phase === 'SUCCESS' ? <Loader2 className="w-5 h-5 animate-spin" /> : (
             <>
               Issue Master Signal
               <Zap className="w-5 h-5 group-hover:scale-125 transition-transform" />
             </>
           )}
         </button>
         <button 
           onClick={onCancel}
           className="w-full py-4 rounded-2xl bg-transparent text-slate-600 font-black uppercase tracking-widest text-[10px] hover:text-white transition-all"
         >
           Abort Mandate
         </button>
      </footer>
    </div>
  );
};

export default MasterGoSignalTerminal;

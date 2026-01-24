import React, { useState } from 'react';
/* Added missing RefreshCw and ShieldAlert imports from lucide-react */
import { Globe, ShieldCheck, Zap, Network, Smartphone, Cpu, Coins, CreditCard, Binary, FileText, ArrowUpRight, Activity, Search, Lock, ShieldX, RefreshCw, ShieldAlert } from 'lucide-react';

const SovereignSatellitePortal: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const serial = localStorage.getItem('neoxz_platform_serial') || 'NEOX-SAT-NULL';

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="p-12 bg-slate-900/40 border-2 border-indigo-500/20 rounded-[4rem] shadow-3xl backdrop-blur-3xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
          <Smartphone className="w-96 h-96 text-indigo-500 rotate-12" />
        </div>
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 relative z-10 gap-8">
          <div className="flex items-center gap-8">
            <div className="p-5 rounded-[2.5rem] bg-indigo-500/10 border-2 border-indigo-500/20 text-indigo-400 shadow-xl shadow-indigo-500/5">
              <Network className="w-10 h-10 animate-pulse" />
            </div>
            <div>
              <h3 className="text-3xl font-black uppercase tracking-[0.4em] text-white">Issued Satellite Node</h3>
              <div className="flex items-center gap-3 mt-1">
                 <span className="text-[11px] text-indigo-500 font-bold tracking-widest uppercase italic">Autonomous Decoupled Node v16.2.1</span>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]"></div>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-[2.5rem] bg-black border border-slate-800 space-y-1 shadow-inner min-w-[280px]">
             <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Secure Platform ID</span>
             <p className="text-sm font-black text-indigo-400 mono truncate">{serial}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <div className="p-8 rounded-[3rem] bg-black/60 border border-slate-800 space-y-5 shadow-2xl group/card hover:border-emerald-500/30 transition-all">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Platform Integrity</span>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
             </div>
             <div className="flex flex-col">
                <span className="text-3xl font-black text-white uppercase tracking-tighter">SECURED</span>
                <span className="text-[9px] text-emerald-500/70 font-bold uppercase mt-1">HARDWARE_LOCK_v4.2</span>
             </div>
             <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-full animate-pulse"></div>
             </div>
          </div>

          <div className="p-8 rounded-[3rem] bg-black/60 border border-slate-800 space-y-5 shadow-2xl group/card hover:border-indigo-500/30 transition-all">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Central Link</span>
                <Coins className="w-5 h-5 text-amber-500" />
             </div>
             <div className="flex flex-col">
                <span className="text-3xl font-black text-white uppercase tracking-tighter">TETHERED</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase mt-1">DIRECT_VAULT_DEPOSIT_OK</span>
             </div>
             <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-full"></div>
             </div>
          </div>

          <div className="p-8 rounded-[3rem] bg-black/60 border border-slate-800 space-y-5 shadow-2xl group/card hover:border-indigo-500/30 transition-all">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Status</span>
                <Globe className="w-5 h-5 text-cyan-400" />
             </div>
             <div className="flex flex-col">
                <span className="text-3xl font-black text-white uppercase tracking-tighter">STABLE</span>
                <span className="text-[9px] text-cyan-500 font-bold uppercase mt-1">4,117_EDGES_VERIFIED</span>
             </div>
             <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-full animate-pulse"></div>
             </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
           {[
             { label: 'Credit Warp', icon: CreditCard, color: 'text-cyan-400', desc: 'Instant Fiat Clearing' },
             { label: 'Crypto Rails', icon: Binary, color: 'text-purple-400', desc: 'Atomic Swap Protocol' },
             { label: 'Digital Cheque', icon: FileText, color: 'text-amber-400', desc: 'Jan 2026 Clearing' },
             { label: 'Sovereign ID', icon: Smartphone, color: 'text-indigo-400', desc: 'Biometric Handshake' }
           ].map((item, i) => (
             <div key={i} className="p-8 rounded-[2.5rem] bg-black border border-slate-800 flex flex-col items-center gap-4 hover:border-white/20 transition-all cursor-pointer group/rail shadow-inner">
                <div className={`p-4 rounded-2xl bg-white/5 border border-current ${item.color} group-hover/rail:scale-110 transition-transform`}>
                   <item.icon className="w-8 h-8" />
                </div>
                <div className="text-center space-y-1">
                   <span className="text-[10px] font-black uppercase text-white tracking-widest">{item.label}</span>
                   <p className="text-[8px] text-slate-500 font-bold uppercase">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-7 p-10 rounded-[3.5rem] bg-black border border-slate-800 space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
                     <Activity className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="text-lg font-black uppercase tracking-widest text-white">Systemic Activity Log</h4>
               </div>
               <button onClick={triggerScan} className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-slate-500 hover:text-indigo-400 transition-all">
                  <RefreshCw className={`w-5 h-5 ${isScanning ? 'animate-spin' : ''}`} />
               </button>
            </div>
            <div className="space-y-3 font-mono text-[11px] text-slate-500 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
               {[
                 "[INIT] Satellite Core Booted.",
                 "[SYNC] Tether established with NEOXZ Central Ledger.",
                 "[AUTH] Serial NE.B.RU verified against hardware hash.",
                 "[RAIL] SignaSovereign v4.2.1 initialized successfully.",
                 "[CAP] Promotional Abundance ($55.00) activated.",
                 "[AML] Real-time laundering overwatch: ACTIVE.",
                 "[NODE] 4,117 edge points reported stable heartbeat."
               ].map((log, i) => (
                 <div key={i} className="flex gap-4 border-b border-white/5 pb-2 animate-in slide-in-from-left-2" style={{ animationDelay: `${i * 100}ms` }}>
                    <span className="text-indigo-500/40 shrink-0">[{i}]</span>
                    <span className="break-all">{log}</span>
                 </div>
               ))}
               <div className="flex gap-3">
                  <span className="animate-pulse bg-indigo-500 w-2 h-4"></span>
                  <span className="text-white italic opacity-40 uppercase tracking-widest text-[9px]">Listening for Global Mandates...</span>
               </div>
            </div>
         </div>

         <div className="lg:col-span-5 p-10 rounded-[3.5rem] bg-rose-500/5 border border-rose-500/20 space-y-8 shadow-2xl relative overflow-hidden flex flex-col justify-center group/aml">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover/aml:opacity-10 transition-opacity">
               <ShieldX className="w-48 h-48 text-rose-500" />
            </div>
            <div className="flex flex-col items-center text-center space-y-6 relative z-10">
               <div className="p-5 rounded-full bg-rose-600 text-white shadow-2xl animate-pulse">
                  <ShieldAlert className="w-10 h-10" />
               </div>
               <div className="space-y-2">
                  <h4 className="text-2xl font-black uppercase text-white tracking-tighter">Forensic Overwatch</h4>
                  <p className="text-[10px] text-rose-500 font-bold uppercase tracking-[0.4em] italic">JAN 2026 GLOBAL STANDARDS</p>
               </div>
               <p className="text-[11px] text-slate-400 font-medium leading-relaxed uppercase max-w-xs mx-auto italic">
                 "Platform immunity is enforced by the Q-TEAM. Any manipulation attempt results in immediate node isolation and credential incineration."
               </p>
               <div className="w-full h-[2px] bg-rose-950/30 relative">
                  <div className="absolute inset-0 bg-rose-500/20 animate-[shimmer_2s_infinite_linear] bg-[length:200%_100%]"></div>
               </div>
               <div className="flex items-center gap-3 px-6 py-2 rounded-xl bg-rose-600/10 border border-rose-600/20 text-rose-500 text-[10px] font-black uppercase tracking-widest">
                  <Lock className="w-4 h-4" />
                  MANDATE_IMMUNIZED
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SovereignSatellitePortal;
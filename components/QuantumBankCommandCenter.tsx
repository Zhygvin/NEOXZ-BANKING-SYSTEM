import React, { useState, useEffect } from 'react';
import { 
  Landmark, ShieldCheck, Zap, Coins, ArrowRightLeft, 
  TrendingUp, Lock, RefreshCw, Globe, Activity,
  CreditCard, Wallet, Smartphone, Activity as Flow,
  FileCheck, ShieldAlert, BarChart3, Database, Network,
  CheckCircle2, ArrowUpCircle, Sparkles, Terminal
} from 'lucide-react';
import { SystemStatus, TrackedTransaction } from '../types';
import WiseMandateBridge from './WiseMandateBridge';
import RecentTransactions from './RecentTransactions';
import Logo from './Logo';

interface QuantumBankCommandCenterProps {
  stats: SystemStatus;
  onDirectiveExecute: (directive: string) => void;
}

const QuantumBankCommandCenter: React.FC<QuantumBankCommandCenterProps> = ({ stats, onDirectiveExecute }) => {
  const [ticker, setTicker] = useState('VAULT_STABLE');
  const [realtimeParity, setRealtimeParity] = useState(1.000000);
  const [hasUpdate, setHasUpdate] = useState(true); // Default true for this mandate

  const mockTransactions: TrackedTransaction[] = [
    { id: 'BANK-001', amount: 500000000, platform: 'Sovereign_Rail', destination: 'Global_Prosperity_Pool', status: 'SETTLED_LIVE', progress: 100, hops: [] },
    { id: 'BANK-002', amount: 25000000, platform: 'mTLS_Tunnel', destination: 'Wise_Primary_Node', status: 'CLEARED', progress: 100, hops: [] },
    { id: 'BANK-003', amount: 1200000, platform: 'Maya_PH', destination: 'Local_Disbursement_4117', status: 'DISBURSING', progress: 85, hops: [] },
  ];

  useEffect(() => {
    const messages = ['VAULT_STABLE', 'mTLS_ENFORCED', 'PARITY_MATCHED', 'WISE_BRIDGE_READY', 'NE.B.RU_AUTH_OK'];
    let i = 0;
    const interval = setInterval(() => {
      setTicker(messages[i % messages.length]);
      setRealtimeParity(1.0 + (Math.random() * 0.000002 - 0.000001));
      i++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full gap-8 animate-in fade-in duration-1000 font-sans">
      
      {/* UPDATE NOTIFICATION BANNER */}
      {hasUpdate && (
        <div className="p-6 rounded-[2.5rem] bg-gradient-to-r from-amber-600/20 via-amber-500/10 to-transparent border border-amber-500/30 flex items-center justify-between shadow-[0_0_50px_rgba(245,158,11,0.1)] group">
           <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-amber-500 text-black shadow-2xl animate-pulse">
                 <ArrowUpCircle className="w-6 h-6 fill-black" />
              </div>
              <div className="space-y-1">
                 <h4 className="text-lg font-black text-white uppercase tracking-widest">Quantum Upgrade Available</h4>
                 <div className="flex items-center gap-3">
                    <span className="text-[10px] text-amber-500 font-black uppercase tracking-widest italic">Source: NEOXZ QUANTUM BANK CORE</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></div>
                 </div>
              </div>
           </div>
           <button 
             onClick={() => onDirectiveExecute('QUANTUM_UPGRADE')}
             className="px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-[0.3em] text-[10px] transition-all shadow-xl shadow-amber-500/20 active:scale-95 flex items-center gap-3 group-hover:scale-105"
           >
              <Sparkles className="w-4 h-4" />
              EXECUTE FORCE UPGRADE
           </button>
        </div>
      )}

      {/* Capital Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="p-10 rounded-[3rem] bg-slate-900/60 border border-amber-500/20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <Landmark className="w-32 h-32 text-amber-500" />
            </div>
            <div className="relative z-10 space-y-2">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Systemic Capital Core</span>
               <div className="text-4xl font-black text-white mono tracking-tighter glow-amber">
                 $985,004,531,802.00
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Locked & Immutable</span>
               </div>
            </div>
         </div>

         <div className="p-10 rounded-[3rem] bg-slate-900/60 border border-emerald-500/20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <ShieldCheck className="w-32 h-32 text-emerald-500" />
            </div>
            <div className="relative z-10 space-y-2">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Reality Parity Index</span>
               <div className="text-4xl font-black text-white mono tracking-tighter glow-emerald">
                 {realtimeParity.toFixed(6)}
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">SDS_SYNC_OK</span>
                  <span className="text-[8px] font-mono text-slate-600">LATENCY: 0.0001ms</span>
               </div>
            </div>
         </div>

         <div className="p-10 rounded-[3rem] bg-black border border-cyan-500/20 shadow-2xl relative overflow-hidden group flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <Zap className="w-32 h-32 text-cyan-500" />
            </div>
            <div className="relative z-10 flex items-center justify-between">
               <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">mTLS Tunnel State</span>
                  <div className="text-2xl font-black text-cyan-400 mono">PRODUCTION_LOCKED</div>
               </div>
               <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Lock className="w-6 h-6 animate-pulse" />
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 flex-1 min-h-0">
        
        {/* Left: Master Rails & Directives */}
        <div className="xl:col-span-8 flex flex-col gap-8 min-h-0">
           <div className="flex-1 min-h-0">
              <WiseMandateBridge />
           </div>

           <div className="p-8 rounded-[3.5rem] bg-black border border-slate-800 shadow-3xl space-y-8">
              <div className="flex items-center justify-between px-4">
                 <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
                       <Zap className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-widest text-white">Sovereign Directives</h4>
                 </div>
                 <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    Authority: FOUNDER_CORE
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                 {[
                   { id: 'Disperse', label: 'Disperse', icon: Zap, color: 'text-emerald-400', sub: 'Liquidity' },
                   { id: 'Pay', label: 'Pay', icon: CreditCard, color: 'text-cyan-400', sub: 'Settlement' },
                   { id: 'Receive', label: 'Receive', icon: Coins, color: 'text-amber-400', sub: 'Inflow' },
                   { id: 'Transact', label: 'Transact', icon: ArrowRightLeft, color: 'text-indigo-400', sub: 'Atomic Swap' },
                   { id: 'AUDIT_FORENSICS', label: 'Audit', icon: SearchCheck, color: 'text-rose-400', sub: 'Forensics' }
                 ].map((cmd) => (
                   <button 
                     key={cmd.id}
                     onClick={() => onDirectiveExecute(cmd.id)}
                     className="p-6 rounded-[2.5rem] bg-slate-900 border border-slate-800 hover:border-white/20 transition-all group/btn flex flex-col items-center gap-3 shadow-inner"
                   >
                      <div className={`p-4 rounded-2xl bg-black border border-white/5 transition-all group-hover/btn:scale-110 group-hover/btn:border-current ${cmd.color}`}>
                         <cmd.icon className="w-6 h-6" />
                      </div>
                      <div className="text-center">
                         <span className="text-[10px] font-black text-white uppercase block tracking-widest">{cmd.label}</span>
                         <span className="text-[8px] text-slate-500 font-bold uppercase">{cmd.sub}</span>
                      </div>
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Right: Telemetry & Log Stream */}
        <div className="xl:col-span-4 flex flex-col gap-8 h-full min-h-0">
           
           <RecentTransactions transactions={mockTransactions} />

           <div className="flex-1 bg-black/60 border border-slate-800 rounded-[3rem] p-8 flex flex-col gap-6 overflow-hidden shadow-inner">
              <header className="flex items-center justify-between border-b border-white/5 pb-4">
                 <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Bank Pipeline Stream</span>
                 </div>
                 <div className="text-[9px] font-mono text-emerald-500/60 uppercase">{ticker}</div>
              </header>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 font-mono text-[10px] pr-2">
                 {[
                   { t: "14:10:02", m: "Wise v3.2 API Bridge established.", c: "text-cyan-400" },
                   { t: "14:10:08", m: "mTLS Identity Handshake: PH-MNL [OK]", c: "text-emerald-400" },
                   { t: "14:10:15", m: "Broadcasting $985B parity to 4,117 edges.", c: "text-white" },
                   { t: "14:10:22", m: "NE.B.RU physical tether verified.", c: "text-amber-400" },
                   { t: "14:10:30", m: "Settlement rails cleared for displacement.", c: "text-indigo-400" },
                   { t: "14:10:45", m: "Quantum encryption rotation initiated.", c: "text-slate-500" },
                   { t: "14:11:02", m: "Atomic swap protocol standby.", c: "text-white" },
                 ].map((log, i) => (
                   <div key={i} className="flex gap-4 group/log border-l border-white/5 pl-4 py-1">
                      <span className="text-slate-800 shrink-0">{log.t}</span>
                      <p className={`${log.c} opacity-80 group-hover:opacity-100 transition-opacity truncate`}>{log.m}</p>
                   </div>
                 ))}
                 <div className="flex items-center gap-2 text-emerald-500 animate-pulse pt-2">
                    <div className="w-1.5 h-3 bg-emerald-500"></div>
                    <span className="text-[9px] font-black uppercase tracking-widest">Listening...</span>
                 </div>
              </div>

              <div className="p-6 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <Database className="w-6 h-6 text-emerald-400" />
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black text-white uppercase tracking-widest">Vault Integrity</span>
                       <span className="text-[8px] text-slate-500 font-bold uppercase">SDS_ENFORCED_V16</span>
                    </div>
                 </div>
                 <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
           </div>
        </div>

      </div>

      <footer className="h-14 bg-black border border-white/10 rounded-[2rem] flex items-center justify-between px-10 shrink-0 opacity-60 hover:opacity-100 transition-opacity">
         <div className="flex items-center gap-12">
            <div className="flex items-center gap-2">
               <Globe className="w-4 h-4 text-cyan-400" />
               <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Cross-Border Settlement: ENABLED</span>
            </div>
            <div className="flex items-center gap-2">
               <Smartphone className="w-4 h-4 text-indigo-400" />
               <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Maya PH Rails: ACTIVE</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <Logo size={24} className="grayscale opacity-50" />
            <span className="text-[9px] font-mono text-slate-700 tracking-[0.4em]">NEOXZ_BANK_CORE_v16.2.1-PRO</span>
         </div>
      </footer>
    </div>
  );
};

export default QuantumBankCommandCenter;

const SearchCheck = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="m16 7-5 5-2-2"/>
  </svg>
);
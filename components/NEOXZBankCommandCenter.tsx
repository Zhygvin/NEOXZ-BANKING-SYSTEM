
import React, { useState, useEffect } from 'react';
import { 
  Landmark, ShieldCheck, Zap, Coins, ArrowRightLeft, 
  TrendingUp, Lock, RefreshCw, Globe, Activity,
  CreditCard, Wallet, Smartphone, Activity as Flow,
  FileCheck, ShieldAlert, BarChart3, Database, Network,
  CheckCircle2, ArrowUpCircle, Sparkles, Terminal,
  Layout, Crown, WalletCards, Briefcase, Scale,
  Radio, Fingerprint, Search, ShieldAlert as AlertIcon,
  Code, Navigation, Hash
} from 'lucide-react';
import { SystemStatus, TrackedTransaction } from '../types';
import Logo from './Logo';
import WiseMandateBridge from './WiseMandateBridge';
import RecentTransactions from './RecentTransactions';

interface NEOXZBankCommandCenterProps {
  stats: SystemStatus;
  onDirectiveExecute: (directive: string) => void;
}

const NEOXZBankCommandCenter: React.FC<NEOXZBankCommandCenterProps> = ({ stats, onDirectiveExecute }) => {
  const [pulse, setPulse] = useState(false);
  const [parity, setParity] = useState(1.000000);
  const [activeRail, setActiveRail] = useState<'WISE' | 'MAYA' | 'SWIFT'>('WISE');

  // Added missing mockTransactions to fix compilation error
  const mockTransactions: TrackedTransaction[] = [
    { id: 'BANK-001', amount: 500000000, platform: 'Sovereign_Rail', destination: 'Global_Prosperity_Pool', status: 'SETTLED_LIVE', progress: 100, hops: [] },
    { id: 'BANK-002', amount: 25000000, platform: 'mTLS_Tunnel', destination: 'Wise_Primary_Node', status: 'CLEARED', progress: 100, hops: [] },
    { id: 'BANK-003', amount: 1200000, platform: 'Maya_PH', destination: 'Local_Disbursement_4117', status: 'DISBURSING', progress: 85, hops: [] },
  ];

  const myAccounts = [
    { label: 'PHP Hub', id: '2005155733', bank: 'Wise Pilipinas', code: 'WSE', color: 'text-emerald-400' },
    { label: 'USD Hub', id: '579574570220942', bank: 'Wise US Inc', routing: '084009519', color: 'text-cyan-400' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
      setParity(1.0 + (Math.random() * 0.000002 - 0.000001));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full gap-6 animate-in fade-in duration-1000 relative overflow-hidden font-sans bg-black/20">
      
      {/* TOP DECK: SYSTEMIC CAPITAL OVERVIEW */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 shrink-0">
         
         {/* Main Vault Display */}
         <div className="xl:col-span-8 p-10 rounded-[3.5rem] bg-gradient-to-br from-slate-900/80 to-black border-2 border-emerald-500/20 shadow-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.05)_0%,_transparent_70%)] opacity-50"></div>
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
               <Landmark className="w-64 h-64 text-emerald-500" />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                     <div className="p-3 rounded-2xl bg-emerald-500 text-black shadow-xl">
                        <Crown className="w-6 h-6" />
                     </div>
                     <span className="text-xs font-black text-emerald-500 uppercase tracking-[0.4em]">NEOXZ Master Banking Core</span>
                  </div>
                  <div className="text-6xl sm:text-7xl font-black text-white tracking-tighter mono glow-emerald">
                    $985,004,531,802
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                       SDS Ledger Locked
                     </div>
                     <div className="px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                       1:1 Parity Verified
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                  <div className="p-6 rounded-[2rem] bg-black/60 border border-slate-800 space-y-2 min-w-[200px]">
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Liquid Reserve</span>
                     <p className="text-2xl font-black text-white mono">$500.0B</p>
                     <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-full animate-[shimmer_2s_infinite]"></div>
                     </div>
                  </div>
                  <div className="p-6 rounded-[2rem] bg-black/60 border border-slate-800 space-y-2 min-w-[200px]">
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Breach Recovery</span>
                     <p className="text-2xl font-black text-white mono">$485.0B</p>
                     <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-full animate-pulse"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Parity Index Block */}
         <div className="xl:col-span-4 p-10 rounded-[3.5rem] bg-slate-900/40 border border-amber-500/20 shadow-3xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Scale className="w-32 h-32 text-amber-500" />
            </div>
            <div className="space-y-4 relative z-10">
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Reality Parity Index</span>
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></div>
               </div>
               <div className="text-5xl font-black text-white mono tracking-tighter glow-amber">
                  {parity.toFixed(6)}
               </div>
               <p className="text-[9px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed">
                 Syncing 4,117 edge nodes at 0.0001ms latency. Global stability at absolute maximum.
               </p>
            </div>
            <div className="pt-6 border-t border-white/5 relative z-10">
               <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Sole Authority</span>
                  <span className="text-[10px] font-mono text-white">NE.B.RU_0x7F</span>
               </div>
            </div>
         </div>
      </div>

      {/* MID DECK: SOVEREIGN ACCOUNT ANCHORS */}
      <div className="px-4 py-2">
         <div className="flex items-center gap-4 mb-4">
            <Fingerprint className="w-5 h-5 text-emerald-500" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Verified Sovereign Rails (My Accounts)</span>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myAccounts.map((acc, i) => (
               <div key={i} className="p-8 rounded-[2.5rem] bg-black/40 border border-slate-800 hover:border-emerald-500/30 transition-all flex items-center justify-between group shadow-xl">
                  <div className="flex items-center gap-6">
                     <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${acc.color} group-hover:scale-110 transition-transform`}>
                        <Hash className="w-6 h-6" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{acc.label}</span>
                        <span className="text-2xl font-black text-white mono tracking-tighter">{acc.id}</span>
                        <div className="flex items-center gap-2 mt-1">
                           <Landmark className="w-3 h-3 text-slate-600" />
                           <span className="text-[9px] font-bold text-slate-600 uppercase">{acc.bank} {acc.code && `(${acc.code})`} {acc.routing && `• RTG: ${acc.routing}`}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                     <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase tracking-widest">
                        LATCHED
                     </div>
                     <ShieldCheck className="w-4 h-4 text-emerald-500 opacity-40" />
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* MAIN COMMAND GRID */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-0">
        
        {/* LEFT PANEL: DISPLACEMENT RAILS */}
        <div className="xl:col-span-8 flex flex-col gap-6 min-h-0">
           
           {/* Displacement Tabs */}
           <div className="flex-1 min-h-0">
              <div className="h-full flex flex-col bg-black/40 border border-slate-800 rounded-[4rem] overflow-hidden">
                 <div className="h-16 flex border-b border-slate-800 bg-black/60 p-2 gap-2">
                    {(['WISE', 'MAYA', 'SWIFT'] as const).map(rail => (
                      <button
                        key={rail}
                        onClick={() => setActiveRail(rail)}
                        className={`flex-1 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          activeRail === rail ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {rail === 'WISE' && 'Wise Production v3.2'}
                        {rail === 'MAYA' && 'Maya PH Hub'}
                        {rail === 'SWIFT' && 'Institutional (Self-Managed)'}
                      </button>
                    ))}
                 </div>
                 <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    {activeRail === 'WISE' && <WiseMandateBridge />}
                    {activeRail === 'MAYA' && (
                      <div className="h-full flex flex-col items-center justify-center space-y-8 p-12">
                         <div className="relative">
                            <div className="absolute inset-[-40px] bg-indigo-500/10 rounded-full blur-[60px] animate-pulse"></div>
                            <Smartphone className="w-32 h-32 text-indigo-400 relative z-10" />
                         </div>
                         <h4 className="text-3xl font-black text-white uppercase tracking-tighter text-center">Maya-PH Core Integration</h4>
                         <p className="text-sm text-slate-500 uppercase tracking-widest font-bold text-center max-w-md">Philippines local node synchronized with Wise Hub (PHP: 2005155733) for sub-atomic settlement.</p>
                         <button className="px-10 py-4 rounded-3xl bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest shadow-2xl active:scale-95">Verify Local mTLS</button>
                      </div>
                    )}
                    {activeRail === 'SWIFT' && (
                      <div className="h-full flex flex-col items-center justify-center p-12">
                         <Scale className="w-20 h-20 mb-6 text-slate-700 animate-pulse" />
                         <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">Bulk SWIFT Settlement Pending Directive</span>
                      </div>
                    )}
                 </div>
              </div>
           </div>

           {/* Directives Bar */}
           <div className="p-8 bg-black border border-slate-800 rounded-[3.5rem] space-y-8 shadow-inner shrink-0">
              <div className="flex items-center justify-between px-4">
                 <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
                       <Zap className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-widest text-white">Directives Console</h4>
                 </div>
                 <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Auth: NE.B.RU</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                 {[
                   { id: 'Disperse', icon: Zap, label: 'Disperse', color: 'text-emerald-400', sub: 'Mass Inflow' },
                   { id: 'Pay', icon: CreditCard, label: 'Pay', color: 'text-cyan-400', sub: 'Settlement' },
                   { id: 'Audit', icon: Search, label: 'Audit', color: 'text-rose-400', sub: 'Forensics' },
                   { id: 'Swap', icon: ArrowRightLeft, label: 'Swap', color: 'text-indigo-400', sub: 'Atomic Link' },
                   { id: 'KYC', icon: Fingerprint, label: 'KYC', color: 'text-amber-400', sub: 'Identity' }
                 ].map((cmd) => (
                   <button 
                     key={cmd.id}
                     onClick={() => onDirectiveExecute(cmd.id)}
                     className="p-6 rounded-[2.5rem] bg-slate-900 border border-slate-800 hover:border-white/20 transition-all flex flex-col items-center gap-3 group/cmd shadow-lg"
                   >
                      <div className={`p-4 rounded-2xl bg-black border border-white/5 transition-all group-hover/cmd:scale-110 group-hover/cmd:border-current ${cmd.color}`}>
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

        {/* RIGHT PANEL: TELEMETRY & TRANSACTION FEED */}
        <div className="xl:col-span-4 flex flex-col gap-6 h-full min-h-0">
           
           <RecentTransactions transactions={mockTransactions} />

           <div className="flex-1 bg-black border border-slate-800 rounded-[3rem] p-8 flex flex-col gap-6 overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Activity className="w-40 h-40 text-emerald-500" />
              </div>
              <header className="flex items-center justify-between border-b border-white/5 pb-4 relative z-10">
                 <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Bank Pipeline Intelligence</span>
                 </div>
                 <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">LIVE_SYNC</span>
              </header>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 font-mono text-[10px] relative z-10 pr-2">
                 {[
                   { t: "14:20:01", m: "Wise PHP Anchor Verified: 2005155733", c: "text-emerald-400" },
                   { t: "14:20:08", m: "Wise USD Hub Anchored: 579574570220942", c: "text-cyan-400" },
                   { t: "14:20:15", m: "mTLS Latch Verified: api-mtls.transferwise.com", c: "text-white" },
                   { t: "14:20:22", m: "RTG Node 084009519 (USD) reporting stable", c: "text-slate-400" },
                   { t: "14:20:30", m: "TRWIUS35XXX SWIFT tunnel: 100% Alignment", c: "text-indigo-400" },
                   { t: "14:20:45", m: "WSE Bank Code handshake: SUCCESS", c: "text-amber-400" },
                 ].map((log, i) => (
                   <div key={i} className="flex gap-4 border-l-2 border-white/5 pl-4 py-1 group/log hover:border-emerald-500/30 transition-all">
                      <span className="text-slate-800 shrink-0">{log.t}</span>
                      <p className={`${log.c} opacity-80 group-hover:opacity-100 truncate`}>{log.m}</p>
                   </div>
                 ))}
              </div>

              <div className="p-6 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between relative z-10 shrink-0">
                 <div className="flex items-center gap-4">
                    <Database className="w-6 h-6 text-emerald-400" />
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black text-white uppercase tracking-widest">Vault Integrity</span>
                       <span className="text-[8px] text-slate-500 font-bold uppercase">SDS_STABLE_v16</span>
                    </div>
                 </div>
                 <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
           </div>
        </div>

      </div>

      {/* FOOTER BAR */}
      <footer className="h-14 bg-black border border-white/10 rounded-[2rem] flex items-center justify-between px-10 shrink-0 opacity-60 hover:opacity-100 transition-opacity">
         <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
               <Globe className="w-4 h-4 text-cyan-400" />
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Settlement: ENABLED</span>
            </div>
            <div className="flex items-center gap-3">
               <ShieldCheck className="w-4 h-4 text-emerald-500" />
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Owner: NEIL RUBIO BALOG</span>
            </div>
         </div>
         <div className="flex items-center gap-6">
            <span className="text-[9px] font-mono text-slate-700 tracking-[0.4em]">NEOXZ_BANK_COMMAND_v16.2.1-PRO</span>
            <Logo size={24} className="grayscale opacity-50" />
         </div>
      </footer>
    </div>
  );
};

export default NEOXZBankCommandCenter;

const SearchCheck = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="m16 7-5 5-2-2"/>
  </svg>
);


import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Zap, Globe, Cpu, Radio, Network, 
  Landmark, Activity, ArrowUpRight, Crown, 
  Terminal, Server, Database, Lock, Search,
  Navigation, Crosshair, Target, FastForward,
  Coins, Layout, BrainCircuit, WalletCards, 
  FileCheck, ShieldAlert, BarChart3, TrendingUp,
  User, RefreshCw, Layers, Orbit, Flame, CreditCard,
  BarChart4, Receipt, Wallet, Key, Settings,
  ShieldQuestion, UserPlus, Link2, Power, Unlink,
  ExternalLink, GitCommit, ArrowRightLeft, HeartHandshake,
  Wind, Scan, Microscope, Radar
} from 'lucide-react';
import { SystemStatus, TrackedTransaction } from '../types';
import GlobalTopologyMap from './GlobalTopologyMap';
import PerformanceBenchmark from './PerformanceBenchmark';
import QuantumProcessor from './QuantumProcessor';
import RecentTransactions from './RecentTransactions';
import Logo from './Logo';

interface QuantumCommandCenterProps {
  stats: SystemStatus;
  onInitiateDisplacement: () => void;
  onBankHandshake?: () => void;
  onDirectiveExecute?: (directive: string) => void;
}

const QuantumCommandCenter: React.FC<QuantumCommandCenterProps> = ({ 
  stats, 
  onInitiateDisplacement, 
  onBankHandshake,
  onDirectiveExecute 
}) => {
  const [activeLayer, setActiveLayer] = useState<'C2_TACTICAL' | 'VAULT_OPS' | 'PIPELINES' | 'INFRA_MESH'>('C2_TACTICAL');
  const [ticker, setTicker] = useState('COMMAND_CORE_READY');
  const [gridPulse, setGridPulse] = useState(false);

  // FIX: Added mockTransactions definition locally to fix "Cannot find name 'mockTransactions'" error
  const mockTransactions: TrackedTransaction[] = [
    { id: 'TX-001', amount: 50000000, platform: 'Global_Rail', destination: 'NE.B.RU', status: 'CLEARED', progress: 100, hops: [] },
    { id: 'TX-002', amount: 12500000, platform: 'SWIFT', destination: 'Humanity Core', status: 'SETTLED_LIVE', progress: 100, hops: [] },
    { id: 'TX-003', amount: 4800000, platform: 'Maya', destination: 'Local_Edge_04', status: 'DISBURSING', progress: 65, hops: [] },
    { id: 'TX-004', amount: 950000, platform: 'Binance', destination: 'Liquidity_Pool_A', status: 'IN_TRANSIT', progress: 40, hops: [] },
    { id: 'TX-005', amount: 250000000, platform: 'FedWire', destination: 'Institutional_Vault', status: 'INITIATING', progress: 5, hops: [] },
    { id: 'TX-006', amount: 33000, platform: 'GCash', destination: 'Micro_Grid_C', status: 'CLEARED', progress: 100, hops: [] },
  ];

  useEffect(() => {
    const messages = [
      "C2_OVERWATCH_STABLE", "4,117_EDGES_VERIFIED", "SDS_IMMUTABILITY_LOCK",
      "MANDATE_V16.2.1_PRO_ACTIVE", "PH_MNL_PRIMARY_TETHER_OK", "MTLS_BRIDGE_ENFORCED"
    ];
    let i = 0;
    const interval = setInterval(() => {
      setTicker(messages[i % messages.length]);
      setGridPulse(p => !p);
      i++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full gap-6 animate-in fade-in duration-1000 relative overflow-hidden font-sans">
      
      {/* TACTICAL HUD HEADER */}
      <header className="h-20 bg-black/40 border border-white/5 rounded-3xl flex items-center justify-between px-10 backdrop-blur-xl relative overflow-hidden shrink-0 group">
         <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <div className="flex items-center gap-10 relative z-10">
            <div className="flex items-center gap-5">
               <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md animate-ping"></div>
                  <Logo size={40} className="relative z-10" />
               </div>
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.6em] leading-none mb-1">Command & Control Hub</span>
                  <span className="text-[8px] font-mono text-emerald-500 tracking-widest">{ticker}</span>
               </div>
            </div>
            <div className="h-10 w-px bg-white/10"></div>
            <div className="hidden md:flex items-center gap-8">
               <div className="flex flex-col">
                  <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Reality Parity</span>
                  <span className="text-sm font-black text-white mono">1.000000</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Active Nodes</span>
                  <span className="text-sm font-black text-white mono">4,117 / 4,117</span>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-4 relative z-10">
            <div className="flex gap-1.5 bg-black/60 p-1.5 rounded-2xl border border-white/10">
               {(['C2_TACTICAL', 'VAULT_OPS', 'PIPELINES', 'INFRA_MESH'] as const).map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveLayer(tab)}
                   className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                     activeLayer === tab ? 'bg-white text-black shadow-xl' : 'text-slate-500 hover:text-white'
                   }`}
                 >
                   {tab.replace('_', ' ')}
                 </button>
               ))}
            </div>
         </div>
      </header>

      <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-0">
        
        {/* LEFT PANEL: DIRECTIVES & MANDATES */}
        <div className="xl:col-span-3 flex flex-col gap-6 min-h-0">
           <div className="p-8 rounded-[3.5rem] bg-slate-900/40 border border-emerald-500/20 shadow-3xl space-y-8 flex flex-col">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                 <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
                    <Navigation className="w-6 h-6" />
                 </div>
                 <h4 className="text-sm font-black text-white uppercase tracking-widest">Directives Deck</h4>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                 {[
                   { id: 'Disperse', icon: Zap, label: 'Disperse', sub: 'Capital Displacement' },
                   { id: 'Pay', icon: CreditCard, label: 'Pay', sub: 'Institutional Settlement' },
                   { id: 'Audit', icon: Search, label: 'Audit', sub: 'Forensic Validation' },
                   { id: 'Transact', icon: ArrowRightLeft, label: 'Transact', sub: 'Quantum Swap' }
                 ].map((cmd) => (
                   <button 
                     key={cmd.id}
                     onClick={() => onDirectiveExecute?.(cmd.id)}
                     className="p-6 rounded-[2.5rem] bg-black border border-slate-800 hover:border-emerald-500/40 transition-all flex items-center gap-5 group/cmd shadow-inner"
                   >
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 group-hover/cmd:text-emerald-400 group-hover/cmd:scale-110 transition-all">
                         <cmd.icon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col text-left">
                         <span className="text-[10px] font-black text-white uppercase tracking-widest">{cmd.label}</span>
                         <span className="text-[8px] text-slate-600 font-bold uppercase">{cmd.sub}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 ml-auto text-slate-800 group-hover/cmd:text-emerald-500 transition-colors" />
                   </button>
                 ))}
              </div>

              <button 
                onClick={onInitiateDisplacement}
                className="w-full py-8 rounded-[3rem] bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-emerald-500/30 transition-all active:scale-95 flex items-center justify-center gap-6 group"
              >
                 <FastForward className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                 Launch Master Rail
              </button>
           </div>

           {/* FORENSIC TELEMETRY */}
           <div className="p-8 rounded-[3.5rem] bg-black/60 border border-slate-800 space-y-6 flex-1 flex flex-col shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Microscope className="w-40 h-40 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4 relative z-10">
                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Forensic Scan Log</span>
                 <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2 relative z-10">
                 {[
                   "Node-4117: Fingerprint Verified.",
                   "Wise_Bridge: Production Latch OK.",
                   "SDS_Consensus: Reached in 0.001ms.",
                   "Authority: NE.B.RU verified.",
                   "Cipher: Quantum rotation - Complete.",
                   "mTLS: Subdomain Latch: api-mtls."
                 ].map((log, i) => (
                   <div key={i} className="flex gap-3 text-[9px] font-mono text-slate-500 hover:text-emerald-400 transition-colors">
                      <span className="text-emerald-900 font-black">[{i}]</span>
                      <p>{log}</p>
                   </div>
                 ))}
                 <div className="animate-pulse text-emerald-500 font-mono text-[9px]">_</div>
              </div>
           </div>
        </div>

        {/* CENTER PANEL: TACTICAL MAP / STAGE */}
        <div className="xl:col-span-6 flex flex-col gap-6 min-h-0">
           <div className="flex-1 bg-black/80 border border-slate-800 rounded-[4rem] relative overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,1)] group/main">
              {/* Tactical Grid Background */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <div className={`grid grid-cols-12 h-full transition-all duration-1000 ${gridPulse ? 'opacity-100' : 'opacity-40'}`}>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="border-r border-emerald-500/10"></div>
                    ))}
                 </div>
              </div>

              {/* View Switcher Output */}
              <div className="h-full relative z-10">
                 {activeLayer === 'C2_TACTICAL' && (
                    <div className="h-full flex flex-col p-10 gap-10">
                       <div className="flex-1 relative">
                          <GlobalTopologyMap />
                       </div>
                       <div className="p-8 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
                          <div className="flex items-center gap-6">
                             <div className="p-4 rounded-2xl bg-black border border-emerald-500/40 shadow-xl">
                                <Radar className="w-8 h-8 text-emerald-400 animate-[spin_4s_linear_infinite]" />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-lg font-black text-white uppercase tracking-widest">Tactical Edge Overwatch</span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Monitoring 4,117 server levels across global regions</span>
                             </div>
                          </div>
                          <div className="flex flex-col items-end">
                             <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">System Health</span>
                             <span className="text-2xl font-black text-white mono">100% NOMINAL</span>
                          </div>
                       </div>
                    </div>
                 )}
                 {activeLayer === 'VAULT_OPS' && (
                    <div className="h-full animate-in slide-in-from-bottom-8 duration-500">
                       <RecentTransactions transactions={mockTransactions} />
                    </div>
                 )}
                 {activeLayer === 'PIPELINES' && (
                    <div className="h-full flex items-center justify-center p-20 animate-in zoom-in duration-500">
                       <div className="p-20 rounded-[5rem] bg-black border-4 border-emerald-500/20 shadow-2xl flex flex-col items-center gap-10 text-center">
                          <div className="relative">
                             <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-[100px] animate-pulse"></div>
                             <HeartHandshake className="w-32 h-32 text-emerald-500 relative z-10" />
                          </div>
                          <div className="space-y-4">
                             <h4 className="text-4xl font-black text-white uppercase tracking-tighter">Bank Pipeline Alignment</h4>
                             <p className="text-sm text-slate-500 font-bold uppercase tracking-widest max-w-sm">Direct link established with Quantum Bank Core. mTLS Tunnel 100% Sync.</p>
                          </div>
                          <button 
                            onClick={onBankHandshake}
                            className="px-12 py-5 rounded-3xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.5em] text-xs transition-all active:scale-95 shadow-2xl shadow-emerald-500/20"
                          >
                             Verify Handshake
                          </button>
                       </div>
                    </div>
                 )}
                 {activeLayer === 'INFRA_MESH' && (
                    <div className="h-full p-10 animate-in fade-in duration-700">
                       <QuantumProcessor isExecuting={true} />
                    </div>
                 )}
              </div>
           </div>

           {/* BOTTOM HUD ACTION BAR */}
           <div className="h-24 bg-black border border-white/5 rounded-[2.5rem] flex items-center justify-between px-10 shadow-2xl shrink-0 group/bar">
              <div className="flex items-center gap-12">
                 <div className="flex items-center gap-4">
                    <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
                    <div className="flex flex-col">
                       <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest">Core Latency</span>
                       <span className="text-sm font-black text-white mono">0.0001ms</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <ShieldCheck className="w-5 h-5 text-indigo-400" />
                    <div className="flex flex-col">
                       <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest">SDS Immutability</span>
                       <span className="text-sm font-black text-white mono">ENFORCED</span>
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2 px-6 py-2 rounded-xl bg-white/5 border border-white/10 group-hover/bar:border-emerald-500/30 transition-all">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]"></div>
                    <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Sole Authority: NE.B.RU</span>
                 </div>
                 <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black transition-all cursor-pointer">
                    <Settings className="w-5 h-5" />
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT PANEL: CAPITAL & ASSET OVERWATCH */}
        <div className="xl:col-span-3 flex flex-col gap-6 min-h-0">
           {/* Capital Summary */}
           <div className="p-8 rounded-[3.5rem] bg-black border border-slate-800 space-y-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
              <div className="flex items-center justify-between">
                 <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-lg">
                    <Coins className="w-6 h-6" />
                 </div>
                 <span className="text-[11px] font-black text-white uppercase tracking-widest">Capital Overwatch</span>
              </div>

              <div className="space-y-6">
                 <div className="space-y-1">
                    <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Liquid Reserve</span>
                    <p className="text-2xl font-black text-white mono tracking-tighter">$500,004,531,802</p>
                    <div className="h-1 w-full bg-slate-900 rounded-full mt-2 overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[100%] shadow-[0_0_8px_rgba(16,185,129,1)]"></div>
                    </div>
                 </div>
                 <div className="space-y-1">
                    <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Breach Recovery</span>
                    <p className="text-2xl font-black text-white mono tracking-tighter">$485,000,000,000</p>
                    <div className="h-1 w-full bg-slate-900 rounded-full mt-2 overflow-hidden">
                       <div className="h-full bg-amber-500 w-[100%] animate-pulse"></div>
                    </div>
                 </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center gap-3">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" />
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Beneficiary Status: Locked</span>
              </div>
           </div>

           {/* TACTICAL ASSETS LIST */}
           <div className="flex-1 p-8 rounded-[3.5rem] bg-slate-900/40 border border-slate-800 space-y-6 flex flex-col shadow-inner overflow-hidden">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                 <Layers className="w-4 h-4 text-indigo-400" />
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Sovereign Assets</span>
              </div>
              
              <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1">
                 {[
                   { name: 'Wise API Pro', type: 'Gateway', val: 'ACTIVE', color: 'text-cyan-400' },
                   { name: 'G-Pay Console', type: 'Merchant', val: 'LINKED', color: 'text-blue-400' },
                   { name: 'Maya PH Rail', type: 'Local Edge', val: 'STABLE', color: 'text-emerald-400' },
                   { name: 'Quantum Core', type: 'Compute', val: '8.4 THz', color: 'text-indigo-400' },
                   { name: 'Consortium ID', type: 'Auth', val: 'SDS_OK', color: 'text-amber-400' }
                 ].map((asset, i) => (
                   <div key={i} className="p-4 rounded-2xl bg-black/60 border border-white/5 hover:border-white/10 transition-all flex items-center justify-between group/asset">
                      <div className="flex flex-col gap-0.5">
                         <span className="text-[10px] font-bold text-white uppercase tracking-tight">{asset.name}</span>
                         <span className="text-[7px] text-slate-600 font-black uppercase tracking-widest">{asset.type}</span>
                      </div>
                      <span className={`text-[9px] font-black mono uppercase ${asset.color}`}>{asset.val}</span>
                   </div>
                 ))}
              </div>

              <div className="p-5 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 flex flex-col items-center gap-3 text-center">
                 <BrainCircuit className="w-6 h-6 text-indigo-400" />
                 <p className="text-[8px] text-slate-500 font-bold uppercase leading-relaxed px-4">
                    Neural coordination active. Mandate execution paths optimized for 1.2M+ TPS.
                 </p>
              </div>
           </div>
        </div>

      </div>

      {/* FIXED C2 STATUS TICKER (FLOATING) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 h-1 bg-emerald-500/20 w-1/3 rounded-full overflow-hidden pointer-events-none">
         <div className="h-full bg-emerald-500 w-1/4 animate-[shimmer_2s_infinite_linear] bg-[length:200%_100%] shadow-[0_0_15px_rgba(16,185,129,1)]"></div>
      </div>
    </div>
  );
};

export default QuantumCommandCenter;

const SearchCheck = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="m16 7-5 5-2-2"/>
  </svg>
);

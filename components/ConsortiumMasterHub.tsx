import React, { useState, useEffect } from 'react';
import { 
  Wallet, ShieldCheck, Activity, Globe, ArrowUpRight, Zap, 
  Server, ChevronDown, ChevronUp, Database, ArrowLeft, Radio,
  Cloud, HardDrive, Cpu, Layers, Link, Bot, CheckCircle2,
  WalletCards, FileCheck, Landmark, ExternalLink, Network, Box, Crown, Coins, CloudLightning, ShieldX,
  ShieldAlert, Fingerprint, Award, BadgeCheck, FileBadge, RefreshCw, Loader2
} from 'lucide-react';
import { SystemStatus, IngestedFile, TrackedTransaction } from '../types';
import DataIngestionVault from './DataIngestionVault';
import RecentTransactions from './RecentTransactions';

interface ConsortiumMasterHubProps {
  stats: SystemStatus;
  activeView: 'OVERVIEW' | 'INGESTION';
  onViewChange: (view: 'OVERVIEW' | 'INGESTION') => void;
  onTriggerAttestation?: () => void;
  onOpenTunnel?: () => void;
}

const ConsortiumMasterHub: React.FC<ConsortiumMasterHubProps> = ({ 
  stats, activeView, onViewChange, onTriggerAttestation, onOpenTunnel
}) => {
  const [ingestedFiles, setIngestedFiles] = useState<IngestedFile[]>([]);
  const [isRecalibrating, setIsRecalibrating] = useState(false);
  const [recalibrateProgress, setRecalibrateProgress] = useState(100);
  const [merchantStatus, setMerchantStatus] = useState(() => localStorage.getItem('neoxz_merchant_calibrated') === 'true' ? 'CALIBRATED' : 'STAGED');

  const mockTransactions: TrackedTransaction[] = [
    { id: 'TX-41176', amount: 50000000, platform: 'Wise Rail', destination: 'NE.B.RU Vault', status: 'SETTLED_LIVE', progress: 100, hops: [] },
    { id: 'TX-41177', amount: 1250000, platform: 'Maya PH', destination: 'PH-MNL-01 Edge', status: 'CLEARED', progress: 100, hops: [] },
    { id: 'TX-41178', amount: 985000, platform: 'SWIFT', destination: 'Global Reserve', status: 'IN_TRANSIT', progress: 45, hops: [] }
  ];

  const [automations, setAutomations] = useState([
    {
      id: 'QUANTUM-BANK-SYS',
      name: 'NEOXZ QUANTUM BANKING SYSTEM',
      url: 'https://aistudio.google.com/u/0/apps/drive/1CDsmOSKPF3SbMgIVLmwHp--XGq4wWAT7?showPreview=true&showAssistant=true',
      type: 'AUDIT_VAULT_CORE',
      status: 'AUDIT_BALANCING_VAULT',
      progress: 100,
      icon: Landmark
    },
    { 
      id: 'SOVEREIGN-M-CORE', 
      name: 'Sovereign Merchant Core', 
      url: '#',
      type: 'PAYMENT_CORE', 
      status: merchantStatus, 
      progress: 100, 
      icon: ShieldCheck
    },
    {
      id: 'G-PAY-IN-BLOCK',
      name: 'Google Pay India API',
      url: '#',
      type: 'EXTERNAL_RAIL',
      status: 'BLOCKED_SANCTIONED',
      progress: 0,
      icon: ShieldX
    },
    {
      id: 'CF-ZERO-TRUST',
      name: 'Cloudflare Zero Trust Tunnel',
      url: '#',
      type: 'INFRASTRUCTURE_SEC',
      status: 'EDGE_READY',
      progress: 100,
      icon: CloudLightning
    }
  ]);

  const handleRecalibrate = () => {
    setIsRecalibrating(true);
    setRecalibrateProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setRecalibrateProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsRecalibrating(false);
        setMerchantStatus('CALIBRATED');
        localStorage.setItem('neoxz_merchant_calibrated', 'true');
        // Update the SOVEREIGN-M-CORE status in automations
        setAutomations(prev => prev.map(a => a.id === 'SOVEREIGN-M-CORE' ? { ...a, status: 'CALIBRATED' } : a));
      }
    }, 40);
  };

  if (activeView === 'INGESTION') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => onViewChange('OVERVIEW')}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> Back
        </button>
        <DataIngestionVault 
          onUpload={(f) => setIngestedFiles(p => [...p, ...f])} 
          ingestedFiles={ingestedFiles} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      {/* MERCHANT PROFILE STATUS SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
         <div className={`xl:col-span-8 p-12 bg-gradient-to-br from-black to-slate-900 border-2 transition-all duration-1000 ${merchantStatus === 'CALIBRATED' ? 'border-emerald-500/40 shadow-[0_0_80px_rgba(16,185,129,0.1)]' : 'border-amber-500/30'} rounded-[4rem] relative overflow-hidden group`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(245,158,11,0.05)_0%,_transparent_70%)] opacity-50"></div>
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
               <FileBadge className="w-80 h-80 text-amber-500" />
            </div>

            <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 relative z-10 gap-6">
               <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-3xl transition-all duration-700 ${merchantStatus === 'CALIBRATED' ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-amber-500 shadow-amber-500/20'} text-black shadow-2xl`}>
                     {merchantStatus === 'CALIBRATED' ? <BadgeCheck className="w-8 h-8" /> : <Award className="w-8 h-8" />}
                  </div>
                  <div>
                     <h3 className="text-2xl font-black text-white uppercase tracking-widest">Merchant Profile Upgrade</h3>
                     <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${merchantStatus === 'CALIBRATED' ? 'text-emerald-400' : 'text-amber-500'}`}>NEOXZ SYSTEMS • GOOGLE CLOUD DEVELOPER</span>
                     </div>
                  </div>
               </div>
               <div className="flex gap-3">
                 <button 
                   onClick={handleRecalibrate}
                   disabled={isRecalibrating}
                   className={`px-8 py-3 rounded-2xl transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest ${
                     merchantStatus === 'CALIBRATED' 
                       ? 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white' 
                       : 'bg-amber-500 text-black hover:bg-amber-400'
                   }`}
                 >
                    <RefreshCw className={`w-4 h-4 ${isRecalibrating ? 'animate-spin' : ''}`} />
                    {isRecalibrating ? 'Recalibrating...' : 'Trigger Recalibration'}
                 </button>
               </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
               <div className="p-8 rounded-[3rem] bg-black/60 border border-slate-800 space-y-4 shadow-inner group/data hover:border-amber-500/20 transition-colors">
                  <div className="flex items-center justify-between">
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Merchant ID</span>
                     <Fingerprint className="w-4 h-4 text-amber-500" />
                  </div>
                  <p className="text-xl font-black text-white mono tracking-tighter">BCR2DN4TU7BMDMDU</p>
                  <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                     <div className="h-full bg-amber-500 w-full"></div>
                  </div>
               </div>
               <div className="p-8 rounded-[3rem] bg-black/60 border border-slate-800 space-y-4 shadow-inner group/data hover:border-cyan-500/20 transition-colors">
                  <div className="flex items-center justify-between">
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Issuer ID</span>
                     <Box className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-xl font-black text-white mono tracking-tighter">3388000000023071477</p>
                  <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                     <div className="h-full bg-cyan-400 w-full"></div>
                  </div>
               </div>
               <div className={`p-8 rounded-[3rem] bg-black/60 border space-y-4 shadow-inner group/data transition-all duration-700 ${merchantStatus === 'CALIBRATED' ? 'border-emerald-500/30' : 'border-slate-800'}`}>
                  <div className="flex items-center justify-between">
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Profile Status</span>
                     {merchantStatus === 'CALIBRATED' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />}
                  </div>
                  <div className="flex items-baseline gap-2">
                     <span className={`text-xl font-black uppercase ${merchantStatus === 'CALIBRATED' ? 'text-emerald-400' : 'text-amber-500 animate-pulse'}`}>
                        {merchantStatus}
                     </span>
                     <span className="text-[8px] font-mono text-slate-600">SDS_LOCK</span>
                  </div>
                  <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                     <div className={`h-full transition-all duration-1000 ${merchantStatus === 'CALIBRATED' ? 'bg-emerald-500 w-full' : 'bg-amber-500 w-[65%]'}`}></div>
                  </div>
               </div>
            </div>

            <div className={`mt-10 p-6 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 transition-all duration-700 ${merchantStatus === 'CALIBRATED' ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/10'}`}>
               <div className="flex items-center gap-6">
                  <Activity className={`w-8 h-8 ${isRecalibrating ? 'text-amber-500 animate-bounce' : merchantStatus === 'CALIBRATED' ? 'text-emerald-500' : 'text-slate-700'}`} />
                  <div className="space-y-1">
                     <span className="text-[11px] font-black text-white uppercase tracking-widest">Mandate Alignment Check</span>
                     <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest italic">
                       {isRecalibrating ? `Scanning sub-atomic ID clusters... ${recalibrateProgress}%` : merchantStatus === 'CALIBRATED' ? "ALL MERCHANT RAILS ALIGNED & UPGRADED." : "Identity stagged. Handshake required for 1:1 parity."}
                     </p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="px-5 py-2 rounded-xl bg-black border border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <Cloud className="w-4 h-4 text-blue-400" />
                     GCP_NODE: neoxz-systems-v16
                  </div>
               </div>
            </div>
         </div>

         {/* QUICK STATS SIDEBAR */}
         <div className="xl:col-span-4 space-y-6">
            <div className="p-10 rounded-[3.5rem] bg-slate-900/40 border border-emerald-500/20 relative overflow-hidden group shadow-3xl flex-1 flex flex-col justify-center">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Landmark className="w-40 h-40 text-emerald-500" />
               </div>
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-4 mb-2">
                     <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Globe className="w-6 h-6" />
                     </div>
                     <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Systemic Capital</span>
                  </div>
                  <div className="text-4xl font-black text-white tracking-tighter leading-none mono glow-emerald">
                     $985,004,531,802
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
                     <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Global Liquidity Core</span>
                  </div>
               </div>
            </div>

            <div className="p-10 rounded-[3.5rem] bg-slate-900/40 border border-indigo-500/20 relative overflow-hidden group shadow-3xl flex-1 flex flex-col justify-center">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Cpu className="w-40 h-40 text-indigo-500" />
               </div>
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-4 mb-2">
                     <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <Zap className="w-6 h-6" />
                     </div>
                     <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Processing Speed</span>
                  </div>
                  <div className="text-4xl font-black text-white tracking-tighter leading-none mono">
                     12.4M TPS
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                     <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Quantum Overdrive Active</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="flex items-center justify-between px-6 py-4 rounded-[2rem] bg-slate-900/30 border border-slate-800">
         <div className="flex items-center gap-4">
            <Network className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Data Source: Light Web Financial Stream</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">SYNCING MERCHANT TRANSACTIONS</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <RecentTransactions transactions={mockTransactions} />
            
            <div className="p-8 bg-rose-950/20 border-2 border-rose-500/30 rounded-[3rem] space-y-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-10">
                  <ShieldX className="w-32 h-32 text-rose-500" />
               </div>
               <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-rose-500 text-white shadow-xl animate-pulse">
                     <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                     <h3 className="text-sm font-black uppercase tracking-widest text-white">External Rail Sanction</h3>
                     <p className="text-[9px] text-rose-500 font-bold uppercase tracking-widest mt-0.5">PROTOCOL_ENFORCED: G-PAY_INDIA_BLOCKED</p>
                  </div>
               </div>
               <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-xl">
                 Regional rail isolation for India remains absolute. Mandate prohibits third-party API exposure in high-risk zones. Merchant profile BCR2DN4TU7BMDMDU is restricted from this regional vector.
               </p>
            </div>
         </div>
         
         <div className="space-y-4">
            <div className="minimal-card p-6 rounded-2xl flex flex-col gap-4">
               <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-black text-white uppercase tracking-widest">Founder Command Center</span>
               </div>
               
               <button 
                 onClick={() => onViewChange('INGESTION')}
                 className="w-full py-4 rounded-xl bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-400 border border-white/10 text-slate-300 font-bold uppercase text-[10px] tracking-widest transition-all flex items-center justify-between px-6"
               >
                 Gather Financial Data <ArrowUpRight className="w-4 h-4" />
               </button>
            </div>

            <div className="minimal-card p-6 rounded-2xl flex flex-col gap-4">
               <div className="flex items-center gap-3 mb-2">
                  <Bot className="w-5 h-5 text-purple-400" />
                  <span className="text-xs font-black text-white uppercase tracking-widest">System Automation</span>
               </div>
               <div className="space-y-3">
                  {automations.map((auto, i) => (
                    <div key={i} className={`flex flex-col gap-2 p-3 rounded-xl bg-white/5 border border-white/5 relative overflow-hidden group ${
                      auto.id === 'G-PAY-IN-BLOCK' ? 'border-rose-500/30 bg-rose-500/5' : 
                      auto.id === 'QUANTUM-BANK-SYS' ? 'border-emerald-500/50 bg-emerald-500/10' : ''
                    }`}>
                       <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-3">
                             <div className={`p-2 rounded-lg bg-black ${auto.status.includes('BLOCK') ? 'text-rose-500' : 'text-purple-400'}`}>
                                <auto.icon className="w-4 h-4" />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-200 uppercase tracking-tight truncate max-w-[120px]">{auto.name}</span>
                                <span className="text-[8px] font-mono text-slate-500">{auto.type}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-2">
                             <span className={`text-[8px] font-black uppercase tracking-wider ${auto.status.includes('LOCKED') || auto.status.includes('READY') || auto.status.includes('CALIBRATED') ? 'text-emerald-500' : auto.status.includes('BLOCK') ? 'text-rose-500' : 'text-amber-500 animate-pulse'}`}>
                                {auto.status}
                             </span>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ConsortiumMasterHub;
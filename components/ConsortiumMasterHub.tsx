import React, { useState, useEffect } from 'react';
import { 
  Wallet, ShieldCheck, Activity, Globe, ArrowUpRight, Zap, 
  Server, ChevronDown, ChevronUp, Database, ArrowLeft, Radio,
  Cloud, HardDrive, Cpu, Layers, Link, CreditCard, Bot, CheckCircle2,
  WalletCards, FileCheck, Landmark, ExternalLink, Network, Box, Crown, Coins, CloudLightning
} from 'lucide-react';
import { SystemStatus, IngestedFile, TrackedTransaction } from '../types';
import DataIngestionVault from './DataIngestionVault';
import RecentTransactions from './RecentTransactions';
import GooglePayStatusMonitor from './GooglePayStatusMonitor';

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
      id: 'BCR2DN4TU7BMDMDU', 
      name: 'Google Pay API Integration', 
      url: 'https://pay.google.com/business/console/payment/BCR2DN4TU7BMDMDU',
      type: 'PAYMENT_CONSOLE', 
      status: 'LINKED', // Auto-linked per mandate
      progress: 100, 
      icon: CreditCard
    },
    {
      id: 'CF-ZERO-TRUST',
      name: 'Cloudflare Zero Trust Tunnel',
      url: '#',
      type: 'INFRASTRUCTURE_SEC',
      status: 'EDGE_READY',
      progress: 100,
      icon: CloudLightning
    },
    {
      id: 'SH-PAY-GATEWAY',
      name: 'SH PAY RESPONSE',
      url: 'https://www.sh-pay.com/pay/response/',
      type: 'SETTLEMENT_GATEWAY',
      status: 'AUTOMATING',
      progress: 5,
      icon: Zap
    },
    {
      id: '3388000000023071477',
      name: 'Google Wallet API',
      url: '#', // Internal linking or placeholder
      type: 'ISSUER_INTEGRATION',
      status: 'LINKED', // Auto-linked per mandate
      progress: 100, 
      icon: WalletCards
    }
  ]);

  const mockTransactions: TrackedTransaction[] = [
    { id: 'TX-001', amount: 50000000, platform: 'Global_Rail', destination: 'NE.B.RU', status: 'CLEARED', progress: 100, hops: [] },
    { id: 'TX-002', amount: 12500000, platform: 'SWIFT', destination: 'Humanity Core', status: 'SETTLED_LIVE', progress: 100, hops: [] },
    { id: 'TX-003', amount: 4800000, platform: 'Maya', destination: 'Local_Edge_04', status: 'DISBURSING', progress: 65, hops: [] },
    { id: 'TX-004', amount: 950000, platform: 'Binance', destination: 'Liquidity_Pool_A', status: 'IN_TRANSIT', progress: 40, hops: [] },
    { id: 'TX-005', amount: 250000000, platform: 'FedWire', destination: 'Institutional_Vault', status: 'INITIATING', progress: 5, hops: [] },
    { id: 'TX-006', amount: 33000, platform: 'GCash', destination: 'Micro_Grid_C', status: 'CLEARED', progress: 100, hops: [] },
  ];

  const cloudResources = [
    { name: 'GKE Cluster (Asia-SE1)', type: 'Compute Engine', icon: Server, status: 'RUNNING', cost: '$412.50' },
    { name: 'Cloud Storage (Multi-Reg)', type: 'Object Storage', icon: HardDrive, status: 'ACTIVE', cost: '$85.20' },
    { name: 'Vertex AI (Gemini 3.0 Pro)', type: 'AI Platform', icon: Cpu, status: 'PROCESSING', cost: '$1,850.00' },
    { name: 'BigQuery Ledger', type: 'Analytics', icon: Database, status: 'IDLE', cost: '$24.00' },
    { name: 'Cloud Run (Backend)', type: 'Serverless', icon: Box, status: 'RUNNING', cost: '$115.30' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAutomations(prev => prev.map(a => {
        // Automatically advance non-linked items
        if (a.status !== 'LINKED' && a.status !== 'AUDIT_BALANCING_VAULT' && a.status !== 'EDGE_READY') {
          const next = a.progress + 10;
          if (next >= 100) return { ...a, progress: 100, status: 'LINKED' };
          return { ...a, progress: next };
        }
        return a;
      }));
    }, 800);
    return () => clearInterval(interval);
  }, []);

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
      
      {/* Capital Breakdown Hero */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
         {/* NEOXZ Systemic Capital */}
         <div className="p-10 rounded-[3.5rem] bg-slate-900/40 border border-emerald-500/20 relative overflow-hidden group hover:border-emerald-500/40 transition-all shadow-3xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <Landmark className="w-40 h-40 text-emerald-500" />
            </div>
            <div className="relative z-10 space-y-4">
               <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                     <Globe className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">NEOXZ Systemic Capital</span>
               </div>
               <div className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-none mono glow-emerald">
                  $985,004,531,802.00
               </div>
               <div className="flex items-center gap-3">
                  <div className="h-1 w-16 bg-emerald-500 rounded-full"></div>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                     Global Liquidity Core
                  </span>
               </div>
            </div>
         </div>

         {/* Founder Reserve */}
         <div className="p-10 rounded-[3.5rem] bg-slate-900/40 border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-3xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <Crown className="w-40 h-40 text-amber-500" />
            </div>
            <div className="relative z-10 space-y-4">
               <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                     <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Founder Authority (NE.B.RU)</span>
               </div>
               <div className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-none mono">
                  $500,004,531,802.00
               </div>
               <div className="flex items-center gap-3">
                  <div className="h-1 w-16 bg-amber-500 rounded-full"></div>
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                     Liquid Reserve • Immediate Access
                  </span>
               </div>
            </div>
         </div>
      </div>

      {/* Light Web Data Source Indicator */}
      <div className="flex items-center justify-between px-6 py-4 rounded-[2rem] bg-slate-900/30 border border-slate-800">
         <div className="flex items-center gap-4">
            <Network className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Data Source: Light Web Financial Stream</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">GATHERING PAYMENTS & COLLECTIONS</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <RecentTransactions transactions={mockTransactions} />
            <GooglePayStatusMonitor />
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
               
               <div className="text-[9px] text-slate-600 leading-relaxed pt-2 border-t border-white/5">
                  Collecting payments and digital currencies from Light Web for Quantum Banking Audit.
               </div>
            </div>

            {/* External Automations Card */}
            <div className="minimal-card p-6 rounded-2xl flex flex-col gap-4">
               <div className="flex items-center gap-3 mb-2">
                  <Bot className="w-5 h-5 text-purple-400" />
                  <span className="text-xs font-black text-white uppercase tracking-widest">System Automation</span>
               </div>
               <div className="space-y-3">
                  {automations.map((auto, i) => (
                    <div key={i} className={`flex flex-col gap-2 p-3 rounded-xl bg-white/5 border border-white/5 relative overflow-hidden group ${
                      auto.id === 'QUANTUM-BANK-SYS' ? 'border-emerald-500/50 bg-emerald-500/10' : 
                      auto.id === 'CF-ZERO-TRUST' ? 'border-orange-500/30 bg-orange-500/5' :
                      auto.id === 'BCR2DN4TU7BMDMDU' ? 'border-blue-500/30 bg-blue-500/5' : ''
                    }`}>
                       <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-3">
                             <div className={`p-2 rounded-lg bg-black ${auto.id === 'CF-ZERO-TRUST' ? 'text-orange-500' : 'text-purple-400'}`}>
                                <auto.icon className="w-4 h-4" />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-200 uppercase tracking-tight truncate max-w-[120px]">{auto.name}</span>
                                {auto.id === 'QUANTUM-BANK-SYS' ? (
                                  <span className="text-[8px] font-mono text-emerald-400 font-black">AUDIT & VAULT</span>
                                ) : (
                                  <span className="text-[8px] font-mono text-slate-500">{auto.id}</span>
                                )}
                             </div>
                          </div>
                          <div className="flex items-center gap-2">
                             <span className={`text-[8px] font-black uppercase tracking-wider ${auto.status.includes('LINKED') || auto.status.includes('AUDIT') || auto.status === 'EDGE_READY' ? 'text-emerald-500' : 'text-amber-500 animate-pulse'}`}>
                                {auto.status}
                             </span>
                             {(auto.status.includes('LINKED') || auto.status.includes('AUDIT') || auto.status === 'EDGE_READY') && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                          </div>
                       </div>
                       
                       {(auto.status === 'PROCESSING' || auto.status === 'AUTOMATING') ? (
                         <div className="h-1 bg-slate-800 rounded-full overflow-hidden relative z-10 mt-1">
                            <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: `${auto.progress}%` }}></div>
                         </div>
                       ) : (
                         <div className={`absolute inset-0 border-l-2 pointer-events-none ${auto.id === 'CF-ZERO-TRUST' ? 'bg-orange-500/5 border-orange-500' : 'bg-emerald-500/5 border-emerald-500'}`}></div>
                       )}
                       
                       {/* Specific Action for Google Pay */}
                       {auto.id === 'BCR2DN4TU7BMDMDU' && auto.status === 'LINKED' && (
                         <button 
                           onClick={onTriggerAttestation}
                           className="w-full mt-2 py-2 rounded-lg bg-blue-500/10 text-blue-400 font-black text-[9px] uppercase tracking-widest border border-blue-500/20 hover:bg-blue-500/20 transition-all flex items-center justify-center gap-2 relative z-20"
                         >
                           <FileCheck className="w-3 h-3" />
                           ATTESTATION: VERIFIED
                         </button>
                       )}

                       {/* Action for Quantum Banking */}
                       {auto.id === 'QUANTUM-BANK-SYS' && (
                         <a 
                           href={auto.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="w-full mt-2 py-2 rounded-lg bg-emerald-500 text-black font-black text-[9px] uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 relative z-20 shadow-lg"
                         >
                           <ExternalLink className="w-3 h-3" />
                           ACCESS VAULT & AUDIT
                         </a>
                       )}

                       {/* Action for Cloudflare Tunnel */}
                       {auto.id === 'CF-ZERO-TRUST' && (
                         <button 
                           onClick={onOpenTunnel}
                           className="w-full mt-2 py-2 rounded-lg bg-[#F48120] text-black font-black text-[9px] uppercase tracking-widest hover:bg-orange-500 transition-all flex items-center justify-center gap-2 relative z-20 shadow-lg"
                         >
                           <ShieldCheck className="w-3 h-3" />
                           ESTABLISH SECURE TUNNEL
                         </button>
                       )}
                       
                       {auto.id !== 'BCR2DN4TU7BMDMDU' && auto.id !== 'QUANTUM-BANK-SYS' && auto.id !== 'CF-ZERO-TRUST' && (
                         <a href={auto.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />
                       )}
                    </div>
                  ))}
               </div>
            </div>

            {/* Cloud Resources Section */}
            <div className="minimal-card p-6 rounded-2xl flex flex-col gap-4">
               <div className="flex items-center gap-3 mb-2">
                  <Cloud className="w-5 h-5 text-blue-400" />
                  <span className="text-xs font-black text-white uppercase tracking-widest">Cloud Resources (GCP)</span>
               </div>
               <div className="space-y-3">
                  {cloudResources.map((res, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-400/30 transition-all group">
                       <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-black text-blue-400 group-hover:text-white transition-colors">
                             <res.icon className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[10px] font-bold text-slate-200 uppercase tracking-tight">{res.name}</span>
                             <span className="text-[8px] font-mono text-slate-500">{res.type}</span>
                          </div>
                       </div>
                       <div className="flex flex-col items-end">
                          <span className="text-[10px] font-mono text-white">{res.cost}</span>
                          <span className={`text-[8px] font-black uppercase tracking-wider ${res.status === 'RUNNING' || res.status === 'ACTIVE' || res.status === 'PROCESSING' ? 'text-emerald-500' : 'text-slate-500'}`}>
                             {res.status}
                          </span>
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
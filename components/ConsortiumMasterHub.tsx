
import React, { useState, useEffect } from 'react';
import { 
  Wallet, ShieldCheck, Activity, Globe, ArrowUpRight, Zap, 
  Server, ChevronDown, ChevronUp, Database, ArrowLeft, Radio,
  Cloud, HardDrive, Cpu, Layers, Link, CreditCard, Bot, CheckCircle2,
  WalletCards, FileCheck
} from 'lucide-react';
import { SystemStatus, IngestedFile, TrackedTransaction } from '../types';
import DataIngestionVault from './DataIngestionVault';
import RecentTransactions from './RecentTransactions';

interface ConsortiumMasterHubProps {
  stats: SystemStatus;
  activeView: 'OVERVIEW' | 'INGESTION';
  onViewChange: (view: 'OVERVIEW' | 'INGESTION') => void;
  onTriggerAttestation?: () => void;
}

const ConsortiumMasterHub: React.FC<ConsortiumMasterHubProps> = ({ 
  stats, activeView, onViewChange, onTriggerAttestation
}) => {
  const [ingestedFiles, setIngestedFiles] = useState<IngestedFile[]>([]);
  const [automations, setAutomations] = useState([
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
    { name: 'GKE Cluster-Alpha', type: 'Compute', icon: Server, status: 'RUNNING', cost: '$284.50' },
    { name: 'Neural Storage', type: 'Storage', icon: HardDrive, status: 'ACTIVE', cost: '$45.20' },
    { name: 'Gemini 3.0 Endpoint', type: 'AI Model', icon: Cpu, status: 'PROCESSING', cost: '$1,250.00' },
    { name: 'Ledger BigQuery', type: 'Analytics', icon: Database, status: 'IDLE', cost: '$12.00' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAutomations(prev => prev.map(a => {
        // Automatically advance non-linked items
        if (a.status !== 'LINKED') {
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
      {/* Hero Metric - Minimalist */}
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Total Systemic Liquidity</h2>
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">LIVE PARITY</span>
            </div>
         </div>
         <div className="text-7xl font-black text-white tracking-tighter leading-none">
            $985<span className="text-slate-600">.</span>004B
         </div>
         <div className="h-0.5 w-full bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-full animate-[shimmer_2s_infinite_linear] bg-[length:200%_100%]"></div>
         </div>
      </div>

      {/* KPI Grid - Clean Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {[
           { label: 'Latency', value: '0.0001ms', icon: Activity, color: 'text-indigo-400' },
           { label: 'Active Nodes', value: '4,117', icon: Server, color: 'text-cyan-400' },
           { label: 'Reality Parity', value: '1.0000', icon: Globe, color: 'text-emerald-400' },
           { label: 'Forensic Lock', value: 'SECURE', icon: ShieldCheck, color: 'text-white' }
         ].map((m, i) => (
           <div key={i} className="minimal-card p-6 rounded-2xl flex flex-col justify-between h-32 group hover:bg-white/[0.02]">
              <div className="flex justify-between items-start">
                 <m.icon className={`w-5 h-5 ${m.color}`} />
              </div>
              <div>
                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">{m.label}</span>
                 <span className="text-xl font-black text-slate-200 mono">{m.value}</span>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2">
            <RecentTransactions transactions={mockTransactions} />
         </div>
         
         <div className="space-y-4">
            <div className="minimal-card p-6 rounded-2xl flex flex-col gap-4">
               <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-black text-white uppercase tracking-widest">Action Center</span>
               </div>
               
               <button 
                 onClick={() => onViewChange('INGESTION')}
                 className="w-full py-4 rounded-xl bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-400 border border-white/10 text-slate-300 font-bold uppercase text-[10px] tracking-widest transition-all flex items-center justify-between px-6"
               >
                 Execute Displacement <ArrowUpRight className="w-4 h-4" />
               </button>
               
               <div className="text-[9px] text-slate-600 leading-relaxed pt-2 border-t border-white/5">
                  Quantum tunnel ready. Available throughput: 1.2M TPS.
               </div>
            </div>

            {/* External Automations Card */}
            <div className="minimal-card p-6 rounded-2xl flex flex-col gap-4">
               <div className="flex items-center gap-3 mb-2">
                  <Bot className="w-5 h-5 text-purple-400" />
                  <span className="text-xs font-black text-white uppercase tracking-widest">Business Automation</span>
               </div>
               <div className="space-y-3">
                  {automations.map((auto, i) => (
                    <div key={i} className={`flex flex-col gap-2 p-3 rounded-xl bg-white/5 border border-white/5 relative overflow-hidden group ${auto.id === 'BCR2DN4TU7BMDMDU' ? 'border-emerald-500/30 bg-emerald-500/5' : ''}`}>
                       <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-3">
                             <div className="p-2 rounded-lg bg-black text-purple-400">
                                <auto.icon className="w-4 h-4" />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-200 uppercase tracking-tight">{auto.name}</span>
                                <span className="text-[8px] font-mono text-slate-500">{auto.id}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-2">
                             <span className={`text-[8px] font-black uppercase tracking-wider ${auto.status === 'LINKED' ? 'text-emerald-500' : 'text-amber-500 animate-pulse'}`}>
                                {auto.status}
                             </span>
                             {auto.status === 'LINKED' && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                          </div>
                       </div>
                       
                       {auto.status === 'PROCESSING' || auto.status === 'AUTOMATING' ? (
                         <div className="h-1 bg-slate-800 rounded-full overflow-hidden relative z-10 mt-1">
                            <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: `${auto.progress}%` }}></div>
                         </div>
                       ) : (
                         <div className="absolute inset-0 bg-emerald-500/5 border-l-2 border-emerald-500 pointer-events-none"></div>
                       )}
                       
                       {/* Specific Action for Google Pay - AUTO COMPLETED VISUAL */}
                       {auto.id === 'BCR2DN4TU7BMDMDU' && auto.status === 'LINKED' && (
                         <button 
                           onClick={onTriggerAttestation}
                           className="w-full mt-2 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 font-black text-[9px] uppercase tracking-widest border border-emerald-500/20 hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2 relative z-20"
                         >
                           <FileCheck className="w-3 h-3" />
                           ATTESTATION: VERIFIED
                         </button>
                       )}
                       
                       <a href={auto.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />
                    </div>
                  ))}
               </div>
            </div>

            <div className="minimal-card p-6 rounded-2xl flex flex-col gap-4">
               <div className="flex items-center gap-3 mb-2">
                  <Cloud className="w-5 h-5 text-blue-400" />
                  <span className="text-xs font-black text-white uppercase tracking-widest">Cloud Resources</span>
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

import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, Wallet, ShieldAlert, Cpu, Globe, 
  ArrowUpRight, Activity, Zap, TrendingUp, 
  Network, Landmark, ShieldCheck, Timer, 
  Gauge, Box, Share2, Radio, Fingerprint,
  Tornado, Orbit, Sparkles, Waves, BarChart3, Building2, UploadCloud, Database
} from 'lucide-react';
import { SystemStatus, IngestedFile } from '../types';
import BaselComplianceMonitor from './BaselComplianceMonitor.tsx';
import DataIngestionVault from './DataIngestionVault.tsx';

interface ConsortiumMasterHubProps {
  stats: SystemStatus;
  activeView: 'OVERVIEW' | 'CAPITAL' | 'SECURITY' | 'NEURAL' | 'REGULATORY' | 'INGESTION';
  onViewChange: (view: 'OVERVIEW' | 'CAPITAL' | 'SECURITY' | 'NEURAL' | 'REGULATORY' | 'INGESTION') => void;
  ingestedFiles?: IngestedFile[];
  onUpload?: (files: IngestedFile[]) => void;
}

const ConsortiumMasterHub: React.FC<ConsortiumMasterHubProps> = ({ stats, activeView, onViewChange, ingestedFiles = [], onUpload }) => {
  const [load, setLoad] = useState(0.02);
  const [latency, setLatency] = useState(0.001);
  const [singularityFactor, setSingularityFactor] = useState(1.000000);
  const isDeployed = localStorage.getItem('neoxz_deployed') === 'true';

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(0.02 + Math.random() * 0.01);
      setLatency(0.001 + Math.random() * 0.0005);
      setSingularityFactor(prev => 1.000000 + (Math.random() * 0.00001 - 0.000005));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (val: number) => {
    if (val >= 1e12) return `$${(val / 1e12).toFixed(3)}T`;
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    return `$${val.toLocaleString()}`;
  };

  const navItems = [
    { id: 'OVERVIEW', label: 'Command Hub', icon: LayoutGrid, color: 'emerald' },
    { id: 'CAPITAL', label: 'Financial Rails', icon: Wallet, color: 'amber' },
    { id: 'REGULATORY', label: 'Basel III', icon: Building2, color: 'indigo' },
    { id: 'INGESTION', label: 'Vault Upload', icon: Database, color: 'cyan' },
    { id: 'SECURITY', label: 'Security Grid', icon: ShieldAlert, color: 'rose' },
    { id: 'NEURAL', label: 'Neural Core', icon: Cpu, color: 'purple' },
  ] as const;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
        <div className="flex-1 flex items-center justify-between bg-slate-900/40 border border-slate-800 p-2 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all relative group shrink-0 ${
                  activeView === item.id 
                    ? `bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] scale-105 z-10` 
                    : `text-slate-500 hover:text-white hover:bg-white/5`
                }`}
              >
                <item.icon className={`w-4 h-4 ${activeView === item.id ? 'animate-pulse' : ''}`} />
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="hidden xl:flex items-center gap-8 px-10 border-l border-slate-800/50 ml-4">
             <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                   <Timer className="w-3 h-3 text-cyan-400" />
                   <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Latency</span>
                </div>
                <span className="text-xs font-black text-white mono">{latency.toFixed(4)}ms</span>
             </div>
             <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                   <Activity className="w-3 h-3 text-emerald-400" />
                   <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Network Load</span>
                </div>
                <div className="flex items-center gap-3">
                   <span className="text-xs font-black text-white mono">{load.toFixed(2)}%</span>
                   <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${isDeployed ? 'bg-emerald-500' : 'bg-indigo-500'} w-[12%] animate-pulse`}></div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className={`flex items-center gap-4 bg-black/60 border ${stats.threatLevel === 'CRITICAL' ? 'border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.3)]' : isDeployed ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'border-slate-800'} p-4 rounded-[2.5rem] px-8 transition-all duration-500`}>
           <div className="flex flex-col">
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Master Identity</span>
              <span className={`text-[10px] font-black mono ${isDeployed ? 'text-emerald-400' : 'text-indigo-400'}`}>0x7F8E...BALOG</span>
           </div>
           <div className="h-8 w-px bg-slate-800 mx-2"></div>
           <div className="flex flex-col items-end">
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Singularity Index</span>
              <span className="text-[10px] font-black text-white mono">{isDeployed ? singularityFactor.toFixed(6) : '1.000000'}</span>
           </div>
        </div>
      </div>

      {activeView === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-8 space-y-8">
             <div className={`p-12 rounded-[3.5rem] bg-gradient-to-br from-slate-900 to-black border ${isDeployed ? 'border-emerald-500/30 shadow-[0_0_60px_rgba(16,185,129,0.1)]' : 'border-emerald-500/20'} space-y-8 shadow-3xl relative overflow-hidden group`}>
                <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="topology-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                        <circle cx="40" cy="40" r="1.2" fill={isDeployed ? "#10b981" : "#818cf8"} />
                        <path d="M40 0 L40 80 M0 40 L80 40" stroke={isDeployed ? "#10b981" : "#818cf8"} strokeWidth="0.3" strokeOpacity="0.2" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#topology-grid)" />
                  </svg>
                </div>
                
                <div className="absolute top-0 right-0 p-12 opacity-0.03 group-hover:opacity-10 transition-opacity">
                   <Landmark className="w-64 h-64 text-emerald-500" />
                </div>

                <div className="flex items-center justify-between relative z-10">
                   <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${isDeployed ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'} border`}>
                         <Wallet className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em]">Systemic Capital Core</span>
                   </div>
                   <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${isDeployed ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-indigo-500/10 text-indigo-100/50 border-indigo-500/20'} text-[9px] font-black tracking-widest`}>
                      <TrendingUp className="w-3 h-3" />
                      {isDeployed ? 'ABSOLUTE_LOCKED' : '+2.4%_INFLOW'}
                   </div>
                </div>
                
                <div className="space-y-2 relative z-10">
                   <h4 className={`text-7xl font-black text-white mono tracking-tighter transition-all duration-1000 ${isDeployed ? 'glow-emerald' : 'glow-cyan'}`}>
                     {formatCurrency(stats.neoxzBankCapital)}
                   </h4>
                   <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${isDeployed ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]' : 'bg-cyan-500'} animate-pulse`}></div>
                      <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${isDeployed ? 'text-emerald-500/60' : 'text-slate-500'}`}>
                        {isDeployed ? 'REALITY ANCHORED: PH-MNL-01 | WISE_MTLS_PRODUCTION' : 'Anchored to Maya Node-41176 | SDS Handshake'}
                      </p>
                   </div>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-4 relative z-10">
                   <div className="p-6 rounded-2xl bg-black/60 border border-slate-800 space-y-1 hover:border-emerald-500/30 transition-all cursor-crosshair">
                      <span className="text-[8px] font-black text-slate-500 uppercase">Founder Reserve</span>
                      <p className="text-sm font-black text-white mono">$54.5M</p>
                   </div>
                   <div className="p-6 rounded-2xl bg-black/60 border border-slate-800 space-y-1 hover:border-emerald-500/30 transition-all cursor-crosshair">
                      <span className="text-[8px] font-black text-slate-500 uppercase">Operational</span>
                      <p className="text-sm font-black text-white mono">$125.4M</p>
                   </div>
                   <div className="p-6 rounded-2xl bg-black/60 border border-slate-800 space-y-1 hover:border-emerald-500/30 transition-all cursor-crosshair">
                      <span className="text-[8px] font-black text-slate-500 uppercase">Recovery Vector</span>
                      <p className="text-sm font-black text-rose-500 mono">$485.0B</p>
                   </div>
                </div>
             </div>

             <div className="p-10 rounded-[3rem] bg-black border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center gap-6 shadow-2xl group/ready">
                <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                   <Waves className="w-[120%] h-[120%] text-emerald-500/20 animate-[pulse_4s_ease-in-out_infinite]" />
                </div>
                <div className="relative z-10 text-center space-y-2 w-full">
                   <div className="flex items-center justify-between mb-2 px-4">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Quantum Readiness Matrix</span>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-3 h-3 text-emerald-500" />
                        <span className="text-[8px] font-mono text-emerald-500/60 uppercase">SDS_STABLE</span>
                      </div>
                   </div>
                   <div className="flex items-center justify-around py-4 border-y border-white/5">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-3">
                           <div className={`w-1.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-1000 ${isDeployed ? 'h-16' : 'h-8 opacity-20'}`} style={{ animationDelay: `${i * 150}ms` }} />
                           <span className="text-[6px] font-mono text-slate-700">NODE_{i}</span>
                        </div>
                      ))}
                   </div>
                   <p className="text-[9px] text-emerald-400 font-black uppercase tracking-widest pt-4">SDS_PARITY: IRREVOCABLE_HANDSHAKE_v16_STABLE</p>
                </div>
             </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
             <div className="p-10 rounded-[3rem] bg-black border border-indigo-500/20 space-y-8 shadow-inner relative overflow-hidden group/infra">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/infra:opacity-10 transition-opacity">
                   <Globe className="w-48 h-48 text-indigo-500" />
                </div>
                <div className="flex items-center justify-between relative z-10">
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Node Infrastructure</span>
                   <Activity className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="space-y-1 relative z-10">
                   <h4 className="text-5xl font-black text-white mono tracking-tighter">4,117</h4>
                   <p className="text-[10px] text-indigo-500/60 font-bold uppercase tracking-widest">Federated Edges Stable</p>
                </div>
                <button 
                  onClick={() => onViewChange('NEURAL')}
                  className="w-full py-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black uppercase text-[9px] tracking-widest hover:bg-indigo-500 hover:text-black transition-all flex items-center justify-center gap-3 group/btn"
                >
                   Map Mesh Topology <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
             </div>

             <div className={`p-10 rounded-[3rem] ${isDeployed ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-slate-900/20 border-emerald-500/20'} space-y-6 relative overflow-hidden group/singu transition-all duration-1000`}>
                <div className={`absolute inset-0 ${isDeployed ? 'bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.15)_0%,_transparent_70%)]' : 'bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.05)_0%,_transparent_70%)]'} animate-pulse`}></div>
                <div className="flex items-center justify-between relative z-10">
                   <div className="flex items-center gap-3">
                      <Sparkles className={`w-5 h-5 ${isDeployed ? 'text-emerald-400' : 'text-amber-400'}`} />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">{isDeployed ? 'Reality Stabilized' : 'Singularity Lock'}</span>
                   </div>
                   <div className={`px-2 py-0.5 rounded ${isDeployed ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-emerald-500/10 text-emerald-400'} text-[8px] font-black border border-emerald-500/20`}>
                     {isDeployed ? 'MANIFESTED' : 'STAGED'}
                   </div>
                </div>
                <div className={`flex items-center gap-4 px-4 py-3 rounded-2xl bg-black border ${isDeployed ? 'border-emerald-500/30' : 'border-slate-800'} relative z-10 hover:border-emerald-500/30 transition-all cursor-help`}>
                   <Fingerprint className={`w-5 h-5 ${isDeployed ? 'text-emerald-400' : 'text-slate-500'} group-hover:text-emerald-400 transition-colors`} />
                   <span className="text-[10px] font-black text-slate-300 mono truncate">PH-MNL-01-PRODUCTION</span>
                </div>
             </div>
          </div>
        </div>
      )}

      {activeView === 'REGULATORY' && (
        <div className="animate-in slide-in-from-right-4 duration-500">
           <BaselComplianceMonitor stats={stats} autoSync={true} />
        </div>
      )}

      {activeView === 'INGESTION' && onUpload && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
           <DataIngestionVault onUpload={onUpload} ingestedFiles={ingestedFiles} />
        </div>
      )}
    </div>
  );
};

export default ConsortiumMasterHub;
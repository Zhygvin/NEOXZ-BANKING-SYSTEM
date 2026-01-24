import React, { useState } from 'react';
import { 
  Wallet, Landmark, ShieldCheck, Activity, Globe, Cpu, 
  ArrowUpRight, Zap, Server, ChevronDown, ChevronUp, Database
} from 'lucide-react';
import { SystemStatus } from '../types';

interface ConsortiumMasterHubProps {
  stats: SystemStatus;
  activeView: 'OVERVIEW' | 'INGESTION';
  onViewChange: (view: 'OVERVIEW' | 'INGESTION') => void;
}

const ConsortiumMasterHub: React.FC<ConsortiumMasterHubProps> = ({ 
  stats, activeView, onViewChange
}) => {
  const [showTelemetry, setShowTelemetry] = useState(false);

  const triggerQuantumSparks = () => {
    const sparks = document.getElementById('sparks-fx');
    const discharge = document.getElementById('discharge-fx');
    sparks?.classList.remove('sparks-active');
    discharge?.classList.remove('discharge-active');
    void sparks?.offsetWidth;
    void discharge?.offsetWidth;
    sparks?.classList.add('sparks-active');
    discharge?.classList.add('discharge-active');
  };

  const toggleTelemetry = () => {
    triggerQuantumSparks();
    setShowTelemetry(!showTelemetry);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.8em]">Sovereign Hub</h2>
          <p className="text-6xl font-black text-white tracking-tighter">System prosperity</p>
        </div>
        
        {/* ACCESS BUTTON FOR SECONDARY DATA ANALYTICS */}
        <button 
          onClick={toggleTelemetry}
          className={`flex items-center gap-4 px-10 py-5 rounded-3xl border-2 transition-all text-xs font-black uppercase tracking-widest ${
            showTelemetry 
              ? 'bg-emerald-500 text-black border-white shadow-[0_0_40px_rgba(16,185,129,0.4)]' 
              : 'bg-black border-slate-800 text-slate-500 hover:text-white hover:border-slate-500'
          }`}
        >
          {showTelemetry ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          Access System Telemetry
        </button>
      </div>

      {/* BEHIND THE SCENES: SECONDARY DATA (Hidden by default) */}
      {showTelemetry && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in slide-in-from-top-12 duration-700">
           {[
             { label: 'Network Latency', val: '0.0001ms', icon: Activity, color: 'text-indigo-400' },
             { label: 'Edge Mesh Nodes', val: '4,117', icon: Server, color: 'text-cyan-400' },
             { label: 'Reality Parity', val: '1.000000', icon: Globe, color: 'text-emerald-400' },
             { label: 'Forensic Vault', val: 'SDS_ACTIVE', icon: Database, color: 'text-white' }
           ].map((m, i) => (
             <div key={i} className="p-8 rounded-[3rem] bg-white/5 border border-white/10 flex flex-col justify-between h-44 group hover:bg-white/[0.08] transition-all">
                <div className="flex justify-between items-start">
                   <m.icon className={`w-6 h-6 ${m.color}`} />
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
                <div className="space-y-1">
                   <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{m.label}</span>
                   <p className="text-2xl font-black text-white mono">{m.val}</p>
                </div>
             </div>
           ))}
        </div>
      )}

      {/* Main Dashboard UI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
           <div className="p-16 rounded-[5rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 shadow-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-16 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <Landmark className="w-80 h-80 text-emerald-500" />
              </div>
              <div className="flex items-center gap-6 mb-12">
                 <div className="p-5 rounded-[2.5rem] bg-emerald-500 text-black shadow-2xl scale-110">
                    <Wallet className="w-10 h-10" />
                 </div>
                 <span className="text-xs font-black text-emerald-500 uppercase tracking-[0.5em]">Primary Capital Core</span>
              </div>
              
              <div className="space-y-2">
                 <h4 className="text-[9rem] font-black text-white mono tracking-tighter leading-none glow-text">
                   $985B
                 </h4>
                 <div className="flex items-center gap-4 mt-6">
                    <div className="px-6 py-2 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                       SDS_PRODUCTION_LOCKED
                    </div>
                    <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-full"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-12">
           <div className="p-12 rounded-[4rem] bg-black border border-white/5 flex flex-col items-center justify-center text-center space-y-8 shadow-2xl relative group hover:border-emerald-500/20 transition-all">
              <div className="p-8 rounded-full bg-white/5 text-emerald-400 border border-white/10 group-hover:scale-110 transition-transform">
                 <ShieldCheck className="w-16 h-16" />
              </div>
              <div className="space-y-2">
                 <h5 className="text-3xl font-black text-white uppercase tracking-tighter">Core Anchored</h5>
                 <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em]">Mandate v16.2.1 Active</p>
              </div>
           </div>

           <div className="p-12 rounded-[4rem] bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-8 relative overflow-hidden group/snap">
              <Zap className="w-10 h-10 text-emerald-400 group-hover:scale-125 transition-transform duration-500" />
              <div className="space-y-2">
                 <span className="text-[11px] font-black text-emerald-500/80 uppercase tracking-widest">Quick Displacement</span>
                 <p className="text-sm text-white font-bold leading-relaxed uppercase opacity-80">Shift capital across global rails via quantum speed tunnel.</p>
              </div>
              <button 
                onClick={() => { triggerQuantumSparks(); onViewChange('INGESTION'); }}
                className="flex items-center justify-between w-full p-6 rounded-3xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all shadow-xl active:scale-95"
              >
                Execute Anchor <ArrowUpRight className="w-6 h-6" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ConsortiumMasterHub;
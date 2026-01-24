
import React, { useState, useEffect } from 'react';
import { Globe2, Landmark, Zap, ArrowRightLeft, ShieldCheck, MapPin, Activity, Radio, Cpu, Server, Network, Coins } from 'lucide-react';

interface RealityBridgeProps {
  isActive?: boolean;
  isDisplacing?: boolean;
}

const RealityBridge: React.FC<RealityBridgeProps> = ({ isActive = false, isDisplacing = false }) => {
  const [syncStatus, setSyncStatus] = useState(0);
  const [activeNodes, setActiveNodes] = useState<string[]>([]);
  
  const nodes = ["PH-MNL-01", "US-NYC-04", "SG-SIN-02", "UK-LON-08", "JP-TYO-03"];

  useEffect(() => {
    if (isActive) {
      let currentProgress = 0;
      const interval = setInterval(() => {
        setSyncStatus(prev => {
          const next = prev < 100 ? prev + 1 : 100;
          currentProgress = next;
          return next;
        });

        const nodeIdx = Math.floor(currentProgress / 20);
        if (nodeIdx < nodes.length && !activeNodes.includes(nodes[nodeIdx])) {
          setActiveNodes(prev => [...prev, nodes[nodeIdx]]);
        }
      }, 50);
      return () => clearInterval(interval);
    } else {
      setSyncStatus(0);
      setActiveNodes([]);
    }
  }, [isActive]);

  return (
    <div className={`bg-gradient-to-br from-slate-900/90 to-black border ${isActive ? 'border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)]' : 'border-slate-800'} rounded-[3.5rem] p-12 space-y-12 shadow-3xl relative overflow-hidden backdrop-blur-3xl flex flex-col h-full transition-all duration-1000 group`}>
      <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
        <Globe2 className="w-56 h-56 text-emerald-500" />
      </div>

      {isDisplacing && (
        <div className="absolute inset-0 bg-emerald-500/5 z-0 animate-pulse pointer-events-none"></div>
      )}

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-6 text-emerald-400">
          <div className={`p-5 rounded-3xl ${isActive ? 'bg-emerald-500/20 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'bg-slate-900 border-slate-800'} border transition-all`}>
            <Radio className={`w-10 h-10 ${isActive ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-[0.4em] text-white">Reality Bridge Interface</h3>
            <span className={`text-[11px] font-bold tracking-widest uppercase ${isActive ? 'text-emerald-500' : 'text-slate-600'}`}>
              {isActive ? (isDisplacing ? 'HUMANITY PROSPERITY ACTIVE' : 'BRIDGE ACTIVE (TETHERED)') : 'BRIDGE OFFLINE'}
            </span>
          </div>
        </div>
        <div className={`flex items-center gap-3 px-5 py-2 rounded-full ${isActive ? 'bg-emerald-500 text-black' : 'bg-slate-900 text-slate-500'} text-[10px] font-black uppercase tracking-widest shadow-xl transition-all`}>
           {isActive ? 'Production Live' : 'Standby'}
        </div>
      </div>

      <div className="flex-1 space-y-10 relative z-10">
        <div className="flex items-center justify-between px-6">
           <div className="flex flex-col items-center gap-4 group/core">
              <div className={`p-6 rounded-full bg-slate-950 border ${isActive ? 'border-emerald-500/40 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-slate-800 text-slate-700'} transition-all shadow-inner relative`}>
                 <Cpu className="w-10 h-10" />
                 {isActive && (
                   <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping"></div>
                 )}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">NEOXZ Core</span>
           </div>
           
           <div className="flex-1 flex flex-col items-center gap-4 px-10 relative">
              <div className="w-full h-[2px] bg-slate-900 relative overflow-hidden rounded-full">
                 <div 
                   className={`absolute h-full ${isDisplacing ? 'bg-amber-400' : 'bg-emerald-500'} shadow-[0_0_15px_rgba(16,185,129,0.8)] transition-all duration-1000`} 
                   style={{ width: `${syncStatus}%` }}
                 />
              </div>
              
              {isDisplacing && (
                <div className="absolute inset-x-0 top-[-20px] flex justify-center">
                  <div className="flex gap-4 animate-in slide-in-from-left duration-1000 infinite">
                    <Coins className="w-5 h-5 text-amber-400 animate-bounce" />
                    <Coins className="w-5 h-5 text-amber-400 animate-bounce delay-150" />
                    <Coins className="w-5 h-5 text-amber-400 animate-bounce delay-300" />
                  </div>
                </div>
              )}

              <div className="flex flex-col items-center">
                <span className={`text-[12px] font-black mono uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-emerald-400' : 'text-slate-700'}`}>
                  {isActive ? `Sync Mastery: ${syncStatus}%` : 'LINK_INACTIVE'}
                </span>
                <span className="text-[8px] font-mono text-slate-600 mt-1">LATENCY: 0.001ms_SDS_LOCK</span>
              </div>
              <div className={`absolute top-[-30px] left-[50%] translate-x-[-50%] p-3 rounded-2xl ${isActive ? 'bg-emerald-500 text-black shadow-lg animate-bounce' : 'bg-slate-900 text-slate-600'} transition-all`}>
                 {isDisplacing ? <Coins className="w-5 h-5" /> : <ArrowRightLeft className="w-5 h-5" />}
              </div>
           </div>

           <div className="flex flex-col items-center gap-4 group/node">
              <div className={`p-6 rounded-full ${isActive ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-xl shadow-emerald-500/10 animate-pulse' : 'bg-slate-950 border-slate-800 text-slate-700'} transition-all`}>
                 <Landmark className="w-10 h-10" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Institutional Rail</span>
        </div>
      </div>

        <div className="grid grid-cols-5 gap-3">
           {nodes.map((node, i) => {
             const isNodeActive = activeNodes.includes(node);
             return (
               <div key={i} className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all duration-500 ${isNodeActive ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-black/20 border-slate-900 opacity-30'}`}>
                  <Server className={`w-4 h-4 ${isNodeActive ? 'text-emerald-400 animate-pulse' : 'text-slate-700'}`} />
                  <span className="text-[8px] font-black uppercase tracking-tighter text-slate-500">{node}</span>
                  {isNodeActive && <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-lg"></div>}
               </div>
             );
           })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-5 hover:border-emerald-500/20 transition-all shadow-inner group/card">
             <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover/card:scale-110 transition-transform">
                   <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Global Endpoint Identification</span>
             </div>
             <div className="flex flex-col gap-2">
                <span className="text-xl font-black text-white mono uppercase truncate">Maya-PH_NODE-041176</span>
                <div className="flex items-center gap-2">
                   <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500 animate-ping' : 'bg-slate-800'}`}></div>
                   <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-emerald-500' : 'text-slate-600'}`}>
                     Status: {isActive ? 'ANCHORED_IN_PRODUCTION' : 'AWAITING_SIGNAL'}
                   </span>
                </div>
             </div>
          </div>
          <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-5 hover:border-emerald-500/20 transition-all shadow-inner group/card">
             <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover/card:scale-110 transition-transform">
                   <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Sovereign Compliance Parity</span>
             </div>
             <div className="flex flex-col gap-2">
                <span className="text-xl font-black text-white mono uppercase">{isActive ? 'SDS_VERIFIED / 1.0000' : 'AUTHENTICATING...'}</span>
                <div className="flex items-center gap-2">
                   <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-500 animate-pulse' : 'bg-slate-800'}`}></div>
                   <span className={`text-[9px] font-bold uppercase tracking-widest ${isActive ? 'text-cyan-500' : 'text-slate-600'}`}>
                     Reality Impact: {isActive ? 'ABSOLUTE_MANDATE' : 'PENDING_DEPLOY'}
                   </span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className={`p-8 rounded-[2.5rem] ${isActive ? 'bg-emerald-950/20 border-emerald-500/20' : 'bg-slate-900/40 border-slate-800'} border flex items-center justify-between transition-all group-hover:border-emerald-500/30`}>
         <div className="flex items-center gap-6">
            <div className={`p-4 rounded-2xl bg-black/40 border ${isActive ? 'border-emerald-500/40 text-emerald-400 animate-pulse' : 'border-slate-800 text-slate-700'}`}>
               <Activity className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
               <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Automated Reality Mastery Engine</span>
               <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest italic mt-1">
                 {isDisplacing ? 'Humanity Mandate: Distributing abundance to global prosperity pools...' : (isActive ? 'Synthesizing profound effects across 4,117 server levels...' : 'Awaiting Master Orchestration Signal.')}
               </span>
            </div>
         </div>
         {isActive && (
           <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-black font-black uppercase text-[9px] tracking-widest shadow-lg">
              <Network className="w-4 h-4" />
              MESH_SYNCED
           </div>
         )}
      </div>
    </div>
  );
};

export default RealityBridge;

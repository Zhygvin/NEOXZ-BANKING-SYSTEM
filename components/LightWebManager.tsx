import React, { useState, useEffect } from 'react';
import { Waves, Zap, Shield, Search, Binary, Radio, Cpu, Network, ScanFace, GlobeLock, Rocket } from 'lucide-react';

const LightWebManager: React.FC = () => {
  const [meshNodes, setMeshNodes] = useState<{ id: number; x: number; y: number; active: boolean }[]>([]);
  const [packets, setPackets] = useState<{ id: number; from: number; to: number }[]>([]);

  useEffect(() => {
    // Generate static mesh nodes
    const nodes = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      active: Math.random() > 0.5
    }));
    setMeshNodes(nodes);

    const interval = setInterval(() => {
      setPackets(prev => {
        const from = Math.floor(Math.random() * nodes.length);
        const to = Math.floor(Math.random() * nodes.length);
        if (from === to) return prev;
        return [...prev, { id: Date.now(), from, to }].slice(-5);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-black border border-fuchsia-500/20 rounded-[3rem] p-10 space-y-8 shadow-3xl relative overflow-hidden backdrop-blur-3xl flex flex-col h-full group">
      <div className="absolute top-0 left-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Waves className="w-40 h-40 text-fuchsia-500" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-5 text-fuchsia-400">
          <div className="p-4 rounded-3xl bg-fuchsia-500/10 border border-fuchsia-500/20">
            <Radio className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white">Light Web Forensics</h3>
            <span className="text-[10px] text-fuchsia-500 font-bold tracking-widest uppercase">Global Scale Efficiency</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-400 uppercase tracking-widest">
           BROADCAST ACTIVE
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-8 relative z-10">
        {/* Mesh Visualization Area */}
        <div className="h-48 bg-black/40 rounded-[2rem] border border-slate-800 relative overflow-hidden group-hover:border-fuchsia-500/20 transition-all">
          <div className="absolute inset-0 opacity-20">
             {meshNodes.map(node => (
               <div key={node.id} className={`absolute w-1.5 h-1.5 rounded-full ${node.active ? 'bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.5)]' : 'bg-slate-800'}`} style={{ left: `${node.x}%`, top: `${node.y}%` }}></div>
             ))}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
             <Rocket className="w-10 h-10 text-fuchsia-500 animate-bounce" />
             <div className="text-[10px] font-black uppercase tracking-[0.5em] text-fuchsia-400">Deploying efficiency...</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 rounded-[2rem] bg-black/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-3 mb-2">
              <GlobeLock className="w-4 h-4 text-fuchsia-400" />
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Nodes Federated</span>
            </div>
            <span className="text-2xl font-black text-white mono">4,117</span>
          </div>
          <div className="p-6 rounded-[2rem] bg-black/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">System Parity</span>
            </div>
            <span className="text-2xl font-black text-emerald-400 mono">1.0000</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex items-center justify-between group-hover:border-fuchsia-500/30 transition-all">
           <div className="flex items-center gap-4">
              <ScanFace className="w-6 h-6 text-fuchsia-400" />
              <div className="flex flex-col">
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Global Handshake</span>
                 <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">SWIFT / WISE Syncing</span>
              </div>
           </div>
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-fuchsia-950/20 border border-fuchsia-500/10">
        <p className="text-[10px] text-fuchsia-400 leading-relaxed font-black uppercase tracking-tighter text-center">
          "Efficiency Deployed. All server levels synchronized to the NEOXZ Mandate at global scale."
        </p>
      </div>
    </div>
  );
};

export default LightWebManager;
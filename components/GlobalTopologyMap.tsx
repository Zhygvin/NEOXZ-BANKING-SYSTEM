import React, { useEffect, useState, useMemo } from 'react';
import { Globe, Network, Radio, ShieldCheck, Zap, Activity, Server, Cpu } from 'lucide-react';
import { generateFastResponse } from '../services/geminiService';

interface EdgeNode {
  id: string;
  location: string;
  region: string;
  x: number;
  y: number;
  status: 'ACTIVE' | 'SYNCING' | 'IDLE' | 'MAINTENANCE';
  latency: number;
  load: number;
}

const GlobalTopologyMap: React.FC = () => {
  const [nodes, setNodes] = useState<EdgeNode[]>([]);
  const [activeNodesCount, setActiveNodesCount] = useState<number>(3850);
  const [pulses, setPulses] = useState<{ id: number; fromX: number; fromY: number; toX: number; toY: number }[]>([]);
  const [nodeLogs, setNodeLogs] = useState<string[]>([]);

  // Initialize fixed core nodes
  useEffect(() => {
    const initialNodes: EdgeNode[] = [
      { id: 'PH-01', location: 'Manila', region: 'SEA', x: 75, y: 60, status: 'ACTIVE', latency: 0.001, load: 85 },
      { id: 'JP-01', location: 'Tokyo', region: 'ASIA', x: 82, y: 35, status: 'ACTIVE', latency: 4, load: 42 },
      { id: 'US-01', location: 'New York', region: 'NA', x: 25, y: 38, status: 'ACTIVE', latency: 62, load: 12 },
      { id: 'UK-01', location: 'London', region: 'EU', x: 48, y: 30, status: 'ACTIVE', latency: 55, load: 28 },
      { id: 'SG-01', location: 'Singapore', region: 'SEA', x: 72, y: 65, status: 'ACTIVE', latency: 2, load: 94 },
      { id: 'AU-01', location: 'Sydney', region: 'OC', x: 85, y: 80, status: 'ACTIVE', latency: 12, load: 15 },
      { id: 'BR-01', location: 'São Paulo', region: 'SA', x: 35, y: 75, status: 'ACTIVE', latency: 110, load: 8 },
    ];
    setNodes(initialNodes);
  }, []);

  useEffect(() => {
    // Dynamic Node Activity Simulation
    const nodeInterval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        latency: Math.max(0.001, node.latency + (Math.random() * 2 - 1)),
        load: Math.min(100, Math.max(5, node.load + (Math.random() * 10 - 5))),
        status: Math.random() > 0.98 ? 'SYNCING' : 'ACTIVE'
      })));
      setActiveNodesCount(prev => Math.min(4117, prev + Math.floor(Math.random() * 5) - 2));
    }, 2000);

    // Traffic Pulse Simulation
    const pulseInterval = setInterval(() => {
      const fromIdx = Math.floor(Math.random() * nodes.length);
      const toIdx = Math.floor(Math.random() * nodes.length);
      if (fromIdx !== toIdx && nodes[fromIdx] && nodes[toIdx]) {
        const newPulse = {
          id: Date.now(),
          fromX: nodes[fromIdx].x,
          fromY: nodes[fromIdx].y,
          toX: nodes[toIdx].x,
          toY: nodes[toIdx].y,
        };
        setPulses(prev => [...prev, newPulse].slice(-15));
      }
    }, 1200);

    // AI-Powered Network Logs (Flash)
    const logInterval = setInterval(async () => {
       try {
         const log = await generateFastResponse(
           "Generate a technical network traffic log entry between two global cities. Format: '[ROUTING] City1 -> City2 | Details'. Max 10 words.",
           "You are a global network traffic monitor. Output raw log text only."
         );
         setNodeLogs(prev => [log, ...prev].slice(0, 5));
       } catch (e) {}
    }, 4000);

    return () => {
      clearInterval(nodeInterval);
      clearInterval(pulseInterval);
      clearInterval(logInterval);
    };
  }, [nodes]);

  return (
    <div className="bg-slate-900/40 border border-emerald-500/20 rounded-[3rem] p-10 space-y-8 shadow-3xl relative overflow-hidden backdrop-blur-3xl group transition-all hover:border-emerald-500/40 min-h-[550px] flex flex-col">
      <div className="absolute top-0 left-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Globe className="w-48 h-48 text-emerald-500" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-5">
          <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20">
            <Network className="w-8 h-8 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white">Global Real-Time Topology</h3>
            <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase italic">LIVE EDGE NODE FEED v15.0</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex flex-col items-end">
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Federated Nodes</span>
              <span className="text-xl font-black text-white mono tracking-tighter">{activeNodesCount.toLocaleString()} / 4,117</span>
           </div>
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
        </div>
      </div>

      <div className="flex-1 relative bg-black/60 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-inner flex flex-col">
        {/* Map Visualization Area */}
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-10 h-full border-l border-emerald-500/10">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="border-r border-emerald-500/10"></div>
              ))}
            </div>
          </div>

          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full preserve-3d">
            {/* Connection Lines (Static Background) */}
            <path d="M75,60 L82,35 L48,30 L25,38 L35,75 L85,80 L75,60" fill="none" stroke="#10b981" strokeWidth="0.1" strokeDasharray="1,2" className="opacity-20" />
            
            {/* Active Data Pulses */}
            {pulses.map(pulse => (
              <g key={pulse.id}>
                <line 
                  x1={pulse.fromX} y1={pulse.fromY} 
                  x2={pulse.toX} y2={pulse.toY} 
                  stroke="#10b981" strokeWidth="0.2" 
                  className="animate-[pulse_1.5s_ease-out_forwards]"
                />
                <circle r="0.5" fill="#10b981">
                  <animateMotion 
                    dur="1.5s" 
                    repeatCount="1" 
                    path={`M${pulse.fromX},${pulse.fromY} L${pulse.toX},${pulse.toY}`} 
                  />
                  <animate attributeName="opacity" values="1;0" dur="1.5s" repeatCount="1" />
                </circle>
              </g>
            ))}

            {/* Nodes */}
            {nodes.map(node => (
              <g key={node.id} className="cursor-help group/node">
                <circle 
                  cx={node.x} cy={node.y} r={node.id === 'PH-01' ? "1.2" : "0.8"} 
                  className={`${node.status === 'SYNCING' ? 'fill-amber-500 animate-pulse' : 'fill-emerald-500'} transition-all`}
                />
                <circle 
                  cx={node.x} cy={node.y} r={node.id === 'PH-01' ? "3" : "2"} 
                  className={`fill-none stroke-current opacity-20 ${node.status === 'SYNCING' ? 'text-amber-500' : 'text-emerald-500'}`}
                  strokeWidth="0.1"
                >
                  <animate attributeName="r" values="0;4" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* Labels (Small) */}
                <text x={node.x} y={node.y + 3} className="fill-slate-500 font-mono text-[1.5px] uppercase tracking-tighter" textAnchor="middle">
                  {node.id}
                </text>
              </g>
            ))}
          </svg>

          {/* Regional Information Overlay */}
          <div className="absolute top-6 left-6 p-4 rounded-2xl bg-black/80 border border-slate-800 backdrop-blur-xl space-y-3 min-w-[180px] shadow-2xl">
             <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Activity className="w-3 h-3 text-emerald-500" />
                <span className="text-[9px] font-black text-white uppercase tracking-widest">Regional Metrics</span>
             </div>
             <div className="space-y-2">
                {nodes.slice(0, 3).map(n => (
                  <div key={n.id} className="flex items-center justify-between gap-4">
                     <span className="text-[8px] font-mono text-slate-500">{n.location}</span>
                     <span className={`text-[8px] font-mono ${n.latency < 5 ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}>{n.latency.toFixed(2)}ms</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="absolute bottom-6 right-6 p-4 rounded-2xl bg-black/80 border border-slate-800 backdrop-blur-xl flex flex-col gap-2 shadow-2xl">
             <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[9px] font-black text-white uppercase">Master Tether Locked</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <code className="text-[9px] text-emerald-500/80 font-mono tracking-tighter uppercase">SDS_SYNC_PARITY: 1.0000</code>
             </div>
          </div>
        </div>

        {/* Real-Time Handshake Log Feed */}
        <div className="h-24 bg-black/80 border-t border-slate-800 p-4 font-mono text-[9px] overflow-hidden flex flex-col">
           <div className="flex items-center gap-3 text-slate-500 uppercase tracking-widest mb-2 px-2">
              <Cpu className="w-3 h-3" />
              <span>Real-Time Node Handshake Log</span>
           </div>
           <div className="flex-1 space-y-1 overflow-hidden opacity-80">
              {nodeLogs.map((log, i) => (
                <div key={i} className="flex gap-4 animate-in slide-in-from-bottom-1 duration-300">
                  <span className="text-emerald-500/40 shrink-0">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                  <span className="text-slate-300 truncate">{log}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
            <p className="text-[9px] text-slate-500 leading-relaxed font-black uppercase tracking-tighter italic">
              "The NEOXZ mandate global mesh is operating at peak efficiency. All nodes verified under press.neoxz@gmail.com authority."
            </p>
         </div>
         <button className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-[9px] font-black uppercase text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
            Refresh Edges
         </button>
      </div>
    </div>
  );
};

export default GlobalTopologyMap;
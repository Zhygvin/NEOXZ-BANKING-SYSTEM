import React, { useEffect, useState, useMemo, useRef } from 'react';
import { 
  Globe, Network, Radio, ShieldCheck, Zap, 
  Activity, Server, Cpu, Database, 
  Crosshair, Loader2, RefreshCw, Layers,
  Compass, Map as MapIcon, Radar, Wifi, Terminal
} from 'lucide-react';
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
  const [view, setView] = useState<'GLOBAL' | 'CLUSTER' | 'MESH'>('GLOBAL');
  const [activeNodesCount, setActiveNodesCount] = useState<number>(4114);
  const [pulses, setPulses] = useState<{ id: number; fromX: number; fromY: number; toX: number; toY: number }[]>([]);
  const [nodeLogs, setNodeLogs] = useState<string[]>([]);
  const [hoveredNode, setHoveredNode] = useState<EdgeNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize fixed core nodes
  useEffect(() => {
    const initialNodes: EdgeNode[] = [
      { id: 'PH-MNL-01', location: 'Manila', region: 'PH', x: 75, y: 60, status: 'ACTIVE', latency: 0.001, load: 85 },
      { id: 'JP-TYO-01', location: 'Tokyo', region: 'JP', x: 82, y: 35, status: 'ACTIVE', latency: 4, load: 42 },
      { id: 'US-NYC-01', location: 'New York', region: 'US', x: 25, y: 38, status: 'ACTIVE', latency: 62, load: 12 },
      { id: 'UK-LON-01', location: 'London', region: 'UK', x: 48, y: 30, status: 'ACTIVE', latency: 55, load: 28 },
      { id: 'SG-SIN-01', location: 'Singapore', region: 'SG', x: 72, y: 65, status: 'ACTIVE', latency: 2, load: 94 },
      { id: 'AU-SYD-01', location: 'Sydney', region: 'AU', x: 85, y: 80, status: 'ACTIVE', latency: 12, load: 15 },
      { id: 'BR-SAO-01', location: 'São Paulo', region: 'BR', x: 35, y: 75, status: 'ACTIVE', latency: 110, load: 8 },
    ];
    setNodes(initialNodes);
  }, []);

  // 4,117 Node Status Matrix (Canvas based for performance)
  useEffect(() => {
    if (view !== 'MESH') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = 71; // sqrt(4117) approx 64, adjusted for aspect ratio
      const rows = 58; 
      const size = 6;
      const gap = 2;
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          if (idx >= 4117) break;
          
          const x = c * (size + gap);
          const y = r * (size + gap);
          
          // Random health simulation
          const health = Math.random();
          if (health > 0.99) ctx.fillStyle = '#f59e0b'; // Amber
          else if (health > 0.999) ctx.fillStyle = '#f43f5e'; // Rose
          else ctx.fillStyle = 'rgba(16, 185, 129, 0.4)'; // Emerald
          
          ctx.beginPath();
          ctx.roundRect(x, y, size, size, 1);
          ctx.fill();
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [view]);

  useEffect(() => {
    const nodeInterval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        latency: Math.max(0.001, node.latency + (Math.random() * 2 - 1)),
        load: Math.min(100, Math.max(5, node.load + (Math.random() * 10 - 5))),
        status: Math.random() > 0.98 ? 'SYNCING' : 'ACTIVE'
      })));
      setActiveNodesCount(prev => Math.min(4117, prev + Math.floor(Math.random() * 5) - 2));
    }, 2000);

    const pulseInterval = setInterval(() => {
      const fromIdx = Math.floor(Math.random() * nodes.length);
      const toIdx = Math.floor(Math.random() * nodes.length);
      if (fromIdx !== toIdx && nodes[fromIdx] && nodes[toIdx]) {
        setPulses(prev => [...prev, {
          id: Date.now(),
          fromX: nodes[fromIdx].x,
          fromY: nodes[fromIdx].y,
          toX: nodes[toIdx].x,
          toY: nodes[toIdx].y,
        }].slice(-20));
      }
    }, 800);

    const logInterval = setInterval(async () => {
       try {
         const log = await generateFastResponse(
           "Generate a technical network routing log entry. Format: '[SDS_SYNC] NodeID_Hash -> Target | 1.0000 Parity'. Max 10 words.",
           "Global topology monitor."
         );
         setNodeLogs(prev => [log, ...prev].slice(0, 8));
       } catch (e) {}
    }, 5000);

    return () => {
      clearInterval(nodeInterval);
      clearInterval(pulseInterval);
      clearInterval(logInterval);
    };
  }, [nodes]);

  return (
    <div className="bg-slate-900/40 border border-emerald-500/20 rounded-[3.5rem] p-10 space-y-8 shadow-3xl relative overflow-hidden backdrop-blur-3xl group transition-all hover:border-emerald-500/40 min-h-[600px] flex flex-col">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
        <Radar className="w-48 h-48 text-emerald-500 animate-spin-slow" />
      </div>

      {/* TACTICAL HEADER */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-6">
          <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Compass className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-[0.4em] text-white">Federated Mesh Overwatch</h3>
            <div className="flex items-center gap-3 mt-1">
               <span className="text-[10px] text-emerald-500 font-black tracking-widest uppercase italic">Node Parity: 1.000000</span>
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex gap-1.5 bg-black/60 p-1.5 rounded-2xl border border-slate-800">
              {(['GLOBAL', 'CLUSTER', 'MESH'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                    view === v ? 'bg-emerald-500 text-black shadow-xl' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {v}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* MAIN VISUALIZATION STAGE */}
      <div className="flex-1 relative bg-black/60 border border-slate-800 rounded-[3rem] overflow-hidden shadow-inner flex flex-col group/stage">
        
        {/* VIEW 1: GLOBAL TOPOLOGY */}
        {view === 'GLOBAL' && (
          <div className="flex-1 relative animate-in fade-in duration-500">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full preserve-3d">
              {/* Connection Lines (SDS Mesh) */}
              {nodes.map((n1, i) => nodes.slice(i + 1).map(n2 => (
                <line 
                  key={`${n1.id}-${n2.id}`}
                  x1={n1.x} y1={n1.y} 
                  x2={n2.x} y2={n2.y} 
                  stroke="rgba(16, 185, 129, 0.05)" 
                  strokeWidth="0.1"
                />
              )))}
              
              {/* Active Data Pulses */}
              {pulses.map(pulse => (
                <g key={pulse.id}>
                  <path 
                    d={`M${pulse.fromX},${pulse.fromY} Q${(pulse.fromX + pulse.toX)/2},${(pulse.fromY + pulse.toY)/2 - 10} ${pulse.toX},${pulse.toY}`}
                    fill="none" stroke="#10b981" strokeWidth="0.3" 
                    className="opacity-40"
                    style={{ strokeDasharray: '1, 5' }}
                  />
                  <circle r="0.6" fill="#fff" filter="url(#glow)">
                    <animateMotion 
                      dur="1.2s" 
                      repeatCount="1" 
                      path={`M${pulse.fromX},${pulse.fromY} Q${(pulse.fromX + pulse.toX)/2},${(pulse.fromY + pulse.toY)/2 - 10} ${pulse.toX},${pulse.toY}`} 
                    />
                  </circle>
                </g>
              ))}

              {/* Nodes */}
              {nodes.map(node => (
                <g key={node.id} onMouseEnter={() => setHoveredNode(node)} onMouseLeave={() => setHoveredNode(null)} className="cursor-crosshair">
                  <circle 
                    cx={node.x} cy={node.y} r={node.id === 'PH-MNL-01' ? "1.5" : "1.0"} 
                    className={`${node.status === 'SYNCING' ? 'fill-amber-500' : 'fill-emerald-500'} transition-all`}
                  />
                  <circle cx={node.x} cy={node.y} r="3" className="fill-emerald-500/10 animate-pulse" />
                </g>
              ))}
            </svg>
          </div>
        )}

        {/* VIEW 2: CLUSTER ANALYTICS */}
        {view === 'CLUSTER' && (
          <div className="flex-1 p-12 grid grid-cols-2 md:grid-cols-4 gap-8 animate-in zoom-in-95 duration-500 overflow-y-auto custom-scrollbar">
             {['ASIA-SOUTH', 'EUROPE-WEST', 'NA-NORTH', 'OCEANIA', 'LATAM', 'AFRICA-CENTRAL', 'ASIA-EAST', 'MIDDLE-EAST'].map((cluster, i) => (
               <div key={i} className="p-8 rounded-[2.5rem] bg-black/40 border border-slate-800 flex flex-col items-center gap-4 group/cluster hover:border-emerald-500/40 transition-all">
                  <div className="relative">
                     <div className="w-20 h-20 rounded-full border-2 border-emerald-500/20 flex items-center justify-center group-hover/cluster:border-emerald-500/50 transition-colors">
                        <Server className="w-8 h-8 text-emerald-400" />
                     </div>
                     <div className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[8px] font-black">512 NODES</div>
                  </div>
                  <div className="text-center">
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">{cluster}</span>
                     <p className="text-[8px] text-slate-500 font-bold uppercase mt-1">Status: NOMINAL</p>
                  </div>
                  <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[94%] animate-pulse"></div>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* VIEW 3: 4,117 NODE STATUS MESH */}
        {view === 'MESH' && (
          <div className="flex-1 p-8 flex items-center justify-center animate-in slide-in-from-bottom-4 duration-500 relative">
             <div className="relative">
                <canvas 
                  ref={canvasRef} 
                  width={566} 
                  height={462} 
                  className="max-w-full rounded-2xl shadow-2xl border border-white/5" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
             </div>
             
             <div className="absolute bottom-12 right-12 p-6 rounded-3xl bg-black/80 border border-emerald-500/30 backdrop-blur-xl space-y-4 max-w-xs shadow-3xl">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-xl bg-emerald-500 text-black shadow-lg">
                      <Layers className="w-4 h-4" />
                   </div>
                   <span className="text-[10px] font-black text-white uppercase tracking-widest">Full Mesh View</span>
                </div>
                <p className="text-[9px] text-slate-400 font-medium leading-relaxed uppercase">
                   Displaying individual status of all 4,117 edge nodes. Uptime distribution optimized at 100% SDS parity.
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                   <span className="text-[9px] font-black text-emerald-500 uppercase">Master Hash Lock</span>
                   <code className="text-[9px] text-slate-600">0x7F...BALOG</code>
                </div>
             </div>
          </div>
        )}

        {/* PERSISTENT NODE DETAILS (HOVER/INFO) */}
        {hoveredNode && (
          <div className="absolute top-8 right-8 p-6 rounded-[2.5rem] bg-black/90 border border-emerald-500/40 backdrop-blur-2xl shadow-3xl animate-in fade-in zoom-in-95 duration-200 min-w-[240px] z-50">
             <header className="flex justify-between items-start mb-6">
                <div className="flex flex-col gap-1">
                   <span className="text-xl font-black text-white mono">{hoveredNode.id}</span>
                   <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{hoveredNode.location}, {hoveredNode.region}</span>
                </div>
                <div className="p-2 rounded-xl bg-emerald-500 text-black">
                   <ShieldCheck className="w-4 h-4" />
                </div>
             </header>
             <div className="space-y-4">
                <div className="flex justify-between">
                   <span className="text-[9px] font-bold text-slate-500 uppercase">Core Latency</span>
                   <span className="text-[11px] font-black text-white mono">{hoveredNode.latency.toFixed(4)}ms</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-[9px] font-bold text-slate-500 uppercase">Resource Load</span>
                   <span className="text-[11px] font-black text-white mono">{hoveredNode.load.toFixed(1)}%</span>
                </div>
                <div className="h-px bg-white/5 my-2"></div>
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]"></div>
                   <span className="text-[9px] font-black text-emerald-500 uppercase">SDS_SYNC_LOCKED</span>
                </div>
             </div>
          </div>
        )}

        {/* REAL-TIME LOG FOOTER */}
        <div className="h-32 bg-black/80 border-t border-slate-800 p-6 font-mono text-[10px] flex flex-col shrink-0">
           <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-3 text-slate-500 uppercase tracking-[0.2em] font-black">
                 {/* Added Terminal icon here */}
                 <Terminal className="w-3 h-3" />
                 <span>System Handshake Stream</span>
              </div>
              <div className="flex items-center gap-4">
                 <span className="text-emerald-500/60 uppercase">{activeNodesCount.toLocaleString()} EDGES ONLINE</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
           </div>
           <div className="flex-1 overflow-hidden space-y-1.5">
              {nodeLogs.map((log, i) => (
                <div key={i} className="flex gap-4 animate-in slide-in-from-left-2 opacity-80 hover:opacity-100 transition-opacity">
                  <span className="text-slate-800 font-black shrink-0">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                  <p className="text-slate-400 truncate">{log}</p>
                </div>
              ))}
              <div className="animate-pulse text-emerald-500 font-black tracking-widest pl-2">_</div>
           </div>
        </div>
      </div>

      <footer className="flex flex-col lg:flex-row items-center justify-between px-4 pt-2 gap-6 opacity-60 hover:opacity-100 transition-opacity">
         <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
               <Database className="w-4 h-4 text-emerald-500" />
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">SDS Parity Ledger: 1.0000</span>
            </div>
            <div className="flex items-center gap-3">
               <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Wise v3.2 API Bridge: LATCHED</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <span className="text-[8px] font-mono text-slate-700 uppercase tracking-[0.5em] italic">MANDATE_TOPOLOGY_v16.2.1-PRO</span>
            <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
               <RefreshCw className="w-3 h-3" />
            </button>
         </div>
      </footer>

      {/* Global Glow Effects */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
};

export default GlobalTopologyMap;
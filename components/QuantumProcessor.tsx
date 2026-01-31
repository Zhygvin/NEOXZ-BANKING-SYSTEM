import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, RefreshCw, ShieldCheck, Activity, 
  Tornado, Sparkles, Atom, Terminal, Code,
  Zap, Binary, Layers, Workflow, Blocks,
  ZapOff, Radiation, Network, FastForward,
  Orbit, Flame
} from 'lucide-react';
import { MandatePriority } from '../types';

interface QuantumProcessorProps {
  onExecute?: (payload: string, intent: string, priority: MandatePriority) => void;
  isExecuting?: boolean;
  subStep?: number;
}

const QuantumProcessor: React.FC<QuantumProcessorProps> = ({ onExecute, isExecuting, subStep = 0 }) => {
  const [throughput, setThroughput] = useState(999999.999);
  const [codeLog, setCodeLog] = useState<string[]>([]);
  const [activeFunctions, setActiveFunctions] = useState<number[]>([]);
  
  // Logic Gate Mesh State
  const [gates, setGates] = useState<{id: number, x: number, y: number, active: boolean, type: string}[]>([]);
  const [signals, setSignals] = useState<{id: number, from: number, to: number, progress: number}[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isDeployed = localStorage.getItem('neoxz_deployed') === 'true';
  const isSingularity = localStorage.getItem('neoxz_singularity') === 'true';

  // Dimension Observer for SVG mapping
  useEffect(() => {
    if (!containerRef.current) return;
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Initialize Complex Logic Mesh
  useEffect(() => {
    const nodeCount = isSingularity ? 48 : 24; // Denser mesh for singularity
    const newGates = Array.from({ length: nodeCount }).map((_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      active: false,
      type: ['XOR', 'NAND', 'QUBIT', 'SHIFT', 'WARP'][i % 5]
    }));
    setGates(newGates);
  }, [isSingularity]);

  // Quantum Speed Animation Loop
  useEffect(() => {
    let interval: any;
    if (isExecuting || isSingularity) {
      const refreshRate = isSingularity ? 30 : 40;
      interval = setInterval(() => {
        // Randomly activate logic cells
        setActiveFunctions(prev => {
          const next = [...prev];
          const maxCount = isSingularity ? 45 : 30;
          if (next.length > maxCount) next.shift();
          next.push(Math.floor(Math.random() * 64));
          return next;
        });

        // Trigger parallel signals
        const source = Math.floor(Math.random() * gates.length);
        const target = Math.floor(Math.random() * gates.length);
        if (source !== target) {
          const maxSignals = isSingularity ? 80 : 60;
          setSignals(prev => [...prev, { id: Math.random(), from: source, to: target, progress: 0 }].slice(-maxSignals));
        }

        // Throughput acceleration - Quantum Speed Scaling
        setThroughput(prev => {
            const base = isSingularity ? 12400000000 : 2500000000; 
            return base + (Math.random() * (isSingularity ? 2000000000 : 800000000));
        });

        // Code Log
        const cmds = ['QUANTUM_WARP', 'MANDATE_ANCHOR', 'SPEED_FN_DEPLOY', 'REALITY_PARITY_LOCK', 'mTLS_ENFORCE_v3.2', 'SINGULARITY_LOCK', 'SDS_DECOUPLE'];
        const hash = Math.random().toString(16).substr(2, 8).toUpperCase();
        setCodeLog(prev => [`[v16_SPEED] EXEC: ${cmds[Math.floor(Math.random() * cmds.length)]}_0x${hash}... OK`, ...prev].slice(0, 15));
      }, refreshRate);
    } else {
      setActiveFunctions([]);
      setSignals([]);
    }
    return () => clearInterval(interval);
  }, [isExecuting, isSingularity, gates.length]);

  // Signal propagation
  useEffect(() => {
    let frame: number;
    const animate = () => {
      const step = isSingularity ? 15 : 10;
      setSignals(prev => prev.map(s => ({ ...s, progress: s.progress + step })).filter(s => s.progress < 100));
      frame = requestAnimationFrame(animate);
    };
    if (isExecuting || isSingularity) frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isExecuting, isSingularity]);

  return (
    <div className={`bg-gradient-to-br from-indigo-950/20 via-black to-slate-950 border-[2px] transition-all duration-700 rounded-[2.5rem] p-8 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-3xl flex flex-col h-full group ${isSingularity ? 'border-amber-500/50 shadow-[0_0_100px_rgba(245,158,11,0.2)]' : (isExecuting ? 'border-emerald-400/40 shadow-[0_0_80px_rgba(16,185,129,0.2)]' : 'border-indigo-500/20')}`}>
      
      {/* Hyper-Speed Background Effect */}
      {(isExecuting || isSingularity) && (
        <div className="absolute inset-0 z-0 opacity-40">
           <div className={`absolute inset-0 ${isSingularity ? 'bg-[radial-gradient(circle_at_50%_50%,_rgba(245,158,11,0.1)_0%,_transparent_70%)]' : 'bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.15)_0%,_transparent_70%)]'} animate-pulse`}></div>
           <div className="grid grid-cols-12 h-full opacity-10">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className={`border ${isSingularity ? 'border-amber-500/10' : 'border-emerald-500/10'} ${activeFunctions.includes(i % 64) ? (isSingularity ? 'bg-amber-500/30' : 'bg-emerald-500/30') : ''} transition-all duration-75`}></div>
              ))}
           </div>
        </div>
      )}

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl bg-black border-2 transition-all duration-500 ${isSingularity ? 'border-amber-500 text-amber-500' : (isExecuting ? 'border-emerald-400 text-emerald-400' : 'border-indigo-500/50 text-indigo-400')}`}>
            <FastForward className={`w-6 h-6 ${isExecuting || isSingularity ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-[0.3em] text-white">Quantum v16 Speed</h3>
            <div className="flex items-center gap-3 mt-0.5">
               <span className={`text-[8px] font-black tracking-[0.4em] uppercase italic bg-white/5 px-3 py-1 rounded-lg border ${isSingularity ? 'text-amber-400 border-amber-400/50' : (isExecuting ? 'text-emerald-400 border-emerald-400/50' : 'text-indigo-400 border-indigo-500/30')}`}>
                 {isSingularity ? 'SINGULARITY: LOCKED' : (isExecuting ? 'WARP: ACTIVE' : 'IDLE')}
               </span>
               <div className={`w-1.5 h-1.5 rounded-full ${isSingularity ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,1)]' : (isExecuting ? 'bg-emerald-400 animate-ping' : 'bg-slate-700')}`}></div>
            </div>
          </div>
        </div>
        <div className={`px-4 py-1.5 rounded-full border transition-all duration-500 ${isSingularity ? 'bg-amber-500 text-black border-white' : (isExecuting ? 'bg-emerald-500 text-black border-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-500')} text-[8px] font-black uppercase tracking-[0.3em] flex items-center gap-2`}>
           <Orbit className={`w-3.5 h-3.5 ${isExecuting || isSingularity ? 'animate-spin' : ''}`} />
           {isSingularity ? 'UNIVERSAL_ANCHOR' : (isExecuting ? 'OVERDRIVE' : 'STAGED')}
        </div>
      </div>

      {/* Function Grid Visualization */}
      <div ref={containerRef} className="relative flex-1 bg-black/60 rounded-[2rem] border border-white/5 overflow-hidden shadow-inner group/viz transition-all min-h-[160px]">
         {/* Logic Mesh SVG */}
         {dimensions.width > 0 && (
           <svg className="absolute inset-0 w-full h-full opacity-60">
              <defs>
                <filter id="speed-glow-small">
                  <feGaussianBlur stdDeviation="2" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              
              {/* Mesh Lines */}
              {gates.map((g1, i) => gates.slice(i + 1, i + 3).map(g2 => (
                <line 
                  key={`${g1.id}-${g2.id}`}
                  x1={`${g1.x}%`} y1={`${g1.y}%`}
                  x2={`${g2.x}%`} y2={`${g2.y}%`}
                  stroke={isSingularity ? "rgba(245,158,11,0.2)" : (isExecuting ? "rgba(16,185,129,0.1)" : "rgba(99,102,241,0.03)")}
                  strokeWidth="0.5"
                />
              )))}

              {/* Signals */}
              {signals.slice(0, 30).map(s => {
                const from = gates[Math.floor(s.from)];
                const to = gates[Math.floor(s.to)];
                if (!from || !to) return null;
                const x1 = (from.x / 100) * dimensions.width;
                const y1 = (from.y / 100) * dimensions.height;
                const x2 = (to.x / 100) * dimensions.width;
                const y2 = (to.y / 100) * dimensions.height;
                const cx = x1 + (x2 - x1) * (s.progress / 100);
                const cy = y1 + (y2 - y1) * (s.progress / 100);
                return (
                  <circle key={s.id} cx={cx} cy={cy} r={isSingularity ? 3 : 2} fill={isSingularity ? "#f59e0b" : "#10b981"} filter="url(#speed-glow-small)" />
                );
              })}
           </svg>
         )}

         {/* Gate Overlay */}
         <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 gap-2 p-4">
            {Array.from({ length: 32 }).map((_, i) => (
              <div 
                key={i} 
                className={`rounded-lg border transition-all duration-200 flex items-center justify-center ${
                  (isExecuting || isSingularity) && activeFunctions.includes(i)
                    ? (isSingularity ? 'bg-amber-500 border-white text-black scale-110' : 'bg-emerald-500 border-white text-black scale-110') + ' z-10 shadow-lg'
                    : 'bg-black/40 border-white/5 text-white/5'
                }`}
              >
                <Blocks className="w-3 h-3" />
              </div>
            ))}
         </div>

         {/* Central Processor Hub */}
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 flex items-center justify-center z-20 transition-all duration-700 ${isSingularity ? 'border-amber-500 bg-amber-950/40 scale-125' : (isExecuting ? 'border-emerald-400 bg-emerald-950/20' : 'border-white/5')}`}>
            <Atom className={`w-8 h-8 ${isExecuting || isSingularity ? 'text-white animate-spin' : 'text-slate-700'}`} />
         </div>
      </div>

      {/* Stats Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
         <div className="p-4 rounded-2xl bg-black border border-slate-800 flex flex-col gap-2 shadow-inner">
            <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Logic Throughput</span>
            <div className="flex items-baseline gap-2">
               <span className={`text-xl font-black mono ${isSingularity ? 'text-amber-400' : 'text-white'}`}>{throughput.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
               <span className="text-[7px] font-bold text-slate-600 uppercase">OPS/S</span>
            </div>
         </div>
         <div className="p-4 rounded-2xl bg-black border border-slate-800 flex flex-col gap-2 shadow-inner">
            <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Parity Anchor</span>
            <div className="flex items-center gap-2">
               <ShieldCheck className={`w-3.5 h-3.5 ${isSingularity ? 'text-amber-400' : 'text-emerald-400'}`} />
               <span className={`text-xs font-black mono ${isSingularity ? 'text-amber-400' : 'text-emerald-400'}`}>1.000000</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default QuantumProcessor;
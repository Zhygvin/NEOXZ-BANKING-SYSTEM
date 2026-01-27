
import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, RefreshCw, ShieldCheck, Activity, 
  Tornado, Sparkles, Atom, Terminal, Code,
  Zap, Binary, Layers, Workflow, Blocks,
  ZapOff, Radiation, Network
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
    const newGates = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      active: false,
      type: ['XOR', 'NAND', 'QUBIT', 'SHIFT'][i % 4]
    }));
    setGates(newGates);
  }, []);

  // Quantum Speed Animation Loop
  useEffect(() => {
    let interval: any;
    if (isExecuting) {
      interval = setInterval(() => {
        // Randomly activate logic cells
        setActiveFunctions(prev => {
          const next = [...prev];
          if (next.length > 20) next.shift();
          next.push(Math.floor(Math.random() * 64));
          return next;
        });

        // Trigger parallel signals
        const source = Math.floor(Math.random() * gates.length);
        const target = Math.floor(Math.random() * gates.length);
        if (source !== target) {
          setSignals(prev => [...prev, { id: Math.random(), from: source, to: target, progress: 0 }].slice(-40));
        }

        // Throughput acceleration
        setThroughput(prev => {
            const base = 950000000;
            return base + (Math.random() * 50000000);
        });

        // Code Log
        const cmds = ['DEPLOY_FN', 'SYST_LOCK', 'CAP_DISPLACE', 'REALITY_PARITY', 'mTLS_PUSH'];
        const hash = Math.random().toString(16).substr(2, 8).toUpperCase();
        setCodeLog(prev => [`[v16_PRO] EXEC: ${cmds[Math.floor(Math.random() * cmds.length)]}_0x${hash}... OK`, ...prev].slice(0, 12));
      }, 60);
    } else {
      setActiveFunctions([]);
      setSignals([]);
    }
    return () => clearInterval(interval);
  }, [isExecuting, gates.length]);

  // Signal propagation
  useEffect(() => {
    let frame: number;
    const animate = () => {
      setSignals(prev => prev.map(s => ({ ...s, progress: s.progress + 6 })).filter(s => s.progress < 100));
      frame = requestAnimationFrame(animate);
    };
    if (isExecuting) frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isExecuting]);

  return (
    <div className={`bg-gradient-to-br from-indigo-950 via-black to-slate-950 border-[3px] transition-all duration-1000 rounded-[4rem] p-12 space-y-10 shadow-3xl relative overflow-hidden backdrop-blur-3xl flex flex-col h-full group ${isExecuting ? 'border-cyan-400 shadow-[0_0_120px_rgba(34,211,238,0.4)]' : 'border-indigo-500/20'}`}>
      
      {/* Hyper-Speed Background Effect */}
      {isExecuting && (
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,211,238,0.2)_0%,_transparent_70%)] animate-pulse"></div>
           <div className="grid grid-cols-8 h-full opacity-10">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className={`border border-cyan-500/20 ${activeFunctions.includes(i) ? 'bg-cyan-500/40' : ''}`}></div>
              ))}
           </div>
        </div>
      )}

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-6">
          <div className={`p-6 rounded-[2.5rem] bg-black border-[3px] transition-all duration-500 ${isExecuting ? 'border-white text-white shadow-[0_0_50px_rgba(255,255,255,0.4)]' : 'border-indigo-500/50 text-indigo-400'}`}>
            <Tornado className={`w-10 h-10 ${isExecuting ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h3 className="text-3xl font-black uppercase tracking-[0.4em] text-white">Quantum v16 Pro</h3>
            <div className="flex items-center gap-4 mt-1">
               <span className={`text-[10px] font-black tracking-[0.5em] uppercase italic bg-white/5 px-4 py-1.5 rounded-xl border ${isExecuting ? 'text-cyan-400 border-cyan-400/50' : 'text-indigo-400 border-indigo-500/30'}`}>
                 {isExecuting ? 'DEPLOYING_FUNCTIONS...' : 'CORE_IDLE_v16'}
               </span>
               <div className={`w-2 h-2 rounded-full ${isExecuting ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'}`}></div>
            </div>
          </div>
        </div>
        <div className={`px-8 py-3 rounded-full border-[3px] transition-all duration-500 ${isExecuting ? 'bg-white text-black border-white shadow-[0_0_40px_rgba(255,255,255,0.4)]' : 'bg-slate-900 border-slate-800 text-slate-500'} text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-4`}>
           <RefreshCw className={`w-4 h-4 ${isExecuting ? 'animate-spin' : ''}`} />
           {isExecuting ? 'HYPER_WARP' : 'STAGED'}
        </div>
      </div>

      {/* Function Grid Visualization */}
      <div ref={containerRef} className="relative h-80 bg-black/60 rounded-[3.5rem] border-2 border-white/5 overflow-hidden shadow-inner flex-shrink-0 group/viz transition-all hover:border-white/10">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.02)_0%,_transparent_70%)]"></div>
         
         {/* Logic Mesh SVG */}
         {dimensions.width > 0 && (
           <svg className="absolute inset-0 w-full h-full opacity-60">
              <defs>
                <filter id="proc-glow">
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              
              {/* Mesh Lines */}
              {gates.map((g1, i) => gates.slice(i + 1, i + 3).map(g2 => (
                <line 
                  key={`${g1.id}-${g2.id}`}
                  x1={`${g1.x}%`} y1={`${g1.y}%`}
                  x2={`${g2.x}%`} y2={`${g2.y}%`}
                  stroke={isExecuting ? "rgba(34,211,238,0.1)" : "rgba(99,102,241,0.05)"}
                  strokeWidth="1"
                />
              )))}

              {/* Signals */}
              {signals.map(s => {
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
                  <circle key={s.id} cx={cx} cy={cy} r={isExecuting ? 3 : 1} fill={isExecuting ? "#22d3ee" : "#818cf8"} filter="url(#proc-glow)" />
                );
              })}
           </svg>
         )}

         {/* Gate Overlay */}
         <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 gap-4 p-8">
            {Array.from({ length: 32 }).map((_, i) => (
              <div 
                key={i} 
                className={`rounded-xl border-2 transition-all duration-300 flex items-center justify-center ${
                  isExecuting && activeFunctions.includes(i)
                    ? 'bg-cyan-500 border-white text-black shadow-[0_0_20px_rgba(34,211,238,0.8)] scale-110' 
                    : 'bg-black/40 border-white/5 text-white/10'
                }`}
              >
                <Blocks className="w-5 h-5" />
              </div>
            ))}
         </div>

         {/* Central Quantum Parity Core */}
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 flex items-center justify-center z-20 transition-all duration-1000 ${isExecuting ? 'border-cyan-400 bg-cyan-900/20 shadow-[0_0_150px_rgba(34,211,238,0.6)] scale-110' : 'border-white/5 bg-black/40'}`}>
            <div className={`absolute inset-0 rounded-full border border-dashed transition-all duration-[3000ms] ${isExecuting ? 'border-cyan-500/50 animate-[spin_10s_linear_infinite]' : 'border-white/10'}`}></div>
            <Atom className={`w-10 h-10 transition-all duration-1000 ${isExecuting ? 'text-white animate-spin-slow drop-shadow-[0_0_10px_rgba(34,211,238,1)]' : 'text-slate-700'}`} />
            {isExecuting && (
              <div className="absolute -bottom-8 text-[8px] font-black text-cyan-400 uppercase tracking-widest animate-pulse whitespace-nowrap">
                Parity Alignment: LOCKED
              </div>
            )}
         </div>

         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-black/80 border border-white/10 text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 backdrop-blur-md">
            MANDATE_DEPLOYMENT_MATRIX_v16_STABLE
         </div>
      </div>

      {/* Analytics & Controls */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-0 relative z-10">
         {/* Live Execution Stream */}
         <div className="lg:col-span-7 bg-black border-2 border-slate-900 rounded-[3.5rem] p-10 overflow-hidden relative flex flex-col shadow-2xl">
            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
               <div className="flex items-center gap-4">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quantum Function Stream</span>
               </div>
               <div className="flex gap-1.5">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${isExecuting ? 'bg-cyan-500 animate-pulse' : 'bg-slate-800'}`} style={{ animationDelay: `${i * 150}ms` }}></div>
                  ))}
               </div>
            </div>
            <div className="flex-1 overflow-hidden font-mono text-[10px] space-y-3 relative">
               {codeLog.map((log, i) => (
                 <div key={i} className="animate-in slide-in-from-left-4 duration-300 flex items-center gap-4 group/log">
                    <span className="text-slate-800 font-black shrink-0">[{i.toString().padStart(2, '0')}]</span>
                    <span className={`transition-colors ${i === 0 ? 'text-cyan-400 font-black glow-cyan' : 'text-slate-500 group-hover/log:text-slate-300'}`}>{log}</span>
                 </div>
               ))}
               {codeLog.length === 0 && (
                 <div className="flex flex-col items-center justify-center h-full opacity-20 gap-4">
                    <Network className="w-12 h-12 text-slate-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">Awaiting Sub-Atomic Link...</span>
                 </div>
               )}
            </div>
         </div>

         {/* Right Analytics */}
         <div className="lg:col-span-5 flex flex-col gap-8">
            <div className={`flex-1 p-10 rounded-[3.5rem] bg-black/95 border-[3px] transition-all duration-1000 ${isExecuting ? 'border-cyan-500/50 shadow-[0_0_50px_rgba(34,211,238,0.2)]' : 'border-indigo-500/20'} relative overflow-hidden flex flex-col justify-center group/card`}>
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
               <div className="flex items-center justify-between relative z-10 mb-4 px-2">
                  <div className="flex items-center gap-3">
                     <Layers className={`w-5 h-5 ${isExecuting ? 'text-cyan-400 animate-bounce' : 'text-slate-700'}`} />
                     <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">Logic Throughput</span>
                  </div>
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded border ${isExecuting ? 'text-cyan-400 border-cyan-400/30' : 'text-slate-800 border-slate-800'}`}>REALTIME_BENCH</span>
               </div>
               <div className="px-2 relative z-10">
                  <span className={`text-6xl font-black mono tracking-tighter transition-all duration-500 ${isExecuting ? 'text-white glow-cyan' : isDeployed ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {throughput.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-sm font-black text-slate-700 uppercase tracking-widest ml-4 italic">OPS/SEC</span>
               </div>
               <div className="mt-8 h-2 bg-slate-900 rounded-full overflow-hidden relative z-10 shadow-inner">
                  <div className={`h-full ${isExecuting ? 'bg-cyan-400 animate-pulse' : 'bg-indigo-600'} transition-all duration-500`} style={{ width: isExecuting ? '100%' : `${Math.min(100, (throughput / 100000000) * 100)}%` }}></div>
               </div>
               <div className="mt-4 flex justify-between px-2 text-[8px] font-black text-slate-700 uppercase tracking-widest relative z-10">
                  <span className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-cyan-500" />
                    Latency: 0.0001ms
                  </span>
                  <span>SDS_PARITY: 1.0000</span>
               </div>
            </div>

            <button 
              onClick={() => onExecute?.("SECURED_PAYLOAD", "v16_PRO_FUNCTION_DEPLOY", "SOVEREIGN")}
              disabled={isExecuting || isDeployed}
              className={`w-full py-8 rounded-[3rem] font-black uppercase tracking-[0.5em] text-[12px] transition-all shadow-3xl flex items-center justify-center gap-6 group/btn relative overflow-hidden border-[3px] ${
                isExecuting || isDeployed
                  ? 'bg-slate-950 text-slate-700 border-slate-900 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400 shadow-indigo-500/40 active:scale-95'
              }`}
            >
              {isExecuting ? (
                <>
                  <Workflow className="w-6 h-6 animate-spin" />
                  MANDATE_IN_FLIGHT
                </>
              ) : isDeployed ? (
                <>
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                  PRODUCTION_ANCHORED
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6 group-hover/btn:scale-125 transition-transform" />
                  DEPLOY QUANTUM FUNCTIONS
                </>
              )}
            </button>
         </div>
      </div>
    </div>
  );
};

export default QuantumProcessor;

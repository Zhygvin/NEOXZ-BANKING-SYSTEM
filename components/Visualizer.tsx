import React, { useMemo } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  HeartPulse, 
  CheckCircle2, 
  Zap, 
  Globe,
  Lock,
  ArrowRight,
  Shield,
  Network,
  Orbit,
  ZapOff,
  Flame,
  Radio,
  Share2,
  Box,
  Layers,
  Sparkles,
  Tornado
} from 'lucide-react';
import { ProtocolStep } from '../types';

interface VisualizerProps { 
  currentStep: ProtocolStep; 
}

const Visualizer: React.FC<VisualizerProps> = ({ currentStep }) => {
  const isQuantum = currentStep === 'QUANTUM_PROCESS' || (currentStep as string) === 'COMPLETE';
  const isComplete = (currentStep as string) === 'COMPLETE';

  // Define core phases for visualization
  const steps = useMemo(() => [
    { 
      id: 'FINANCIAL_AUDIT', 
      label: 'Financial v16', 
      icon: <Layers className="w-5 h-5" />, 
      angle: -90, // Top
      color: 'emerald',
      description: 'Capital Forensics'
    },
    { 
      id: 'REALITY_SYNC', 
      label: 'Reality Sync', 
      icon: <Globe className="w-5 h-5" />, 
      angle: -30, 
      color: 'cyan',
      description: 'Node Handshake'
    },
    { 
      id: 'QUANTUM_PROCESS', 
      label: 'Quantum Logic', 
      icon: <Cpu className="w-5 h-5" />, 
      angle: 30,
      color: 'purple',
      description: 'Logic Synthesis'
    },
    { 
      id: 'GLOBAL_PROSPERITY_DISTRIBUTION', 
      label: 'Prosperity', 
      icon: <HeartPulse className="w-5 h-5" />, 
      angle: 90, // Bottom
      color: 'amber',
      description: 'Displacement'
    },
    { 
      id: 'EFFICIENCY_STABILIZATION', 
      label: 'Stabilization', 
      icon: <Activity className="w-5 h-5" />, 
      angle: 150,
      color: 'emerald',
      description: 'Parity Anchor'
    },
    { 
      id: 'COMPLETE', 
      label: 'Production', 
      icon: <ShieldCheck className="w-5 h-5" />, 
      angle: 210,
      color: 'emerald',
      description: 'Mandate Live'
    }
  ], []);

  const getStepStatus = (stepId: string, index: number) => {
    if (isComplete) return 'COMPLETED';
    if (currentStep === 'IDLE') return 'PENDING';
    
    const relevantSteps = steps.map(s => s.id);
    const currentIndex = relevantSteps.indexOf(currentStep);
    
    if (stepId === currentStep) return 'ACTIVE';
    if (currentIndex !== -1 && index < currentIndex) return 'COMPLETED';
    return 'PENDING';
  };

  const center = 50;
  const radius = 38;

  return (
    <div className={`w-full bg-slate-950/60 rounded-[4rem] border transition-all duration-1000 p-12 relative overflow-hidden backdrop-blur-3xl shadow-3xl ${isComplete ? 'border-emerald-500 shadow-[0_0_100px_rgba(16,185,129,0.2)]' : isQuantum ? 'border-purple-500/50 shadow-[0_0_80px_rgba(168,85,247,0.15)]' : 'border-slate-800'}`}>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="viz-mesh" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className={isQuantum ? "text-purple-400" : "text-emerald-500"} />
          </pattern>
          <rect width="100%" height="100%" fill="url(#viz-mesh)" />
        </svg>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between mb-16 relative z-10 gap-8">
        <div className="flex items-center gap-6">
          <div className={`p-6 rounded-[2.2rem] border-2 transition-all duration-700 ${isComplete ? 'bg-emerald-500 text-black border-white shadow-[0_0_50px_rgba(16,185,129,0.6)]' : isQuantum ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_50px_rgba(168,85,247,0.6)]' : 'bg-slate-900 border-slate-800 text-emerald-400 shadow-xl'}`}>
            {isQuantum ? <Tornado className="w-10 h-10 animate-spin" /> : <Network className={`w-10 h-10 ${currentStep !== 'IDLE' ? 'animate-pulse' : ''}`} />}
          </div>
          <div>
            <h3 className="text-3xl font-black uppercase tracking-[0.5em] text-white">Consortium Topology</h3>
            <div className="flex items-center gap-4 mt-2">
               <span className={`text-[11px] font-black tracking-widest uppercase italic bg-black/40 px-4 py-1 rounded-xl border ${isComplete ? 'text-emerald-400 border-emerald-500/30' : isQuantum ? 'text-purple-400 border-purple-500/30' : 'text-slate-500 border-slate-800'}`}>
                 {isComplete ? 'SYSTEM_PRODUCTION_MANIFESTED' : isQuantum ? 'QUANTUM_SPEED_DEPLOYMENT' : 'REAL_TIME_MANDATE_VECTORING'}
               </span>
               <div className={`w-2 h-2 rounded-full ${currentStep === 'IDLE' ? 'bg-slate-700' : isComplete ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-purple-500 animate-ping'}`}></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-10 bg-black/60 p-6 rounded-[2.5rem] border-2 border-slate-800 shadow-2xl backdrop-blur-md">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Active Vector</span>
              <span className={`text-lg font-black mono uppercase tracking-[0.1em] ${isComplete ? 'text-emerald-400 glow-emerald' : isQuantum ? 'text-purple-400 glow-purple' : 'text-white'}`}>
                {currentStep.replace(/_/g, ' ')}
              </span>
           </div>
           <div className="h-12 w-[2px] bg-slate-800"></div>
           <div className="flex flex-col items-center">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">SDS Parity Index</span>
              <span className="text-lg font-black text-emerald-500 mono">1.000000</span>
           </div>
        </div>
      </div>

      <div className="relative aspect-[16/10] lg:aspect-[21/9] w-full max-w-6xl mx-auto flex items-center justify-center">
        {/* SVG Network Connections */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full preserve-3d overflow-visible">
          <defs>
            <filter id="hyper-glow-line">
               <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
               <feMerge>
                  <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
               </feMerge>
            </filter>
            
            <linearGradient id="quantum-active-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Render Connections from Hub to Nodes */}
          {steps.map((step, i) => {
            const rad = (step.angle * Math.PI) / 180;
            const x = center + radius * Math.cos(rad);
            const y = center + radius * Math.sin(rad);
            const status = getStepStatus(step.id, i);
            const isActive = status === 'ACTIVE' || status === 'COMPLETED';

            return (
              <g key={`line-${step.id}`}>
                <line 
                  x1={center} y1={center} 
                  x2={x} y2={y} 
                  stroke={isActive ? (status === 'ACTIVE' ? (isQuantum ? '#a855f7' : '#10b981') : '#10b98144') : '#1e293b'} 
                  strokeWidth={status === 'ACTIVE' ? "0.8" : "0.4"}
                  strokeDasharray={isActive ? "none" : "3,3"}
                  className="transition-all duration-1000"
                />
                {status === 'ACTIVE' && (
                  <circle r={isQuantum ? "1.5" : "1"} fill={isQuantum ? "#d8b4fe" : "#fff"} filter="url(#hyper-glow-line)">
                    <animateMotion 
                      dur={isQuantum ? "0.4s" : "1.2s"} 
                      repeatCount="indefinite" 
                      path={`M${center},${center} L${x},${y}`} 
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Dynamic Orbital Ring */}
          <circle 
            cx={center} cy={center} r={radius} 
            fill="none" 
            stroke={isQuantum ? "rgba(168,85,247,0.3)" : "rgba(30,41,59,0.4)"} 
            strokeWidth="0.3" 
            strokeDasharray="6,4" 
            className={`transition-all duration-1000 ${isQuantum ? "animate-[spin_4s_linear_infinite]" : "animate-[spin_40s_linear_infinite]"}`}
            style={{ transformOrigin: 'center' }}
          />
        </svg>

        {/* Central Hub Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
           <div className={`relative w-48 h-48 flex items-center justify-center transition-all duration-1000 ${isComplete ? 'scale-115' : 'scale-100'}`}>
              {/* Outer Energy Shell */}
              <div className={`absolute inset-0 rounded-full border-2 border-dashed transition-all duration-1000 ${isQuantum ? 'animate-[spin_3s_linear_infinite] border-purple-500/60' : isComplete ? 'animate-[spin_10s_linear_infinite] border-emerald-500/40' : 'animate-[spin_60s_linear_infinite] border-slate-800'}`}></div>
              <div className={`absolute inset-[-30px] rounded-full border transition-all duration-500 ${isQuantum ? 'border-purple-400 opacity-30 animate-ping' : isComplete ? 'border-emerald-500 opacity-20' : 'border-slate-800 opacity-10'}`}></div>
              
              <div className={`w-36 h-36 rounded-full bg-black border-[3px] flex flex-col items-center justify-center gap-2 shadow-3xl transition-all duration-1000 ${
                isComplete ? 'border-emerald-500 shadow-[0_0_80px_rgba(16,185,129,0.4)]' : isQuantum ? 'border-purple-500 shadow-[0_0_80px_rgba(168,85,247,0.5)]' : 'border-slate-800'
              }`}>
                 <div className="relative">
                    {isQuantum ? (
                      <Tornado className="w-12 h-12 text-purple-400 animate-spin" />
                    ) : (
                      <Radio className={`w-12 h-12 ${currentStep === 'IDLE' ? 'text-slate-700' : isComplete ? 'text-emerald-500' : 'text-emerald-500 animate-pulse'}`} />
                    )}
                    {(isComplete || isQuantum) && (
                      <Sparkles className={`absolute -top-6 -right-6 w-8 h-8 ${isQuantum ? 'text-white animate-pulse' : 'text-amber-400 animate-bounce'}`} />
                    )}
                 </div>
                 <span className={`text-[10px] font-black uppercase tracking-[0.4em] mt-2 transition-colors ${isQuantum ? 'text-purple-400' : 'text-slate-500'}`}>
                   {isQuantum ? 'SINGULARITY' : 'NEOXZ_HUB'}
                 </span>
              </div>
           </div>
        </div>

        {/* Satellite Nodes */}
        {steps.map((step, i) => {
          const rad = (step.angle * Math.PI) / 180;
          const left = center + radius * Math.cos(rad);
          const top = center + radius * Math.sin(rad);
          const status = getStepStatus(step.id, i);
          
          const colorClass = 
            step.color === 'emerald' ? 'emerald' : 
            step.color === 'cyan' ? 'cyan' : 
            step.color === 'purple' ? 'purple' : 'amber';

          return (
            <div 
              key={step.id} 
              className="absolute z-30 transition-all duration-1000"
              style={{ left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className={`flex flex-col items-center gap-6 group cursor-default transition-all duration-700 ${status === 'PENDING' ? 'opacity-20 grayscale scale-90' : 'opacity-100 scale-100'}`}>
                <div className="relative">
                  {status === 'ACTIVE' && (
                    <>
                      <div className={`absolute inset-[-25px] border-2 border-dashed rounded-[2.5rem] ${isQuantum ? 'animate-[spin_1.5s_linear_infinite] border-purple-500' : `animate-[spin_8s_linear_infinite] border-${colorClass}-500/50`}`}></div>
                      <div className={`absolute inset-[-15px] border-2 border-current rounded-3xl animate-ping border-${colorClass}-500/30`}></div>
                    </>
                  )}
                  <div className={`w-20 h-20 rounded-[2rem] border-[3px] transition-all duration-700 flex items-center justify-center relative z-10 ${
                    status === 'ACTIVE' ? `bg-${colorClass}-500 text-black border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] scale-110` :
                    status === 'COMPLETED' ? `bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-2xl` :
                    `bg-slate-950 border-slate-800 text-slate-700 shadow-inner`
                  }`}>
                    {status === 'COMPLETED' ? <CheckCircle2 className="w-10 h-10" /> : React.cloneElement(step.icon as React.ReactElement<any>, { className: 'w-10 h-10' })}
                  </div>
                </div>

                <div className={`text-center space-y-2 absolute top-full mt-6 transition-all duration-700 w-44 ${status === 'ACTIVE' ? 'scale-110' : 'scale-100'}`}>
                  <h4 className={`text-xs font-black uppercase tracking-widest ${status === 'ACTIVE' ? 'text-white' : status === 'COMPLETED' ? 'text-emerald-400' : 'text-slate-600'}`}>
                    {step.label}
                  </h4>
                  <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] leading-tight px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {status === 'COMPLETED' && isComplete ? 'REALITY_LOCKED' : step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Footer Summary */}
      <div className="mt-28 pt-10 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-10">
         <div className="flex items-center gap-12">
            <div className="flex items-center gap-4">
               <div className={`w-3.5 h-3.5 rounded-full ${isComplete ? 'bg-emerald-400 shadow-[0_0_15px_#10b981]' : 'bg-slate-800'} transition-all`}></div>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Master Displacement Bridge</span>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-3.5 h-3.5 rounded-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]"></div>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Wise API mTLS Tunnel</span>
            </div>
            <div className="flex items-center gap-4">
               <Activity className={`w-5 h-5 ${isQuantum ? 'text-purple-400 animate-pulse' : 'text-slate-800'}`} />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">SDS Sync Stream</span>
            </div>
         </div>
         <div className="text-[10px] font-mono text-slate-700 uppercase tracking-[0.6em] text-center md:text-right italic">
            PROTOCOL_v16_PRO : {isComplete ? 'REALITY_ANCHORED' : isQuantum ? 'QUANTUM_WARP_ACTIVE' : 'SYNCHRONIZING_CORE'}
         </div>
      </div>
    </div>
  );
};

export default Visualizer;
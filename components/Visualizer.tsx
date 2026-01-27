import React, { useMemo } from 'react';
import { 
  ShieldCheck, Activity, Cpu, HeartPulse, Network, 
  Globe, Radio, Zap
} from 'lucide-react';
import { ProtocolStep } from '../types';

interface VisualizerProps { 
  currentStep: ProtocolStep; 
}

const Visualizer: React.FC<VisualizerProps> = ({ currentStep }) => {
  const isComplete = (currentStep as string) === 'COMPLETE';

  const steps = useMemo(() => [
    { id: 'FINANCIAL_AUDIT', label: 'Financial', icon: <Activity className="w-4 h-4" />, angle: -90, color: 'emerald' },
    { id: 'REALITY_SYNC', label: 'Reality', icon: <Globe className="w-4 h-4" />, angle: -30, color: 'cyan' },
    { id: 'QUANTUM_PROCESS', label: 'Logic', icon: <Cpu className="w-4 h-4" />, angle: 30, color: 'purple' },
    { id: 'GLOBAL_PROSPERITY', label: 'Prosperity', icon: <HeartPulse className="w-4 h-4" />, angle: 90, color: 'amber' },
    { id: 'STABILIZATION', label: 'Stable', icon: <ShieldCheck className="w-4 h-4" />, angle: 150, color: 'emerald' },
    { id: 'PRODUCTION', label: 'Prod', icon: <Radio className="w-4 h-4" />, angle: 210, color: 'emerald' }
  ], []);

  const getStepStatus = (stepId: string) => {
    if (isComplete) return 'COMPLETED';
    if (currentStep === 'IDLE') return 'PENDING';
    if (stepId === currentStep) return 'ACTIVE';
    return 'PENDING'; // Simplified logic for visual clarity
  };

  const center = 50;
  const radius = 35;

  return (
    <div className="minimal-card rounded-[3rem] p-10 relative overflow-hidden h-[400px] flex items-center justify-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.05)_0%,_transparent_60%)]"></div>
      
      {/* SVG Network */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full preserve-3d">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Central Hub */}
        <circle cx={center} cy={center} r="8" fill="#000" stroke="#10b981" strokeWidth="0.5" filter="url(#glow)" />
        <circle cx={center} cy={center} r="4" fill="#10b981" className="animate-pulse" />

        {/* Connections & Nodes */}
        {steps.map((step, i) => {
          const rad = (step.angle * Math.PI) / 180;
          const x = center + radius * Math.cos(rad);
          const y = center + radius * Math.sin(rad);
          const status = getStepStatus(step.id);
          const isActive = status === 'ACTIVE' || isComplete;

          return (
            <g key={step.id}>
              {/* Connection Line */}
              <line 
                x1={center} y1={center} x2={x} y2={y} 
                stroke={isActive ? '#10b981' : '#1e293b'} 
                strokeWidth={isActive ? '0.3' : '0.1'}
                strokeDasharray={isActive ? '0' : '2'}
                className="transition-all duration-500"
              />
              
              {/* Lightning Effect on Active Path */}
              {isActive && (
                <circle r="0.8" fill="#fff" filter="url(#glow)">
                  <animateMotion dur="2s" repeatCount="indefinite" path={`M${center},${center} L${x},${y}`} />
                </circle>
              )}

              {/* Node */}
              <circle 
                cx={x} cy={y} r="6" 
                fill="#000" 
                stroke={isActive ? '#10b981' : '#1e293b'} 
                strokeWidth="0.5" 
                className="transition-colors duration-500"
              />
            </g>
          );
        })}
      </svg>

      {/* React Node Overlay for Icons */}
      {steps.map((step, i) => {
        const rad = (step.angle * Math.PI) / 180;
        // Adjust for HTML positioning (percentage based)
        const left = 50 + 35 * Math.cos(rad); 
        const top = 50 + 35 * Math.sin(rad);
        const status = getStepStatus(step.id);
        const isActive = status === 'ACTIVE' || isComplete;

        return (
          <div 
            key={step.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <div className={`p-2 rounded-full transition-all duration-500 ${isActive ? 'text-emerald-400 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'text-slate-700'}`}>
               {step.icon}
            </div>
            <span className={`text-[8px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-slate-600'}`}>
              {step.label}
            </span>
          </div>
        );
      })}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-emerald-500/50">
         <Zap className="w-3 h-3" />
         <span className="text-[8px] font-black uppercase tracking-[0.3em]">Quantum Mesh Active</span>
      </div>
    </div>
  );
};

export default Visualizer;
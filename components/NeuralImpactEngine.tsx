
import React, { useState, useEffect } from 'react';
// Added CheckCircle2 to the imports from lucide-react
import { Sparkles, Activity, Shield, Zap, Globe, Target, TrendingUp, BrainCircuit, CheckCircle2 } from 'lucide-react';
import { NeuralImpact } from '../types';

interface NeuralImpactEngineProps {
  isDeployed?: boolean;
}

const NeuralImpactEngine: React.FC<NeuralImpactEngineProps> = ({ isDeployed = false }) => {
  const [impact, setImpact] = useState<NeuralImpact>({
    prosperity: 84,
    sovereignty: 92,
    infrastructure: 78,
    parity: 100,
    summary: "Mandate v16.0 stabilizing reality vectors. Global parity anchored."
  });

  useEffect(() => {
    // If deployed, fluctuations are minimal (stable system)
    const factor = isDeployed ? 0.2 : 1;
    const interval = setInterval(() => {
      setImpact(prev => ({
        ...prev,
        prosperity: Math.min(100, Math.max(80, prev.prosperity + (Math.random() * 2 - 1) * factor)),
        infrastructure: Math.min(100, Math.max(70, prev.infrastructure + (Math.random() * 4 - 2) * factor)),
        summary: isDeployed ? "GLOBAL PARITY ANCHORED AT 1.0000. PROSPERITY VECTORS SECURED." : "Mandate v16.0 stabilizing reality vectors. Global parity anchored."
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, [isDeployed]);

  const vectors = [
    { label: 'Prosperity', value: impact.prosperity, icon: <Sparkles className="w-4 h-4" />, color: 'text-amber-400' },
    { label: 'Sovereignty', value: impact.sovereignty, icon: <Shield className="w-4 h-4" />, color: 'text-emerald-400' },
    { label: 'Infrastructure', value: impact.infrastructure, icon: <Activity className="w-4 h-4" />, color: 'text-indigo-400' },
    { label: 'Parity', value: impact.parity, icon: <Zap className="w-4 h-4" />, color: 'text-cyan-400' }
  ];

  return (
    <div className={`bg-slate-900/60 border transition-all duration-1000 rounded-[3rem] p-10 space-y-10 shadow-3xl relative overflow-hidden backdrop-blur-3xl group hover:border-indigo-500/40 ${isDeployed ? 'border-emerald-500/30' : 'border-indigo-500/20'}`}>
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <BrainCircuit className={`w-48 h-48 ${isDeployed ? 'text-emerald-400' : 'text-indigo-400'}`} />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-5">
          <div className={`p-4 rounded-3xl border transition-all shadow-lg ${isDeployed ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'}`}>
            <Target className={`w-8 h-8 ${!isDeployed ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white">Neural Impact Simulation</h3>
            <span className={`text-[10px] font-bold tracking-widest uppercase italic ${isDeployed ? 'text-emerald-400' : 'text-indigo-500'}`}>
                {isDeployed ? 'MANDATE_ANCHORED_IN_PRODUCTION' : 'Real-Time Reality Forecasting'}
            </span>
          </div>
        </div>
        <div className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all ${isDeployed ? 'bg-emerald-500 text-black border-white shadow-lg' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'}`}>
           {isDeployed ? 'SYSTEM_FINALIZED' : 'ENGINE_V16_ACTIVE'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 items-center">
        {/* Spider Chart Visualization (CSS/SVG) */}
        <div className="relative aspect-square flex items-center justify-center p-8">
           <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
              {/* Radar Grid */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.1" strokeDasharray="1 2" className="opacity-20" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.1" strokeDasharray="1 2" className="opacity-10" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="white" strokeWidth="0.1" strokeDasharray="1 2" className="opacity-5" />
              <path d="M50 5 L50 95 M5 50 L95 50" stroke="white" strokeWidth="0.1" className="opacity-20" />

              {/* Impact Area */}
              <polygon 
                points={`50,${50 - (impact.sovereignty * 0.45)} ${50 + (impact.prosperity * 0.45)},50 50,${50 + (impact.infrastructure * 0.45)} ${50 - (impact.parity * 0.45)},50`}
                fill="url(#impactGradient)"
                className="transition-all duration-1000 opacity-60"
              />
              <defs>
                <linearGradient id="impactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isDeployed ? "#34d399" : "#818cf8"} />
                  <stop offset="100%" stopColor={isDeployed ? "#059669" : "#34d399"} />
                </linearGradient>
              </defs>
           </svg>
           {/* Point Labels */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[8px] font-black text-white uppercase tracking-widest">Sovereignty</div>
           <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[8px] font-black text-white uppercase tracking-widest">Prosperity</div>
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[8px] font-black text-white uppercase tracking-widest">Infrastructure</div>
           <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[8px] font-black text-white uppercase tracking-widest">Parity</div>
        </div>

        {/* Vector Breakdown */}
        <div className="space-y-6">
           {vectors.map((v, i) => (
             <div key={i} className={`p-6 rounded-[2rem] border transition-all flex items-center justify-between shadow-inner group/vector ${isDeployed ? 'bg-black/60 border-emerald-500/20' : 'bg-black/40 border-slate-800 hover:border-indigo-500/30'}`}>
                <div className="flex items-center gap-4">
                   <div className={`p-2.5 rounded-xl bg-slate-900 border transition-transform group-hover/vector:scale-110 ${isDeployed ? 'border-emerald-500/30 text-emerald-400' : 'border-slate-800 ' + v.color}`}>
                      {v.icon}
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{v.label}</span>
                      <span className={`text-xl font-black text-white mono ${isDeployed && v.label === 'Parity' ? 'glow-emerald' : ''}`}>{v.value.toFixed(1)}%</span>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   {/* CheckCircle2 used below */}
                   {isDeployed ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <TrendingUp className="w-4 h-4 text-emerald-500" />}
                   <span className={`text-[8px] font-black uppercase ${isDeployed ? 'text-emerald-400' : 'text-emerald-500'}`}>
                     {isDeployed ? 'STABILIZED' : 'Projected Stability'}
                   </span>
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className={`p-8 rounded-[2.5rem] border flex items-center gap-6 transition-all duration-700 ${isDeployed ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-indigo-500/5 border-indigo-500/10'}`}>
         <Globe className={`w-10 h-10 ${isDeployed ? 'text-emerald-400' : 'text-indigo-400'}`} />
         <div className="flex-1">
            <p className={`text-[11px] leading-relaxed font-black uppercase tracking-widest italic ${isDeployed ? 'text-white' : 'text-slate-400'}`}>
              "NEURAL DIGEST: {impact.summary}"
            </p>
         </div>
      </div>
    </div>
  );
};

export default NeuralImpactEngine;

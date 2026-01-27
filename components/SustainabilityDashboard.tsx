import React, { useState, useEffect } from 'react';
import { Leaf, Wind, Sun, CloudLightning, Activity, Zap, Recycle } from 'lucide-react';
import { generateFastResponse } from '../services/geminiService';

const SustainabilityDashboard: React.FC = () => {
  const [cfeScore, setCfeScore] = useState(94);
  const [carbonIntensity, setCarbonIntensity] = useState(12);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [log, setLog] = useState('[GREEN_OPS] Monitoring grid...');

  useEffect(() => {
    const interval = setInterval(() => {
      setCfeScore(prev => Math.min(100, Math.max(85, prev + (Math.random() > 0.5 ? 1 : -1))));
      setCarbonIntensity(prev => Math.max(0, Math.min(30, prev + (Math.random() > 0.5 ? -1 : 1))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleOptimization = async () => {
    if (isOptimizing) return;
    setIsOptimizing(true);
    setLog("Optimizing...");
    
    try {
      const response = await generateFastResponse(
        "Generate a short technical log about carbon load shifting.", 
        "You are a sustainability engine."
      );
      setLog(response);
      setTimeout(() => {
        setCfeScore(99);
        setCarbonIntensity(2);
        setIsOptimizing(false);
      }, 1500);
    } catch (e) {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
         <h2 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Eco-Sovereign Monitor</h2>
         <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-slate-500">NET_ZERO_ACTIVE</span>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="minimal-card p-8 rounded-3xl space-y-4">
            <div className="flex justify-between">
               <span className="text-xs font-black text-slate-500 uppercase tracking-widest">CFE Score</span>
               <Sun className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-6xl font-black text-white mono">{cfeScore}%</div>
            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-amber-400 transition-all duration-1000" style={{ width: `${cfeScore}%` }}></div>
            </div>
         </div>

         <div className="minimal-card p-8 rounded-3xl space-y-4">
            <div className="flex justify-between">
               <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Carbon Intensity</span>
               <CloudLightning className="w-5 h-5 text-slate-400" />
            </div>
            <div className="text-6xl font-black text-white mono">{carbonIntensity}</div>
            <p className="text-[10px] text-slate-500 font-bold uppercase">gCO2e/kWh</p>
         </div>
      </div>

      <div className="minimal-card p-6 rounded-2xl flex items-center justify-between">
         <div className="space-y-1">
            <div className="flex items-center gap-3 text-emerald-400">
               <Activity className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-widest">Live Optimization Log</span>
            </div>
            <p className="text-xs font-mono text-slate-300">{log}</p>
         </div>
         
         <button 
           onClick={toggleOptimization}
           disabled={isOptimizing}
           className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest text-[9px] transition-all disabled:opacity-50"
         >
            {isOptimizing ? 'Working...' : 'Optimize'}
         </button>
      </div>
    </div>
  );
};

export default SustainabilityDashboard;
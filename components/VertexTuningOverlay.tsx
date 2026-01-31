
import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, Zap, Activity, ShieldCheck, RefreshCw, 
  Layers, Binary, Code, Loader2, Sparkles,
  Cloud, Network, Database, ChevronRight, BarChart3,
  Server, Lock, FileDigit
} from 'lucide-react';
import Logo from './Logo';

interface VertexTuningOverlayProps {
  onComplete: () => void;
}

const VertexTuningOverlay: React.FC<VertexTuningOverlayProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [logs, setLogs] = useState<string[]>(['[VERTEX] DETECTED FLASH-001 DEPRECATION MANDATE...']);
  const scrollRef = useRef<HTMLDivElement>(null);

  const phases = [
    { label: "Weights Extraction", icon: <Database />, sub: "Isolating Flash-001 Core" },
    { label: "Vertex Migration", icon: <Cloud />, sub: "Routing to Vertex AI Compute" },
    { label: "Supervised Tuning", icon: <Layers />, sub: "Refining Sovereign Logic" },
    { label: "Kernel Re-Anchor", icon: <Cpu />, sub: "Manifesting Updated Weights" }
  ];

  const tuningLogs = [
    "Flushing deprecated Gemini 1.5 Flash-001 buffers...",
    "Establishing mTLS tunnel to Vertex AI Project Core...",
    "Serializing 842M hyperparameters for migration...",
    "Initiating Supervised Tuning on A3-Mega nodes...",
    "Loss reduction: 0.0015 -> 0.0004 [STABLE]",
    "Calibrating token output distribution...",
    "Re-anchoring fine-tuned weights to NEOXZ-v16.2.1...",
    "IDENTITY_MATCH: 1.0000 Reality Parity verified.",
    "Bypassing standard API constraints via Vertex Shield.",
    "SYSTEM_RECALIBRATED: VERTEX_AI_TUNING_COMPLETE"
  ];

  useEffect(() => {
    const sequence = async () => {
      const stepFactor = 100 / (phases.length * 2);
      
      for (let i = 0; i < phases.length; i++) {
        setPhase(i);
        setLogs(prev => [...prev, `[INIT] Phase ${i}: ${phases[i].label} sequence...`]);
        
        for (let j = 0; j < 2; j++) {
           await new Promise(r => setTimeout(r, 800));
           const logIdx = Math.min(tuningLogs.length - 1, i * 2 + j);
           setLogs(prev => [...prev, `[TUNING] ${tuningLogs[logIdx]}`]);
           setProgress(prev => Math.min(100, prev + stepFactor));
        }
        await new Promise(r => setTimeout(r, 400));
      }

      setProgress(100);
      setLogs(prev => [...prev, '[FIN] WEIGHT MIGRATION SUCCESSFUL.', '[FIN] VERTEX AI CORE ANCHORED.']);
      await new Promise(r => setTimeout(r, 1500));
      onComplete();
    };
    sequence();
  }, [onComplete]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed inset-0 z-[15000] bg-[#020205] flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-1000 font-sans">
      {/* Background Matrix */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(99,102,241,0.15)_0%,_transparent_70%)]"></div>
        <div className="grid grid-cols-12 h-full opacity-10">
           {Array.from({ length: 48 }).map((_, i) => (
             <div key={i} className="border border-indigo-500/10 h-32 w-full animate-pulse" style={{ animationDelay: `${i * 30}ms` }} />
           ))}
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-center">
        <div className="lg:col-span-7 space-y-12">
          <header className="space-y-6">
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-indigo-600 text-white font-black uppercase tracking-[0.5em] text-[10px] shadow-[0_0_50px_rgba(99,102,241,0.4)] animate-pulse">
              <Zap className="w-4 h-4 fill-white" />
              VERTEX AI: SUPERVISED TUNING MANDATE
            </div>
            <h2 className="text-8xl font-black uppercase tracking-tighter text-white leading-[0.8] glow-indigo">
              MODEL <br />
              <span className="text-indigo-400 italic">RECALIBRATION</span>
            </h2>
            <div className="flex items-center gap-6">
               <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1 min-w-[180px]">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Weights Origin</span>
                  <span className="text-sm font-black text-rose-400 mono">FLASH_001_DEPR</span>
               </div>
               <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1 min-w-[180px]">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Tuning Target</span>
                  <span className="text-sm font-black text-indigo-400 mono">VERTEX_AI_CORE</span>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-4 gap-4">
             {phases.map((p, i) => (
               <div key={i} className={`p-6 rounded-[2.5rem] border-2 transition-all duration-700 flex flex-col items-center gap-4 ${
                 phase === i ? 'bg-indigo-600 text-white border-white shadow-[0_0_60px_rgba(99,102,241,0.6)] scale-110' :
                 phase > i ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400' :
                 'bg-black/40 border-slate-900 opacity-20'
               }`}>
                  <div className="p-3 rounded-2xl bg-black/10">
                    {phase > i ? <ShieldCheck className="w-6 h-6" /> : React.cloneElement(p.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-center leading-tight">{p.label}</span>
               </div>
             ))}
          </div>

          <div className="space-y-6">
             <div className="flex items-center justify-between px-4">
                <span className="text-[11px] font-black uppercase tracking-widest text-indigo-400">Migration & Tuning Progress</span>
                <span className="text-3xl font-black text-white mono">{progress.toFixed(0)}%</span>
             </div>
             <div className="h-6 w-full bg-slate-950 border-2 border-indigo-900/30 rounded-full overflow-hidden shadow-inner p-1 relative">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-600 via-white to-purple-600 animate-[shimmer_0.3s_infinite_linear] bg-[length:200%_100%] transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(99,102,241,1)]"
                  style={{ width: `${progress}%` }}
                />
             </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8 h-full">
           <div ref={scrollRef} className="flex-1 bg-black border border-slate-800 rounded-[3.5rem] p-10 font-mono text-[12px] text-indigo-400/80 space-y-3 overflow-y-auto custom-scrollbar shadow-2xl relative">
              <div className="absolute top-6 right-10 text-[10px] text-slate-800 font-black uppercase">Vertex_Migration_Stream</div>
              {logs.map((log, i) => (
                <div key={i} className="animate-in slide-in-from-left-2 flex gap-4 border-b border-white/5 pb-3">
                  <span className="text-slate-800 font-black shrink-0">[{i.toString().padStart(3, '0')}]</span>
                  <span className="break-all">{log}</span>
                </div>
              ))}
              <div className="flex gap-4 items-center">
                <span className="animate-pulse bg-indigo-500 w-3 h-5" />
                <span className="text-white font-black animate-pulse uppercase tracking-widest italic">Synchronizing Weights...</span>
              </div>
           </div>

           <div className="p-10 rounded-[3.5rem] bg-indigo-500/5 border border-indigo-500/10 flex flex-col gap-6 text-center">
              <div className="relative mx-auto group">
                 <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/40 transition-all animate-pulse" />
                 <Logo size={80} className="relative z-10 grayscale opacity-40" />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-black uppercase tracking-widest italic px-4">
                "Bypassing model deprecation by shifting fine-tuning mandates to Vertex AI enterprise cores. Sovereign logic preserved at quantum scale."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VertexTuningOverlay;

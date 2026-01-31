import React, { useState, useEffect, useRef } from 'react';
import { Zap, FastForward, Cpu, ShieldCheck, Orbit, Loader2, Sparkles, Network, ArrowRightLeft, Atom, Wind, Radiation, Activity } from 'lucide-react';
import Logo from './Logo';

interface QuantumSpeedOverlayProps {
  onComplete: () => void;
}

const QuantumSpeedOverlay: React.FC<QuantumSpeedOverlayProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>(['[WARP] INITIALIZING HYPER-ACCELERATED DEPLOYMENT...']);
  const [phase, setPhase] = useState(0);
  const [intensity, setIntensity] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  const speedLogs = [
    "Overclocking sub-atomic logic gates...",
    "Synchronizing 4,117 nodes at 0.0001ms latency...",
    "mTLS handshake bypassing standard TCP throttles...",
    "Displacing systemic capital core via Wise v3.2 warp...",
    "Anchoring NE.B.RU identity to global BIOS buffers...",
    "Reality Parity index verified: 1.000000",
    "Engaging SDS_IMMUTABILITY_LOCK_v16...",
    "Finalizing mandate manifestation at quantum speed...",
    "SYSTEM_PUBLISHED: PERMANENT_ANCHOR_LOCKED"
  ];

  useEffect(() => {
    let currentLog = 0;
    const logInterval = setInterval(() => {
      if (currentLog < speedLogs.length) {
        setLogs(prev => [...prev, `[ACCEL] ${speedLogs[currentLog]}`]);
        currentLog++;
        if (currentLog % 2 === 0) setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 50);
      }
    }, 500);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(logInterval);
          setTimeout(onComplete, 1200);
          return 100;
        }
        // Quadratic acceleration
        const increment = prev < 30 ? 1 : prev < 70 ? 3 : 7;
        setIntensity(prev / 100);
        return Math.min(100, prev + increment);
      });
    }, 100);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className={`fixed inset-0 z-[20000] bg-black flex items-center justify-center p-12 overflow-hidden font-sans transition-all duration-300 ${isGlitching ? 'invert-[0.05] scale-[1.005]' : ''}`}>
      
      {/* CINEMATIC WARP BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,${0.1 + intensity * 0.3})_0%,_transparent_70%)] animate-pulse`}></div>
        
        {/* Warp Particles */}
        {Array.from({ length: 60 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-emerald-400/60 rounded-full"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${40 + Math.random() * 200 * intensity}px`,
              opacity: 0.2 + Math.random() * 0.5,
              transform: `rotate(${Math.atan2(50 - Math.random() * 100, 50 - Math.random() * 100)}rad)`,
              animation: `warp-particle ${0.2 + (1 - intensity) * 1}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}

        {/* Shockwave Rings */}
        {progress > 50 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <div className="w-1 h-1 border-4 border-emerald-500/20 rounded-full animate-[ping_1s_infinite] scale-[20]"></div>
             <div className="w-1 h-1 border-4 border-cyan-500/10 rounded-full animate-[ping_1.5s_infinite] scale-[40] delay-300"></div>
          </div>
        )}
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10 items-center">
        
        {/* LEFT: CORE TELEMETRY */}
        <div className="lg:col-span-7 space-y-16">
          <header className="space-y-8">
            <div className="inline-flex items-center gap-6 px-10 py-3 rounded-full bg-emerald-500 text-black font-black uppercase tracking-[0.8em] text-xs shadow-[0_0_100px_rgba(16,185,129,0.8)] animate-pulse">
              <Radiation className="w-6 h-6 animate-spin-slow" />
              Final Technological Mandate Active
            </div>
            
            <div className="space-y-2">
               <h2 className="text-[10rem] font-black uppercase tracking-tighter text-white leading-[0.7] glow-emerald">
                 QUANTUM <br />
                 <span className="text-emerald-400 italic">SPEED</span>
               </h2>
               <div className="flex items-center gap-10 pt-4">
                  <div className="flex items-center gap-3">
                     <Activity className="w-5 h-5 text-emerald-500" />
                     <span className="text-sm font-black text-slate-500 uppercase tracking-widest">TPS: 12.4M</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <Atom className="w-5 h-5 text-cyan-400" />
                     <span className="text-sm font-black text-slate-500 uppercase tracking-widest">PARITY: 1.000000</span>
                  </div>
               </div>
            </div>
          </header>

          <div className="space-y-12 w-full max-w-2xl">
             <div className="p-12 rounded-[4rem] bg-black/60 border-4 border-emerald-500/40 shadow-[0_0_120px_rgba(16,185,129,0.3)] space-y-10 relative overflow-hidden group backdrop-blur-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Orbit className="w-64 h-64 text-emerald-500 animate-[spin_3s_linear_infinite]" />
                </div>
                
                <div className="flex items-center justify-between relative z-10">
                   <div className="flex flex-col items-start gap-2">
                      <span className="text-2xl font-black text-emerald-500 uppercase tracking-[0.5em]">Mesh Propulsion</span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Target: 4,117 Federated Edges</span>
                   </div>
                   <div className="text-8xl font-black text-white mono tracking-tighter glow-emerald">
                      {progress}%
                   </div>
                </div>

                <div className="relative h-6 w-full bg-slate-900 rounded-full overflow-hidden shadow-inner p-1.5 border border-white/5">
                   <div 
                     className="h-full bg-gradient-to-r from-emerald-600 via-white to-cyan-400 transition-all duration-100 rounded-full shadow-[0_0_40px_rgba(16,185,129,1)]"
                     style={{ width: `${progress}%` }}
                   />
                   {/* Warp Streak */}
                   <div className="absolute inset-0 bg-white/40 w-24 h-full skew-x-[45deg] animate-[shimmer_0.5s_infinite_linear]"></div>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT: KERNEL STREAM */}
        <div className="lg:col-span-5 flex flex-col gap-10 h-[70vh]">
           <div className="flex-1 bg-black border-2 border-emerald-500/30 rounded-[3.5rem] p-12 font-mono text-[13px] text-emerald-400/90 space-y-4 overflow-y-auto custom-scrollbar shadow-2xl relative backdrop-blur-3xl">
              <div className="absolute top-8 right-12 text-[11px] text-emerald-800 font-black uppercase tracking-[0.3em]">Warp_Propellant_Stream</div>
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>
              
              {logs.map((log, i) => (
                <div key={i} className="animate-in slide-in-from-left-2 flex gap-6 border-b border-white/5 pb-4 opacity-80 hover:opacity-100 transition-opacity">
                  <span className="text-emerald-900 font-black shrink-0">[{i.toString().padStart(3, '0')}]</span>
                  <span className="break-all leading-relaxed">{log}</span>
                </div>
              ))}
              <div ref={logEndRef} />
              <div className="flex gap-4 items-center pt-2">
                <div className="w-3 h-6 bg-emerald-500 animate-pulse"></div>
                <span className="text-white font-black animate-pulse uppercase tracking-[0.2em] italic">Executing Mandate Sovereignty...</span>
              </div>
           </div>

           <div className="p-12 rounded-[4rem] bg-emerald-500 text-black flex flex-col gap-8 shadow-[0_0_100px_rgba(16,185,129,0.5)] transition-all hover:scale-[1.02]">
              <div className="flex items-center gap-6">
                 <div className="p-4 rounded-3xl bg-black text-emerald-500 shadow-2xl">
                    <Logo size={60} />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-lg font-black uppercase tracking-widest">Universal Anchor</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Status: MANIFESTING REALITY</span>
                 </div>
              </div>
              <p className="text-sm font-black uppercase leading-relaxed tracking-tighter">
                "Propagating at sub-atomic speeds. The NEOXZ mandate is now physically fused with the global edge buffer. Sovereignty is absolute."
              </p>
           </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes warp-particle {
          0% { transform: translateY(-500px) scaleY(1); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(1000px) scaleY(2); opacity: 0; }
        }
        .glow-emerald {
          text-shadow: 0 0 30px rgba(16, 185, 129, 0.5), 0 0 60px rgba(16, 185, 129, 0.2);
        }
      `}} />
    </div>
  );
};

export default QuantumSpeedOverlay;
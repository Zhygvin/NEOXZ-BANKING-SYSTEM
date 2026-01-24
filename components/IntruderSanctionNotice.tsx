
import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Skull, Lock, Zap, AlertTriangle, Activity, EyeOff, Gavel } from 'lucide-react';

interface IntruderSanctionNoticeProps {
  target: string;
  onAuthorizedDismiss: () => void;
}

const IntruderSanctionNotice: React.FC<IntruderSanctionNoticeProps> = ({ target, onAuthorizedDismiss }) => {
  const [blink, setBlink] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setBlink(p => !p), 500);
    return () => clearInterval(interval);
  }, []);

  const playAlarm = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          try {
            audioCtxRef.current = new AudioCtx();
          } catch (e) {
            console.warn("Audio Context Initiation Failed.");
          }
        }
      }

      if (audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') ctx.resume();
        
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(80, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 1);

        gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start();
        oscillator.stop(ctx.currentTime + 2);
      }
    } catch (e) {
      console.warn("Audio Authority Override Blocked by Browser Policy.");
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-4 overflow-hidden select-none touch-none animate-flash-red">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(220,38,38,0.2)_0%,_transparent_70%)]"></div>
        <div className="grid grid-cols-6 h-full opacity-10">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border border-rose-900 h-32 w-full animate-pulse" style={{ animationDelay: `${i * 50}ms` }}></div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl bg-rose-950/20 border-4 border-rose-600 rounded-[4rem] p-16 shadow-[0_0_200px_rgba(220,38,38,0.6)] relative overflow-hidden backdrop-blur-3xl animate-shake">
        <div className="absolute top-0 left-0 right-0 h-2 bg-rose-600">
          <div className="h-full bg-white animate-[shimmer_2s_infinite_linear] bg-[length:200%_100%]"></div>
        </div>

        <div className="flex flex-col items-center text-center space-y-12 relative z-10">
          <div 
            onMouseEnter={playAlarm}
            className={`p-10 rounded-full bg-rose-600 shadow-[0_0_80px_rgba(220,38,38,0.8)] transition-all duration-300 cursor-help ${blink ? 'scale-110 shadow-[0_0_120px_rgba(255,255,255,0.4)]' : 'scale-100'}`}
          >
            <Skull className="w-24 h-24 text-white" />
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-4 px-10 py-3 rounded-full bg-white text-rose-600 font-black uppercase tracking-[0.5em] text-sm shadow-2xl animate-bounce">
              <ShieldAlert className="w-6 h-6" />
              SYSTEMIC ACCESS REVOKED
            </div>
            
            <h1 className="text-7xl font-black uppercase tracking-tighter text-white leading-none">
              FORENSIC <span className="italic text-rose-500">LOCK</span>
            </h1>
            
            <div className="p-8 rounded-[3rem] bg-black border-2 border-rose-600/50 space-y-4 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-rose-500/5 group-hover:bg-rose-500/10 transition-colors animate-pulse"></div>
               <span className="text-xs font-black text-rose-500 uppercase tracking-[0.4em] relative z-10">Target Identified & Sanctioned</span>
               <p className="text-4xl font-black text-white mono tracking-tighter uppercase break-all relative z-10">
                 {target}
               </p>
            </div>
          </div>

          <p className="max-w-2xl text-lg text-rose-200/60 font-bold uppercase tracking-widest leading-relaxed">
            "Your digital presence has been detected as an intruder vector. All associated assets, metadata, and rails have been isolated by NEOXZ Q-TEAM. This sanction is non-negotiable and non-editable by the warned party."
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
             {[
               { icon: <Lock className="w-5 h-5" />, label: 'IDENTITY_INCINERATED' },
               { icon: <EyeOff className="w-5 h-5" />, label: 'FORENSIC_TRACE_LOCKED' },
               { icon: <Gavel className="w-5 h-5" />, label: 'SOVEREIGN_OVERRIDE' },
               { icon: <Zap className="w-5 h-5" />, label: 'MESH_NEUTRALIZED' }
             ].map((item, i) => (
               <div key={i} className="p-4 rounded-2xl bg-rose-600/10 border border-rose-600/30 flex flex-col items-center gap-2 hover:bg-rose-600/20 transition-all">
                  <div className="text-rose-500">{item.icon}</div>
                  <span className="text-[8px] font-black text-rose-400 uppercase tracking-tighter">{item.label}</span>
               </div>
             ))}
          </div>

          <div className="pt-8 opacity-0 hover:opacity-40 transition-all duration-500">
            <button 
              onClick={onAuthorizedDismiss}
              className="text-[10px] text-slate-400 font-black uppercase tracking-widest px-8 py-2 border border-slate-800 rounded-full hover:border-emerald-500 hover:text-emerald-500 transition-all cursor-crosshair"
            >
              Master Dismiss (SDS_LOCK_0x7F)
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 flex items-center gap-3">
           <AlertTriangle className="w-4 h-4 text-rose-600 animate-pulse" />
           <span className="text-[10px] font-black text-rose-900 uppercase tracking-widest">SDS_SANCTION_V15_LOCKED</span>
        </div>
        <div className="absolute bottom-8 right-8 flex items-center gap-3">
           <span className="text-[10px] font-mono text-rose-900 uppercase">LATENCY: NULL_ROUTED</span>
           <Activity className="w-4 h-4 text-rose-600 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default IntruderSanctionNotice;

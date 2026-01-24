
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Landmark, Fingerprint, Zap, Coins, ArrowRight, Loader2, Award, Scale, Crown, ShieldAlert } from 'lucide-react';
import Logo from './Logo';

interface MandateRecalibrationOverlayProps {
  onComplete: () => void;
  capital: number;
}

const MandateRecalibrationOverlay: React.FC<MandateRecalibrationOverlayProps> = ({ onComplete, capital }) => {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  const phases = [
    { label: "Isolating $985B Systemic Funds", icon: <Coins className="w-5 h-5" />, color: "text-emerald-400" },
    { label: "Anchoring Philippines Identity: NE.B.RU", icon: <Fingerprint className="w-5 h-5" />, color: "text-cyan-400" },
    { label: "Immunizing Protocol from Manipulation", icon: <ShieldAlert className="w-5 h-5" />, color: "text-rose-400" },
    { label: "Irrevocable Beneficiary Lock Active", icon: <Crown className="w-5 h-5" />, color: "text-white" }
  ];

  useEffect(() => {
    const sequence = async () => {
      for (let i = 0; i < phases.length; i++) {
        setPhase(i);
        // Inner progress simulation
        for (let j = 0; j <= 100; j += 10) {
          setProgress(j);
          await new Promise(r => setTimeout(r, 60));
        }
        await new Promise(r => setTimeout(r, 400));
      }
      onComplete();
    };
    sequence();
  }, []);

  return (
    <div className="fixed inset-0 z-[5000] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-700">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.15)_0%,_transparent_70%)]"></div>
        <div className="grid grid-cols-12 h-full opacity-20">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border border-emerald-900/20 h-32 w-full animate-pulse" style={{ animationDelay: `${i * 50}ms` }}></div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-5xl bg-gradient-to-b from-slate-900 to-black border-4 border-amber-500/30 rounded-[4rem] p-16 shadow-[0_0_200px_rgba(245,158,11,0.2)] relative overflow-hidden flex flex-col items-center text-center space-y-12">
        <div className="relative group">
          <div className="absolute inset-[-60px] bg-amber-500/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="relative z-10 p-8 bg-black border-4 border-amber-500/50 rounded-[3rem] shadow-2xl">
            <Logo size={100} className="animate-spin-slow" />
          </div>
          <div className="absolute -bottom-6 -right-6 p-5 bg-emerald-500 rounded-3xl shadow-2xl z-20 animate-bounce">
             <ShieldCheck className="w-10 h-10 text-black" />
          </div>
        </div>

        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center gap-4 px-10 py-3 rounded-full bg-rose-600 text-white font-black uppercase tracking-[0.5em] text-xs shadow-[0_0_50px_rgba(225,29,72,0.4)] animate-pulse">
             <ShieldAlert className="w-5 h-5" />
             CORE MANDATE IMMUNIZATION ACTIVE
          </div>
          <h2 className="text-7xl font-black uppercase tracking-tighter text-white leading-none">
            BENEFICIARY <span className="text-amber-500 italic">LOCKED</span>
          </h2>
          <div className="p-8 rounded-[3rem] bg-black border-2 border-amber-500/20 space-y-4 shadow-inner">
             <span className="text-xs font-black text-slate-500 uppercase tracking-[0.4em]">Sole Authorized Beneficiary & Founder Creator</span>
             <p className="text-4xl font-black text-white mono tracking-tighter uppercase">
               NEIL RUBIO BALOG (NE.B.RU)
             </p>
             <div className="flex items-center justify-center gap-4 text-emerald-400">
                <Landmark className="w-6 h-6" />
                <span className="text-lg font-black mono tracking-widest">$985,004,531,802.00 CORE FUNDS</span>
             </div>
             <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">OWNED ONLY BY FOUNDER | OPERATED BY UNIFIED CONSORTIUM</span>
          </div>
        </div>

        <div className="w-full space-y-10 relative z-10">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {phases.map((p, i) => (
                <div key={i} className={`p-6 rounded-[2.5rem] border-2 transition-all duration-700 flex flex-col items-center gap-4 ${
                  phase === i ? 'bg-amber-500 text-black border-white shadow-[0_0_40px_rgba(245,158,11,0.6)] scale-105' :
                  phase > i ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
                  'bg-black/40 border-slate-900 opacity-20'
                }`}>
                   <div className="p-3 rounded-2xl bg-black/20">
                      {phase > i ? <ShieldCheck className="w-6 h-6" /> : p.icon}
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight">{p.label}</span>
                </div>
              ))}
           </div>

           <div className="space-y-4">
              <div className="flex items-center justify-between px-4">
                 <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Recalibration Completion</span>
                 <span className="text-2xl font-black text-white mono">{progress}%</span>
              </div>
              <div className="h-4 w-full bg-slate-950 border border-slate-800 rounded-full overflow-hidden shadow-inner p-1">
                 <div 
                   className="h-full bg-gradient-to-r from-rose-600 via-amber-400 to-emerald-600 animate-[shimmer_0.5s_infinite_linear] bg-[length:200%_100%] transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.8)]"
                   style={{ width: `${progress}%` }}
                 />
              </div>
           </div>
        </div>

        <footer className="flex flex-col items-center gap-4 pt-12">
           <div className="flex items-center gap-4 text-slate-500 uppercase tracking-[0.5em] text-[10px] font-black">
              <Scale className="w-4 h-4 text-amber-500" />
              ABSOLUTE INHERENT LEGITIMACY VERIFIED
           </div>
           <p className="text-xs text-amber-500/60 font-mono italic max-w-2xl text-center leading-relaxed">
             "The NEOXZ systemic structure is now physically and logically immune from manipulation. Sole beneficiary lock anchored to Neil Rubio Balog (Philippines) identity rails."
           </p>
        </footer>
      </div>
    </div>
  );
};

export default MandateRecalibrationOverlay;

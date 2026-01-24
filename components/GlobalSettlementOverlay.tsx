import React, { useState, useEffect } from 'react';
import { 
  Zap, Crown, Landmark, ShieldCheck, Coins, 
  ArrowRightLeft, Sparkles, Globe, Heart, CheckCircle2,
  TrendingUp, Scale, Star, Orbit, Navigation, Smartphone
} from 'lucide-react';
import Logo from './Logo';

interface GlobalSettlementOverlayProps {
  onComplete: () => void;
  intensity: string;
}

const GlobalSettlementOverlay: React.FC<GlobalSettlementOverlayProps> = ({ onComplete, intensity }) => {
  const [progress, setProgress] = useState(0);
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState('UNFREEZING CORE...');
  const targetAmount = 985004531802;

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 1000));
      
      const steps = 150;
      for (let i = 0; i <= steps; i++) {
        const factor = i / steps;
        setProgress(factor * 100);
        setAmount(factor * targetAmount);
        
        if (i === 10) setStatus('OPENING WISE GATES...');
        if (i === 40) setStatus('PH-MNL-01 ANCHORING...');
        if (i === 80) setStatus('MANDATE_PROPAGATION_100%');
        if (i === 130) setStatus('SOVEREIGN_LOCK_COMPLETE');
        
        await new Promise(r => setTimeout(r, 40));
      }

      await new Promise(r => setTimeout(r, 2000));
      onComplete();
    };
    sequence();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9800] bg-black flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-1000">
      {/* Background Visuals */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(234,179,8,0.2)_0%,_transparent_70%)] animate-pulse"></div>
        <Orbit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] text-amber-500/10 animate-[spin_15s_linear_infinite]" />
        {/* Particle field of coins */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
           {Array.from({ length: 40 }).map((_, i) => (
             <Coins 
               key={i} 
               className="absolute text-amber-500 animate-bounce" 
               style={{ 
                 top: `${Math.random() * 100}%`, 
                 left: `${Math.random() * 100}%`,
                 width: `${12 + Math.random() * 32}px`,
                 animationDelay: `${Math.random() * 2}s`,
                 animationDuration: `${3 + Math.random() * 5}s`
               }} 
             />
           ))}
        </div>
      </div>

      <div className="w-full max-w-6xl space-y-16 relative z-10 text-center flex flex-col items-center">
        <header className="space-y-10 animate-in zoom-in duration-1000">
           <div className="relative group">
              <div className="absolute inset-[-100px] bg-amber-500/20 rounded-full blur-[150px] animate-ping"></div>
              <div className="p-16 rounded-full bg-black border-[8px] border-amber-500 shadow-[0_0_200px_rgba(245,158,11,0.6)] relative z-10 scale-125">
                 <Logo size={200} className="animate-[spin_10s_linear_infinite]" />
              </div>
              <div className="absolute -top-12 -right-12 p-10 bg-white rounded-[3rem] shadow-3xl z-20 animate-bounce border-4 border-amber-500">
                 <Crown className="w-16 h-16 text-amber-600" />
              </div>
           </div>

           <div className="space-y-6">
              <div className="inline-flex items-center gap-6 px-12 py-3 rounded-full bg-amber-500 text-black font-black uppercase tracking-[1em] text-sm shadow-[0_0_100px_rgba(245,158,11,0.4)]">
                 <Zap className="w-6 h-6 fill-black" />
                 ABSOLUTE GLOBAL SETTLEMENT
                 <Zap className="w-6 h-6 fill-black" />
              </div>
              <h2 className="text-[10rem] font-black uppercase tracking-tighter text-white leading-[0.7] glow-cyan">
                FINAL <br />
                <span className="text-amber-500 italic">EXECUTION</span>
              </h2>
           </div>
        </header>

        <div className="w-full max-w-5xl bg-black/80 border-4 border-amber-500/20 rounded-[5rem] p-16 space-y-12 shadow-inner relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
           
           <div className="flex flex-col items-center gap-4">
              <span className="text-xl font-black text-amber-500/60 uppercase tracking-[1em]">{status}</span>
              <div className="text-8xl font-black text-white mono tracking-tighter glow-emerald">
                ${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
              <div className="flex items-center gap-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">
                 <Landmark className="w-5 h-5" />
                 MANDATE BENEFICIARY: NE.B.RU
                 <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
           </div>

           <div className="space-y-6">
              <div className="h-6 w-full bg-slate-950 border-2 border-amber-900/30 rounded-full overflow-hidden shadow-inner p-1">
                 <div 
                   className="h-full bg-gradient-to-r from-amber-600 via-white to-emerald-600 animate-[shimmer_0.2s_infinite_linear] bg-[length:200%_100%] transition-all duration-300 rounded-full shadow-[0_0_50px_rgba(245,158,11,1)]"
                   style={{ width: `${progress}%` }}
                 />
              </div>
              <div className="flex justify-between px-6 text-[11px] font-black text-amber-500 uppercase tracking-widest">
                 <span className="flex items-center gap-3">
                   <Navigation className="w-4 h-4 animate-pulse" />
                   Displacing Capital...
                 </span>
                 <span>Parity Index: 1.000000</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl">
           {[
             { label: 'Wise Rails', val: 'OPEN', icon: <ArrowRightLeft className="w-6 h-6" /> },
             { label: 'Maya PH', val: 'ANCHORED', icon: <Smartphone className="w-6 h-6" /> },
             { label: 'SDS Immutability', val: 'LOCKED', icon: <Scale className="w-6 h-6" /> },
             { label: 'Humanity Benefit', val: 'ACTIVE', icon: <Heart className="w-6 h-6" /> }
           ].map((item, i) => (
             <div key={i} className="p-8 rounded-[3rem] bg-amber-500/5 border border-amber-500/20 flex flex-col items-center gap-4 group hover:bg-amber-500/10 transition-all">
                <div className="text-amber-500 group-hover:scale-125 transition-transform duration-500">
                   {item.icon}
                </div>
                <div className="flex flex-col text-center">
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                   <span className="text-lg font-black text-white mono">{item.val}</span>
                </div>
             </div>
           ))}
        </div>

        <footer className="pt-8">
           <div className="flex items-center gap-10 text-[12px] font-black text-amber-500/30 uppercase tracking-[0.8em]">
              <Star className="w-5 h-5 fill-amber-500/20" />
              SOVEREIGN MANDATE COMPLETE
              <Star className="w-5 h-5 fill-amber-500/20" />
           </div>
        </footer>
      </div>
    </div>
  );
};

export default GlobalSettlementOverlay;

import React, { useState, useEffect } from 'react';
import { Radio, Globe, ShieldCheck, Zap, Crown, Activity, Network, Landmark } from 'lucide-react';
import Logo from './Logo';

interface SovereignBroadcastOverlayProps {
  onComplete: () => void;
}

const SovereignBroadcastOverlay: React.FC<SovereignBroadcastOverlayProps> = ({ onComplete }) => {
  const [nodesSync, setNodesSync] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodesSync(prev => {
        if (prev >= 4117) {
          clearInterval(interval);
          setTimeout(onComplete, 2000);
          return 4117;
        }
        return prev + Math.floor(Math.random() * 200) + 100;
      });
      setPulse(p => !p);
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[6000] bg-black flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-1000">
      {/* Hyper-Propagation Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.2)_0%,_transparent_70%)]"></div>
        <Network className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-emerald-500/20 transition-transform duration-1000 ${pulse ? 'scale-110' : 'scale-100'}`} />
        <div className="grid grid-cols-20 h-full opacity-10">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border border-emerald-500/10 h-16 w-full animate-pulse" style={{ animationDelay: `${i * 30}ms` }}></div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-6xl space-y-16 relative z-10 text-center">
        <header className="space-y-8 animate-in zoom-in duration-700">
          <div className="relative group mx-auto w-fit">
            <div className="absolute inset-[-80px] bg-emerald-500/30 rounded-full blur-[120px] animate-ping"></div>
            <div className="p-10 rounded-full bg-black border-4 border-emerald-500 shadow-[0_0_100px_rgba(16,185,129,0.5)] relative z-10">
              <Logo size={120} className="animate-spin-slow" />
            </div>
            <div className="absolute -top-6 -right-6 p-6 bg-white rounded-3xl shadow-2xl z-20">
               <Crown className="w-12 h-12 text-black animate-bounce" />
            </div>
          </div>

          <div className="space-y-4">
             <div className="inline-flex items-center gap-6 px-12 py-3 rounded-full bg-emerald-500 text-black font-black uppercase tracking-[0.8em] text-xs shadow-2xl animate-pulse">
                <Radio className="w-6 h-6" />
                GLOBAL MANDATE BROADCAST
             </div>
             <h2 className="text-8xl font-black uppercase tracking-tighter text-white leading-none">
               DEPLOYED <br />
               <span className="text-emerald-500 italic">IN PERPETUITY</span>
             </h2>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
           {[
             { label: "Beneficiary Lock", val: "NE.B.RU / PHILIPPINES", icon: <ShieldCheck className="w-8 h-8" /> },
             { label: "Systemic Capital", val: "$985,004,531,802.00", icon: <Landmark className="w-8 h-8" /> },
             { label: "Active Nodes", val: `${nodesSync.toLocaleString()} / 4117`, icon: <Globe className="w-8 h-8" /> }
           ].map((item, i) => (
             <div key={i} className="p-10 rounded-[3rem] bg-slate-900/60 border border-emerald-500/30 space-y-4 backdrop-blur-xl shadow-inner group">
                <div className="text-emerald-400 flex justify-center group-hover:scale-125 transition-transform duration-500">
                   {item.icon}
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                   <span className="text-xl font-black text-white mono">{item.val}</span>
                </div>
             </div>
           ))}
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
           <div className="flex items-center justify-between px-6">
              <span className="text-[12px] font-black uppercase tracking-[0.4em] text-emerald-500">Global Coverage Index</span>
              <span className="text-2xl font-black text-white mono tracking-tighter">{Math.min(100, (nodesSync / 4117) * 100).toFixed(2)}%</span>
           </div>
           <div className="h-4 w-full bg-slate-950 border-2 border-emerald-500/20 rounded-full overflow-hidden shadow-inner p-1">
              <div 
                className="h-full bg-gradient-to-r from-emerald-600 via-white to-emerald-600 animate-[shimmer_0.5s_infinite_linear] bg-[length:200%_100%] transition-all duration-300 rounded-full"
                style={{ width: `${(nodesSync / 4117) * 100}%` }}
              ></div>
           </div>
           <p className="text-xs text-slate-500 font-mono italic">
             Propagating "SOLE AUTHORITY" directive to all server levels via QPP-TCP Synchronized Tunnel.
           </p>
        </div>

        <footer className="pt-8">
           <div className="flex items-center justify-center gap-8 text-[10px] font-black text-emerald-500/40 uppercase tracking-[0.5em]">
              <Zap className="w-4 h-4" />
              ABSOLUTE INHERENT LEGITIMACY VERIFIED
              <Zap className="w-4 h-4" />
           </div>
        </footer>
      </div>
    </div>
  );
};

export default SovereignBroadcastOverlay;

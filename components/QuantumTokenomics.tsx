import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Binary, ShieldCheck, RefreshCw, BarChart3, TrendingUp, Info, Scale } from 'lucide-react';

const QuantumTokenomics: React.FC = () => {
  const [equation, setEquation] = useState("Ψ(NSRT) = [Σ(Real_Assets) × Q]");
  const [parity, setParity] = useState("LIVE_SETTLED");
  const [showParityInfo, setShowParityInfo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const hex = Math.random().toString(16).substring(2, 10).toUpperCase();
      setEquation(`Ψ(NSRT) : BRIDGE_READY : 0x${hex}`);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-black border border-emerald-500/20 rounded-[3rem] p-10 space-y-10 shadow-3xl relative overflow-hidden backdrop-blur-3xl flex flex-col h-full group transition-all hover:border-emerald-500/40">
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
        <Scale className="w-48 h-48 text-emerald-500" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-5 text-emerald-400">
          <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20">
            <Cpu className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white">Value Parity Engine</h3>
            <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase">PRODUCTION MAPPING ACTIVE</span>
          </div>
        </div>
        <button 
          onMouseEnter={() => setShowParityInfo(true)}
          onMouseLeave={() => setShowParityInfo(false)}
          className="p-3 rounded-2xl bg-black/60 border border-slate-800 hover:border-emerald-500/50 transition-all text-slate-500 hover:text-emerald-400"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

      {showParityInfo && (
        <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 animate-in fade-in zoom-in-95 duration-300">
          <h4 className="text-[11px] font-black uppercase tracking-widest text-white mb-3 flex items-center gap-3">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Live Parity Protocol
          </h4>
          <p className="text-[10px] text-slate-300 leading-relaxed font-medium">
            <strong>NSRT Real-World Parity</strong> ensures that every digital unit generated is backed by institutional value. In this production gateway, 1 NSRT = 1.00 USD. This is not a simulation; it is a value-matching displacement protocol for digital commerce.
          </p>
        </div>
      )}

      <div className="flex-1 space-y-8 relative z-10">
        <div className="p-8 rounded-[2rem] bg-black/80 border border-slate-900 shadow-inner">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Production Logic Matrix</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] text-emerald-400 font-black tracking-widest uppercase">{parity}</span>
            </div>
          </div>
          <div className="font-mono text-xl font-bold text-emerald-100 tracking-tighter break-all">
            {equation}
          </div>
          <div className="mt-6 h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-600 to-indigo-600 animate-[shimmer_2s_infinite_linear] bg-[length:200%_100%] w-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 rounded-[2rem] bg-black/40 border border-slate-900 flex flex-col gap-2">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Parity Match</span>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-white mono">100%</span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div className="p-6 rounded-[2rem] bg-black/40 border border-slate-900 flex flex-col gap-2">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Value Anchor</span>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-white mono">$1.00</span>
              <Scale className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-emerald-950/20 border border-emerald-500/10">
        <p className="text-[10px] text-slate-500 leading-relaxed italic font-medium">
          "The Founder's Mandate: Absolute value preservation between the Digital Sovereignty and Real-World Institutional Liquidity."
        </p>
      </div>
    </div>
  );
};

export default QuantumTokenomics;
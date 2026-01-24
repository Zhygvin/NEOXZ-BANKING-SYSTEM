import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Zap, ShieldAlert, Cpu, HardDrive, Anchor, Fingerprint } from 'lucide-react';

interface ProtectiveShieldProps {
  integrity: number;
  isActive: boolean;
}

const ProtectiveShield: React.FC<ProtectiveShieldProps> = ({ integrity, isActive }) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => setPulse(p => !p), 2000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  return (
    <div className={`bg-gradient-to-br from-emerald-950/20 to-black border ${isActive ? 'border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.15)]' : 'border-slate-800'} rounded-[3rem] p-10 space-y-10 relative overflow-hidden backdrop-blur-3xl transition-all duration-1000 group`}>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
      
      {/* Hexagonal Grid Background Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
              <path d="M25 0L50 14.4V43.4L25 57.8L0 43.4V14.4L25 0Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-emerald-500"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-5 text-emerald-400">
          <div className={`p-4 rounded-3xl bg-emerald-500/10 border ${isActive ? 'border-emerald-500/40 animate-pulse' : 'border-slate-800'}`}>
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-base font-black uppercase tracking-[0.5em] text-white">Core Protective Shield</h3>
            <span className="text-[10px] text-emerald-500 font-bold tracking-[0.3em] uppercase">NEOXZ IMMUTABILITY MANDATE</span>
          </div>
        </div>
        <div className={`flex items-center gap-3 px-4 py-2 rounded-full ${isActive ? 'bg-emerald-500 text-black' : 'bg-slate-900 text-slate-500'} text-[10px] font-black uppercase tracking-widest shadow-xl transition-all`}>
           {isActive ? 'SHIELD ENGAGED' : 'STANDBY'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
        {/* Layer 1: Financial Immutability */}
        <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-6 hover:border-emerald-500/20 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Anchor className="w-5 h-5 text-emerald-500" />
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Financial Anchor</span>
            </div>
            <Lock className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
            Prevents unauthorized charges and transaction deviations. All systemic capital ($985B) anchored to a read-only immutable ledger.
          </p>
          <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
            <div className={`h-full bg-emerald-500 transition-all duration-1000 ${isActive ? 'w-full' : 'w-0'}`}></div>
          </div>
        </div>

        {/* Layer 2: Cyber-Forensic Lock */}
        <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-6 hover:border-emerald-500/20 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Core Immutability</span>
            </div>
            <Fingerprint className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
            Biometric verification required for all system core changes. Prevents manipulation of DNS, CDN, and Institutional Nodes.
          </p>
          <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
            <div className={`h-full bg-cyan-400 transition-all duration-1000 ${isActive ? 'w-full' : 'w-0'}`}></div>
          </div>
        </div>
      </div>

      <div className="p-10 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/10 flex flex-col items-center gap-8 relative z-10">
         <div className="flex items-center gap-4">
            <ShieldAlert className={`w-8 h-8 ${isActive ? 'text-emerald-400' : 'text-slate-800'} transition-colors`} />
            <span className="text-[14px] font-black text-white uppercase tracking-[0.4em]">Integrity Level: {integrity}%</span>
         </div>
         <div className="flex gap-2 w-full max-w-md">
            {Array.from({ length: 24 }).map((_, i) => (
              <div 
                key={i} 
                className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                  isActive && (integrity / 100 * 24) > i ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-900'
                }`}
                style={{ transitionDelay: `${i * 30}ms` }}
              ></div>
            ))}
         </div>
         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic text-center max-w-lg">
           "Absolute protection from all vector deviations. The NEOXZ mandate is now physically and digitally immutable."
         </p>
      </div>
    </div>
  );
};

export default ProtectiveShield;
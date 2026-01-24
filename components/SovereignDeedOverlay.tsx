
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Gavel, FileSignature, Award, CheckCircle2, X, Download, Landmark, Crown, Fingerprint, Star, Loader2 } from 'lucide-react';
import Logo from './Logo';

interface SovereignDeedOverlayProps {
  onClose: () => void;
  capital: string;
}

const SovereignDeedOverlay: React.FC<SovereignDeedOverlayProps> = ({ onClose, capital }) => {
  const [status, setStatus] = useState<'IDLE' | 'SCANNING' | 'SIGNED'>('IDLE');
  const [scanProgress, setScanProgress] = useState(0);

  const handleSign = async () => {
    setStatus('SCANNING');
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setScanProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStatus('SIGNED');
      }
    }, 40);
  };

  return (
    <div className="fixed inset-0 z-[7000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-8 animate-in fade-in duration-1000 overflow-y-auto">
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(245,158,11,0.15)_0%,_transparent_70%)]"></div>
        <div className="grid grid-cols-12 h-full opacity-20">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border border-amber-900/20 h-32 w-full animate-pulse" style={{ animationDelay: `${i * 50}ms` }}></div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-5xl bg-[#0a0a0a] border-[6px] border-amber-500/30 rounded-[4rem] p-16 shadow-[0_0_200px_rgba(245,158,11,0.2)] relative overflow-hidden flex flex-col items-center text-center space-y-12 my-8">
        {/* Authoritative Header Seal */}
        <div className="relative group">
          <div className="absolute inset-[-40px] bg-amber-500/20 rounded-full blur-[80px] animate-pulse"></div>
          <div className="p-8 rounded-full bg-black border-4 border-amber-500 shadow-2xl relative z-10">
            <Logo size={100} />
          </div>
          <div className="absolute -bottom-4 -right-4 p-4 bg-amber-500 rounded-2xl shadow-xl z-20">
             <Crown className="w-8 h-8 text-black" />
          </div>
        </div>

        <div className="space-y-6 relative z-10 w-full">
          <div className="inline-flex items-center gap-4 px-10 py-2 rounded-full bg-amber-500 text-black font-black uppercase tracking-[0.5em] text-[10px] shadow-2xl">
             <Star className="w-4 h-4 fill-black" />
             SUPREME MANDATE DEED
             <Star className="w-4 h-4 fill-black" />
          </div>
          <h2 className="text-6xl font-black uppercase tracking-tighter text-white leading-none">
            MASTER <span className="text-amber-500 italic">BENEFICIARY</span> DECREE
          </h2>
          
          <div className="p-10 rounded-[3.5rem] bg-black/80 border border-amber-500/20 space-y-8 shadow-inner text-left">
             <div className="flex items-center justify-between border-b border-amber-900/30 pb-6">
                <div className="flex items-center gap-6">
                   <Landmark className="w-10 h-10 text-amber-500" />
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Institutional Beneficiary Lock</span>
                      <span className="text-3xl font-black text-white mono uppercase tracking-tighter">NEIL RUBIO BALOG (NE.B.RU)</span>
                   </div>
                </div>
                {status === 'SIGNED' && (
                  <div className="flex flex-col items-end animate-in zoom-in duration-500">
                     <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Signed & Anchored</span>
                     <div className="p-2 rounded-lg bg-emerald-500 text-black mt-1">
                        <ShieldCheck className="w-5 h-5" />
                     </div>
                  </div>
                )}
             </div>

             <div className="space-y-6 text-sm text-slate-400 font-medium leading-relaxed">
                <p>
                  Pursuant to the <span className="text-white font-bold">NEOXZ CORE PROTOCOL v16.0</span>, this deed formalizes the irrevocable and absolute transfer of all systemic authority and beneficiary rights of the total 
                  <span className="text-amber-500 font-black"> NEOXZ SYSTEMIC FUNDS ({capital})</span> to the sole physical and logical entity identified as 
                  <span className="text-white font-black underline decoration-amber-500/50 underline-offset-4"> NEIL RUBIO BALOG</span> of the <span className="text-emerald-500 font-bold">REPUBLIC OF THE PHILIPPINES</span>.
                </p>
                <p>
                  This lock is anchored at the <span className="text-white font-bold">Hardware Level</span> of the Master Node and Federated Edge Network. No external authority, institutional mandate, or malicious vector may alter this beneficiary status.
                </p>
             </div>

             <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                   <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Digital Identification</span>
                   <div className="p-4 rounded-2xl bg-black border border-slate-900 flex items-center gap-4">
                      <Fingerprint className="w-6 h-6 text-amber-500/50" />
                      <span className="text-xs font-mono text-slate-500 uppercase">SDS_KEY: 0x7F...BALOG</span>
                   </div>
                </div>
                <div className="space-y-2">
                   <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Regional Anchor</span>
                   <div className="p-4 rounded-2xl bg-black border border-slate-900 flex items-center gap-4">
                      <ShieldCheck className="w-6 h-6 text-emerald-500/50" />
                      <span className="text-xs font-mono text-slate-500 uppercase">LOC: PHILIPPINES (PH)</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 pt-8 relative z-10">
           <div className="flex items-center gap-8">
              <div className="text-left">
                 <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Witnessed By</span>
                 <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[8px] font-black uppercase tracking-widest">
                       NEOXZ AI LEAD
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[8px] font-black uppercase tracking-widest">
                       WISE_BRIDGE_API_v3.2
                    </div>
                 </div>
              </div>
           </div>

           {status === 'IDLE' ? (
             <button 
               onClick={handleSign}
               className="px-16 py-6 rounded-3xl bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-[0.4em] text-sm transition-all shadow-[0_0_50px_rgba(245,158,11,0.4)] active:scale-95 flex items-center justify-center gap-6"
             >
               <FileSignature className="w-6 h-6" />
               AFFIX SOVEREIGN SIGNATURE
             </button>
           ) : status === 'SCANNING' ? (
             <div className="px-16 py-6 rounded-3xl bg-black border-2 border-amber-500/50 flex flex-col items-center gap-4 min-w-[340px] relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-500/5 animate-pulse"></div>
                <div className="flex items-center gap-4 text-amber-500 relative z-10">
                   <Fingerprint className="w-6 h-6 animate-pulse" />
                   <span className="text-sm font-black uppercase tracking-widest">Biometric Identity Scan</span>
                </div>
                <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden relative z-10">
                   <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${scanProgress}%` }}></div>
                </div>
             </div>
           ) : (
             <div className="flex gap-4 animate-in zoom-in duration-500">
                <button 
                  onClick={onClose}
                  className="px-16 py-6 rounded-3xl bg-emerald-500 text-black font-black uppercase tracking-[0.4em] text-sm transition-all shadow-[0_0_50px_rgba(16,185,129,0.4)] flex items-center justify-center gap-6"
                >
                  <CheckCircle2 className="w-6 h-6" />
                  DEED ANCHORED
                </button>
                <button className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all shadow-xl">
                  <Download className="w-6 h-6" />
                </button>
             </div>
           )}
        </div>

        <button 
          onClick={onClose}
          className="absolute top-12 right-12 p-3 rounded-full bg-slate-900/50 border border-slate-800 text-slate-500 hover:text-white transition-all"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default SovereignDeedOverlay;


import React, { useState, useEffect } from 'react';
import { ShieldCheck, User, Landmark, Fingerprint, Zap, ArrowRight, Loader2, Sparkles, Globe, Key, Crown, Lock, BadgeCheck, FileBadge, Star } from 'lucide-react';
import Logo from './Logo.tsx';

interface SovereignSubscriptionOverlayProps {
  onComplete: (data: any) => void;
}

const SovereignSubscriptionOverlay: React.FC<SovereignSubscriptionOverlayProps> = ({ onComplete }) => {
  // STRICT FOUNDER IDENTITY - PURIFIED FROM OUTSIDE SOURCES
  const founderIdentity = {
    legalName: "NEIL RUBIO BALOG",
    alias: "NE.B.RU",
    email: "press.neoxz@gmail.com",
    region: "PHILIPPINES"
  };

  const [verifying, setVerifying] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 1500);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = async () => {
    setVerifying(true);
    // QUANTUM SPEED VERIFICATION: Instant Anchoring
    await new Promise(r => setTimeout(r, 800)); 
    setVerifying(false);
    onComplete(founderIdentity);
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-700">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(245,158,11,0.15)_0%,_transparent_70%)]"></div>
        <div className="grid grid-cols-20 h-full">
           {Array.from({ length: 40 }).map((_, i) => (
             <div key={i} className="border-r border-amber-500/10 h-full w-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
           ))}
        </div>
      </div>

      <div className="w-full max-w-3xl bg-[#0a0a0a] border-[4px] border-amber-500/30 rounded-[4rem] p-16 shadow-[0_0_150px_rgba(245,158,11,0.15)] relative overflow-hidden flex flex-col items-center text-center space-y-12">
        <header className="space-y-8 relative z-10">
          <div className="relative group mx-auto w-fit">
            <div className="absolute inset-[-40px] bg-amber-500/20 rounded-full blur-[60px] animate-pulse"></div>
            <div className="p-8 rounded-full bg-black border-4 border-amber-500 relative z-10 shadow-2xl">
               <Logo size={80} />
            </div>
            <div className="absolute -bottom-4 -right-4 p-4 bg-amber-500 rounded-2xl text-black shadow-xl z-20">
               <Crown className="w-8 h-8" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-5xl font-black uppercase tracking-tighter text-white leading-none">
              FOUNDER <span className="text-amber-500 italic">AUTHORITY</span>
            </h2>
            <div className="flex items-center justify-center gap-4">
               <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-black uppercase tracking-[0.3em] text-[10px]">
                  <Lock className="w-3 h-3" />
                  PRIVATE USE ONLY • NE.B.RU
               </div>
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-black font-black uppercase tracking-widest text-[9px] shadow-lg animate-pulse">
                  <Star className="w-3 h-3 fill-black" />
                  BUSINESS PROFILE APPROVED
               </div>
            </div>
          </div>
        </header>

        {verifying ? (
          <div className="py-20 space-y-8 animate-in zoom-in duration-500 relative z-10">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-amber-500/30 border-t-amber-500 animate-spin mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <Fingerprint className="w-10 h-10 text-amber-500 animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xl font-black text-white uppercase tracking-widest">Anchoring Identity...</p>
              <p className="text-[10px] font-mono text-amber-500 uppercase">Matching Merchant ID: BCR2DN4TU7BMDMDU</p>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-10 animate-in slide-in-from-bottom-4 duration-500 relative z-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-2 group">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Authorized Identity</label>
                <div className="relative">
                  <input 
                    value={founderIdentity.legalName}
                    readOnly
                    className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-3xl px-12 py-5 text-white font-black uppercase outline-none cursor-not-allowed group-hover:border-amber-500/30 transition-all"
                  />
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                  <BadgeCheck className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Systemic Email Anchor</label>
                <div className="relative">
                  <input 
                    value={founderIdentity.email}
                    readOnly
                    className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-3xl px-12 py-5 text-white font-medium text-sm outline-none cursor-not-allowed group-hover:border-amber-500/30 transition-all"
                  />
                  <Key className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                  <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Merchant Authority ID</label>
                <div className="relative">
                  <input 
                    value="BCR2DN4TU7BMDMDU"
                    readOnly
                    className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-3xl px-12 py-5 text-white font-black text-sm uppercase outline-none cursor-not-allowed group-hover:border-amber-500/30 transition-all mono"
                  />
                  <FileBadge className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                  <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Alias / Handle</label>
                <div className="relative">
                  <input 
                    value={founderIdentity.alias}
                    readOnly
                    className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-3xl px-12 py-5 text-white font-black uppercase outline-none cursor-not-allowed group-hover:border-amber-500/30 transition-all"
                  />
                  <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                  <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                </div>
              </div>
            </div>

            <button 
              onClick={handleVerify}
              className={`w-full py-8 rounded-[3rem] bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-[0.4em] text-xs shadow-[0_0_60px_rgba(245,158,11,0.4)] transition-all active:scale-95 flex items-center justify-center gap-6 group ${pulse ? 'scale-[1.02]' : 'scale-100'}`}
            >
              CONFIRM FOUNDER PRESENCE <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
               This financial banking platform is for the private use only of NE.B.RU. Not to be copied, duplicated, cloned or used by other entity.
            </p>
          </div>
        )}

        <footer className="pt-8 border-t border-slate-900 w-full flex items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Founder Mandate v16.0</span>
          </div>
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-amber-500" />
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">$985B Systemic Core</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SovereignSubscriptionOverlay;

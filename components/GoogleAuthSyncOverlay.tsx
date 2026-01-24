
import React, { useEffect, useState } from 'react';
import { Cloud, ShieldCheck, Fingerprint, Lock, Globe, Zap, Cpu, Key, CheckCircle2 } from 'lucide-react';
import Logo from './Logo';

interface GoogleAuthSyncOverlayProps {
  onComplete: () => void;
  founderEmail: string;
}

const GoogleAuthSyncOverlay: React.FC<GoogleAuthSyncOverlayProps> = ({ onComplete, founderEmail }) => {
  const [phase, setPhase] = useState(0);
  const [tokens, setTokens] = useState<string[]>([]);

  useEffect(() => {
    const sequence = async () => {
      // Phase 0: Identity Detection
      await new Promise(r => setTimeout(r, 1000));
      setPhase(1);
      
      // Phase 1: OAuth Mandate Exchange
      for (let i = 0; i < 3; i++) {
        await new Promise(r => setTimeout(r, 800));
        setTokens(prev => [...prev, `0xAUTH_TOKEN_${Math.random().toString(16).substring(2, 6).toUpperCase()}`]);
      }
      
      setPhase(2);
      // Phase 2: Key Anchoring
      await new Promise(r => setTimeout(r, 1500));
      setPhase(3);
      
      // Phase 3: Complete
      await new Promise(r => setTimeout(r, 1200));
      onComplete();
    };
    sequence();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[550] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-700">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(66,133,244,0.1)_0%,_transparent_70%)]"></div>
        <div className="grid grid-cols-12 h-full gap-4 p-4">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="h-24 bg-slate-900/20 border border-slate-800/10 rounded-xl animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl bg-slate-900/40 border border-blue-500/30 rounded-[4rem] p-16 shadow-[0_0_150px_rgba(66,133,244,0.15)] relative overflow-hidden flex flex-col items-center text-center space-y-12">
        <div className="relative group">
          <div className="absolute inset-[-40px] bg-blue-500/20 rounded-full blur-[60px] animate-pulse"></div>
          <div className="relative z-10 p-6 bg-black border-4 border-blue-500/50 rounded-[2.5rem] shadow-2xl">
            <Cloud className={`w-16 h-16 text-blue-400 ${phase < 3 ? 'animate-bounce' : ''}`} />
          </div>
          <div className="absolute -bottom-4 -right-4 p-3 bg-emerald-500 rounded-2xl shadow-xl z-20 animate-in zoom-in duration-500">
             <ShieldCheck className="w-6 h-6 text-black" />
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-500 text-black font-black uppercase tracking-[0.3em] text-[10px] shadow-xl">
             <Key className="w-4 h-4" />
             Google Cloud Identity Sync
          </div>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white leading-none">
            {phase === 0 && 'DETECTING MANDATE...'}
            {phase === 1 && 'EXCHANGING OAUTH TOKENS'}
            {phase === 2 && 'ANCHORING PROJECT KEY'}
            {phase === 3 && 'IDENTITY PARITY LOCKED'}
          </h2>
          <p className="text-sm font-medium text-slate-400 max-w-xl mx-auto uppercase tracking-widest font-mono">
            Link: <span className="text-blue-400">{founderEmail}</span> ↔ <span className="text-emerald-400">NEOXZ_CORE</span>
          </p>
        </div>

        <div className="w-full space-y-6 relative z-10">
           <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-400 transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(66,133,244,0.5)]"
                style={{ width: `${(phase / 3) * 100}%` }}
              ></div>
           </div>
           
           <div className="flex flex-wrap justify-center gap-3">
              {tokens.map((token, i) => (
                <div key={i} className="px-4 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[9px] font-mono text-blue-400 animate-in slide-in-from-bottom-4">
                  {token}
                </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative z-10">
           {[
             { label: 'Cloud Handshake', active: phase >= 1, icon: <Globe className="w-4 h-4" /> },
             { label: 'Project Vault', active: phase >= 2, icon: <Lock className="w-4 h-4" /> },
             { label: 'Sovereign Identity', active: phase >= 3, icon: <Fingerprint className="w-4 h-4" /> }
           ].map((step, i) => (
             <div key={i} className={`p-6 rounded-[2rem] border transition-all duration-700 ${step.active ? 'bg-black border-blue-500/30 text-blue-400 shadow-lg' : 'bg-black/20 border-slate-900 text-slate-700 grayscale'}`}>
                <div className="flex items-center justify-center gap-3 mb-2">
                   {step.icon}
                   <span className="text-[10px] font-black uppercase tracking-widest">{step.label}</span>
                </div>
                {step.active && <CheckCircle2 className="w-4 h-4 mx-auto mt-2 animate-in zoom-in" />}
             </div>
           ))}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] text-slate-600 font-black uppercase tracking-[0.4em] opacity-40">
           NEOXZ-ALL-MANDATE-GOOGLE-AUTH-v15.0
        </div>
      </div>
    </div>
  );
};

export default GoogleAuthSyncOverlay;

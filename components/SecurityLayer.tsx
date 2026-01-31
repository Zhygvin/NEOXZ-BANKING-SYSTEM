
import React, { useState, useEffect } from 'react';
import { SecurityContext, SecurityStatus } from './SecurityContext.tsx';
import { ShieldAlert, Skull, Activity, Lock, Terminal, Loader2, AlertTriangle, Radio, WifiOff, Fingerprint, Unlock, ShieldCheck, Zap } from 'lucide-react';
import Logo from './Logo';

interface SecurityLayerProps {
  children: React.ReactNode;
  threatLevel: 'LOW' | 'ELEVATED' | 'CRITICAL';
  coreImmutability: 'LOCKED' | 'SYNCING' | 'DEVIATION_DETECTED';
}

export const SecurityLayer: React.FC<SecurityLayerProps> = ({ children, threatLevel, coreImmutability }) => {
  let status: SecurityStatus = 'SECURE';
  
  if (threatLevel === 'CRITICAL' || coreImmutability === 'DEVIATION_DETECTED') {
    status = 'CRITICAL_LOCKDOWN';
  } else if (threatLevel === 'ELEVATED' || coreImmutability === 'SYNCING') {
    status = 'WARNING';
  }

  const [authPhase, setAuthPhase] = useState<'NONE' | 'SCANNING' | 'VERIFYING' | 'SUCCESS'>('NONE');
  const [scanProgress, setScanProgress] = useState(0);

  const validateAction = (action: string): boolean => {
    if (status === 'CRITICAL_LOCKDOWN') {
      console.error(`[SECURITY BLOCK] Action '${action}' denied due to system lockdown.`);
      return false;
    }
    return true;
  };

  const handleAuthorize = () => {
    setAuthPhase('SCANNING');
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setScanProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setAuthPhase('VERIFYING');
        setTimeout(() => {
          setAuthPhase('SUCCESS');
        }, 1500);
      }
    }, 30);
  };

  if (status === 'CRITICAL_LOCKDOWN') {
    return (
      <SecurityContext.Provider value={{ status, validateAction }}>
        <div className="fixed inset-0 z-[99999] bg-[#050101] flex items-center justify-center p-8 overflow-hidden select-none font-sans">
          {/* High-Fidelity Atmospheric Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(220,38,38,0.15)_0%,_transparent_70%)] animate-pulse"></div>
          
          {/* Moving Grid Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
             <div className="grid grid-cols-12 h-full border-l border-rose-900/20">
               {Array.from({ length: 12 }).map((_, i) => (
                 <div key={i} className="border-r border-rose-900/20 h-full relative">
                    <div className="absolute h-1 w-full bg-rose-500/40 animate-[scan-vertical_4s_linear_infinite]" style={{ animationDelay: `${i * 0.3}s` }}></div>
                 </div>
               ))}
             </div>
          </div>

          <div className="w-full max-w-5xl bg-[#0a0202]/80 border-[6px] border-rose-600 rounded-[5rem] p-16 shadow-[0_0_200px_rgba(220,38,38,0.5)] relative overflow-hidden backdrop-blur-3xl animate-in zoom-in duration-700">
             {/* Progress bar at top */}
             <div className="absolute top-0 left-0 right-0 h-2 bg-rose-900/40 overflow-hidden">
                <div className="h-full bg-rose-600 animate-[shimmer_1.5s_infinite_linear] bg-[length:200%_100%] w-full"></div>
             </div>

             <div className="flex flex-col items-center text-center space-y-12 relative z-10">
                <div className="relative group">
                   <div className="absolute inset-[-40px] bg-rose-600/30 rounded-full blur-[100px] animate-ping"></div>
                   <div className="p-12 rounded-full bg-rose-600 text-white shadow-[0_0_120px_rgba(220,38,38,1)] border-4 border-white/20 relative z-10 transition-transform hover:scale-110 duration-500">
                      <ShieldAlert className="w-24 h-24" />
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="inline-flex items-center gap-4 px-10 py-3 rounded-full bg-white text-rose-700 font-black uppercase tracking-[0.5em] text-[12px] shadow-2xl">
                      <Radio className="w-5 h-5 animate-pulse" />
                      CRITICAL CORE ISOLATION
                   </div>
                   <h1 className="text-8xl font-black uppercase tracking-tighter text-white leading-none italic drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                     SYSTEM <span className="text-rose-500 underline decoration-rose-900/50 underline-offset-8">HALTED</span>
                   </h1>
                   <p className="text-lg font-bold text-rose-200/40 uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed">
                     LiteRT Neural Acceleration has identified a systemic deviation. All capital rails severed. 4,117 edge nodes locked in forensic stasis.
                   </p>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 text-left font-mono">
                   {/* Kernel Logs */}
                   <div className="p-10 rounded-[3.5rem] bg-black border-2 border-rose-950 space-y-4 shadow-inner relative overflow-hidden">
                      <div className="absolute top-4 right-8 opacity-20"><Terminal className="w-6 h-6 text-rose-900" /></div>
                      <span className="text-[10px] font-black text-rose-900 uppercase tracking-widest">LiteRT_System_Buffer</span>
                      <div className="space-y-2 text-[10px] text-rose-500/80 max-h-32 overflow-hidden">
                         <p className="animate-in slide-in-from-left duration-200">[Alloc] quantum_mesh_v16 = 0x7F... [OK]</p>
                         <p className="animate-in slide-in-from-left duration-200 delay-75">[Warn] Parity Drift: -0.00015% Detected</p>
                         <p className="animate-in slide-in-from-left duration-200 delay-150">[Kill] process.bank_adapter_3.2 -> SIGKILL</p>
                         <p className="animate-in slide-in-from-left duration-200 delay-200 text-white font-black">[Sys] LOCKDOWN_PROTOCOL_v15_ENGAGED</p>
                         <p className="animate-pulse">_</p>
                      </div>
                   </div>

                   {/* Telemetry Block */}
                   <div className="p-10 rounded-[3.5rem] bg-black border-2 border-rose-950 space-y-6 shadow-inner flex flex-col justify-center">
                      <div className="flex justify-between items-center border-b border-rose-900/30 pb-4">
                         <span className="text-[10px] text-rose-800 font-black uppercase">Threat Level</span>
                         <span className="text-xl font-black text-white">{threatLevel}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-rose-900/30 pb-4">
                         <span className="text-[10px] text-rose-800 font-black uppercase">Immutability</span>
                         <span className="text-xl font-black text-rose-500">{coreImmutability}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] text-rose-800 font-black uppercase">Edge Status</span>
                         <span className="text-xl font-black text-rose-500">ISOLATED</span>
                      </div>
                   </div>
                </div>

                {/* Authorization Area */}
                <div className="pt-12 w-full max-w-md space-y-8">
                   {authPhase === 'NONE' ? (
                     <button 
                       onClick={handleAuthorize}
                       className="w-full py-8 rounded-[3rem] bg-white text-black font-black uppercase tracking-[0.4em] text-sm shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:bg-rose-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-6"
                     >
                        <Lock className="w-6 h-6" />
                        Initiate Master Auth
                     </button>
                   ) : (
                     <div className="space-y-6 animate-in fade-in zoom-in duration-500">
                        <div className="flex flex-col items-center gap-4">
                           <div className={`p-6 rounded-full border-4 transition-all duration-300 ${authPhase === 'SUCCESS' ? 'bg-emerald-500 border-white shadow-[0_0_50px_rgba(16,185,129,1)]' : 'bg-black border-rose-600 shadow-[0_0_30px_rgba(220,38,38,0.4)]'}`}>
                              {authPhase === 'SCANNING' ? <Fingerprint className="w-12 h-12 text-rose-500 animate-pulse" /> : 
                               authPhase === 'VERIFYING' ? <Activity className="w-12 h-12 text-rose-500 animate-bounce" /> :
                               <ShieldCheck className="w-12 h-12 text-black" />}
                           </div>
                           <div className="text-center">
                              <p className="text-lg font-black text-white uppercase tracking-[0.2em]">
                                 {authPhase === 'SCANNING' ? 'Scanning Biometrics...' : 
                                  authPhase === 'VERIFYING' ? 'Authenticating Founder...' :
                                  'Identity Verified'}
                              </p>
                              {authPhase !== 'SUCCESS' && (
                                <p className="text-[10px] font-mono text-rose-500 uppercase mt-1">SCAN_PROGRESS: {scanProgress}%</p>
                              )}
                           </div>
                        </div>

                        {authPhase !== 'SUCCESS' && (
                          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                             <div 
                               className="h-full bg-rose-600 transition-all duration-300" 
                               style={{ width: `${scanProgress}%` }}
                             />
                          </div>
                        )}

                        {authPhase === 'SUCCESS' && (
                          <div className="p-6 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-400 font-black uppercase tracking-[0.4em] text-[10px] animate-bounce">
                             MANDATE_OVERRIDE_PENDING_REBOOT
                          </div>
                        )}
                     </div>
                   )}
                </div>
             </div>

             {/* Background Logo */}
             <div className="absolute bottom-12 left-16 grayscale opacity-10 pointer-events-none">
                <Logo size={64} />
             </div>
             <div className="absolute bottom-12 right-16 text-[10px] font-mono text-rose-900 uppercase tracking-widest pointer-events-none">
                SDS_ENFORCED_LOCK_0x7F
             </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scan-vertical {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          .animate-flash-red {
            animation: flash-red 0.2s ease-in-out infinite;
          }
          @keyframes flash-red {
            0%, 100% { background-color: transparent; }
            50% { background-color: rgba(220, 38, 38, 0.05); }
          }
        `}} />
      </SecurityContext.Provider>
    );
  }

  return (
    <SecurityContext.Provider value={{ status, validateAction }}>
      <div className={`relative w-full h-full transition-all duration-1000 ${
        status === 'WARNING' ? 'p-1' : ''
      }`}>
        {/* Warning Border/Glow for Elevated status */}
        {status === 'WARNING' && (
          <div className="absolute inset-0 pointer-events-none z-[6000]">
            <div className="w-full h-full border-[6px] border-amber-500/40 rounded-[1rem] shadow-[inset_0_0_60px_rgba(245,158,11,0.2)] animate-pulse"></div>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-10 py-2.5 rounded-full bg-amber-500 text-black font-black uppercase tracking-[0.4em] text-[10px] flex items-center gap-4 shadow-[0_0_40px_rgba(245,158,11,0.5)]">
               <AlertTriangle className="w-4 h-4" />
               Elevated Threat Context: Quantum Sync Recalibrating
               <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          </div>
        )}
        
        {children}
      </div>
    </SecurityContext.Provider>
  );
};

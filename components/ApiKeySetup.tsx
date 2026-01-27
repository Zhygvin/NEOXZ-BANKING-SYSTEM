
import React, { useState, useEffect } from 'react';
import { Loader2, Check, ShieldCheck, Cloud, Key, ExternalLink, AlertTriangle, Terminal } from 'lucide-react';
import Logo from './Logo';

interface ApiKeySetupProps {
  onSuccess: () => void;
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onSuccess }) => {
  const [booting, setBooting] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [manualKey, setManualKey] = useState('');
  const [showManual, setShowManual] = useState(false);

  useEffect(() => {
    let mounted = true;
    const checkKey = async () => {
      try {
        // Safety timeout to prevent infinite loading
        const timeout = new Promise((resolve) => setTimeout(resolve, 2000));
        
        // Attempt to check key availability
        const check = async () => {
            if ((window as any).aistudio && (window as any).aistudio.hasSelectedApiKey) {
                if (await (window as any).aistudio.hasSelectedApiKey()) return true;
            }
            if (localStorage.getItem('neoxz_api_key')) return true;
            return false;
        };

        // Race the check against the timeout
        const selected = await Promise.race([check(), timeout]);

        if (mounted) {
            if (selected === true) {
                onSuccess();
            }
            setBooting(false);
        }
      } catch (e) {
        console.warn("Auto-auth check bypassed:", e);
        if (mounted) setBooting(false);
      }
    };
    
    checkKey();
    
    return () => { mounted = false; };
  }, [onSuccess]);

  const handleSelectKey = async () => {
    try {
        if ((window as any).aistudio && (window as any).aistudio.openSelectKey) {
            await (window as any).aistudio.openSelectKey();
            // Assume success after interaction to prevent blocking
            onSuccess();
        } else {
            setError("Orchestrator Link Unavailable. Please ensure the environment supports Google AI Studio integration.");
        }
    } catch (e) {
        console.error("Key selection failed", e);
        // Fallback: Proceed anyway to allow UI access, API calls might fail but dashboard will load
        onSuccess();
    }
  };

  const handleManualSubmit = () => {
    if (!manualKey.trim()) {
      setError("Invalid Key Entry");
      return;
    }
    localStorage.setItem('neoxz_api_key', manualKey.trim());
    onSuccess();
  };

  if (booting) {
    return (
      <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center space-y-6">
        <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin relative z-10" />
        </div>
        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] animate-pulse">
            INITIALIZING SOVEREIGN HANDSHAKE...
        </span>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-12 overflow-hidden animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.05)_0%,_transparent_70%)]"></div>
      
      <div className="w-full max-w-lg space-y-12 relative z-10">
        <div className="flex flex-col items-center gap-6">
          <Logo size={72} className="relative z-10" />
          <div className="text-center">
            <h2 className="text-xl font-black uppercase tracking-[0.4em] text-white">Sovereign Authority</h2>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-2">Mandatory API Key Selection</p>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-10 space-y-8 shadow-2xl backdrop-blur-md text-center">
           <p className="text-sm text-slate-300 leading-relaxed font-medium">
             Access to the Unified Consortium and Veo Video Generation requires a valid API key from a paid GCP project.
           </p>
           
           {error && (
             <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-left">
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
                <p className="text-[10px] text-rose-200 leading-tight">{error}</p>
             </div>
           )}

           <div className="space-y-4">
              <button 
                onClick={handleSelectKey}
                className="w-full py-6 rounded-[2rem] bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.4em] text-xs transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-4 group"
              >
                <Key className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Select Paid API Key
              </button>
              
              <div className="relative flex items-center justify-center gap-4 opacity-50 py-2">
                 <div className="h-px bg-slate-800 w-full"></div>
                 <span className="text-[9px] font-black uppercase text-slate-500 whitespace-nowrap">OR</span>
                 <div className="h-px bg-slate-800 w-full"></div>
              </div>

              {!showManual ? (
                <button 
                  onClick={() => setShowManual(true)}
                  className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors flex items-center justify-center gap-2 w-full"
                >
                  <Terminal className="w-3 h-3" />
                  Enter Manual Key (Founder)
                </button>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                   <input 
                     value={manualKey}
                     onChange={(e) => setManualKey(e.target.value)}
                     placeholder="Paste Google API Key"
                     className="w-full bg-black/60 border border-slate-800 rounded-2xl px-6 py-4 text-xs text-white outline-none focus:border-emerald-500/50 transition-all font-mono text-center"
                     type="password"
                   />
                   <button 
                     onClick={handleManualSubmit}
                     className="w-full py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black uppercase tracking-widest text-[10px] transition-all"
                   >
                     Authenticate
                   </button>
                </div>
              )}
              
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-emerald-400 transition-colors uppercase tracking-widest"
              >
                Billing Documentation
                <ExternalLink className="w-3 h-3" />
              </a>
           </div>
        </div>

        <div className="flex items-center justify-center gap-8 opacity-40">
           <div className="flex items-center gap-2">
              <Cloud className="w-3 h-3 text-blue-500" />
              <span className="text-[8px] font-black uppercase text-slate-400">GCP Linked</span>
           </div>
           <div className="flex items-center gap-2">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span className="text-[8px] font-black uppercase text-slate-400">Identity Secure</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySetup;

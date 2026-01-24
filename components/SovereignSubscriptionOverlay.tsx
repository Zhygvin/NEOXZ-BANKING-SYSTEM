import React, { useState } from 'react';
import { ShieldCheck, User, Landmark, Fingerprint, Zap, ArrowRight, Loader2, Sparkles, Globe, Key } from 'lucide-react';
import Logo from './Logo.tsx';

interface SovereignSubscriptionOverlayProps {
  onComplete: (data: any) => void;
}

const SovereignSubscriptionOverlay: React.FC<SovereignSubscriptionOverlayProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ legalName: '', email: '', region: 'Philippines', identityHash: '' });
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async () => {
    setVerifying(true);
    // Simulate Neural Handshake
    await new Promise(r => setTimeout(r, 2000));
    setVerifying(false);
    onComplete({
      ...formData,
      id: `SOV-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-700">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.15)_0%,_transparent_70%)]"></div>
        <div className="grid grid-cols-20 h-full">
           {Array.from({ length: 40 }).map((_, i) => (
             <div key={i} className="border-r border-emerald-500/10 h-full w-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
           ))}
        </div>
      </div>

      <div className="w-full max-w-2xl bg-[#0a0a0a] border-2 border-emerald-500/30 rounded-[4rem] p-16 shadow-[0_0_100px_rgba(16,185,129,0.1)] relative overflow-hidden flex flex-col items-center text-center space-y-12">
        <header className="space-y-6">
          <div className="relative group mx-auto w-fit">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
            <Logo size={80} className="relative z-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Sovereign <span className="text-emerald-500 italic">Subscriber</span></h2>
            <p className="text-xs text-slate-500 font-black uppercase tracking-widest">Technological Mandate v16.0 Onboarding</p>
          </div>
        </header>

        {verifying ? (
          <div className="py-20 space-y-8 animate-in zoom-in duration-500">
            <div className="relative">
              <Loader2 className="w-20 h-20 text-emerald-500 animate-spin mx-auto" />
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <p className="text-xl font-black text-white uppercase tracking-widest">Anchoring Identity...</p>
              <p className="text-[10px] font-mono text-emerald-500 uppercase">Synchronizing with NEOXZ Systemic Fund</p>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-10 animate-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-6 text-left">
              <div className="p-4 rounded-2xl bg-emerald-500 text-black shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-black text-white uppercase leading-none">Founding Abundance</h4>
                <p className="text-xs text-emerald-400 font-bold mt-1">Verified identities receive $55 starting balance.</p>
              </div>
            </div>

            <div className="space-y-6 text-left">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Full Legal Identity</label>
                <div className="relative">
                  <input 
                    value={formData.legalName}
                    onChange={(e) => setFormData({...formData, legalName: e.target.value})}
                    placeholder="ENTER FULL NAME"
                    className="w-full bg-black border-2 border-slate-800 rounded-2xl px-12 py-4 text-white font-black uppercase outline-none focus:border-emerald-500/50 transition-all"
                  />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Sovereign Email</label>
                <div className="relative">
                  <input 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="IDENTITY@SOVEREIGN.IO"
                    className="w-full bg-black border-2 border-slate-800 rounded-2xl px-12 py-4 text-white font-black uppercase outline-none focus:border-emerald-500/50 transition-all"
                  />
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Region</label>
                  <div className="relative">
                    <input 
                      value={formData.region}
                      onChange={(e) => setFormData({...formData, region: e.target.value})}
                      className="w-full bg-black border-2 border-slate-800 rounded-2xl px-12 py-4 text-white font-black uppercase outline-none"
                    />
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Biometric ID</label>
                  <div className="relative">
                    <input 
                      placeholder="0x...SDS_KEY"
                      className="w-full bg-black border-2 border-slate-800 rounded-2xl px-12 py-4 text-white mono text-xs outline-none"
                      disabled
                    />
                    <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleVerify}
              disabled={!formData.legalName || !formData.email}
              className="w-full py-6 rounded-3xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.4em] text-xs shadow-2xl shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-4 disabled:opacity-20"
            >
              Verify & Claim $55 <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        <footer className="pt-8 border-t border-slate-900 w-full flex items-center justify-center gap-8 opacity-40 grayscale">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[8px] font-black uppercase tracking-widest">SignaSovereign 4.2.1</span>
          </div>
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4" />
            <span className="text-[8px] font-black uppercase tracking-widest">GCP Production Rail</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SovereignSubscriptionOverlay;
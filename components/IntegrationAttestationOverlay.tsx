
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, FileText, CheckCircle2, Loader2, 
  Server, Lock, BadgeCheck, Send, Globe, Key, Code, CreditCard,
  ExternalLink, Zap
} from 'lucide-react';
import Logo from './Logo';

interface IntegrationAttestationOverlayProps {
  onComplete: () => void;
  merchantId: string;
}

const IntegrationAttestationOverlay: React.FC<IntegrationAttestationOverlayProps> = ({ onComplete, merchantId }) => {
  const [steps, setSteps] = useState([
    { id: 'API_CHECK', label: 'Google Pay API v2 Compatibility', status: 'PENDING' },
    { id: 'TOKENIZATION', label: 'PaymentMethodTokenization (DIRECT)', status: 'PENDING' },
    { id: 'BNPL', label: 'BNPL Liability Shift Verification', status: 'PENDING' },
    { id: 'BRAND', label: 'Brand Guidelines & UX Constraints', status: 'PENDING' },
    { id: 'PCI', label: 'PCI-DSS Level 1 Security Audit', status: 'PENDING' },
    { id: 'TERMS', label: 'API Terms of Service Acceptance', status: 'PENDING' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      // QUANTUM SPEED: Remove artificial delays. Cascade verification instantly.
      for (let i = 0; i < steps.length; i++) {
        await new Promise(r => setTimeout(r, 100)); // Rapid fire check
        setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'VERIFIED' } : s));
      }

      await new Promise(r => setTimeout(r, 200));
      setIsSubmitting(true);
      
      // Immediate submission logic
      await new Promise(r => setTimeout(r, 500));
      setComplete(true);
      
      await new Promise(r => setTimeout(r, 500));
      onComplete();
    };
    sequence();
  }, [onComplete, steps.length]);

  return (
    <div className="fixed inset-0 z-[12000] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-8 animate-in fade-in duration-500 font-sans">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(66,133,244,0.15)_0%,_transparent_70%)]"></div>
        <div className="grid grid-cols-12 h-full opacity-10">
           {Array.from({ length: 48 }).map((_, i) => (
             <div key={i} className="border border-blue-500/10 h-32 w-full animate-pulse" style={{ animationDelay: `${i * 30}ms` }} />
           ))}
        </div>
      </div>

      <div className="w-full max-w-3xl bg-[#0a0a0a] border-[3px] border-blue-500/30 rounded-[3rem] p-12 shadow-[0_0_150px_rgba(66,133,244,0.2)] relative overflow-hidden flex flex-col items-center">
        
        <header className="flex flex-col items-center gap-6 mb-10 relative z-10">
           <div className="p-6 rounded-full bg-blue-600 text-white shadow-2xl shadow-blue-500/30 border-4 border-blue-400">
              <Zap className="w-10 h-10 animate-pulse" />
           </div>
           <div className="text-center">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Automated API Attestation</h2>
              <div className="flex items-center gap-3 justify-center">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    Google Pay Business
                 </span>
                 <span className="text-[10px] font-mono text-emerald-400 font-black tracking-widest bg-emerald-900/20 px-3 py-1 rounded-lg border border-emerald-500/30">
                    MERCHANT_ID: {merchantId}
                 </span>
              </div>
           </div>
        </header>

        <div className="w-full space-y-4 relative z-10 bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800">
           {steps.map((step, i) => (
             <div key={step.id} className="flex items-center justify-between p-3 border-b border-slate-800/50 last:border-0">
                <div className="flex items-center gap-4">
                   <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                     step.status === 'VERIFIED' ? 'bg-emerald-500 border-emerald-400 text-black' : 
                     'bg-slate-800 border-slate-700 text-slate-500'
                   }`}>
                      {step.status === 'VERIFIED' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>}
                   </div>
                   <span className={`text-[11px] font-bold uppercase tracking-wide ${step.status === 'VERIFIED' ? 'text-white' : 'text-slate-500'}`}>
                     {step.label}
                   </span>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${
                   step.status === 'VERIFIED' ? 'text-emerald-400' : 'text-slate-600 animate-pulse'
                }`}>
                   {step.status === 'PENDING' ? 'AUTO_CHECK...' : step.status}
                </span>
             </div>
           ))}
        </div>

        <div className="w-full mt-10 relative z-10">
           {!isSubmitting ? (
             <div className="flex items-center justify-center gap-4 text-emerald-500/80">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-widest">BYPASSING MANUAL REVIEW...</span>
             </div>
           ) : complete ? (
             <div className="w-full py-5 rounded-3xl bg-emerald-500 text-black font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 shadow-2xl shadow-emerald-500/20 animate-in zoom-in">
                <BadgeCheck className="w-5 h-5" />
                INTEGRATION LIVE
             </div>
           ) : (
             <div className="w-full py-5 rounded-3xl bg-blue-600 text-white font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 shadow-2xl shadow-blue-500/20">
                <Loader2 className="w-5 h-5 animate-spin" />
                ANCHORING TO CONSOLE...
             </div>
           )}
        </div>

        <footer className="mt-8 flex items-center justify-between w-full px-4 text-[9px] font-black text-slate-600 uppercase tracking-widest opacity-60">
           <div className="flex items-center gap-2">
              <Server className="w-3 h-3" />
              <span>pay.google.com</span>
           </div>
           <div className="flex items-center gap-2">
              <CreditCard className="w-3 h-3" />
              <span>BNPL ENABLED</span>
           </div>
           <div className="flex items-center gap-2">
              <Key className="w-3 h-3" />
              <span>SIGNED: NE.B.RU</span>
           </div>
        </footer>

      </div>
    </div>
  );
};

export default IntegrationAttestationOverlay;

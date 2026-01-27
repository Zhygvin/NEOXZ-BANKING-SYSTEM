
import React, { useState } from 'react';
import { WalletCards, Zap, Loader2, Check, Smartphone, ShieldCheck, QrCode } from 'lucide-react';
import Logo from './Logo';
import { generateFastResponse } from '../services/geminiService';

const DigitalAssetIssuer: React.FC = () => {
  const [issuing, setIssuing] = useState(false);
  const [issued, setIssued] = useState(false);

  const handleIssue = async () => {
    setIssuing(true);
    await new Promise(r => setTimeout(r, 2000)); // Simulate API call to Google Wallet
    setIssuing(false);
    setIssued(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-12 animate-in fade-in duration-700">
       <div className="relative group perspective-1000">
          <div className={`minimal-card w-[420px] h-[260px] rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-700 ${issued ? 'border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)]' : 'border-slate-800'}`}>
             <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black z-0"></div>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-0"></div>
             
             {/* Google Wallet Header Stripe */}
             <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 opacity-80"></div>

             <div className="relative z-10 flex justify-between items-start">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-white rounded-xl">
                      <Logo size={24} className="text-black" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">NEOXZ ACCESS</span>
                      <span className="text-[8px] font-mono text-slate-500">ISSUER: 3388000000023071477</span>
                   </div>
                </div>
                <Smartphone className="w-6 h-6 text-slate-600" />
             </div>
             
             <div className="relative z-10 flex items-center justify-between mt-4">
                <div className="space-y-4">
                   <div className="space-y-1">
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Authorized Holder</span>
                      <p className="text-lg font-black text-white uppercase tracking-wider">NEIL RUBIO BALOG</p>
                   </div>
                   <div className="space-y-1">
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Sovereign Tier</span>
                      <p className="text-sm font-black text-emerald-400 uppercase tracking-wider">FOUNDER / OWNER</p>
                   </div>
                </div>
                <div className="p-2 bg-white rounded-lg">
                   <QrCode className="w-16 h-16 text-black" />
                </div>
             </div>

             <div className="relative z-10 pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <ShieldCheck className="w-3 h-3 text-emerald-500" />
                   <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">GOOGLE WALLET VERIFIED</span>
                </div>
                <span className="text-[8px] font-mono text-slate-600">ID: 9850-0045-3180</span>
             </div>
          </div>
       </div>

       <div className="flex flex-col items-center gap-4">
          <button 
            onClick={handleIssue}
            disabled={issuing || issued}
            className={`px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center gap-4 shadow-xl active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed ${
               issued ? 'bg-black border border-emerald-500 text-emerald-500' : 'bg-white text-black hover:bg-slate-200'
            }`}
          >
             {issuing ? <Loader2 className="w-4 h-4 animate-spin" /> : issued ? <Check className="w-4 h-4" /> : <WalletCards className="w-4 h-4" />}
             {issuing ? 'Anchoring to Wallet API...' : issued ? 'Asset Issued to Wallet' : 'Issue to Google Wallet'}
          </button>
          
          {issued && (
             <div className="animate-in fade-in slide-in-from-top-2 duration-500 flex items-center gap-2 text-emerald-500/60">
                <span className="text-[9px] font-mono uppercase">Object ID: 3388000000023071477.SOVEREIGN_PASS_001</span>
             </div>
          )}
       </div>
    </div>
  );
};

export default DigitalAssetIssuer;

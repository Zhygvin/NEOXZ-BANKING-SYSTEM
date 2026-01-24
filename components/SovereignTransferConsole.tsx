
import React, { useState } from 'react';
import { Wallet, ArrowRight, Zap, Landmark, Smartphone, ShieldCheck, Coins, CheckCircle2 } from 'lucide-react';

interface SovereignTransferConsoleProps {
  onStage: (amount: number, platform: string, destination: string, type: string) => void;
  platforms: any[];
  liquidCapital: number;
}

const SovereignTransferConsole: React.FC<SovereignTransferConsoleProps> = ({ onStage, platforms, liquidCapital }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleExecute = () => {
    const num = parseFloat(amount);
    if (!num || !recipient) return;
    onStage(num, 'Wise Production', recipient, 'DISPLACEMENT');
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setAmount('');
      setRecipient('');
    }, 3000);
  };

  return (
    <div className="p-12 rounded-[4rem] bg-gradient-to-br from-slate-900/50 to-black border border-emerald-500/20 shadow-3xl relative overflow-hidden backdrop-blur-3xl group transition-all">
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
        <Coins className="w-64 h-64 text-emerald-500" />
      </div>

      <div className="flex items-center gap-6 mb-12 relative z-10">
        <div className="p-5 rounded-[2rem] bg-emerald-500 text-black shadow-[0_0_40px_rgba(16,185,129,0.3)]">
          <Landmark className="w-10 h-10" />
        </div>
        <div>
          <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Move Capital</h3>
          <p className="text-[11px] text-emerald-500 font-bold uppercase tracking-[0.4em] italic">Direct Displacement Protocol</p>
        </div>
      </div>

      {isSuccess ? (
        <div className="h-64 flex flex-col items-center justify-center gap-6 animate-in zoom-in duration-500 relative z-10">
          <div className="p-8 rounded-full bg-emerald-500 text-black shadow-[0_0_50px_rgba(16,185,129,0.5)]">
            <CheckCircle2 className="w-20 h-20" />
          </div>
          <p className="text-xl font-black text-white uppercase tracking-widest">Mandate Anchored</p>
        </div>
      ) : (
        <div className="space-y-10 relative z-10 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Volume (USD)</label>
              <div className="relative group">
                <input 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-black/60 border-2 border-slate-800 rounded-3xl px-12 py-8 text-5xl font-black text-white mono outline-none focus:border-emerald-500/50 transition-all shadow-inner"
                  placeholder="0.00"
                />
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500 font-black text-2xl">$</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Recipient Identifier</label>
              <div className="relative">
                <input 
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full bg-black/60 border-2 border-slate-800 rounded-3xl px-10 py-8 text-2xl font-black text-white uppercase outline-none focus:border-emerald-500/50 transition-all"
                  placeholder="LEGAL ENTITY / WALLET"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={handleExecute}
            disabled={!amount || !recipient}
            className="w-full py-10 rounded-[3rem] bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.6em] text-sm transition-all shadow-[0_0_60px_rgba(16,185,129,0.3)] active:scale-95 flex items-center justify-center gap-8 disabled:opacity-20"
          >
            <Zap className="w-8 h-8 fill-black" />
            INITIATE QUANTUM DISPLACEMENT
            <ArrowRight className="w-8 h-8" />
          </button>

          <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
             <div className="flex items-center gap-6">
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
                <div className="flex flex-col">
                   <span className="text-xs font-black text-white uppercase">Insulated Rail v3.2</span>
                   <p className="text-[9px] text-slate-500 uppercase font-bold">mTLS Handshake secured via api-mtls.transferwise.com</p>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">SDS Lock Active</span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]"></div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SovereignTransferConsole;

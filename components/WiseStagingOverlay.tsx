
import React, { useState, useEffect } from 'react';
import { 
  Landmark, ArrowRightLeft, Zap, ShieldCheck, 
  Globe, Coins, RefreshCw, Loader2, ArrowRight,
  Navigation, CheckCircle2, TrendingUp, Info
} from 'lucide-react';
import Logo from './Logo';

interface WiseStagingOverlayProps {
  onComplete: (quote: any) => void;
  onCancel: () => void;
  initialAmount?: number;
}

const WiseStagingOverlay: React.FC<WiseStagingOverlayProps> = ({ onComplete, onCancel, initialAmount = 1000000 }) => {
  const [phase, setPhase] = useState<'CONFIG' | 'QUOTING' | 'RESULT'>('CONFIG');
  const [amount, setAmount] = useState(initialAmount.toString());
  const [targetCurrency, setTargetCurrency] = useState('PHP');
  const [quote, setQuote] = useState<any>(null);

  const triggerQuote = async () => {
    setPhase('QUOTING');
    // Simulate Wise API Handshake
    await new Promise(r => setTimeout(r, 2000));
    
    const rate = targetCurrency === 'PHP' ? 56.4215 : targetCurrency === 'GBP' ? 0.7842 : 0.9214;
    const fee = parseFloat(amount) * 0.0042;
    const targetAmount = (parseFloat(amount) - fee) * rate;

    setQuote({
      sourceAmount: parseFloat(amount),
      sourceCurrency: 'USD',
      targetCurrency,
      rate,
      fee,
      targetAmount,
      deliveryEstimate: 'T+0.001ms (Quantum Sync)'
    });
    setPhase('RESULT');
  };

  return (
    <div className="fixed inset-0 z-[9700] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-8 animate-in fade-in duration-500 overflow-y-auto">
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(34,211,238,0.15)_0%,_transparent_70%)]"></div>
        <div className="grid grid-cols-20 h-full opacity-10">
           {Array.from({ length: 40 }).map((_, i) => (
             <div key={i} className="border-r border-cyan-500/20 h-full w-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
           ))}
        </div>
      </div>

      <div className="w-full max-w-4xl bg-[#0a0a0a] border-[4px] border-cyan-500/30 rounded-[4rem] p-16 shadow-[0_0_150px_rgba(34,211,238,0.2)] relative overflow-hidden flex flex-col items-center text-center space-y-12">
        <header className="space-y-6">
          <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-cyan-500 text-black font-black uppercase tracking-[0.5em] text-[10px] shadow-2xl animate-pulse">
            <ArrowRightLeft className="w-4 h-4" />
            Wise API v3.2 Rails
          </div>
          <h2 className="text-6xl font-black uppercase tracking-tighter text-white leading-none">
            STAGE <span className="text-cyan-400 italic">DISBURSEMENT</span>
          </h2>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Master Node Displacement Protocol</p>
        </header>

        {phase === 'CONFIG' && (
          <div className="w-full space-y-10 animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3 text-left">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-4">Source Amount (USD)</label>
                  <div className="relative group">
                     <input 
                       type="number"
                       value={amount}
                       onChange={(e) => setAmount(e.target.value)}
                       className="w-full bg-black border-2 border-slate-800 rounded-3xl px-12 py-6 text-3xl font-black text-white mono outline-none focus:border-cyan-500/50 transition-all shadow-inner"
                     />
                     <span className="absolute left-6 top-1/2 -translate-y-1/2 text-cyan-500 font-black text-xl">$</span>
                  </div>
               </div>
               <div className="space-y-3 text-left">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-4">Target Currency</label>
                  <select 
                    value={targetCurrency}
                    onChange={(e) => setTargetCurrency(e.target.value)}
                    className="w-full bg-black border-2 border-slate-800 rounded-3xl px-12 py-6 text-xl font-black text-white mono outline-none focus:border-cyan-500/50 appearance-none shadow-inner"
                  >
                    <option value="PHP">PHP (Philippines)</option>
                    <option value="GBP">GBP (United Kingdom)</option>
                    <option value="EUR">EUR (Europe)</option>
                  </select>
               </div>
            </div>

            <button 
              onClick={triggerQuote}
              className="w-full py-8 rounded-[2.5rem] bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-[0.5em] text-sm shadow-[0_0_50px_rgba(34,211,238,0.4)] transition-all active:scale-95 flex items-center justify-center gap-6"
            >
              FETCH WISE QUOTE
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {phase === 'QUOTING' && (
          <div className="flex flex-col items-center justify-center space-y-8 py-20 animate-in fade-in duration-500">
             <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-cyan-500/20 flex items-center justify-center">
                   <Loader2 className="w-16 h-16 text-cyan-400 animate-spin" />
                </div>
                <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
             </div>
             <div className="space-y-2">
                <p className="text-xl font-black text-white uppercase tracking-widest animate-pulse">Computing Optimal Route...</p>
                <p className="text-[10px] font-mono text-slate-500 uppercase">Synchronizing with Wise Global Nodes</p>
             </div>
          </div>
        )}

        {phase === 'RESULT' && quote && (
          <div className="w-full space-y-10 animate-in zoom-in-95 duration-500">
             <div className="p-10 rounded-[3.5rem] bg-black border-2 border-cyan-500/30 space-y-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <TrendingUp className="w-32 h-32 text-cyan-400" />
                </div>
                
                <div className="grid grid-cols-2 gap-12 text-left relative z-10">
                   <div className="space-y-1">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Guaranteed Rate</span>
                      <p className="text-4xl font-black text-white mono">1 USD = {quote.rate.toFixed(4)} {quote.targetCurrency}</p>
                   </div>
                   <div className="space-y-1 text-right">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Wise Network Fee</span>
                      <p className="text-4xl font-black text-amber-500 mono">${quote.fee.toLocaleString()}</p>
                   </div>
                </div>

                <div className="h-px bg-slate-800 w-full relative z-10" />

                <div className="flex items-center justify-between relative z-10">
                   <div className="text-left space-y-1">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Recipient Gets</span>
                      <p className="text-5xl font-black text-emerald-400 mono tracking-tighter">
                        {quote.targetAmount.toLocaleString()} {quote.targetCurrency}
                      </p>
                   </div>
                   <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <ShieldCheck className="w-10 h-10" />
                   </div>
                </div>

                <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-between relative z-10">
                   <div className="flex items-center gap-4">
                      <Zap className="w-5 h-5 text-cyan-400" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Estimated Delivery</span>
                   </div>
                   <span className="text-[10px] font-black text-cyan-400 mono uppercase tracking-widest">{quote.deliveryEstimate}</span>
                </div>
             </div>

             <div className="flex gap-6 w-full">
                <button 
                  onClick={() => setPhase('CONFIG')}
                  className="flex-1 py-6 rounded-3xl bg-slate-900 border border-slate-800 text-slate-400 font-black uppercase tracking-[0.4em] text-xs hover:text-white transition-all"
                >
                  Recalibrate Amount
                </button>
                <button 
                  onClick={() => onComplete(quote)}
                  className="flex-[2] py-6 rounded-3xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.4em] text-xs shadow-2xl shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-4"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  ANCHOR & STAGE DISBURSEMENT
                </button>
             </div>
          </div>
        )}

        <footer className="pt-8 border-t border-slate-900 w-full flex items-center justify-between opacity-50">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <Info className="w-4 h-4 text-slate-500" />
                 <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest italic">Wise Sandbox Environment Ready</span>
              </div>
           </div>
           <button onClick={onCancel} className="text-[9px] font-black text-rose-500 hover:text-rose-400 uppercase tracking-widest transition-colors">
             Abort Displacement
           </button>
        </footer>
      </div>
    </div>
  );
};

export default WiseStagingOverlay;

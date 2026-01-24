import React, { useState } from 'react';
import { HandCoins, Scale, Zap, Info, ShieldCheck, CheckCircle2, ArrowUpRight, Activity, Cpu } from 'lucide-react';

interface LoanMandateConsoleProps {
  onAuthorize: (amount: number) => void;
}

const LoanMandateConsole: React.FC<LoanMandateConsoleProps> = ({ onAuthorize }) => {
  const [amount, setAmount] = useState('1000');
  const [hbrv, setHbrv] = useState('Survival / Basic Human Physiological Requirements');
  const [isProcessing, setIsProcessing] = useState(false);
  const [approvedTerms, setApprovedTerms] = useState<any>(null);

  const handleRequest = async () => {
    setIsProcessing(true);
    // Simulate AI Consortium Calculation
    await new Promise(r => setTimeout(r, 2500));
    
    setApprovedTerms({
      repaymentPeriod: "12 Cycles",
      chargeRate: "1.8% (Consortium Subsidy Applied)",
      parityAnchor: "LOCKED",
      HBRV_status: "CRITICAL_NEEDS_MATCHED"
    });
    setIsProcessing(false);
  };

  const handleConfirm = () => {
    onAuthorize(parseFloat(amount));
    setApprovedTerms(null);
    setAmount('');
  };

  return (
    <div className="p-12 rounded-[4rem] bg-gradient-to-br from-slate-900/50 to-black border border-amber-500/20 shadow-3xl relative overflow-hidden backdrop-blur-3xl group transition-all">
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
        <HandCoins className="w-64 h-64 text-amber-500" />
      </div>

      <div className="flex items-center gap-6 mb-12 relative z-10">
        <div className="p-5 rounded-[2rem] bg-amber-500 text-black shadow-[0_0_40px_rgba(245,158,11,0.3)]">
          <HandCoins className="w-10 h-10" />
        </div>
        <div>
          <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Loan Mandate</h3>
          <p className="text-[11px] text-amber-500 font-bold uppercase tracking-[0.4em] italic">HBRV-Based Resource Allocation</p>
        </div>
      </div>

      {approvedTerms ? (
        <div className="space-y-8 animate-in zoom-in duration-500 relative z-10">
          <div className="p-10 rounded-[3rem] bg-black border-2 border-emerald-500/30 space-y-8 shadow-2xl">
             <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Consortium Approved Terms</span>
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
             </div>
             
             <div className="grid grid-cols-2 gap-8 text-left">
                <div className="space-y-1">
                   <span className="text-[9px] font-black text-slate-600 uppercase">Repayment Duration</span>
                   <p className="text-2xl font-black text-white mono">{approvedTerms.repaymentPeriod}</p>
                </div>
                <div className="space-y-1">
                   <span className="text-[9px] font-black text-slate-600 uppercase">Charge Percentage</span>
                   <p className="text-2xl font-black text-amber-400 mono">{approvedTerms.chargeRate}</p>
                </div>
                <div className="space-y-1">
                   <span className="text-[9px] font-black text-slate-600 uppercase">HBRV Profile</span>
                   <p className="text-sm font-black text-emerald-400 mono">{approvedTerms.HBRV_status}</p>
                </div>
                <div className="space-y-1">
                   <span className="text-[9px] font-black text-slate-600 uppercase">Parity Lock</span>
                   <p className="text-sm font-black text-white mono">{approvedTerms.parityAnchor}</p>
                </div>
             </div>

             <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-center">
                <p className="text-[9px] text-slate-500 font-bold uppercase italic">Repayment procedures enforced via automatic SDS displacement.</p>
             </div>
          </div>

          <button 
            onClick={handleConfirm}
            className="w-full py-8 rounded-[3rem] bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.5em] text-sm shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-6"
          >
            Authorize Capital Credit
            <ArrowUpRight className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <div className="space-y-10 relative z-10 animate-in fade-in duration-500">
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Requested Displacement (USD)</label>
              <div className="relative group">
                <input 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-black border-2 border-slate-800 rounded-3xl px-12 py-6 text-3xl font-black text-white mono outline-none focus:border-amber-500/50 transition-all shadow-inner"
                  placeholder="0.00"
                />
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-500 font-black text-xl">$</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">HBRV Requirement Profile (intent)</label>
              <textarea 
                value={hbrv}
                onChange={(e) => setHbrv(e.target.value)}
                className="w-full bg-black border-2 border-slate-800 rounded-3xl px-8 py-6 text-xs font-bold text-slate-300 uppercase outline-none focus:border-amber-500/50 transition-all h-32 resize-none"
              />
            </div>
          </div>

          <button 
            onClick={handleRequest}
            disabled={isProcessing || !amount || !hbrv}
            className="w-full py-8 rounded-[3rem] bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-[0.5em] text-sm transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-6 disabled:opacity-20"
          >
            {isProcessing ? (
              <>
                <Cpu className="w-6 h-6 animate-spin" />
                CONSORTIUM EVALUATING...
              </>
            ) : (
              <>
                <Scale className="w-6 h-6" />
                Submit to Unified Consortium
                <Zap className="w-6 h-6" />
              </>
            )}
          </button>

          <div className="p-6 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/10 flex items-center gap-4">
             <Activity className="w-6 h-6 text-amber-500" />
             <p className="text-[9px] text-slate-500 leading-relaxed font-bold uppercase">
               Charge percentages and repayment cycles are dynamically determined by HARVEY AI and BANK AI to ensure systemic HBRV balance.
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanMandateConsole;
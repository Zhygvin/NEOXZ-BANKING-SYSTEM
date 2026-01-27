import React, { useState, useRef } from 'react';
import { HandCoins, Scale, Zap, Info, ShieldCheck, CheckCircle2, ArrowUpRight, Activity, Cpu, UploadCloud, FileText, AlertTriangle, X } from 'lucide-react';

interface LoanMandateConsoleProps {
  onAuthorize: (amount: number) => void;
}

const LoanMandateConsole: React.FC<LoanMandateConsoleProps> = ({ onAuthorize }) => {
  const [amount, setAmount] = useState('1000');
  const [currency, setCurrency] = useState('USD');
  const [reason, setReason] = useState('Survival / Basic Human Physiological Requirements');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [approvedTerms, setApprovedTerms] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleRequest = async () => {
    setError(null);
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("POSITIVE_ALLOCATION_REQUIRED");
      return;
    }
    if (!reason.trim()) {
      setError("MANDATE_JUSTIFICATION_REQUIRED");
      return;
    }

    setIsProcessing(true);
    setProcessingStage('NEOXZ AI: ANALYZING HBRV...');
    
    // Simulate AI Consortium Calculation
    await new Promise(r => setTimeout(r, 2000));
    setProcessingStage('Q-TEAM: FORENSIC SCAN...');
    
    await new Promise(r => setTimeout(r, 2000));
    setProcessingStage('FOUNDER: REVIEWING AUTHORITY...');
    
    await new Promise(r => setTimeout(r, 1500));
    
    setApprovedTerms({
      repaymentPeriod: "12 Cycles",
      chargeRate: "1.8% (Consortium Subsidy Applied)",
      parityAnchor: "LOCKED",
      HBRV_status: "CRITICAL_NEEDS_MATCHED",
      reviewStatus: "FOUNDER_AUTHORITY_GRANTED"
    });
    setIsProcessing(false);
  };

  const handleConfirm = () => {
    onAuthorize(parseFloat(amount));
    setApprovedTerms(null);
    setAmount('');
    setReason('');
    setAttachment(null);
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
          <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Funding Request</h3>
          <p className="text-[11px] text-amber-500 font-bold uppercase tracking-[0.4em] italic">Resource Allocation Mandate</p>
        </div>
      </div>

      {approvedTerms ? (
        <div className="space-y-8 animate-in zoom-in duration-500 relative z-10">
          <div className="p-10 rounded-[3rem] bg-black border-2 border-emerald-500/30 space-y-8 shadow-2xl">
             <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Founder Authority Granted</span>
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
             </div>
             
             <div className="grid grid-cols-2 gap-8 text-left">
                <div className="space-y-1">
                   <span className="text-[9px] font-black text-slate-600 uppercase">Review Status</span>
                   <p className="text-sm font-black text-emerald-400 mono">{approvedTerms.reviewStatus}</p>
                </div>
                <div className="space-y-1">
                   <span className="text-[9px] font-black text-slate-600 uppercase">Allocation</span>
                   <p className="text-2xl font-black text-white mono">{amount} {currency}</p>
                </div>
                <div className="space-y-1">
                   <span className="text-[9px] font-black text-slate-600 uppercase">HBRV Profile</span>
                   <p className="text-sm font-black text-emerald-400 mono">{approvedTerms.HBRV_status}</p>
                </div>
                <div className="space-y-1">
                   <span className="text-[9px] font-black text-slate-600 uppercase">Charge Rate</span>
                   <p className="text-sm font-black text-amber-400 mono">{approvedTerms.chargeRate}</p>
                </div>
             </div>

             <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-center">
                <p className="text-[9px] text-slate-500 font-bold uppercase italic">Transfer authorized by NEOXZ Founder. Funds released via SDS rails.</p>
             </div>
          </div>

          <button 
            onClick={handleConfirm}
            className="w-full py-8 rounded-[3rem] bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.5em] text-sm shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-6"
          >
            Execute Transfer
            <ArrowUpRight className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <div className="space-y-10 relative z-10 animate-in fade-in duration-500">
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Requested Allocation</label>
              <div className="flex gap-4">
                <div className="relative group flex-1">
                  <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-black border-2 border-slate-800 rounded-3xl px-12 py-6 text-3xl font-black text-white mono outline-none focus:border-amber-500/50 transition-all shadow-inner"
                    placeholder="0.00"
                    min="0"
                  />
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-500 font-black text-xl">$</span>
                </div>
                <div className="relative w-32">
                   <select 
                     value={currency}
                     onChange={(e) => setCurrency(e.target.value)}
                     className="w-full h-full bg-black border-2 border-slate-800 rounded-3xl px-4 text-center text-xl font-black text-white mono outline-none focus:border-amber-500/50 appearance-none"
                   >
                     <option value="USD">USD</option>
                     <option value="PHP">PHP</option>
                     <option value="EUR">EUR</option>
                     <option value="GBP">GBP</option>
                   </select>
                </div>
              </div>
              {error === "POSITIVE_ALLOCATION_REQUIRED" && (
                <div className="flex items-center gap-2 text-rose-500 px-4">
                   <AlertTriangle className="w-3 h-3" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Positive Value Mandatory</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Funding Reason (HBRV Intent)</label>
              <textarea 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Describe the physiological or systemic need for this capital..."
                className="w-full bg-black border-2 border-slate-800 rounded-3xl px-8 py-6 text-xs font-bold text-slate-300 uppercase outline-none focus:border-amber-500/50 transition-all h-32 resize-none"
              />
              {error === "MANDATE_JUSTIFICATION_REQUIRED" && (
                <div className="flex items-center gap-2 text-rose-500 px-4">
                   <AlertTriangle className="w-3 h-3" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Justification Required for Founder Review</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Supporting Documentation (Optional)</label>
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className="w-full bg-black border-2 border-slate-800 border-dashed rounded-3xl p-6 flex items-center justify-center gap-4 cursor-pointer hover:border-amber-500/30 hover:bg-amber-500/5 transition-all group/upload"
               >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                  {attachment ? (
                    <div className="flex items-center gap-3">
                       <FileText className="w-6 h-6 text-emerald-500" />
                       <span className="text-xs font-bold text-white uppercase tracking-wider">{attachment.name}</span>
                       <button 
                         onClick={(e) => { e.stopPropagation(); setAttachment(null); }}
                         className="p-1 hover:bg-slate-800 rounded-full"
                       >
                          <X className="w-4 h-4 text-slate-500" />
                       </button>
                    </div>
                  ) : (
                    <>
                       <UploadCloud className="w-6 h-6 text-slate-600 group-hover/upload:text-amber-500 transition-colors" />
                       <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest group-hover/upload:text-slate-400">Attach Evidence</span>
                    </>
                  )}
               </div>
            </div>
          </div>

          <button 
            onClick={handleRequest}
            disabled={isProcessing}
            className="w-full py-8 rounded-[3rem] bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-[0.5em] text-sm transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-6 disabled:opacity-50 disabled:cursor-wait"
          >
            {isProcessing ? (
              <>
                <Cpu className="w-6 h-6 animate-spin" />
                {processingStage}
              </>
            ) : (
              <>
                <Scale className="w-6 h-6" />
                Submit for Sovereign Review
                <Zap className="w-6 h-6" />
              </>
            )}
          </button>

          <div className="p-6 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/10 flex items-center gap-4">
             <Activity className="w-6 h-6 text-amber-500 shrink-0" />
             <p className="text-[9px] text-slate-500 leading-relaxed font-bold uppercase">
               All requests are subject to rigorous forensic analysis by the Q-TEAM. Final disbursement authority rests solely with the NEOXZ Founder.
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanMandateConsole;
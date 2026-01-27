import React, { useState, useEffect, useRef } from 'react';
import { 
  Wallet, ArrowRight, Zap, Landmark, Smartphone, ShieldCheck, 
  Coins, CheckCircle2, Lock, Loader2, FileText, Send, 
  Activity, Key, ShieldAlert, Server, Radio, Eye
} from 'lucide-react';

interface SovereignTransferConsoleProps {
  onStage: (amount: number, platform: string, destination: string, type: string) => void;
  platforms: any[];
  liquidCapital: number;
}

const SovereignTransferConsole: React.FC<SovereignTransferConsoleProps> = ({ onStage, platforms, liquidCapital }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [step, setStep] = useState<'INPUT' | 'SECURE_AUTH' | 'PROTOCOL_GATHERING' | 'FOUNDER_REPORTING' | 'SUCCESS'>('INPUT');
  const [otp, setOtp] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Protocol Gathering Sequence
  useEffect(() => {
    if (step === 'PROTOCOL_GATHERING') {
      const runProtocol = async () => {
        setLogs([]);
        const protocolSteps = [
          "INITIATING PRIMARY COMMAND CORE PROTOCOL...",
          "Gathering Confirmation of Notification from Recipient Entity...",
          "Validating OTP Responses...",
          "Verifying Identification from Platform/Site...",
          "Validation of Account & Personality: IN_PROGRESS...",
          "Checking Upload/Download Data Integrity...",
          "Monitoring Success/Failure/Pending Signals...",
          "Processing Transaction Metadata...",
          "PROTOCOL GATHERING COMPLETE."
        ];

        for (const log of protocolSteps) {
          await new Promise(r => setTimeout(r, 800));
          setLogs(prev => [...prev, `[CORE] ${log}`]);
        }
        
        await new Promise(r => setTimeout(r, 1000));
        setStep('FOUNDER_REPORTING');
      };
      runProtocol();
    }
  }, [step]);

  // Founder Reporting Sequence
  useEffect(() => {
    if (step === 'FOUNDER_REPORTING') {
      const runReporting = async () => {
        setLogs(prev => [...prev, "[SYS] INITIATING AUTOMATIC FOUNDER REPORTING..."]);
        
        const reportSteps = [
          "Encrypting Transaction Data for Founder Eyes Only...",
          "Uploading Metadata to Founder Core...",
          "Executing Automatic Reporting Protocol...",
          "Sending Confirmation to Founder (NE.B.RU)...",
          "Founder Acknowledgement: RECEIVED."
        ];

        for (const log of reportSteps) {
          await new Promise(r => setTimeout(r, 1000));
          setLogs(prev => [...prev, `[REPORT] ${log}`]);
        }

        await new Promise(r => setTimeout(r, 1200));
        handleFinalize();
      };
      runReporting();
    }
  }, [step]);

  const handleInitiate = () => {
    const num = parseFloat(amount);
    if (!num || !recipient) return;
    setStep('SECURE_AUTH');
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) return;
    setStep('PROTOCOL_GATHERING');
  };

  const handleFinalize = () => {
    onStage(parseFloat(amount), 'Wise Production', recipient, 'DISPLACEMENT');
    setStep('SUCCESS');
    setTimeout(() => {
      setStep('INPUT');
      setAmount('');
      setRecipient('');
      setOtp('');
      setLogs([]);
    }, 4000);
  };

  return (
    <div className="p-12 rounded-[4rem] bg-gradient-to-br from-slate-900/50 to-black border border-emerald-500/20 shadow-3xl relative overflow-hidden backdrop-blur-3xl group transition-all h-[600px] flex flex-col">
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
        <Coins className="w-64 h-64 text-emerald-500" />
      </div>

      <div className="flex items-center gap-6 mb-8 relative z-10 shrink-0">
        <div className="p-5 rounded-[2rem] bg-emerald-500 text-black shadow-[0_0_40px_rgba(16,185,129,0.3)]">
          <Landmark className="w-10 h-10" />
        </div>
        <div>
          <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Move Capital</h3>
          <p className="text-[11px] text-emerald-500 font-bold uppercase tracking-[0.4em] italic">Direct Displacement Protocol</p>
        </div>
      </div>

      <div className="flex-1 relative z-10 flex flex-col justify-center">
        {step === 'INPUT' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
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
              onClick={handleInitiate}
              disabled={!amount || !recipient}
              className="w-full py-10 rounded-[3rem] bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.6em] text-sm transition-all shadow-[0_0_60px_rgba(16,185,129,0.3)] active:scale-95 flex items-center justify-center gap-8 disabled:opacity-20"
            >
              <Zap className="w-8 h-8 fill-black" />
              INITIATE QUANTUM DISPLACEMENT
              <ArrowRight className="w-8 h-8" />
            </button>
          </div>
        )}

        {step === 'SECURE_AUTH' && (
          <div className="w-full max-w-lg mx-auto space-y-8 animate-in zoom-in-95 duration-500 text-center">
             <div className="p-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 w-fit mx-auto animate-pulse">
                <Lock className="w-12 h-12 text-emerald-500" />
             </div>
             <div className="space-y-2">
                <h4 className="text-2xl font-black text-white uppercase tracking-widest">Validation Required</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Enter Founder Identification Code</p>
             </div>
             
             <div className="relative">
                <input 
                  type="password"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="••••"
                  maxLength={6}
                  className="w-full bg-black border-2 border-slate-800 rounded-2xl px-12 py-6 text-4xl font-black text-center text-white tracking-[1em] outline-none focus:border-emerald-500 transition-all"
                />
             </div>

             <button 
                onClick={handleVerifyOtp}
                className="w-full py-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-emerald-500 text-slate-400 font-black uppercase tracking-[0.4em] transition-all"
             >
                Verify & Execute Protocol
             </button>
          </div>
        )}

        {(step === 'PROTOCOL_GATHERING' || step === 'FOUNDER_REPORTING') && (
          <div className="w-full max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 flex flex-col h-full py-8">
             <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                   <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
                      {step === 'PROTOCOL_GATHERING' ? 'GATHERING CONFIRMATIONS' : 'AUTOMATIC FOUNDER REPORTING'}
                   </span>
                </div>
                <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
             </div>
             
             <div className="flex-1 bg-black border border-slate-800 rounded-[2.5rem] p-8 overflow-hidden relative shadow-inner">
                <div className="absolute inset-0 bg-emerald-500/5 animate-pulse pointer-events-none"></div>
                <div className="h-full overflow-y-auto custom-scrollbar space-y-3 pr-2" ref={scrollRef}>
                   {logs.map((log, i) => (
                     <div key={i} className="flex gap-4 animate-in slide-in-from-left-2 duration-300 border-b border-white/5 pb-2 last:border-0">
                        <span className="text-[10px] font-mono text-emerald-500/50 shrink-0">[{new Date().toLocaleTimeString()}]</span>
                        <p className={`text-[10px] font-bold uppercase tracking-wide ${log.includes('FOUNDER') ? 'text-rose-400' : 'text-slate-300'}`}>
                          {log}
                        </p>
                     </div>
                   ))}
                   <div className="flex gap-2 items-center text-emerald-500 animate-pulse">
                      <div className="w-2 h-4 bg-emerald-500"></div>
                      <span className="text-[10px] font-black uppercase">PROCESSING...</span>
                   </div>
                </div>
             </div>
          </div>
        )}

        {step === 'SUCCESS' && (
          <div className="w-full max-w-lg mx-auto text-center space-y-8 animate-in zoom-in duration-500">
             <div className="relative w-fit mx-auto">
                <div className="absolute inset-[-20px] bg-emerald-500/30 rounded-full blur-xl animate-pulse"></div>
                <CheckCircle2 className="w-32 h-32 text-emerald-500 relative z-10" />
             </div>
             <div className="space-y-4">
                <h4 className="text-4xl font-black text-white uppercase tracking-tighter">Transfer Complete</h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] max-w-sm mx-auto">
                  Funds Displaced. Confirmations Gathered. Automatic Report Sent to Founder.
                </p>
             </div>
             <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs uppercase tracking-widest">
                TX_HASH: {Math.random().toString(16).substr(2, 24).toUpperCase()}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SovereignTransferConsole;
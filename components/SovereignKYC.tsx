
import React from 'react';
import { UserCheck, ShieldCheck, Fingerprint, Activity, Radio, Scan, Landmark, CheckCircle2 } from 'lucide-react';

interface SovereignKYCProps {
  status: 'PENDING' | 'VERIFIED' | 'RE-IDENTIFYING';
}

const SovereignKYC: React.FC<SovereignKYCProps> = ({ status }) => {
  return (
    <div className="p-8 rounded-[3rem] bg-black/60 border border-slate-800 shadow-inner space-y-8 relative overflow-hidden flex flex-col group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.03)_0%,_transparent_70%)] pointer-events-none"></div>
      
      <div className="flex items-center justify-between relative z-10 px-2">
        <div className="flex flex-col gap-1">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Institutional Identity</h4>
          <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">KYC / AML MANDATE VERIFICATION</span>
        </div>
        <div className={`p-2 rounded-xl ${status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'} border border-current shadow-lg`}>
          {status === 'VERIFIED' ? <ShieldCheck className="w-5 h-5" /> : <Activity className="w-5 h-5 animate-pulse" />}
        </div>
      </div>

      <div className="relative h-24 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex items-center justify-around px-8">
         <div className="absolute inset-0 opacity-10">
            <Scan className="w-full h-full text-emerald-500" />
         </div>
         
         <div className="flex flex-col items-center gap-2 relative z-10">
            <Fingerprint className={`w-6 h-6 ${status === 'VERIFIED' ? 'text-emerald-400' : 'text-slate-700'}`} />
            <span className="text-[8px] font-black text-slate-500 uppercase">Biometrics</span>
         </div>
         <div className="w-12 h-[1px] bg-slate-800"></div>
         <div className="flex flex-col items-center gap-2 relative z-10">
            <Landmark className={`w-6 h-6 ${status === 'VERIFIED' ? 'text-emerald-400' : 'text-slate-700'}`} />
            <span className="text-[8px] font-black text-slate-500 uppercase">Compliance</span>
         </div>
         <div className="w-12 h-[1px] bg-slate-800"></div>
         <div className="flex flex-col items-center gap-2 relative z-10">
            <UserCheck className={`w-6 h-6 ${status === 'VERIFIED' ? 'text-emerald-400' : 'text-slate-700'}`} />
            <span className="text-[8px] font-black text-slate-500 uppercase">Identity</span>
         </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="p-5 rounded-[1.5rem] bg-slate-900 border border-slate-800 group-hover:border-emerald-500/30 transition-all flex flex-col gap-3">
           <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Verification Status</span>
              <span className={`text-[10px] font-black uppercase ${status === 'VERIFIED' ? 'text-emerald-400' : 'text-amber-500 animate-pulse'}`}>{status}</span>
           </div>
           {status === 'VERIFIED' ? (
             <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <p className="text-[9px] text-slate-400 leading-tight uppercase font-bold">Identity anchored in 1:1 parity with PH Rails.</p>
             </div>
           ) : (
             <div className="flex items-center gap-3">
                <Radio className="w-4 h-4 text-amber-500 animate-pulse" />
                <p className="text-[9px] text-slate-400 leading-tight uppercase font-bold">Synchronizing KYC metadata via Wise Bridge...</p>
             </div>
           )}
        </div>
      </div>

      <div className="pt-2">
         <p className="text-[8px] text-slate-700 font-bold uppercase tracking-tighter text-center leading-relaxed">
           "Onboarding mandated by DSS Article 15. Real-time KYC ensures systemic immunity from capital contamination."
         </p>
      </div>
    </div>
  );
};

export default SovereignKYC;

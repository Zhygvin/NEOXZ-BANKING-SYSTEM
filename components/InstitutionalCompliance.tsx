
import React from 'react';
import { Gavel, FileSignature, ShieldCheck, Landmark, Globe, FileText, CheckCircle2, History, Scale, Building2, Briefcase, Zap, Cpu, Radio, Network, Cloud } from 'lucide-react';
import { InstitutionalCharter } from '../types';

interface InstitutionalComplianceProps {
  charters: InstitutionalCharter[];
  onInitiateAutomation: () => void;
  isProcessing: boolean;
  automationStep?: number;
}

const InstitutionalCompliance: React.FC<InstitutionalComplianceProps> = ({ charters, onInitiateAutomation, isProcessing, automationStep = 0 }) => {
  const progressPercent = (automationStep / 3) * 100;

  return (
    <div className={`bg-slate-900/40 border ${isProcessing ? 'border-blue-400 shadow-[0_0_40px_rgba(66,133,244,0.2)]' : 'border-amber-500/20'} rounded-[3rem] p-10 space-y-10 shadow-3xl relative overflow-hidden backdrop-blur-3xl flex flex-col h-full group transition-all`}>
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Cloud className="w-48 h-48 text-blue-500" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-5 text-amber-400">
          <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
            <Cpu className={`w-8 h-8 ${isProcessing ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white">Neural Authority Handshake</h3>
            <span className="text-[10px] text-amber-500 font-bold tracking-widest uppercase italic">GCP / HARVEY / Q-TEAM Automation</span>
          </div>
        </div>
        <div className={`px-4 py-1.5 rounded-full ${isProcessing ? 'bg-blue-500 animate-pulse shadow-[0_0_15px_rgba(66,133,244,0.5)]' : 'bg-amber-500/10'} border border-amber-500/20 text-[9px] font-black ${isProcessing ? 'text-black' : 'text-amber-400'} uppercase tracking-widest`}>
           {isProcessing ? 'SYNCING IDENTITY...' : 'INHERENT STATUS: ANCHORED'}
        </div>
      </div>

      {/* Neural Handshake Visualizer */}
      <div className="relative space-y-6">
        <div className="relative h-32 bg-black/60 rounded-[2.5rem] border border-slate-800 flex items-center justify-around px-12 overflow-hidden shadow-inner">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(66,133,244,0.05)_0%,_transparent_70%)]"></div>
           
           {[
             { icon: <Cloud className="w-5 h-5" />, label: 'GOOGLE ID', active: automationStep >= 1, color: 'text-blue-400' },
             { icon: <Gavel className="w-5 h-5" />, label: 'HARVEY AI', active: automationStep >= 2, color: 'text-cyan-400' },
             { icon: <Zap className="w-5 h-5" />, label: 'Q-TEAM', active: automationStep >= 3, color: 'text-amber-400' }
           ].map((agent, i) => (
             <div key={i} className="flex flex-col items-center gap-3 relative z-10">
                <div className={`p-4 rounded-2xl transition-all duration-700 ${agent.active ? `${agent.color} bg-white/5 border-2 border-current shadow-[0_0_20px_rgba(66,133,244,0.2)] scale-110` : 'text-slate-700 bg-slate-900 border border-slate-800'}`}>
                  {agent.icon}
                </div>
                <span className={`text-[8px] font-black uppercase tracking-widest transition-colors ${agent.active ? agent.color : 'text-slate-700'}`}>{agent.label}</span>
                {i < 2 && (
                  <div className={`absolute left-full top-1/2 -translate-y-1/2 w-[60px] h-[2px] transition-all duration-1000 ${agent.active ? 'bg-blue-500/50' : 'bg-slate-900'}`}></div>
                )}
             </div>
           ))}
        </div>

        {/* Legitimacy Convergence Meter */}
        <div className="p-6 rounded-[2rem] bg-black/40 border border-slate-800 space-y-3">
           <div className="flex items-center justify-between">
              <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Mandate Convergence</span>
              <span className="text-[10px] text-blue-400 font-black mono">{progressPercent.toFixed(0)}%</span>
           </div>
           <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-amber-300 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(66,133,244,0.5)]"
                style={{ width: `${progressPercent}%` }}
              ></div>
           </div>
        </div>
      </div>

      <div className="flex-1 space-y-8 relative z-10">
        <div className="p-8 rounded-[2.5rem] bg-black/80 border border-slate-900 shadow-inner space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Authority Mesh (Verified Identity)</span>
            <div className="flex items-center gap-3">
              <Cloud className="w-4 h-4 text-blue-500" />
              <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">press.neoxz@gmail.com</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {charters.map((charter, i) => (
              <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/30 transition-all group/charter">
                 <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl ${charter.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-400 shadow-lg' : 'bg-amber-500/10 text-amber-500'}`}>
                       {charter.bodyName.includes('GOOGLE') ? <Cloud className="w-5 h-5" /> : <Landmark className="w-5 h-5" />}
                    </div>
                    <div className="flex flex-col">
                       <span className="text-xs font-black text-white tracking-tight uppercase">{charter.bodyName}</span>
                       <span className="text-[8px] font-mono text-slate-500 uppercase">AUTONOMOUS_ID: {charter.regId}</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                       <span className={`text-[9px] font-black uppercase tracking-widest ${charter.status === 'VERIFIED' ? 'text-emerald-500' : 'text-amber-500 animate-pulse'}`}>
                         {charter.status}
                       </span>
                       <span className="text-[8px] text-slate-600 font-bold uppercase">{charter.complianceLevel}</span>
                    </div>
                    {charter.status === 'VERIFIED' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Zap className="w-4 h-4 text-amber-500 animate-pulse" />}
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 bg-blue-500/5 border border-blue-500/10 rounded-[2.5rem] flex flex-col gap-6 relative overflow-hidden">
         <div className="flex items-center gap-5 relative z-10">
            <Radio className={`w-6 h-6 ${isProcessing ? 'text-blue-500 animate-ping' : 'text-blue-500'}`} />
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
              "GCP Automator: Forging a permanent link between press.neoxz@gmail.com and the Sovereign Mandate. No manual oversight required."
            </p>
         </div>
         <button 
           onClick={onInitiateAutomation}
           disabled={isProcessing}
           className="w-full py-5 rounded-3xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.4em] transition-all shadow-2xl shadow-blue-500/40 active:scale-95 disabled:opacity-50 relative z-10 overflow-hidden flex items-center justify-center gap-4"
         >
           <Zap className={`w-5 h-5 ${isProcessing ? 'animate-bounce' : ''}`} />
           {isProcessing ? 'AUTOMATING HANDSHAKE...' : 'AUTOMATE MANDATE'}
         </button>
      </div>
    </div>
  );
};

export default InstitutionalCompliance;

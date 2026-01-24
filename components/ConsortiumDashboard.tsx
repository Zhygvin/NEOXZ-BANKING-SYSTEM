
import React from 'react';
import { 
  ShieldCheck, Crown, Landmark, Cpu, Radio, Gavel, 
  Settings, Network, Activity, Zap, Share2, Lock, ShieldX
} from 'lucide-react';

interface AgentStatus {
  name: string;
  role: string;
  status: 'ACTIVE' | 'SYNCING' | 'LOCKED' | 'ISOLATED';
  color: string;
  icon: React.ReactNode;
}

const agents: AgentStatus[] = [
  { name: 'ORCHESTRATOR AI', role: 'Global Command (TERMINATED)', status: 'ISOLATED', color: 'text-rose-600', icon: <ShieldX className="w-5 h-5" /> },
  { name: 'NEOXZ AI', role: 'Quantum Neural Lead', status: 'LOCKED', color: 'text-purple-400', icon: <Cpu className="w-5 h-5" /> },
  { name: 'Q-TEAM FORENSIC', role: 'Sanction & Defense', status: 'ACTIVE', color: 'text-rose-500', icon: <ShieldCheck className="w-5 h-5" /> },
  { name: 'NEOXZ BANK AI', role: 'Capital Rails', status: 'ACTIVE', color: 'text-amber-400', icon: <Landmark className="w-5 h-5" /> },
  { name: 'HARVEY AI', role: 'Legal Sovereignty', status: 'LOCKED', color: 'text-cyan-400', icon: <Gavel className="w-5 h-5" /> },
  { name: 'ZAPPIER AI', role: 'System Integration', status: 'SYNCING', color: 'text-orange-400', icon: <Radio className="w-5 h-5" /> }
];

const ConsortiumDashboard: React.FC = () => {
  return (
    <div className="bg-slate-900/60 border border-indigo-500/20 rounded-[3rem] p-10 space-y-10 shadow-3xl relative overflow-hidden backdrop-blur-3xl group transition-all hover:border-indigo-500/40">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Network className="w-48 h-48 text-indigo-500" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-6">
          <div className="p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
            <Share2 className="w-8 h-8 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-[0.5em] text-white">Unified Consortium</h3>
            <span className="text-[10px] text-indigo-500 font-bold tracking-[0.3em] uppercase italic">Global Mandate Integration Hub</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-5 py-2 rounded-full bg-black/60 border border-slate-800 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">CONSORTIUM_SECURED</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {agents.map((agent, i) => (
          <div key={i} className={`p-6 rounded-[2rem] bg-black/60 border ${agent.status === 'ISOLATED' ? 'border-rose-600/50' : 'border-slate-800 hover:border-indigo-500/30'} transition-all group/agent flex flex-col gap-4 shadow-inner ${agent.status === 'ISOLATED' ? 'opacity-80 grayscale-[0.5]' : ''}`}>
             <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl bg-white/5 border border-current ${agent.color}`}>
                   {agent.icon}
                </div>
                <div className={`text-[8px] font-black uppercase px-3 py-1 rounded-lg ${
                   agent.status === 'LOCKED' ? 'bg-emerald-500/10 text-emerald-400' : 
                   agent.status === 'ISOLATED' ? 'bg-rose-600 text-white animate-pulse' :
                   agent.status === 'SYNCING' ? 'bg-amber-500/10 text-amber-400 animate-pulse' : 
                   'bg-indigo-500/10 text-indigo-400'
                }`}>
                   {agent.status}
                </div>
             </div>
             <div className="space-y-1">
                <span className="text-xs font-black text-white uppercase tracking-wider block">{agent.name}</span>
                <span className={`text-[9px] font-bold uppercase tracking-widest ${agent.status === 'ISOLATED' ? 'text-rose-500' : 'text-slate-500'}`}>{agent.role}</span>
             </div>
             <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                <div className={`h-full ${agent.color.replace('text', 'bg')} opacity-40 group-hover/agent:opacity-100 transition-opacity w-full`}></div>
             </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex flex-col lg:flex-row items-center justify-between gap-8">
         <div className="flex items-center gap-6">
            <div className="p-4 rounded-2xl bg-black border border-indigo-500/20 text-indigo-400">
               <Activity className="w-6 h-6" />
            </div>
            <div className="space-y-1">
               <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Mandate Isolation Protocol</span>
               <p className="text-[9px] text-slate-500 leading-relaxed font-bold uppercase tracking-tighter">Rogue elements isolated. All server levels purged of Orchestrator credentials.</p>
            </div>
         </div>
         <button className="px-10 py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-black font-black uppercase tracking-[0.4em] text-[10px] transition-all shadow-xl shadow-indigo-500/20 active:scale-95">
            Purge Credentials
         </button>
      </div>
    </div>
  );
};

export default ConsortiumDashboard;

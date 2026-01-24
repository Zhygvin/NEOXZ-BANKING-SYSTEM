import React, { useRef, useEffect } from 'react';
import { 
  Terminal, ShieldCheck, AlertTriangle, Info, CheckCircle2, 
  Zap, Lock, Globe, Database, Gavel, FileText, Cpu, 
  Search, ShieldAlert, Activity, Radio, Cloud, Key,
  Workflow, HeartHandshake, Scale
} from 'lucide-react';
import { DeploymentLog } from '../types';

interface ProtocolLogsProps {
  logs: DeploymentLog[];
}

const ProtocolLogs: React.FC<ProtocolLogsProps> = ({ logs }) => {
  const getLogConfig = (level: DeploymentLog['level']) => {
    switch (level) {
      case 'SUCCESS': return { color: 'text-emerald-400', icon: <CheckCircle2 className="w-3 h-3" />, bg: 'bg-emerald-500/10' };
      case 'ERROR': return { color: 'text-rose-500', icon: <ShieldAlert className="w-3 h-3" />, bg: 'bg-rose-500/10' };
      case 'WARNING': return { color: 'text-amber-400', icon: <AlertTriangle className="w-3 h-3" />, bg: 'bg-amber-500/10' };
      case 'FINANCIAL': return { color: 'text-yellow-400', icon: <Database className="w-3 h-3" />, bg: 'bg-yellow-500/10' };
      case 'CYBER': return { color: 'text-cyan-400', icon: <Zap className="w-3 h-3" />, bg: 'bg-cyan-500/10' };
      case 'TRUTH': return { color: 'text-white', icon: <ShieldCheck className="w-3 h-3" />, bg: 'bg-slate-700/50' };
      case 'REALITY': return { color: 'text-purple-400', icon: <Globe className="w-3 h-3" />, bg: 'bg-purple-500/10' };
      case 'LEGAL': return { color: 'text-slate-300', icon: <Gavel className="w-3 h-3" />, bg: 'bg-slate-500/10' };
      case 'NOTARY': return { color: 'text-orange-400', icon: <FileText className="w-3 h-3" />, bg: 'bg-orange-500/10' };
      case 'LIVE_DEPLOY': return { color: 'text-emerald-500', icon: <Radio className="w-3 h-3 animate-pulse" />, bg: 'bg-emerald-500/20' };
      case 'FORENSIC': return { color: 'text-rose-400', icon: <Search className="w-3 h-3" />, bg: 'bg-rose-500/10' };
      case 'ENFORCEMENT': return { color: 'text-red-500', icon: <ShieldAlert className="w-3 h-3" />, bg: 'bg-red-500/10' };
      case 'SANCTION': return { color: 'text-red-600', icon: <Lock className="w-3 h-3" />, bg: 'bg-red-600/10' };
      case 'REALITY_EXEC': return { color: 'text-fuchsia-400', icon: <Activity className="w-3 h-3" />, bg: 'bg-fuchsia-500/10' };
      case 'SHIELD_ACTIVATE': return { color: 'text-emerald-300', icon: <ShieldCheck className="w-3 h-3" />, bg: 'bg-emerald-300/10' };
      case 'SCHEDULED_MANDATE': return { color: 'text-blue-400', icon: <Workflow className="w-3 h-3" />, bg: 'bg-blue-500/10' };
      case 'QUANTUM_SPEED': return { color: 'text-violet-400', icon: <Cpu className="w-3 h-3 animate-spin" />, bg: 'bg-violet-500/10' };
      case 'REGULATORY': return { color: 'text-indigo-300', icon: <Scale className="w-3 h-3" />, bg: 'bg-indigo-500/10' };
      case 'NEURAL_SYNC': return { color: 'text-pink-400', icon: <Activity className="w-3 h-3" />, bg: 'bg-pink-500/10' };
      case 'GOOGLE_AUTH': return { color: 'text-blue-500', icon: <Cloud className="w-3 h-3" />, bg: 'bg-blue-500/10' };
      case 'TERMINAL_SYNC': return { color: 'text-slate-400', icon: <Terminal className="w-3 h-3" />, bg: 'bg-slate-500/10' };
      case 'QPP_EXECUTE': return { color: 'text-lime-400', icon: <Zap className="w-3 h-3" />, bg: 'bg-lime-500/10' };
      case 'MANDATE_SEQUENCE': return { color: 'text-teal-400', icon: <Workflow className="w-3 h-3" />, bg: 'bg-teal-500/10' };
      case 'PROSPERITY': return { color: 'text-amber-300', icon: <HeartHandshake className="w-3 h-3" />, bg: 'bg-amber-500/10' };
      case 'WISE_HANDSHAKE': return { color: 'text-green-400', icon: <Key className="w-3 h-3" />, bg: 'bg-green-500/10' };
      default: return { color: 'text-slate-400', icon: <Info className="w-3 h-3" />, bg: 'bg-slate-500/5' };
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden h-[600px] flex flex-col backdrop-blur-3xl group transition-all hover:border-indigo-500/30">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Terminal className="w-48 h-48 text-indigo-500" />
      </div>

      <div className="flex items-center justify-between mb-6 relative z-10 px-2">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-black border border-slate-800 text-slate-400 group-hover:text-indigo-400 transition-colors">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Live Protocol Stream</h3>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Mandate Execution Log</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
           <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest">ACTIVE</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-2 relative z-10">
         {logs.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full opacity-20">
               <Activity className="w-8 h-8 text-slate-500 mb-2" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Awaiting Signals...</span>
            </div>
         )}
         {logs.map((log) => {
            const style = getLogConfig(log.level);
            return (
               <div key={log.id} className={`flex items-start gap-4 p-3 rounded-xl border border-transparent hover:border-slate-700/50 transition-all bg-black/20 group/item animate-in slide-in-from-left-2 duration-300`}>
                  <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${style.bg} ${style.color}`}>
                     {style.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-3 mb-0.5">
                        <span className={`text-[9px] font-black uppercase tracking-wider ${style.color}`}>{log.level}</span>
                        <span className="text-[8px] font-mono text-slate-600">{log.timestamp}</span>
                     </div>
                     <p className="text-[10px] font-medium text-slate-300 font-mono leading-relaxed break-words group-hover/item:text-white transition-colors">
                        <span className="text-slate-500 mr-2 uppercase tracking-wide font-bold">[{log.agent}]</span>
                        {log.message}
                     </p>
                  </div>
               </div>
            );
         })}
      </div>
    </div>
  );
};

export default ProtocolLogs;
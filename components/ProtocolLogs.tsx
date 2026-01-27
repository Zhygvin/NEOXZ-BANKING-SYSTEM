import React from 'react';
import { Terminal, Activity, CheckCircle2, ShieldAlert, AlertTriangle, Info } from 'lucide-react';
import { DeploymentLog } from '../types';

interface ProtocolLogsProps {
  logs: DeploymentLog[];
}

const ProtocolLogs: React.FC<ProtocolLogsProps> = ({ logs }) => {
  const getIcon = (level: string) => {
    switch(level) {
      case 'SUCCESS': return <CheckCircle2 className="w-3 h-3 text-emerald-500" />;
      case 'ERROR': return <ShieldAlert className="w-3 h-3 text-rose-500" />;
      case 'WARNING': return <AlertTriangle className="w-3 h-3 text-amber-500" />;
      default: return <Info className="w-3 h-3 text-slate-500" />;
    }
  };

  return (
    <div className="minimal-card rounded-3xl p-6 h-[400px] flex flex-col">
      <div className="flex items-center gap-3 mb-4 text-slate-500">
        <Terminal className="w-4 h-4" />
        <span className="text-[10px] font-black uppercase tracking-widest">System Log Stream</span>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
         {logs.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full opacity-20">
               <Activity className="w-6 h-6 text-slate-500 mb-2" />
               <span className="text-[9px] font-black uppercase tracking-widest">No Activity</span>
            </div>
         )}
         {logs.map((log) => (
           <div key={log.id} className="flex gap-3 items-start p-2 rounded-lg hover:bg-white/5 transition-colors">
              <div className="mt-0.5">{getIcon(log.level)}</div>
              <div className="flex-1 min-w-0">
                 <div className="flex justify-between items-baseline mb-0.5">
                    <span className="text-[9px] font-black text-slate-300 uppercase">{log.agent}</span>
                    <span className="text-[8px] font-mono text-slate-600">{log.timestamp}</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-medium leading-relaxed truncate">{log.message}</p>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default ProtocolLogs;
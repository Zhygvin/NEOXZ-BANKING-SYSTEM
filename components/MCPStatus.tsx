import React from 'react';
import { Database, RefreshCcw, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { MCPServer } from '../types';

interface MCPStatusProps {
  servers: MCPServer[];
  onReconnect: (serverName: string) => void;
}

const MCPStatus: React.FC<MCPStatusProps> = ({ servers, onReconnect }) => {
  const getStatusConfig = (status: MCPServer['status']) => {
    switch (status) {
      case 'CONNECTED':
        return {
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
          label: 'CONNECTED'
        };
      case 'RECONNECTING':
        return {
          color: 'text-amber-400',
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/20',
          icon: <RefreshCcw className="w-3.5 h-3.5 animate-spin" />,
          label: 'SYNCING'
        };
      case 'ERROR':
        return {
          color: 'text-rose-400',
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/20',
          icon: <AlertCircle className="w-3.5 h-3.5" />,
          label: 'ERROR'
        };
      case 'DISCONNECTED':
      default:
        return {
          color: 'text-slate-500',
          bg: 'bg-slate-500/10',
          border: 'border-slate-500/20',
          icon: <XCircle className="w-3.5 h-3.5" />,
          label: 'OFFLINE'
        };
    }
  };

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-800 text-slate-400">
            <Database className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">MCP Orchestration</span>
        </div>
        <div className="px-2.5 py-1 rounded bg-emerald-500/10 text-[9px] text-emerald-400 font-black border border-emerald-500/20 animate-pulse">MESH ACTIVE</div>
      </div>
      
      <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1">
        {servers.map((server) => {
          const config = getStatusConfig(server.status);
          return (
            <div 
              key={server.name} 
              className="flex flex-col gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-600 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${config.color.replace('text', 'bg')} shadow-lg shadow-current/20`}></div>
                  <span className="text-[11px] font-bold text-slate-200 mono">{server.name}</span>
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded ${config.bg} ${config.border} ${config.color} text-[8px] font-black tracking-widest`}>
                  {config.icon}
                  {config.label}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[8px] text-slate-600 font-black uppercase tracking-widest">Command</span>
                  <code className="text-[9px] text-cyan-500/70 font-mono truncate max-w-[150px]">{server.command} {server.args.join(' ')}</code>
                </div>
                
                {server.status !== 'CONNECTED' && server.status !== 'RECONNECTING' && (
                  <button 
                    onClick={() => onReconnect(server.name)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest border border-slate-700 hover:border-cyan-500/50"
                  >
                    <RefreshCcw className="w-3 h-3" />
                    Reconnect
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MCPStatus;
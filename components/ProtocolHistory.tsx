
import React, { useState } from 'react';
import { 
  History, ChevronDown, ChevronUp, CheckCircle2, AlertCircle, Info, Clock, 
  Cpu, Fingerprint, Activity, Box, Filter, ShieldCheck, Zap, Globe2, 
  Landmark, Download, ExternalLink, FileJson, Share2, Timer, Terminal,
  ScrollText, ScanSearch
} from 'lucide-react';
import { HistoryItem, ExecutionStep, GroundingSource } from '../types';

interface ProtocolHistoryProps {
  history: HistoryItem[];
}

const ProtocolHistory: React.FC<ProtocolHistoryProps> = ({ history }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'MANIFESTED' | 'ERROR' | 'ENFORCED' | 'QUANTUM_SYNCED'>('ALL');

  const filteredHistory = history.filter(item => {
    if (filter === 'ALL') return true;
    return item.status === filter;
  });

  const getStatusColor = (status: ExecutionStep['status']) => {
    switch (status) {
      case 'SUCCESS': return 'text-emerald-400';
      case 'ERROR': return 'text-rose-400';
      case 'WARNING': return 'text-amber-400';
      default: return 'text-cyan-400';
    }
  };

  const getStatusIcon = (status: ExecutionStep['status']) => {
    switch (status) {
      case 'SUCCESS': return <CheckCircle2 className="w-4 h-4" />;
      case 'ERROR': return <AlertCircle className="w-4 h-4" />;
      case 'WARNING': return <AlertCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const exportManifest = (item: HistoryItem) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(item, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `NEOXZ_MANIFEST_${item.id}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="flex flex-col h-full bg-black/60 border border-slate-900 rounded-[4rem] overflow-hidden shadow-3xl backdrop-blur-2xl transition-all hover:border-emerald-500/20">
      <div className="p-12 border-b border-slate-900 bg-black/40 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <History className="w-8 h-8 text-emerald-400" />
          <span className="text-lg font-black uppercase tracking-[0.6em] text-slate-400">Protocol History Ledger</span>
        </div>
        
        <div className="flex items-center gap-4 bg-black/60 p-2 rounded-2xl border border-slate-800">
           <Filter className="w-4 h-4 text-slate-600 ml-2" />
           {(['ALL', 'MANIFESTED', 'ENFORCED', 'QUANTUM_SYNCED', 'ERROR'] as const).map(f => (
             <button
               key={f}
               onClick={() => setFilter(f)}
               className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}
             >
               {f.replace('_', ' ')}
             </button>
           ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
        {filteredHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-8 py-32">
            <Box className="w-24 h-24" />
            <p className="text-xl font-black uppercase tracking-[0.5em]">No History Records</p>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div key={item.id} className={`border ${item.status === 'ERROR' ? 'border-rose-900/50 shadow-[0_0_30px_rgba(244,63,94,0.05)]' : 'border-slate-800'} rounded-[3rem] overflow-hidden bg-slate-950/40 hover:border-emerald-500/30 transition-all group`}>
              <button 
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                className="w-full p-10 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-10">
                  <div className={`p-5 rounded-3xl ${
                    item.status === 'ERROR' ? 'bg-rose-500/10 text-rose-500' : 
                    item.status === 'QUANTUM_SYNCED' ? 'bg-indigo-500/10 text-indigo-400' :
                    'bg-emerald-500/10 text-emerald-500'
                  } shadow-inner`}>
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{item.timestamp}</span>
                      <div className="px-3 py-0.5 rounded-full bg-slate-900 text-slate-500 text-[8px] font-mono border border-slate-800">{item.id}</div>
                    </div>
                    <h4 className="text-lg font-black text-white uppercase tracking-wider">{item.payload.intent || 'Unnamed Mandate'}</h4>
                    <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-slate-600">
                      <Fingerprint className="w-3 h-3" />
                      {item.attribution}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-10">
                  <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    item.status === 'ERROR' ? 'bg-rose-500 text-black' : 
                    item.status === 'QUANTUM_SYNCED' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {item.status.replace('_', ' ')}
                  </div>
                  {expandedId === item.id ? <ChevronUp className="w-6 h-6 text-slate-600" /> : <ChevronDown className="w-6 h-6 text-slate-600 group-hover:text-emerald-400 transition-colors" />}
                </div>
              </button>

              {expandedId === item.id && (
                <div className="px-10 pb-12 pt-6 border-t border-slate-900 bg-black/40 animate-in slide-in-from-top-4 duration-500">
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                    {/* Left Panel: Content & Sources */}
                    <div className="xl:col-span-7 space-y-12">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-3">
                            <Info className="w-4 h-4" />
                            Reality Command Context
                          </h5>
                          <button 
                            onClick={() => exportManifest(item)}
                            className="flex items-center gap-2 text-[9px] font-black uppercase text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/5 px-3 py-1.5 rounded-xl border border-emerald-500/10"
                          >
                            <FileJson className="w-3 h-3" />
                            Export Forensic Manifest
                          </button>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed shadow-inner break-words">
                          {item.payload.dataPayload}
                        </div>
                      </div>

                      {/* NEW: Forensic Log Stream Section */}
                      <div className="space-y-6">
                        <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 flex items-center gap-3">
                          <Terminal className="w-4 h-4" />
                          Raw Forensic Log Stream
                        </h5>
                        <div className="p-8 rounded-[2.5rem] bg-black border border-slate-800 shadow-2xl space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar font-mono">
                          {item.rawLogs ? item.rawLogs.map((log, lIdx) => (
                            <div key={lIdx} className="flex gap-4 group/log border-b border-slate-900/50 pb-2">
                              <span className="text-[10px] text-slate-700 font-bold opacity-40 shrink-0">{(lIdx + 1).toString().padStart(3, '0')}</span>
                              <p className="text-[10px] text-slate-400 group-hover:text-emerald-400 transition-colors">{log}</p>
                            </div>
                          )) : (
                            <div className="p-4 text-center text-[10px] text-slate-600 uppercase italic opacity-30">
                              No raw forensic stream available for this entry.
                            </div>
                          )}
                        </div>
                      </div>

                      {item.groundingSources && item.groundingSources.length > 0 && (
                        <div className="space-y-6">
                          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 flex items-center gap-3">
                            <Globe2 className="w-4 h-4" />
                            Verified Grounding Sources
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {item.groundingSources.map((source, idx) => (
                              <a 
                                key={idx}
                                href={source.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-5 rounded-2xl bg-black/60 border border-slate-800 hover:border-cyan-500/40 transition-all group/source"
                              >
                                <div className="flex flex-col gap-1 truncate pr-4">
                                  <span className="text-[10px] font-black text-slate-200 uppercase truncate">{source.title}</span>
                                  <span className="text-[8px] font-mono text-slate-600 truncate">{source.uri}</span>
                                </div>
                                <ExternalLink className="w-4 h-4 text-slate-700 group-hover/source:text-cyan-400 transition-colors" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.errorMessage && (
                        <div className="p-8 rounded-[2.5rem] bg-rose-500/5 border border-rose-500/20 space-y-4">
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-rose-500 flex items-center gap-3">
                            <AlertCircle className="w-4 h-4" />
                            Systemic Deviation Blocked
                          </h5>
                          <p className="text-xs font-mono text-rose-400/80 leading-relaxed">{item.errorMessage}</p>
                        </div>
                      )}
                    </div>

                    {/* Right Panel: Stepper Timeline */}
                    <div className="xl:col-span-5 space-y-8">
                       <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-3">
                         <Timer className="w-4 h-4" />
                         Execution Telemetry (SDS Replay)
                       </h5>
                       
                       <div className="relative pl-10 space-y-12">
                          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-500 via-slate-800 to-transparent opacity-30"></div>
                          
                          {item.executionSteps.map((step, idx) => (
                            <div key={idx} className="relative group/step">
                               <div className={`absolute -left-10 top-0 w-8 h-8 rounded-xl flex items-center justify-center border-2 bg-black transition-all ${
                                 step.status === 'SUCCESS' ? 'border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' :
                                 step.status === 'ERROR' ? 'border-rose-500 text-rose-400' : 'border-slate-800 text-slate-500'
                               }`}>
                                 {getStatusIcon(step.status)}
                               </div>
                               
                               <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                     <span className="text-[11px] font-black text-white uppercase tracking-wider">{step.label}</span>
                                     <span className="text-[9px] font-mono text-slate-700">{step.timestamp}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 leading-relaxed group-hover/step:text-slate-300 transition-colors">
                                    {step.detail}
                                  </p>
                                  {/* Visual sub-detail indicator */}
                                  <div className="flex items-center gap-2">
                                     <div className={`h-[1px] w-4 ${step.status === 'SUCCESS' ? 'bg-emerald-500/30' : 'bg-slate-800'}`}></div>
                                     <span className="text-[8px] font-black uppercase tracking-widest text-slate-700">SDS_{step.status}</span>
                                  </div>
                               </div>
                            </div>
                          ))}
                       </div>

                       {/* Visual summary of computation */}
                       <div className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 flex flex-col gap-6">
                          <div className="flex items-center gap-4">
                             <ScanSearch className="w-5 h-5 text-slate-600" />
                             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">SDS forensic digest</span>
                          </div>
                          <div className="flex items-center justify-between">
                             <div className="flex flex-col">
                                <span className="text-[9px] text-slate-700 font-black uppercase">Steps Manifested</span>
                                <span className="text-xl font-black text-white">{item.executionSteps.length}</span>
                             </div>
                             <div className="flex flex-col items-end">
                                <span className="text-[9px] text-slate-700 font-black uppercase">Verification</span>
                                <span className="text-xl font-black text-emerald-500 uppercase">ABIDED</span>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProtocolHistory;

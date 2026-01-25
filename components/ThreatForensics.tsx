import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ShieldAlert, Radar, Target, Skull, Lock, Zap, Activity, 
  Fingerprint, Trash2, ShieldCheck, Search, BrainCircuit, 
  Loader2, ListChecks, AlertTriangle, ShieldX, CheckCircle2, 
  RefreshCw, ListFilter, ArrowDownWideNarrow, ArrowUpNarrowWide,
  Terminal, ChevronRight, X
} from 'lucide-react';
import { analyzeThreatMandate } from '../services/geminiService';
import { SystemStatus } from '../types';

interface ForensicFootprint {
  ip: string;
  status: 'PENDING' | 'IDENTIFIED' | 'SCANNING' | 'SANCTIONING' | 'SANCTIONED';
  isExternal?: boolean;
}

interface ThreatForensicsProps {
  onSanctionComplete?: (count: number) => void;
  externalThreats?: string[];
  stats: SystemStatus;
  onSimulateThreat?: (level: 'LOW' | 'ELEVATED' | 'CRITICAL') => void;
}

const ThreatForensics: React.FC<ThreatForensicsProps> = ({ onSanctionComplete, externalThreats = [], stats, onSimulateThreat }) => {
  const [footprints, setFootprints] = useState<ForensicFootprint[]>([]);
  const [isSanctioningAll, setIsSanctioningAll] = useState(false);
  
  // AI Analysis State
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [executedMitigations, setExecutedMitigations] = useState<Set<number>>(new Set());
  
  // Sorting State
  const [sortOrder, setSortOrder] = useState<'DEFAULT' | 'DESC' | 'ASC'>('DEFAULT');

  // Deletion Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  useEffect(() => {
    const IPs = [
      '192.168.0.22 (Intruder Hop 1)',
      '103.21.244.10 (Data Breach Vector)',
      '45.223.1.99 (Theft Execution Node)',
      'Secure Bridge (NEOXZ Blockade)',
      'Attacker Origin (Forensic Locked)',
      'Proxy Node 04 (Incineration Target)',
    ];
    
    let current = 0;
    const interval = setInterval(() => {
      if (current < IPs.length) {
        setFootprints(prev => [...prev, { ip: IPs[current], status: 'IDENTIFIED' }]);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const runAnalysis = useCallback(async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setExecutedMitigations(new Set());
    try {
      const result = await analyzeThreatMandate(stats);
      setAnalysis(result);
    } catch (e) {
      console.error("Forensic Intelligence Failure", e);
    } finally {
      setIsAnalyzing(false);
    }
  }, [stats, isAnalyzing]);

  // Trigger analysis when threatLevel changes
  useEffect(() => {
    runAnalysis();
  }, [stats.threatLevel, runAnalysis]);

  const handleMitigation = (idx: number) => {
    setExecutedMitigations(prev => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  };

  const triggerGlobalSanction = async () => {
    setIsSanctioningAll(true);
    for (let i = 0; i < footprints.length; i++) {
      if (footprints[i].status === 'SANCTIONED') continue;
      setFootprints(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'SANCTIONING' } : f));
      await new Promise(r => setTimeout(r, 400));
      setFootprints(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'SANCTIONED' } : f));
    }
    setIsSanctioningAll(false);
    if (onSanctionComplete) {
      onSanctionComplete(footprints.length);
    }
  };

  const confirmDelete = () => {
    if (deleteTarget !== null) {
      setFootprints(prev => prev.filter((_, i) => i !== deleteTarget));
      setDeleteTarget(null);
    }
  };

  const getThreatColor = (level: string) => {
    switch(level) {
      case 'CRITICAL': return 'text-rose-500 border-rose-500 bg-rose-500/10';
      case 'ELEVATED': return 'text-amber-500 border-amber-500 bg-amber-500/10';
      default: return 'text-emerald-500 border-emerald-500 bg-emerald-500/10';
    }
  };

  const getPriorityWeight = (p: string) => {
    const v = p?.toUpperCase() || '';
    if (v.includes('CRITICAL')) return 4;
    if (v.includes('HIGH') || v.includes('ELEVATED')) return 3;
    if (v.includes('MEDIUM')) return 2;
    if (v.includes('LOW')) return 1;
    return 0;
  };

  const toggleSort = () => {
    setSortOrder(prev => {
      if (prev === 'DEFAULT') return 'DESC';
      if (prev === 'DESC') return 'ASC';
      return 'DEFAULT';
    });
  };

  const sortedChecklist = useMemo(() => {
    if (!analysis?.mitigationChecklist) return [];
    // We map to include original index to handle execution state correctly
    const list = analysis.mitigationChecklist.map((item: any, index: number) => ({ ...item, originalIndex: index }));
    
    if (sortOrder === 'DEFAULT') return list;
    
    return list.sort((a: any, b: any) => {
      const wa = getPriorityWeight(a.priority);
      const wb = getPriorityWeight(b.priority);
      return sortOrder === 'DESC' ? wb - wa : wa - wb;
    });
  }, [analysis, sortOrder]);

  return (
    <div className={`bg-slate-900/80 border ${stats.threatLevel === 'CRITICAL' ? 'border-rose-500 shadow-[0_0_80px_rgba(244,63,94,0.15)]' : 'border-slate-800'} rounded-[3.5rem] p-12 space-y-12 shadow-3xl relative overflow-hidden backdrop-blur-3xl flex flex-col group transition-all duration-1000 animate-in fade-in zoom-in-95`}>
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
        <Skull className="w-64 h-64 text-rose-500" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-6">
          <div className={`p-5 rounded-3xl ${stats.threatLevel === 'CRITICAL' ? 'bg-rose-500 text-black shadow-rose-500/20' : 'bg-indigo-500/10 text-indigo-400'} border border-current shadow-2xl transition-all duration-700`}>
            <Radar className={`w-10 h-10 ${stats.threatLevel !== 'LOW' ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h3 className="text-2xl font-black uppercase tracking-[0.5em] text-white">Q-TEAM THREAT OVERWATCH</h3>
            <div className="flex items-center gap-3 mt-2">
               <span className={`px-4 py-1 rounded-full border-2 text-[10px] font-black uppercase tracking-widest transition-all ${getThreatColor(stats.threatLevel)}`}>
                 MANDATE STATUS: {stats.threatLevel}
               </span>
               <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black text-indigo-400 uppercase tracking-widest">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  Neural Intelligence: Active
               </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-black/60 p-3 rounded-2xl border border-slate-800 shadow-inner">
           <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2 mr-2">Vector Simulator</span>
           <div className="flex gap-2">
              {(['LOW', 'ELEVATED', 'CRITICAL'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => onSimulateThreat?.(level)}
                  className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border ${
                    stats.threatLevel === level 
                      ? 'bg-white text-black border-white shadow-lg' 
                      : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {level}
                </button>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 relative z-10">
        <div className="xl:col-span-7 space-y-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-4 shadow-inner relative overflow-hidden group/box">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/box:opacity-10 transition-opacity">
                    <Activity className="w-20 h-20 text-indigo-500" />
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Calculated Risk Index</span>
                    {analysis ? (
                      <span className={`text-2xl font-black mono ${analysis.riskScore > 70 ? 'text-rose-500' : 'text-emerald-500'}`}>{analysis.riskScore}/100</span>
                    ) : <Loader2 className="w-4 h-4 animate-spin text-slate-700" />}
                 </div>
                 <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${analysis?.riskScore > 70 ? 'bg-rose-500' : 'bg-indigo-500'}`}
                      style={{ width: `${analysis?.riskScore || 0}%` }}
                    ></div>
                 </div>
                 <div className="flex justify-between text-[8px] font-black text-slate-600 uppercase tracking-widest">
                    <span>Probability Density</span>
                    <span>Vector Magnitude</span>
                 </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-4 shadow-inner">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Identified Vectors</span>
                    <span className="text-xl font-black text-white mono">{analysis?.riskVectors?.length || footprints.length}</span>
                 </div>
                 <div className="flex gap-1 flex-wrap">
                    {analysis?.riskVectors ? analysis.riskVectors.map((v: string, i: number) => (
                       <span key={i} className="px-2 py-0.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-[7px] font-black text-rose-400 uppercase tracking-widest">{v}</span>
                    )) : Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className={`h-1.5 w-6 rounded-full ${i < footprints.length ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' : 'bg-slate-900'}`}></div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <div className="flex items-center justify-between px-4">
                 <h5 className="text-[11px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                    <Fingerprint className="w-5 h-5 text-rose-500" />
                    Live Trace Analytics
                 </h5>
                 <button 
                  onClick={triggerGlobalSanction}
                  disabled={isSanctioningAll}
                  className="px-6 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-black font-black uppercase tracking-widest text-[9px] transition-all active:scale-95 disabled:opacity-30 flex items-center gap-2"
                 >
                    <ShieldX className="w-4 h-4" />
                    Global Incineration
                 </button>
              </div>
              <div className="space-y-3 max-h-[360px] overflow-y-auto custom-scrollbar pr-4">
                 {footprints.map((foot, idx) => (
                   <div key={idx} className={`p-6 rounded-[2rem] border transition-all duration-500 flex items-center justify-between bg-black/40 group/foot ${
                     foot.status === 'SANCTIONED' ? 'border-emerald-500/20 opacity-30 grayscale' : 
                     foot.status === 'SANCTIONING' ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)] animate-pulse' :
                     'border-slate-800 hover:border-rose-500/30'
                   }`}>
                      <div className="flex items-center gap-6">
                         <div className={`p-3 rounded-2xl ${foot.status === 'SANCTIONED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-900 text-rose-500'}`}>
                            {foot.status === 'SANCTIONED' ? <CheckCircle2 className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                         </div>
                         <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-100 mono tracking-tight">{foot.ip}</span>
                            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Threat Trace Identified</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <span className={`text-[10px] font-black uppercase tracking-widest ${foot.status === 'SANCTIONED' ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {foot.status}
                         </span>
                         {foot.status !== 'SANCTIONED' && (
                           <button 
                             onClick={() => setDeleteTarget(idx)}
                             className="p-2 rounded-xl bg-slate-900 text-slate-500 hover:bg-rose-500 hover:text-white transition-all border border-slate-800"
                           >
                             <Trash2 className="w-3.5 h-3.5" />
                           </button>
                         )}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="xl:col-span-5 space-y-10">
           <div className={`p-10 rounded-[3.5rem] bg-indigo-500/5 border ${isAnalyzing ? 'border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.2)]' : 'border-indigo-500/20'} h-full flex flex-col relative overflow-hidden group/insight`}>
              <div className="absolute top-0 left-0 p-10 opacity-[0.03] group-hover/insight:opacity-[0.1] transition-opacity">
                 <BrainCircuit className="w-48 h-48 text-indigo-400" />
              </div>

              <div className="flex items-center justify-between mb-10 relative z-10">
                 <div className="flex items-center gap-5">
                    <div className="p-3.5 rounded-2xl bg-indigo-500 text-black shadow-xl">
                       <Zap className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-black uppercase tracking-[0.4em] text-white">AI Neural Briefing</h4>
                 </div>
                 <button onClick={runAnalysis} className="p-3 rounded-xl bg-black border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500 hover:text-black transition-all">
                    <RefreshCw className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                 </button>
              </div>

              {isAnalyzing ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                   <div className="relative">
                      <div className="w-24 h-24 rounded-full border-4 border-indigo-500/20 flex items-center justify-center">
                         <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                      </div>
                      <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
                   </div>
                   <div className="text-center space-y-3">
                      <p className="text-xs font-black uppercase tracking-widest text-white">Compiling Forensic Logic...</p>
                      <p className="text-[9px] font-mono text-indigo-400">ANALYZING 4,117 NODES</p>
                   </div>
                </div>
              ) : analysis ? (
                <div className="flex-1 space-y-8 relative z-10">
                   <div className="space-y-4">
                      <div className="flex items-center gap-3 text-indigo-400">
                         <Terminal className="w-4 h-4" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Q-Team Directive Digest</span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium leading-relaxed bg-black/40 p-6 rounded-3xl border border-slate-800">
                        {analysis.forensicSummary}
                      </p>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center justify-between px-2">
                         <div className="flex items-center gap-3 text-white">
                            <ListChecks className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Forensic Mitigation Checklist</span>
                         </div>
                         
                         {/* SORT BUTTON */}
                         <button 
                           onClick={toggleSort}
                           className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all ${
                             sortOrder !== 'DEFAULT' 
                               ? 'bg-indigo-500 text-black border-indigo-400 shadow-lg shadow-indigo-500/20' 
                               : 'bg-black border-slate-800 text-slate-500 hover:text-indigo-400'
                           }`}
                         >
                           {sortOrder === 'DEFAULT' && <ListFilter className="w-3.5 h-3.5" />}
                           {sortOrder === 'DESC' && <ArrowDownWideNarrow className="w-3.5 h-3.5" />}
                           {sortOrder === 'ASC' && <ArrowUpNarrowWide className="w-3.5 h-3.5" />}
                           {sortOrder === 'DEFAULT' ? 'Sort: Default' : sortOrder === 'DESC' ? 'Sort: Critical' : 'Sort: Lowest'}
                         </button>
                      </div>

                      <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                         {sortedChecklist.map((item: any) => {
                           const isDone = executedMitigations.has(item.originalIndex);
                           return (
                             <button
                               key={item.originalIndex}
                               onClick={() => handleMitigation(item.originalIndex)}
                               disabled={isDone}
                               className={`w-full p-4 rounded-2xl border flex items-start gap-4 text-left transition-all group/item ${
                                 isDone 
                                   ? 'bg-emerald-500/10 border-emerald-500/20 opacity-60' 
                                   : 'bg-black/60 border-slate-800 hover:border-indigo-500/40'
                               }`}
                             >
                                <div className={`p-2 rounded-xl mt-0.5 ${
                                  isDone ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-900 text-slate-500 group-hover/item:text-indigo-400'
                                }`}>
                                   {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                                </div>
                                <div className="flex-1">
                                   <div className="flex items-center justify-between mb-1">
                                      <span className={`text-[10px] font-black uppercase tracking-wide ${isDone ? 'text-emerald-400' : 'text-slate-200'}`}>
                                        {item.title}
                                      </span>
                                      <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                                        item.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400' : 
                                        item.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-400' :
                                        'bg-slate-800 text-slate-500'
                                      }`}>
                                        {item.priority}
                                      </span>
                                   </div>
                                   <p className="text-[9px] text-slate-500 font-medium leading-relaxed group-hover/item:text-slate-400">
                                     {item.action}
                                   </p>
                                </div>
                             </button>
                           );
                         })}
                      </div>
                   </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center opacity-30 space-y-4">
                   <ShieldCheck className="w-16 h-16 text-slate-600" />
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Forensics Offline</span>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {deleteTarget !== null && (
        <div className="fixed inset-0 z-[6000] bg-black/90 backdrop-blur-md flex items-center justify-center p-8 animate-in fade-in duration-200">
           <div className="bg-slate-900 border border-rose-500/30 rounded-[3rem] p-10 max-w-md w-full shadow-[0_0_50px_rgba(244,63,94,0.15)] flex flex-col items-center text-center space-y-6 transform animate-in zoom-in-95">
              <div className="p-6 rounded-full bg-rose-500/10 border border-rose-500/20">
                 <ShieldX className="w-12 h-12 text-rose-500" />
              </div>
              <div className="space-y-2">
                 <h4 className="text-xl font-black text-white uppercase tracking-wider">Confirm Erasure</h4>
                 <p className="text-xs text-slate-400 font-medium">
                   Are you sure you want to scrub this forensic trace? This action removes the node from immediate sanction targeting.
                 </p>
              </div>
              <div className="flex gap-4 w-full pt-4">
                 <button 
                   onClick={() => setDeleteTarget(null)}
                   className="flex-1 py-4 rounded-2xl bg-slate-800 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:bg-slate-700 transition-all"
                 >
                   Cancel
                 </button>
                 <button 
                   onClick={confirmDelete}
                   className="flex-1 py-4 rounded-2xl bg-rose-600 text-white font-black uppercase tracking-widest text-[10px] hover:bg-rose-500 transition-all shadow-lg shadow-rose-500/20"
                 >
                   Confirm Deletion
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ThreatForensics;
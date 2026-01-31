
import React, { useState, useMemo } from 'react';
import { 
  ListFilter, Calendar, AlertCircle, Clock, 
  CheckCircle2, Circle, ArrowUp, ArrowDown,
  Layers, Filter, Plus, LayoutList, GripVertical, X, ShieldAlert, User, Users, FileText, ChevronDown, ChevronUp, Trash2, Flame, ShieldX, Scan, Unlock, Lock
} from 'lucide-react';
import { ProtocolTask } from '../types';

const TEAM_MEMBERS = [
  { id: 'NEOXZ AI', name: 'NEOXZ AI', initials: 'NX', color: 'bg-purple-600 border-purple-400' },
  { id: 'Q-TEAM', name: 'Q-TEAM LEAD', initials: 'QT', color: 'bg-rose-600 border-rose-400' },
  { id: 'HARVEY', name: 'HARVEY LAW', initials: 'HL', color: 'bg-cyan-600 border-cyan-400' },
  { id: 'ZAPPIER', name: 'ZAPPIER OPS', initials: 'ZO', color: 'bg-orange-600 border-orange-400' },
  { id: 'FOUNDER', name: 'FOUNDER', initials: 'NB', color: 'bg-emerald-600 border-emerald-400' },
];

const renderRichText = (text: string) => {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    const content = parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <span key={index} className="font-bold text-white">{part.slice(2, -2)}</span>;
      }
      const subParts = part.split(/(\*.*?\*)/g);
      return subParts.map((sub, subIndex) => {
        if (sub.startsWith('*') && sub.endsWith('*')) {
          return <span key={`${index}-${subIndex}`} className="italic text-emerald-400">{sub.slice(1, -1)}</span>;
        }
        return sub;
      });
    });

    if (line.trim().startsWith('-')) {
      return (
        <div key={i} className="flex gap-2 ml-4 mt-1 mb-1">
          <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
          <span className="text-slate-300">{content}</span>
        </div>
      );
    }
    
    return <div key={i} className="min-h-[1em]">{content}</div>;
  });
};

const ProtocolManager: React.FC = () => {
  const [sortOption, setSortOption] = useState<'DUE_DATE' | 'PRIORITY' | 'CREATION'>('DUE_DATE');
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  const [filterAssignee, setFilterAssignee] = useState<string>('ALL');
  const [isCreating, setIsCreating] = useState(false);
  
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<ProtocolTask['priority']>('STANDARD');
  const [newAssignee, setNewAssignee] = useState<string>('');

  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [isIncinerating, setIsIncinerating] = useState(false);
  const [safetyInterlock, setSafetyInterlock] = useState(false);

  const [tasks, setTasks] = useState<ProtocolTask[]>([
    {
      id: 'PT-1049',
      title: 'Quantum Lattice Stabilization',
      description: '**Objective:** Align sub-atomic coherence across all 4,117 server nodes.\n\n- Verify *superposition* states.\n- Run diagnostic on sector 7.\n- Ensure zero latency drift.',
      priority: 'CRITICAL',
      status: 'IN_PROGRESS',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      tags: ['INFRA', 'QUANTUM'],
      assignee: 'NEOXZ AI'
    },
    {
      id: 'PT-1052',
      title: 'Disburse Batch 7 Liquidity',
      description: 'Execute mandated transfer of **$50M** to humanity cores via Global Rails.\nCheck for:\n- mTLS Compliance\n- Identity Anchoring',
      priority: 'HIGH',
      status: 'PENDING',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      tags: ['FINANCIAL', 'GLOBAL'],
      assignee: 'FOUNDER'
    },
    {
      id: 'PT-1038',
      title: 'Review Forensic Logs',
      description: 'Audit traces from potential intrusion attempts in the SE Asia grid.',
      priority: 'MEDIUM',
      status: 'COMPLETED',
      dueDate: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      tags: ['FORENSIC', 'Q-TEAM'],
      assignee: 'Q-TEAM'
    },
    {
      id: 'PT-1055',
      title: 'Update mTLS Certificates',
      description: 'Renew mutual TLS certificates for **api-mtls.neoxz-core.sh** connection.',
      priority: 'CRITICAL',
      status: 'PENDING',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      tags: ['SECURITY', 'API'],
      assignee: 'ZAPPIER'
    }
  ]);

  const handleCreateTask = () => {
    if (!newTitle.trim()) return;
    const newTask: ProtocolTask = {
      id: `PT-${Math.floor(Math.random() * 9000) + 1000}`,
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      status: 'PENDING',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      createdAt: new Date().toISOString(),
      tags: ['MANUAL_OVERRIDE'],
      assignee: newAssignee || undefined
    };
    setTasks(prev => [newTask, ...prev]);
    setIsCreating(false);
    setNewTitle('');
    setNewDescription('');
    setNewPriority('STANDARD');
    setNewAssignee('');
  };

  const initiateDeletion = (id: string) => {
    setTaskToDelete(id);
    setSafetyInterlock(false);
  };

  const confirmDeleteTask = async () => {
    if (taskToDelete && safetyInterlock) {
      setIsIncinerating(true);
      await new Promise(r => setTimeout(r, 1200)); // Visual "incineration" delay
      setTasks(prev => prev.filter(t => t.id !== taskToDelete));
      setTaskToDelete(null);
      setIsIncinerating(false);
      setSafetyInterlock(false);
    }
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const toggleExpand = (id: string) => {
    setExpandedTaskId(prev => prev === id ? null : id);
  };

  const getPriorityWeight = (p: string) => {
    switch(p) {
      case 'CRITICAL': return 4;
      case 'HIGH': return 3;
      case 'MEDIUM': return 2;
      default: return 1;
    }
  };

  const sortedTasks = useMemo(() => {
    let filtered = [...tasks];
    if (filterAssignee !== 'ALL') {
      filtered = filtered.filter(t => t.assignee === filterAssignee);
    }
    const sorted = filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortOption) {
        case 'DUE_DATE':
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case 'PRIORITY':
          comparison = getPriorityWeight(a.priority) - getPriorityWeight(b.priority);
          break;
        case 'CREATION':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }
      return sortDirection === 'ASC' ? comparison : -comparison;
    });
    return sorted;
  }, [tasks, sortOption, sortDirection, filterAssignee]);

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'ASC' ? 'DESC' : 'ASC');
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'IN_PROGRESS': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'COMPLETED': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'PENDING': return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
      default: return 'text-slate-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'CRITICAL': return 'text-rose-500 border-rose-500/30 bg-rose-500/5';
      case 'HIGH': return 'text-orange-400 border-orange-400/30 bg-orange-400/5';
      case 'MEDIUM': return 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5';
      default: return 'text-slate-400 border-slate-400/30 bg-slate-400/5';
    }
  };

  const getPriorityDot = (priority: string) => {
    switch(priority) {
      case 'CRITICAL': return 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse';
      case 'HIGH': return 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.6)]';
      case 'MEDIUM': return 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]';
      default: return 'bg-slate-600';
    }
  };

  const getAssigneeDetails = (id?: string) => {
    if (!id) return null;
    return TEAM_MEMBERS.find(m => m.id === id);
  };

  const taskToDeleteDetails = tasks.find(t => t.id === taskToDelete);

  return (
    <div className="flex flex-col h-full space-y-8 animate-in fade-in duration-700 relative">
      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between p-8 bg-slate-900/40 border border-slate-800 rounded-[3rem] backdrop-blur-xl gap-6">
        <div className="flex items-center gap-6">
          <div className="p-4 rounded-3xl bg-slate-800 border border-slate-700 text-slate-200 shadow-xl">
            <LayoutList className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-[0.4em] text-white">Active Protocols</h2>
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Task Management Matrix</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 bg-black/40 p-2 rounded-[2rem] border border-slate-800 w-full xl:w-auto">
           <div className="flex gap-2">
              {[
                { id: 'DUE_DATE', label: 'Timeline', icon: Calendar },
                { id: 'PRIORITY', label: 'Severity', icon: AlertCircle },
                { id: 'CREATION', label: 'Inception', icon: Clock }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSortOption(opt.id as any)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    sortOption === opt.id 
                      ? 'bg-slate-800 text-white shadow-lg border border-slate-700' 
                      : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <opt.icon className="w-3.5 h-3.5" />
                  {opt.label}
                </button>
              ))}
           </div>
           
           <div className="w-[1px] h-8 bg-slate-800 mx-1 hidden md:block"></div>
           
           <button 
             onClick={toggleSortDirection}
             className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all hidden md:block"
           >
             {sortDirection === 'ASC' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
           </button>

           <div className="w-[1px] h-8 bg-slate-800 mx-1 hidden md:block"></div>

           <div className="flex gap-1 overflow-x-auto max-w-[300px] custom-scrollbar pb-1 md:pb-0">
              <button 
                onClick={() => setFilterAssignee('ALL')}
                className={`p-2 rounded-full border-2 transition-all ${filterAssignee === 'ALL' ? 'border-white bg-white text-black' : 'border-slate-700 bg-slate-900 text-slate-500'}`}
                title="All Tasks"
              >
                <Users className="w-4 h-4" />
              </button>
              {TEAM_MEMBERS.map(member => (
                <button
                  key={member.id}
                  onClick={() => setFilterAssignee(member.id === filterAssignee ? 'ALL' : member.id)}
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-[9px] font-black transition-all ${
                    member.id === filterAssignee 
                      ? 'border-white scale-110 shadow-lg z-10' 
                      : `border-slate-800 opacity-60 hover:opacity-100 hover:scale-105`
                  } ${member.color}`}
                  title={`Filter by ${member.name}`}
                >
                  {member.initials}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
         <div className="space-y-4">
            {sortedTasks.map((task) => {
              const assignee = getAssigneeDetails(task.assignee);
              const isExpanded = expandedTaskId === task.id;
              
              return (
                <div 
                  key={task.id}
                  className={`group rounded-[2.5rem] border transition-all shadow-inner flex flex-col relative overflow-hidden ${
                    task.status === 'COMPLETED' 
                      ? 'bg-black/40 border-slate-800/50 opacity-60 hover:opacity-100' 
                      : 'bg-black/60 border-slate-800 hover:border-slate-600'
                  }`}
                >
                   {task.priority === 'CRITICAL' && (
                     <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-rose-500"></div>
                   )}
                   
                   <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-6">
                     <div className="flex items-center gap-6 pl-4 flex-1 w-full">
                        <button 
                          onClick={() => toggleTaskStatus(task.id)}
                          className={`p-3 rounded-2xl border ${getStatusColor(task.status)} transition-all cursor-pointer hover:scale-110 active:scale-95 shrink-0`}
                        >
                           {task.status === 'COMPLETED' ? <CheckCircle2 className="w-5 h-5" /> : 
                            task.status === 'IN_PROGRESS' ? <Clock className="w-5 h-5 animate-pulse" /> : 
                            <Circle className="w-5 h-5" />}
                        </button>
                        
                        <div className="flex flex-col gap-1 overflow-hidden cursor-pointer" onClick={() => toggleExpand(task.id)}>
                           <div className="flex items-center gap-3">
                              <div className={`w-1.5 h-1.5 rounded-full ${getPriorityDot(task.priority)} shrink-0`}></div>
                              <h3 className={`text-sm font-black uppercase tracking-wider transition-all duration-300 ${
                                task.status === 'COMPLETED' 
                                  ? 'text-slate-500 line-through decoration-emerald-500/50 decoration-2' 
                                  : 'text-white'
                              }`}>
                                {task.title}
                              </h3>
                           </div>
                           
                           {!isExpanded && task.description && (
                             <p className="text-[10px] text-slate-400 font-medium truncate max-w-xl">
                               {task.description.replace(/\n/g, ' ')}
                             </p>
                           )}

                           <div className="flex items-center gap-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                              <span className="flex items-center gap-1.5">
                                 <span className="text-slate-600">ID:</span> {task.id}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center gap-6 pl-4 md:pl-6 w-full md:w-auto justify-end">
                        <div className="flex gap-2">
                           {task.tags?.map((tag, i) => (
                             <span key={i} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                               {tag}
                             </span>
                           ))}
                        </div>
                        
                        {assignee ? (
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-black border-2 shadow-lg ${assignee.color} text-white`}
                            title={`Assigned to: ${assignee.name}`}
                          >
                            {assignee.initials}
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600" title="Unassigned">
                            <User className="w-4 h-4" />
                          </div>
                        )}

                        <div className={`px-4 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-[0.2em] ${getPriorityColor(task.priority)}`}>
                           {task.priority}
                        </div>
                        
                        <button 
                          onClick={() => toggleExpand(task.id)}
                          className="p-3 rounded-xl bg-transparent hover:bg-slate-900 text-slate-600 hover:text-slate-300 transition-colors"
                        >
                           {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        <button 
                          onClick={() => initiateDeletion(task.id)}
                          className="p-3 rounded-xl bg-transparent hover:bg-slate-900 text-slate-600 hover:text-rose-500 transition-colors"
                          title="Delete Protocol"
                        >
                           <Trash2 className="w-4 h-4" />
                        </button>
                     </div>
                   </div>

                   {isExpanded && (
                     <div className="px-10 pb-8 pt-2 border-t border-slate-800/50 bg-black/20 animate-in slide-in-from-top-2 duration-300">
                        <div className="flex gap-4">
                           <FileText className="w-4 h-4 text-slate-600 mt-1 shrink-0" />
                           <div className="text-xs text-slate-400 font-medium leading-relaxed max-w-4xl whitespace-pre-wrap">
                              {renderRichText(task.description || '')}
                           </div>
                        </div>
                     </div>
                   )}
                </div>
              );
            })}
         </div>
      </div>
      
      {/* Footer / Status */}
      <div className="flex items-center justify-between px-6 opacity-60">
         <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500">
            <Filter className="w-3 h-3" />
            <span>Showing {sortedTasks.length} active protocols</span>
         </div>
         <button 
           onClick={() => setIsCreating(true)}
           className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-all text-[9px] font-black uppercase tracking-widest text-slate-400"
         >
            <Plus className="w-3 h-3" />
            Initialize Protocol
         </button>
      </div>

      {/* Creation Modal */}
      {isCreating && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-12 animate-in fade-in duration-300">
           <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-full">
              <div className="flex items-center justify-between mb-8 shrink-0">
                 <h3 className="text-xl font-black text-white uppercase tracking-wider">Initialize New Protocol</h3>
                 <button onClick={() => setIsCreating(false)} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
                    <X className="w-5 h-5 text-slate-500 hover:text-white" />
                 </button>
              </div>

              <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2 flex-1">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Protocol Directive</label>
                    <input 
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="ENTER PROTOCOL NAME"
                      className="w-full bg-black border-2 border-slate-800 rounded-2xl px-6 py-4 text-white font-bold text-sm outline-none focus:border-emerald-500/50 transition-all"
                      autoFocus
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Details (Rich Text Enabled)</label>
                    <div className="relative">
                      <textarea 
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Enter protocol description...
Use **bold** for emphasis.
Use *italics* for nuance.
- Start lines with dashes for lists."
                        className="w-full bg-black border-2 border-slate-800 rounded-2xl px-6 py-4 text-white font-medium text-xs outline-none focus:border-emerald-500/50 transition-all resize-none h-40 custom-scrollbar leading-relaxed"
                      />
                      <div className="absolute bottom-4 right-6 flex gap-2 text-[9px] font-mono text-slate-600">
                         <span>**bold**</span>
                         <span>*italic*</span>
                         <span>- list</span>
                      </div>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Assigned Agent</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                       {TEAM_MEMBERS.map((member) => (
                         <button
                           key={member.id}
                           onClick={() => setNewAssignee(member.id)}
                           className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                             newAssignee === member.id 
                               ? 'bg-slate-800 border-white text-white' 
                               : 'bg-black border-slate-800 text-slate-500 hover:border-slate-700'
                           }`}
                         >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-black text-white ${member.color}`}>
                               {member.initials}
                            </div>
                            <span className="text-[8px] font-bold uppercase truncate w-full text-center">{member.name}</span>
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Priority Level</label>
                    <div className="grid grid-cols-2 gap-3">
                       {['STANDARD', 'MEDIUM', 'HIGH', 'CRITICAL'].map((p) => (
                         <button
                           key={p}
                           onClick={() => setNewPriority(p as any)}
                           className={`p-4 rounded-xl border-2 transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-between ${
                             newPriority === p 
                               ? 'bg-slate-800 border-white text-white' 
                               : 'bg-black border-slate-800 text-slate-500 hover:border-slate-700'
                           }`}
                         >
                            {p}
                            {p === 'CRITICAL' && <ShieldAlert className="w-3 h-3 text-rose-500" />}
                         </button>
                       ))}
                    </div>
                 </div>

                 <button 
                   onClick={handleCreateTask}
                   disabled={!newTitle}
                   className="w-full py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-xl shadow-emerald-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                 >
                    LAUNCH PROTOCOL
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Delete Confirmation Modal with Safety Interlock */}
      {taskToDelete && (
        <div className="fixed inset-0 z-[6000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-8 animate-in fade-in duration-300">
           {/* Scanline Effect Overlay */}
           <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
              <div className="w-full h-1 bg-rose-500 absolute top-0 animate-[scan-vertical_4s_linear_infinite]"></div>
           </div>
           
           <div className={`bg-[#0a0505] border-2 border-rose-500/40 rounded-[3rem] p-12 max-w-xl w-full shadow-[0_0_100px_rgba(244,63,94,0.15)] flex flex-col items-center text-center space-y-8 transform animate-in zoom-in-95 duration-300 relative overflow-hidden ${isIncinerating ? 'contrast-150 grayscale' : ''}`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent"></div>
              
              <div className={`p-8 rounded-full bg-rose-500/10 border-2 border-rose-500/50 text-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.4)] ${isIncinerating ? 'animate-ping' : safetyInterlock ? 'animate-pulse scale-110 transition-transform duration-500' : ''}`}>
                 {isIncinerating ? <Flame className="w-16 h-16" /> : <ShieldX className="w-16 h-16" />}
              </div>

              <div className="space-y-4 w-full">
                 <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-rose-500 text-black font-black uppercase tracking-[0.4em] text-[10px]">
                    <ShieldAlert className="w-4 h-4" />
                    Protocol Incineration Warning
                 </div>
                 
                 <h4 className="text-3xl font-black text-white uppercase tracking-tighter">Confirm Deletion</h4>
                 
                 <div className="p-6 rounded-2xl bg-black border border-rose-500/20 text-left space-y-4">
                    <div className="flex flex-col gap-1">
                       <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Protocol Identifier</span>
                       <span className="text-lg font-black text-rose-400 mono uppercase tracking-tight">{taskToDeleteDetails?.id}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                       <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Protocol Title</span>
                       <span className="text-sm font-bold text-white uppercase truncate">"{taskToDeleteDetails?.title}"</span>
                    </div>
                 </div>

                 {/* Safety Interlock Switch */}
                 <div className="pt-4 pb-2 w-full flex flex-col items-center gap-4">
                   <div className="flex items-center justify-between w-full px-8 py-4 rounded-2xl bg-white/5 border border-white/10 group cursor-pointer" onClick={() => setSafetyInterlock(!safetyInterlock)}>
                      <div className="flex items-center gap-4">
                        {safetyInterlock ? <Unlock className="w-5 h-5 text-emerald-500" /> : <Lock className="w-5 h-5 text-rose-500" />}
                        <span className={`text-[10px] font-black uppercase tracking-widest ${safetyInterlock ? 'text-emerald-500' : 'text-slate-400'}`}>
                          Safety Interlock {safetyInterlock ? 'Disengaged' : 'Engaged'}
                        </span>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${safetyInterlock ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${safetyInterlock ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                   </div>
                   <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed max-w-md mx-auto">
                     This action will permanently scrub this record from the local ledger. <span className="text-rose-500">Forensic reconstruction is impossible.</span>
                   </p>
                 </div>
              </div>

              <div className="flex gap-6 w-full pt-4 relative z-10">
                 <button 
                   onClick={() => setTaskToDelete(null)}
                   disabled={isIncinerating}
                   className="flex-1 py-6 rounded-[2rem] bg-slate-900 border-2 border-slate-800 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 hover:text-white transition-all disabled:opacity-20"
                 >
                   Abort Request
                 </button>
                 <button 
                   onClick={confirmDeleteTask}
                   disabled={isIncinerating || !safetyInterlock}
                   className={`flex-[2] py-6 rounded-[2rem] border-2 font-black uppercase tracking-[0.4em] text-[11px] transition-all flex items-center justify-center gap-4 group ${
                     safetyInterlock 
                       ? 'bg-rose-600 border-rose-400 text-white shadow-[0_0_50px_rgba(244,63,94,0.4)] active:scale-95' 
                       : 'bg-slate-950 border-slate-800 text-slate-700 opacity-40 cursor-not-allowed'
                   }`}
                 >
                   {isIncinerating ? (
                     <>
                       <Clock className="w-5 h-5 animate-spin" />
                       Incinerating...
                     </>
                   ) : (
                     <>
                       <Trash2 className="w-5 h-5 group-hover:scale-125 transition-transform" />
                       Confirm Erasure
                     </>
                   )}
                 </button>
              </div>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-rose-900 uppercase tracking-widest opacity-40">
                 SDS_ERASURE_PROTO_v16.0
              </div>
           </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan-vertical {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default ProtocolManager;

import React, { useState, useEffect } from 'react';
import { Shield, Key, Terminal, Plus, UserCheck } from 'lucide-react';
import { generateFastResponse } from '../services/geminiService';

const IAMPolicyManager: React.FC = () => {
  const [bindings, setBindings] = useState([
    { role: 'roles/owner', members: ['press.neoxz@gmail.com'] },
    { role: 'roles/editor', members: ['service-account@neoxz'] }
  ]);
  const [log, setLog] = useState('[IAM] Ready.');

  const addBinding = async () => {
    setLog('[IAM] Generating policy...');
    try {
        const res = await generateFastResponse("Generate a success log for adding a random IAM binding.", "IAM Terminal");
        setLog(res);
        setBindings(p => [...p, { role: 'roles/viewer', members: ['new-user@neoxz'] }]);
    } catch(e) {}
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div className="flex items-center justify-between">
          <h2 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">IAM Governance</h2>
          <span className="text-[10px] font-mono text-slate-500">PROJECT: NEOXZ-CORE</span>
       </div>

       <div className="minimal-card rounded-3xl overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
             <div className="flex items-center gap-2 text-slate-400">
                <Shield className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">Active Policies</span>
             </div>
             <button onClick={addBinding} className="p-1 hover:bg-white/10 rounded transition-colors text-emerald-500">
                <Plus className="w-4 h-4" />
             </button>
          </div>
          <div className="p-2">
             {bindings.map((b, i) => (
               <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-bold text-white uppercase">{b.role}</span>
                     <span className="text-[9px] text-slate-500 font-mono">{b.members[0]}</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
               </div>
             ))}
          </div>
       </div>

       <div className="minimal-card p-4 rounded-xl flex items-center gap-3">
          <Terminal className="w-4 h-4 text-slate-500" />
          <span className="text-[10px] font-mono text-emerald-400/80">{log}</span>
       </div>
    </div>
  );
};

export default IAMPolicyManager;
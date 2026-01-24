
import React, { useState } from 'react';
import { UserCheck, Smartphone, Landmark, Shield, ChevronRight, Bookmark, Plus, X, Check, Fingerprint, Hash, Share2, Info } from 'lucide-react';

export interface RecipientTemplate {
  id: string;
  label: string;
  name: string;
  identifier: string;
  routing: string;
  type: 'E-WALLET' | 'INSTITUTIONAL' | 'QUANTUM';
}

const defaultRecipients: RecipientTemplate[] = [];

interface BeneficiaryLedgerProps {
  onSelect: (recipient: RecipientTemplate) => void;
}

const BeneficiaryLedger: React.FC<BeneficiaryLedgerProps> = ({ onSelect }) => {
  const [templates, setTemplates] = useState<RecipientTemplate[]>(defaultRecipients);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newLabel, setNewLabel] = useState('');
  const [newName, setNewName] = useState('');
  const [newId, setNewId] = useState('');
  const [newRouting, setNewRouting] = useState('');
  const [newType, setNewType] = useState<RecipientTemplate['type']>('INSTITUTIONAL');

  const handleAddTemplate = () => {
    if (!newLabel || !newName || !newId || !newRouting) return;
    
    const template: RecipientTemplate = {
      id: `REC-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      label: newLabel.toUpperCase().replace(/\s+/g, '_'),
      name: newName.toUpperCase(),
      identifier: newId,
      routing: newRouting,
      type: newType
    };

    setTemplates(prev => [...prev, template]);
    setIsAdding(false);
    setNewLabel('');
    setNewName('');
    setNewId('');
    setNewRouting('');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'E-WALLET': return <Smartphone className="w-3.5 h-3.5 text-cyan-400" />;
      case 'INSTITUTIONAL': return <Landmark className="w-3.5 h-3.5 text-emerald-400" />;
      case 'QUANTUM': return <Shield className="w-3.5 h-3.5 text-purple-400" />;
      default: return <UserCheck className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <Bookmark className="w-4 h-4 text-emerald-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sovereign Account Registry</span>
        </div>
        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{templates.length} Nodes Registered</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {templates.map((rec) => (
          <button
            key={rec.id}
            onClick={() => onSelect(rec)}
            className="p-4 rounded-2xl bg-black/40 border border-slate-800 hover:border-emerald-500/40 transition-all text-left group flex items-center gap-4 relative overflow-hidden h-20"
          >
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-emerald-500/20">
              {getIcon(rec.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest truncate">{rec.label}</h4>
              <p className="text-[8px] text-slate-600 font-bold uppercase truncate">{rec.name}</p>
            </div>
            <ChevronRight className="w-3 h-3 text-slate-800 group-hover:text-emerald-500 shrink-0" />
          </button>
        ))}

        <button
          onClick={() => setIsAdding(true)}
          className="p-4 rounded-2xl bg-emerald-500/5 border border-dashed border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all text-left group flex items-center justify-center gap-3 h-20"
        >
          <Plus className="w-4 h-4 text-emerald-500 group-hover:scale-125 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Register Recipient</span>
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[1600] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="w-full max-w-xl bg-slate-900 border border-emerald-500/30 rounded-[3rem] p-10 space-y-8 shadow-3xl relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                 <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
                       <Plus className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Add Recipient</h3>
                       <span className="text-[9px] text-emerald-500/60 font-bold uppercase tracking-widest">Identity Anchoring</span>
                    </div>
                 </div>
                 <button onClick={() => setIsAdding(false)} className="p-2 rounded-xl bg-slate-950 text-slate-500 hover:text-white transition-all">
                    <X className="w-5 h-5" />
                 </button>
              </div>

              <div className="space-y-4 relative z-10">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Alias</label>
                       <input 
                         value={newLabel}
                         onChange={(e) => setNewLabel(e.target.value)}
                         placeholder="e.g. SAVINGS_ACC"
                         className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[10px] text-white uppercase outline-none"
                       />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Type</label>
                       <select 
                         value={newType}
                         onChange={(e) => setNewType(e.target.value as any)}
                         className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[10px] text-white outline-none appearance-none"
                       >
                          <option value="INSTITUTIONAL">INSTITUTIONAL</option>
                          <option value="E-WALLET">E-WALLET</option>
                          <option value="QUANTUM">QUANTUM</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Legal Name</label>
                    <input 
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="FULL LEGAL NAME"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[10px] text-white uppercase outline-none"
                    />
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Account Identifier</label>
                    <input 
                      value={newId}
                      onChange={(e) => setNewId(e.target.value)}
                      placeholder="ID / IBAN / WALLET"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[10px] text-white mono outline-none"
                    />
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1">Routing / BIC</label>
                    <input 
                      value={newRouting}
                      onChange={(e) => setNewRouting(e.target.value)}
                      placeholder="SWIFT / NETWORK CODE"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[10px] text-white uppercase outline-none"
                    />
                 </div>
              </div>

              <button 
                onClick={handleAddTemplate}
                disabled={!newLabel || !newName || !newId || !newRouting}
                className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-20"
              >
                 <Check className="w-4 h-4" />
                 ANCHOR RECIPIENT
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default BeneficiaryLedger;

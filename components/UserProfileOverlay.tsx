
import React, { useState, useEffect } from 'react';
import { User, Mail, Globe, Lock, X, ShieldCheck, Fingerprint, Crown, CheckCircle2, FileBadge, Wallet, Save, AlertTriangle } from 'lucide-react';

interface UserProfileOverlayProps {
  initialData: {
    legalName: string;
    email: string;
    region: string;
  };
  onSave: (data: any) => void;
  onClose: () => void;
}

const UserProfileOverlay: React.FC<UserProfileOverlayProps> = ({ initialData, onSave, onClose }) => {
  // STRICTLY ENFORCE NE.B.RU IDENTITY - NO EDITING ALLOWED
  const [formData, setFormData] = useState({
    legalName: "NEIL RUBIO BALOG",
    email: "press.neoxz@gmail.com",
    region: "PHILIPPINES"
  });

  const handleSave = () => {
    // Just close, data is immutable
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[5000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-black border-2 border-amber-500/30 rounded-[3rem] p-10 shadow-[0_0_80px_rgba(245,158,11,0.15)] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Crown className="w-64 h-64 text-amber-500" />
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

        <div className="flex items-center justify-between mb-10 relative z-10">
          <div className="flex items-center gap-5">
            <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 shadow-lg">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-white">Sovereign Identity</h3>
              <div className="flex items-center gap-2 mt-1">
                 <Lock className="w-3 h-3 text-amber-500" />
                 <p className="text-[9px] text-amber-500/80 font-bold uppercase tracking-[0.2em]">Founder Node Locked</p>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-3 rounded-2xl bg-black/40 text-slate-500 hover:text-white transition-all border border-slate-800 hover:border-amber-500/30">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 relative z-10">
          
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3">
             <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
             <p className="text-[9px] text-rose-200 font-bold uppercase tracking-wide leading-tight">
               Identity modifications disabled. This node is strictly tethered to the Founder's physical mandate.
             </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between px-2">
               <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Sole Authorized Identity</label>
               <span className="text-[9px] font-mono text-amber-500 uppercase">IMMUTABLE</span>
            </div>
            <div className="relative group">
              <input 
                value={formData.legalName}
                readOnly
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-12 py-5 text-white font-black text-lg outline-none uppercase tracking-wider cursor-not-allowed"
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-3">Primary Communication Channel</label>
            <div className="relative group">
              <input 
                value={formData.email}
                readOnly
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-12 py-5 text-white font-medium text-sm outline-none cursor-not-allowed"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-3">Jurisdiction</label>
                <div className="relative group">
                  <input 
                    value={formData.region}
                    readOnly
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-12 py-4 text-white font-bold text-xs outline-none uppercase cursor-not-allowed"
                  />
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                </div>
             </div>
             
             <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-3">Merchant Anchor</label>
                <div className="relative group">
                  <input 
                    value="BCR2DN4TU7BMDMDU"
                    readOnly
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-12 py-4 text-emerald-500 font-mono text-[9px] outline-none uppercase cursor-not-allowed"
                  />
                  <FileBadge className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-700" />
                </div>
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-3">Google Wallet Issuer ID</label>
             <div className="relative group">
               <input 
                 value="3388000000023071477"
                 readOnly
                 className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-12 py-4 text-white font-mono text-[10px] outline-none uppercase cursor-not-allowed"
               />
               <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
               <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
             </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={onClose}
              className="w-full py-5 rounded-[2rem] bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-4"
            >
              <X className="w-4 h-4" />
              CLOSE IDENTITY CARD
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-900 flex flex-col items-center justify-center gap-2 opacity-50">
           <div className="flex items-center gap-2">
              <Fingerprint className="w-3 h-3 text-slate-500" />
              <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">SDS_HASH_MUTABLE_USER: FALSE</span>
           </div>
           <p className="text-[8px] text-slate-600 uppercase font-bold tracking-tighter">Founder Access Only</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileOverlay;

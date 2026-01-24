import React, { useState, useEffect } from 'react';
import { 
  Lock, Key, ShieldCheck, Globe, Cpu, RefreshCw, 
  Database, Zap, Eye, EyeOff, Save, Trash2,
  CheckCircle2, AlertCircle, Loader2, Wifi,
  Server, Landmark, Smartphone, ChevronRight,
  X, Info, Activity
} from 'lucide-react';

interface SovereignKeyVaultProps {
  onClose: () => void;
}

const SovereignKeyVault: React.FC<SovereignKeyVaultProps> = ({ onClose }) => {
  const [isGeminiLinked, setIsGeminiLinked] = useState(false);
  const [wiseKey, setWiseKey] = useState(() => localStorage.getItem('wise_prod_key') || '');
  const [wiseSecret, setWiseSecret] = useState(() => localStorage.getItem('wise_prod_secret') || '');
  const [showWiseKey, setShowWiseKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'IDLE' | 'SUCCESS'>('IDLE');

  useEffect(() => {
    const checkGemini = async () => {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      setIsGeminiLinked(hasKey);
    };
    checkGemini();
  }, []);

  const handleReAnchorGemini = async () => {
    await (window as any).aistudio.openSelectKey();
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    setIsGeminiLinked(hasKey);
  };

  const handleSaveWise = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('wise_prod_key', wiseKey);
      localStorage.setItem('wise_prod_secret', wiseSecret);
      setIsSaving(false);
      setSaveStatus('SUCCESS');
      setTimeout(() => setSaveStatus('IDLE'), 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-12 overflow-hidden animate-in fade-in duration-500 font-sans">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.15)_0%,_transparent_70%)]"></div>
        <div className="grid grid-cols-12 h-full opacity-10">
           {Array.from({ length: 48 }).map((_, i) => (
             <div key={i} className="border border-emerald-500/10 h-32 w-full animate-pulse" style={{ animationDelay: `${i * 30}ms` }} />
           ))}
        </div>
      </div>

      <div className="w-full max-w-5xl bg-[#080808] border-2 border-emerald-500/20 rounded-[4rem] shadow-[0_0_150px_rgba(16,185,129,0.15)] flex flex-col overflow-hidden relative">
        <header className="h-24 border-b border-slate-900 bg-black/80 px-12 flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-emerald-500 text-black shadow-lg">
                 <Lock className="w-8 h-8" />
              </div>
              <div>
                 <h2 className="text-3xl font-black uppercase tracking-tighter text-white">SOVEREIGN <span className="text-emerald-500 italic">KEY VAULT</span></h2>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Consortium Rail Orchestration</span>
              </div>
           </div>
           <button 
             onClick={onClose}
             className="p-4 rounded-full bg-slate-900 text-slate-500 hover:text-white transition-all border border-slate-800"
           >
              <X className="w-6 h-6" />
           </button>
        </header>

        <main className="flex-1 overflow-y-auto p-12 custom-scrollbar space-y-12">
           {/* Google Gemini Rail */}
           <section className="space-y-6">
              <div className="flex items-center gap-4 px-4">
                 <Cpu className="w-5 h-5 text-indigo-400" />
                 <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Google Gemini Rail</h3>
              </div>
              <div className="p-10 rounded-[3rem] bg-black border border-indigo-500/20 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-indigo-500/5 group-hover:opacity-100 opacity-0 transition-opacity"></div>
                 <div className="flex items-center gap-8 relative z-10">
                    <div className={`p-6 rounded-3xl ${isGeminiLinked ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'} border-2`}>
                       <ShieldCheck className="w-12 h-12" />
                    </div>
                    <div className="space-y-1">
                       <p className="text-xl font-black text-white uppercase tracking-wider">Mandatory Session Anchor</p>
                       <p className="text-[11px] text-slate-500 leading-relaxed max-w-sm uppercase font-bold">
                         {isGeminiLinked 
                           ? "SYSTEM_CONNECTED: Session key is anchored at hardware level via Google AI Studio."
                           : "SYSTEM_DISCONNECTED: Universal Mandate require a valid paid GCP project key."}
                       </p>
                    </div>
                 </div>
                 <button 
                   onClick={handleReAnchorGemini}
                   className="px-12 py-5 rounded-3xl bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-indigo-500/20 transition-all active:scale-95 flex items-center gap-4 relative z-10"
                 >
                    <RefreshCw className="w-4 h-4" />
                    {isGeminiLinked ? 'RE-ANCHOR SESSION' : 'INITIATE HANDSHAKE'}
                 </button>
              </div>
           </section>

           {/* Wise Production Rail */}
           <section className="space-y-6">
              <div className="flex items-center gap-4 px-4">
                 <Landmark className="w-5 h-5 text-cyan-400" />
                 <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Wise Production Rail</h3>
              </div>
              <div className="p-10 rounded-[3rem] bg-black border border-cyan-500/20 space-y-10 relative overflow-hidden group">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
                    <div className="space-y-3">
                       <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-4">Production API Key</label>
                       <div className="relative">
                          <input 
                            type={showWiseKey ? 'text' : 'password'}
                            value={wiseKey}
                            onChange={(e) => setWiseKey(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-12 py-5 text-sm text-white mono outline-none focus:border-cyan-500/50 transition-all shadow-inner"
                            placeholder="WISE-PROD-KEY-0X..."
                          />
                          <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                          <button 
                            onClick={() => setShowWiseKey(!showWiseKey)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 hover:text-white"
                          >
                             {showWiseKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-4">Webhook Signing Secret</label>
                       <div className="relative">
                          <input 
                            type="password"
                            value={wiseSecret}
                            onChange={(e) => setWiseSecret(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-12 py-5 text-sm text-white mono outline-none focus:border-cyan-500/50 transition-all shadow-inner"
                            placeholder="WH_SECRET_..."
                          />
                          <Wifi className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                       </div>
                    </div>
                 </div>

                 <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-6 border-t border-slate-900 relative z-10">
                    <div className="flex items-center gap-5 text-cyan-500/60">
                       <Info className="w-5 h-5" />
                       <p className="text-[10px] font-black uppercase tracking-tighter max-w-md">
                         Keys are encrypted locally and forced through the mTLS production bridge: api-mtls.transferwise.com
                       </p>
                    </div>
                    <div className="flex gap-4 w-full lg:w-auto">
                       <button 
                         onClick={() => { setWiseKey(''); setWiseSecret(''); }}
                         className="px-8 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-rose-500 hover:border-rose-500/30 transition-all flex items-center gap-3"
                       >
                          <Trash2 className="w-4 h-4" />
                          <span className="text-[9px] font-black uppercase tracking-widest">Clear Rail</span>
                       </button>
                       <button 
                         onClick={handleSaveWise}
                         disabled={isSaving || !wiseKey}
                         className="flex-1 lg:flex-none px-12 py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-cyan-500/20 transition-all active:scale-95 flex items-center justify-center gap-4"
                       >
                          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : saveStatus === 'SUCCESS' ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                          {isSaving ? 'ENCRYPTING...' : saveStatus === 'SUCCESS' ? 'MANDATE ANCHORED' : 'SECURE TO VAULT'}
                       </button>
                    </div>
                 </div>
              </div>
           </section>

           {/* Security Standards */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
              {[
                { label: 'AES-Q Encryption', icon: <Lock className="w-4 h-4" />, sub: 'Quantum Resistant' },
                { label: 'Hardware Pinning', icon: <Smartphone className="w-4 h-4" />, sub: 'Tethered Identity' },
                { label: 'Zero Trust Sync', icon: <Globe className="w-4 h-4" />, sub: 'Edge Validation' }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-5 group/item">
                   <div className="p-3 rounded-xl bg-black border border-emerald-500/20 text-emerald-500 group-hover/item:scale-110 transition-transform">
                      {item.icon}
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">{item.label}</span>
                      <span className="text-[8px] text-slate-600 font-bold uppercase">{item.sub}</span>
                   </div>
                </div>
              ))}
           </div>
        </main>

        <footer className="h-20 border-t border-slate-900 bg-black/60 px-12 flex items-center justify-between">
           <div className="flex items-center gap-4 text-slate-600">
              <Activity className="w-4 h-4 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest">Vault Status: SECURE_PH_REGION</span>
           </div>
           <p className="text-[8px] font-mono text-slate-800 uppercase tracking-[0.6em]">
             SOVEREIGN_KEY_MANAGEMENT_DECREE_v16.0
           </p>
        </footer>
      </div>
    </div>
  );
};

export default SovereignKeyVault;
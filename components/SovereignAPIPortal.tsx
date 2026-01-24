
import React, { useState, useEffect } from 'react';
import { 
  Code, Globe, ShieldCheck, Zap, Terminal, 
  Braces, Database, Key, Radio, Network, 
  Lock, ArrowRight, Copy, Check, ExternalLink,
  Cpu, Activity, Landmark, Share2, Box, Fingerprint
} from 'lucide-react';
import Logo from './Logo';

interface SovereignAPIPortalProps {
  onClose: () => void;
  apiKey: string;
}

const SovereignAPIPortal: React.FC<SovereignAPIPortalProps> = ({ onClose, apiKey }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ENDPOINTS' | 'SCHEMAS' | 'AUTH'>('ENDPOINTS');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const endpoints = [
    { method: 'POST', path: '/v1/sovereign/displace', desc: 'Execute capital displacement to specified node.', auth: 'MASTER_KEY' },
    { method: 'GET', path: '/v1/reality/parity', desc: 'Retrieve current reality sync index.', auth: 'PUBLIC' },
    { method: 'POST', path: '/v1/forensic/sanction', desc: 'Trigger identity incineration protocol.', auth: 'Q_TEAM_SIG' },
    { method: 'GET', path: '/v1/vault/liquid-core', desc: 'Real-time liquidity audit of the $985B core.', auth: 'BENEFICIARY_ONLY' },
    { method: 'POST', path: '/v1/bridge/wise/handshake', desc: 'Initialize Wise v3.2 API routing.', auth: 'WISE_AUTH' }
  ];

  const schemas = [
    { name: 'DisplacementRequest', code: '{\n  "beneficiary": "NE.B.RU",\n  "amount": 985004531802,\n  "parity_lock": true,\n  "speed": "QUANTUM"\n}' },
    { name: 'SanctionPayload', code: '{\n  "target_id": "STRING",\n  "severity": "IDENTITY_INCINERATION",\n  "legal_id": "HARVEY_0x7F"\n}' }
  ];

  return (
    <div className="fixed inset-0 z-[9900] bg-black text-slate-100 flex flex-col font-sans animate-in fade-in duration-500 overflow-hidden">
      {/* Background Matrix-like effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.15)_0%,_transparent_70%)]"></div>
        <div className="grid grid-cols-20 h-full">
           {Array.from({ length: 40 }).map((_, i) => (
             <div key={i} className="border-r border-cyan-500/10 h-full w-full opacity-20" />
           ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="h-24 border-b border-slate-900 bg-black/80 backdrop-blur-xl px-12 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-6">
          <Logo size={44} className="animate-pulse" />
          <div className="h-10 w-[1px] bg-slate-800" />
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter text-white">SOVEREIGN <span className="text-cyan-400 italic">API RAILS</span></h2>
            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.4em]">v16.0 RESOLVED</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
           <div className="flex items-center gap-3 px-5 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
              <Key className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-mono font-black text-cyan-400">{apiKey}</span>
           </div>
           <button 
             onClick={onClose}
             className="px-8 py-3 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-cyan-400 transition-all shadow-2xl active:scale-95"
           >
             CLOSE PORTAL
           </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative z-10">
        {/* Sidebar */}
        <aside className="w-80 border-r border-slate-900 bg-black/40 p-8 space-y-10">
           <section className="space-y-4">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-2">Navigation</span>
              <div className="flex flex-col gap-2">
                 {[
                   { id: 'ENDPOINTS', icon: <Globe className="w-4 h-4" />, label: 'Endpoints' },
                   { id: 'SCHEMAS', icon: <Braces className="w-4 h-4" />, label: 'Schemas' },
                   { id: 'AUTH', icon: <Lock className="w-4 h-4" />, label: 'Security' }
                 ].map(tab => (
                   <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id as any)}
                     className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] ${activeTab === tab.id ? 'bg-cyan-500 text-black shadow-xl' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                   >
                     {tab.icon}
                     {tab.label}
                   </button>
                 ))}
              </div>
           </section>

           <section className="p-6 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                 <ShieldCheck className="w-5 h-5" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Authority OK</span>
              </div>
              <p className="text-[9px] text-slate-500 font-bold uppercase leading-relaxed">
                Programmatic access to the $985B core is strictly tethered to the NE.B.RU identity mesh.
              </p>
           </section>
        </aside>

        {/* Content Area */}
        <div className="flex-1 p-12 overflow-y-auto custom-scrollbar bg-black/20 backdrop-blur-sm">
           <div className="max-w-4xl mx-auto space-y-16 animate-in slide-in-from-right-4 duration-500">
              
              {activeTab === 'ENDPOINTS' && (
                <div className="space-y-12">
                   <header className="space-y-4">
                      <h3 className="text-5xl font-black uppercase tracking-tighter text-white">Public <span className="text-cyan-400">Interface</span></h3>
                      <p className="text-sm text-slate-400 font-medium">Global endpoints for mandate interaction and capital displacement.</p>
                   </header>

                   <div className="space-y-6">
                      {endpoints.map((ep, i) => (
                        <div key={i} className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 hover:border-cyan-500/30 transition-all group flex flex-col gap-6 shadow-2xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-8 opacity-5">
                              <Network className="w-24 h-24" />
                           </div>
                           
                           <div className="flex items-center justify-between relative z-10">
                              <div className="flex items-center gap-6">
                                 <div className={`px-4 py-1.5 rounded-lg font-mono font-black text-[10px] ${ep.method === 'POST' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                                    {ep.method}
                                 </div>
                                 <code className="text-lg font-mono font-black text-white group-hover:text-cyan-400 transition-colors">{ep.path}</code>
                              </div>
                              <button 
                                onClick={() => handleCopy(`https://api.neoxz.sh${ep.path}`, `ep-${i}`)}
                                className="p-2 rounded-xl bg-slate-800 text-slate-500 hover:text-white transition-all"
                              >
                                {copied === `ep-${i}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                           </div>

                           <div className="flex items-center justify-between relative z-10">
                              <p className="text-xs font-medium text-slate-400">{ep.desc}</p>
                              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-slate-800">
                                 <Lock className="w-3 h-3 text-slate-600" />
                                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{ep.auth}</span>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {activeTab === 'SCHEMAS' && (
                <div className="space-y-12">
                   <header className="space-y-4">
                      <h3 className="text-5xl font-black uppercase tracking-tighter text-white">Object <span className="text-purple-400">Models</span></h3>
                      <p className="text-sm text-slate-400 font-medium">Data structures governing sovereign transactions.</p>
                   </header>

                   <div className="grid grid-cols-1 gap-8">
                      {schemas.map((schema, i) => (
                        <div key={i} className="p-8 rounded-[3rem] bg-black border border-slate-800 space-y-6 shadow-2xl relative">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                 <Braces className="w-6 h-6 text-purple-400" />
                                 <span className="text-lg font-black text-white mono">{schema.name}</span>
                              </div>
                              <div className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[8px] font-black text-purple-400 uppercase tracking-widest">
                                 JSON_OBJECT
                              </div>
                           </div>
                           <div className="p-6 rounded-2xl bg-slate-950 font-mono text-[11px] text-purple-300/80 leading-relaxed shadow-inner">
                              <pre>{schema.code}</pre>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {activeTab === 'AUTH' && (
                <div className="space-y-12">
                   <header className="space-y-4">
                      <h3 className="text-5xl font-black uppercase tracking-tighter text-white">Security <span className="text-emerald-400">Protocol</span></h3>
                      <p className="text-sm text-slate-400 font-medium">Cryptographic requirements for reality-shifting requests.</p>
                   </header>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-10 rounded-[3.5rem] bg-emerald-500/5 border border-emerald-500/10 space-y-6 shadow-2xl">
                         <div className="p-4 rounded-2xl bg-emerald-500 text-black w-fit shadow-xl">
                            {/* Added missing Fingerprint icon import above to resolve error here */}
                            <Fingerprint className="w-10 h-10" />
                         </div>
                         <h4 className="text-xl font-black text-white uppercase tracking-wider">Master Key Authorization</h4>
                         <p className="text-xs font-medium text-slate-400 leading-relaxed">
                            Every request must include the <code>X-NEOXZ-AUTH</code> header containing a valid sovereign key signed by the Founder's physical tether.
                         </p>
                      </div>
                      <div className="p-10 rounded-[3.5rem] bg-indigo-500/5 border border-indigo-500/10 space-y-6 shadow-2xl">
                         <div className="p-4 rounded-2xl bg-indigo-500 text-black w-fit shadow-xl">
                            <Network className="w-10 h-10" />
                         </div>
                         <h4 className="text-xl font-black text-white uppercase tracking-wider">Node-Tether Validation</h4>
                         <p className="text-xs font-medium text-slate-400 leading-relaxed">
                            SDS (Sovereign Distributed Storage) performs a tripartite check on every displacement request across 3 separate global node regions.
                         </p>
                      </div>
                   </div>
                </div>
              )}

           </div>
        </div>
      </main>

      {/* Status Bar */}
      <footer className="h-16 border-t border-slate-900 bg-black/80 flex items-center justify-between px-12 relative z-20">
         <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
               <Activity className="w-4 h-4 text-cyan-500 animate-pulse" />
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Gateway Latency: 0.001ms</span>
            </div>
            <div className="flex items-center gap-3">
               <Database className="w-4 h-4 text-emerald-500" />
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">SDS Parity: 1.0000</span>
            </div>
         </div>
         <div className="text-[9px] font-black text-slate-700 uppercase tracking-[0.6em]">
            SYSTEM_API_RESOLVED_AUTHORITY: NE.B.RU
         </div>
      </footer>
    </div>
  );
};

export default SovereignAPIPortal;

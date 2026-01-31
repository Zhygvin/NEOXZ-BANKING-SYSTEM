import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Cloud, ShieldCheck, Activity, 
  Terminal, Server, Globe, Zap, Cpu, 
  Settings, ExternalLink, HardDrive, Network, 
  Fingerprint, FileCode, Loader2, RefreshCw
} from 'lucide-react';

const CloudConsoleDashboard: React.FC = () => {
  const [latency, setLatency] = useState(14);
  const [requests, setRequests] = useState(8420);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => Math.max(8, Math.min(25, prev + (Math.random() > 0.5 ? 1 : -1))));
      setRequests(prev => prev + Math.floor(Math.random() * 10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const triggerHandshake = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="bg-slate-900/40 border border-[#4285F4]/30 rounded-[3rem] p-10 space-y-10 shadow-3xl relative overflow-hidden backdrop-blur-3xl flex flex-col group transition-all hover:border-[#4285F4]/50">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Cloud className="w-48 h-48 text-[#4285F4]" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-5">
          <div className="p-4 rounded-3xl bg-[#4285F4]/10 border border-[#4285F4]/20 text-[#4285F4]">
            <Server className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-[0.4em] text-white">Cloud Sovereignty Core</h3>
            <span className="text-[10px] text-[#4285F4] font-bold tracking-widest uppercase italic">NEOXZ SYSTEMS DEVELOPER CONSOLE</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-5 py-2 rounded-full bg-[#4285F4]/10 border-2 border-[#4285F4]/20 text-[10px] font-black text-white uppercase tracking-widest shadow-xl">
             PROJECT: neoxz-systems-v16
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-6 shadow-inner relative overflow-hidden group/card">
           <div className="absolute top-0 right-0 p-6 opacity-5 group-hover/card:opacity-10 transition-opacity">
              <Fingerprint className="w-20 h-20 text-emerald-500" />
           </div>
           <div className="flex items-center justify-between">
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Merchant Developer Tier</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
           </div>
           <div className="flex flex-col">
              <span className="text-3xl font-black text-white uppercase tracking-tighter">Elite Production</span>
              <span className="text-[9px] text-emerald-500/70 font-bold uppercase mt-1">Status: UNLIMITED_THROUGHPUT_ANCHORED</span>
           </div>
           <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-[8px] font-mono text-slate-600">ID: BCR2DN4TU7BMDMDU</span>
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
                 <span className="text-[8px] font-black text-emerald-500 uppercase">CALIBRATED</span>
              </div>
           </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-6 shadow-inner">
           <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Edge Latency (Global)</span>
              <Activity className="w-4 h-4 text-[#4285F4]" />
           </div>
           <div className="flex flex-col">
              <span className="text-3xl font-black text-white mono">{latency}ms</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase mt-1">Region: GCP-ASIA-SOUTHEAST-PH</span>
           </div>
           <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-full animate-[shimmer_2s_infinite]"></div>
           </div>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
         <div className="flex items-center justify-between">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-3">
               <Terminal className="w-4 h-4" />
               Merchant Rail Health
            </h5>
            <span className="text-[9px] text-[#4285F4] font-black uppercase tracking-widest">{requests.toLocaleString()} Displacements</span>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 flex items-center justify-between group/rail">
               <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover/rail:scale-110 transition-transform">
                     <FileCode className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Wallet API v16.2</span>
               </div>
               <span className="text-[9px] font-mono text-emerald-400">NOMINAL</span>
            </div>
            <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 flex items-center justify-between group/rail">
               <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover/rail:scale-110 transition-transform">
                     <Activity className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Merchant Center Sync</span>
               </div>
               <span className="text-[9px] font-mono text-emerald-400">STABLE</span>
            </div>
         </div>
      </div>

      <div className="p-8 rounded-3xl bg-[#4285F4]/5 border border-[#4285F4]/10 flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="flex items-center gap-6">
            <Network className="w-8 h-8 text-[#4285F4]" />
            <p className="text-[10px] text-slate-400 leading-relaxed font-black uppercase tracking-tighter max-w-sm">
              "Developer identity reviewed. The NEOXZ systems merchant profile is successfully recalibrated for high-velocity systemic abundance."
            </p>
         </div>
         <div className="flex gap-4 w-full md:w-auto">
            <button 
              onClick={triggerHandshake}
              disabled={isSyncing}
              className="flex-1 md:flex-none px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#4285F4]/40 transition-all text-slate-400 hover:text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3"
            >
               {/* Added missing Loader2 and RefreshCw imports above and used here */}
               {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
               Sync Project
            </button>
            <a 
              href="https://console.cloud.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-[#4285F4] text-black hover:bg-blue-400 transition-all shadow-lg"
            >
               <ExternalLink className="w-5 h-5" />
            </a>
         </div>
      </div>
    </div>
  );
};

export default CloudConsoleDashboard;
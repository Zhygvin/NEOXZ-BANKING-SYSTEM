import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Cloud, ShieldCheck, Activity, 
  Terminal, Server, Globe, Zap, Cpu, 
  Settings, ExternalLink, HardDrive, Network
} from 'lucide-react';

const CloudConsoleDashboard: React.FC = () => {
  const [latency, setLatency] = useState(14);
  const [requests, setRequests] = useState(8420);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => Math.max(8, Math.min(25, prev + (Math.random() > 0.5 ? 1 : -1))));
      setRequests(prev => prev + Math.floor(Math.random() * 10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white">Cloud Sovereignty Core</h3>
            <span className="text-[10px] text-[#4285F4] font-bold tracking-widest uppercase italic">GCP PROJECT OVERWATCH</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-3 py-1 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/20 text-[8px] font-black text-[#4285F4] uppercase tracking-widest">
             PROJECT: my-neoxz-project-37871
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Billing Status */}
        <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-4 shadow-inner">
           <div className="flex items-center justify-between">
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Billing Tier</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
           </div>
           <div className="flex flex-col">
              <span className="text-2xl font-black text-white uppercase tracking-tighter">Paid / Production</span>
              <span className="text-[9px] text-emerald-500/70 font-bold uppercase mt-1">Status: UNLIMITED_THROUGHPUT</span>
           </div>
        </div>

        {/* API Telemetry */}
        <div className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-4 shadow-inner">
           <div className="flex items-center justify-between">
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Latency (Avg)</span>
              <Activity className="w-4 h-4 text-[#4285F4]" />
           </div>
           <div className="flex flex-col">
              <span className="text-2xl font-black text-white mono">{latency}ms</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase mt-1">Region: global-edge-ph</span>
           </div>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
         <div className="flex items-center justify-between">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-3">
               <Terminal className="w-4 h-4" />
               Deployment Health
            </h5>
            <span className="text-[9px] text-[#4285F4] font-black uppercase tracking-widest">{requests.toLocaleString()} Requests</span>
         </div>
         
         <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Gemini-3-Pro-Preview</span>
               </div>
               <span className="text-[10px] font-mono text-emerald-400">SYNCED</span>
            </div>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Veo-3.1-Fast-Generate</span>
               </div>
               <span className="text-[10px] font-mono text-emerald-400">SYNCED</span>
            </div>
         </div>
      </div>

      <div className="p-6 rounded-3xl bg-[#4285F4]/5 border border-[#4285F4]/10 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Network className="w-5 h-5 text-[#4285F4]" />
            <p className="text-[9px] text-slate-500 leading-relaxed font-black uppercase tracking-tighter">
              "Deployment logic optimized for Google Developer oversight. Real-time parity confirmed."
            </p>
         </div>
         <a 
          href="https://console.cloud.google.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#4285F4]/40 transition-all text-slate-500 hover:text-[#4285F4]"
         >
            <ExternalLink className="w-4 h-4" />
         </a>
      </div>
    </div>
  );
};

export default CloudConsoleDashboard;
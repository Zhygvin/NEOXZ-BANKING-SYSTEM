import React, { useState, useEffect } from 'react';
import { 
  Globe, ShieldCheck, Activity, RefreshCw, 
  AlertTriangle, CheckCircle2, Loader2, ExternalLink,
  CreditCard, Layout, Server, Wifi
} from 'lucide-react';
import { fetchGooglePayStatus } from '../services/geminiService';
import { GroundingSource } from '../types';

const GooglePayStatusMonitor: React.FC = () => {
  const [data, setData] = useState<{ status: string, services: any[] } | null>(null);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStatus = async () => {
    setRefreshing(true);
    try {
      const result = await fetchGooglePayStatus();
      setData({ status: result.status, services: result.services });
      setSources(result.sources);
    } catch (e) {
      console.error("Status fetch failed", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-slate-900/40 border border-blue-500/20 rounded-[3rem] h-[340px] flex flex-col items-center justify-center gap-4 animate-pulse">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Querying Google Pay Status...</span>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 border border-blue-500/20 rounded-[3rem] p-8 space-y-6 shadow-3xl relative overflow-hidden backdrop-blur-3xl group">
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
        <Globe className="w-48 h-48 text-blue-500" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4 text-blue-400">
          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Google Pay API Status</h3>
            <div className="flex items-center gap-2 mt-0.5">
               <div className={`w-1.5 h-1.5 rounded-full ${data?.status.toLowerCase().includes('available') ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></div>
               <span className="text-[9px] text-blue-400 font-bold tracking-widest uppercase">REAL-TIME GROUNDING</span>
            </div>
          </div>
        </div>
        <button 
          onClick={loadStatus}
          disabled={refreshing}
          className="p-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        <div className="p-6 rounded-[2rem] bg-black/60 border border-slate-800 space-y-3">
           <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global Availability</span>
           <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-black uppercase mono ${data?.status.toLowerCase().includes('available') ? 'text-emerald-400' : 'text-amber-400'}`}>
                {data?.status || 'UNKNOWN'}
              </span>
           </div>
        </div>

        <div className="p-6 rounded-[2rem] bg-black/60 border border-slate-800 space-y-3 flex flex-col justify-center overflow-hidden">
           <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Primary Data Source</span>
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-blue-400 truncate pr-4">developers.google.com/...</span>
              {sources[0] && (
                <a href={sources[0].uri} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              )}
           </div>
        </div>
      </div>

      <div className="space-y-3 relative z-10 max-h-[140px] overflow-y-auto custom-scrollbar pr-2">
        {data?.services.map((service, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/20 transition-all">
             <div className="flex items-center gap-3">
                <Wifi className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-[10px] font-bold text-slate-200 uppercase tracking-tight">{service.name}</span>
             </div>
             <div className="flex items-center gap-3">
                {service.latency && <span className="text-[8px] font-mono text-slate-500">{service.latency}</span>}
                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                   service.status.toLowerCase().includes('available') || service.status.toLowerCase().includes('up') 
                   ? 'bg-emerald-500/10 text-emerald-400' 
                   : 'bg-amber-500/10 text-amber-400'
                }`}>
                   {service.status}
                </span>
             </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">
              Consortium verified link to Google Pay Business Rails.
            </p>
         </div>
      </div>
    </div>
  );
};

export default GooglePayStatusMonitor;
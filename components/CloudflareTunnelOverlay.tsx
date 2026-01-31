
import React, { useState, useEffect, useRef } from 'react';
import { 
  CloudLightning, ShieldCheck, Globe, Server, Activity, 
  Terminal, Lock, ArrowRightLeft, Wifi, X, CheckCircle2 
} from 'lucide-react';
import Logo from './Logo';

interface CloudflareTunnelOverlayProps {
  onClose: () => void;
  onComplete?: () => void;
}

const CloudflareTunnelOverlay: React.FC<CloudflareTunnelOverlayProps> = ({ onClose, onComplete }) => {
  const [status, setStatus] = useState<'DISCONNECTED' | 'HANDSHAKING' | 'CONNECTED'>('DISCONNECTED');
  const [logs, setLogs] = useState<string[]>(['[cloudflared] Version 2025.2.1 (built 2025-02-14)']);
  const [tunnelId, setTunnelId] = useState<string>('');
  const [metrics, setMetrics] = useState({ latency: 0, uptime: 0, requests: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);

  const ingressRules = [
    { hostname: 'api.neoxz.sh', service: 'http://localhost:3000', status: 'HEALTHY' },
    { hostname: 'secure.neoxz.sh', service: 'http://localhost:8080', status: 'HEALTHY' },
    { hostname: 'ssh.neoxz.sh', service: 'ssh://localhost:22', status: 'HEALTHY' }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const startTunnel = async () => {
    setStatus('HANDSHAKING');
    const id = crypto.randomUUID();
    setTunnelId(id);

    const sequence = [
      "Starting tunnel tunnelID=" + id,
      "Cannot determine default configuration path. No file [config.yml] in /etc/cloudflared",
      "Credentials file found at /root/.cloudflared/" + id + ".json",
      "Quic connection experimental=true",
      "Connection 71a8... registered connIndex=0 location=SIN",
      "Connection 71a8... registered connIndex=1 location=HKG",
      "Connection 71a8... registered connIndex=2 location=NRT",
      "Connection 71a8... registered connIndex=3 location=KIX",
      "Tunnel is effectively CONNECTED. Serving Ingress..."
    ];

    for (const log of sequence) {
      await new Promise(r => setTimeout(r, 800));
      setLogs(prev => [...prev, `[INF] ${log}`]);
    }

    setStatus('CONNECTED');
  };

  useEffect(() => {
    let interval: any;
    if (status === 'CONNECTED') {
      interval = setInterval(() => {
        setMetrics(prev => ({
          latency: 12 + Math.random() * 5,
          uptime: prev.uptime + 1,
          requests: prev.requests + Math.floor(Math.random() * 5)
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="fixed inset-0 z-[12000] bg-[#0d0d0d] flex items-center justify-center p-8 animate-in fade-in duration-300 font-sans">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(244,129,32,0.15)_0%,_transparent_70%)]"></div>
        <div className="grid grid-cols-12 h-full opacity-20">
           {Array.from({ length: 48 }).map((_, i) => (
             <div key={i} className="border-r border-orange-500/10 h-full w-full" />
           ))}
        </div>
      </div>

      <div className="w-full max-w-5xl bg-[#111] border border-orange-500/30 rounded-[3rem] shadow-[0_0_100px_rgba(244,129,32,0.15)] flex flex-col overflow-hidden h-[80vh] relative">
        {/* Header */}
        <header className="h-24 border-b border-white/10 bg-[#0a0a0a] px-10 flex items-center justify-between shrink-0">
           <div className="flex items-center gap-6">
              <div className="p-3 rounded-2xl bg-[#F48120] text-black shadow-lg">
                 <CloudLightning className="w-8 h-8" />
              </div>
              <div>
                 <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Cloudflare <span className="text-[#F48120] italic">Tunnel</span></h2>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Zero Trust Edge Integration</span>
              </div>
           </div>
           <button 
             onClick={onClose}
             className="p-3 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
           >
              <X className="w-6 h-6" />
           </button>
        </header>

        <main className="flex-1 flex flex-col lg:flex-row min-h-0">
           {/* Left Control Panel */}
           <div className="w-full lg:w-96 border-r border-white/10 bg-[#0f0f0f] p-8 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tunnel Status</span>
                    {status === 'CONNECTED' && <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />}
                 </div>
                 <div className={`p-6 rounded-3xl border-2 transition-all duration-500 ${
                    status === 'CONNECTED' ? 'bg-emerald-500/10 border-emerald-500/50' : 
                    status === 'HANDSHAKING' ? 'bg-orange-500/10 border-orange-500/50' : 
                    'bg-slate-900 border-slate-800'
                 }`}>
                    <div className="flex flex-col items-center text-center gap-3">
                       <ShieldCheck className={`w-12 h-12 ${
                          status === 'CONNECTED' ? 'text-emerald-500' : 
                          status === 'HANDSHAKING' ? 'text-orange-500 animate-pulse' : 
                          'text-slate-600'
                       }`} />
                       <span className={`text-xl font-black uppercase tracking-widest ${
                          status === 'CONNECTED' ? 'text-white' : 'text-slate-500'
                       }`}>
                          {status}
                       </span>
                    </div>
                 </div>
              </div>

              {status === 'DISCONNECTED' ? (
                 <button 
                   onClick={startTunnel}
                   className="w-full py-5 rounded-2xl bg-[#F48120] hover:bg-orange-500 text-black font-black uppercase tracking-[0.2em] text-[10px] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                 >
                    <Wifi className="w-4 h-4" />
                    Initialize Daemon
                 </button>
              ) : (
                 <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="p-5 rounded-2xl bg-black border border-white/10 space-y-3">
                       <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                          <Globe className="w-4 h-4 text-[#F48120]" />
                          <span className="text-[10px] font-bold text-white uppercase">Edge Metrics</span>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col">
                             <span className="text-[8px] text-slate-500 uppercase">Avg Latency</span>
                             <span className="text-lg font-mono text-emerald-400">{metrics.latency.toFixed(1)}ms</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[8px] text-slate-500 uppercase">Requests</span>
                             <span className="text-lg font-mono text-white">{metrics.requests}</span>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-2">Assigned Tunnel ID</span>
                       <div className="p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-[9px] text-orange-300 break-all">
                          {tunnelId}
                       </div>
                    </div>

                    {status === 'CONNECTED' && onComplete && (
                      <button 
                        onClick={onComplete}
                        className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Confirm Secure Channel
                      </button>
                    )}
                 </div>
              )}
           </div>

           {/* Right Content */}
           <div className="flex-1 flex flex-col min-h-0 bg-[#050505]">
              {/* Ingress Map */}
              <div className="flex-1 p-8 border-b border-white/10 overflow-y-auto custom-scrollbar">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Ingress Routing Table</h3>
                    <span className="text-[9px] font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">CONFIG.YML</span>
                 </div>
                 
                 <div className="space-y-3">
                    {ingressRules.map((rule, i) => (
                       <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-orange-500/30 transition-all group">
                          <div className="flex items-center gap-6">
                             <div className="flex flex-col text-right w-32">
                                <span className="text-xs font-bold text-white">{rule.hostname}</span>
                                <span className="text-[8px] text-slate-500 font-mono uppercase">Public Host</span>
                             </div>
                             <ArrowRightLeft className="w-4 h-4 text-slate-600 group-hover:text-[#F48120] transition-colors" />
                             <div className="flex flex-col">
                                <span className="text-xs font-bold text-white">{rule.service}</span>
                                <span className="text-[8px] text-slate-500 font-mono uppercase">Local Service</span>
                             </div>
                          </div>
                          {status === 'CONNECTED' ? (
                             <div className="flex items-center gap-2 text-emerald-500">
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="text-[9px] font-black uppercase">Live</span>
                             </div>
                          ) : (
                             <div className="flex items-center gap-2 text-slate-600">
                                <Lock className="w-4 h-4" />
                                <span className="text-[9px] font-black uppercase">Offline</span>
                             </div>
                          )}
                       </div>
                    ))}
                 </div>
              </div>

              {/* Terminal Logs */}
              <div className="h-64 bg-black p-6 font-mono text-[10px] overflow-hidden flex flex-col">
                 <div className="flex items-center gap-2 text-slate-500 mb-2 uppercase tracking-widest">
                    <Terminal className="w-3 h-3" />
                    <span>cloudflared.log</span>
                 </div>
                 <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
                    {logs.map((log, i) => (
                       <div key={i} className="flex gap-3 text-slate-400 border-l-2 border-transparent hover:border-[#F48120] hover:bg-white/5 pl-2 transition-all">
                          <span className="text-slate-600 shrink-0">{new Date().toISOString().split('T')[1].split('.')[0]}</span>
                          <span className={log.includes('connected') ? 'text-emerald-400' : ''}>{log}</span>
                       </div>
                    ))}
                    {status === 'CONNECTED' && (
                       <div className="animate-pulse text-[#F48120]">_</div>
                    )}
                 </div>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
};

export default CloudflareTunnelOverlay;

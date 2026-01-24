
import React, { useEffect, useState } from 'react';
import { Radio, Zap, Globe, ShieldCheck, Activity } from 'lucide-react';

const LiveDeploymentTicker: React.FC = () => {
  const [tickerItems, setTickerItems] = useState<string[]>([
    "NEOXZ_MANDATE_PROPAGATING",
    "NODE_4117_SYNC_COMPLETE",
    "CAPITAL_PARITY_VERIFIED_1.000000",
    "LIGHT_WEB_FORENSICS_ACTIVE",
    "REALITY_BRIDGE_TETHER_STABLE",
    "IDENTITY_INCINERATION_SEQUENCE_READY",
    "MAYA_PH_NODE_HANDSHAKE_OK",
    "SWIFT_PRIMARY_RAILS_LIVE"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerItems(prev => {
        const next = [...prev];
        const item = next.shift()!;
        next.push(item);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 bg-emerald-500 text-black border-y border-white flex items-center overflow-hidden relative z-[100] shadow-[0_0_30px_rgba(16,185,129,0.4)]">
      <div className="absolute left-0 top-0 bottom-0 bg-white px-6 flex items-center gap-3 z-10 shadow-[10px_0_20px_rgba(0,0,0,0.2)]">
        <Radio className="w-4 h-4 animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap">Live Broadcast</span>
      </div>
      
      <div className="flex items-center gap-12 animate-marquee whitespace-nowrap pl-48">
        {tickerItems.map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
            <span className="text-[10px] font-black uppercase tracking-widest font-mono italic">{item}</span>
            <Zap className="w-3 h-3" />
          </div>
        ))}
        {/* Duplicate for seamless scroll */}
        {tickerItems.map((item, i) => (
          <div key={`dup-${i}`} className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
            <span className="text-[10px] font-black uppercase tracking-widest font-mono italic">{item}</span>
            <Zap className="w-3 h-3" />
          </div>
        ))}
      </div>

      <div className="absolute right-0 top-0 bottom-0 bg-emerald-500 px-6 flex items-center gap-3 z-10 border-l border-white/20">
         <Activity className="w-4 h-4" />
         <span className="text-[9px] font-black uppercase tracking-widest mono">Latency: 0.001ms</span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}} />
    </div>
  );
};

export default LiveDeploymentTicker;

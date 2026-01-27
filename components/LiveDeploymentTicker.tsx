import React, { useEffect, useState } from 'react';
import { Zap, Activity } from 'lucide-react';

const LiveDeploymentTicker: React.FC = () => {
  const [tickerItems, setTickerItems] = useState<string[]>([
    "VISUAL_SIMPLICITY_ACTIVE",
    "LIGHTNING_FX_ONLINE",
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
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full h-8 bg-black/80 backdrop-blur-md border-t border-white/5 flex items-center z-[150] overflow-hidden">
      <div className="absolute left-0 bg-black px-4 h-full flex items-center gap-3 z-10 border-r border-white/5">
        <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
        <span className="text-[9px] font-black text-white uppercase tracking-widest">Live Status</span>
      </div>
      
      <div className="flex items-center gap-16 animate-marquee whitespace-nowrap pl-32 text-slate-400">
        {tickerItems.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[9px] font-mono font-bold tracking-widest hover:text-emerald-400 transition-colors cursor-default">{item}</span>
            <Zap className="w-2 h-2 text-slate-700" />
          </div>
        ))}
        {/* Duplicate for loop */}
        {tickerItems.map((item, i) => (
          <div key={`dup-${i}`} className="flex items-center gap-3">
            <span className="text-[9px] font-mono font-bold tracking-widest hover:text-emerald-400 transition-colors cursor-default">{item}</span>
            <Zap className="w-2 h-2 text-slate-700" />
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}} />
    </div>
  );
};

export default LiveDeploymentTicker;

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Fingerprint, Radio, Crown, MapPin, FileBadge } from 'lucide-react';

const PublishedWatermark: React.FC = () => {
  const [isDeployed, setIsDeployed] = useState(() => localStorage.getItem('neoxz_deployed') === 'true');
  const [isLocked, setIsLocked] = useState(true); // Always locked to founder

  useEffect(() => {
    const check = setInterval(() => {
      setIsDeployed(localStorage.getItem('neoxz_deployed') === 'true');
    }, 1000);
    return () => clearInterval(check);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[200] pointer-events-none select-none opacity-40 hover:opacity-100 transition-opacity duration-1000 group">
      <div className={`flex items-center gap-4 px-6 py-3 rounded-full bg-black/80 border transition-all duration-1000 backdrop-blur-md border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)]`}>
        <div className="relative">
          <Crown className="w-4 h-4 text-amber-400 animate-pulse" />
          <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-md animate-pulse"></div>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[8px] font-black text-white uppercase tracking-[0.3em] leading-tight">
            EXCLUSIVE PROPERTY OF
          </span>
          <div className="flex items-center justify-end gap-2">
            <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">
              NEIL RUBIO BALOG
            </span>
            <Fingerprint className="w-3 h-3 text-amber-500" />
          </div>
        </div>
      </div>
      <div className="absolute -bottom-6 right-6 flex flex-col items-end gap-1">
        <div className="text-[6px] font-black uppercase tracking-[0.4em] text-amber-600 group-hover:text-amber-400 transition-colors">
          SOLE FOUNDER & CREATOR • NE.B.RU
        </div>
        <div className="flex items-center gap-1 text-[6px] font-mono text-slate-600 group-hover:text-slate-400 transition-colors">
           <FileBadge className="w-2 h-2" />
           BCR2DN4TU7BMDMDU
        </div>
      </div>
    </div>
  );
};

export default PublishedWatermark;

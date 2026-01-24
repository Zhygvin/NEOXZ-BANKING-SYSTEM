import React, { useEffect, useState } from 'react';
import { ShieldCheck, Fingerprint, Radio, Crown, MapPin } from 'lucide-react';

const PublishedWatermark: React.FC = () => {
  const [isDeployed, setIsDeployed] = useState(() => localStorage.getItem('neoxz_deployed') === 'true');
  const [isLocked, setIsLocked] = useState(() => localStorage.getItem('neoxz_beneficiary_locked') === 'true');

  useEffect(() => {
    const check = setInterval(() => {
      setIsDeployed(localStorage.getItem('neoxz_deployed') === 'true');
      setIsLocked(localStorage.getItem('neoxz_beneficiary_locked') === 'true');
    }, 1000);
    return () => clearInterval(check);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[200] pointer-events-none select-none opacity-30 hover:opacity-100 transition-opacity duration-1000 group">
      <div className={`flex items-center gap-4 px-6 py-3 rounded-full bg-black/60 border transition-all duration-1000 backdrop-blur-md ${isLocked ? 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]' : isDeployed ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-emerald-500/20'}`}>
        <div className="relative">
          {isLocked ? (
            <Crown className="w-4 h-4 text-amber-400 animate-pulse" />
          ) : isDeployed ? (
            <div className="relative">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <MapPin className="absolute -top-1 -right-1 w-2 h-2 text-white animate-bounce" />
            </div>
          ) : (
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          )}
          <div className={`absolute inset-0 ${isLocked ? 'bg-amber-500/20' : 'bg-emerald-500/20'} rounded-full blur-md animate-pulse`}></div>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-white uppercase tracking-[0.4em]">
            {isLocked ? 'Master Beneficiary Lock' : isDeployed ? 'Production Anchored' : 'Sovereign Production'}
          </span>
          <div className="flex items-center gap-2">
            <Fingerprint className="w-2.5 h-2.5 text-slate-500" />
            <span className="text-[7px] font-mono text-slate-500 uppercase tracking-widest leading-none">
              {isLocked ? 'SOLE_AUTHORITY: NE.B.RU' : isDeployed ? 'PH_MNL_LOCKED: 1:1 PARITY' : 'SDS_LOCKED: 0x7F8E...BALOG'}
            </span>
          </div>
        </div>
      </div>
      <div className={`absolute -bottom-2 right-4 text-[6px] font-black uppercase tracking-[0.6em] transition-colors ${isLocked ? 'text-amber-500' : isDeployed ? 'text-emerald-400' : 'text-emerald-900'} group-hover:text-emerald-500`}>
        {isLocked ? 'CORE_FUNDS_TRANSFER_ANCHORED' : isDeployed ? 'REALITY_MANIFESTED_PH' : 'Inherent Legitimacy Verified'}
      </div>
    </div>
  );
};

export default PublishedWatermark;
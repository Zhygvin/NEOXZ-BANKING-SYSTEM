
import React from 'react';
import { CreditCard, ArrowUpRight, CheckCircle2, AlertTriangle, Hammer, Globe, Activity, Smartphone, Landmark, Binary } from 'lucide-react';
import { PaymentPlatform } from '../types';

interface PaymentRailsProps {
  platforms: PaymentPlatform[];
}

const PaymentRails: React.FC<PaymentRailsProps> = ({ platforms }) => {
  const getStatusIcon = (status: PaymentPlatform['status']) => {
    switch (status) {
      case 'OPERATIONAL': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      case 'DEGRADED': return <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />;
      case 'MAINTENANCE': return <Hammer className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const getCategoryIcon = (category: PaymentPlatform['category']) => {
    switch (category) {
      case 'MOBILE': return <Smartphone className="w-4 h-4" />;
      case 'CRYPTO': return <Binary className="w-4 h-4" />;
      case 'INSTITUTIONAL': return <Landmark className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-slate-900/40 border border-emerald-500/10 rounded-[3rem] p-8 shadow-3xl relative overflow-hidden flex flex-col group backdrop-blur-3xl transition-all hover:border-emerald-500/30">
      <div className="absolute -right-8 -top-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
        <CreditCard className="w-48 h-48 text-emerald-500" />
      </div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300">Global Integration Rails</h3>
            <span className="text-[9px] text-emerald-500/60 font-bold uppercase tracking-widest italic">Maya / Wise / Binance / SWIFT</span>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
           <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
           <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">ACTIVE</span>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {platforms.map((platform) => (
          <div key={platform.id} className="p-6 rounded-[2rem] bg-slate-950/60 border border-slate-800 hover:border-emerald-500/30 transition-all group/rail flex flex-col gap-4 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-900 text-slate-500">
                  {getCategoryIcon(platform.category)}
                </div>
                <span className="text-xs font-black text-slate-200 tracking-tight uppercase">{platform.name}</span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-900 text-[8px] font-mono text-slate-500 border border-slate-800 uppercase">{platform.protocol}</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(platform.status)}
                <span className={`text-[9px] font-black uppercase tracking-widest ${
                  platform.status === 'OPERATIONAL' ? 'text-emerald-500' : 'text-amber-500'
                }`}>
                  {platform.status}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] text-slate-600 font-black uppercase tracking-widest">Settlement Liquidity</span>
                <span className="text-sm font-black text-emerald-500/90 mono">{platform.liquidity}</span>
              </div>
              <button className="p-2.5 rounded-xl bg-slate-900 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all border border-slate-800 group-hover/rail:border-emerald-500/40">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentRails;


import React from 'react';
import { Activity, Shield, Zap, Layers, Wallet, Link, Cpu, TrendingUp, Anchor, Globe2, ShieldCheck, Landmark, Crown } from 'lucide-react';
import { SystemStatus } from '../types';

interface StatsGridProps { stats: SystemStatus; }

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const formatCurrency = (val: number) => {
    if (val >= 1e12) return `$${(val / 1e12).toFixed(3)}T`;
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    return `$${val.toLocaleString()}`;
  };

  const items = [
    { label: 'Sovereign Capital', value: formatCurrency(stats.neoxzBankCapital), icon: Wallet, color: 'text-emerald-500' },
    { label: 'Institutional ID', value: stats.institutionalId, icon: Landmark, color: 'text-amber-500' },
    { 
      label: 'Beneficiary Status', 
      value: stats.legalCompliance === 'SOVEREIGN_BENEFICIARY_LOCKED' ? 'SOLE AUTHORITY LOCK' : 'VERIFIED', 
      icon: Crown, 
      color: stats.legalCompliance === 'SOVEREIGN_BENEFICIARY_LOCKED' ? 'text-amber-400' : 'text-slate-500' 
    },
    { label: 'Reality Parity', value: stats.realityParity.toFixed(6), icon: Cpu, color: 'text-cyan-400' },
    { label: 'Mandate Coverage', value: '100%', icon: Shield, color: 'text-emerald-500' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {items.map((item, idx) => (
        <div key={idx} className={`bg-slate-900/40 border ${item.label === 'Beneficiary Status' && stats.legalCompliance === 'SOVEREIGN_BENEFICIARY_LOCKED' ? 'border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.1)]' : 'border-slate-800'} p-6 rounded-[2rem] flex flex-col items-center justify-center space-y-3 group hover:border-emerald-500/30 transition-all cursor-default overflow-hidden relative shadow-2xl`}>
          <div className={`p-3 rounded-2xl bg-black/40 border border-slate-800 ${item.color} group-hover:scale-110 transition-transform shadow-lg`}>
            <item.icon className="w-5 h-5" />
          </div>
          <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{item.label}</span>
          <span className={`text-sm font-black mono tracking-tighter ${item.color} text-center`}>
            {item.value}
          </span>
          {item.label === 'Beneficiary Status' && stats.legalCompliance === 'SOVEREIGN_BENEFICIARY_LOCKED' && (
            <div className="absolute top-0 right-0 p-2">
               <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;

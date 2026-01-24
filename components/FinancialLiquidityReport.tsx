import React from 'react';
import { Landmark, ShieldCheck, TrendingUp, Wallet, Download, FileText, Anchor, Scale, PieChart, Activity } from 'lucide-react';
import { FinancialReport } from '../types';

interface FinancialLiquidityReportProps {
  report: FinancialReport;
  onClose: () => void;
}

const FinancialLiquidityReport: React.FC<FinancialLiquidityReportProps> = ({ report, onClose }) => {
  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="w-full max-w-5xl bg-[#0a0a0a] border border-emerald-500/30 rounded-[4rem] shadow-[0_0_100px_rgba(16,185,129,0.1)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <header className="p-12 border-b border-slate-900 bg-emerald-950/10 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="p-6 rounded-3xl bg-emerald-500 text-black shadow-2xl">
              <Landmark className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Sovereign Audit Terminal v9.1</h2>
              <div className="flex items-center gap-3 text-emerald-400 mt-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">{report.complianceStatus}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-4 rounded-full bg-slate-900 text-slate-400 hover:text-white transition-all border border-slate-800"
          >
            <Download className="w-6 h-6" />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar space-y-12">
          {/* Main Stats Ledger */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-10 rounded-[3rem] bg-black border border-slate-800 space-y-6">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Total Systemic Funds (Recalibrated)</span>
              <div className="text-5xl font-black text-white mono tracking-tighter glow-emerald">
                {formatValue(report.totalSystemicCapital)}
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <span className="text-[8px] text-slate-500 font-black uppercase">Liquid Core</span>
                    <div className="h-1 bg-emerald-500/50 rounded-full"></div>
                    <span className="text-[10px] text-emerald-400 mono font-bold">$500B</span>
                 </div>
                 <div className="space-y-1">
                    <span className="text-[8px] text-slate-500 font-black uppercase">Breach Recovery</span>
                    <div className="h-1 bg-rose-500/50 rounded-full animate-pulse"></div>
                    <span className="text-[10px] text-rose-400 mono font-bold">$485B</span>
                 </div>
              </div>
              <p className="text-[11px] text-slate-500 font-bold uppercase italic">Recalibrated v9.1 | SDS Verified Authority</p>
            </div>

            <div className="p-10 rounded-[3rem] bg-black border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Founder Recalibrated Reserve</span>
                <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <Activity className="w-3 h-3 text-emerald-400" />
                </div>
              </div>
              <div className="text-5xl font-black text-emerald-400 mono tracking-tighter">
                {formatValue(report.founderReserve)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-black uppercase">Q-Team Recalibrated Salary</span>
                <span className="text-[10px] text-emerald-500 font-black uppercase mono"> press.neoxz@gmail.com </span>
              </div>
            </div>
          </div>

          {/* Asset Breakdown Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { label: 'Institutional Liquidity', value: '60%', detail: report.assetBreakdown.institutionalBacking, icon: Anchor, color: 'text-cyan-400' },
              { label: 'Digital Gold Reserves', value: '30%', detail: report.assetBreakdown.digitalGoldReserves, icon: Wallet, color: 'text-emerald-500' },
              { label: 'Sovereign Debt Bonds', value: '10%', detail: report.assetBreakdown.sovereignDebtBonds, icon: Scale, color: 'text-amber-500' }
            ].map((asset, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 space-y-4 hover:border-emerald-500/20 transition-all">
                <div className={`p-4 rounded-2xl bg-black/60 w-fit ${asset.color}`}>
                   <asset.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{asset.label}</span>
                  <span className={`text-xl font-black mono ${asset.color}`}>{asset.value}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{asset.detail}</p>
              </div>
            ))}
          </div>

          {/* SDS Integrity & Summary */}
          <div className="p-12 rounded-[3.5rem] bg-emerald-500/5 border border-emerald-500/10 space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5">
                <FileText className="w-48 h-48 text-emerald-500" />
             </div>
             <div className="flex items-center gap-6 relative z-10">
                <div className="p-5 rounded-3xl bg-emerald-500 text-black shadow-xl">
                   <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                   <h3 className="text-xl font-black uppercase text-white">Sovereign Summary (Recalibrated)</h3>
                   <span className="text-[10px] text-emerald-500 font-black mono uppercase tracking-widest">HASH: {report.sdsHash}</span>
                </div>
             </div>
             <p className="text-lg text-slate-300 leading-relaxed font-medium relative z-10 max-w-4xl italic">
               "{report.summary}"
             </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-10 border-t border-slate-900 bg-black flex items-center justify-between">
           <div className="flex items-center gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">v9.1 Recalibration Sync Active</span>
           </div>
           <button 
             onClick={onClose}
             className="px-10 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-black uppercase tracking-widest transition-all"
           >
             Close Audit Terminal
           </button>
        </footer>
      </div>
    </div>
  );
};

export default FinancialLiquidityReport;
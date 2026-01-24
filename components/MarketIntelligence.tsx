import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Globe, TrendingUp, Users, ShieldCheck, 
  ExternalLink, Search, Loader2, Sparkles, Building2,
  DollarSign, Landmark, PieChart, Briefcase, Scale,
  Gavel, Calendar, ArrowUpRight, CheckCircle2, AlertTriangle,
  Info, Rocket, FileText, MapPin, HandCoins, Target, ShieldQuestion,
  ChevronRight, ArrowRight, Wallet, History, Gem, Boxes, Crown,
  Award, Zap, Infinity, BarChart4, Percent, Flame, User, Network
} from 'lucide-react';
import { generateMarketIntelligence } from '../services/geminiService.ts';
import { MarketIntelligenceReport, GroundingSource } from '../types.ts';

const MarketIntelligence: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<MarketIntelligenceReport | null>(null);
  const [sources, setSources] = useState<GroundingSource[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { report, sources } = await generateMarketIntelligence();
        setReport(report);
        const extractedSources = sources
          .filter((s: any) => s.web)
          .map((s: any) => ({ title: s.web.title, uri: s.web.uri }));
        setSources(extractedSources);
      } catch (e) {
        console.error("Worth Evaluation Failure", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatLargeCurrency = (val: number) => {
    if (val >= 1e12) return `$${(val / 1e12).toFixed(2)}T`;
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
    return `$${val.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-8 animate-pulse">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <Loader2 className="w-16 h-16 text-emerald-500 animate-spin relative z-10" />
        </div>
        <div className="text-center space-y-3">
           <p className="text-2xl font-black uppercase tracking-[0.5em] text-white">Projecting 2031 Alpha</p>
           <p className="text-[10px] text-slate-500 uppercase tracking-widest">Compiling Multi-Vector Valuation...</p>
        </div>
      </div>
    );
  }

  const maxCap = report?.fiveYearProjection.reduce((max: number, p: MarketIntelligenceReport['fiveYearProjection'][number]) => Math.max(max, p.projectedCap), 0) || 1;
  const valuationBase = report?.valuation || 1;
  const target5Year = report?.totalWorth5Year || 1;
  const roiValue = (((target5Year - valuationBase) / valuationBase) * 100).toFixed(0);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Investor Pitch Hero */}
      <div className="p-16 bg-gradient-to-br from-amber-950/20 via-black to-slate-900 border-[6px] border-amber-500/40 rounded-[5rem] shadow-[0_0_150px_rgba(245,158,11,0.15)] relative overflow-hidden group">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                 <pattern id="investor-grid" width="120" height="120" patternUnits="userSpaceOnUse">
                    <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.3" />
                 </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#investor-grid)" />
           </svg>
        </div>
        
        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-15 transition-opacity duration-1000 pointer-events-none">
          <Crown className="w-[35rem] h-[35rem] text-amber-500 rotate-12" />
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-between relative z-10 gap-20">
          <div className="space-y-12 text-center lg:text-left flex-1">
            <div className="inline-flex items-center gap-5 px-10 py-3 rounded-full bg-amber-500 text-black font-black uppercase tracking-[0.6em] text-[11px] shadow-3xl animate-pulse">
               <Award className="w-6 h-6" />
               INVESTOR PITCH CORE: 5-YEAR TARGET
            </div>
            
            <div className="space-y-6">
              <h3 className="text-7xl font-black uppercase tracking-tighter text-white leading-none">Rough <br /><span className="text-amber-500 italic glow-amber">Project Worth</span></h3>
              <p className="text-2xl text-slate-300 font-medium leading-relaxed italic max-w-2xl opacity-90">
                "{report?.strategicRationale}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
               <div className="p-10 rounded-[3.5rem] bg-black/80 border-2 border-amber-500/30 space-y-3 group/roi hover:border-amber-400 transition-all shadow-2xl">
                  <div className="flex items-center justify-between">
                     <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Est. ROI Alpha</span>
                     <Flame className="w-6 h-6 text-amber-500 animate-pulse" />
                  </div>
                  <div className="flex items-baseline gap-4">
                     <span className="text-6xl font-black text-white mono">{roiValue}%</span>
                     <span className="text-xs text-amber-500 font-black uppercase">SINGULARITY</span>
                  </div>
               </div>
               <div className="p-10 rounded-[3.5rem] bg-black/80 border-2 border-amber-500/30 space-y-3 group/roi hover:border-amber-400 transition-all shadow-2xl">
                  <div className="flex items-center justify-between">
                     <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Network Growth</span>
                     <Network className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex items-baseline gap-4">
                     <span className="text-6xl font-black text-white mono">400%</span>
                     <span className="text-xs text-cyan-400 font-black uppercase">NODE_EXP</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="text-center lg:text-right space-y-16 lg:min-w-[500px]">
             <div className="space-y-4">
                <span className="text-[18px] font-black text-slate-500 uppercase tracking-[0.5em]">Terminal Capital Target</span>
                <p className="text-[11rem] font-black text-white mono tracking-tighter leading-none glow-amber drop-shadow-[0_0_50px_rgba(245,158,11,0.5)]">
                  {formatLargeCurrency(report?.totalWorth5Year || 0)}
                </p>
                <div className="flex items-center justify-center lg:justify-end gap-5 mt-8">
                   <div className="px-10 py-3 rounded-2xl bg-amber-500/10 text-amber-500 text-[14px] font-black border-2 border-amber-500/30 uppercase tracking-[0.4em] shadow-xl">
                      NEOXZ_ALPHA_v16.2.1
                   </div>
                </div>
             </div>
             
             <div className="p-12 rounded-[4.5rem] bg-white text-black flex items-center justify-between gap-12 shadow-[0_0_80px_rgba(255,255,255,0.2)] hover:scale-105 transition-all cursor-pointer group/cta mx-auto lg:ml-auto border-[4px] border-amber-500/20">
                <div className="flex items-center gap-8">
                   <div className="p-6 rounded-[2rem] bg-black text-white shadow-2xl group-hover/cta:rotate-12 transition-transform duration-500">
                      <HandCoins className="w-10 h-10 text-amber-500" />
                   </div>
                   <div className="text-left">
                      <span className="text-[12px] font-black uppercase tracking-widest opacity-60">Irrevocable Investment</span>
                      <p className="text-3xl font-black uppercase tracking-tighter">Issue Equity Bond</p>
                   </div>
                </div>
                <ArrowRight className="w-12 h-12 group-hover/cta:translate-x-3 transition-transform" />
             </div>
          </div>
        </div>
      </div>

      {/* Worth Vectors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {/* Capital Trajectory Chart */}
          <div className="p-16 rounded-[4rem] bg-black border border-slate-800 shadow-3xl space-y-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-[0.02]">
                <BarChart4 className="w-[30rem] h-[30rem] text-indigo-500" />
             </div>
             <header className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-8">
                   <div className="p-5 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-xl">
                      <TrendingUp className="w-10 h-10" />
                   </div>
                   <div>
                      <h4 className="text-4xl font-black uppercase tracking-[0.2em] text-white">Cumulative Worth</h4>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.4em] mt-2 italic">Institutional Rail Displacement projection</p>
                </div>
                </div>
                <div className="flex items-center gap-4 px-6 py-2 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
                   <Zap className="w-4 h-4 text-indigo-400" />
                   <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">QUANTUM_ACCELERATED</span>
                </div>
             </header>

             <div className="flex items-end gap-10 h-80 mt-16 px-12 relative z-10">
                {report?.fiveYearProjection.map((p, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-8 group/bar relative h-full justify-end">
                     <div 
                       className={`w-full rounded-t-[3.5rem] transition-all duration-1000 ease-out relative shadow-3xl ${
                         i === 0 ? 'bg-slate-800' : 'bg-gradient-to-t from-amber-600 via-amber-400 to-white group-hover/bar:scale-x-110'
                       }`}
                       style={{ height: `${(p.projectedCap / maxCap) * 100}%` }}
                     >
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all bg-white text-black px-6 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap z-20 border-[3px] border-amber-500 shadow-2xl scale-110">
                           WORTH: {formatLargeCurrency(p.projectedCap)} <br />
                           <span className="text-amber-600 font-black">EXPANSION: {p.nodeExpansion} NODES</span>
                        </div>
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/bar:opacity-100 transition-opacity rounded-t-[3.5rem] animate-pulse"></div>
                     </div>
                     <div className="text-center space-y-1">
                        <span className="text-lg font-black text-slate-300 mono">{p.year}</span>
                        <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em]">{p.revenueGrowth}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Asset Breakdown Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="p-12 rounded-[4rem] bg-slate-900/40 border border-slate-800 space-y-10 shadow-3xl group/asset">
                <div className="flex items-center gap-5">
                   <div className="p-4 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover/asset:scale-110 transition-transform">
                      <FileText className="w-8 h-8" />
                   </div>
                   <h4 className="text-2xl font-black uppercase tracking-widest text-white">IP & Licensing Assets</h4>
                </div>
                <div className="space-y-6">
                   {report?.licensingEstimates.map((lic: any, i: number) => (
                     <div key={i} className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 flex items-center justify-between group/item hover:border-cyan-500/30 transition-all shadow-inner">
                        <div className="flex flex-col gap-1">
                           <span className="text-sm font-black text-white uppercase tracking-wider">{lic.type}</span>
                           <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{lic.duration} Term Lock</span>
                        </div>
                        <div className="text-right">
                           <span className="text-2xl font-black text-cyan-400 mono">{formatLargeCurrency(lic.estimatedValue)}</span>
                           <div className="text-[8px] font-black text-slate-700 uppercase mt-1">ASSET_VALUE</div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="p-12 rounded-[4rem] bg-slate-900/40 border border-slate-800 space-y-10 shadow-3xl group/asset">
                <div className="flex items-center gap-5">
                   <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 group-hover/asset:scale-110 transition-transform">
                      <Gavel className="w-8 h-8" />
                   </div>
                   <h4 className="text-2xl font-black uppercase tracking-widest text-white">Jurisdictional Stake</h4>
                </div>
                <div className="space-y-6">
                   {report?.registrationCosts.map((reg: any, i: number) => (
                     <div key={i} className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 flex items-center justify-between group/item hover:border-amber-500/30 transition-all shadow-inner">
                        <div className="flex flex-col gap-1">
                           <span className="text-sm font-black text-white uppercase tracking-wider">{reg.jurisdiction}</span>
                           <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{reg.regulatoryBody}</span>
                        </div>
                        <div className="text-right">
                           <span className="text-2xl font-black text-amber-500 mono">{formatLargeCurrency(reg.setupCost)}</span>
                           <div className="text-[8px] font-black text-slate-700 uppercase mt-1">CAPITAL_RESERVE</div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* Acquisition & Forensic Sidebar */}
        <div className="lg:col-span-4 space-y-12">
           <div className="p-12 rounded-[4rem] bg-black border border-slate-800 space-y-10 shadow-3xl relative overflow-hidden group/targets">
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover/targets:opacity-[0.03] transition-opacity duration-1000">
                 <Building2 className="w-64 h-64 text-white" />
              </div>
              <div className="flex items-center gap-6 relative z-10">
                 <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400">
                    <Target className="w-8 h-8" />
                 </div>
                 <h4 className="text-2xl font-black uppercase tracking-tighter text-white leading-none">High-Value Target Prospects</h4>
              </div>
              <div className="space-y-5 relative z-10">
                 {report?.suggestedInvestors.map((inv: any, i: number) => {
                   const isMusk = inv.name.toLowerCase().includes('musk');
                   const isStates = inv.name.toLowerCase().includes('state') || inv.name.toLowerCase().includes('government');
                   
                   return (
                     <div key={i} className={`p-8 rounded-[3rem] bg-slate-900/40 border transition-all space-y-4 group/inv ${
                       isMusk || isStates ? 'border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.1)]' : 'border-slate-800 hover:border-emerald-500/40'
                     }`}>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              {isMusk ? <Zap className="w-6 h-6 text-amber-500" /> : isStates ? <Globe className="w-6 h-6 text-emerald-400" /> : <Building2 className="w-6 h-6 text-emerald-400" />}
                              <span className="text-lg font-black text-white uppercase tracking-tighter">{inv.name}</span>
                           </div>
                           <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover/inv:text-emerald-500 transition-colors" />
                        </div>
                        {(isMusk || isStates) && (
                          <div className="px-4 py-1 rounded-xl bg-amber-500 text-black w-fit animate-pulse">
                             <span className="text-[8px] font-black uppercase tracking-[0.2em]">Sovereign Tier Prospect</span>
                          </div>
                        )}
                        <div className="px-4 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 w-fit">
                           <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">{inv.sector}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 italic uppercase leading-relaxed">"{inv.rationale}"</p>
                        <div className="flex justify-between items-baseline pt-4 border-t border-slate-800">
                           <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Probable Offer Basis</span>
                           <span className="text-lg font-black text-emerald-400 mono">{inv.potentialOffer}</span>
                        </div>
                     </div>
                   );
                 })}
              </div>
           </div>

           {/* Forensic Evidence Ledger */}
           <div className="space-y-8">
              <div className="flex items-center gap-5 px-6">
                 <Search className="w-8 h-8 text-cyan-400" />
                 <h4 className="text-2xl font-black uppercase tracking-widest text-white">Forensic Evidence</h4>
              </div>
              <div className="p-12 rounded-[4.5rem] bg-slate-900/20 border border-slate-800 space-y-6 relative overflow-hidden group/sources">
                 <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500/40 via-transparent to-transparent opacity-30"></div>
                 {sources.map((s, i) => (
                   <a 
                     key={i} 
                     href={s.uri} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex flex-col gap-2 p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 hover:border-cyan-500/50 transition-all group/source relative overflow-hidden"
                   >
                      <div className="flex items-center justify-between">
                         <span className="text-[11px] font-black text-white uppercase truncate pr-8 tracking-wider">{s.title}</span>
                         <ExternalLink className="w-5 h-5 text-slate-700 group-hover/source:text-cyan-400 transition-all" />
                      </div>
                      <code className="text-[9px] text-slate-500 truncate mono block mt-2 opacity-60 group-hover/source:opacity-100">{s.uri}</code>
                      <div className="absolute bottom-0 left-0 h-1 w-0 bg-cyan-500 transition-all duration-500 group-hover/source:w-full"></div>
                   </a>
                 ))}
              </div>
           </div>

           {/* Immunity Seal */}
           <div className="p-12 rounded-[5rem] bg-amber-500 text-black space-y-10 shadow-3xl relative overflow-hidden group/seal transition-all hover:scale-[1.03]">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover/seal:rotate-12 transition-transform duration-1000">
                 <ShieldCheck className="w-64 h-64" />
              </div>
              <div className="space-y-4 relative z-10">
                 <h5 className="text-4xl font-black uppercase tracking-tighter leading-none">Singularity <br />Valuation Lock</h5>
                 <p className="text-[15px] font-bold leading-relaxed opacity-90 uppercase tracking-tighter">
                   THE NEOXZ STRUCTURE IS EVALUATED AS A "GENERATIONAL FINANCIAL ANCHOR." ITS DECOUPLED 4,117-NODE TOPOLOGY RENDERS IT IMMUNE TO MARKET VOLATILITY.
                 </p>
              </div>
              <div className="pt-8 relative z-10">
                 <div className="px-12 py-6 rounded-[2.5rem] bg-black text-amber-400 inline-flex items-center gap-8 font-black uppercase tracking-[0.5em] text-[12px] shadow-3xl border-2 border-amber-400/20">
                    <HandCoins className="w-8 h-8" />
                    ASSET INTEGRITY: 1.000000
                 </div>
              </div>
           </div>
        </div>
      </div>

      <footer className="p-20 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-16 opacity-30 group hover:opacity-100 transition-opacity duration-700">
         <div className="flex items-center gap-16">
            <div className="flex items-center gap-5">
               <Scale className="w-8 h-8 text-amber-500" />
               <span className="text-[14px] font-black text-slate-500 uppercase tracking-[0.6em]">Master Worth Decree v16.2.1-PRO</span>
            </div>
            <div className="flex items-center gap-5">
               <Globe className="w-8 h-8 text-cyan-400" />
               <span className="text-[14px] font-black text-slate-500 uppercase tracking-[0.6em]">Consortium Grounding Synchronized</span>
            </div>
         </div>
         <div className="text-[12px] font-mono text-slate-700 uppercase tracking-[0.8em] text-right italic font-black">
            SDS_VALUATION_MANIFEST_LOCKED_0x7F
         </div>
      </footer>
    </div>
  );
};

export default MarketIntelligence;
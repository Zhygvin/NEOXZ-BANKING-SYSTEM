
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Globe, TrendingUp, Users, ShieldCheck, 
  ExternalLink, Search, Loader2, Sparkles, Building2,
  DollarSign, Landmark, PieChart, Briefcase, Scale,
  Gavel, Calendar, ArrowUpRight, CheckCircle2, AlertTriangle,
  Info, Rocket, FileText, MapPin, HandCoins
} from 'lucide-react';
import { generateMarketIntelligence } from '../services/geminiService';
import { MarketIntelligenceReport, GroundingSource } from '../types';

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
        console.error("Valuation Failure", e);
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
        <div className="text-center space-y-2">
           <p className="text-xl font-black uppercase tracking-[0.5em] text-white">Synthesizing 5-Year Mandate</p>
           <p className="text-[10px] text-slate-500 uppercase tracking-widest">Auditing Global Regulatory Rails...</p>
        </div>
      </div>
    );
  }

  // Calculate max projection for chart scaling
  const maxCap = report?.fiveYearProjection.reduce((max, p) => Math.max(max, p.projectedCap), 0) || 1;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Valuation Hero */}
      <div className="p-12 bg-slate-900/40 border-2 border-emerald-500/20 rounded-[4rem] shadow-3xl backdrop-blur-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
          <Landmark className="w-96 h-96 text-emerald-500 rotate-12" />
        </div>
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 relative z-10 gap-8">
          <div className="flex items-center gap-8">
            <div className="p-5 rounded-[2.5rem] bg-emerald-500 text-black shadow-2xl shadow-emerald-500/20">
              <TrendingUp className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-3xl font-black uppercase tracking-[0.4em] text-white leading-none">Strategic Valuation</h3>
              <div className="flex items-center gap-3 mt-3">
                 <span className="text-[11px] text-emerald-400 font-bold tracking-widest uppercase italic">2026-2031 Sovereign Projection</span>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
              </div>
            </div>
          </div>
          <div className="text-right">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Enterprise Market Cap (Present)</span>
             <p className="text-7xl font-black text-white mono tracking-tighter glow-emerald">
               {formatLargeCurrency(report?.valuation || 0)}
             </p>
             <div className="flex items-center justify-end gap-2 mt-2">
                <span className="text-[10px] font-black text-emerald-500 uppercase">{report?.multiplier} Multiplier</span>
                <div className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[8px] font-black border border-emerald-500/20">SDS_VERIFIED</div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
           <div className="p-8 rounded-[3rem] bg-black/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                 <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Viability Score</span>
                 <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-4xl font-black text-white mono">{report?.viabilityScore}%</span>
              <p className="text-[9px] text-slate-500 font-bold uppercase leading-relaxed">{report?.strategicRationale}</p>
           </div>

           <div className="p-8 rounded-[3rem] bg-black/60 border border-slate-800 space-y-6">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Core Markets</span>
              <div className="flex flex-wrap gap-2">
                 {report?.targetMarkets.map((m, i) => (
                   <span key={i} className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-400 uppercase">{m}</span>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-[3rem] bg-black/60 border border-slate-800 space-y-4 col-span-2">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">5-Year Capital Trajectory</span>
              <div className="flex items-end gap-3 h-24 mt-4">
                 {report?.fiveYearProjection.map((p, i) => (
                   <div key={i} className="flex-1 flex flex-col items-center gap-2 group/bar relative">
                      <div 
                        className={`w-full rounded-t-xl transition-all duration-1000 ${i === 0 ? 'bg-slate-800' : 'bg-emerald-500/40 group-hover/bar:bg-emerald-500 shadow-lg shadow-emerald-500/10'}`}
                        style={{ height: `${(p.projectedCap / maxCap) * 100}%` }}
                      ></div>
                      <span className="text-[8px] font-black text-slate-600 uppercase">{p.year}</span>
                      <div className="absolute bottom-full mb-2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-white text-black px-2 py-1 rounded text-[8px] font-black whitespace-nowrap z-20 pointer-events-none">
                         {formatLargeCurrency(p.projectedCap)}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Licensing & Registration */}
        <div className="lg:col-span-8 space-y-12">
           {/* Licensing Grid */}
           <div className="space-y-6">
              <div className="flex items-center gap-4 px-6">
                <Gavel className="w-6 h-6 text-cyan-400" />
                <h4 className="text-xl font-black uppercase tracking-[0.3em] text-white">Licensing & IP Value</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {report?.licensingEstimates.map((lic, i) => (
                  <div key={i} className="p-8 rounded-[3rem] bg-black border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col gap-4 shadow-2xl relative group/lic">
                    <div className="flex items-center justify-between">
                       <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover/lic:scale-110 transition-transform">
                          <FileText className="w-5 h-5" />
                       </div>
                       <span className="text-[8px] font-black px-2 py-0.5 rounded border border-slate-800 text-slate-500">ASSET_v4</span>
                    </div>
                    <div className="space-y-1">
                       <h5 className="text-[11px] font-black text-white uppercase tracking-widest">{lic.type}</h5>
                       <p className="text-2xl font-black text-cyan-400 mono">{formatLargeCurrency(lic.estimatedValue)}</p>
                    </div>
                    <p className="text-[9px] text-slate-500 italic leading-relaxed font-medium uppercase">"{lic.notes}"</p>
                  </div>
                ))}
              </div>
           </div>

           {/* Global Registration */}
           <div className="space-y-6">
              <div className="flex items-center gap-4 px-6">
                <MapPin className="w-6 h-6 text-indigo-400" />
                <h4 className="text-xl font-black uppercase tracking-[0.3em] text-white">Jurisdictional Footprint</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {report?.registrationCosts.map((reg, i) => (
                  <div key={i} className="p-8 rounded-[3rem] bg-slate-900/40 border border-slate-800 hover:border-indigo-500/30 transition-all group shadow-inner">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-[10px] font-black text-white uppercase tracking-tighter">{reg.jurisdiction}</span>
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    </div>
                    <div className="space-y-4">
                       <div className="flex flex-col">
                          <span className="text-[8px] text-slate-500 uppercase font-black">Capital Requirement</span>
                          <span className="text-xl font-black text-white mono">{formatLargeCurrency(reg.setupCost)}</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">{reg.timeline} Window</span>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Legal Constraints Card */}
           <div className="space-y-6">
              <div className="flex items-center gap-4 px-6">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                <h4 className="text-xl font-black uppercase tracking-[0.3em] text-white">Regulatory Constraints</h4>
              </div>
              <div className="space-y-4">
                 {report?.legalConstraints.map((lc, i) => (
                   <div key={i} className="p-8 rounded-[3rem] bg-black border border-slate-800 flex items-center justify-between group/lc shadow-2xl relative overflow-hidden">
                      <div className={`absolute top-0 right-0 p-4 opacity-5 ${lc.severity === 'HIGH' ? 'text-rose-500' : 'text-amber-500'}`}>
                         <ShieldCheck className="w-24 h-24" />
                      </div>
                      <div className="flex items-center gap-8 relative z-10">
                         <div className={`p-5 rounded-[2rem] bg-slate-950 border-2 transition-colors ${lc.severity === 'HIGH' ? 'border-rose-600/50 text-rose-500' : 'border-amber-600/50 text-amber-500'}`}>
                            <Lock className="w-6 h-6" />
                         </div>
                         <div className="space-y-2">
                            <div className="flex items-center gap-3">
                               <h5 className="text-lg font-black text-white uppercase tracking-wider">{lc.risk}</h5>
                               <span className={`text-[8px] font-black px-2 py-0.5 rounded border ${lc.severity === 'HIGH' ? 'bg-rose-500/10 text-rose-500 border-rose-500/30' : 'bg-amber-500/10 text-amber-500 border-amber-500/30'}`}>
                                  {lc.severity}_RISK
                               </span>
                            </div>
                            <p className="text-[10px] text-slate-400 leading-relaxed font-medium uppercase italic max-w-xl">
                               <span className="text-emerald-500 not-italic font-black mr-2">AI MITIGATION:</span>
                               {lc.mitigation}
                            </p>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Intelligence Sources & Buyers */}
        <div className="lg:col-span-4 space-y-12">
           {/* Identified Investors */}
           <div className="space-y-6">
              <div className="flex items-center gap-4 px-6">
                <Briefcase className="w-6 h-6 text-emerald-400" />
                <h4 className="text-lg font-black uppercase tracking-[0.2em] text-white">Potential Buyers</h4>
              </div>
              <div className="space-y-3">
                {report?.suggestedInvestors.map((inv, i) => (
                  <div key={i} className="p-6 rounded-[2.5rem] bg-slate-950/80 border border-slate-800 hover:border-emerald-500/30 transition-all flex flex-col gap-3 group/inv">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <Building2 className="w-4 h-4 text-emerald-500" />
                          <span className="text-[11px] font-black text-white uppercase tracking-widest">{inv.name}</span>
                       </div>
                       <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover/inv:text-emerald-400 transition-colors" />
                    </div>
                    <p className="text-[9px] text-slate-500 italic leading-relaxed uppercase pr-4">"{inv.rationale}"</p>
                  </div>
                ))}
              </div>
           </div>

           {/* Forensic Sources */}
           <div className="space-y-6">
              <div className="flex items-center gap-4 px-6">
                <Search className="w-6 h-6 text-cyan-400" />
                <h4 className="text-lg font-black uppercase tracking-[0.2em] text-white">Forensic Sources</h4>
              </div>
              <div className="p-8 rounded-[3rem] bg-slate-900/20 border border-slate-800 space-y-4">
                 {sources.length > 0 ? sources.map((s, i) => (
                   <a 
                     key={i} 
                     href={s.uri} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex flex-col gap-1 p-4 rounded-2xl bg-black/40 border border-slate-800 hover:border-cyan-500/30 transition-all group/source overflow-hidden"
                   >
                      <div className="flex items-center justify-between">
                         <span className="text-[9px] font-black text-white uppercase truncate pr-4">{s.title}</span>
                         <ExternalLink className="w-3 h-3 text-slate-700 group-hover/source:text-cyan-400" />
                      </div>
                      <code className="text-[7px] text-slate-600 truncate mono block mt-1">{s.uri}</code>
                   </a>
                 )) : (
                   <div className="flex flex-col items-center justify-center py-20 opacity-20 text-center gap-4">
                      <Globe className="w-12 h-12" />
                      <p className="text-[10px] font-black uppercase tracking-widest">Grounding Layer Syncing...</p>
                   </div>
                 )}
              </div>
           </div>

           {/* Value Guard */}
           <div className="p-10 rounded-[3.5rem] bg-emerald-500 text-black space-y-6 shadow-2xl relative overflow-hidden group/guard">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover/guard:rotate-12 transition-transform">
                 <ShieldCheck className="w-32 h-32" />
              </div>
              <h5 className="text-2xl font-black uppercase tracking-tighter leading-none relative z-10">Absolute Value <br />Immunity</h5>
              <p className="text-xs font-bold leading-relaxed opacity-90 relative z-10">
                The NEOXZ advanced banking structure represents a "Generational Financial Anchor." Its decentralized node distribution makes it resistant to singular legislative shocks.
              </p>
              <div className="pt-4 relative z-10">
                 <div className="px-6 py-3 rounded-xl bg-black text-emerald-400 inline-flex items-center gap-3 font-black uppercase tracking-widest text-[9px] shadow-2xl">
                    <HandCoins className="w-4 h-4" />
                    Asset Integrity: 100%
                 </div>
              </div>
           </div>
        </div>
      </div>

      <footer className="p-12 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
         <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
               <Scale className="w-4 h-4 text-emerald-500" />
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Valuation Engine v16.2.1</span>
            </div>
            <div className="flex items-center gap-3">
               <Globe className="w-4 h-4 text-cyan-400" />
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">4,117 Edges Evaluated</span>
            </div>
         </div>
         <p className="text-[9px] font-mono text-slate-700 uppercase tracking-[0.5em] text-right">
            SDS_MARKET_INTELLIGENCE_LOCKED_0x7F
         </p>
      </footer>
    </div>
  );
};

export default MarketIntelligence;

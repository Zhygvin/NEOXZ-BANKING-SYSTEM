import React, { useState, useRef, useEffect } from 'react';
import { 
  BrainCircuit, Search, Database, Globe, Network, 
  Cpu, Loader2, Sparkles, FileText, ChevronRight,
  ArrowRight, ShieldCheck, Zap
} from 'lucide-react';
import { executeDeepResearch } from '../services/geminiService';

const DeepResearchConsole: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [thinkSteps, setThinkSteps] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const simulateThinking = () => {
    const steps = [
      "Initializing Deep Reasoning Kernel...",
      "Defining Search Vectors...",
      "Traversing Global Knowledge Graph...",
      "Cross-Referencing Historical Datasets...",
      "Identifying Latent Correlations...",
      "Synthesizing Strategic Intelligence...",
      "Formulating Sovereign Directives...",
      "Finalizing Mandate Report..."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setThinkSteps(prev => [...prev, steps[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1500); // Add a step every 1.5s
    
    return interval;
  };

  const handleResearch = async () => {
    if (!query.trim()) return;
    
    setIsResearching(true);
    setReport(null);
    setThinkSteps([]);
    
    const thinkInterval = simulateThinking();

    try {
      const result = await executeDeepResearch(query);
      setReport(result);
    } catch (e) {
      console.error(e);
      setReport("## CRITICAL FAILURE\n\nDeep Research module encountered a quantum coherence error. Please retry.");
    } finally {
      clearInterval(thinkInterval);
      setThinkSteps(prev => [...prev, "RESEARCH COMPLETE."]);
      setIsResearching(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [thinkSteps]);

  // Render Markdown-ish text simply
  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h3 key={i} className="text-2xl font-black text-white mt-8 mb-4 uppercase tracking-tighter">{line.replace('## ', '')}</h3>;
      if (line.startsWith('# ')) return <h2 key={i} className="text-3xl font-black text-emerald-400 mt-10 mb-6 uppercase tracking-widest">{line.replace('# ', '')}</h2>;
      if (line.startsWith('- ')) return <div key={i} className="flex gap-3 ml-4 mb-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div><p className="text-slate-300 text-sm leading-relaxed">{line.replace('- ', '')}</p></div>;
      if (line.trim() === '') return <div key={i} className="h-4"></div>;
      return <p key={i} className="text-slate-300 text-sm leading-relaxed mb-2 font-medium">{line}</p>;
    });
  };

  return (
    <div className="flex flex-col h-full space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between p-8 bg-slate-900/40 border border-purple-500/20 rounded-[3rem] backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="p-4 rounded-3xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <BrainCircuit className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-[0.4em] text-white">Deep Research Core</h2>
            <span className="text-[10px] text-purple-500 font-bold tracking-widest uppercase italic">Gemini 3.0 Pro Reasoning Engine</span>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 font-black text-[10px] uppercase tracking-widest">
           <Zap className="w-4 h-4" />
           Thinking Budget: MAX
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        {/* Left: Input & Process */}
        <div className="lg:col-span-4 flex flex-col gap-8 h-full">
           <div className="p-8 bg-black border border-slate-800 rounded-[3rem] shadow-2xl flex flex-col gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Research Directive</label>
                 <div className="relative group">
                    <textarea 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Enter strategic topic (e.g., 'Impact of Quantum Computing on Global Banking 2030')..."
                      className="w-full bg-slate-950 border-2 border-slate-800 rounded-[2rem] px-6 py-5 text-sm text-white font-medium outline-none focus:border-purple-500/50 transition-all resize-none h-40 custom-scrollbar shadow-inner"
                    />
                    <Sparkles className="absolute right-6 top-6 w-5 h-5 text-purple-500/50" />
                 </div>
              </div>
              <button 
                onClick={handleResearch}
                disabled={isResearching || !query}
                className="w-full py-6 rounded-[2rem] bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-[0.4em] text-xs transition-all shadow-[0_0_40px_rgba(168,85,247,0.3)] active:scale-95 flex items-center justify-center gap-4 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                 {isResearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                 {isResearching ? 'REASONING...' : 'INITIATE DEEP DIVE'}
              </button>
           </div>

           <div className="flex-1 bg-black/60 border border-slate-800 rounded-[3rem] p-8 overflow-hidden flex flex-col relative shadow-inner">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                 <Cpu className="w-5 h-5 text-purple-400" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reasoning Chain</span>
              </div>
              
              <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                 {thinkSteps.length === 0 && !isResearching && (
                    <div className="flex flex-col items-center justify-center h-full opacity-20 text-center gap-4">
                       <Network className="w-12 h-12 text-slate-500" />
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Awaiting Neural Input</p>
                    </div>
                 )}
                 {thinkSteps.map((step, i) => (
                   <div key={i} className="flex gap-4 animate-in slide-in-from-left-4 duration-500">
                      <div className="flex flex-col items-center gap-1">
                         <div className={`w-2 h-2 rounded-full ${i === thinkSteps.length - 1 && isResearching ? 'bg-purple-400 animate-pulse' : 'bg-emerald-500'}`}></div>
                         {i < thinkSteps.length - 1 && <div className="w-0.5 h-full bg-slate-800"></div>}
                      </div>
                      <span className={`text-[10px] font-mono uppercase tracking-wide ${i === thinkSteps.length - 1 ? 'text-white' : 'text-slate-500'}`}>{step}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right: Output */}
        <div className="lg:col-span-8 h-full">
           <div className={`h-full bg-slate-900/20 border rounded-[3.5rem] p-12 overflow-y-auto custom-scrollbar relative shadow-2xl transition-all duration-700 ${report ? 'border-emerald-500/20 bg-black/80' : 'border-slate-800'}`}>
              {!report ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10 space-y-8 pointer-events-none">
                    <Globe className="w-64 h-64 text-slate-500 animate-[spin_60s_linear_infinite]" />
                    <p className="text-2xl font-black uppercase tracking-[0.5em] text-slate-500">Intelligence Matrix Idle</p>
                 </div>
              ) : (
                 <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="flex items-center justify-between mb-12 border-b border-emerald-500/20 pb-8">
                       <div className="flex items-center gap-4">
                          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
                             <FileText className="w-8 h-8" />
                          </div>
                          <div>
                             <h3 className="text-xl font-black text-white uppercase tracking-widest">Strategic Report</h3>
                             <p className="text-[10px] text-slate-500 font-mono uppercase mt-1">Generated via Gemini 3.0 Reasoning</p>
                          </div>
                       </div>
                       <ShieldCheck className="w-8 h-8 text-emerald-500" />
                    </div>
                    <div className="prose prose-invert prose-emerald max-w-none">
                       {renderContent(report)}
                    </div>
                    <div className="mt-16 pt-8 border-t border-slate-800 flex justify-center opacity-50">
                       <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.8em]">END OF REPORT</span>
                    </div>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default DeepResearchConsole;
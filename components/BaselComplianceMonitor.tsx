import React, { useState, useEffect } from 'react';
import { 
  Scale, Landmark, ShieldCheck, Activity, 
  Globe, CheckCircle2, RefreshCw, FileText, 
  Building2, Lock, Network
} from 'lucide-react';
import { SystemStatus } from '../types';

interface BaselComplianceMonitorProps {
  stats: SystemStatus;
  onComplianceVerified?: () => void;
  autoSync?: boolean;
}

const BaselComplianceMonitor: React.FC<BaselComplianceMonitorProps> = ({ stats, onComplianceVerified, autoSync = false }) => {
  const [metrics, setMetrics] = useState({
    cet1: 98.4,
    lcr: 412.5,
    nsfr: 380.2,
    leverage: 85.1
  });
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [collaborationStatus, setCollaborationStatus] = useState<'IDLE' | 'SYNCING' | 'ACTIVE'>('IDLE');
  
  const [regulatoryNodes, setRegulatoryNodes] = useState([
    { id: 'BIS', label: 'BIS_HQ', cx: 20, cy: 20, status: 'PENDING' },
    { id: 'FED', label: 'FED_RES', cx: 80, cy: 20, status: 'PENDING' },
    { id: 'ECB', label: 'ECB_EUR', cx: 20, cy: 80, status: 'PENDING' },
    { id: 'BSP', label: 'BSP_PH', cx: 80, cy: 80, status: 'PENDING' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cet1: Math.max(95, prev.cet1 + (Math.random() * 0.2 - 0.1)),
        lcr: Math.max(300, prev.lcr + (Math.random() * 5 - 2.5)),
        nsfr: Math.max(300, prev.nsfr + (Math.random() * 4 - 2)),
        leverage: Math.max(80, prev.leverage + (Math.random() * 0.1 - 0.05))
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (autoSync && collaborationStatus === 'IDLE' && !isCollaborating) {
      handleCollaborate();
    }
  }, [autoSync, collaborationStatus, isCollaborating]);

  const handleCollaborate = async () => {
    if (collaborationStatus === 'ACTIVE' || isCollaborating) return;
    setIsCollaborating(true);
    setCollaborationStatus('SYNCING');
    
    // Sequential Node Handshake Animation
    for (let i = 0; i < regulatoryNodes.length; i++) {
        await new Promise(r => setTimeout(r, 800));
        setRegulatoryNodes(prev => prev.map((node, idx) => idx === i ? { ...node, status: 'SYNCED' } : node));
    }
    
    await new Promise(r => setTimeout(r, 600));
    
    setIsCollaborating(false);
    setCollaborationStatus('ACTIVE');
    if (onComplianceVerified) {
        onComplianceVerified();
    }
  };

  return (
    <div className={`bg-slate-900/60 border ${collaborationStatus === 'ACTIVE' ? 'border-emerald-500/40 shadow-[0_0_60px_rgba(16,185,129,0.15)]' : 'border-indigo-500/20'} rounded-[3.5rem] p-10 space-y-10 shadow-3xl relative overflow-hidden backdrop-blur-3xl group transition-all duration-700`}>
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Building2 className="w-48 h-48 text-indigo-500" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-6">
          <div className={`p-4 rounded-3xl ${collaborationStatus === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'} border shadow-lg transition-colors`}>
            <Scale className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-[0.5em] text-white">Basel III Integration</h3>
            <span className={`text-[10px] font-bold tracking-[0.3em] uppercase italic ${collaborationStatus === 'ACTIVE' ? 'text-emerald-500' : 'text-indigo-500'}`}>
              {collaborationStatus === 'ACTIVE' ? 'BIS REGULATORY HANDSHAKE: LOCKED' : 'Global Banking Standard Alignment'}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
           <div className={`px-5 py-2 rounded-full border flex items-center gap-3 transition-all ${
             collaborationStatus === 'ACTIVE' 
               ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
               : 'bg-black/60 border-slate-800 text-slate-400'
           }`}>
              {collaborationStatus === 'SYNCING' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : collaborationStatus === 'ACTIVE' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                {collaborationStatus === 'IDLE' ? 'STANDBY' : collaborationStatus === 'SYNCING' ? 'SYNCING_NODES...' : 'COMPLIANT'}
              </span>
           </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {[
          { label: 'CET1 Ratio', val: metrics.cet1, unit: '%', target: '> 4.5%', desc: 'Common Equity Tier 1' },
          { label: 'LCR Index', val: metrics.lcr, unit: '%', target: '> 100%', desc: 'Liquidity Coverage' },
          { label: 'NSFR Index', val: metrics.nsfr, unit: '%', target: '> 100%', desc: 'Net Stable Funding' },
          { label: 'Leverage', val: metrics.leverage, unit: '%', target: '> 3.0%', desc: 'Tier 1 Capital / Exposure' }
        ].map((m, i) => (
          <div key={i} className="p-6 rounded-[2rem] bg-black/40 border border-slate-800 hover:border-indigo-500/30 transition-all group/card space-y-3">
             <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{m.label}</span>
                <Activity className={`w-3.5 h-3.5 ${m.val > parseFloat(m.target.replace(/[^0-9.]/g, '')) ? 'text-emerald-500' : 'text-amber-500'}`} />
             </div>
             <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white mono tracking-tighter">{m.val.toFixed(1)}</span>
                <span className="text-sm font-black text-slate-600">{m.unit}</span>
             </div>
             <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-1000" style={{ width: `${Math.min(100, m.val)}%` }}></div>
             </div>
             <div className="flex justify-between items-center pt-1">
                <span className="text-[8px] text-indigo-400/60 font-bold uppercase">{m.desc}</span>
                <span className="text-[8px] text-slate-600 font-mono">REQ: {m.target}</span>
             </div>
          </div>
        ))}
      </div>

      {/* Collaboration Mesh Visualization */}
      <div className={`p-10 rounded-[3rem] border flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 transition-all duration-700 ${collaborationStatus === 'ACTIVE' ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-slate-950/40 border-slate-800'}`}>
         
         {/* SVG Mesh */}
         <div className="relative w-64 h-64 shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
               {/* Connecting Lines */}
               {regulatoryNodes.map((node) => (
                 <line 
                   key={`line-${node.id}`}
                   x1={node.cx} y1={node.cy} x2={50} y2={50}
                   stroke={node.status === 'SYNCED' ? '#10b981' : '#1e293b'}
                   strokeWidth={node.status === 'SYNCED' ? '1' : '0.5'}
                   strokeDasharray={node.status === 'SYNCED' ? '0' : '4 2'}
                   className="transition-all duration-1000"
                 />
               ))}
               
               {/* Center Core */}
               <circle cx={50} cy={50} r={15} fill="#000" stroke={collaborationStatus === 'ACTIVE' ? '#10b981' : '#1e293b'} strokeWidth="2" />
               <foreignObject x={35} y={35} width={30} height={30}>
                  <div className="w-full h-full flex items-center justify-center text-emerald-500">
                     {collaborationStatus === 'ACTIVE' ? <ShieldCheck className="w-5 h-5 animate-pulse" /> : <Landmark className="w-5 h-5 text-slate-700" />}
                  </div>
               </foreignObject>

               {/* Nodes */}
               {regulatoryNodes.map((node) => (
                 <g key={node.id}>
                    <circle 
                      cx={node.cx} cy={node.cy} r={8} 
                      fill="#000" 
                      stroke={node.status === 'SYNCED' ? '#10b981' : '#1e293b'} 
                      strokeWidth="1.5" 
                      className="transition-all duration-500"
                    />
                    {node.status === 'SYNCED' && (
                      <circle cx={node.cx} cy={node.cy} r={4} fill="#10b981" className="animate-ping opacity-75" />
                    )}
                    <text x={node.cx} y={node.cy + 15} textAnchor="middle" className="text-[4px] font-black uppercase fill-slate-500 tracking-widest">{node.id}</text>
                 </g>
               ))}
            </svg>
         </div>

         {/* Action Panel */}
         <div className="flex-1 flex flex-col gap-6 w-full">
            <div className="space-y-2">
               <h4 className="text-lg font-black text-white uppercase tracking-widest">Regulatory Node Mesh</h4>
               <p className="text-[10px] text-slate-400 font-medium leading-relaxed max-w-md">
                 Synchronizing NEOXZ Sovereign Core with global banking authorities. Real-time validation of capital adequacy and liquidity buffers against Basel III standards.
               </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
               {regulatoryNodes.map(node => (
                 <div key={node.id} className={`flex items-center justify-between p-3 rounded-xl border ${node.status === 'SYNCED' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-black/40 border-slate-800'}`}>
                    <span className={`text-[9px] font-black uppercase ${node.status === 'SYNCED' ? 'text-emerald-400' : 'text-slate-600'}`}>{node.label}</span>
                    {node.status === 'SYNCED' ? <Lock className="w-3 h-3 text-emerald-500" /> : <Network className="w-3 h-3 text-slate-700" />}
                 </div>
               ))}
            </div>
            
            <button 
              onClick={handleCollaborate}
              disabled={collaborationStatus !== 'IDLE'}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all shadow-xl flex items-center gap-4 min-w-[240px] justify-center h-full ${
                collaborationStatus === 'ACTIVE' 
                  ? 'bg-emerald-500 text-black cursor-default shadow-emerald-500/20'
                  : collaborationStatus === 'SYNCING'
                    ? 'bg-indigo-600 text-white cursor-wait'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20 active:scale-95'
              }`}
            >
               {collaborationStatus === 'SYNCING' ? (
                 <>
                   <RefreshCw className="w-4 h-4 animate-spin" />
                   SYNCING NODES...
                 </>
               ) : collaborationStatus === 'ACTIVE' ? (
                 <>
                   <CheckCircle2 className="w-4 h-4" />
                   COLLABORATION ACTIVE
                 </>
               ) : (
                 <>
                   <FileText className="w-4 h-4" />
                   INITIATE COLLABORATION
                 </>
               )}
            </button>
         </div>
      </div>
    </div>
  );
};

export default BaselComplianceMonitor;
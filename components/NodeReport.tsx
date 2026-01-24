
import React from 'react';
import { Cpu, Smartphone, Shield, Globe, Database, Mail, Link, Zap, Laptop, Anchor, Landmark, Server, ShieldAlert, Radio, Tablet, CreditCard, Network } from 'lucide-react';
import { DeviceNode } from '../types';

const staticNodes: DeviceNode[] = [
  { name: 'Primary Core Anchor', category: 'MIND', device: 'Master Host', status: 'ACTIVE (Master Node)' },
  { name: 'Secondary Tether', category: 'MIND', device: 'Mobile Link', status: 'ACTIVE (Verified Tether)' },
  { name: 'Orchestrator Hub', category: 'BODY', device: 'Logic space', status: 'LIVE (QLPP/TCP)' },
  { name: 'Sovereign Ledger', category: 'REALITY', device: 'Distributed Mesh', status: 'REGISTERED' },
  { name: 'Institutional Rails', category: 'REALITY', device: 'Financial API', status: 'SYNCED' },
  { name: 'Liquid Core', category: 'CAPITAL', device: 'Vault-001', status: 'SYNCHRONIZED' },
];

interface NodeReportProps {
  localNodeId?: string | null;
}

const NodeReport: React.FC<NodeReportProps> = ({ localNodeId }) => {
  const getIcon = (cat: string) => {
    switch (cat) {
      case 'MIND': return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'BODY': return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'CAPITAL': return <Database className="w-4 h-4 text-yellow-500" />;
      case 'REALITY': return <Globe className="w-4 h-4 text-fuchsia-400" />;
      default: return <Zap className="w-4 h-4 text-slate-400" />;
    }
  };

  const categories = [
    { id: 'MIND', label: 'Identity Anchors', color: 'border-emerald-500/30' },
    { id: 'REALITY', label: 'Global Infrastructure', color: 'border-fuchsia-500/20' },
    { id: 'CAPITAL', label: 'Capital Channels', color: 'border-yellow-500/20' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500">System Topology</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Mesh Sync: 100%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map(cat => (
          <div key={cat.id} className={`p-6 rounded-[2rem] bg-slate-900/30 border ${cat.color} backdrop-blur-xl space-y-5 flex flex-col shadow-2xl`}>
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              {getIcon(cat.id)}
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">{cat.label}</span>
            </div>
            <div className="space-y-3 flex-1">
              {staticNodes.filter(n => n.category === cat.id).map((node, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/30 transition-all group flex flex-col gap-2 relative overflow-hidden">
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[11px] font-black text-slate-100 group-hover:text-emerald-400 transition-colors truncate">{node.name}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[8px] font-mono text-slate-500 truncate max-w-[140px]">{node.device}</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">
                      {node.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodeReport;


import React from 'react';
import { FileText, Heart, Globe, Cpu, ChevronRight, Zap, Boxes } from 'lucide-react';

interface Blueprint {
  id: string;
  name: string;
  amount: number;
  platform: string;
  destination: string;
  type: string;
  description: string;
  icon: React.ReactNode;
}

const blueprints: Blueprint[] = [
  {
    id: 'BP-HUMAN-01',
    name: 'HUMANITARIAN_CORE',
    amount: 500000000,
    platform: 'GLOBAL_MESH_RAILS',
    destination: 'HUMANITY_SOVEREIGN_CORE',
    type: 'HUMANITARIAN',
    description: 'Direct displacement to global poverty alleviation nodes.',
    icon: <Heart className="w-5 h-5 text-rose-400" />
  },
  {
    id: 'BP-INFRA-01',
    name: 'INFRA_REBALANCE',
    amount: 125000000,
    platform: 'SWIFT_PRIMARY',
    destination: 'AWS-GCP-EDGE-NODES',
    type: 'SYSTEMIC',
    description: 'Resource allocation for 4,117 server levels maintenance.',
    icon: <Cpu className="w-5 h-5 text-cyan-400" />
  },
  {
    id: 'BP-RESERVE-01',
    name: 'FOUNDER_DISPLACE',
    amount: 50000,
    platform: 'MAYA_PH_41176',
    destination: 'press.neoxz@gmail.com',
    type: 'PERSONAL',
    description: 'Scheduled reserve disbursement to Founder primary wallet.',
    icon: <Zap className="w-5 h-5 text-amber-400" />
  }
];

interface MandateSubmissionBlueprintsProps {
  onSelect: (bp: Blueprint) => void;
}

const MandateSubmissionBlueprints: React.FC<MandateSubmissionBlueprintsProps> = ({ onSelect }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 px-2">
        <Boxes className="w-4 h-4 text-emerald-500" />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Submission Templates</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blueprints.map((bp) => (
          <button
            key={bp.id}
            onClick={() => onSelect(bp)}
            className="p-5 rounded-[2rem] bg-black/40 border border-slate-800 hover:border-emerald-500/40 transition-all text-left group flex flex-col gap-3 relative overflow-hidden"
          >
            <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-10 transition-opacity">
               <FileText className="w-16 h-16" />
            </div>
            <div className="flex items-center justify-between relative z-10">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-emerald-500/20">
                {bp.icon}
              </div>
              <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-emerald-500" />
            </div>
            <div className="relative z-10">
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest">{bp.name}</h4>
              <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tight mt-1 truncate">{bp.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MandateSubmissionBlueprints;

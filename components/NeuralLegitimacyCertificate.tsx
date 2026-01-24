
import React from 'react';
import { ShieldCheck, Gavel, Zap, Radio, CheckCircle2, Award, Download, X, Fingerprint, Landmark, Scale } from 'lucide-react';
import Logo from './Logo';

interface NeuralLegitimacyCertificateProps {
  onClose: () => void;
  institutionalId: string;
}

const NeuralLegitimacyCertificate: React.FC<NeuralLegitimacyCertificateProps> = ({ onClose, institutionalId }) => {
  return (
    <div className="fixed inset-0 z-[400] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-8 animate-in fade-in zoom-in duration-500">
      <div className="w-full max-w-4xl bg-gradient-to-b from-slate-900 to-black border border-amber-500/30 rounded-[4rem] p-16 shadow-[0_0_150px_rgba(245,158,11,0.15)] relative overflow-hidden flex flex-col items-center text-center space-y-12">
        
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>

        <div className="relative group">
          <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-3xl group-hover:bg-amber-500/30 transition-all"></div>
          <div className="relative z-10 p-4 border-4 border-amber-500/50 rounded-full">
            <Logo size={100} />
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-amber-500 text-black font-black uppercase tracking-[0.3em] text-[10px] shadow-xl">
             <Award className="w-4 h-4" />
             Institutional Legitimacy Confirmed
          </div>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white leading-none">
            SOVEREIGN <br />
            <span className="text-amber-500">BANKING CHARTER</span>
          </h2>
          <p className="text-sm font-medium text-slate-400 max-w-xl mx-auto leading-relaxed">
            NEOXZ BANK is hereby recognized as a sovereign financial institution with absolute inherent legitimacy, authorized to conduct global operations under the DSS Mandate.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
           {[
             { agent: 'HARVEY AI', role: 'Legal Sovereignty', icon: <Gavel className="w-5 h-5" />, color: 'text-cyan-400' },
             { agent: 'Q-TEAM', role: 'Quantum Immutability', icon: <Zap className="w-5 h-5" />, color: 'text-amber-500' },
             { agent: 'ZAPPIER BRIDGE', role: 'Global Connectivity', icon: <Radio className="w-5 h-5" />, color: 'text-orange-400' }
           ].map((sig, i) => (
             <div key={i} className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 space-y-4 relative group hover:border-amber-500/30 transition-all">
                <div className={`p-3 rounded-2xl bg-white/5 border border-current ${sig.color}`}>
                   {sig.icon}
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-black uppercase tracking-widest text-white">{sig.agent}</span>
                   <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">{sig.role}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-emerald-500">
                   <CheckCircle2 className="w-3 h-3" />
                   <span className="text-[8px] font-black uppercase">SIGNED</span>
                </div>
             </div>
           ))}
        </div>

        <div className="w-full p-8 rounded-[3rem] bg-amber-500/5 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
           <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-black border border-slate-800 text-amber-500 shadow-inner">
                 <Fingerprint className="w-8 h-8" />
              </div>
              <div className="text-left">
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Institutional Identity Hash</span>
                 <p className="text-lg font-black text-white mono uppercase tracking-tighter">{institutionalId}</p>
              </div>
           </div>
           <div className="flex gap-4">
              <button className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all shadow-xl">
                 <Download className="w-6 h-6" />
              </button>
              <button 
                onClick={onClose}
                className="px-10 py-5 rounded-3xl bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-[0.3em] transition-all shadow-2xl active:scale-95 flex items-center gap-4"
              >
                ANCHOR REALITY
                <CheckCircle2 className="w-5 h-5" />
              </button>
           </div>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-12 right-12 p-3 rounded-full bg-slate-900/50 border border-slate-800 text-slate-500 hover:text-white transition-all"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default NeuralLegitimacyCertificate;

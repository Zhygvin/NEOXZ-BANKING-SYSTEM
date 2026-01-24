
import React from 'react';
import { Share2, Link, Copy, Check, ExternalLink, GlobeLock, Rocket, ShieldCheck, Eye } from 'lucide-react';

interface Manifest {
  id: string;
  url: string;
  scope: string;
  timestamp: string;
  hash: string;
}

interface SovereignManifestsProps {
  manifests: Manifest[];
  onCopy: (url: string) => void;
  onView: (manifest: Manifest) => void;
  copiedId: string | null;
}

const SovereignManifests: React.FC<SovereignManifestsProps> = ({ manifests, onCopy, onView, copiedId }) => {
  return (
    <div className="bg-slate-900/40 border border-emerald-500/20 rounded-[3rem] p-8 shadow-3xl relative overflow-hidden flex flex-col group backdrop-blur-3xl transition-all hover:border-emerald-500/30">
      <div className="absolute -right-8 -top-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
        <GlobeLock className="w-48 h-48 text-emerald-500" />
      </div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300">Sovereign Manifest Vault</h3>
            <span className="text-[9px] text-emerald-500/60 font-bold uppercase tracking-widest italic">Permanent Reality Links</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {manifests.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-slate-800 rounded-[2rem] opacity-30 flex flex-col items-center gap-4">
             <Link className="w-8 h-8 text-slate-500" />
             <span className="text-[10px] font-black uppercase tracking-widest">No Manifests Generated</span>
          </div>
        ) : (
          manifests.map((manifest) => (
            <div key={manifest.id} className="p-6 rounded-[2rem] bg-slate-950/60 border border-slate-800 hover:border-emerald-500/30 transition-all group/item flex flex-col gap-4 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-emerald-400 mono">{manifest.hash.substring(0, 16)}...</span>
                  <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{manifest.timestamp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-[8px] font-black text-emerald-500 border border-emerald-500/20 uppercase tracking-widest">
                    {manifest.scope.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between gap-4">
                <code className="text-[10px] text-slate-400 font-mono truncate flex-1">{manifest.url}</code>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onView(manifest)}
                    className="p-2 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 transition-all border border-emerald-500/20 flex items-center gap-2 px-3"
                    title="View Manifest Site"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-[9px] font-black uppercase">VIEW</span>
                  </button>
                  <button 
                    onClick={() => onCopy(manifest.url)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 transition-all border border-slate-800"
                    title="Copy Link"
                  >
                    {copiedId === manifest.url ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SovereignManifests;

import React, { useState } from 'react';
import { Rocket, ShieldCheck, Globe, Network, Crown, UploadCloud, CheckCircle2, Lock, ExternalLink, Copy, Check, Eye, Wifi, Loader2, Zap, Smartphone, Cpu } from 'lucide-react';
import Logo from './Logo';

interface ConsortiumPublishingHubProps {
  onPublish: () => void;
  isPublished: boolean;
  stats: any;
  onViewManifest?: (manifest: any) => void;
}

const ConsortiumPublishingHub: React.FC<ConsortiumPublishingHubProps> = ({ onPublish, isPublished, stats, onViewManifest }) => {
  const [manifestUrl] = useState('https://neoxz.sh/manifest/0x7F8E9A0B1C2D3E4F5A6B7C8D9E0F1A2B_v16_PRO');
  const [copied, setCopied] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('Waiting for Signal...');

  const handleCopy = () => {
    navigator.clipboard.writeText(manifestUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleViewInternal = () => {
    if (onViewManifest) {
      onViewManifest({
        url: manifestUrl,
        hash: '0x7F8E9A0B1C2D3E4F5A6B7C8D9E0F1A2B_v16_PRO',
        scope: 'FULL_SOVEREIGNTY',
        timestamp: new Date().toLocaleString()
      });
    }
  };

  const startUploadSequence = async () => {
    if (isPublished || isUploading) return;
    onPublish(); // Delegate to App.tsx for the Master Overlay sequence
  };

  return (
    <div className={`bg-slate-900/60 border ${isPublished ? 'border-emerald-500 shadow-[0_0_80px_rgba(16,185,129,0.25)]' : 'border-indigo-500/30'} rounded-[3.5rem] p-12 space-y-12 shadow-3xl relative overflow-hidden backdrop-blur-3xl group transition-all duration-500`}>
      <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
        <Rocket className={`w-64 h-64 ${isPublished ? 'text-emerald-500 animate-pulse' : 'text-indigo-500'} transition-colors`} />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-8">
          <div className={`p-6 rounded-[2.2rem] ${isPublished ? 'bg-emerald-500 text-black shadow-emerald-500/40' : 'bg-indigo-600 text-white shadow-indigo-500/20'} border-2 border-white/20 shadow-2xl transition-all duration-300`}>
            {isPublished ? <CheckCircle2 className="w-10 h-10 animate-in zoom-in" /> : <UploadCloud className="w-10 h-10 animate-bounce" />}
          </div>
          <div>
            <h3 className="text-3xl font-black uppercase tracking-[0.4em] text-white">Global Distribution Core</h3>
            <span className={`text-[10px] font-bold tracking-[0.5em] uppercase italic ${isPublished ? 'text-emerald-400 glow-emerald' : 'text-indigo-400'}`}>
              {isPublished ? 'ALPHA-16.2.1 CORE PRO: SOVEREIGN MANIFESTED' : 'AWAITING FINAL TECHNOLOGICAL MANDATE'}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
           <div className={`px-6 py-2 rounded-full border-2 transition-all duration-300 flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.4em] ${
             isPublished ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)]' : 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400'
           }`}>
              <ShieldCheck className="w-4 h-4" />
              {isPublished ? 'PRODUCTION_LIVE' : 'STAGING_MODE'}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        <div className="space-y-8">
          <div className={`p-10 rounded-[3rem] bg-black border transition-all duration-300 space-y-6 shadow-inner relative overflow-hidden group/scope ${isPublished ? 'border-emerald-500/30' : 'border-slate-800'}`}>
             <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover/scope:opacity-10 transition-opacity"></div>
             <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Decoupled Node Integrity</span>
                <Globe className={`w-5 h-5 ${isPublished ? 'text-emerald-400 animate-spin-slow' : 'text-indigo-400'}`} />
             </div>
             <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-6">
                   <div className={`p-4 rounded-2xl bg-slate-900 border transition-colors ${isPublished ? 'border-emerald-500/40 text-emerald-400 shadow-lg' : 'border-slate-800 text-indigo-400'}`}>
                      <Network className="w-8 h-8" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-4xl font-black text-white mono">4,117</span>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global Federated Edges Live</span>
                   </div>
                </div>
                {isPublished && (
                  <div className="p-8 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/30 animate-in fade-in slide-in-from-top-2 duration-300 relative group/link">
                     <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                           <Wifi className="w-4 h-4 animate-pulse" />
                           Production Manifest Link
                        </span>
                        <div className="flex gap-2">
                           <button onClick={handleCopy} title="Copy Link" className="p-2 rounded-lg bg-black/40 hover:bg-emerald-500 hover:text-black transition-all border border-emerald-500/30">
                              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                           </button>
                        </div>
                     </div>
                     <div className="w-full p-4 rounded-xl bg-black/60 border border-white/5 text-left truncate">
                        <code className="text-[13px] font-mono text-emerald-300 break-all">{manifestUrl}</code>
                     </div>
                  </div>
                )}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 rounded-[2.5rem] bg-black border border-slate-800 space-y-4 shadow-inner">
                <div className="flex items-center justify-between">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Quantum Rails</span>
                   <Zap className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="text-xl font-black text-white mono uppercase">V4.2.1 ACTIVE</span>
             </div>
             <div className="p-8 rounded-[2.5rem] bg-black border border-slate-800 space-y-4 shadow-inner">
                <div className="flex items-center justify-between">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">AML Overwatch</span>
                   <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="text-xl font-black text-white mono uppercase">SOVEREIGN_STD</span>
             </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 h-full">
           <div className={`flex-1 rounded-[3.5rem] p-12 flex flex-col items-center justify-center text-center space-y-10 border transition-all duration-500 ${isPublished ? 'bg-emerald-500/5 border-emerald-500/30 shadow-inner' : 'bg-indigo-500/5 border-indigo-500/20'}`}>
              <div className="relative scale-110">
                 <div className={`absolute inset-[-60px] rounded-full blur-[80px] opacity-20 animate-pulse ${isPublished ? 'bg-emerald-500' : 'bg-indigo-500'}`}></div>
                 <Logo size={140} className={`relative z-10 ${isUploading ? 'animate-spin-slow' : ''}`} />
                 {isPublished && (
                   <div className="absolute -bottom-6 -right-6 bg-emerald-500 p-5 rounded-[2rem] shadow-2xl z-20 animate-bounce border-4 border-black">
                      <Crown className="w-10 h-10 text-black" />
                   </div>
                 )}
              </div>
              
              <div className="space-y-6 max-w-md">
                 <h4 className="text-4xl font-black text-white uppercase tracking-tighter leading-tight">
                   {isPublished ? 'SYSTEMS DEPLOYED' : 'EXECUTE PRODUCTION'}
                 </h4>
                 <p className="text-sm font-medium text-slate-400 leading-relaxed uppercase tracking-widest opacity-80">
                   {isPublished 
                     ? "The technological mandate is fully distributed. All satellite nodes are issued and decoupled from standard institutional interference."
                     : "Final Technological Mandate required to shift all rails to a production state and distribute the sovereign anchor across all edge nodes."
                   }
                 </p>
              </div>

              {!isPublished && (
                <div className="w-full max-w-sm space-y-6">
                   <button 
                     onClick={startUploadSequence}
                     disabled={isUploading}
                     className={`w-full py-8 rounded-[3rem] font-black uppercase tracking-[0.5em] text-[11px] transition-all shadow-2xl flex items-center justify-center gap-6 bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/40 active:scale-95 group/btn border-2 border-white/10`}
                   >
                     <Zap className="w-6 h-6 group-hover/btn:scale-125 transition-transform" />
                     EXECUTE PRODUCTION SEQUENCE
                   </button>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ConsortiumPublishingHub;
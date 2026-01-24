
import React, { useState, useEffect } from 'react';
import { Globe, Zap, ShieldCheck, MessageSquare, Heart, Share2, Radio, User, ExternalLink, Activity, ArrowRightLeft, Coins } from 'lucide-react';

interface MandateUpdate {
  id: string;
  author: string;
  region: string;
  text: string;
  timestamp: string;
  likes: number;
  isVerified: boolean;
  type: 'MANDATE' | 'STABILIZATION' | 'PROSPERITY' | 'WISE_SETTLEMENT';
}

const ConsortiumSocialFeed: React.FC = () => {
  const [updates, setUpdates] = useState<MandateUpdate[]>([
    {
      id: '1',
      author: 'Global_Alpha_Node',
      region: 'SWITZERLAND',
      text: 'Synchronizing $12.4T in institutional assets to the v16.0 mesh. Parity confirmed.',
      timestamp: '2m ago',
      likes: 842,
      isVerified: true,
      type: 'MANDATE'
    },
    {
      id: 'w-1',
      author: 'Wise_API_Gateway',
      region: 'LONDON, UK',
      text: 'Staged multi-currency payout for NE.B.RU. Routing $50B via Maya-PH-Node at mid-market rate.',
      timestamp: '4m ago',
      likes: 2105,
      isVerified: true,
      type: 'WISE_SETTLEMENT'
    },
    {
      id: '2',
      author: 'Maya_PH_Lead',
      region: 'PHILIPPINES',
      text: 'Regional abundance anchor stable. Distributing prosperity to 411,700 local wallets.',
      timestamp: '5m ago',
      likes: 1205,
      isVerified: true,
      type: 'PROSPERITY'
    }
  ]);

  useEffect(() => {
    const authors = ['Node_X', 'Sovereign_Alpha', 'Core_Propagator', 'Reality_Architect', 'Wise_Bridge_Node'];
    const regions = ['SINGAPORE', 'USA', 'UK', 'JAPAN', 'GERMANY', 'PHILIPPINES'];
    const texts = [
      'SDS manifest signature verified for regional rails.',
      'Stabilizing reality vectors in sector 7-G. Efficiency at 99.9%.',
      'Quantum speed deployment complete for local cloud mesh.',
      'New humanity mandate propagating. 1:1 Value parity locked.',
      'Wise v3.2 Rails confirm instant settlement for capital displacement.',
      'Cross-border vault re-anchored. $485B recovery sequence progressing.'
    ];

    const interval = setInterval(() => {
      const typeRoll = Math.random();
      const type: any = typeRoll > 0.8 ? 'WISE_SETTLEMENT' : typeRoll > 0.5 ? 'MANDATE' : 'STABILIZATION';
      
      const newUpdate: MandateUpdate = {
        id: Math.random().toString(36).substr(2, 6),
        author: authors[Math.floor(Math.random() * authors.length)],
        region: regions[Math.floor(Math.random() * regions.length)],
        text: texts[Math.floor(Math.random() * texts.length)],
        timestamp: 'Just now',
        likes: Math.floor(Math.random() * 100),
        isVerified: Math.random() > 0.3,
        type
      };
      setUpdates(prev => [newUpdate, ...prev].slice(0, 10));
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900/60 border border-indigo-500/20 rounded-[3rem] p-10 space-y-10 shadow-3xl relative overflow-hidden backdrop-blur-3xl group">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <MessageSquare className="w-48 h-48 text-indigo-400" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-5">
          <div className="p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 shadow-lg">
            <Radio className="w-8 h-8 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white">Consortium Global Feed</h3>
            <span className="text-[10px] text-indigo-500 font-bold tracking-widest uppercase italic">LIVE NETWORK ACTIVITY</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <Activity className="w-4 h-4 text-emerald-500 animate-bounce" />
           <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">REAL-TIME BROADCAST</span>
        </div>
      </div>

      <div className="space-y-6 relative z-10 max-h-[500px] overflow-y-auto custom-scrollbar pr-4">
        {updates.map((update) => (
          <div key={update.id} className="p-6 rounded-[2.5rem] bg-black/40 border border-slate-800 hover:border-indigo-500/30 transition-all flex flex-col gap-4 shadow-inner group/post animate-in slide-in-from-right-4">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center ${update.type === 'WISE_SETTLEMENT' ? 'text-cyan-400' : 'text-indigo-400'}`}>
                      {update.type === 'WISE_SETTLEMENT' ? <ArrowRightLeft className="w-5 h-5" /> : <User className="w-5 h-5" />}
                   </div>
                   <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                         <span className="text-xs font-black text-white uppercase tracking-wider">{update.author}</span>
                         {update.isVerified && <ShieldCheck className="w-3 h-3 text-emerald-400" />}
                      </div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{update.region}</span>
                   </div>
                </div>
                <span className="text-[8px] font-mono text-slate-600 uppercase">{update.timestamp}</span>
             </div>

             <p className="text-[12px] text-slate-300 leading-relaxed font-medium pl-2 border-l-2 border-indigo-500/20">
               "{update.text}"
             </p>

             <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-900">
                <div className="flex items-center gap-6">
                   <button className="flex items-center gap-2 text-slate-600 hover:text-rose-500 transition-colors">
                      <Heart className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-black">{update.likes}</span>
                   </button>
                   <button className="flex items-center gap-2 text-slate-600 hover:text-indigo-400 transition-colors">
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-black uppercase">Sync</span>
                   </button>
                </div>
                <div className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                   update.type === 'PROSPERITY' ? 'bg-amber-500/10 text-amber-500' :
                   update.type === 'WISE_SETTLEMENT' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                   update.type === 'MANDATE' ? 'bg-indigo-500/10 text-indigo-400' :
                   'bg-emerald-500/10 text-emerald-400'
                }`}>
                   {update.type.replace('_', ' ')}
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center">
         <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter text-center">
           "The Consortium Global Feed is a direct window into the 4,117 server levels synchronizing the NEOXZ mandate."
         </p>
      </div>
    </div>
  );
};

export default ConsortiumSocialFeed;

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
      id: 'sys-1',
      author: 'NEOXZ_INTERFACE',
      region: 'GLOBAL_CORE',
      text: 'Visual Clarity Protocol Executed. Unnecessary artifacts incinerated. Lightning FX anchored.',
      timestamp: 'Now',
      likes: 9999,
      isVerified: true,
      type: 'MANDATE'
    },
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
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="minimal-card rounded-3xl p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3 text-emerald-500">
          <Activity className="w-4 h-4 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Consortium Live Feed</span>
        </div>
        <span className="text-[9px] font-mono text-slate-500">REAL-TIME</span>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
        {updates.map((update) => (
          <div key={update.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/20 transition-all group animate-in slide-in-from-right-2">
             <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${update.type === 'WISE_SETTLEMENT' ? 'bg-cyan-400' : 'bg-emerald-500'}`}></div>
                   <span className="text-[10px] font-black text-slate-200 uppercase tracking-wide">{update.author}</span>
                   {update.isVerified && <ShieldCheck className="w-3 h-3 text-emerald-500" />}
                </div>
                <span className="text-[8px] font-mono text-slate-600">{update.timestamp}</span>
             </div>

             <p className="text-[10px] text-slate-400 font-medium leading-relaxed group-hover:text-slate-200 transition-colors">
               {update.text}
             </p>

             <div className="flex items-center justify-between mt-3">
                <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{update.region}</span>
                <div className="flex items-center gap-3 text-slate-600">
                   <button className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                      <Heart className="w-3 h-3" />
                      <span className="text-[8px] font-bold">{update.likes}</span>
                   </button>
                   <Share2 className="w-3 h-3 hover:text-white transition-colors cursor-pointer" />
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsortiumSocialFeed;
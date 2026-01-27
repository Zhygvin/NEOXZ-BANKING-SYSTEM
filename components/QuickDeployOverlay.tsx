
import React, { useState } from 'react';
import { 
  Zap, X, ShieldCheck, Landmark, Globe, 
  HandCoins, Heart, Landmark as Bank, 
  UserCheck, ArrowRight, Fingerprint, Loader2, Lock
} from 'lucide-react';

interface QuickDeployOverlayProps {
  balance: number;
  onDeploy: (amount: number, destination: string) => void;
  onClose: () => void;
}

const QuickDeployOverlay: React.FC<QuickDeployOverlayProps> = ({ balance, onDeploy, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [selectedDest, setSelectedDest] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const amounts = [50000, 1000000, 10000000, 100000000];
  const destinations = [
    { id: 'PH_HUB', label: 'PH-MNL-01 Hub', icon: Globe },
    { id: 'HUMAN_CORE', label: 'Humanitarian Core', icon: Heart },
    { id: 'FOUNDER_V', label: 'Founder Reserve', icon: UserCheck }
  ];

  const handleExecute = async () => {
    if (!selectedAmount || !selectedDest) return;
    setIsProcessing(true);
    // Simulate Neural Handshake
    await new Promise(r => setTimeout(r, 1200));
    onDeploy(selectedAmount, selectedDest);
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-[3.5rem] p-12 space-y-10 shadow-[0_0_100px_rgba(245,158,11,0.15)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Zap className="w-64 h-64 text-amber-500" />
        </div>

        <header className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-6">
            <div className="p-4 rounded-3xl bg-amber-500 text-black shadow-xl animate-pulse">
              <Zap className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white leading-none">Quick Deploy</h3>
              <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mt-1">High-Velocity Displacement</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 rounded-2xl bg-black/40 text-slate-500 hover:text-white transition-all border border-slate-800">
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="space-y-8 relative z-10">
          <div className="space-y-4">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Select Deployment Volume</span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setSelectedAmount(amt)}
                  disabled={amt > balance}
                  className={`p-6 rounded-[2rem] border-2 transition-all font-black mono text-xs ${
                    selectedAmount === amt 
                      ? 'bg-amber-500 border-white text-black shadow-xl scale-105' 
                      : 'bg-black border-slate-800 text-slate-400 hover:border-amber-500/30'
                  } disabled:opacity-20 disabled:grayscale`}
                >
                  ${(amt / 1e6).toFixed(amt >= 1e6 ? 1 : 2)}M
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Target Node Anchoring</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {destinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setSelectedDest(dest.id)}
                  className={`p-6 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-3 ${
                    selectedDest === dest.id 
                      ? 'bg-amber-500 border-white text-black shadow-xl scale-105' 
                      : 'bg-black border-slate-800 text-slate-400 hover:border-amber-500/30'
                  }`}
                >
                  <dest.icon className="w-6 h-6" />
                  <span className="text-[9px] font-black uppercase tracking-widest">{dest.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 relative z-10">
          <button 
            onClick={handleExecute}
            disabled={!selectedAmount || !selectedDest || isProcessing}
            className="w-full py-8 rounded-[3rem] bg-white hover:bg-amber-500 text-black font-black uppercase tracking-[0.6em] text-xs transition-all shadow-3xl flex items-center justify-center gap-6 group disabled:opacity-20"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                HANDSHAKING...
              </>
            ) : (
              <>
                <ShieldCheck className="w-6 h-6 group-hover:scale-125 transition-transform" />
                EXECUTE DISPLACEMENT
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>
        </div>

        <footer className="flex items-center justify-center gap-6 pt-4 opacity-40">
           <div className="flex items-center gap-2">
              <Fingerprint className="w-3 h-3 text-amber-500" />
              <span className="text-[8px] font-black uppercase text-slate-500">Identity Tethered</span>
           </div>
           <div className="flex items-center gap-2">
              <Lock className="w-3 h-3 text-amber-500" />
              <span className="text-[8px] font-black uppercase text-slate-500">mTLS Handshake</span>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default QuickDeployOverlay;

import React, { useState, useEffect } from 'react';
import { Rocket, Zap, ShieldCheck, Smartphone, SmartphoneNfc, Monitor, Smartphone as Phone, Microscope, Activity, Play, Cloud } from 'lucide-react';
import Logo from './Logo';
import InstallationGuide from './InstallationGuide';

interface TestingPortalProps {
  onTriggerRipple: (type?: 'STANDARD' | 'DOMINANCE' | 'DEPLOY') => void;
  onRefreshStats: () => void;
  onMasterLaunch?: () => void;
  onCloudInit?: () => void;
}

const TestingPortal: React.FC<TestingPortalProps> = ({ onTriggerRipple, onRefreshStats, onMasterLaunch, onCloudInit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
      setIsOpen(false);
    } else {
      setShowGuide(true);
      setIsOpen(false);
    }
  };

  const handleSelfTest = () => {
    onTriggerRipple('DEPLOY');
    onRefreshStats();
    const body = document.body;
    body.classList.add('reality-glitch');
    setTimeout(() => body.classList.remove('reality-glitch'), 500);
  };

  return (
    <>
      {showGuide && <InstallationGuide onClose={() => setShowGuide(false)} />}
      
      <div className="fixed bottom-12 right-12 z-[250] flex flex-col items-end gap-6">
        {isOpen && (
          <div className="flex flex-col gap-4 mb-2 animate-in slide-in-from-bottom-8 fade-in duration-300">
            <button
              onClick={handleInstallClick}
              className={`group flex items-center gap-4 pr-6 pl-3 py-3 rounded-2xl border backdrop-blur-xl transition-all shadow-2xl ${
                deferredPrompt 
                  ? 'bg-emerald-600 border-emerald-400 hover:bg-emerald-500' 
                  : 'bg-indigo-600 border-indigo-400 hover:bg-indigo-500'
              }`}
            >
              <div className={`p-2 rounded-xl bg-white group-hover:scale-110 transition-transform ${
                deferredPrompt ? 'text-emerald-600' : 'text-indigo-600'
              }`}>
                {deferredPrompt ? <SmartphoneNfc className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                {deferredPrompt ? 'PHYSICAL TETHER' : 'INSTALL UTILITY'}
              </span>
            </button>
            
            <button
              onClick={() => {
                onMasterLaunch?.();
                setIsOpen(false);
              }}
              className="group flex items-center gap-4 pr-6 pl-3 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 border border-emerald-400 backdrop-blur-xl hover:scale-105 transition-all shadow-2xl"
            >
              <div className="p-2 rounded-xl bg-white text-emerald-600 group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">MASTER LAUNCH</span>
            </button>

            {[
              { icon: <Activity className="w-4 h-4" />, label: 'Efficiency Audit', action: () => handleSelfTest(), color: 'bg-cyan-500' },
              { icon: <Zap className="w-4 h-4" />, label: 'Standard Pulse', action: () => onTriggerRipple('STANDARD'), color: 'bg-emerald-500' },
              { icon: <ShieldCheck className="w-4 h-4" />, label: 'Dominance Ripple', action: () => onTriggerRipple('DOMINANCE'), color: 'bg-cyan-500' },
              { icon: <Rocket className="w-4 h-4" />, label: 'Deploy Sequence', action: () => handleSelfTest(), color: 'bg-white' },
              { icon: <Cloud className="w-4 h-4" />, label: 'Cloud Init', action: () => onCloudInit?.(), color: 'bg-blue-500' }
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                className="group flex items-center gap-4 pr-6 pl-3 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl hover:border-emerald-500/50 transition-all shadow-2xl"
              >
                <div className={`p-2 rounded-xl ${item.color} text-black group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">{item.label}</span>
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative group p-4 rounded-3xl bg-black/80 border-2 transition-all duration-500 shadow-3xl backdrop-blur-2xl ${
            isOpen ? 'border-emerald-500 rotate-90' : 'border-slate-800 hover:border-emerald-500/50'
          }`}
        >
          <div className="absolute inset-0 bg-emerald-500/20 rounded-3xl blur-2xl group-hover:opacity-100 opacity-0 transition-opacity animate-pulse"></div>
          <div className="relative z-10">
            <Logo size={48} className={isOpen ? 'scale-110' : 'group-hover:scale-110 transition-transform'} />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-black animate-pulse"></div>
        </button>

        {!isOpen && (
          <div className="absolute right-24 top-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-black uppercase tracking-widest text-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none whitespace-nowrap shadow-2xl">
            Reality Anchor
          </div>
        )}
      </div>
    </>
  );
};

export default TestingPortal;
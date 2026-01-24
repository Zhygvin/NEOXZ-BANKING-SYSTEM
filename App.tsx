import React, { useState } from 'react';
import { 
  Zap, UserCheck, BarChart3, Satellite, ShieldAlert, Activity
} from 'lucide-react';
import Assistant from './components/Assistant.tsx';
import Logo from './components/Logo.tsx';
import SovereignSubscriptionOverlay from './components/SovereignSubscriptionOverlay.tsx';
import ApiKeySetup from './components/ApiKeySetup.tsx';
import ConsortiumMasterHub from './components/ConsortiumMasterHub.tsx';
import QuickDeployOverlay from './components/QuickDeployOverlay.tsx';
import PublishedWatermark from './components/PublishedWatermark.tsx';

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(() => localStorage.getItem('neoxz_mandate_anchored') === 'true');
  const [showQuickDeploy, setShowQuickDeploy] = useState(false);
  const [subscriberData, setSubscriberData] = useState(() => {
    const saved = localStorage.getItem('neoxz_sovereign_identity');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'NODE' | 'FORENSICS'>('DASHBOARD');
  const [dashboardView, setDashboardView] = useState<'OVERVIEW' | 'INGESTION'>('OVERVIEW');
  
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('neoxz_satellite_balance');
    return savedBalance ? parseFloat(savedBalance) : (subscriberData ? 55.00 : 0.00);
  });

  const triggerQuantumSparks = () => {
    const sparks = document.getElementById('sparks-fx');
    const discharge = document.getElementById('discharge-fx');
    
    sparks?.classList.remove('sparks-active');
    discharge?.classList.remove('discharge-active');
    
    // Void reflow
    void sparks?.offsetWidth;
    void discharge?.offsetWidth;
    
    sparks?.classList.add('sparks-active');
    discharge?.classList.add('discharge-active');
  };

  const handleQuickDeploy = (amount: number, destination: string) => {
    setBalance(prev => prev - amount);
    localStorage.setItem('neoxz_satellite_balance', (balance - amount).toString());
    setShowQuickDeploy(false);
    triggerQuantumSparks();
  };

  const handleSubscription = (data: any) => {
    localStorage.setItem('neoxz_sovereign_identity', JSON.stringify(data));
    setSubscriberData(data);
    setBalance(55.00);
    triggerQuantumSparks();
  };

  if (!isAuthorized) {
    return <ApiKeySetup onSuccess={() => setIsAuthorized(true)} />;
  }

  if (!subscriberData) {
    return <SovereignSubscriptionOverlay onComplete={handleSubscription} />;
  }

  return (
    <div className="flex h-screen w-full bg-black text-slate-100 overflow-hidden font-sans">
      {showQuickDeploy && (
        <QuickDeployOverlay 
          balance={balance} 
          onDeploy={handleQuickDeploy} 
          onClose={() => setShowQuickDeploy(false)} 
        />
      )}

      {/* Extreme Minimal Sidebar */}
      <aside className="w-24 border-r border-white/5 flex flex-col items-center py-12 z-50 bg-black">
        <Logo size={40} className="mb-20" />
        <nav className="flex flex-col gap-12">
           {[
             { id: 'DASHBOARD', icon: BarChart3 },
             { id: 'NODE', icon: Satellite },
             { id: 'FORENSICS', icon: ShieldAlert }
           ].map(item => (
             <button
               key={item.id}
               onClick={() => { setActiveTab(item.id as any); triggerQuantumSparks(); }}
               className={`p-4 rounded-2xl transition-all duration-300 ${activeTab === item.id ? 'text-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'text-slate-800 hover:text-white'}`}
             >
               <item.icon className="w-6 h-6" />
             </button>
           ))}
        </nav>
      </aside>

      {/* Dashboard View */}
      <main className="flex-1 flex flex-col overflow-hidden bg-black">
        <header className="h-28 border-b border-white/5 flex items-center justify-between px-16 z-40">
           <div className="flex items-center gap-6">
              <UserCheck className="w-6 h-6 text-emerald-400" />
              <span className="text-sm font-black text-white uppercase tracking-[0.4em]">{subscriberData.legalName}</span>
           </div>
           
           <div className="flex items-center gap-16">
              <div className="text-right">
                 <span className="text-[10px] text-slate-700 font-black uppercase tracking-widest">Liquid Reserve</span>
                 <p className="text-4xl font-black text-white mono glow-text">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>
              
              <button 
                onClick={() => setShowQuickDeploy(true)}
                className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:scale-105 hover:bg-emerald-500 hover:text-black transition-all group"
              >
                 <Zap className="w-6 h-6" />
              </button>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-16 custom-scrollbar">
           {activeTab === 'DASHBOARD' && (
             <ConsortiumMasterHub 
               stats={{ 
                 neoxzBankCapital: 985004531802, 
                 realityParity: 1.0, 
                 threatLevel: 'LOW'
               } as any}
               activeView={dashboardView}
               onViewChange={setDashboardView}
             />
           )}
           {activeTab !== 'DASHBOARD' && (
             <div className="flex flex-col items-center justify-center h-full opacity-20 space-y-10">
                <Activity className="w-32 h-32 text-slate-700" />
                <p className="text-4xl font-black uppercase tracking-[1.5em] text-slate-800">Off_Line</p>
             </div>
           )}
        </div>
      </main>

      {/* MASSIVE COMMAND AREA (45% Width) */}
      <aside className="w-[45%] z-30">
        <Assistant />
      </aside>

      <PublishedWatermark />
    </div>
  );
};

export default App;
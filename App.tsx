
import React, { useState } from 'react';
import { 
  Zap, UserCheck, BarChart3, Satellite, ShieldAlert, Activity, History
} from 'lucide-react';
import Assistant from './components/Assistant.tsx';
import Logo from './components/Logo.tsx';
import SovereignSubscriptionOverlay from './components/SovereignSubscriptionOverlay.tsx';
import ApiKeySetup from './components/ApiKeySetup.tsx';
import ConsortiumMasterHub from './components/ConsortiumMasterHub.tsx';
import ProtocolHistory from './components/ProtocolHistory.tsx';
import QuickDeployOverlay from './components/QuickDeployOverlay.tsx';
import PublishedWatermark from './components/PublishedWatermark.tsx';
import { HistoryItem } from './types';

const mockHistory: HistoryItem[] = [
  {
    id: 'MND-842-1',
    timestamp: '2025-05-20 14:02:11',
    status: 'MANIFESTED',
    priority: 'SOVEREIGN',
    attribution: 'FOUNDER_CORE',
    payload: {
      intent: 'Initialize Global Prosperity',
      dataPayload: 'ACTION: ACTIVATE_RAILS | TARGET: PH_MNL_01 | VAL: $985B'
    },
    executionSteps: [
      { label: 'DSS Verification', detail: 'Identity parity verified at 1.0000', timestamp: '14:02:11', status: 'SUCCESS' },
      { label: 'mTLS Handshake', detail: 'Wise production tunnel established', timestamp: '14:02:12', status: 'SUCCESS' }
    ]
  },
  {
    id: 'MND-842-2',
    timestamp: '2025-05-20 14:15:33',
    status: 'ENFORCED',
    priority: 'CRITICAL',
    attribution: 'Q_TEAM_FORENSICS',
    payload: {
      intent: 'Isolate Malicious Vector',
      dataPayload: 'ACTION: NULL_ROUTE | TARGET: 103.21.244.10 | SEVERITY: HIGH'
    },
    executionSteps: [
      { label: 'Trace Signal', detail: 'Target IP triangulated to region SG', timestamp: '14:15:33', status: 'SUCCESS' },
      { label: 'Sanction Lock', detail: 'Credential incineration complete', timestamp: '14:15:35', status: 'SUCCESS' }
    ]
  },
  {
    id: 'MND-842-3',
    timestamp: '2025-05-20 14:22:05',
    status: 'QUANTUM_SYNCED',
    priority: 'STANDARD',
    attribution: 'MAYA_BRIDGE',
    payload: {
      intent: 'Daily Asset Rebalancing',
      dataPayload: 'ACTION: SHIFT_LIQUIDITY | FROM: USD_CORE | TO: PHP_VAULT'
    },
    executionSteps: [
      { label: 'Compute Route', detail: 'Optimal displacement vector calculated', timestamp: '14:22:05', status: 'SUCCESS' }
    ]
  },
  {
    id: 'MND-842-4',
    timestamp: '2025-05-20 14:30:10',
    status: 'ERROR',
    priority: 'ELEVATED',
    attribution: 'ZAPPIER_HANDSHAKE',
    payload: {
      intent: 'External API Sync',
      dataPayload: 'ACTION: FETCH_EXTERNAL_LEDGER | SOURCE: SAP_PROD'
    },
    errorMessage: 'Handshake timeout: External peer SAP_PROD is unresponsive.',
    executionSteps: [
      { label: 'INIT_SYNC', detail: 'Negotiating REST protocol...', timestamp: '14:30:10', status: 'ERROR' }
    ]
  }
];

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(() => localStorage.getItem('neoxz_mandate_anchored') === 'true');
  const [showQuickDeploy, setShowQuickDeploy] = useState(false);
  const [subscriberData, setSubscriberData] = useState(() => {
    const saved = localStorage.getItem('neoxz_sovereign_identity');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'NODE' | 'FORENSICS' | 'HISTORY'>('DASHBOARD');
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
             { id: 'FORENSICS', icon: ShieldAlert },
             { id: 'HISTORY', icon: History }
           ].map(item => (
             <button
               key={item.id}
               onClick={() => { setActiveTab(item.id as any); triggerQuantumSparks(); }}
               className={`p-4 rounded-2xl transition-all duration-300 ${activeTab === item.id ? 'text-emerald-400 bg-emerald-500/10 shadow-[0_0_200px_rgba(16,185,129,0.2)]' : 'text-slate-800 hover:text-white'}`}
             >
               <item.icon className="w-6 h-6" />
             </button>
           ))}
        </nav>
      </aside>

      {/* Main Content View */}
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
           {activeTab === 'HISTORY' && (
             <div className="h-full">
               <ProtocolHistory history={mockHistory} />
             </div>
           )}
           {(activeTab === 'NODE' || activeTab === 'FORENSICS') && (
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

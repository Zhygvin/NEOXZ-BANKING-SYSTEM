
import React, { useState, useEffect } from 'react';
import { 
  Zap, UserCheck, BarChart3, Satellite, ShieldCheck, Activity, BrainCircuit, WalletCards, Leaf, Cloud, Command, ListChecks, Bell, Lock, RefreshCw, Unlock, Rocket
} from 'lucide-react';
import Assistant from './components/Assistant.tsx';
import Logo from './components/Logo.tsx';
import SovereignSubscriptionOverlay from './components/SovereignSubscriptionOverlay.tsx';
import ApiKeySetup from './components/ApiKeySetup.tsx';
import ConsortiumMasterHub from './components/ConsortiumMasterHub.tsx';
import QuickDeployOverlay from './components/QuickDeployOverlay.tsx';
import PublishedWatermark from './components/PublishedWatermark.tsx';
import ThreatForensics from './components/ThreatForensics.tsx';
import DeepResearchConsole from './components/DeepResearchConsole.tsx';
import DigitalAssetIssuer from './components/DigitalAssetIssuer.tsx';
import SustainabilityDashboard from './components/SustainabilityDashboard.tsx';
import IAMPolicyManager from './components/IAMPolicyManager.tsx';
import ProtocolManager from './components/ProtocolManager.tsx';
import ConsortiumPublishingHub from './components/ConsortiumPublishingHub.tsx';
import MasterAutomationOverlay from './components/MasterAutomationOverlay.tsx';
import UserProfileOverlay from './components/UserProfileOverlay.tsx';
import IntegrationAttestationOverlay from './components/IntegrationAttestationOverlay.tsx';
import LightWebManager from './components/LightWebManager.tsx';
import { SecurityLayer } from './components/SecurityLayer.tsx';

const UserAvatar = ({ name, email, onClick }: { name: string; email: string; onClick: () => void }) => {
  const initials = name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'NB';

  return (
    <div className="flex items-center gap-4 pl-6 border-l border-white/10" onClick={onClick}>
      <div className="text-right hidden md:block">
        <div className="text-[10px] font-black text-white uppercase tracking-wider">{name}</div>
        <div className="text-[8px] font-medium text-amber-500 uppercase tracking-widest">{email}</div>
      </div>
      <div className="relative group cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-slate-900 border border-amber-500/50 flex items-center justify-center text-[10px] font-black text-amber-500 hover:bg-amber-500/10 transition-all shadow-lg overflow-hidden">
          {initials}
        </div>
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-black rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(() => localStorage.getItem('neoxz_mandate_anchored') === 'true');
  const [showQuickDeploy, setShowQuickDeploy] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  // Initialize from localStorage or null
  const [subscriberData, setSubscriberData] = useState<any>(() => {
    const saved = localStorage.getItem('neoxz_sovereign_identity');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'PROTOCOLS' | 'CLOUD' | 'ASSETS' | 'SUSTAINABILITY' | 'FORENSICS' | 'RESEARCH' | 'DEPLOY'>('DASHBOARD');
  const [dashboardView, setDashboardView] = useState<'OVERVIEW' | 'INGESTION'>('OVERVIEW');
  const [threatLevel, setThreatLevel] = useState<'LOW' | 'ELEVATED' | 'CRITICAL'>('ELEVATED');
  const [coreImmutability, setCoreImmutability] = useState<'LOCKED' | 'SYNCING' | 'DEVIATION_DETECTED'>('LOCKED');
  const [isDeployed, setIsDeployed] = useState(() => localStorage.getItem('neoxz_deployed') === 'true');
  const [showMasterDeployment, setShowMasterDeployment] = useState(false);
  const [showAttestation, setShowAttestation] = useState(false);
  
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('neoxz_satellite_balance');
    return savedBalance ? parseFloat(savedBalance) : 985004531802.00; // Default to full core mandate
  });

  // Construct System Context for AI Awareness
  const systemContext = {
    activeTab,
    dashboardView,
    threatLevel,
    coreImmutability,
    balance: balance.toLocaleString(),
    subscriberName: subscriberData?.legalName || "Neil Rubio Balog (NE.B.RU)",
    subscriberEmail: subscriberData?.email || "press.neoxz@gmail.com",
    subscriberRegion: subscriberData?.region || "Philippines",
    isAuthorized,
    isDeployed,
    activeAlerts: threatLevel === 'CRITICAL' ? ['CRITICAL_THREAT_DETECTED', 'FORENSIC_LOCK_ENGAGED'] : [],
    businessIntegration: {
      provider: 'Google Pay Business',
      merchantId: 'BCR2DN4TU7BMDMDU',
      issuerId: '3388000000023071477',
      consoleUrl: 'https://pay.google.com/business/console/payment/BCR2DN4TU7BMDMDU',
      gatewayResponse: 'https://www.sh-pay.com/pay/response/',
      status: 'VERIFIED_MERCHANT'
    }
  };

  const triggerLightning = () => {
    const el = document.getElementById('lightning-fx');
    if (el) {
      el.className = 'lightning-flash';
      setTimeout(() => el.className = '', 500);
    }
  };

  // Security Middleware for Sensitive Actions
  const executeSecureAction = (actionName: string, action: () => void) => {
    if (coreImmutability === 'DEVIATION_DETECTED' || threatLevel === 'CRITICAL') {
      console.error(`[SECURITY BLOCK] ${actionName} prevented due to system lockdown.`);
      return;
    }
    action();
  };

  const handleQuickDeploy = (amount: number, destination: string) => {
    executeSecureAction('Quick Deploy', () => {
      setBalance(prev => prev - amount);
      localStorage.setItem('neoxz_satellite_balance', (balance - amount).toString());
      setShowQuickDeploy(false);
      triggerLightning();
    });
  };

  const handleSubscription = (data: any) => {
    // Respect user input/verified data
    const newIdentity = data || {
      legalName: "Neil Rubio Balog",
      alias: "NE.B.RU",
      email: "press.neoxz@gmail.com",
      region: "Philippines"
    };
    
    setSubscriberData(newIdentity);
    localStorage.setItem('neoxz_sovereign_identity', JSON.stringify(newIdentity));
    triggerLightning();
  };

  const handleUpdateProfile = (updatedData: any) => {
    const mergedData = { ...subscriberData, ...updatedData };
    setSubscriberData(mergedData);
    localStorage.setItem('neoxz_sovereign_identity', JSON.stringify(mergedData));
    setShowProfile(false);
    triggerLightning();
  };

  const handleDeploymentComplete = () => {
    setIsDeployed(true);
    localStorage.setItem('neoxz_deployed', 'true');
    setShowMasterDeployment(false);
    triggerLightning();
  };

  const handleAttestationComplete = () => {
    setShowAttestation(false);
    triggerLightning();
  };

  const getImmutabilityConfig = () => {
    switch (coreImmutability) {
      case 'LOCKED':
        return { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: Lock, label: 'CORE_IMMUTABLE' };
      case 'SYNCING':
        return { color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: RefreshCw, label: 'SYNCING_HASH', animate: true };
      case 'DEVIATION_DETECTED':
        return { color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', icon: Unlock, label: 'CORE_DRIFT' };
      default:
        return { color: 'text-slate-400', icon: Lock, label: 'UNKNOWN' };
    }
  };

  const immutabilityConfig = getImmutabilityConfig();
  const globalStats = { neoxzBankCapital: balance, realityParity: 1.0, threatLevel, coreImmutability, activeProtocols: 4117 };

  if (!isAuthorized) return <ApiKeySetup onSuccess={() => setIsAuthorized(true)} />;
  if (!subscriberData) return <SovereignSubscriptionOverlay onComplete={handleSubscription} />;
  
  return (
    <SecurityLayer threatLevel={threatLevel} coreImmutability={coreImmutability}>
      <div className="flex h-screen w-full bg-black text-slate-200 overflow-hidden font-sans">
        {showQuickDeploy && (
          <QuickDeployOverlay balance={balance} onDeploy={handleQuickDeploy} onClose={() => setShowQuickDeploy(false)} />
        )}

        {showMasterDeployment && (
          <MasterAutomationOverlay onComplete={handleDeploymentComplete} />
        )}

        {showAttestation && (
          <IntegrationAttestationOverlay 
            merchantId="BCR2DN4TU7BMDMDU" 
            onComplete={handleAttestationComplete} 
          />
        )}

        {showProfile && (
          <UserProfileOverlay 
            initialData={{
              legalName: subscriberData.legalName,
              email: subscriberData.email,
              region: subscriberData.region
            }}
            onSave={handleUpdateProfile}
            onClose={() => setShowProfile(false)}
          />
        )}

        {/* Ultra Minimal Sidebar */}
        <aside className="w-16 flex flex-col items-center py-8 z-50 bg-black/50 backdrop-blur-sm border-r border-white/5">
          <div className="mb-12 opacity-80 hover:opacity-100 transition-opacity">
             <Logo size={28} />
          </div>
          <nav className="flex flex-col gap-8">
             {[
               { id: 'DASHBOARD', icon: BarChart3 },
               { id: 'PROTOCOLS', icon: ListChecks },
               { id: 'CLOUD', icon: Cloud },
               { id: 'ASSETS', icon: WalletCards },
               { id: 'SUSTAINABILITY', icon: Leaf },
               { id: 'FORENSICS', icon: ShieldCheck },
               { id: 'RESEARCH', icon: BrainCircuit },
               { id: 'DEPLOY', icon: Rocket }
             ].map(item => (
               <button
                 key={item.id}
                 onClick={() => { setActiveTab(item.id as any); triggerLightning(); }}
                 className={`p-2 rounded-lg transition-all duration-300 ${activeTab === item.id ? 'text-emerald-400' : 'text-slate-600 hover:text-white'}`}
                 title={item.id}
               >
                 <item.icon className="w-5 h-5" />
               </button>
             ))}
          </nav>
          <div className="mt-auto">
             <div className={`w-1.5 h-1.5 rounded-full ${threatLevel === 'CRITICAL' ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'} mx-auto`} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Header */}
          <header className="h-20 flex items-center justify-between px-8 z-40 border-b border-white/5 bg-black/40 backdrop-blur-sm">
             <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{activeTab} VIEW</span>
                <span className="text-slate-700">/</span>
                <span className="text-[10px] font-mono text-emerald-500/80 tracking-wider">MANDATE_V16.2.1</span>
                
                <div className="h-4 w-[1px] bg-slate-800 mx-2 hidden md:block"></div>
                
                <div className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${immutabilityConfig.color}`}>
                   <immutabilityConfig.icon className={`w-3 h-3 ${immutabilityConfig.animate ? 'animate-spin' : ''}`} />
                   <span className="text-[9px] font-black uppercase tracking-widest">{immutabilityConfig.label}</span>
                </div>
             </div>
             
             <div className="flex items-center gap-6">
                <div className="text-right flex flex-col items-end">
                   <p className="text-sm font-black text-white mono tracking-tight leading-none">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                   <span className="text-[8px] text-emerald-500/50 font-black uppercase tracking-widest mt-1">LIQUID RESERVE</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2.5 text-slate-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-xl border border-white/5"
                    title="Notifications"
                  >
                     <Bell className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setShowQuickDeploy(true)}
                    className="p-2.5 text-emerald-400 hover:text-white transition-colors bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl border border-emerald-500/20"
                    title="Quick Deploy"
                  >
                     <Zap className="w-4 h-4" />
                  </button>
                </div>

                <UserAvatar 
                  name={subscriberData.legalName} 
                  email={subscriberData.alias} 
                  onClick={() => setShowProfile(true)}
                />
             </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
             {activeTab === 'DASHBOARD' && (
               <ConsortiumMasterHub 
                 stats={globalStats as any}
                 activeView={dashboardView}
                 onViewChange={setDashboardView}
                 onTriggerAttestation={() => setShowAttestation(true)}
               />
             )}
             {activeTab === 'PROTOCOLS' && (
               <div className="space-y-12">
                 <ProtocolManager />
                 <div className="border-t border-slate-800 pt-8">
                   <LightWebManager stats={globalStats as any} />
                 </div>
               </div>
             )}
             {activeTab === 'CLOUD' && <IAMPolicyManager />}
             {activeTab === 'ASSETS' && <DigitalAssetIssuer />}
             {activeTab === 'SUSTAINABILITY' && <SustainabilityDashboard />}
             {activeTab === 'FORENSICS' && (
               <ThreatForensics 
                 stats={globalStats as any}
                 onSimulateThreat={setThreatLevel}
               />
             )}
             {activeTab === 'RESEARCH' && <DeepResearchConsole />}
             {activeTab === 'DEPLOY' && (
               <ConsortiumPublishingHub 
                 onPublish={() => setShowMasterDeployment(true)}
                 isPublished={isDeployed}
                 stats={globalStats as any}
               />
             )}
          </div>
        </main>

        {/* Command Panel */}
        <aside className="w-[400px] border-l border-white/5 bg-black/40 backdrop-blur-md z-30 hidden xl:block">
          <Assistant systemContext={systemContext} />
        </aside>

        <PublishedWatermark />
      </div>
    </SecurityLayer>
  );
};

export default App;

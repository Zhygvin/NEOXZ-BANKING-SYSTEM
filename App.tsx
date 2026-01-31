import React, { useState, useEffect } from 'react';
import { 
  Zap, UserCheck, BarChart3, Satellite, ShieldCheck, Activity, BrainCircuit, WalletCards, Leaf, Cloud, Command, ListChecks, Bell, Lock, RefreshCw, Unlock, Rocket, ShieldAlert, Cpu, HeartHandshake, Mic, CloudLightning, Landmark, Star, Crown, Infinity
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
import CloudflareTunnelOverlay from './components/CloudflareTunnelOverlay.tsx';
import QuantumCommandCenter from './components/QuantumCommandCenter.tsx';
import QuantumBankHandshake from './components/QuantumBankHandshake.tsx';
import QuantumDirectiveExecution from './components/QuantumDirectiveExecution.tsx';
import CommandCoreInitialization from './components/CommandCoreInitialization.tsx';
import VertexTuningOverlay from './components/VertexTuningOverlay.tsx';
import QuantumSpeedOverlay from './components/QuantumSpeedOverlay.tsx';
import NEOXZBankCommandCenter from './components/NEOXZBankCommandCenter.tsx';
import QuantumUpgradeOverlay from './components/QuantumUpgradeOverlay.tsx';
import { SecurityLayer } from './components/SecurityLayer.tsx';

const UserAvatar = ({ name, email, onClick }: { name: string; email: string; onClick: () => void }) => {
  const initials = name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'NB';

  return (
    <div className="flex items-center gap-4 pl-6 border-l border-white/10 cursor-pointer group" onClick={onClick}>
      <div className="text-right hidden md:block">
        <div className="text-[10px] font-black text-white uppercase tracking-wider group-hover:text-amber-400 transition-colors">{name}</div>
        <div className="text-[8px] font-medium text-amber-500 uppercase tracking-widest">{email}</div>
      </div>
      <div className="relative group border-2 border-transparent hover:border-amber-500/50 rounded-full transition-all p-0.5">
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
  
  const [activeTab, setActiveTab] = useState<'COMMAND' | 'BANK' | 'DASHBOARD' | 'PROTOCOLS' | 'CLOUD' | 'ASSETS' | 'SUSTAINABILITY' | 'FORENSICS' | 'RESEARCH' | 'DEPLOY'>('COMMAND');
  const [dashboardView, setDashboardView] = useState<'OVERVIEW' | 'INGESTION'>('OVERVIEW');
  const [threatLevel, setThreatLevel] = useState<'LOW' | 'ELEVATED' | 'CRITICAL'>('ELEVATED');
  const [coreImmutability, setCoreImmutability] = useState<'LOCKED' | 'SYNCING' | 'DEVIATION_DETECTED'>('LOCKED');
  const [isDeployed, setIsDeployed] = useState(() => localStorage.getItem('neoxz_deployed') === 'true');
  const [isSingularity, setIsSingularity] = useState(() => localStorage.getItem('neoxz_singularity') === 'true');

  const [showMasterDeployment, setShowMasterDeployment] = useState(false);
  const [showQuantumSpeed, setShowQuantumSpeed] = useState(false);
  const [showQuantumUpgrade, setShowQuantumUpgrade] = useState(false);
  const [showBankHandshake, setShowBankHandshake] = useState(false);
  const [showCoreInit, setShowCoreInit] = useState(false);
  const [showVertexTuning, setShowVertexTuning] = useState(false);
  const [activeDirective, setActiveDirective] = useState<string | null>(null);
  const [showAttestation, setShowAttestation] = useState(false);
  const [showCloudflareTunnel, setShowCloudflareTunnel] = useState(false);
  const [isTunnelActive, setIsTunnelActive] = useState(false);
  const [showAssistantSidebar, setShowAssistantSidebar] = useState(true);
  
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('neoxz_satellite_balance');
    return savedBalance ? parseFloat(savedBalance) : 985004531802.00; 
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
    isSingularity,
    activeAlerts: threatLevel === 'CRITICAL' ? ['CRITICAL_THREAT_DETECTED', 'FORENSIC_LOCK_ENGAGED'] : [],
    isTunnelActive,
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

  // Dispatch commands from Assistant
  const handleAssistantCommand = (cmd: string) => {
    if (cmd === 'BANK_HANDSHAKE') {
      setShowBankHandshake(true);
    } else if (cmd === 'BANK_CORE') {
      setShowBankHandshake(true);
    } else if (cmd === 'CORE_INIT') {
      setShowCoreInit(true);
    } else if (cmd === 'VERTEX_TUNING') {
      setShowVertexTuning(true);
    } else if (cmd === 'QUANTUM_SPEED') {
      setShowQuantumSpeed(true);
    } else if (cmd === 'QUANTUM_UPGRADE') {
      setShowQuantumUpgrade(true);
    } else if (cmd.startsWith('DIRECTIVE_')) {
      const directiveName = cmd.replace('DIRECTIVE_', '');
      setActiveDirective(directiveName);
    } else if (cmd === 'MASTER_DEPLOYMENT') {
      setShowMasterDeployment(true);
    } else if (cmd === 'ATTESTATION') {
      setShowAttestation(true);
    } else if (cmd === 'OPEN_TUNNEL') {
      setShowCloudflareTunnel(true);
    } else if (cmd === 'VISUAL_CLARITY') {
      triggerLightning();
    }
    triggerLightning();
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

  const handleQuantumSpeedComplete = () => {
    setIsDeployed(true);
    setIsSingularity(true);
    localStorage.setItem('neoxz_deployed', 'true');
    localStorage.setItem('neoxz_singularity', 'true');
    setShowQuantumSpeed(false);
    setActiveTab('COMMAND'); // Move to Command Hub after warp
    triggerLightning();
  };

  const handleQuantumUpgradeComplete = () => {
    setShowQuantumUpgrade(false);
    triggerLightning();
  };

  const handleBankHandshakeComplete = () => {
    setShowBankHandshake(false);
    setActiveTab('BANK');
    triggerLightning();
  };

  const handleCoreInitComplete = () => {
    setShowCoreInit(false);
    setActiveTab('COMMAND'); 
    triggerLightning();
  };

  const handleVertexTuningComplete = () => {
    setShowVertexTuning(false);
    triggerLightning();
  };

  const handleDirectiveComplete = () => {
    setActiveDirective(null);
    triggerLightning();
  };

  const handleAttestationComplete = () => {
    setShowAttestation(false);
    triggerLightning();
  };

  const handleTunnelComplete = () => {
    setIsTunnelActive(true);
    setShowCloudflareTunnel(false);
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

  const getSecurityIndicator = () => {
     if (threatLevel === 'CRITICAL') return { icon: ShieldAlert, color: 'text-rose-500', label: 'LOCKDOWN' };
     if (threatLevel === 'ELEVATED') return { icon: Activity, color: 'text-amber-500', label: 'ELEVATED' };
     return { icon: ShieldCheck, color: 'text-emerald-500', label: 'SECURE' };
  };

  const immutabilityConfig = getImmutabilityConfig();
  const securityIndicator = getSecurityIndicator();
  const globalStats = { neoxzBankCapital: balance, realityParity: 1.0, threatLevel, coreImmutability, activeProtocols: 4117, institutionalId: subscriberData?.merchantId || 'BCR2DN4TU7BMDMDU', kycStatus: 'VERIFIED', legalCompliance: 'SOVEREIGN_BENEFICIARY_LOCKED' };

  if (!isAuthorized) return <ApiKeySetup onSuccess={() => setIsAuthorized(true)} />;
  if (!subscriberData) return <SovereignSubscriptionOverlay onComplete={handleSubscription} />;
  
  return (
    <SecurityLayer threatLevel={threatLevel} coreImmutability={coreImmutability}>
      <div className={`flex h-screen w-full bg-black text-slate-200 overflow-hidden font-sans transition-colors duration-1000 ${isSingularity ? 'selection:bg-amber-500/30' : 'selection:bg-emerald-500/30'}`}>
        
        {/* Floating Command Trigger (Neural Link) */}
        <button 
          onClick={() => setShowAssistantSidebar(!showAssistantSidebar)}
          className={`fixed bottom-12 left-1/2 -translate-x-1/2 z-[10000] px-8 py-3 rounded-full border transition-all duration-500 flex items-center gap-4 group ${
            showAssistantSidebar 
              ? (isSingularity ? 'bg-amber-500 text-black border-white shadow-[0_0_50px_rgba(245,158,11,0.4)]' : 'bg-emerald-500 text-black border-white shadow-[0_0_40px_rgba(16,185,129,0.3)]') 
              : 'bg-black/60 backdrop-blur-md border-emerald-500/30 text-emerald-500 hover:border-emerald-500'
          }`}
        >
           <Cpu className={`w-5 h-5 ${showAssistantSidebar ? 'animate-spin-slow' : 'animate-pulse'}`} />
           <span className="text-[10px] font-black uppercase tracking-[0.4em]">Neural Mandate Center</span>
           <div className={`w-1.5 h-1.5 rounded-full ${showAssistantSidebar ? 'bg-black' : 'bg-emerald-500'} animate-ping`}></div>
        </button>

        {showQuickDeploy && (
          <QuickDeployOverlay balance={balance} onDeploy={handleQuickDeploy} onClose={() => setShowQuickDeploy(false)} />
        )}

        {showMasterDeployment && (
          <MasterAutomationOverlay onComplete={handleDeploymentComplete} />
        )}

        {showQuantumSpeed && (
          <QuantumSpeedOverlay onComplete={handleQuantumSpeedComplete} />
        )}

        {showQuantumUpgrade && (
          <QuantumUpgradeOverlay onComplete={handleQuantumUpgradeComplete} />
        )}

        {showBankHandshake && (
          <QuantumBankHandshake onComplete={handleBankHandshakeComplete} />
        )}

        {showCoreInit && (
          <CommandCoreInitialization onComplete={handleCoreInitComplete} />
        )}

        {showVertexTuning && (
          <VertexTuningOverlay onComplete={handleVertexTuningComplete} />
        )}

        {activeDirective && (
          <QuantumDirectiveExecution 
            directive={activeDirective} 
            onComplete={handleDirectiveComplete} 
          />
        )}

        {showAttestation && (
          <IntegrationAttestationOverlay 
            merchantId="BCR2DN4TU7BMDMDU" 
            onComplete={handleAttestationComplete} 
          />
        )}

        {showCloudflareTunnel && (
          <CloudflareTunnelOverlay 
            onClose={() => setShowCloudflareTunnel(false)} 
            onComplete={handleTunnelComplete}
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
               { id: 'COMMAND', icon: Rocket },
               { id: 'BANK', icon: Landmark },
               { id: 'DASHBOARD', icon: BarChart3 },
               { id: 'PROTOCOLS', icon: ListChecks },
               { id: 'CLOUD', icon: Cloud },
               { id: 'ASSETS', icon: WalletCards },
               { id: 'SUSTAINABILITY', icon: Leaf },
               { id: 'FORENSICS', icon: ShieldCheck },
               { id: 'RESEARCH', icon: BrainCircuit },
               { id: 'DEPLOY', icon: Satellite }
             ].map(item => (
               <button
                 key={item.id}
                 onClick={() => { setActiveTab(item.id as any); triggerLightning(); }}
                 className={`p-2 rounded-lg transition-all duration-300 ${activeTab === item.id ? (isSingularity ? 'text-amber-400' : 'text-emerald-400') : 'text-slate-600 hover:text-white'}`}
                 title={item.id}
               >
                 <item.icon className="w-5 h-5" />
               </button>
             ))}
          </nav>
          <div className="mt-auto flex flex-col items-center gap-6">
             <button onClick={() => setShowBankHandshake(true)} className={`transition-colors ${isSingularity ? 'text-amber-500 hover:text-white' : 'text-slate-600 hover:text-cyan-400'}`}>
                <HeartHandshake className="w-5 h-5" />
             </button>
             <div className={`w-1.5 h-1.5 rounded-full ${threatLevel === 'CRITICAL' ? 'bg-rose-500 animate-ping shadow-[0_0_8px_rgba(244,63,94,1)]' : (isSingularity ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-emerald-500')} mx-auto transition-all`} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Header */}
          <header className={`h-20 flex items-center justify-between px-8 z-40 border-b border-white/5 bg-black/40 backdrop-blur-sm transition-all ${isSingularity ? 'shadow-[0_0_40px_rgba(245,158,11,0.05)]' : ''}`}>
             <div className="flex items-center gap-3">
                <span className={`text-[10px] font-black uppercase tracking-widest ${isSingularity ? 'text-amber-500' : 'text-slate-500'}`}>{activeTab} VIEW</span>
                <span className="text-slate-700">/</span>
                <span className="text-[10px] font-mono text-emerald-500/80 tracking-wider">MANDATE_V16.2.1</span>
                
                {isSingularity && (
                  <>
                    <span className="text-slate-700">/</span>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-black font-black uppercase tracking-[0.3em] text-[8px] animate-in zoom-in">
                       <Infinity className="w-3 h-3" />
                       Universal Authority Locked
                    </div>
                  </>
                )}

                <div className="h-4 w-[1px] bg-slate-800 mx-2 hidden md:block"></div>
                
                {/* Security Status Capsule */}
                <div className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full border transition-all bg-black/40 border-white/5`}>
                   <securityIndicator.icon className={`w-3 h-3 ${securityIndicator.color} ${threatLevel !== 'LOW' ? 'animate-pulse' : ''}`} />
                   <span className={`text-[9px] font-black uppercase tracking-widest ${securityIndicator.color}`}>{securityIndicator.label}</span>
                </div>

                <div className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${immutabilityConfig.color}`}>
                   <immutabilityConfig.icon className={`w-3 h-3 ${immutabilityConfig.animate ? 'animate-spin' : ''}`} />
                   <span className="text-[9px] font-black uppercase tracking-widest">{immutabilityConfig.label}</span>
                </div>

                {/* Cloudflare Tunnel Status */}
                {isTunnelActive && (
                  <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border transition-all bg-orange-500/10 border-orange-500/20">
                     <CloudLightning className="w-3 h-3 text-orange-500" />
                     <span className="text-[9px] font-black uppercase tracking-widest text-orange-500">TUNNEL_SECURE</span>
                  </div>
                )}
             </div>
             
             <div className="flex items-center gap-6">
                <div className="text-right flex flex-col items-end">
                   <p className={`text-sm font-black mono tracking-tight leading-none transition-colors ${isSingularity ? 'text-amber-400' : 'text-white'}`}>${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
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
                    className={`p-2.5 transition-colors rounded-xl border ${isSingularity ? 'text-amber-400 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20' : 'text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/20'}`}
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
             {activeTab === 'COMMAND' && (
               <QuantumCommandCenter 
                 stats={globalStats as any}
                 onInitiateDisplacement={() => setShowMasterDeployment(true)}
                 onBankHandshake={() => setShowBankHandshake(true)}
                 onDirectiveExecute={handleAssistantCommand}
               />
             )}
             {activeTab === 'BANK' && (
               <NEOXZBankCommandCenter 
                 stats={globalStats as any}
                 onDirectiveExecute={handleAssistantCommand}
               />
             )}
             {activeTab === 'DASHBOARD' && (
               <ConsortiumMasterHub 
                 stats={globalStats as any}
                 activeView={dashboardView}
                 onViewChange={setDashboardView}
                 onTriggerAttestation={() => setShowAttestation(true)}
                 onOpenTunnel={() => setShowCloudflareTunnel(true)}
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

        {/* Command Panel (Assistant) */}
        {showAssistantSidebar && (
          <aside className="w-[450px] z-30 transition-all duration-500 animate-in slide-in-from-right">
            <Assistant 
              systemContext={systemContext} 
              onCommand={handleAssistantCommand} 
              isBankAligned={true}
            />
          </aside>
        )}

        <PublishedWatermark />
      </div>
    </SecurityLayer>
  );
};

export default App;
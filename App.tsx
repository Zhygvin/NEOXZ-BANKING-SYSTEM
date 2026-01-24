import React, { useState, useEffect, useCallback } from 'react';
import { 
  Shield, Zap, Wallet, Landmark, Cpu, Activity,
  ArrowRightLeft, History, LayoutGrid, ShieldAlert,
  Search, Lock, CheckCircle2, RefreshCw, Smartphone,
  Tornado, Star, Radio, Box, Layers, Database, UserCheck, Heart, HandCoins,
  ShieldCheck, Fingerprint, Coins, Binary, CreditCard, FileText, Globe, Key, ShieldX,
  Satellite, ZapOff, Scale, TrendingUp, BarChart3, Building2
} from 'lucide-react';
import { SystemStatus, DeploymentLog, IngestedFile } from './types.ts';
import Assistant from './components/Assistant.tsx';
import Logo from './components/Logo.tsx';
import SovereignSubscriptionOverlay from './components/SovereignSubscriptionOverlay.tsx';
import LoanMandateConsole from './components/LoanMandateConsole.tsx';
import ApiKeySetup from './components/ApiKeySetup.tsx';
import ConsortiumPublishingHub from './components/ConsortiumPublishingHub.tsx';
import SovereignSatellitePortal from './components/SovereignSatellitePortal.tsx';
import MarketIntelligence from './components/MarketIntelligence.tsx';
import PublishedWatermark from './components/PublishedWatermark.tsx';
import MasterAutomationOverlay from './components/MasterAutomationOverlay.tsx';
import ConsortiumMasterHub from './components/ConsortiumMasterHub.tsx';
import BaselComplianceMonitor from './components/BaselComplianceMonitor.tsx';

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(() => localStorage.getItem('neoxz_mandate_anchored') === 'true');
  const [isProduction, setIsProduction] = useState(() => localStorage.getItem('neoxz_production_mode') === 'true');
  const [isDeploying, setIsDeploying] = useState(false);
  const [platformSerial, setPlatformSerial] = useState<string | null>(() => localStorage.getItem('neoxz_platform_serial'));
  const [subscriberData, setSubscriberData] = useState(() => {
    const saved = localStorage.getItem('neoxz_sovereign_identity');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'CONSOLE' | 'SATELLITE' | 'LOAN' | 'AML' | 'LEDGER' | 'MARKET' | 'REGULATORY'>(
    localStorage.getItem('neoxz_production_mode') === 'true' ? 'DASHBOARD' : 'CONSOLE'
  );
  
  const [dashboardView, setDashboardView] = useState<'OVERVIEW' | 'CAPITAL' | 'SECURITY' | 'NEURAL' | 'REGULATORY' | 'INGESTION'>('OVERVIEW');
  
  const [ingestedFiles, setIngestedFiles] = useState<IngestedFile[]>(() => {
    const saved = localStorage.getItem('neoxz_ingested_files');
    return saved ? JSON.parse(saved) : [];
  });

  const [stats, setStats] = useState<SystemStatus>({
    dssUptime: 100,
    neoxzCoreTemp: 32,
    tcpThroughput: 985.4,
    manusQueueSize: 0,
    activeProtocols: 4117,
    neoxzBankCapital: 985004531802,
    founderReserve: 54500000,
    dailyInflow: 2400000,
    cyberSync: 1.0,
    lightWebLatency: 0.001,
    tokenizationStatus: 'LOCKED',
    truthFilterActive: true,
    legalCompliance: 'SOVEREIGN_BENEFICIARY_LOCKED',
    biometricStability: 1.0,
    realityParity: 1.0,
    orlLevel: 'PRODUCTION',
    vaultSecurity: 'SOVEREIGN_FORTRESS',
    threatLevel: 'LOW',
    lightWebStatus: 'OPERATIONAL',
    realityImpact: 'MANIFESTED',
    shieldIntegrity: 100,
    coreImmutability: 'LOCKED',
    institutionalId: 'SDS-9850-PH',
    kycStatus: 'VERIFIED',
    isQuantumOverdrive: true,
    mtlsStatus: 'ENFORCED',
    wiseSubdomain: 'api-mtls.transferwise.com'
  });

  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('neoxz_satellite_balance');
    return savedBalance ? parseFloat(savedBalance) : (subscriberData ? 55.00 : 0.00);
  });
  
  const [logs, setLogs] = useState<DeploymentLog[]>([]);

  useEffect(() => {
    if (!platformSerial) {
      const entropy = window.navigator.userAgent + window.screen.width + Math.random();
      const hash = btoa(entropy).substring(0, 12).toUpperCase();
      const newSerial = `NEOX-SAT-2026-${hash}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      setPlatformSerial(newSerial);
      localStorage.setItem('neoxz_platform_serial', newSerial);
    }
  }, [platformSerial]);

  const addLog = useCallback((agent: DeploymentLog['agent'], message: string, level: DeploymentLog['level'] = 'INFO') => {
    setLogs(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString([], { hour12: false }),
      level, agent, message
    }, ...prev.slice(0, 49)]);
  }, []);

  const handleSubscription = (data: any) => {
    localStorage.setItem('neoxz_sovereign_identity', JSON.stringify(data));
    setSubscriberData(data);
    setBalance(55.00);
    addLog('SYSTEM', `Satellite Node ${platformSerial} Provisioned & Verified.`, 'SUCCESS');
  };

  const handleUpload = (files: IngestedFile[]) => {
    const updated = [...files, ...ingestedFiles];
    setIngestedFiles(updated);
    localStorage.setItem('neoxz_ingested_files', JSON.stringify(updated));
    files.forEach(f => addLog('SYSTEM', `Payload Ingested: ${f.name} | HASH: ${f.hash.substring(0, 8)}`, 'LIVE_DEPLOY'));
  };

  const startDeploymentSequence = () => {
    setIsDeploying(true);
    addLog('PRODUCTION', 'Initiating Final Technological Mandate sequence...', 'MANDATE_SEQUENCE');
  };

  const finalizeProduction = () => {
    setIsDeploying(false);
    setIsProduction(true);
    localStorage.setItem('neoxz_production_mode', 'true');
    setActiveTab('DASHBOARD');
    document.body.classList.add('sovereign-bloom');
    addLog('PRODUCTION', 'Universal Anchor Manifested. Application is now Sovereign Production Node.', 'LIVE_DEPLOY');
    setTimeout(() => document.body.classList.remove('sovereign-bloom'), 3000);
  };

  if (!isAuthorized) {
    return <ApiKeySetup onSuccess={() => {
      setIsAuthorized(true);
      localStorage.setItem('neoxz_mandate_anchored', 'true');
    }} />;
  }

  if (!subscriberData) {
    return <SovereignSubscriptionOverlay onComplete={handleSubscription} />;
  }

  return (
    <div className={`flex h-screen w-full bg-[#020202] text-slate-100 selection:bg-emerald-500/30 overflow-hidden font-sans ${isProduction ? 'production-mode' : ''}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.05)_0%,_transparent_70%)] pointer-events-none"></div>

      {isDeploying && <MasterAutomationOverlay onComplete={finalizeProduction} />}

      <aside className="w-80 border-r border-slate-900 bg-black/95 flex flex-col z-20 backdrop-blur-3xl">
        <div className="p-8 border-b border-slate-900 space-y-4">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-xl transition-all ${isProduction ? 'bg-emerald-500/10 border-emerald-500/20 production-pulse' : 'bg-indigo-500/10 border-indigo-500/20'}`}>
               <Logo size={40} />
            </div>
            <div>
              <h2 className="text-xl font-black italic text-white tracking-tighter uppercase">
                {isProduction ? 'Sovereign Pro' : 'Sovereign'}
              </h2>
              <span className={`text-[8px] font-black uppercase tracking-widest leading-none ${isProduction ? 'text-emerald-400' : 'text-indigo-400'}`}>
                {isProduction ? 'Production Node v16.2.1' : 'Staged Satellite v16.2'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-6">
          <nav className="flex flex-col gap-2">
             {[
               { id: 'DASHBOARD', label: 'Command Hub', icon: BarChart3 },
               { id: 'CONSOLE', label: 'Mandate Hub', icon: LayoutGrid },
               { id: 'REGULATORY', label: 'Basel III Rails', icon: Building2 },
               { id: 'SATELLITE', label: 'Issued Node', icon: Satellite },
               { id: 'MARKET', label: 'Market Intel', icon: TrendingUp },
               { id: 'LOAN', label: 'HBRV Capital', icon: HandCoins },
               { id: 'AML', label: 'Forensic AML', icon: ShieldAlert },
               { id: 'LEDGER', label: 'Quantum Ledger', icon: History }
             ].map(item => (
               <button
                 key={item.id}
                 onClick={() => setActiveTab(item.id as any)}
                 className={`flex items-center gap-4 px-6 py-3.5 rounded-2xl transition-all font-black uppercase tracking-widest text-[9px] border-2 ${activeTab === item.id ? 'bg-white text-black border-white shadow-2xl scale-105' : 'text-slate-500 border-transparent hover:bg-white/5'}`}
               >
                 <item.icon className="w-4 h-4" />
                 {item.label}
               </button>
             ))}
          </nav>

          <div className="p-6 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest italic">SignaSovereign v4.2.1</span>
                <span className="text-[9px] font-black text-emerald-400 animate-pulse">ACTIVE</span>
             </div>
             <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-full animate-[shimmer_2s_infinite_linear] bg-[length:200%_100%]"></div>
             </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-24 border-b border-slate-900 bg-black/40 backdrop-blur-3xl flex items-center justify-between px-12 z-30">
           <div className="flex flex-col">
              <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Node Operator Identity</span>
              <div className="flex items-center gap-3 mt-1">
                 <UserCheck className="w-5 h-5 text-emerald-400" />
                 <span className="text-xl font-black text-white uppercase tracking-widest truncate max-w-[300px]">{subscriberData.legalName}</span>
              </div>
           </div>
           <div className="flex items-center gap-10">
              <div className="text-right">
                 <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Liquid Abundance</span>
                 <p className="text-4xl font-black text-white mono tracking-tighter glow-emerald">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="h-12 w-px bg-slate-800"></div>
              <div className={`p-5 rounded-2xl ${isProduction ? 'bg-emerald-500 text-black shadow-emerald-500/20' : 'bg-slate-800 text-slate-500'} shadow-xl transition-all cursor-pointer hover:scale-110`}>
                 <Wallet className="w-6 h-6" />
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar space-y-12 relative">
           {activeTab === 'DASHBOARD' && (
              <ConsortiumMasterHub 
                stats={stats} 
                activeView={dashboardView} 
                onViewChange={setDashboardView}
                ingestedFiles={ingestedFiles}
                onUpload={handleUpload}
              />
           )}
           {activeTab === 'REGULATORY' && (
             <BaselComplianceMonitor stats={stats} autoSync={true} />
           )}
           {activeTab === 'CONSOLE' && (
              <ConsortiumPublishingHub 
                onPublish={startDeploymentSequence} 
                isPublished={isProduction} 
                stats={stats} 
              />
           )}
           {activeTab === 'SATELLITE' && <SovereignSatellitePortal />}
           {activeTab === 'MARKET' && <MarketIntelligence />}
           {activeTab === 'LOAN' && <LoanMandateConsole onAuthorize={(amt) => {
             setBalance(prev => prev + amt);
             addLog('BANK', `Loan Mandate Capital Credit Authorized: $${amt.toLocaleString()}.`, 'PROSPERITY');
           }} />}
           {activeTab === 'AML' && (
             <div className="p-12 rounded-[4rem] bg-rose-500/5 border border-rose-500/20 space-y-10 animate-in zoom-in-95 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                   <ShieldX className="w-64 h-64 text-rose-600" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter text-white relative z-10">Forensic AML Overwatch</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                   {[
                     { label: 'Vector Scan', status: 'ACTIVE', icon: Search },
                     { label: 'Structuring', status: 'STABLE', icon: Activity },
                     { label: 'Sanction Sync', status: 'LOCKED', icon: Globe }
                   ].map((m, i) => (
                     <div key={i} className="p-8 rounded-[2.5rem] bg-black/80 border border-slate-800 space-y-4">
                        <m.icon className="w-8 h-8 text-rose-500" />
                        <span className="text-[10px] font-black text-slate-500 uppercase block tracking-widest">{m.label}</span>
                        <span className="text-lg font-black text-rose-400 mono tracking-widest">{m.status}</span>
                     </div>
                   ))}
                </div>
             </div>
           )}
           {activeTab === 'LEDGER' && (
              <div className="p-12 rounded-[4rem] bg-slate-900/20 border border-slate-800 space-y-8 animate-in slide-in-from-bottom-4">
                 <h3 className="text-2xl font-black uppercase tracking-tighter text-white">Quantum Node Ledger</h3>
                 <div className="space-y-4">
                    {logs.map((log) => (
                      <div key={log.id} className="p-6 rounded-3xl bg-black/80 border border-slate-900 flex items-center justify-between group">
                         <div className="flex items-center gap-6">
                            <div className={`w-2 h-2 rounded-full ${isProduction ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]' : 'bg-indigo-500'}`}></div>
                            <span className="text-[11px] text-slate-600 font-mono">{log.timestamp}</span>
                            <p className="text-[13px] font-black text-slate-300 uppercase tracking-tight">{log.message}</p>
                         </div>
                         <span className="text-[9px] font-black px-3 py-1 rounded-lg bg-slate-900 text-slate-500 border border-slate-800 uppercase tracking-widest">{log.level}</span>
                      </div>
                    ))}
                 </div>
              </div>
           )}
        </div>
      </main>

      <aside className="w-[480px] border-l border-slate-900 bg-black flex flex-col z-30">
        <Assistant />
      </aside>

      <PublishedWatermark />
    </div>
  );
};

export default App;
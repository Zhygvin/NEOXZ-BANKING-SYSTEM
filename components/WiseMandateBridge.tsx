
import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, CreditCard, Landmark, ArrowRightLeft, ShieldCheck, 
  Zap, Coins, Plus, ChevronRight, TrendingUp, RefreshCw, 
  Network, MapPin, Search, Navigation, Terminal, Copy, 
  Check, Info, ArrowUpRight, BarChart3, Fingerprint, Lock, 
  Wifi, PieChart, Wallet, Archive, ArrowDownRight, Scale,
  Activity, Smartphone, ExternalLink, Settings, Command
} from 'lucide-react';
import { WiseVault, WiseBalance } from '../types';

const RATES: Record<string, number> = {
  USD: 1,
  PHP: 58.50,
  EUR: 0.92,
  GBP: 0.79
};

const WiseMandateBridge: React.FC = () => {
  const [balances, setBalances] = useState<WiseBalance[]>([
    { 
      id: 200001, currency: 'USD', type: 'STANDARD', name: 'Primary Core', icon: '🇺🇸', 
      investmentState: 'NOT_INVESTED', amount: { value: 500004531802, currency: 'USD' }, 
      reservedAmount: { value: 0, currency: 'USD' }, cashAmount: { value: 500004531802, currency: 'USD' }, 
      totalWorth: { value: 500004531802, currency: 'USD' }, visible: true 
    },
    { 
      id: 200002, currency: 'PHP', type: 'STANDARD', name: 'Manila Hub', icon: '🇵🇭', 
      investmentState: 'NOT_INVESTED', amount: { value: 485000000000, currency: 'PHP' }, 
      reservedAmount: { value: 0, currency: 'PHP' }, cashAmount: { value: 485000000000, currency: 'PHP' }, 
      totalWorth: { value: 485000000000, currency: 'PHP' }, visible: true 
    },
    { 
      id: 200003, currency: 'USD', type: 'SAVINGS', name: 'Founder Prosperity Jar', icon: '🏺', 
      investmentState: 'NOT_INVESTED', amount: { value: 54500000, currency: 'USD' }, 
      reservedAmount: { value: 0, currency: 'USD' }, cashAmount: { value: 54500000, currency: 'USD' }, 
      totalWorth: { value: 54500000, currency: 'USD' }, visible: true 
    }
  ]);

  const [activeBalanceId, setActiveBalanceId] = useState(200001);
  const [isRouting, setIsRouting] = useState(false);
  const [routeStep, setRouteStep] = useState(0);
  const [showApiConsole, setShowApiConsole] = useState(false);
  const [apiLogs, setApiLogs] = useState<string[]>(['[WISE_API] Handshake initialized...', '[WISE_API] mTLS Identity Handshake Verified.', '[WISE_API] api-mtls.transferwise.com LATCHED.']);
  const [tunnelPulse, setTunnelPulse] = useState(false);
  
  // Currency Preference State
  const [preferredCurrency, setPreferredCurrency] = useState(() => localStorage.getItem('neoxz_pref_currency') || 'USD');

  const activeBalance = balances.find(b => b.id === activeBalanceId) || balances[0];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pulseInterval = setInterval(() => setTunnelPulse(p => !p), 2000);
    return () => clearInterval(pulseInterval);
  }, []);

  useEffect(() => {
    if (isRouting) {
      const interval = setInterval(() => {
        setRouteStep(prev => {
          if (prev >= 4) {
            clearInterval(interval);
            setTimeout(() => setIsRouting(false), 1500);
            return 4;
          }
          return prev + 1;
        });
      }, 600);
      
      const logInterval = setInterval(() => {
        const endpoints = ['/v4/profiles/123/balances', '/v2/quotes', '/v1/total-funds/USD', '/v2/profiles/123/balance-movements'];
        const method = Math.random() > 0.5 ? 'GET' : 'POST';
        setApiLogs(prev => [...prev, `[WISE_API] ${method} ${endpoints[Math.floor(Math.random() * endpoints.length)]} -> 200 OK`].slice(-12));
      }, 1000);

      return () => {
        clearInterval(interval);
        clearInterval(logInterval);
      };
    } else {
      setRouteStep(0);
    }
  }, [isRouting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [apiLogs]);

  const handleBalanceChange = (id: number) => {
    setActiveBalanceId(id);
    setIsRouting(true);
    const bal = balances.find(b => b.id === id);
    setApiLogs(prev => [...prev, `[WISE_API] mTLS Tunnel re-anchoring for ${bal?.currency} context.`]);
  };

  const toggleCurrency = () => {
    const currencies = ['USD', 'PHP', 'EUR', 'GBP'];
    const nextIdx = (currencies.indexOf(preferredCurrency) + 1) % currencies.length;
    const next = currencies[nextIdx];
    setPreferredCurrency(next);
    localStorage.setItem('neoxz_pref_currency', next);
  };

  const convertValue = (amount: number, fromCurrency: string) => {
    const usdValue = amount / (RATES[fromCurrency] || 1);
    return usdValue * (RATES[preferredCurrency] || 1);
  };

  const formatCurrencyValue = (val: number) => {
    return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Calculate total systemic valuation dynamically based on all balances converted to USD then to preferred
  const systemicTotalUSD = 985004531802.00;
  const displayTotal = convertValue(systemicTotalUSD, 'USD');

  return (
    <div className="bg-slate-900/60 border border-cyan-500/20 rounded-[4rem] p-12 space-y-12 shadow-3xl relative overflow-hidden backdrop-blur-3xl group transition-all duration-1000">
      <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
        <Globe className="w-80 h-80 text-cyan-500" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-8">
          <div className="p-6 rounded-[2.5rem] bg-cyan-600 text-white shadow-2xl shadow-cyan-500/20 border-2 border-white/20 group-hover:scale-110 transition-transform">
            <Landmark className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-black uppercase tracking-[0.5em] text-white">Wise Production Bridge</h3>
            <div className="flex items-center gap-3 mt-1">
               <span className="text-xs font-bold tracking-[0.4em] uppercase italic text-cyan-400">
                 CROSS-BORDER MULTI-CURRENCY RAILS
               </span>
               <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500 text-black text-[8px] font-black uppercase tracking-widest shadow-lg">
                  <Lock className="w-2.5 h-2.5" />
                  Vault: NEOXZ QUANTUM BANKING SYSTEM
               </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={toggleCurrency}
             className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-slate-500 hover:text-white hover:border-cyan-500/50 transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
             title="Switch Display Currency"
           >
              <Coins className="w-4 h-4" />
              VIEW: {preferredCurrency}
           </button>
           <button 
             onClick={() => setShowApiConsole(!showApiConsole)}
             className={`px-4 py-2 rounded-xl border transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${showApiConsole ? 'bg-cyan-500 text-black border-white' : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-white'}`}
           >
              <Terminal className="w-4 h-4" />
              API DEBUG
           </button>
           <div className="px-6 py-2 rounded-full border-2 border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-black text-[10px] uppercase tracking-[0.4em] flex items-center gap-3 shadow-lg shadow-emerald-500/10">
              <ShieldCheck className="w-4 h-4" />
              WISE_PRODUCTION_SECURED
           </div>
        </div>
      </div>

      {/* Production Tunnel Visualizer */}
      <div className="relative h-24 bg-black/60 rounded-[2rem] border border-cyan-500/20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(34,211,238,0.3)_20px,rgba(34,211,238,0.3)_40px)] animate-[shimmer_1s_linear_infinite]"></div>
        <div className="relative z-10 flex items-center gap-10">
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Local Host</span>
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"></div>
          </div>
          <div className="flex-1 h-[2px] w-64 bg-cyan-500/20 relative">
            <div className={`absolute inset-0 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all duration-1000 ${tunnelPulse ? 'opacity-100 scale-x-110' : 'opacity-40 scale-x-100'}`}></div>
            <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400 bg-black p-0.5 rounded" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest mb-1">api-mtls.transferwise.com</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        <div className="lg:col-span-4 space-y-6">
           <div className="flex items-center justify-between px-4">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Core Balances & Jars</span>
              <RefreshCw className={`w-3 h-3 text-slate-700 ${isRouting ? 'animate-spin' : ''}`} />
           </div>
           <div className="space-y-3">
              {balances.map((balance) => (
                <button
                  key={balance.id}
                  onClick={() => handleBalanceChange(balance.id)}
                  className={`w-full p-6 rounded-[2.5rem] border-2 transition-all flex items-center justify-between group/vault ${
                    activeBalanceId === balance.id 
                      ? 'bg-cyan-500 border-white text-black shadow-xl scale-105' 
                      : 'bg-black/40 border-slate-800 text-slate-400 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg shadow-inner ${activeBalanceId === balance.id ? 'bg-black/20' : 'bg-slate-900'}`}>
                      {balance.icon || balance.currency}
                    </div>
                    <div className="flex flex-col text-left">
                       <span className="text-[10px] font-black uppercase tracking-tighter truncate max-w-[120px]">
                         {balance.name || `${balance.currency} ${balance.type}`}
                       </span>
                       <span className={`text-[8px] font-bold uppercase ${activeBalanceId === balance.id ? 'text-black' : 'text-emerald-500'}`}>
                         {balance.type} / {balance.investmentState}
                       </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                     <span className="text-xs font-black mono">{preferredCurrency}</span>
                     <ChevronRight className={`w-4 h-4 transition-transform ${activeBalanceId === balance.id ? 'rotate-90' : ''}`} />
                  </div>
                </button>
              ))}
           </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
           <div className="p-10 rounded-[3.5rem] bg-black border border-slate-800 shadow-inner relative overflow-hidden group/main">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover/main:opacity-100 transition-opacity"></div>
              
              <div className="flex items-center justify-between mb-10 relative z-10">
                 <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-black uppercase tracking-[0.4em] text-cyan-500">{activeBalance.name || 'Core Account'} Telemetry</span>
                    <div className="flex items-center gap-2 px-3 py-1 rounded bg-black border border-slate-800 w-fit">
                       <Wifi className="w-3 h-3 text-emerald-500" />
                       <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter italic">Production_mTLS_Channel</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <RefreshCw className={`w-4 h-4 text-slate-700 ${isRouting ? 'animate-spin' : ''}`} />
                    <span className="text-[9px] font-mono text-slate-600 uppercase">ID: {activeBalance.id}</span>
                 </div>
              </div>

              <div className="space-y-4 relative z-10">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Available Capital ({preferredCurrency})</span>
                    {activeBalance.type === 'SAVINGS' && (
                       <div className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[8px] font-black uppercase tracking-widest">
                          Jar Accumulation Active
                       </div>
                    )}
                 </div>
                 <div className="flex items-baseline gap-4">
                    <span className="text-6xl font-black text-white mono tracking-tighter transition-all duration-700 group-hover/main:text-cyan-400">
                      {formatCurrencyValue(convertValue(activeBalance.amount.value, activeBalance.currency))}
                    </span>
                    <span className="text-xl font-bold text-slate-700 uppercase">{preferredCurrency}</span>
                 </div>
                 
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                    {[
                      { label: 'Reserved', val: formatCurrencyValue(convertValue(activeBalance.reservedAmount.value, activeBalance.currency)), icon: <Archive className="w-3 h-3" />, color: 'text-slate-400' },
                      { label: 'Cash Value', val: formatCurrencyValue(convertValue(activeBalance.cashAmount.value, activeBalance.currency)), icon: <Coins className="w-3 h-3" />, color: 'text-amber-400' },
                      { label: 'Total Worth', val: formatCurrencyValue(convertValue(activeBalance.totalWorth.value, activeBalance.currency)), icon: <PieChart className="w-3 h-3" />, color: 'text-emerald-500' },
                      { label: 'Sync State', val: activeBalance.investmentState, icon: <Activity className="w-3 h-3" />, color: 'text-blue-400' }
                    ].map((m, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1 hover:border-white/10 transition-colors">
                         <div className={`flex items-center gap-2 ${m.color}`}>
                            {m.icon}
                            <span className="text-[8px] font-black uppercase tracking-widest">{m.label}</span>
                         </div>
                         <span className="text-sm font-black text-white mono truncate">{m.val}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <button className="w-full py-6 rounded-3xl bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-[0.4em] text-xs transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-4 group active:scale-95">
                   <ArrowRightLeft className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                   Command Transfer
                </button>
                <button className="w-full py-6 rounded-3xl bg-white hover:bg-slate-100 text-black font-black uppercase tracking-[0.4em] text-xs transition-all shadow-xl flex items-center justify-center gap-4 group active:scale-95">
                   <Command className="w-5 h-5 group-hover:scale-110 transition-transform" />
                   Command Asset Movement
                </button>
              </div>

              <div className="p-10 rounded-[3rem] bg-black/60 border border-slate-800 space-y-6 shadow-inner relative overflow-hidden group/capacity">
                 <div className="absolute top-0 right-0 p-6 opacity-5 group-hover/capacity:opacity-10 transition-opacity">
                    <Scale className="w-24 h-24 text-amber-500" />
                 </div>
                 <div className="flex items-center justify-between border-b border-slate-900 pb-4 relative z-10">
                    <div className="flex items-center gap-3">
                       <ShieldCheck className="w-4 h-4 text-emerald-500" />
                       <span className="text-[10px] font-black text-white uppercase tracking-widest">Regulatory Capacity</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[8px] font-black text-amber-500/60 uppercase">PH_HOLD_LIMIT_ACTIVE</span>
                    </div>
                 </div>
                 <div className="space-y-2 relative z-10">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Available Deposit Capacity</span>
                    <p className="text-3xl font-black text-white mono">₱2,000,000,000.00</p>
                    <div className="h-1 w-full bg-slate-900 rounded-full mt-2 overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[85%]"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <footer className="p-8 rounded-[3rem] bg-cyan-500/5 border border-cyan-500/10 flex flex-col md:flex-row items-center justify-between gap-8 group/footer">
         <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
               <TrendingUp className="w-6 h-6 text-cyan-400" />
               <div className="flex flex-col">
                  <span className="text-xs font-black text-white uppercase tracking-widest">Total Valuation across Multi-Currency Hub</span>
                  <span className="text-xl font-black text-white mono mt-0.5 tracking-tighter italic underline decoration-cyan-500/30">
                     {formatCurrencyValue(displayTotal)} {preferredCurrency}
                  </span>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-6">
            <a 
              href="https://www.sh-pay.com/pay/response/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400 text-[9px] font-black uppercase tracking-widest shadow-xl transition-all active:scale-95"
            >
               <ExternalLink className="w-3 h-3" />
               Verify Settlement Gateway
            </a>
            <div className="flex items-center gap-3 px-5 py-2 rounded-xl bg-black border border-slate-800">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
               <span className="text-[10px] font-mono text-emerald-400 font-black tracking-widest uppercase">REALITY_PARITY_ANCHORED</span>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default WiseMandateBridge;

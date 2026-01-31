
import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, CreditCard, Landmark, ArrowRightLeft, ShieldCheck, 
  Zap, Coins, Plus, ChevronRight, TrendingUp, RefreshCw, 
  Network, MapPin, Search, Navigation, Terminal, Copy, 
  Check, Info, ArrowUpRight, BarChart3, Fingerprint, Lock, 
  Wifi, PieChart, Wallet, Archive, ArrowDownRight, Scale,
  Activity, Smartphone, ExternalLink, Settings, Command, Hash, Code
} from 'lucide-react';
import { WiseVault, WiseBalance } from '../types';

const RATES: Record<string, number> = {
  USD: 1,
  PHP: 58.50,
  EUR: 0.92,
  GBP: 0.79
};

const WiseMandateBridge: React.FC = () => {
  const [balances, setBalances] = useState<any[]>([
    { 
      id: 579574570220942, 
      currency: 'USD', 
      type: 'STANDARD', 
      name: 'Primary USD Rail', 
      icon: '🇺🇸', 
      routingNumber: '084009519',
      swiftBic: 'TRWIUS35XXX',
      bankName: 'Wise US Inc',
      investmentState: 'NOT_INVESTED', 
      amount: { value: 500004531802, currency: 'USD' }, 
      reservedAmount: { value: 0, currency: 'USD' }, 
      cashAmount: { value: 500004531802, currency: 'USD' }, 
      totalWorth: { value: 500004531802, currency: 'USD' }, 
      visible: true 
    },
    { 
      id: 2005155733, 
      currency: 'PHP', 
      type: 'STANDARD', 
      name: 'Manila PHP Hub', 
      icon: '🇵🇭', 
      bankCode: 'WSE',
      bankName: 'Wise Pilipinas Inc.',
      investmentState: 'NOT_INVESTED', 
      amount: { value: 485000000000, currency: 'PHP' }, 
      reservedAmount: { value: 0, currency: 'PHP' }, 
      cashAmount: { value: 485000000000, currency: 'PHP' }, 
      totalWorth: { value: 485000000000, currency: 'PHP' }, 
      visible: true 
    },
    { 
      id: 200003, 
      currency: 'USD', 
      type: 'SAVINGS', 
      name: 'Founder Prosperity Jar', 
      icon: '🏺', 
      investmentState: 'NOT_INVESTED', 
      amount: { value: 54500000, currency: 'USD' }, 
      reservedAmount: { value: 0, currency: 'USD' }, 
      cashAmount: { value: 54500000, currency: 'USD' }, 
      totalWorth: { value: 54500000, currency: 'USD' }, 
      visible: true 
    }
  ]);

  const [activeBalanceId, setActiveBalanceId] = useState(579574570220942);
  const [isRouting, setIsRouting] = useState(false);
  const [routeStep, setRouteStep] = useState(0);
  const [showApiConsole, setShowApiConsole] = useState(false);
  const [apiLogs, setApiLogs] = useState<string[]>(['[WISE_API] Handshake initialized...', '[WISE_API] mTLS Identity Handshake Verified.', '[WISE_API] api-mtls.transferwise.com LATCHED.']);
  const [tunnelPulse, setTunnelPulse] = useState(false);
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
      return () => clearInterval(interval);
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
    setApiLogs(prev => [...prev, `[WISE_API] mTLS Tunnel re-anchoring for ${bal?.currency} context: Account_${id}`]);
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
                 SOVEREIGN ACCOUNT ANCHORING
               </span>
               <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500 text-black text-[8px] font-black uppercase tracking-widest shadow-lg">
                  <Lock className="w-2.5 h-2.5" />
                  ID VERIFIED: NE.B.RU
               </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={toggleCurrency}
             className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-slate-500 hover:text-white hover:border-cyan-500/50 transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
           >
              <Coins className="w-4 h-4" />
              VIEW: {preferredCurrency}
           </button>
           <div className="px-6 py-2 rounded-full border-2 border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-black text-[10px] uppercase tracking-[0.4em] flex items-center gap-3 shadow-lg">
              <ShieldCheck className="w-4 h-4" />
              WISE_PRODUCTION_SECURED
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Account Selector Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <div className="flex items-center justify-between px-4">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Linked Wise Rails</span>
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
                      {balance.icon}
                    </div>
                    <div className="flex flex-col text-left">
                       <span className="text-[10px] font-black uppercase tracking-tighter truncate max-w-[120px]">
                         {balance.name}
                       </span>
                       <span className={`text-[8px] font-bold uppercase ${activeBalanceId === balance.id ? 'text-black' : 'text-emerald-500'}`}>
                         {balance.currency} • {balance.id}
                       </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeBalanceId === balance.id ? 'rotate-90' : ''}`} />
                </button>
              ))}
           </div>
        </div>

        {/* Account Detail View */}
        <div className="lg:col-span-8 space-y-8">
           <div className="p-10 rounded-[3.5rem] bg-black border border-slate-800 shadow-inner relative overflow-hidden group/main">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover/main:opacity-100 transition-opacity"></div>
              
              <div className="flex items-center justify-between mb-10 relative z-10">
                 <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-black uppercase tracking-[0.4em] text-cyan-500">{activeBalance.name} Details</span>
                    <div className="flex items-center gap-2 px-3 py-1 rounded bg-black border border-slate-800 w-fit">
                       <Wifi className="w-3 h-3 text-emerald-500" />
                       <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter italic">mTLS_Production_Channel</span>
                    </div>
                 </div>
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-end">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Account ID</span>
                    <span className="text-xl font-black text-white mono">{activeBalance.id}</span>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 mb-10">
                 {activeBalance.routingNumber && (
                    <div className="p-6 rounded-[2rem] bg-slate-900/60 border border-slate-800 space-y-2">
                       <div className="flex items-center gap-3">
                          <Navigation className="w-4 h-4 text-cyan-400" />
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Routing Number</span>
                       </div>
                       <p className="text-2xl font-black text-white mono">{activeBalance.routingNumber}</p>
                    </div>
                 )}
                 {activeBalance.swiftBic && (
                    <div className="p-6 rounded-[2rem] bg-slate-900/60 border border-slate-800 space-y-2">
                       <div className="flex items-center gap-3">
                          <Network className="w-4 h-4 text-purple-400" />
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">SWIFT / BIC</span>
                       </div>
                       <p className="text-2xl font-black text-white mono">{activeBalance.swiftBic}</p>
                    </div>
                 )}
                 {activeBalance.bankCode && (
                    <div className="p-6 rounded-[2rem] bg-slate-900/60 border border-slate-800 space-y-2">
                       <div className="flex items-center gap-3">
                          <Code className="w-4 h-4 text-amber-400" />
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Bank Code</span>
                       </div>
                       <p className="text-2xl font-black text-white mono">{activeBalance.bankCode}</p>
                    </div>
                 )}
                 <div className="p-6 rounded-[2rem] bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-3">
                       <Landmark className="w-4 h-4 text-emerald-400" />
                       <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Custodian</span>
                    </div>
                    <p className="text-lg font-black text-white uppercase tracking-tighter">{activeBalance.bankName}</p>
                 </div>
              </div>

              <div className="space-y-4 relative z-10 pt-8 border-t border-slate-900">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Systemic Liquidity ({preferredCurrency})</span>
                    <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[8px] font-black uppercase tracking-widest">
                       SDS_ANCHORED_v16
                    </div>
                 </div>
                 <div className="flex items-baseline gap-4">
                    <span className="text-6xl font-black text-white mono tracking-tighter">
                      {formatCurrencyValue(convertValue(activeBalance.amount.value, activeBalance.currency))}
                    </span>
                    <span className="text-xl font-bold text-slate-700 uppercase">{preferredCurrency}</span>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button className="p-8 rounded-[3rem] bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-[0.4em] text-xs transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-4 group active:scale-95">
                 <ArrowRightLeft className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                 Initialize Transfer
              </button>
              <div className="p-8 rounded-[3rem] bg-black border border-slate-800 flex items-center justify-between group/capacity shadow-inner">
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Institutional Limit</span>
                    <p className="text-xl font-black text-white mono">₱2,000,000,000.00</p>
                 </div>
                 <ShieldCheck className="w-6 h-6 text-emerald-500 opacity-40 group-hover/capacity:opacity-100 transition-opacity" />
              </div>
           </div>
        </div>
      </div>

      <footer className="p-8 rounded-[3rem] bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-between group/footer">
         <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
               <TrendingUp className="w-6 h-6 text-cyan-400" />
               <div className="flex flex-col">
                  <span className="text-xs font-black text-white uppercase tracking-widest">Total Sovereign Valuation</span>
                  <span className="text-xl font-black text-white mono mt-0.5 italic">
                     {formatCurrencyValue(convertValue(985004531802, 'USD'))} {preferredCurrency}
                  </span>
               </div>
            </div>
         </div>
         <div className="text-[9px] font-mono text-slate-700 uppercase tracking-[0.6em] italic font-black">
            SDS_VAULT_DECREE_0x7F_BALOG
         </div>
      </footer>
    </div>
  );
};

export default WiseMandateBridge;


import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Clock, CheckCircle2, XCircle, Loader2, ArrowDownWideNarrow, ArrowUpNarrowWide, Filter } from 'lucide-react';
import { TrackedTransaction } from '../types';

interface RecentTransactionsProps {
  transactions: TrackedTransaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const [sortOrder, setSortOrder] = useState<'DEFAULT' | 'AMOUNT_DESC' | 'AMOUNT_ASC'>('DEFAULT');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'COMPLETED' | 'PENDING'>('ALL');

  const getStatusIcon = (status: TrackedTransaction['status']) => {
    switch (status) {
      case 'CLEARED':
      case 'SETTLED_LIVE':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'FROZEN':
        return <XCircle className="w-4 h-4 text-rose-500" />;
      case 'INITIATING':
      case 'IN_TRANSIT':
      case 'FINALIZING':
      case 'DISBURSING':
        return <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const processedTransactions = useMemo(() => {
    let result = [...transactions];

    // Filter
    if (filterStatus !== 'ALL') {
      result = result.filter(tx => {
        const isComplete = ['CLEARED', 'SETTLED_LIVE'].includes(tx.status);
        return filterStatus === 'COMPLETED' ? isComplete : !isComplete;
      });
    }

    // Sort
    if (sortOrder === 'AMOUNT_DESC') {
      result.sort((a, b) => b.amount - a.amount);
    } else if (sortOrder === 'AMOUNT_ASC') {
      result.sort((a, b) => a.amount - b.amount);
    }

    return result;
  }, [transactions, sortOrder, filterStatus]);

  const toggleSort = () => {
    setSortOrder(prev => {
      if (prev === 'DEFAULT') return 'AMOUNT_DESC';
      if (prev === 'AMOUNT_DESC') return 'AMOUNT_ASC';
      return 'DEFAULT';
    });
  };

  return (
    <div className="p-8 rounded-[3.5rem] bg-slate-900/30 border border-slate-800 space-y-8 h-full flex flex-col">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-black text-white uppercase tracking-tighter">Commanded Asset Movements</h3>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-lg border border-slate-800 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            Live Feed
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setFilterStatus(prev => prev === 'ALL' ? 'COMPLETED' : prev === 'COMPLETED' ? 'PENDING' : 'ALL')}
            className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-all border border-transparent hover:border-slate-700"
            title="Filter Status"
          >
            <Filter className={`w-4 h-4 ${filterStatus !== 'ALL' ? 'text-emerald-400' : ''}`} />
          </button>
          <button 
            onClick={toggleSort}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 border border-slate-800 hover:border-slate-600 transition-all text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-white"
          >
            {sortOrder === 'DEFAULT' ? 'Sort: Recency' : sortOrder === 'AMOUNT_DESC' ? 'Sort: Highest' : 'Sort: Lowest'}
            {sortOrder === 'AMOUNT_DESC' ? <ArrowDownWideNarrow className="w-3 h-3" /> : sortOrder === 'AMOUNT_ASC' ? <ArrowUpNarrowWide className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
          </button>
        </div>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-[300px]">
        {processedTransactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between p-5 rounded-[2rem] bg-black/40 border border-slate-800/50 hover:border-emerald-500/20 transition-all group shadow-inner">
            <div className="flex items-center gap-5">
              <div className={`p-3.5 rounded-2xl bg-slate-900 border border-slate-800 ${
                ['CLEARED', 'SETTLED_LIVE'].includes(tx.status) ? 'text-emerald-400' : 
                tx.status === 'FROZEN' ? 'text-rose-500' : 'text-amber-400'
              }`}>
                <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-black text-white uppercase tracking-wide truncate max-w-[140px] md:max-w-[200px]">{tx.destination}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{tx.platform}</span>
                  <span className="text-slate-800">•</span>
                  <span className="text-[9px] font-mono text-slate-600">{tx.id}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <span className="text-lg font-black text-white mono tracking-tight">${tx.amount.toLocaleString()}</span>
              <div className="flex items-center gap-1.5">
                 {getStatusIcon(tx.status)}
                 <span className={`text-[8px] font-black uppercase tracking-widest ${
                   ['CLEARED', 'SETTLED_LIVE'].includes(tx.status) ? 'text-emerald-500' : 
                   tx.status === 'FROZEN' ? 'text-rose-500' : 'text-amber-500'
                 }`}>
                   {tx.status.replace('_', ' ')}
                 </span>
              </div>
            </div>
          </div>
        ))}
        {processedTransactions.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-slate-600 opacity-50">
            <Filter className="w-8 h-8 mb-2" />
            <span className="text-[10px] font-black uppercase tracking-widest">No Transactions Found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;

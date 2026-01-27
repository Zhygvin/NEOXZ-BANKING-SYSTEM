import React, { useState, useEffect } from 'react';
import { 
  GitBranch, Github, Shield, Lock, FileCode, 
  GitCommit, GitPullRequest, PlayCircle, CheckCircle2, 
  Terminal, Server, Globe, Key, RefreshCw, Box
} from 'lucide-react';

const SourceControlInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'REPOS' | 'APP_CONFIG'>('REPOS');
  const [isBuilding, setIsBuilding] = useState<string | null>(null);
  const [webhookLogs, setWebhookLogs] = useState<string[]>([]);

  // Mock Repositories
  const repos = [
    { id: 'R1', name: 'neoxz-core-v16', status: 'LIVE', lastCommit: 'feat: quantum parity lock', branch: 'main' },
    { id: 'R2', name: 'wise-bridge-adapter', status: 'BUILDING', lastCommit: 'fix: mTLS handshake timeout', branch: 'hotfix/tls' },
    { id: 'R3', name: 'sds-consensus-protocol', status: 'STABLE', lastCommit: 'chore: update node manifest', branch: 'production' }
  ];

  // Simulation Effects
  useEffect(() => {
    const interval = setInterval(() => {
      const actions = ['push', 'pull_request', 'workflow_run', 'deployment_status'];
      const reposList = ['neoxz-core-v16', 'wise-bridge-adapter'];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const repo = reposList[Math.floor(Math.random() * reposList.length)];
      
      const log = `[WEBHOOK] ${new Date().toLocaleTimeString()} event: ${action} | repo: ${repo} | delivery: ${Math.random().toString(36).substr(2, 8)}`;
      setWebhookLogs(prev => [log, ...prev].slice(0, 8));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const triggerBuild = (repoId: string) => {
    setIsBuilding(repoId);
    setTimeout(() => setIsBuilding(null), 3000);
  };

  return (
    <div className="flex flex-col h-full space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between p-8 bg-slate-900/40 border border-indigo-500/20 rounded-[3rem] backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-white shadow-xl">
            <Github className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-[0.4em] text-white">Source Authority Bridge</h2>
            <span className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase italic">GitHub App Integration Hub</span>
          </div>
        </div>
        <div className="flex gap-2 bg-black/40 p-1.5 rounded-2xl border border-slate-800">
           <button 
             onClick={() => setActiveTab('REPOS')}
             className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'REPOS' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
           >
             Repositories
           </button>
           <button 
             onClick={() => setActiveTab('APP_CONFIG')}
             className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'APP_CONFIG' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
           >
             App Manifest
           </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 flex flex-col gap-8 h-full">
           {activeTab === 'REPOS' ? (
             <div className="space-y-6">
                {repos.map((repo) => (
                  <div key={repo.id} className="p-8 rounded-[2.5rem] bg-black/60 border border-slate-800 hover:border-indigo-500/30 transition-all group flex flex-col gap-6 relative overflow-hidden">
                     {isBuilding === repo.id && (
                       <div className="absolute inset-0 bg-indigo-500/5 animate-pulse pointer-events-none"></div>
                     )}
                     
                     <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                           <GitBranch className="w-5 h-5 text-indigo-400" />
                           <h3 className="text-lg font-black text-white tracking-widest">{repo.name}</h3>
                           <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] font-mono text-slate-400 flex items-center gap-2">
                              <GitCommit className="w-3 h-3" />
                              {repo.branch}
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <span className={`text-[10px] font-black uppercase tracking-widest ${repo.status === 'LIVE' ? 'text-emerald-400' : repo.status === 'BUILDING' ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`}>
                              {isBuilding === repo.id ? 'DEPLOYING...' : repo.status}
                           </span>
                           {repo.status !== 'BUILDING' && !isBuilding && (
                             <button 
                               onClick={() => triggerBuild(repo.id)}
                               className="p-2 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-500 transition-all border border-slate-800"
                             >
                                <PlayCircle className="w-5 h-5" />
                             </button>
                           )}
                        </div>
                     </div>

                     <div className="flex items-center gap-3 pl-9">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                        <p className="text-[11px] text-slate-400 font-mono truncate">{repo.lastCommit}</p>
                     </div>
                  </div>
                ))}
             </div>
           ) : (
             <div className="p-10 bg-black/60 border border-slate-800 rounded-[3rem] h-full shadow-inner flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                   <FileCode className="w-48 h-48 text-indigo-500" />
                </div>
                <div className="flex items-center gap-4 border-b border-slate-900 pb-6 relative z-10">
                   <Box className="w-6 h-6 text-emerald-400" />
                   <h3 className="text-xl font-black text-white uppercase tracking-widest">Metadata Configuration</h3>
                </div>
                <div className="space-y-6 font-mono text-[11px] text-slate-300 relative z-10">
                   <div className="flex flex-col gap-2">
                      <span className="text-slate-600 font-bold uppercase">Application Name</span>
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-900">
                         NEOXZ-CORE-v16.2.1
                      </div>
                   </div>
                   <div className="flex flex-col gap-2">
                      <span className="text-slate-600 font-bold uppercase">Permissions Scope</span>
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 flex flex-wrap gap-2">
                         {['repo', 'workflow', 'read:org', 'write:packages'].map(p => (
                           <span key={p} className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{p}</span>
                         ))}
                      </div>
                   </div>
                   <div className="flex flex-col gap-2">
                      <span className="text-slate-600 font-bold uppercase">Callback URL</span>
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 truncate">
                         https://api.neoxz.sh/auth/github/callback
                      </div>
                   </div>
                </div>
             </div>
           )}
        </div>

        {/* Sidebar: Webhooks & Status */}
        <div className="lg:col-span-4 flex flex-col gap-8 h-full">
           <div className="p-8 bg-indigo-500/5 border border-indigo-500/10 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-6">
                 <Shield className="w-6 h-6 text-indigo-400" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-white">Security Context</span>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-slate-800">
                    <span className="text-[9px] font-bold text-slate-500 uppercase">2FA Status</span>
                    <span className="text-[9px] font-black text-emerald-400 uppercase flex items-center gap-2">
                       <CheckCircle2 className="w-3 h-3" /> Enforced
                    </span>
                 </div>
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-slate-800">
                    <span className="text-[9px] font-bold text-slate-500 uppercase">GPG Signing</span>
                    <span className="text-[9px] font-black text-emerald-400 uppercase flex items-center gap-2">
                       <Key className="w-3 h-3" /> Active
                    </span>
                 </div>
              </div>
           </div>

           <div className="flex-1 bg-black border border-slate-800 rounded-[3rem] p-8 flex flex-col overflow-hidden relative shadow-inner">
              <div className="flex items-center gap-3 mb-4 text-slate-500">
                 <Globe className="w-4 h-4" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Webhook Deliveries</span>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 font-mono text-[9px]">
                 {webhookLogs.map((log, i) => (
                   <div key={i} className="text-slate-400 border-l-2 border-indigo-500/20 pl-3 py-1">
                      {log}
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default SourceControlInterface;
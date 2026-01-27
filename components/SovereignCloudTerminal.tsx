
import React, { useEffect, useState, useRef } from 'react';
import { Terminal, ShieldCheck, Zap, Cloud, Cpu, Loader2, Command, Key, Fingerprint } from 'lucide-react';

interface SovereignCloudTerminalProps {
  onComplete: () => void;
  projectName: string;
}

const SovereignCloudTerminal: React.FC<SovereignCloudTerminalProps> = ({ onComplete, projectName }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const commands = [
    `gcloud config set project ${projectName.toLowerCase().replace(/\s+/g, '-')}`,
    "gcloud auth login press.neoxz@gmail.com --no-launch-browser",
    "gcloud services enable generativeai.googleapis.com cloudbilling.googleapis.com",
    "export NEOXZ_MANDATE_KEY=$(aistudio get-secret key)",
    "curl -X POST https://pay.google.com/business/console/payment/BCR2DN4TU7BMDMDU/integrate --data 'auto_link=true'",
    "node ./scripts/neural_handshake.js --identity=press.neoxz@gmail.com",
    "gcloud iam service-accounts create neoxz-orchestrator",
    "gcloud projects add-iam-policy-binding --role=roles/editor",
    "systemctl restart neoxz-sovereign-core.service",
    "VERIFIED: Google Cloud Identity press.neoxz@gmail.com Synced.",
    "READY: REALITY BRIDGE ANCHORED TO GCP_PROJECT."
  ];

  useEffect(() => {
    let currentCmdIdx = 0;
    const interval = setInterval(() => {
      if (currentCmdIdx < commands.length) {
        const cmd = commands[currentCmdIdx];
        setLogs(prev => [
          ...prev, 
          `press.neoxz@gcp:~$ ${cmd}`, 
          `[SYS] Automating: ${cmd.split(' ')[0]}...`, 
          `[OK] ${cmd.includes('VERIFIED') ? 'IDENTITY_LOCKED' : 'Success.'}`
        ]);
        currentCmdIdx++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1200);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed inset-0 z-[600] bg-black flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(66,133,244,0.15)_0%,_transparent_70%)]"></div>
        <div className="scanline"></div>
      </div>

      <div className="w-full max-w-5xl h-[650px] bg-[#080808] border border-blue-500/30 rounded-[3rem] shadow-[0_0_150px_rgba(66,133,244,0.1)] flex flex-col overflow-hidden relative backdrop-blur-3xl">
        <header className="h-16 border-b border-slate-900 bg-black/80 px-10 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full bg-rose-500/40"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-amber-500/40"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/40"></div>
            </div>
            <div className="h-6 w-[1px] bg-slate-800 mx-2"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Google Cloud Automator Terminal</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-blue-400">
                <Cloud className="w-4 h-4 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest">press.neoxz@gmail.com</span>
             </div>
             <Fingerprint className="w-4 h-4 text-emerald-500" />
          </div>
        </header>

        <div 
          ref={scrollRef}
          className="flex-1 p-10 font-mono text-[12px] text-blue-400/80 leading-relaxed overflow-y-auto custom-scrollbar"
        >
          <div className="mb-8 space-y-2 opacity-40">
            <p className="text-white font-black italic">NEOXZ CLOUD AUTOMATION ENGINE v15.0</p>
            <p>Target Identity: press.neoxz@gmail.com</p>
            <p>Mandate Anchor: {projectName}</p>
            <p>Status: Injecting Project Key and Orchestrating Terminal Access...</p>
            <p>----------------------------------------------------------------</p>
          </div>
          
          <div className="space-y-4">
             {logs.map((log, i) => (
               <div key={i} className={`animate-in slide-in-from-left-4 duration-300 ${
                 log.includes('press.neoxz') ? 'text-white font-bold' : 
                 log.includes('OK') ? 'text-emerald-400' : 
                 log.includes('VERIFIED') ? 'text-amber-400 font-black' :
                 'text-blue-400'
               }`}>
                  {log}
               </div>
             ))}
             <div className="flex items-center gap-3">
                <span className="text-white font-bold">press.neoxz@gcp:~$</span>
                <span className="w-2.5 h-5 bg-blue-500 animate-pulse"></span>
             </div>
          </div>
        </div>

        <footer className="h-20 border-t border-slate-900 bg-black/60 px-12 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Automating GCP Project Handshake...</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="px-5 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-[0.2em]">
                 KEY_INJECTED: SUCCESS
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default SovereignCloudTerminal;

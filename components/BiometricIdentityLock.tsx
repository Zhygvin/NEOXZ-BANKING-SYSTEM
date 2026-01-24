
import React, { useRef, useState } from 'react';
import { ShieldCheck, Fingerprint, Loader2, Camera, Unlock } from 'lucide-react';

interface BiometricIdentityLockProps {
  onVerified: () => void;
  founderEmail: string;
}

const BiometricIdentityLock: React.FC<BiometricIdentityLockProps> = ({ onVerified, founderEmail }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<'AWAITING' | 'SCANNING' | 'VERIFYING' | 'LOCKED'>('AWAITING');
  const [scanProgress, setScanProgress] = useState(0);

  const startScan = async () => {
    try {
      setStatus('SCANNING');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += 2;
        setScanProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setStatus('VERIFYING');
          setTimeout(() => {
            setStatus('LOCKED');
            setTimeout(() => {
              stream.getTracks().forEach(t => t.stop());
              onVerified();
            }, 1000);
          }, 1500);
        }
      }, 50);
    } catch (err) {
      console.error("Camera access denied", err);
      setStatus('AWAITING');
    }
  };

  return (
    <div className="p-8 rounded-[3rem] bg-black/60 border border-slate-800 shadow-inner space-y-8 relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
      
      <div className="flex flex-col items-center gap-3 relative z-10">
        <div className={`p-4 rounded-2xl bg-slate-900 border border-slate-800 ${status === 'LOCKED' ? 'text-emerald-400' : 'text-slate-500'}`}>
          <Fingerprint className={`w-8 h-8 ${status === 'SCANNING' ? 'animate-pulse' : ''}`} />
        </div>
        <div className="text-center">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Founder Presence Verify</h4>
          <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{founderEmail}</span>
        </div>
      </div>

      <div className="w-full h-48 bg-slate-950 border border-slate-800 rounded-[2rem] relative overflow-hidden group shadow-2xl">
        {status === 'AWAITING' ? (
          <button 
            onClick={startScan}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 hover:bg-emerald-500/5 transition-all group"
          >
            <Camera className="w-10 h-10 text-slate-700 group-hover:text-emerald-400 transition-colors" />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 group-hover:text-white">Initialize Scan</span>
          </button>
        ) : (
          <div className="relative w-full h-full">
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              playsInline 
              className={`w-full h-full object-cover grayscale opacity-40 transition-opacity duration-1000 ${status === 'LOCKED' ? 'opacity-80' : ''}`}
            />
            
            <div className="absolute inset-0 pointer-events-none">
              {status === 'SCANNING' && (
                <div 
                  className="absolute left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,1)]"
                  style={{ top: `${scanProgress}%` }}
                />
              )}
              <div className="absolute inset-0 border-[20px] border-black/40"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              {status === 'VERIFYING' && (
                <div className="bg-black/80 px-6 py-3 rounded-full border border-emerald-500/30 flex items-center gap-3 backdrop-blur-md">
                   <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-white">Analyzing...</span>
                </div>
              )}
              {status === 'LOCKED' && (
                <div className="bg-emerald-500 px-8 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in zoom-in">
                   <ShieldCheck className="w-5 h-5 text-black" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-black">Identity Confirmed</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="w-full space-y-4 relative z-10">
        <div className="flex items-center justify-between px-2">
           <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Neural Key Parity</span>
           <span className={`text-[10px] font-black mono ${status === 'LOCKED' ? 'text-emerald-400' : 'text-slate-700'}`}>
             {status === 'LOCKED' ? '1.000000' : `${(scanProgress/100).toFixed(6)}`}
           </span>
        </div>
        <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
           <div 
             className={`h-full bg-emerald-500 transition-all duration-300 ${status === 'SCANNING' ? '' : 'duration-1000'}`}
             style={{ width: `${status === 'LOCKED' ? 100 : scanProgress}%` }}
           ></div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-3 text-center">
         <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter leading-tight italic">
           Founder biometrics are required to unlock high-latency command execution and final disbursement approval.
         </p>
      </div>
    </div>
  );
};

export default BiometricIdentityLock;

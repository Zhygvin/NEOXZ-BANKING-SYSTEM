
import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, X, CheckCircle2, Loader2, Database, ShieldCheck, Zap, HardDrive, Share2 } from 'lucide-react';
import { IngestedFile } from '../types';

interface DataIngestionVaultProps {
  onUpload: (files: IngestedFile[]) => void;
  ingestedFiles: IngestedFile[];
}

const DataIngestionVault: React.FC<DataIngestionVaultProps> = ({ onUpload, ingestedFiles }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    
    setUploading(true);
    const newFiles: IngestedFile[] = [];
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      // Simulate "Quantum Ingestion" delay
      await new Promise(r => setTimeout(r, 600));
      
      newFiles.push({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }),
        status: 'ANALYZED',
        hash: `0x${Math.random().toString(16).substr(2, 16).toUpperCase()}`
      });
    }
    
    onUpload(newFiles);
    setUploading(false);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-slate-900/40 border border-indigo-500/20 rounded-[3rem] p-10 space-y-8 shadow-3xl relative overflow-hidden backdrop-blur-3xl group transition-all hover:border-indigo-500/40">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Database className="w-48 h-48 text-indigo-500" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-5">
          <div className="p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20">
            <UploadCloud className={`w-8 h-8 text-indigo-400 ${uploading ? 'animate-bounce' : ''}`} />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white">Quantum Data Ingestion</h3>
            <span className="text-[10px] text-indigo-500 font-bold tracking-widest uppercase italic">SOVEREIGN PAYLOAD VAULT</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className={`px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest ${ingestedFiles.length > 0 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
             {ingestedFiles.length} PAYLOADS ANCHORED
           </div>
        </div>
      </div>

      <div className="relative z-10">
        <div 
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`h-48 rounded-[2.5rem] border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${
            isDragging ? 'border-indigo-400 bg-indigo-500/10 scale-[0.99]' : 'border-slate-800 bg-black/40 hover:border-indigo-500/40 hover:bg-black/60'
          }`}
        >
          <input 
            type="file" 
            multiple 
            className="hidden" 
            ref={fileInputRef} 
            onChange={(e) => handleFiles(e.target.files)} 
          />
          
          {uploading ? (
            <>
              <Loader2 className="w-12 h-12 text-indigo-400 animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 animate-pulse">Analyzing Payloads...</span>
            </>
          ) : (
            <>
              <div className="p-4 rounded-full bg-slate-900 text-slate-500 group-hover:text-indigo-400 transition-colors">
                <HardDrive className="w-8 h-8" />
              </div>
              <div className="text-center">
                <p className="text-[11px] font-black text-white uppercase tracking-widest">Drop Evidence or Reality Assets</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter mt-1 italic">Authorized only for Founder Sovereignty</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4 relative z-10 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
        {ingestedFiles.length === 0 ? (
          <div className="py-8 text-center opacity-20 italic text-[10px] font-black uppercase tracking-widest text-slate-500">
            Vault Memory Empty
          </div>
        ) : (
          ingestedFiles.map((file) => (
            <div key={file.id} className="p-5 rounded-[2rem] bg-black/60 border border-slate-800 hover:border-indigo-500/30 transition-all flex items-center justify-between group/file">
              <div className="flex items-center gap-4">
                 <div className="p-3 rounded-xl bg-slate-900 text-slate-500 group-hover/file:text-indigo-400 transition-colors">
                    <FileText className="w-5 h-5" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-200 tracking-tight uppercase truncate max-w-[180px]">{file.name}</span>
                    <div className="flex items-center gap-3">
                       <span className="text-[8px] font-mono text-slate-500">{formatSize(file.size)}</span>
                       <div className="w-1 h-1 rounded-full bg-slate-800"></div>
                       <span className="text-[8px] font-mono text-indigo-500/60">{file.hash.substring(0, 10)}...</span>
                    </div>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 text-emerald-400">
                       <ShieldCheck className="w-3 h-3" />
                       <span className="text-[9px] font-black uppercase">{file.status}</span>
                    </div>
                    <span className="text-[8px] text-slate-600 font-bold mono">{file.timestamp}</span>
                 </div>
                 <button className="p-2 rounded-lg bg-slate-900 hover:bg-rose-500/10 hover:text-rose-500 transition-all border border-slate-800">
                    <X className="w-3 h-3" />
                 </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center gap-4">
         <Zap className="w-4 h-4 text-indigo-400 animate-pulse" />
         <p className="text-[9px] text-slate-500 leading-relaxed font-black uppercase tracking-tighter text-center">
           "Ingested data is processed via QPP and anchored to the Master Ledger."
         </p>
      </div>
    </div>
  );
};

export default DataIngestionVault;

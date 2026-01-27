import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, FileText, X, CheckCircle2, Loader2, Database, 
  ShieldCheck, Zap, HardDrive, Share2, Video, Sparkles, 
  Play, Eye, Search, Lock, AlertTriangle, Key, ArrowRight,
  Tornado, Trash2
} from 'lucide-react';
import { IngestedFile } from '../types';
import { GoogleGenAI } from "@google/genai";

interface DataIngestionVaultProps {
  onUpload: (files: IngestedFile[]) => void;
  onDelete?: (id: string) => void;
  ingestedFiles: IngestedFile[];
}

const DataIngestionVault: React.FC<DataIngestionVaultProps> = ({ onUpload, onDelete, ingestedFiles }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeSubView, setActiveSubView] = useState<'INGEST' | 'MEDIA_LAB'>('INGEST');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Video Generation States
  const [videoPrompt, setVideoPrompt] = useState('');
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoStatus, setVideoStatus] = useState('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  // Deletion Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      if ((window as any).aistudio?.hasSelectedApiKey) {
        const selected = await (window as any).aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if ((window as any).aistudio?.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

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

  const confirmDelete = () => {
    if (deleteTarget && onDelete) {
      onDelete(deleteTarget);
      setDeleteTarget(null);
    }
  };

  const generateVideo = async () => {
    if (!videoPrompt || isGeneratingVideo) return;
    
    setIsGeneratingVideo(true);
    setVideoStatus('Initiating Sovereign Veo Engine...');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `[NEOXZ MANDATE] ${videoPrompt}`,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      const loadingMessages = [
        "Computing sub-atomic frames...",
        "Applying reality-parity shaders...",
        "Finalizing mandate synchronization...",
        "Encoding sovereign MP4 stream...",
        "Anchoring pixels to the global ledger..."
      ];
      
      let msgIndex = 0;
      while (!operation.done) {
        setVideoStatus(loadingMessages[msgIndex % loadingMessages.length]);
        msgIndex++;
        await new Promise(resolve => setTimeout(resolve, 8000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        setGeneratedVideoUrl(`${downloadLink}&key=${process.env.API_KEY}`);
        // Add to ingested files list as a simulation of a reality asset
        onUpload([{
          id: Math.random().toString(36).substr(2, 9),
          name: `GEN_VIDEO_${Date.now()}.mp4`,
          size: 0,
          type: 'video/mp4',
          timestamp: new Date().toLocaleTimeString(),
          status: 'PROCESSED_VIDEO',
          hash: `SDS-VEO-${Math.random().toString(16).substr(2, 8).toUpperCase()}`
        }]);
      }
    } catch (e: any) {
      console.error(e);
      setVideoStatus(`System Error: ${e.message || 'Quantum instability detected.'}`);
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* Sub-Navigation */}
      <div className="flex items-center gap-2 bg-black/40 border border-slate-800 p-1.5 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveSubView('INGEST')}
          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSubView === 'INGEST' ? 'bg-cyan-500 text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}
        >
          Payload Ingest
        </button>
        <button 
          onClick={() => setActiveSubView('MEDIA_LAB')}
          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSubView === 'MEDIA_LAB' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
        >
          Sovereign Media Lab
        </button>
      </div>

      {activeSubView === 'INGEST' ? (
        <div className="bg-slate-900/40 border border-cyan-500/20 rounded-[3rem] p-10 space-y-8 shadow-3xl relative overflow-hidden backdrop-blur-3xl group transition-all hover:border-cyan-500/40">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Database className="w-48 h-48 text-cyan-500" />
          </div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-5">
              <div className="p-4 rounded-3xl bg-cyan-500/10 border border-cyan-500/20">
                <UploadCloud className={`w-8 h-8 text-cyan-400 ${uploading ? 'animate-bounce' : ''}`} />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white">Quantum Ingestion Vault</h3>
                <span className="text-[10px] text-cyan-500 font-bold tracking-widest uppercase italic">SDS PARITY ANCHORING ACTIVE</span>
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
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
              className={`h-48 rounded-[2.5rem] border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${
                isDragging ? 'border-cyan-400 bg-cyan-500/10 scale-[0.99]' : 'border-slate-800 bg-black/40 hover:border-cyan-500/40 hover:bg-black/60'
              }`}
            >
              <input type="file" multiple className="hidden" ref={fileInputRef} onChange={(e) => handleFiles(e.target.files)} />
              
              {uploading ? (
                <>
                  <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 animate-pulse">Computing SDS Hashes...</span>
                </>
              ) : (
                <>
                  <div className="p-4 rounded-full bg-slate-900 text-slate-500 group-hover:text-cyan-400 transition-colors">
                    <HardDrive className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="text-[11px] font-black text-white uppercase tracking-widest">Stage Reality Assets</p>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter mt-1 italic">Identity-linked anchoring for NE.B.RU</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4 relative z-10 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {ingestedFiles.length === 0 ? (
              <div className="py-8 text-center opacity-20 italic text-[10px] font-black uppercase tracking-widest text-slate-500">
                Vault Rails Empty
              </div>
            ) : (
              ingestedFiles.map((file) => (
                <div key={file.id} className="p-5 rounded-[2rem] bg-black/60 border border-slate-800 hover:border-cyan-500/30 transition-all flex items-center justify-between group/file">
                  <div className="flex items-center gap-4">
                     <div className="p-3 rounded-xl bg-slate-900 text-slate-500 group-hover/file:text-cyan-400 transition-colors">
                        <FileText className="w-5 h-5" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-200 tracking-tight uppercase truncate max-w-[180px]">{file.name}</span>
                        <div className="flex items-center gap-3">
                           <span className="text-[8px] font-mono text-slate-500">{formatSize(file.size)}</span>
                           <div className="w-1 h-1 rounded-full bg-slate-800"></div>
                           <span className="text-[8px] font-mono text-cyan-500/60">{file.hash.substring(0, 14)}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 text-emerald-400">
                           <ShieldCheck className="w-3 h-3" />
                           <span className="text-[9px] font-black uppercase">ANCHORED</span>
                        </div>
                        <span className="text-[8px] text-slate-600 font-bold mono">{file.timestamp}</span>
                     </div>
                     <button 
                        onClick={() => setDeleteTarget(file.id)}
                        className="p-2 rounded-lg bg-slate-900 hover:bg-rose-500/10 hover:text-rose-500 transition-all border border-slate-800"
                     >
                        <Trash2 className="w-3 h-3" />
                     </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/40 border border-purple-500/20 rounded-[3rem] p-10 space-y-10 shadow-3xl relative overflow-hidden backdrop-blur-3xl group transition-all hover:border-purple-500/40">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Video className="w-48 h-48 text-purple-500" />
           </div>

           <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-5">
                <div className="p-4 rounded-3xl bg-purple-500/10 border border-purple-500/20">
                  <Sparkles className={`w-8 h-8 text-purple-400 ${isGeneratingVideo ? 'animate-pulse' : ''}`} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white">Sovereign Veo Media Lab</h3>
                  <span className="text-[10px] text-purple-500 font-bold tracking-widest uppercase italic">GEN-AI REALITY SYNTHESIS</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                 {!hasApiKey ? (
                   <button 
                    onClick={handleSelectKey}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-black font-black uppercase tracking-widest text-[9px] shadow-xl animate-pulse"
                   >
                     <Key className="w-3 h-3" />
                     Link Master Key
                   </button>
                 ) : (
                   <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-black uppercase tracking-widest">
                     <ShieldCheck className="w-3 h-3" />
                     Key Anchored
                   </div>
                 )}
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
              <div className="lg:col-span-7 space-y-6">
                 <div className="space-y-4">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Reality Blueprint (Prompt)</label>
                    <div className="relative">
                       <textarea 
                         value={videoPrompt}
                         onChange={(e) => setVideoPrompt(e.target.value)}
                         placeholder="Describe the reality asset to manifest..."
                         className="w-full bg-black border border-slate-800 rounded-[2rem] px-8 py-6 text-sm font-medium text-white outline-none focus:border-purple-500/50 h-40 resize-none shadow-inner"
                       />
                       <Zap className="absolute right-6 top-6 w-5 h-5 text-purple-800" />
                    </div>
                 </div>

                 <button 
                   onClick={generateVideo}
                   disabled={isGeneratingVideo || !videoPrompt || !hasApiKey}
                   className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-[11px] transition-all flex items-center justify-center gap-4 group ${
                     isGeneratingVideo ? 'bg-slate-900 text-slate-500 cursor-wait' : 'bg-purple-600 hover:bg-purple-500 text-white shadow-2xl shadow-purple-500/30'
                   } disabled:opacity-20`}
                 >
                    {isGeneratingVideo ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {videoStatus}
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Manifest Reality Video
                      </>
                    )}
                 </button>
                 
                 <div className="p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/20 flex items-center gap-4">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                    <p className="text-[9px] text-slate-500 font-bold leading-relaxed uppercase">
                      Quantum video synthesis takes approximately 2-5 minutes per cycle. Ensure your GCP project is in a paid state before launching.
                    </p>
                 </div>
              </div>

              <div className="lg:col-span-5 h-[400px] bg-black border border-slate-800 rounded-[3rem] overflow-hidden relative shadow-2xl flex flex-col items-center justify-center">
                 {isGeneratingVideo ? (
                    <div className="flex flex-col items-center gap-6 p-8 text-center">
                       <div className="w-24 h-24 rounded-full border-4 border-purple-500/20 flex items-center justify-center relative">
                          <Tornado className="w-12 h-12 text-purple-400 animate-spin" />
                          <div className="absolute inset-0 border-t-4 border-purple-500 rounded-full animate-spin"></div>
                       </div>
                       <div className="space-y-2">
                          <p className="text-xs font-black text-white uppercase tracking-widest">Synthesis in Progress</p>
                          <p className="text-[8px] font-mono text-purple-500 uppercase">{videoStatus}</p>
                       </div>
                    </div>
                 ) : generatedVideoUrl ? (
                    <div className="w-full h-full relative group/player">
                       <video src={generatedVideoUrl} controls className="w-full h-full object-cover" />
                       <div className="absolute top-4 right-4 z-10">
                          <div className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black text-[9px] font-black uppercase tracking-widest shadow-xl">
                            SYNTHESIZED
                          </div>
                       </div>
                    </div>
                 ) : (
                    <div className="flex flex-col items-center gap-4 opacity-20 grayscale text-center p-12">
                       <Play className="w-16 h-16 text-slate-500" />
                       <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Command...</p>
                    </div>
                 )}
              </div>
           </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[6000] bg-black/90 backdrop-blur-md flex items-center justify-center p-8 animate-in fade-in duration-200">
           <div className="bg-slate-900 border border-rose-500/30 rounded-[3rem] p-10 max-w-md w-full shadow-[0_0_50px_rgba(244,63,94,0.15)] flex flex-col items-center text-center space-y-6 transform animate-in zoom-in-95">
              <div className="p-6 rounded-full bg-rose-500/10 border border-rose-500/20">
                 <Trash2 className="w-12 h-12 text-rose-500" />
              </div>
              <div className="space-y-2">
                 <h4 className="text-xl font-black text-white uppercase tracking-wider">Confirm Incineration</h4>
                 <p className="text-xs text-slate-400 font-medium">
                   This action will permanently scrub this payload from the Staging Vault. The data cannot be recovered once incinerated.
                 </p>
              </div>
              <div className="flex gap-4 w-full pt-4">
                 <button 
                   onClick={() => setDeleteTarget(null)}
                   className="flex-1 py-4 rounded-2xl bg-slate-800 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:bg-slate-700 transition-all"
                 >
                   Cancel
                 </button>
                 <button 
                   onClick={confirmDelete}
                   className="flex-1 py-4 rounded-2xl bg-rose-600 text-white font-black uppercase tracking-widest text-[10px] hover:bg-rose-500 transition-all shadow-lg shadow-rose-500/20"
                 >
                   Confirm Deletion
                 </button>
              </div>
           </div>
        </div>
      )}

      <footer className="flex items-center justify-between px-6 pt-4 border-t border-slate-900 opacity-40 hover:opacity-100 transition-opacity">
         <div className="flex items-center gap-4">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">SDS INTEGRITY: 1.000000</span>
         </div>
         <div className="flex items-center gap-6">
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">PH_MNL_PRODUCTION_ANCHOR</span>
         </div>
      </footer>
    </div>
  );
};

export default DataIngestionVault;
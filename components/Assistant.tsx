
import React, { useState, useRef, useEffect } from 'react';
import { Send, Command, Sparkles, Image as ImageIcon, Loader2, Link2, ShieldCheck, Cpu, Mic, Paperclip, X } from 'lucide-react';
import { chatWithAssistant, enhancePrompt } from '../services/geminiService.ts';
import { ChatMessage } from '../types.ts';

interface AssistantProps {
  systemContext?: any;
  onCommand?: (cmd: string) => void;
  isBankAligned?: boolean;
}

const Assistant: React.FC<AssistantProps> = ({ systemContext, onCommand, isBankAligned = true }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([{ 
    role: 'model', agentName: 'NEOXZ AI', text: 'Command Zone Ready. Direct Aligned Pipelines: ACTIVE.' 
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !attachedImage) || loading) return;
    
    const imageBase64 = attachedImage ? attachedImage.split(',')[1] : undefined;
    const userMsg: ChatMessage = { role: 'user', text: input, imageBase64: attachedImage || undefined };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setAttachedImage(null);
    setLoading(true);

    try {
      let contextPrompt = input;
      if (systemContext) {
        const contextStr = `
[LIVE SYSTEM TELEMETRY]
- ACTIVE_VIEW: ${systemContext.activeTab}
- USER_IDENTITY: ${systemContext.subscriberName}
- REGION_LOCK: ${systemContext.subscriberRegion}
- THREAT_LEVEL: ${systemContext.threatLevel}
- CORE_IMMUTABILITY: ${systemContext.coreImmutability}
- LIQUID_RESERVE: $${systemContext.balance}
- BANK_PIPELINE: ${isBankAligned ? 'ALIGNED' : 'DISCONNECTED'}
`;
        contextPrompt = `${contextStr}\n\nUSER COMMAND: ${input || 'Analyze attached image context.'}`;
      }

      const response = await chatWithAssistant(messages.filter(m => m.role !== 'user' || m.text !== ''), contextPrompt, imageBase64);
      let text = response.text;
      
      try { 
        const parsed = JSON.parse(response.text);
        text = parsed.text; 
      } catch (e) {}

      if (text) {
        const triggerMatch = text.match(/\[TRIGGER:(.*?)\]/);
        if (triggerMatch && onCommand) {
          onCommand(triggerMatch[1]);
          text = text.replace(/\[TRIGGER:.*?\]/, '').trim();
        }
      }
      
      setMessages(prev => [...prev, { role: 'model', agentName: 'NEOXZ AI', text: text || 'Mandate acknowledged.' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', agentName: 'SYSTEM', text: 'Pipeline instability detected. Re-anchoring...' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/60 backdrop-blur-2xl border-l border-white/5 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
      {/* Assistant Header */}
      <div className="p-8 border-b border-white/5 flex flex-col gap-6 bg-white/[0.02]">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4 text-emerald-500">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                 <Cpu className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Neural Command</span>
                 <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500">v16.2.1 PRO</span>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <button className="p-2 rounded-xl bg-slate-900 text-slate-500 hover:text-white transition-all">
                 <Mic className="w-4 h-4" />
              </button>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
           </div>
        </div>

        {/* Pipeline Status Indicator */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-black border border-white/5">
           <div className="flex items-center gap-3">
              <Link2 className={`w-4 h-4 ${isBankAligned ? 'text-cyan-400' : 'text-slate-600'}`} />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Bank Pipeline</span>
           </div>
           <div className="flex items-center gap-2">
              <span className={`text-[9px] font-black uppercase ${isBankAligned ? 'text-cyan-400' : 'text-slate-600'}`}>
                 {isBankAligned ? 'ALIGNED' : 'DISCONNECTED'}
              </span>
              {isBankAligned && <ShieldCheck className="w-3 h-3 text-emerald-500" />}
           </div>
        </div>
      </div>

      {/* Messages Stream */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col gap-2 ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
             {m.agentName && (
               <div className="flex items-center gap-2 mb-1 px-2">
                  <div className={`w-1 h-3 ${m.role === 'user' ? 'bg-slate-700' : 'bg-emerald-500'}`}></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{m.agentName}</span>
               </div>
             )}
             <div className={`p-5 rounded-3xl text-sm leading-relaxed max-w-[92%] shadow-2xl ${
               m.role === 'user' 
                 ? 'bg-slate-900 border border-slate-800 text-white rounded-tr-none' 
                 : 'bg-emerald-950/20 text-emerald-50 border border-emerald-500/20 rounded-tl-none backdrop-blur-md'
             }`}>
               {m.imageBase64 && (
                 <div className="mb-3 rounded-xl overflow-hidden border border-white/10">
                    <img src={m.imageBase64} alt="attached" className="w-full h-auto object-cover max-h-48" />
                 </div>
               )}
               {m.text}
             </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-3 text-emerald-500/50 pl-4 animate-pulse">
             <Loader2 className="w-4 h-4 animate-spin" />
             <span className="text-[9px] font-black uppercase tracking-[0.2em]">Synthesizing Mandate...</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-8 border-t border-white/5 bg-black/40 space-y-4">
         {attachedImage && (
           <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-emerald-500/50 animate-in zoom-in duration-200">
              <img src={attachedImage} className="w-full h-full object-cover" alt="preview" />
              <button 
                onClick={() => setAttachedImage(null)}
                className="absolute top-1 right-1 p-0.5 bg-black/80 rounded-full text-white hover:text-rose-500 transition-colors"
              >
                 <X className="w-3 h-3" />
              </button>
           </div>
         )}
         
         <div className="relative group">
            <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="DIRECTIVE INPUT..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-14 pr-14 py-5 text-sm text-white outline-none focus:border-emerald-500/50 transition-all font-mono placeholder:text-slate-700 relative z-10"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 text-slate-500 hover:text-emerald-500 transition-all z-20"
              title="Attach Logic Context"
            >
               <Paperclip className="w-5 h-5" />
            </button>
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            
            <button 
              onClick={handleSend}
              disabled={loading || (!input.trim() && !attachedImage)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl transition-all disabled:opacity-20 disabled:grayscale z-20 shadow-lg active:scale-95"
            >
               <Send className="w-5 h-5" />
            </button>
         </div>
         <div className="flex justify-between items-center px-2 opacity-30">
            <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none">SDS_TUNNEL_ACTIVE</span>
            <span className="text-[7px] font-mono text-slate-500 uppercase tracking-tighter">MANDATE_v16.2.1-PRO</span>
         </div>
      </div>
    </div>
  );
};

export default Assistant;

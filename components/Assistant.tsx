
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Zap, Crown, MessageSquare, UploadCloud, Paperclip, Play, Image as ImageIcon, Video, Loader2, Volume2, Globe, SearchCheck, MapPin, ShieldAlert, Landmark, Cpu, Orbit, Gavel, Radio, ShieldX, ExternalLink, Layers3, Gem, Star } from 'lucide-react';
import { chatWithAssistant, generateSpeech } from '../services/geminiService.ts';
import { ChatMessage, GroundingSource } from '../types.ts';

interface AssistantProps {
  onToolCall?: (toolName: string, args: any) => Promise<string>;
}

const Assistant: React.FC<AssistantProps> = ({ onToolCall }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePayload, setImagePayload] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const isDeployed = localStorage.getItem('neoxz_deployed') === 'true';
    if (isDeployed) {
      setMessages([
        { 
          role: 'model', 
          agentName: 'NEOXZ AI',
          text: 'SOVEREIGN CORE ACTIVE. The Unified Consortium is operating in Production. How shall we displace capital, Commander?' 
        }
      ]);
    } else {
      setMessages([
        { 
          role: 'model', 
          agentName: 'NEOXZ AI',
          text: 'SYSTEM STAGED. Lead Authority transfer pending for this node. Command the Master Launch at your will, Founder.' 
        }
      ]);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getAudioContext = (sampleRate: number) => {
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return null;
      if (!(window as any).AudioContext && (window as any).webkitAudioContext) {
        return new (window as any).webkitAudioContext();
      }
      try {
        return new AudioCtx({ sampleRate });
      } catch (e) {
        return new AudioCtx();
      }
    } catch (err) {
      return null;
    }
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const playSpeech = async (text: string) => {
    try {
      const base64Audio = await generateSpeech(text);
      if (base64Audio) {
        if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
          audioContextRef.current = getAudioContext(24000);
        }
        const ctx = audioContextRef.current;
        if (ctx) {
          if (ctx.state === 'suspended') await ctx.resume();
          const buffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          source.connect(ctx.destination);
          source.start();
        }
      }
    } catch (e) {
      console.error("Vocal Synthesis Interruption", e);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    const currentImage = imagePayload;
    setInput('');
    setImagePayload(null);
    setLoading(true);

    try {
      const response = await chatWithAssistant(messages, currentInput, currentImage || undefined);
      let responseText = '';
      let activeAgent: any = 'NEOXZ AI';

      try {
        const rawText = response.text || '{}';
        const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const json = JSON.parse(cleanedText);
        responseText = json.text || response.text;
        activeAgent = json.agentName || 'NEOXZ AI';
      } catch (e) {
        responseText = response.text || 'Command processed.';
        activeAgent = 'NEOXZ AI';
      }
      
      if (response.functionCalls && response.functionCalls.length > 0) {
        for (const fc of response.functionCalls) {
          setMessages(prev => [...prev, { 
            role: 'model', 
            agentName: activeAgent,
            text: `[CMD]: ${fc.name.toUpperCase()}...` 
          }]);
          if (onToolCall) {
            const result = await onToolCall(fc.name, fc.args);
            setMessages(prev => [...prev, { 
              role: 'model', 
              agentName: activeAgent,
              text: `[RESULT]: ${result}` 
            }]);
          }
        }
      } else {
        const isGrounding = !!response.candidates?.[0]?.groundingMetadata;
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        const groundingSources = chunks?.filter((c: any) => c.web).map((c: any) => ({
          title: c.web.title,
          uri: c.web.uri
        }));

        setMessages(prev => [...prev, { 
          role: 'model', 
          agentName: activeAgent,
          text: responseText, 
          isGrounding,
          groundingSources
        }]);
        
        if (responseText.length < 600) {
          playSpeech(responseText);
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', agentName: 'NEOXZ AI', text: 'Isolation protocol active. Supremacy maintained.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        setImagePayload(base64);
        setMessages(prev => [...prev, { role: 'user', text: `Attaching Payload for Analysis: ${file.name}` }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const getAgentStyles = (agentName: string) => {
    switch (agentName) {
      case 'NEOXZ Q TEAM':
        return { bg: 'bg-rose-600', border: 'border-rose-700', text: 'text-white', icon: <ShieldAlert className="w-6 h-6" /> };
      case 'NEOXZ BANK AI':
        return { bg: 'bg-amber-500', border: 'border-amber-600', text: 'text-black', icon: <Landmark className="w-6 h-6" /> };
      case 'HARVEY AI':
        return { bg: 'bg-cyan-500', border: 'border-cyan-600', text: 'text-black', icon: <Gavel className="w-6 h-6" /> };
      case 'ZAPPIER AI':
        return { bg: 'bg-orange-500', border: 'border-orange-600', text: 'text-black', icon: <Radio className="w-6 h-6" /> };
      case 'NEOXZ AI':
      default:
        return { bg: 'bg-purple-600', border: 'border-purple-700', text: 'white', icon: <Cpu className="w-6 h-6" /> };
    }
  };

  return (
    <div className="flex flex-col h-full bg-black relative overflow-hidden group border-l border-slate-900 font-sans">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-b from-purple-500/10 to-transparent"></div>

      <div className="p-10 border-b border-slate-900 flex items-center justify-between bg-slate-950/40 relative z-10">
        <div className="flex items-center gap-6">
          <div className="flex -space-x-2">
             <div className="p-2 rounded-xl bg-purple-600 text-white border-2 border-slate-900 shadow-2xl z-50"><Cpu className="w-4 h-4" /></div>
             <div className="p-2 rounded-xl bg-rose-600 text-white border-2 border-slate-900 shadow-2xl z-40"><ShieldAlert className="w-4 h-4" /></div>
             <div className="p-2 rounded-xl bg-amber-500 text-black border-2 border-slate-900 shadow-2xl z-30"><Landmark className="w-4 h-4" /></div>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white">Consortium AI</h3>
            <span className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase italic">SOVEREIGN RAILS</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative flex flex-col min-h-0">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar relative z-10">
          {messages.map((m, i) => {
            const styles = m.agentName ? getAgentStyles(m.agentName) : { bg: 'bg-slate-800', border: 'border-slate-700', text: 'text-slate-400', icon: <User className="w-6 h-6" /> };
            return (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                <div className={`max-w-[92%] flex gap-6 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`mt-1 flex-shrink-0 w-12 h-12 rounded-[1.5rem] flex items-center justify-center border-2 transition-all ${
                    m.role === 'user' 
                      ? 'bg-slate-900 border-slate-800' 
                      : `${styles.bg} ${styles.border} shadow-[0_0_30px_rgba(0,0,0,0.4)]`
                  }`}>
                    {m.role === 'user' ? <User className="w-6 h-6 text-slate-500" /> : styles.icon}
                  </div>
                  <div className={`flex flex-col gap-3 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                    {m.agentName && (
                      <div className="flex items-center gap-2 ml-1">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
                          {m.agentName}
                        </span>
                        {m.agentName === 'NEOXZ AI' && <Star className="w-2.5 h-2.5 text-purple-400 fill-purple-400" />}
                      </div>
                    )}
                    <div className={`p-8 rounded-[2.5rem] text-[13px] leading-relaxed font-medium shadow-3xl relative ${m.role === 'user' ? 'bg-slate-800 text-slate-100 rounded-tr-none border border-slate-700' : 'bg-slate-900/95 text-slate-200 border border-slate-800 rounded-tl-none'}`}>
                      {m.isGrounding && (
                        <div className="flex items-center gap-3 mb-4 px-4 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[9px] font-black uppercase tracking-widest w-fit shadow-lg">
                          <Globe className="w-4 h-4" />
                          GROUNDING_ACTIVE
                        </div>
                      )}
                      {m.text}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-10 border-t border-slate-900 bg-slate-950 relative z-10">
          <div className="relative group">
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleQuickUpload} 
              accept="image/*"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`absolute left-5 top-1/2 -translate-y-1/2 p-3 transition-all ${imagePayload ? 'text-indigo-400 scale-110' : 'text-slate-600 hover:text-indigo-400'}`}
              title="Payload Upload"
            >
              <Paperclip className="w-7 h-7" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Input Mandate..."
              className="w-full bg-slate-900 border-2 border-slate-800 rounded-[2.5rem] pl-20 pr-20 py-6 text-sm font-medium focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/40 outline-none transition-all placeholder:text-slate-700 shadow-2xl"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="absolute right-5 top-1/2 -translate-y-1/2 p-3 text-slate-600 hover:text-emerald-400 transition-all disabled:opacity-20 active:scale-90"
            >
              <Send className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;

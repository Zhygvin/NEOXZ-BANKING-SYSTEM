import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, Paperclip, Sparkles, Command } from 'lucide-react';
import { chatWithAssistant } from '../services/geminiService.ts';
import { ChatMessage } from '../types.ts';

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([{ 
    role: 'model', 
    agentName: 'NEOXZ AI', 
    text: 'Core synchronized. Command zone prepared. Input your sovereign mandate.' 
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const triggerSparkle = (e: React.KeyboardEvent) => {
    if (!containerRef.current) return;
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-particle';
    
    const x = (Math.random() - 0.5) * 150;
    const y = (Math.random() - 0.5) * 150;
    sparkle.style.setProperty('--tw-x', `${x/2}px`);
    sparkle.style.setProperty('--tw-y', `${y/2}px`);
    sparkle.style.setProperty('--tw-x2', `${x}px`);
    sparkle.style.setProperty('--tw-y2', `${y}px`);
    
    sparkle.style.left = `50%`;
    sparkle.style.top = `50%`;
    
    containerRef.current.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    // Quantum Spark Trigger
    const sparks = document.getElementById('sparks-fx');
    const discharge = document.getElementById('discharge-fx');
    sparks?.classList.remove('sparks-active');
    discharge?.classList.remove('discharge-active');
    void sparks?.offsetWidth;
    void discharge?.offsetWidth;
    sparks?.classList.add('sparks-active');
    discharge?.classList.add('discharge-active');

    try {
      const response = await chatWithAssistant(messages, currentInput);
      let responseText = '';
      let activeAgent: any = 'NEOXZ AI';

      try {
        const cleanedText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
        const json = JSON.parse(cleanedText);
        responseText = json.text;
        activeAgent = json.agentName;
      } catch (e) {
        responseText = response.text;
      }

      setMessages(prev => [...prev, { role: 'model', agentName: activeAgent, text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', agentName: 'NEOXZ AI', text: 'Stability maintained. Bridge clear for next command.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black border-l border-white/5 relative" ref={containerRef}>
      <header className="p-10 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="p-3 rounded-xl bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.5)]">
            <Command className="w-6 h-6" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.5em] text-white">Sovereign Deck</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Quantum Link: High</span>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-6`}>
            <div className={`max-w-[92%] space-y-3 ${m.role === 'user' ? 'text-right' : ''}`}>
              {m.agentName && (
                <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] block px-3">
                  {m.agentName}
                </span>
              )}
              <div className={`p-10 rounded-[3rem] text-xl leading-relaxed shadow-3xl ${
                m.role === 'user' 
                  ? 'bg-emerald-600/10 text-emerald-50 border border-emerald-500/30' 
                  : 'bg-white/5 text-slate-300 border border-white/10'
              }`}>
                {m.text}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10">
              <Sparkles className="w-8 h-8 text-emerald-500 animate-spin" />
            </div>
          </div>
        )}
      </div>

      <div className="p-10 pb-20">
        <div className="supreme-input p-10 rounded-[5rem] border relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              triggerSparkle(e);
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Draft your global displacement mandate..."
            className="w-full bg-transparent border-none text-white text-3xl font-medium placeholder:text-slate-800 outline-none resize-none min-h-[280px] custom-scrollbar"
          />
          <div className="flex items-center justify-between mt-10">
             <div className="flex items-center gap-8">
                <button className="p-6 rounded-[2rem] bg-white/5 text-slate-600 hover:text-white transition-all hover:bg-white/10">
                  <Paperclip className="w-8 h-8" />
                </button>
                <div className="flex items-center gap-4 px-8 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                   <Sparkles className="w-5 h-5 text-emerald-400" />
                   <span className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em] leading-none">Quantum Input</span>
                </div>
             </div>
             <button 
               onClick={handleSend}
               disabled={!input.trim() || loading}
               className="p-10 rounded-full bg-white text-black hover:bg-emerald-500 transition-all shadow-[0_0_60px_rgba(255,255,255,0.2)] active:scale-90 disabled:opacity-20 disabled:grayscale"
             >
                <Send className="w-10 h-10" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
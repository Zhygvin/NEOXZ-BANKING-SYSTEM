
import React, { useState, useRef, useEffect } from 'react';
import { Send, Command, Sparkles, Image as ImageIcon, Loader2 } from 'lucide-react';
import { chatWithAssistant, enhancePrompt } from '../services/geminiService.ts';
import { ChatMessage } from '../types.ts';

interface AssistantProps {
  systemContext?: any;
}

const Assistant: React.FC<AssistantProps> = ({ systemContext }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([{ 
    role: 'model', agentName: 'NEOXZ AI', text: 'Command Zone Ready. Awaiting Mandate.' 
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Inject system context into the prompt for awareness
      let contextPrompt = input;
      if (systemContext) {
        const contextStr = `
[LIVE SYSTEM TELEMETRY]
- ACTIVE_VIEW: ${systemContext.activeTab} ${systemContext.dashboardView ? `(${systemContext.dashboardView})` : ''}
- USER_IDENTITY: ${systemContext.subscriberName} <${systemContext.subscriberEmail || 'NO_EMAIL'}>
- REGION_LOCK: ${systemContext.subscriberRegion || 'GLOBAL'}
- THREAT_LEVEL: ${systemContext.threatLevel}
- CORE_IMMUTABILITY: ${systemContext.coreImmutability}
${systemContext.activeAlerts?.length > 0 ? `- SECURITY_ALERTS: [${systemContext.activeAlerts.join(', ')}]` : ''}
- LIQUID_RESERVE: $${systemContext.balance}
${systemContext.businessIntegration ? `
[INTEGRATION LINK]
- PROVIDER: ${systemContext.businessIntegration.provider}
- MERCHANT_ID: ${systemContext.businessIntegration.merchantId}
- STATUS: ${systemContext.businessIntegration.status}
- CONSOLE: ${systemContext.businessIntegration.consoleUrl}
${systemContext.businessIntegration.gatewayResponse ? `- GATEWAY_RESPONSE: ${systemContext.businessIntegration.gatewayResponse}` : ''}
` : ''}
`;
        contextPrompt = `${contextStr}\n\nUSER COMMAND: ${input}`;
      }

      const response = await chatWithAssistant(messages, contextPrompt);
      let text = response.text;
      
      // Attempt to parse JSON response if the model returns it (as per schema)
      try { 
        const parsed = JSON.parse(response.text);
        text = parsed.text; 
      } catch (e) {
        // Fallback if raw text is returned
      }
      
      setMessages(prev => [...prev, { role: 'model', agentName: 'NEOXZ AI', text: text || 'Command processed.' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', agentName: 'SYSTEM', text: 'Link unstable. Retry command.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-xl">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3 text-emerald-500">
           <Command className="w-4 h-4" />
           <span className="text-[10px] font-black uppercase tracking-widest">Sovereign Deck</span>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col gap-1 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
             {m.agentName && <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest ml-1">{m.agentName}</span>}
             <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[90%] ${
               m.role === 'user' ? 'bg-white/10 text-white' : 'bg-emerald-900/10 text-emerald-100 border border-emerald-500/20'
             }`}>
               {m.text}
             </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-emerald-500/50 pl-2 animate-pulse">
             <Loader2 className="w-3 h-3 animate-spin" />
             <span className="text-[8px] font-black uppercase tracking-widest">Processing Logic...</span>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-white/5">
         <div className="relative">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Execute command..."
              className="w-full bg-black/60 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white outline-none focus:border-emerald-500/50 transition-all font-mono placeholder:text-slate-600"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-lg transition-colors text-emerald-500 disabled:opacity-50"
            >
               <Send className="w-4 h-4" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default Assistant;

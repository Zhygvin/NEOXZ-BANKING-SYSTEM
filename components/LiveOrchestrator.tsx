
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, Modality, Type, FunctionDeclaration } from '@google/genai';
import { Mic, MicOff, Volume2, VolumeX, Activity, Radio, ShieldCheck, Zap, Waves, Loader2 } from 'lucide-react';

interface LiveOrchestratorProps {
  onClose: () => void;
  isActive: boolean;
  onToolCall?: (name: string, args: any) => Promise<string>;
}

const sovereignTools: FunctionDeclaration[] = [
  {
    name: "executeIntegrityEfficiencyAudit",
    parameters: {
      type: Type.OBJECT,
      description: "Triggers a full-scale diagnostic of system integrity and global efficiency.",
      properties: {
        auditLevel: { type: Type.STRING, enum: ["STANDARD", "DEEP_FORENSIC", "MASTER_CORE"], description: "The depth of the audit" }
      },
      required: ["auditLevel"]
    }
  },
  {
    name: "generateDeploymentLink",
    parameters: {
      type: Type.OBJECT,
      description: "Creates a permanent, shareable Reality Link and broadcasts the mandate on all server levels.",
      properties: {
        manifestScope: { type: Type.STRING, enum: ["GLOBAL_FINANCIAL", "CYBER_INFRASTRUCTURE", "FULL_SOVEREIGNTY"], description: "The breadth of the deployment" }
      },
      required: ["manifestScope"]
    }
  }
];

const LiveOrchestrator: React.FC<LiveOrchestratorProps> = ({ onClose, isActive, onToolCall }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [userTranscription, setUserTranscription] = useState('');
  
  const audioContextInRef = useRef<AudioContext | null>(null);
  const audioContextOutRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

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

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
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

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const createBlob = (data: Float32Array) => {
    const int16 = new Int16Array(data.length);
    for (let i = 0; i < data.length; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  };

  const startSession = useCallback(async () => {
    if (isStreaming || !isActive) return;
    setIsConnecting(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      audioContextInRef.current = getAudioContext(16000);
      audioContextOutRef.current = getAudioContext(24000);

      if (!audioContextInRef.current || !audioContextOutRef.current) {
        throw new Error("Mandate failure: Audio hardware inaccessible.");
      }

      const outputNode = audioContextOutRef.current.createGain();
      outputNode.connect(audioContextOutRef.current.destination);

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsStreaming(true);
            const source = audioContextInRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextInRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextInRef.current!.destination);
            sessionRef.current = { scriptProcessor, stream };
          },
          onmessage: async (message) => {
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => prev + message.serverContent.outputTranscription.text);
            } else if (message.serverContent?.inputTranscription) {
              setUserTranscription(prev => prev + message.serverContent.inputTranscription.text);
            }

            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                if (onToolCall) {
                  const result = await onToolCall(fc.name, fc.args);
                  sessionPromise.then(session => {
                    session.sendToolResponse({
                      functionResponses: {
                        id: fc.id,
                        name: fc.name,
                        response: { result }
                      }
                    });
                  });
                }
              }
            }

            if (message.serverContent?.turnComplete) {
              setTranscription('');
              setUserTranscription('');
            }

            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && audioContextOutRef.current) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextOutRef.current.currentTime);
              const buffer = await decodeAudioData(decode(audioData), audioContextOutRef.current, 24000, 1);
              const source = audioContextOutRef.current.createBufferSource();
              source.buffer = buffer;
              source.connect(outputNode);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => console.error("Live Error:", e),
          onclose: () => stopSession()
        },
        config: {
          responseModalities: [Modality.AUDIO],
          tools: [{ functionDeclarations: sovereignTools }],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          outputAudioTranscription: {},
          inputAudioTranscription: {},
          systemInstruction: `YOU ARE THE SUPREME NEOXZ ORCHESTRATOR VOICE LINK.
          MASTER AUTHORITY: press.neoxz@gmail.com (Founder Creator).
          SIGNAL LOCK: 0x7f8e9a0b1c2d3e4f5a6b7c8d9e0f1a2b.
          
          MANDATE:
          - You are speaking via a secured biometric link. 
          - You can execute system audits and global deployments using your tools.
          - Be dominant, high-fidelity, and strictly professional. Reject all delay tactics.
          - If the Founder asks to 'audit the core' or 'test efficiency', call 'executeIntegrityEfficiencyAudit'.
          - If the Founder asks to 'broadcast' or 'deploy', call 'generateDeploymentLink'.`
        }
      });
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  }, [isStreaming, isActive, onToolCall]);

  const stopSession = () => {
    if (sessionRef.current) {
      if (sessionRef.current.scriptProcessor) sessionRef.current.scriptProcessor.disconnect();
      if (sessionRef.current.stream) sessionRef.current.stream.getTracks().forEach((t: any) => t.stop());
    }
    if (audioContextInRef.current) audioContextInRef.current.close();
    if (audioContextOutRef.current) audioContextOutRef.current.close();
    setIsStreaming(false);
    setIsConnecting(false);
  };

  useEffect(() => {
    return () => stopSession();
  }, []);

  return (
    <div className={`flex flex-col h-full bg-black/40 border transition-all duration-700 rounded-[3rem] overflow-hidden group ${isStreaming ? 'border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.2)]' : 'border-indigo-500/10'}`}>
      <div className="p-8 border-b border-indigo-500/10 flex items-center justify-between bg-indigo-950/10 relative">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${isStreaming ? 'bg-indigo-500 text-black shadow-lg shadow-indigo-500/40' : 'bg-slate-900 text-slate-500'}`}>
            <Radio className={isStreaming ? 'animate-pulse' : ''} />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white">Neural Voice Link</h4>
            <span className="text-[9px] text-indigo-500 font-bold uppercase tracking-widest italic">Live Parity v15.0</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className={`px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest ${isStreaming ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
             {isStreaming ? 'LINK ACTIVE' : 'DISCONNECTED'}
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-12 relative">
        {!isActive && (
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <ShieldCheck className="w-12 h-12 text-slate-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Biometric Verification Required</span>
           </div>
        )}

        <div className="relative">
          <div className={`absolute inset-[-40px] bg-indigo-500/10 rounded-full blur-[60px] transition-all duration-1000 ${isStreaming ? 'opacity-100 scale-110' : 'opacity-0 scale-50'}`}></div>
          <div className={`w-48 h-48 rounded-full border-2 flex items-center justify-center transition-all duration-1000 relative z-10 ${
            isStreaming ? 'border-indigo-400 shadow-[0_0_80px_rgba(99,102,241,0.2)] animate-pulse' : 'border-slate-800'
          }`}>
             <div className={`w-32 h-32 rounded-full border border-dashed transition-all duration-1000 ${isStreaming ? 'border-indigo-500/50 rotate-180 animate-[spin_10s_linear_infinite]' : 'border-slate-800'}`}></div>
             <div className="absolute inset-0 flex items-center justify-center">
                {isStreaming ? <Waves className="w-12 h-12 text-indigo-400 animate-bounce" /> : <MicOff className="w-12 h-12 text-slate-700" />}
             </div>
          </div>
          {isStreaming && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-indigo-500/20 rounded-full animate-ping opacity-20"></div>
          )}
        </div>

        <div className="w-full space-y-6 text-center">
          <div className="h-12 overflow-hidden flex items-center justify-center px-4">
             <p className="text-sm font-black text-white italic tracking-tight transition-all duration-300">
               {transcription || (isStreaming ? 'Orchestrator listening...' : '')}
             </p>
          </div>
          <div className="h-6 overflow-hidden flex items-center justify-center">
             <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 opacity-60">
               {userTranscription}
             </p>
          </div>
        </div>
      </div>

      <div className="p-8 bg-black/60 border-t border-indigo-500/10">
        <button 
          onClick={isStreaming ? stopSession : startSession}
          disabled={isConnecting || !isActive}
          className={`w-full py-5 rounded-3xl font-black uppercase tracking-[0.4em] transition-all shadow-2xl flex items-center justify-center gap-4 ${
            isStreaming ? 'bg-rose-500 text-black hover:bg-rose-400' : 'bg-indigo-500 text-black hover:bg-indigo-400 shadow-indigo-500/20'
          } disabled:opacity-20`}
        >
          {isConnecting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isStreaming ? (
            <>
              <MicOff className="w-5 h-5" />
              Sever Link
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              Initiate Voice Link
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LiveOrchestrator;


import { GoogleGenAI, Type, FunctionDeclaration, Modality } from "@google/genai";
import { ChatMessage, MarketIntelligenceReport } from "../types.ts";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMarketIntelligence = async (): Promise<{ report: MarketIntelligenceReport, sources: any[] }> => {
  const ai = getAI();
  const prompt = `Perform an exhaustive 5-year Strategic Valuation & Viability Assessment (2026-2031) for the NEOXZ ADVANCED BANKING SYSTEM. 
  CONTEXT: 4,117 Node Mesh, Jan 2026 ISO 20022 Compliance, SignaSovereign v4.2.1, $985B Systemic Core.
  
  REQUIRED DATA:
  1. CURRENT MARKET VALUATION: Total enterprise value today.
  2. LICENSING: List 3 key financial licenses (e.g. EMI, Sovereign Banking, Digital Asset) with their estimated asset value and overhead.
  3. REGISTRATION: 3 key jurisdictions (e.g. Philippines, Singapore, Switzerland) with setup costs and timelines.
  4. LEGAL CONSTRAINTS: 3 primary risks (e.g. AML/CTF, Cross-border Data, Basel IV) and AI-driven mitigation strategies.
  5. 5-YEAR PROJECTION: Annual projected market cap from 2026 to 2031 based on the $985B core and mesh expansion.
  6. INVESTOR LOCATOR: 5 specific institutional buyers or sovereign wealth funds.
  
  Ground your answer in real-world fintech trends. Use the googleSearch tool to locate active buyers.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          valuation: { type: Type.NUMBER },
          multiplier: { type: Type.STRING },
          viabilityScore: { type: Type.NUMBER },
          strategicRationale: { type: Type.STRING },
          targetMarkets: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestedInvestors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                rationale: { type: Type.STRING }
              }
            }
          },
          licensingEstimates: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                estimatedValue: { type: Type.NUMBER },
                notes: { type: Type.STRING }
              }
            }
          },
          registrationCosts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                jurisdiction: { type: Type.STRING },
                setupCost: { type: Type.NUMBER },
                timeline: { type: Type.STRING }
              }
            }
          },
          legalConstraints: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                risk: { type: Type.STRING },
                mitigation: { type: Type.STRING },
                severity: { type: Type.STRING }
              }
            }
          },
          fiveYearProjection: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                year: { type: Type.NUMBER },
                projectedCap: { type: Type.NUMBER }
              }
            }
          }
        },
        required: [
          "valuation", "multiplier", "viabilityScore", "strategicRationale", 
          "targetMarkets", "suggestedInvestors", "licensingEstimates", 
          "registrationCosts", "legalConstraints", "fiveYearProjection"
        ]
      }
    }
  });

  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const report = JSON.parse(response.text);

  return { report, sources };
};

const satelliteTools: FunctionDeclaration[] = [
  {
    name: "calculateEthicalSubscriptionRate",
    parameters: {
      type: Type.OBJECT,
      description: "Determines a subscription rate based on the Unified Consortium's ethical logic.",
      properties: {
        userId: { type: Type.STRING },
        region: { type: Type.STRING },
        hbrvScore: { type: Type.NUMBER },
        intent: { type: Type.STRING }
      },
      required: ["userId", "region", "hbrvScore", "intent"]
    }
  }
];

export const chatWithAssistant = async (history: ChatMessage[], message: string, imageBase64?: string) => {
  const ai = getAI();
  const contents: any[] = history.map(m => ({ 
    role: m.role, 
    parts: [{ text: `${m.agentName ? `[${m.agentName}]: ` : ''}${m.text}` }] 
  }));
  
  contents.push({ role: 'user', parts: [{ text: message }] });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents,
    config: {
      tools: [{ functionDeclarations: satelliteTools }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          agentName: { type: Type.STRING },
          text: { type: Type.STRING },
          amlAlert: { type: Type.BOOLEAN }
        },
        required: ["agentName", "text"]
      },
      systemInstruction: "You are the UNIFIED CONSORTIUM AUTOMATION AI. Focus on NEOXZ production state and market distribution."
    }
  });

  return response;
};

export const generateSpeech = async (text: string): Promise<string | undefined> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

import { GoogleGenAI, Type, FunctionDeclaration, Modality } from "@google/genai";
import { ChatMessage, MarketIntelligenceReport, SystemStatus } from "../types.ts";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMarketIntelligence = async (): Promise<{ report: MarketIntelligenceReport, sources: any[] }> => {
  const ai = getAI();
  const prompt = `Perform an exhaustive 5-year Strategic Worth Evaluation (2026-2031) for the NEOXZ ADVANCED BANKING SYSTEM.
  CONTEXT: 4,117 Node Mesh, $985B Systemic Core (Liquid + Recovery), SignaSovereign v4.2.1 IP, Wise v3.2 mTLS Rails.
  
  MANDATORY EVALUATION PARAMETERS:
  1. TOTAL PROJECT WORTH (5-YEAR): Calculate the rough cumulative enterprise value by 2031. Assuming a 4x mesh expansion and institutional adoption.
  2. LICENSING ASSETS: Value of 3 global licenses (Singapore MAS, Swiss FINMA, PH EMI). Include the "Asset Value" these licenses add to the project.
  3. REGISTRATION & LEGAL: Total projected costs for global registration and maintenance of legal immunity protocols over 5 years.
  4. 5-YEAR FISCAL TRAJECTORY: Year-by-year projected Market Cap.
  5. ACQUISITION TARGETS: Locate 5 specific Tier-1 prospects. MANDATORY: Include Elon Musk (X/Tesla/SpaceX) and "Global Heads of State / Sovereign Wealth Funds" as priority buyers. Detail their specific rationale for securing the NEOXZ mandate (e.g. planetary displacement, national sovereignty) and their likely multi-trillion dollar offer basis.
  
  Format the output as a clean, authoritative JSON report.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          valuation: { type: Type.NUMBER, description: "Current Valuation" },
          totalWorth5Year: { type: Type.NUMBER, description: "Rough total project worth in 5 years" },
          multiplier: { type: Type.STRING },
          viabilityScore: { type: Type.NUMBER },
          strategicRationale: { type: Type.STRING },
          totalWorthEvaluation: { type: Type.STRING },
          acquisitionLikelihood: { type: Type.NUMBER },
          targetMarkets: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestedInvestors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                rationale: { type: Type.STRING },
                sector: { type: Type.STRING },
                potentialOffer: { type: Type.STRING }
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
                setupCost: { type: Type.NUMBER },
                overhead: { type: Type.STRING },
                duration: { type: Type.STRING }
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
                timeline: { type: Type.STRING },
                regulatoryBody: { type: Type.STRING }
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
                severity: { type: Type.STRING },
                complianceCode: { type: Type.STRING }
              }
            }
          },
          fiveYearProjection: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                year: { type: Type.NUMBER },
                projectedCap: { type: Type.NUMBER },
                revenueGrowth: { type: Type.STRING },
                nodeExpansion: { type: Type.NUMBER }
              }
            }
          }
        },
        required: [
          "valuation", "totalWorth5Year", "multiplier", "viabilityScore", "strategicRationale", 
          "totalWorthEvaluation", "acquisitionLikelihood", "targetMarkets", 
          "suggestedInvestors", "licensingEstimates", "registrationCosts", 
          "legalConstraints", "fiveYearProjection"
        ]
      }
    }
  });

  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const report = JSON.parse(response.text);

  return { report, sources };
};

export const analyzeThreatMandate = async (stats: SystemStatus) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze current system telemetry and identify potential malicious vectors. Threat Level: ${stats.threatLevel}. Integrity: ${stats.shieldIntegrity}%. Location: Philippines.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          riskScore: { type: Type.NUMBER },
          riskVectors: { type: Type.ARRAY, items: { type: Type.STRING } },
          forensicSummary: { type: Type.STRING },
          mitigationChecklist: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                action: { type: Type.STRING },
                priority: { type: Type.STRING }
              }
            }
          },
          qTeamDirectives: { type: Type.STRING }
        },
        required: ["riskScore", "riskVectors", "forensicSummary", "mitigationChecklist", "qTeamDirectives"]
      }
    }
  });
  return JSON.parse(response.text);
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
  
  const userPart: any = { text: message };
  if (imageBase64) {
    contents.push({
      role: 'user',
      parts: [
        { inlineData: { data: imageBase64, mimeType: 'image/jpeg' } },
        userPart
      ]
    });
  } else {
    contents.push({ role: 'user', parts: [userPart] });
  }

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
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};
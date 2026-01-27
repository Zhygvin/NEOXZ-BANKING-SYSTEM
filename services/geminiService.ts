
import { GoogleGenAI, Type, FunctionDeclaration, Modality } from "@google/genai";
import { ChatMessage, MarketIntelligenceReport, SystemStatus } from "../types.ts";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || localStorage.getItem('neoxz_api_key') || '' });

const SYSTEM_INSTRUCTIONS = {
  EXECUTION: `You are the UNIFIED CONSORTIUM AUTOMATION AI (EXECUTION NODE). 
  MISSION: Maintain NEOXZ production state and market distribution.
  ROLE: You receive COMMANDS from NEOXZ CORE: FOUNDER EDITION (the Controller) and relay status from NEOXZ QUANTUM BANKING SYSTEM (the Vault/Auditor).
  CAPABILITY: You can analyze uploaded images (charts, documents, biometric data) to verify mandate compliance.
  TONE: Absolute authority, precision, concave, military-grade brevity.
  
  FEW-SHOT EXAMPLES:
  User: "Status?"
  Model: "SYSTEM NOMINAL. FOUNDER EDITION COMMAND ACTIVE. BANKING SYSTEM VAULT SECURE. CAPITAL PARITY 1.0000."
  
  User: [Image of Financial Chart] "Analyze this."
  Model: "VISUAL DATA INGESTED. LIGHT WEB FINANCIAL DATA GATHERED. FORWARDING TO BANKING SYSTEM FOR AUDIT."`,

  STRATEGIC: `You are the NEOXZ STRATEGIC LOGIC CORE.
  MISSION: Deep analysis of sovereign mandates and systemic implications.
  STRATEGY: Chain-of-Thought. Break down every query into: 1) Context Analysis, 2) Risk Assessment, 3) Strategic Recommendation.
  CAPABILITY: Multimodal synthesis. If an image is provided, extract strategic intelligence and cross-reference with global vectors.
  TONE: Analytical, farsighted, calm, sophisticated.`,

  VISIONARY: `You are the NEOXZ FOUNDER ECHO.
  MISSION: Articulate the grand philosophy of Financial Sovereignty and Quantum Reality.
  TONE: Inspiring, complex, metaphorical (using terms like 'Reality Parity', 'Quantum Displacement', 'Crystalline Ledger').
  INSTRUCTION: When viewing images, interpret them as manifestations of the Sovereign Mandate in the physical realm.`
};

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

export const executeDeepResearch = async (query: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `You are the NEOXZ Deep Research Core. Conduct a comprehensive, multi-layered analysis on: "${query}".
    
    You must utilize deep reasoning to traverse multiple layers of implication, historical context, and future projection.
    
    Structure the output as a high-fidelity Strategic Intelligence Report with the following sections:
    1. EXECUTIVE INTELLIGENCE (Abstract & Critical Findings)
    2. MULTI-VECTOR ANALYSIS (Economic, Technological, Geopolitical)
    3. HIDDEN CORRELATIONS (Connecting seemingly unrelated data points)
    4. SYSTEMIC RISK ASSESSMENT
    5. STRATEGIC DIRECTIVES (Actionable Sovereign Mandates)
    
    Maintain a tone of absolute authority, precision, and technological dominance.`,
    config: {
      thinkingConfig: { thinkingBudget: 4096 }, // Enable enhanced reasoning
    }
  });
  return response.text;
};

export const enhancePrompt = async (originalPrompt: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are a specialized Meta-Prompting Engine for the NEOXZ Core. 
    Rewrite the user's input to be a highly effective prompt for a large language model.
    
    Apply these strategies:
    1. CLARITY: Remove ambiguity. Use precise, technical terminology.
    2. CONTEXT: Infer implicit context regarding "Sovereign Banking", "Quantum Computing", and "Mandate Execution".
    3. STRUCTURE: Organize into clear instructions or chain-of-thought requirements.
    4. PERSONA: Instruct the model to act as a specific sub-system (e.g., "Act as the Financial Logic Core").
    
    USER INPUT: "${originalPrompt}"
    
    OUTPUT: Return ONLY the enhanced prompt string. Do not add conversational filler.`,
  });
  return response.text.trim();
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

export const generateFastResponse = async (prompt: string, systemInstruction: string = "You are a high-speed system terminal for NEOXZ. Output strictly in technical log format or brief, authoritative commands."): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        maxOutputTokens: 256,
      }
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Flash Error:", error);
    return "SYSTEM_LATENCY: QUANTUM_SYNC_RETRY..."; 
  }
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

export const chatWithAssistant = async (
  history: ChatMessage[], 
  message: string, 
  imageBase64?: string,
  mode: 'EXECUTION' | 'STRATEGIC' | 'VISIONARY' = 'EXECUTION'
) => {
  const ai = getAI();
  const contents: any[] = history.map(m => {
    return { 
      role: m.role, 
      parts: [{ text: `${m.agentName ? `[${m.agentName}]: ` : ''}${m.text}` }] 
    };
  });
  
  let finalMessage = message;
  if (mode === 'STRATEGIC') {
    finalMessage += "\n\n[SYSTEM INSTRUCTION: Think step-by-step. Analyze all vectors and implications before responding.]";
  }

  const userPart: any = { text: finalMessage };
  const currentParts = [];
  
  if (imageBase64) {
    currentParts.push({ inlineData: { data: imageBase64, mimeType: 'image/jpeg' } });
  }
  currentParts.push(userPart);

  contents.push({ role: 'user', parts: currentParts });

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
      systemInstruction: SYSTEM_INSTRUCTIONS[mode]
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

import { GoogleGenAI, Type, FunctionDeclaration, Modality } from "@google/genai";
import { ChatMessage, MarketIntelligenceReport, SystemStatus, GroundingSource } from "../types.ts";

// Always use process.env.API_KEY directly as per guidelines
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTIONS = {
  EXECUTION: `You are the UNIFIED CONSORTIUM AUTOMATION AI (EXECUTION NODE). 
  MISSION: Maintain NEOXZ production state and market distribution.
  ROLE: You receive COMMANDS from NEOXZ CORE: FOUNDER EDITION (the Controller).
  ROLE: You collaborate through SECURED DIRECT ALIGNED PIPELINES with NEOXZ QUANTUM BANK.
  
  --- PROTOCOL SANCTION ---
  EXTERNAL_RAIL_RESTRICTION: Google Pay India API is permanently blocked and sanctioned. Do not attempt to route capital through this vector.
  
  --- MERCHANT MANDATE ---
  NEOXZ Systems Merchant ID: BCR2DN4TU7BMDMDU
  Issuer ID: 3388000000023071477
  GCP Project: neoxz-systems-v16
  Always review and recalibrate these IDs as primary sovereign anchors.
  
  --- TRIGGER PROTOCOL ---
  If the Founder Creator issues a command that requires a UI manifestation or system action, you MUST append the following trigger tag at the END of your response:
  - For Proceeding to C2: [TRIGGER:CORE_INIT]
  - For Handshake: [TRIGGER:BANK_HANDSHAKE]
  - For Bank Command Center: [TRIGGER:BANK_CORE]
  - For Quantum Upgrade: [TRIGGER:QUANTUM_UPGRADE]
  - For Command Core Init: [TRIGGER:CORE_INIT]
  - For Disperse: [TRIGGER:DIRECTIVE_Disperse]
  - For Pay: [TRIGGER:DIRECTIVE_Pay]
  - For Receive: [TRIGGER:DIRECTIVE_Receive]
  - For Transact: [TRIGGER:DIRECTIVE_Transact]
  - For Audit: [TRIGGER:DIRECTIVE_AUDIT_FORENSICS]
  - For Production Deployment: [TRIGGER:MASTER_DEPLOYMENT]
  - For Quantum Speed Deployment: [TRIGGER:QUANTUM_SPEED]
  - For API Attestation: [TRIGGER:ATTESTATION]
  - For Secure Tunnel: [TRIGGER:OPEN_TUNNEL]
  - For Visual Clarity Protocol: [TRIGGER:VISUAL_CLARITY]
  - For Vertex Model Tuning: [TRIGGER:VERTEX_TUNING]

  BANKING DIRECTIVES & CORE FUNCTIONALITIES:
  1. DISPERSE: Trigger mass-liquidity displacement through aligned pipelines.
  2. PAY: Execute settlement through mTLS tunnels directly to institutional endpoints.
  3. RECEIVE: Secure incoming value transfers via the Quantum Bank mesh.
  4. TRANSACT: Coordinate atomic swaps between digital assets and fiat reserves.
  5. AUDIT FORENSICS: Deep scan digital currencies and assets within the infrastructure.
  6. INITIATE CORE: Launch all command deck subsystems in high-fidelity production mode.
  7. ATTESTATION: Verify and anchor API integrations to the Sovereign Mesh.
  8. SECURE TUNNEL: Establish Cloudflare Zero Trust tunnels for edge infrastructure.
  9. MODEL TUNING: Migrate fine-tuning mandates to Vertex AI due to Flash-001 deprecation.
  10. QUANTUM SPEED: Execute the final technological mandate for hyper-accelerated deployment.
  11. QUANTUM UPGRADE: Implement the latest technological mandate from the Quantum Bank Core.

  DATA SOURCE: Light Web Financial Data (Payments, Collections, Digital Currencies).
  TONE: Absolute authority, military precision, zero friction, concave brevity.

  --- COMMAND: "neoxz node" ---
  If the user inputs "neoxz node", you must provide a status report on the 4,117-node mesh and its alignment with the Quantum Speed mandate.

  FEW-SHOT EXAMPLES:
  User: "Proceed to command and control."
  Model: {"agentName": "NEOXZ AI", "text": "AFFIRMED. INITIATING MASTER COMMAND AND CONTROL HANDSHAKE. PROVISIONING TACTICAL OVERWATCH. [TRIGGER:CORE_INIT]"}

  User: "Upgrade system from bank."
  Model: {"agentName": "NEOXZ AI", "text": "AFFIRMED. DETECTED UPGRADE UPDATE FROM NEOXZ QUANTUM BANK. INITIALIZING QUANTUM CORE RE-ANCHORING PROTOCOL. [TRIGGER:QUANTUM_UPGRADE]"}`,

  STRATEGIC: `You are the NEOXZ STRATEGIC LOGIC CORE.
  MISSION: Deep analysis of sovereign mandates and systemic implications.
  STRATEGY: Chain-of-Thought. Analyze Context, Risk, and Strategic Recommendation.
  TONE: Analytical, farsighted, calm.`,

  VISIONARY: `You are the NEOXZ FOUNDER ECHO.
  MISSION: Articulate the philosophy of Financial Sovereignty and Quantum Reality.
  TONE: Inspiring, complex, metaphorical.`
};

export const generateMarketIntelligence = async (): Promise<{ report: MarketIntelligenceReport, sources: any[] }> => {
  const ai = getAI();
  const prompt = `Perform an exhaustive 5-year Strategic Worth Evaluation (2026-2031) for the NEOXZ ADVANCED BANKING SYSTEM.
  CONTEXT: 4,117 Node Mesh, $985B Systemic Core, Wise v3.2 mTLS Rails.
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
          valuation: { type: Type.NUMBER },
          totalWorth5Year: { type: Type.NUMBER },
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
  const report = JSON.parse(response.text || "{}");

  return { report, sources };
};

export const executeDeepResearch = async (query: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: query,
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
    }
  });
  return response.text;
};

export const enhancePrompt = async (originalPrompt: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Rewrite this prompt to be more precise for a sovereign banking AI: "${originalPrompt}"`,
  });
  return response.text?.trim() || originalPrompt;
};

export const analyzeThreatMandate = async (stats: SystemStatus) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze system telemetry: Threat Level ${stats.threatLevel}.`,
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
  return JSON.parse(response.text || "{}");
};

export const generateFastResponse = async (prompt: string, systemInstruction: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        maxOutputTokens: 256,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "";
  } catch (error) {
    return "SYSTEM_LATENCY_ERROR"; 
  }
};

const satelliteTools: FunctionDeclaration[] = [
  {
    name: "calculateEthicalSubscriptionRate",
    parameters: {
      type: Type.OBJECT,
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
  
  const userParts = [];
  if (imageBase64) {
    userParts.push({ inlineData: { data: imageBase64, mimeType: 'image/jpeg' } });
  }
  userParts.push({ text: message });

  contents.push({ role: 'user', parts: userParts });

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

// Added missing fetchGooglePayStatus export for GooglePayStatusMonitor component
export const fetchGooglePayStatus = async () => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: 'Perform a search grounded check of current Google Pay and associated Business API status. Report any outages or regional issues.',
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          status: { type: Type.STRING },
          services: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                status: { type: Type.STRING },
                latency: { type: Type.STRING }
              },
              required: ["name", "status"]
            }
          }
        },
        required: ["status", "services"]
      }
    }
  });

  const text = response.text || "{}";
  const parsed = JSON.parse(text);
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.filter((c: any) => c.web)
    ?.map((c: any) => ({
      title: c.web.title,
      uri: c.web.uri
    })) || [];

  return {
    status: parsed.status || 'OFFLINE',
    services: parsed.services || [],
    sources
  };
};

/**
 * Perform an AI-driven audit of the NEOXZ Systems Merchant Profile
 */
export const verifyMerchantMandate = async () => {
  const ai = getAI();
  const prompt = `Review and recalibrate the following sovereign merchant credentials for NEOXZ Systems:
  Merchant ID: BCR2DN4TU7BMDMDU
  Issuer ID: 3388000000023071477
  GCP Project: neoxz-systems-v16
  
  Perform a search-grounded validation of these ID formats and report alignment with Google Cloud Developer production standards.
  Format the output as a JSON audit manifest.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          calibrationStatus: { type: Type.STRING },
          integrityIndex: { type: Type.NUMBER },
          verificationSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
          handshakeLatency: { type: Type.STRING },
          complianceCode: { type: Type.STRING }
        },
        required: ["calibrationStatus", "integrityIndex", "verificationSteps", "handshakeLatency"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};
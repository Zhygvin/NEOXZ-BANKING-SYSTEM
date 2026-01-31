
export type ProtocolStep = 'IDLE' | 'DSS_VERIFICATION' | 'TRUTH_FILTER' | 'SOVEREIGNTY_NOTARY' | 'REALITY_SYNC' | 'QUANTUM_COMPUTATION' | 'FINANCIAL_CLEARING' | 'CYBER_LINK' | 'DECISION_SYNTHESIS' | 'AUTOMATED_DEPLOYMENT' | 'COMPLETE' | 'THREAT_ANALYSIS' | 'FORENSIC_TRACE' | 'ENFORCEMENT_ACTION' | 'LIGHT_WEB_FORENSICS' | 'SANCTION_IMPLEMENTATION' | 'AUTHORITY_DISCLOSURE' | 'LIGHT_CODE_RECALIBRATION' | 'INSTITUTIONAL_HANDSHAKE' | 'REALITY_MANIFESTATION' | 'FINANCIAL_AUDIT' | 'BROADCAST_DEPLOYMENT' | 'SHIELD_ENGAGEMENT' | 'IMMUTABILITY_SYNC' | 'AWAITING_GO_SIGNAL' | 'DISBURSING' | 'SALARY_RUN' | 'QUANTUM_PROCESS' | 'REGULATORY_FILING' | 'SOVEREIGN_CHARTERING' | 'MASTER_AUTOMATION_HANDSHAKE' | 'ORCHESTRATING' | 'GOOGLE_IDENTITY_SYNC' | 'CLOUD_INITIALIZATION' | 'QPP_DSS_VERIFY' | 'QPP_QUANTUM_COMPUTE' | 'QPP_DECISION_SYNTHESIS' | 'QPP_DEPLOY_EXECUTE' | 'HUMANITY_MANDATE_ACTIVATE' | 'GLOBAL_PROSPERITY_DISTRIBUTION' | 'EFFICIENCY_STABILIZATION' | 'MARKET_VALUATION' | 'BANK_HANDSHAKE' | 'PIPELINE_ALIGNMENT';

export type MandatePriority = 'SOVEREIGN' | 'CRITICAL' | 'ELEVATED' | 'STANDARD';

export interface ExecutionStep {
  label: string;
  detail: string;
  timestamp: string;
  status: 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO';
  deltaMs?: number;
}

export interface ProtocolTask {
  id: string;
  title: string;
  description?: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'STANDARD';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';
  dueDate: string;
  createdAt: string;
  assignee?: string;
  tags?: string[];
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface MarketIntelligenceReport {
  valuation: number;
  totalWorth5Year: number;
  multiplier: string;
  viabilityScore: number;
  strategicRationale: string;
  totalWorthEvaluation: string;
  acquisitionLikelihood: number;
  targetMarkets: string[];
  suggestedInvestors: { name: string; rationale: string; sector: string; potentialOffer: string }[];
  licensingEstimates: { type: string; estimatedValue: number; setupCost: number; overhead: string; duration: string }[];
  registrationCosts: { jurisdiction: string; setupCost: number; timeline: string; regulatoryBody: string }[];
  legalConstraints: { risk: string; mitigation: string; severity: 'LOW' | 'MEDIUM' | 'HIGH'; complianceCode: string }[];
  fiveYearProjection: { year: number; projectedCap: number; revenueGrowth: string; nodeExpansion: number }[];
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  status: 'MANIFESTED' | 'ERROR' | 'ENFORCED' | 'QUANTUM_SYNCED';
  attribution: string;
  payload: {
    intent: string;
    dataPayload: string;
  };
  executionSteps: ExecutionStep[];
  groundingSources?: GroundingSource[];
  rawLogs?: string[];
  errorMessage?: string;
}

export interface FinancialReport {
  totalSystemicCapital: number;
  founderReserve: number;
  complianceStatus: string;
  assetBreakdown: {
    institutionalBacking: string;
    digitalGoldReserves: string;
    sovereignDebtBonds: string;
  };
  sdsHash: string;
  summary: string;
}

export interface InstitutionalCharter {
  bodyName: string;
  regId: string;
  status: 'VERIFIED' | 'PENDING';
  complianceLevel: string;
}

export interface ForensicTarget {
  id: string;
  identifier: string;
  type: string;
  riskLevel: 'LOW' | 'ELEVATED' | 'CRITICAL';
}

export interface DeviceNode {
  name: string;
  category: 'MIND' | 'BODY' | 'REALITY' | 'CAPITAL';
  device: string;
  status: string;
}

export interface MCPServer {
  name: string;
  status: 'CONNECTED' | 'RECONNECTING' | 'ERROR' | 'DISCONNECTED';
  command: string;
  args: string[];
}

export interface PaymentPlatform {
  id: string;
  name: string;
  category: 'MOBILE' | 'CRYPTO' | 'INSTITUTIONAL';
  status: 'OPERATIONAL' | 'DEGRADED' | 'MAINTENANCE';
  protocol: string;
  liquidity: string;
}

export interface WiseVault {
  id: string;
  name: string;
  totalAssets: number;
  status: 'SYNCED' | 'DRIFTING';
  nodes: number;
}

export interface WiseBalance {
  id: number;
  currency: string;
  type: 'STANDARD' | 'SAVINGS';
  name: string;
  icon: string;
  investmentState: string;
  amount: { value: number; currency: string };
  reservedAmount: { value: number; currency: string };
  cashAmount: { value: number; currency: string };
  totalWorth: { value: number; currency: string };
  visible: boolean;
}

export interface IngestedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  timestamp: string;
  status: 'INGESTING' | 'ANALYZED' | 'ENCRYPTED' | 'PROCESSED_VIDEO' | 'PROCESSED_IMAGE';
  hash: string;
  previewUrl?: string;
}

export interface NeuralImpact {
  prosperity: number;
  sovereignty: number;
  infrastructure: number;
  parity: number;
  summary: string;
}

export interface SystemStatus {
  dssUptime: number;
  neoxzCoreTemp: number;
  tcpThroughput: number;
  manusQueueSize: number;
  activeProtocols: number;
  neoxzBankCapital: number;
  founderReserve: number;
  dailyInflow: number;
  cyberSync: number;
  lightWebLatency: number;
  tokenizationStatus: string;
  truthFilterActive: boolean;
  legalCompliance: 'ABIDED' | 'VERIFYING' | 'LOCKED' | 'SOVEREIGN_CHARTERED' | 'ABSOLUTE_LEGITIMACY' | 'SOVEREIGN_BENEFICIARY_LOCKED';
  biometricStability: number;
  realityParity: number;
  orlLevel: 'FRAMEWORK' | 'BRIDGE' | 'PRODUCTION';
  vaultSecurity: 'SECURED' | 'UNDER_ATTACK' | 'LOCKDOWN' | 'REGULATORY_SHIELD' | 'SOVEREIGN_FORTRESS';
  threatLevel: 'LOW' | 'ELEVATED' | 'CRITICAL';
  lightWebStatus: 'OPERATIONAL' | 'FORENSIC_MODE' | 'PURGE_ACTIVE';
  realityImpact: 'MONITORING' | 'EXECUTING' | 'MANIFESTED';
  shieldIntegrity: 100;
  coreImmutability: 'LOCKED' | 'SYNCING' | 'DEVIATION_DETECTED';
  institutionalId: string;
  kycStatus: 'PENDING' | 'VERIFIED' | 'RE-IDENTIFYING';
  isQuantumOverdrive: boolean;
  mtlsStatus: 'ENFORCED' | 'STANDBY' | 'PENDING_CSR';
  wiseSubdomain: 'api.wise.com' | 'api-mtls.transferwise.com';
}

export interface DeploymentLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'FINANCIAL' | 'CYBER' | 'TRUTH' | 'REALITY' | 'LEGAL' | 'NOTARY' | 'LIVE_DEPLOY' | 'FORENSIC' | 'ENFORCEMENT' | 'SANCTION' | 'REALITY_EXEC' | 'SHIELD_ACTIVATE' | 'SCHEDULED_MANDATE' | 'QUANTUM_SPEED' | 'REGULATORY' | 'NEURAL_SYNC' | 'GOOGLE_AUTH' | 'TERMINAL_SYNC' | 'QPP_EXECUTE' | 'MANDATE_SEQUENCE' | 'PROSPERITY' | 'WISE_HANDSHAKE' | 'MARKET_INTEL' | 'BANK_HANDSHAKE';
  agent: 'HARVEY' | 'NEOXZ' | 'TCP' | 'MANUS' | 'SYSTEM' | 'BANK' | 'CYBERNITICZ' | 'LEGAL' | 'GATEWAY' | 'NOTARY' | 'PRODUCTION' | 'DEFENDER' | 'Q_TEAM' | 'REALITY_BRIDGE' | 'SHIELD_CORE' | 'FOUNDER_SIGNAL' | 'SALARY_SCHEDULER' | 'QUANTUM_CORE' | 'COMPLIANCE_CORE' | 'ZAPPIER_BRIDGE' | 'GOOGLE_CLOUD' | 'CLOUD_SHELL' | 'QPP_PROTOCOL' | 'ORCHESTRATOR' | 'WISE_BRIDGE' | 'BANK_CORE';
  message: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  imageBase64?: string;
  isGrounding?: boolean;
  groundingSources?: GroundingSource[];
  agentName?: 'NEOXZ Q TEAM' | 'NEOXZ BANK AI' | 'NEOXZ AI' | 'DOMINANCE ORCHESTRATOR' | 'HARVEY AI' | 'ZAPPIER AI' | 'ORCHESTRATOR AI' | 'MARKET ANALYST' | 'SYSTEM' | 'NEOXZ BANK CORE';
}

export interface TrackedTransaction {
  id: string;
  amount: number;
  currency?: string;
  platform: string;
  destination: string;
  progress: number;
  hops: any[];
  status: 'AWAITING_SIGNAL' | 'INITIATING' | 'IN_TRANSIT' | 'FINALIZING' | 'CLEARED' | 'SETTLED_LIVE' | 'FROZEN' | 'DISBURSING';
}

export enum AgentId {
  LOAN_OFFICER = "loan_officer",
  FRAUD_DETECTION = "fraud_detection",
  COMPLIANCE = "compliance",
  DOCUMENT_INTELLIGENCE = "document_intelligence",
  CUSTOMER_RELATIONSHIP = "customer_relationship",
  RISK_ANALYST = "risk_analyst",
  ORCHESTRATOR = "orchestrator"
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  creditScore: number;
  monthlyIncome: number;
  existingDebt: number;
  employmentStatus: string;
  riskScore: number; // 0 to 100
  kycStatus: "verified" | "pending" | "failed";
  pepStatus: "clear" | "flagged";
  address: string;
  panNumber: string;
  aadhaarNumber: string;
  phone: string;
  accountNumber: string;
  balance: number;
}

export interface Transaction {
  id: string;
  customerId: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  merchant: string;
  type: "credit" | "debit";
  location: string;
  riskLevel: "low" | "medium" | "high";
  flagReason?: string;
  status: "cleared" | "held" | "reversed";
}

export interface DocumentRecord {
  id: string;
  customerId: string;
  type: "pan" | "aadhaar" | "paystub" | "bank_statement";
  fileName: string;
  uploadDate: string;
  status: "verified" | "flagged" | "unchecked";
  extractedData?: Record<string, any>;
  ocrConfidence: number; // 0 to 100
  issues?: string[];
}

export interface AgentState {
  id: AgentId;
  name: string;
  role: string;
  status: "idle" | "analyzing" | "completed" | "failed";
  avatar: string;
  description: string;
  capabilities: string[];
  systemPrompt: string;
}

export interface WorkflowStep {
  id: string;
  agentId: AgentId;
  agentName: string;
  timestamp: string;
  action: string;
  recommendation: "approve" | "deny" | "flag" | "neutral";
  details: string;
}

export interface DecisionReport {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  type: "loan" | "compliance_audit" | "fraud_investigation" | "onboarding";
  date: string;
  status: "approved" | "denied" | "flagged_for_review" | "pending";
  riskScore: number;
  orchestratorConclusion: string;
  agentOpinions: {
    [key in AgentId]?: {
      recommendation: "approve" | "deny" | "flag" | "neutral";
      confidence: number;
      findings: string[];
      details: string;
    };
  };
  steps: WorkflowStep[];
  meta?: Record<string, any>;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "orchestrator" | AgentId;
  text: string;
  timestamp: string;
  agentName?: string;
  simulated?: boolean;
}

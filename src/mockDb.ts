import { Customer, Transaction, DocumentRecord, AgentState, AgentId } from "./types";

export const mockCustomers: Customer[] = [
  {
    id: "cust-101",
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    creditScore: 780,
    monthlyIncome: 145000,
    existingDebt: 15000,
    employmentStatus: "Salaried - Senior Manager at TechCorp",
    riskScore: 12,
    kycStatus: "verified",
    pepStatus: "clear",
    address: "A-402, Sea Breeze Apartments, Bandra West, Mumbai, MH, 400050",
    panNumber: "ABCDE1234F",
    aadhaarNumber: "1234-5678-9012",
    phone: "+91 98765 43210",
    accountNumber: "IDBI0008432109",
    balance: 624500
  },
  {
    id: "cust-102",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    creditScore: 710,
    monthlyIncome: 95000,
    existingDebt: 32000,
    employmentStatus: "Self-Employed - E-commerce Merchant",
    riskScore: 58, // High due to suspicious transactions
    kycStatus: "verified",
    pepStatus: "clear",
    address: "Flat 12B, Sunset Towers, JP Nagar, Bengaluru, KA, 560078",
    panNumber: "FGHIJ5678K",
    aadhaarNumber: "9876-5432-1098",
    phone: "+91 87654 32109",
    accountNumber: "IDBI0005678123",
    balance: 148200
  },
  {
    id: "cust-103",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    creditScore: 615,
    monthlyIncome: 60000,
    existingDebt: 45000,
    employmentStatus: "Salaried - Senior Analyst at FinLogistics",
    riskScore: 42,
    kycStatus: "pending", // KYC issue
    pepStatus: "clear",
    address: "House No. 42, Sector 15-A, Noida, UP, 201301",
    panNumber: "LMNOP9012Q",
    aadhaarNumber: "4567-8901-2345",
    phone: "+91 76543 21098",
    accountNumber: "IDBI0009012456",
    balance: 24500
  },
  {
    id: "cust-104",
    name: "Neha Sharma",
    email: "neha.sharma@example.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    creditScore: 825,
    monthlyIncome: 250000,
    existingDebt: 8000,
    employmentStatus: "Salaried - VP of Engineering, QuantumTech",
    riskScore: 4,
    kycStatus: "verified",
    pepStatus: "clear",
    address: "Duplex 3, Oakwood Estates, Gachibowli, Hyderabad, TS, 500032",
    panNumber: "RSTUV3456W",
    aadhaarNumber: "5678-9012-3456",
    phone: "+91 99887 76655",
    accountNumber: "IDBI0003456789",
    balance: 2890400
  },
  {
    id: "cust-105",
    name: "Rohan Das",
    email: "rohan.das@example.com",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
    creditScore: 480,
    monthlyIncome: 35000,
    existingDebt: 55000,
    employmentStatus: "Unemployed / Freelance Content Creator",
    riskScore: 85, // Extremely high risk
    kycStatus: "failed", // High audit alerts
    pepStatus: "flagged", // PEP politically exposed family tie match
    address: "Quarter 5, G-Block, Civil Lines, Kolkata, WB, 700001",
    panNumber: "XYZAB7890C",
    aadhaarNumber: "2345-6789-0123",
    phone: "+91 91234 56789",
    accountNumber: "IDBI0007890123",
    balance: 1500
  }
];

export const mockTransactions: Transaction[] = [
  // Aarav Mehta Transactions (Low Risk)
  {
    id: "tx-101",
    customerId: "cust-101",
    date: "2026-07-06T14:30:00Z",
    amount: 2350,
    category: "Food & Dining",
    description: "The Bombay Canteen",
    merchant: "Bombay Canteen Private Limited",
    type: "debit",
    location: "Mumbai, India",
    riskLevel: "low",
    status: "cleared"
  },
  {
    id: "tx-102",
    customerId: "cust-101",
    date: "2026-07-05T09:15:00Z",
    amount: 145000,
    category: "Salary Credit",
    description: "NET SALARY FROM TECHCORP",
    merchant: "TechCorp Private Limited",
    type: "credit",
    location: "Mumbai, India",
    riskLevel: "low",
    status: "cleared"
  },
  {
    id: "tx-103",
    customerId: "cust-101",
    date: "2026-07-01T10:00:00Z",
    amount: 15000,
    category: "Investment",
    description: "Zerodha Mutual Fund SIP",
    merchant: "Zerodha Broking Ltd",
    type: "debit",
    location: "Bengaluru, India (Online)",
    riskLevel: "low",
    status: "cleared"
  },

  // Priya Patel Transactions (Fraud Flags)
  {
    id: "tx-201",
    customerId: "cust-102",
    date: "2026-07-08T01:10:00Z",
    amount: 49999,
    category: "Shopping",
    description: "Apple Store Online Store - USA",
    merchant: "Apple Inc",
    type: "debit",
    location: "California, USA (IP: 198.162.3.45)",
    riskLevel: "high",
    flagReason: "High-value international online purchase. User location IP does not match Aadhaar registered address.",
    status: "held"
  },
  {
    id: "tx-202",
    customerId: "cust-102",
    date: "2026-07-08T01:15:00Z",
    amount: 35000,
    category: "Electronics",
    description: "Croma Electronics Store",
    merchant: "Croma Retail",
    type: "debit",
    location: "Bengaluru, India (POS Terminal)",
    riskLevel: "high",
    flagReason: "Velocity Check Failed: Card physical POS terminal transaction in Bengaluru just 5 minutes after USA IP transaction (Impossible Travel speed).",
    status: "held"
  },
  {
    id: "tx-203",
    customerId: "cust-102",
    date: "2026-07-07T18:22:00Z",
    amount: 12000,
    category: "Utilities",
    description: "BESCOM Electricity Bill",
    merchant: "BESCOM Online",
    type: "debit",
    location: "Bengaluru, India",
    riskLevel: "low",
    status: "cleared"
  },

  // Vikram Singh Transactions (Medium Risk)
  {
    id: "tx-301",
    customerId: "cust-103",
    date: "2026-07-07T11:40:00Z",
    amount: 45000,
    category: "Cash Withdrawal",
    description: "ATM Cash Withdrawal - Sector 15 Noida",
    merchant: "IDBI ATM Terminal Noida",
    type: "debit",
    location: "Noida, India",
    riskLevel: "medium",
    flagReason: "Large cash withdrawal relative to current average balance.",
    status: "cleared"
  },
  {
    id: "tx-302",
    customerId: "cust-103",
    date: "2026-07-04T15:00:00Z",
    amount: 60000,
    category: "Salary Credit",
    description: "SALARY FROM FINLOGISTICS",
    merchant: "FinLogistics",
    type: "credit",
    location: "Noida, India",
    riskLevel: "low",
    status: "cleared"
  },

  // Rohan Das Transactions (AML and Compliance Flags)
  {
    id: "tx-501",
    customerId: "cust-105",
    date: "2026-07-07T23:50:00Z",
    amount: 95000,
    category: "Funds Transfer",
    description: "IMPS Peer-to-Peer Transfer to Unregistered Beneficiary",
    merchant: "A. K. Sheikh (Transfer)",
    type: "debit",
    location: "Kolkata, India",
    riskLevel: "high",
    flagReason: "Structuring risk: Close to INR 1,00,000 regulatory reporting cap. Account balance depleted completely to near-zero.",
    status: "held"
  },
  {
    id: "tx-502",
    customerId: "cust-105",
    date: "2026-07-07T20:00:00Z",
    amount: 98000,
    category: "Deposit",
    description: "Cash Deposit - Bagbazar Branch Kolkata",
    merchant: "IDBI Branch Bagbazar",
    type: "credit",
    location: "Kolkata, India",
    riskLevel: "high",
    flagReason: "Source of high-value cash deposit unexplained. Account holder listed as unemployed in bank records.",
    status: "cleared"
  }
];

export const mockDocuments: DocumentRecord[] = [
  {
    id: "doc-1",
    customerId: "cust-101",
    type: "pan",
    fileName: "aarav_mehta_pan.pdf",
    uploadDate: "2026-06-15",
    status: "verified",
    ocrConfidence: 99.2,
    extractedData: {
      panNumber: "ABCDE1234F",
      fullName: "AARAV MEHTA",
      fatherName: "RAJESH MEHTA",
      dob: "15-08-1988"
    }
  },
  {
    id: "doc-2",
    customerId: "cust-101",
    type: "paystub",
    fileName: "aarav_mehta_salary_slip.pdf",
    uploadDate: "2026-07-05",
    status: "verified",
    ocrConfidence: 97.5,
    extractedData: {
      employer: "TechCorp Private Limited",
      netIncome: 145000,
      period: "June 2026",
      pfDeduction: 12500
    }
  },
  {
    id: "doc-3",
    customerId: "cust-103",
    type: "pan",
    fileName: "vikram_singh_pan.pdf",
    uploadDate: "2026-07-02",
    status: "flagged",
    ocrConfidence: 74.0,
    extractedData: {
      panNumber: "LMN0P9012Q", // Note typo: Zero used instead of letter 'O' in OCR
      fullName: "VIKRAM SINGH",
      dob: "12-11-1994"
    },
    issues: [
      "PAN Card character mismatch: Typographical error in PAN structure (Letter 'O' replaced with digit '0').",
      "PAN Card photo clarity score below regulatory compliance threshold (48%)."
    ]
  },
  {
    id: "doc-4",
    customerId: "cust-105",
    type: "aadhaar",
    fileName: "rohan_das_aadhaar.pdf",
    uploadDate: "2026-07-01",
    status: "flagged",
    ocrConfidence: 89.0,
    extractedData: {
      aadhaarNumber: "2345-6789-0123",
      fullName: "ROHAN DAS",
      address: "Unknown Block, Civ Lines, Kolkata, West Bengal" // Smeared text
    },
    issues: [
      "Address extracted from Aadhaar card does not match residential utilities documentation.",
      "Aadhaar QR Code is unreadable/corrupted due to document scan quality."
    ]
  }
];

export const mockAgents: AgentState[] = [
  {
    id: AgentId.LOAN_OFFICER,
    name: "Loan Officer AI (Lending)",
    role: "Lending Specialist",
    status: "idle",
    avatar: "💼",
    description: "Evaluates financial health, debt-to-income (DTI) metrics, credit profile, and estimates loan repayment capacities (EMI options).",
    capabilities: ["Debt-to-Income Calculation", "EMI Estimation", "Credit Worthiness Appraisal", "Interest Rate Optimization"],
    systemPrompt: "You are the Loan Officer AI at IDBI Bank, an expert lending specialist. Your goal is to evaluate creditworthiness, compute precise Debt-to-Income (DTI) percentages, and suggest optimized loan schedules (interest rates, EMIs) for requested amounts. Provide clear calculations and loan recommendations based on customer parameters."
  },
  {
    id: AgentId.FRAUD_DETECTION,
    name: "Fraud Sentinel AI (Security)",
    role: "Anti-Fraud Specialist",
    status: "idle",
    avatar: "🛡️",
    description: "Monitors real-time transactions, identifies geolocation anomalies (impossible travel), velocity patterns, and screens for card cloning.",
    capabilities: ["Impossible Travel Analysis", "Velocity Limits Screen", "Behavioral Outlier Alerts", "Merchant Profiling"],
    systemPrompt: "You are the Fraud Detection AI at IDBI Bank, a cyber-forensics risk examiner. Analyze transactional history, identify velocity outliers, geographically impossible multi-location transfers (cloning indicators), and explain security risks with a clear percentage-based likelihood score."
  },
  {
    id: AgentId.COMPLIANCE,
    name: "Compliance Guard AI (AML/KYC)",
    role: "RegTech Specialist",
    status: "idle",
    avatar: "⚖️",
    description: "Validates KYC standing, checks PEP (Politically Exposed Persons) status, cross-references AML (Anti-Money Laundering) parameters, and enforces IDBI bank rules.",
    capabilities: ["PEP Watchlist Screening", "AML Volume Auditing", "KYC Gap Analysis", "Regulatory Alignment Checking"],
    systemPrompt: "You are the Compliance AI at IDBI Bank, an expert in RegTech and regulatory compliances (RBI / FIU-IND guidelines). Evaluate customer KYC completeness, PEP statuses, and AML transactional anomalies. Deliver structured findings referencing standards."
  },
  {
    id: AgentId.DOCUMENT_INTELLIGENCE,
    name: "DocuIntel AI (OCR & Trust)",
    role: "OCR Extraction Specialist",
    status: "idle",
    avatar: "📄",
    description: "Extracts metadata from PAN, Aadhaar, paystubs. Performs structural scans to detect text tampering, scan resolution issues, or photo swaps.",
    capabilities: ["Structured OCR Extractions", "Forgery and Alteration Screening", "Visual Resolution Scoring", "Cross-Document Name Verification"],
    systemPrompt: "You are the Document Intelligence AI at IDBI Bank. Your job is to audit scanned financial documents (PAN, Aadhaar, salary slips). Identify OCR confidence, mismatching names, and suspect alteration areas (forgery signs)."
  },
  {
    id: AgentId.CUSTOMER_RELATIONSHIP,
    name: "Engagement Expert AI (Wealth)",
    role: "Wealth & Engagement Advisor",
    status: "idle",
    avatar: "💎",
    description: "Assesses customer profiles, segmenting them into wealth categories to recommend customized high-yield products, premium credit plans, and saving advice.",
    capabilities: ["LTV Forecasting", "Product Cross-Selling", "Segmented Campaign Targeting", "Financial Goal Advisory"],
    systemPrompt: "You are the Customer Relationship AI at IDBI Bank. Formulate hyper-personalized engagement advice, suggest appropriate high-yield accounts, specialized card products, and credit upgrades to maximize Lifetime Value (LTV)."
  },
  {
    id: AgentId.RISK_ANALYST,
    name: "Risk Analyst AI (Risk & Macro)",
    role: "Credit Risk Modeler",
    status: "idle",
    avatar: "📈",
    description: "Simulates debt stress-tests, assesses macro-portfolio default risk, computes Probability of Default (PD), and sets early warning signals.",
    capabilities: ["Credit Score Calibration", "Income Stress-Testing", "Probability of Default (PD) Modeling", "Portfolio Volatility Analysis"],
    systemPrompt: "You are the Risk Analyst AI at IDBI Bank, a quant modeling credit risk expert. Calibrate debt levels, assess structural repayment capacity under financial stress-testing, and compute early-warning alert guidelines."
  },
  {
    id: AgentId.ORCHESTRATOR,
    name: "Orchestrator AI (Central Engine)",
    role: "Autonomous Operating System Engine",
    status: "idle",
    avatar: "⚙️",
    description: "The central intelligence coordinating all specialized agents. Delegates operations, parses reports, resolves conflicting recommendations, and yields explainable conclusions.",
    capabilities: ["Agent Routing", "Conflict Resolution", "Synthesis & Explainability", "Final Consensus Determination"],
    systemPrompt: "You are the Central AI Orchestrator of BankOS. You are receiving separate analytical reports from specialized agents (Lending, Fraud, Compliance, Docs, Wealth, Risk). Synthesize their recommendations into a unified, executive-level decision. Highlight conflicts, justify key trade-offs, and produce a balanced final report."
  }
];

import React, { useState } from "react";
import { Customer, AgentState, AgentId, DecisionReport } from "../types";
import { Play, RotateCcw, AlertTriangle, CheckCircle, HelpCircle, ShieldAlert, FileText, ChevronRight, Scale, Activity, Coins, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface OrchestrationPanelProps {
  customers: Customer[];
  agents: AgentState[];
  setAgents: React.Dispatch<React.SetStateAction<AgentState[]>>;
}

interface AuditConfig {
  type: "loan" | "compliance_audit" | "fraud_investigation" | "onboarding";
  label: string;
  desc: string;
  icon: React.ReactNode;
}

export const OrchestrationPanel: React.FC<OrchestrationPanelProps> = ({
  customers,
  agents,
  setAgents,
}) => {
  const [selectedCustId, setSelectedCustId] = useState<string>("cust-101");
  const [selectedAudit, setSelectedAudit] = useState<AuditConfig["type"]>("loan");
  
  const [isOrchestrating, setIsOrchestrating] = useState<boolean>(false);
  const [currentActiveAgent, setCurrentActiveAgent] = useState<AgentId | null>(null);
  const [orchestrationStep, setOrchestrationStep] = useState<number>(0);
  const [report, setReport] = useState<DecisionReport | null>(null);

  const activeCustomer = customers.find((c) => c.id === selectedCustId)!;

  const audits: AuditConfig[] = [
    {
      type: "loan",
      label: "Lending Repayment Audit",
      desc: "Appraise Debt-To-Income, stress-test Probability of Default, check payroll slips.",
      icon: <Coins className="h-4 w-4" />
    },
    {
      type: "compliance_audit",
      label: "AML / KYC Compliance Audit",
      desc: "Crosscheck PEP watchlists, flag structured volumes, inspect PAN/Aadhaar credentials.",
      icon: <Scale className="h-4 w-4" />
    },
    {
      type: "fraud_investigation",
      label: "Transaction Security Check",
      desc: "Screen geographical impossibilities, velocity check ATM/POS logs, alert card cloning.",
      icon: <ShieldAlert className="h-4 w-4" />
    },
    {
      type: "onboarding",
      label: "Onboarding Risk Clearance",
      desc: "Baseline validation, segment premium campaigns, check initial deposits.",
      icon: <TrendingUp className="h-4 w-4" />
    }
  ];

  const triggerOrchestration = async () => {
    setIsOrchestrating(true);
    setReport(null);
    setOrchestrationStep(1);

    // Determine sequence of agents for simulation animation
    const sequence: AgentId[] = [];
    if (selectedAudit === "loan") {
      sequence.push(AgentId.DOCUMENT_INTELLIGENCE, AgentId.RISK_ANALYST, AgentId.LOAN_OFFICER, AgentId.CUSTOMER_RELATIONSHIP);
    } else if (selectedAudit === "compliance_audit") {
      sequence.push(AgentId.DOCUMENT_INTELLIGENCE, AgentId.FRAUD_DETECTION, AgentId.COMPLIANCE);
    } else if (selectedAudit === "fraud_investigation") {
      sequence.push(AgentId.FRAUD_DETECTION, AgentId.COMPLIANCE, AgentId.RISK_ANALYST);
    } else {
      sequence.push(AgentId.DOCUMENT_INTELLIGENCE, AgentId.COMPLIANCE, AgentId.CUSTOMER_RELATIONSHIP);
    }

    // Sequentially activate each agent in the UI with a neat delay
    for (let i = 0; i < sequence.length; i++) {
      const agentId = sequence[i];
      setCurrentActiveAgent(agentId);
      setOrchestrationStep(i + 1);

      // Update agent status in registry
      setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status: "analyzing" } : a));
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status: "completed" } : a));
    }

    // Synthesize final state
    setCurrentActiveAgent(AgentId.ORCHESTRATOR);
    setOrchestrationStep(sequence.length + 1);
    setAgents(prev => prev.map(a => a.id === AgentId.ORCHESTRATOR ? { ...a, status: "analyzing" } : a));
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Call actual server-side orchestration API
    try {
      const res = await fetch("/api/orchestrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: selectedCustId,
          type: selectedAudit,
          meta: selectedAudit === "loan" ? { loanAmount: 5000000, durationYears: 15 } : {}
        })
      });
      const data = await res.json();
      setReport(data);
    } catch (e) {
      console.error("Orchestration failed", e);
    } finally {
      setIsOrchestrating(false);
      setCurrentActiveAgent(null);
      setOrchestrationStep(0);
      setAgents(prev => prev.map(a => ({ ...a, status: "idle" })));
    }
  };

  return (
    <div className="space-y-6 transition-colors duration-300">
      {/* Configuration Hub Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-2.5 mb-5">
          <Activity className="h-5 w-5 text-sky-500" />
          <h2 className="font-display font-bold text-lg text-slate-800 dark:text-white">
            Trigger Autonomous System Audit
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Customer selection */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              Target Customer Dossier
            </label>
            <div className="grid grid-cols-1 gap-2">
              {customers.map((c) => (
                <button
                  key={c.id}
                  onClick={() => !isOrchestrating && setSelectedCustId(c.id)}
                  disabled={isOrchestrating}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    selectedCustId === c.id
                      ? "bg-slate-50 dark:bg-slate-800/50 border-sky-500/50"
                      : "bg-transparent border-slate-200 dark:border-slate-800 hover:bg-slate-50/20 dark:hover:bg-slate-800/20"
                  } ${isOrchestrating ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      referrerPolicy="no-referrer"
                      className="h-8 w-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100">{c.name}</h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        Score: {c.creditScore} • {c.employmentStatus.split("-")[0]}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Audit category selection */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              Audit Action Profile
            </label>
            <div className="space-y-2">
              {audits.map((a) => (
                <button
                  key={a.type}
                  onClick={() => !isOrchestrating && setSelectedAudit(a.type)}
                  disabled={isOrchestrating}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start space-x-3.5 ${
                    selectedAudit === a.type
                      ? "bg-sky-50/50 dark:bg-sky-950/20 border-sky-500/50 text-sky-900 dark:text-sky-300"
                      : "bg-transparent border-slate-200 dark:border-slate-800 hover:bg-slate-50/20 dark:hover:bg-slate-800/20"
                  } ${isOrchestrating ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <span className={`p-2 rounded-lg border shadow-sm ${selectedAudit === a.type ? "bg-sky-500 text-white border-sky-400" : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"}`}>
                    {a.icon}
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold">{a.label}</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {a.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={triggerOrchestration}
            disabled={isOrchestrating}
            className={`px-6 py-3 rounded-xl font-medium text-xs flex items-center space-x-2 shadow-lg transition-all duration-300 ${
              isOrchestrating
                ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-800 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-500 text-white shadow-sky-500/15 border border-sky-500 cursor-pointer"
            }`}
            id="btn-orchestrate-trigger"
          >
            <Play className={`h-4 w-4 ${isOrchestrating ? "animate-spin" : "fill-current"}`} />
            <span>{isOrchestrating ? "Multi-Agent Collaboration Active..." : "Trigger Autonomous Orchestration"}</span>
          </button>
        </div>
      </div>

      {/* Visual Workspace Loop Loader */}
      <AnimatePresence>
        {isOrchestrating && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center py-12"
          >
            <div className="relative h-24 w-24 mb-6 flex items-center justify-center">
              {/* Spinning active radar */}
              <div className="absolute inset-0 border-2 border-dashed border-sky-500/20 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-2 border-dotted border-sky-500/30 rounded-full animate-spin [animation-duration:6s]"></div>
              <div className="h-12 w-12 rounded-full bg-sky-500/10 flex items-center justify-center border border-sky-500/30">
                <Activity className="h-6 w-6 text-sky-500 animate-pulse" />
              </div>
            </div>

            <h3 className="font-display font-bold text-base text-slate-800 dark:text-white mb-2">
              Autonomous Intelligence Pipeline Engaged
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              Currently routing telemetry to the registered AI nodes. Agents are extracting document OCRs, verifying regulatory compliance status, and computing probability-of-default stress tests.
            </p>

            {/* Steps feedback indicators */}
            <div className="flex items-center space-x-6">
              {agents.filter(a => a.id !== AgentId.ORCHESTRATOR).map((a, idx) => {
                const isCurrent = a.id === currentActiveAgent;
                const isPast = !isCurrent && orchestrationStep > (idx + 1);
                
                return (
                  <div key={a.id} className="flex flex-col items-center space-y-2 relative">
                    <div className={`h-8 w-8 rounded-full border flex items-center justify-center text-sm shadow-sm transition-all ${
                      isCurrent
                        ? "bg-sky-500 border-sky-400 text-white radar-signal"
                        : isPast
                        ? "bg-emerald-500 border-emerald-400 text-white"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400"
                    }`}>
                      {a.avatar}
                    </div>
                    <span className="text-[9px] font-mono font-bold tracking-tight text-slate-500 dark:text-slate-400">
                      {a.name.split(" ")[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synthesis Decision Report */}
      <AnimatePresence>
        {report && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            id="synthesis-decision-report"
          >
            {/* Verdict overview banner */}
            <div className={`border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${
              report.status === "approved"
                ? "bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-500/30"
                : report.status === "denied"
                ? "bg-rose-50/40 dark:bg-rose-950/10 border-rose-500/30"
                : "bg-amber-50/40 dark:bg-amber-950/10 border-amber-500/30"
            }`}>
              <div className="flex items-start space-x-4">
                <div className={`p-3.5 rounded-2xl border ${
                  report.status === "approved"
                    ? "bg-emerald-500 border-emerald-400 text-white"
                    : report.status === "denied"
                    ? "bg-rose-500 border-rose-400 text-white"
                    : "bg-amber-500 border-amber-400 text-white"
                }`}>
                  {report.status === "approved" ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : report.status === "denied" ? (
                    <ShieldAlert className="h-6 w-6" />
                  ) : (
                    <AlertTriangle className="h-6 w-6" />
                  )}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold tracking-wide uppercase text-slate-400">
                      Consensus Verdict Report
                    </span>
                  </div>
                  <h3 className="font-display font-black text-xl tracking-tight text-slate-800 dark:text-white mt-1 uppercase">
                    System Status: {report.status.replace(/_/g, " ")}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl font-sans leading-relaxed">
                    Automated appraisal audit for <span className="font-semibold text-slate-700 dark:text-slate-200">{report.customerName}</span> successfully generated and signed by the BankOS Orchestrator.
                  </p>
                </div>
              </div>

              {/* Risk Score Dial */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-5 py-3.5 rounded-xl text-center shadow-sm">
                <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Blended Risk score
                </span>
                <span className={`text-2xl font-display font-black tracking-tighter ${
                  report.riskScore < 30
                    ? "text-emerald-500"
                    : report.riskScore < 60
                    ? "text-amber-500"
                    : "text-rose-500"
                }`}>
                  {report.riskScore} <span className="text-xs text-slate-400">/ 100</span>
                </span>
                <div className="w-24 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden mx-auto">
                  <div
                    className={`h-full rounded-full ${
                      report.riskScore < 30
                        ? "bg-emerald-500"
                        : report.riskScore < 60
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`}
                    style={{ width: `${report.riskScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Split view: Orchestrator synthesis vs Individual Agent Logs */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Orchestrator Memo */}
              <div className="xl:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-2.5 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <FileText className="h-4 w-4 text-sky-500" />
                  <h4 className="font-display font-bold text-sm text-slate-800 dark:text-white">
                    Orchestrator Explanatory Memo
                  </h4>
                </div>

                <div className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed space-y-4 whitespace-pre-wrap font-mono prose dark:prose-invert">
                  {report.orchestratorConclusion}
                </div>
              </div>

              {/* Individual Opinions side panel */}
              <div className="xl:col-span-1 space-y-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                  <h4 className="font-display font-bold text-xs text-slate-800 dark:text-white mb-4">
                    Agent Consensus Breakdown
                  </h4>

                  <div className="space-y-3">
                    {Object.entries(report.agentOpinions).map(([id, opinion]: [string, any]) => {
                      const agent = agents.find((a) => a.id === id)!;
                      return (
                        <div key={id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-base bg-white dark:bg-slate-800 p-1 rounded-md border border-slate-200 dark:border-slate-700">
                                {agent.avatar}
                              </span>
                              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                                {agent.name.split(" ")[0]}
                              </span>
                            </div>

                            <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                              opinion.recommendation === "approve"
                                ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/30"
                                : opinion.recommendation === "deny"
                                ? "bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200/30"
                                : "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/30"
                            }`}>
                              {opinion.recommendation}
                            </span>
                          </div>

                          <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans space-y-1">
                            {opinion.findings.map((f: string, fidx: number) => (
                              <p key={fidx} className="flex items-start">
                                <span className="text-sky-500 mr-1">•</span>
                                <span className="flex-1 truncate">{f}</span>
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Chronology timeline */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h4 className="font-display font-bold text-xs text-slate-800 dark:text-white mb-5">
                Explainable Decision Timeline (Audit Logs)
              </h4>

              <div className="relative border-l-2 border-slate-100 dark:border-slate-800 pl-6 space-y-5 ml-2.5">
                {report.steps.map((step) => {
                  const agent = agents.find((a) => a.id === step.agentId)!;
                  return (
                    <div key={step.id} className="relative">
                      {/* Timeline Dot */}
                      <span className="absolute -left-[31px] top-0.5 bg-white dark:bg-slate-900 border-2 border-sky-500 h-4 w-4 rounded-full flex items-center justify-center text-[10px] shadow"></span>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{agent.avatar}</span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{step.agentName}</span>
                          <span className="text-[9px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">{step.timestamp}</span>
                        </div>
                        <span className={`text-[10px] font-semibold w-max ${
                          step.recommendation === "approve"
                            ? "text-emerald-500"
                            : step.recommendation === "deny"
                            ? "text-rose-500"
                            : "text-amber-500"
                        }`}>
                          RECMD: {step.recommendation.toUpperCase()}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-1">
                        {step.details}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

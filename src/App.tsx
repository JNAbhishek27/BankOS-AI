import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/LandingPage";
import { ExecutiveAnalytics } from "./components/ExecutiveAnalytics";
import { AgentControlCenter } from "./components/AgentControlCenter";
import { OrchestrationPanel } from "./components/OrchestrationPanel";
import { CustomerProfiles } from "./components/CustomerProfiles";
import { DocumentViewer } from "./components/DocumentViewer";
import { InteractiveChat } from "./components/InteractiveChat";
import { mockCustomers, mockTransactions, mockDocuments, mockAgents } from "./mockDb";
import { Customer, Transaction, DocumentRecord, AgentState } from "./types";
import { Activity, Cpu, Users, FileText, MessageSquare, LayoutDashboard, Database, HelpCircle } from "lucide-react";

export default function App() {
  const [booted, setBooted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "orchestrator" | "agents" | "customers" | "documents" | "chat">("dashboard");
  const [darkMode, setDarkMode] = useState<boolean>(true); // Default premium slate dark theme
  
  // Reactive shared states
  const [agents, setAgents] = useState<AgentState[]>(mockAgents);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [documents, setDocuments] = useState<DocumentRecord[]>(mockDocuments);
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("cust-101");
  const [isOnline, setIsOnline] = useState<boolean>(true);

  const currentUser = {
    name: "Abhishek N.",
    role: "Lead Platform Auditor",
    email: "jnabhishek01@gmail.com"
  };

  // Dark mode effect class toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Test server connectivity on launch
  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch("/api/customers");
        if (response.ok) {
          setIsOnline(true);
        }
      } catch (e) {
        console.log("Gateway offline. Running in high-fidelity sandbox mode.");
        setIsOnline(false);
      }
    };
    if (booted) {
      checkServer();
    }
  }, [booted]);

  if (!booted) {
    return <LandingPage onBootOS={() => setBooted(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      {/* Premium Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentUser={currentUser}
        isOnline={isOnline}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-6 flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar Menu */}
        <aside className="lg:w-64 shrink-0 flex flex-col gap-2">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
            <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-3">
              Operator Console
            </span>

            <nav className="space-y-1" id="operator-nav-menu">
              {/* Tab 1 */}
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-sky-600 text-white shadow-lg shadow-sky-500/10"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                id="menu-tab-dashboard"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Executive Analytics</span>
              </button>

              {/* Tab 2 */}
              <button
                onClick={() => setActiveTab("orchestrator")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeTab === "orchestrator"
                    ? "bg-sky-600 text-white shadow-lg shadow-sky-500/10"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                id="menu-tab-orchestrator"
              >
                <Activity className="h-4 w-4" />
                <span>Autonomous Audits</span>
              </button>

              {/* Tab 3 */}
              <button
                onClick={() => setActiveTab("agents")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeTab === "agents"
                    ? "bg-sky-600 text-white shadow-lg shadow-sky-500/10"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                id="menu-tab-agents"
              >
                <Cpu className="h-4 w-4" />
                <span>AI Agents Registry</span>
              </button>

              {/* Tab 4 */}
              <button
                onClick={() => setActiveTab("customers")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeTab === "customers"
                    ? "bg-sky-600 text-white shadow-lg shadow-sky-500/10"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                id="menu-tab-customers"
              >
                <Users className="h-4 w-4" />
                <span>Customer Dossiers</span>
              </button>

              {/* Tab 5 */}
              <button
                onClick={() => setActiveTab("documents")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeTab === "documents"
                    ? "bg-sky-600 text-white shadow-lg shadow-sky-500/10"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                id="menu-tab-documents"
              >
                <FileText className="h-4 w-4" />
                <span>Doc Intelligence OCR</span>
              </button>

              {/* Tab 6 */}
              <button
                onClick={() => setActiveTab("chat")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeTab === "chat"
                    ? "bg-sky-600 text-white shadow-lg shadow-sky-500/10"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                id="menu-tab-chat"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Interactive AI Chat</span>
              </button>
            </nav>
          </div>

          {/* Quick Info Box & System Health */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm mt-2 hidden lg:flex flex-col gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-3">
                System Health
              </span>
              <div className="space-y-3.5 text-[10px] font-mono">
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-500 dark:text-slate-400">
                    <span>CPU LOAD</span>
                    <span className="text-sky-600 dark:text-sky-400">42%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-sky-600 dark:bg-sky-500 h-full" style={{ width: "42%" }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-500 dark:text-slate-400">
                    <span>TRUST SCORE</span>
                    <span className="text-emerald-600 dark:text-emerald-400">99.8%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: "99.8%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-150 dark:border-slate-800/80 pt-3">
              <div className="bg-slate-900 dark:bg-slate-950 rounded-xl p-3 text-white">
                <p className="text-[9px] opacity-60 mb-1 uppercase tracking-tight font-bold font-mono">Admin Context</p>
                <p className="text-xs font-mono text-sky-400 font-bold">PROD_NODE_IDBI_05</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Active Dashboard Section */}
        <main className="flex-1 min-w-0" id="main-active-panel">
          {activeTab === "dashboard" && <ExecutiveAnalytics />}
          {activeTab === "agents" && <AgentControlCenter agents={agents} setAgents={setAgents} />}
          {activeTab === "orchestrator" && <OrchestrationPanel customers={customers} agents={agents} setAgents={setAgents} />}
          {activeTab === "customers" && (
            <CustomerProfiles
              customers={customers}
              transactions={transactions}
              onSelectCustomer={setSelectedCustomerId}
              selectedCustomerId={selectedCustomerId}
            />
          )}
          {activeTab === "documents" && (
            <DocumentViewer
              customers={customers}
              documents={documents}
              setDocuments={setDocuments}
            />
          )}
          {activeTab === "chat" && <InteractiveChat agents={agents} />}
        </main>
      </div>

      {/* Floating back to landing trigger */}
      <footer className="border-t border-slate-200 dark:border-slate-900 py-4 px-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 IDBI Innovate Hackathon MVP — Wildcard Track (Track 05)</p>
        <button
          onClick={() => setBooted(false)}
          className="text-[10px] text-slate-400 hover:text-sky-500 font-mono flex items-center space-x-1.5 cursor-pointer"
        >
          <span>Return to Pitch Brochure</span>
        </button>
      </footer>
    </div>
  );
}

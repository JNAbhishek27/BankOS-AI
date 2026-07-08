import React from "react";
import { BrainCircuit, Cpu, ShieldCheck, Scale, FileCode2, Play, Users, GitMerge, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface LandingPageProps {
  onBootOS: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onBootOS }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between transition-colors duration-300 select-none">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 h-[350px] w-[350px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 h-[350px] w-[350px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 border-b border-slate-900 bg-slate-950/40 backdrop-blur-md max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-sky-500 text-white p-2.5 rounded-xl shadow-lg shadow-sky-500/20">
            <BrainCircuit className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-display font-black text-xl tracking-tight text-white">
              BankOS <span className="text-sky-400 font-medium">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">
              Autonomous Multi-Agent Kernel
            </p>
          </div>
        </div>

        <span className="bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono px-3.5 py-1.5 rounded-full">
          IDBI INNOVATE 2026 • TRACK 05
        </span>
      </header>

      {/* Hero Content Section */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 flex-1 flex flex-col items-center justify-center text-center space-y-12">
        <div className="space-y-4 max-w-3xl">
          <span className="bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold px-4 py-1.5 rounded-full inline-block tracking-widest uppercase">
            IDBI Innovate 2026 — Wildcard Track Entry
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] text-balance">
            The Autonomous Multi-Agent <br />
            <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Operating System for Banking
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            BankOS AI goes beyond traditional single-bot Q&A. It orchestrates a synchronized collective of specialized AI agents—Lending, Compliance, Fraud, Risks, and OCR—coordinating their evaluations to secure banking assets while keeping humans firmly in control.
          </p>
        </div>

        {/* Boot Trigger Action */}
        <div className="flex flex-col items-center space-y-3">
          <button
            onClick={onBootOS}
            className="group relative bg-sky-600 hover:bg-sky-500 text-white px-8 py-4 rounded-2xl font-semibold text-sm flex items-center space-x-3.5 shadow-xl shadow-sky-500/10 border border-sky-400 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            id="boot-os-button"
          >
            <Play className="h-4 w-4 fill-current group-hover:animate-bounce" />
            <span>Initialize BankOS Kernel</span>
            <ArrowRight className="h-4 w-4 text-sky-300 group-hover:translate-x-1.5 transition-transform" />
          </button>
          <span className="text-[10px] text-slate-500 font-mono">
            Boot sequence establishes secure local AI gateways
          </span>
        </div>

        {/* Structural Schematic Graph Flowchart */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 max-w-4xl w-full">
          <h4 className="font-display font-bold text-xs text-slate-300 uppercase tracking-widest mb-6 flex items-center justify-center space-x-2">
            <GitMerge className="h-4 w-4 text-sky-400" />
            <span>Autonomous Orchestration Schematic</span>
          </h4>

          {/* Simple Grid Graphic showing pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center relative">
            {/* Step 1 */}
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl text-center">
              <span className="text-[10px] font-mono font-bold text-slate-500 block">STEP 1</span>
              <span className="text-xs font-semibold block text-white mt-1">Transaction / Request</span>
              <p className="text-[9px] text-slate-500 font-mono mt-1">Loan Apply or Money Transfer</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex justify-center text-slate-600">
              <ArrowRight className="h-5 w-5" />
            </div>

            {/* Step 2 */}
            <div className="bg-slate-950/80 border border-sky-500/20 p-4 rounded-xl text-center ring-1 ring-sky-500/10">
              <span className="text-[10px] font-mono font-bold text-sky-400 block">STEP 2</span>
              <span className="text-xs font-semibold block text-white mt-1">AI Orchestrator</span>
              <p className="text-[9px] text-slate-500 font-mono mt-1">Decomposes and dispatches tasks</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex justify-center text-slate-600">
              <ArrowRight className="h-5 w-5" />
            </div>

            {/* Step 3 */}
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl text-center">
              <span className="text-[10px] font-mono font-bold text-emerald-400 block">STEP 3</span>
              <span className="text-xs font-semibold block text-white mt-1">Specialized Audits</span>
              <p className="text-[9px] text-slate-500 font-mono mt-1">Lending, Security & Regulations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-slate-850">
            {/* Aspect 1 */}
            <div className="text-left space-y-2">
              <div className="flex items-center space-x-2 text-sky-400 font-semibold text-xs">
                <Cpu className="h-4 w-4" />
                <span>Explainable Decisions</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Every aggregate consensus verdict is backed by an explicit executive justification memo, explaining calculations and resolving compliance flags.
              </p>
            </div>

            {/* Aspect 2 */}
            <div className="text-left space-y-2">
              <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs">
                <ShieldCheck className="h-4 w-4" />
                <span>Regulatory Safe Guardrails</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                KYC standings, Politically Exposed Persons (PEP) screenings, and AML transaction velocities are crosschecked with RBI/FIU policies instantly.
              </p>
            </div>

            {/* Aspect 3 */}
            <div className="text-left space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs">
                <Users className="h-4 w-4" />
                <span>Multi-Agent Consensus</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Specialized micro-models operate independently using targeted context prompts, allowing the bank's team to hot-reload system guidelines on the fly.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-6 border-t border-slate-900 bg-slate-950/20 text-center text-xs text-slate-500 max-w-7xl mx-auto w-full">
        <p>© 2026 IDBI Innovate Hackathon • Created for Track 05 — Wildcard Track</p>
      </footer>
    </div>
  );
};

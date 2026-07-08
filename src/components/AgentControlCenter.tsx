import React, { useState } from "react";
import { AgentState, AgentId } from "../types";
import { Shield, Hammer, FileEdit, CheckCircle2, Play, AlertTriangle, Cpu } from "lucide-react";
import { motion } from "motion/react";

interface AgentControlCenterProps {
  agents: AgentState[];
  setAgents: React.Dispatch<React.SetStateAction<AgentState[]>>;
}

export const AgentControlCenter: React.FC<AgentControlCenterProps> = ({
  agents,
  setAgents,
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState<AgentId>(AgentId.ORCHESTRATOR);
  const [editedPrompt, setEditedPrompt] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const activeAgent = agents.find((a) => a.id === selectedAgentId)!;

  // Initialize editing panel when active agent changes
  React.useEffect(() => {
    if (activeAgent) {
      setEditedPrompt(activeAgent.systemPrompt);
      setSuccessMessage("");
    }
  }, [selectedAgentId]);

  const handleUpdatePrompt = () => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === selectedAgentId
          ? { ...agent, systemPrompt: editedPrompt }
          : agent
      )
    );
    setSuccessMessage(`Successfully hot-reloaded System Directive for ${activeAgent.name}!`);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 transition-colors duration-300">
      {/* Left Column: Agents Grid list */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center space-x-2.5 mb-4">
            <Cpu className="h-5 w-5 text-sky-500" />
            <h2 className="font-display font-bold text-lg text-slate-800 dark:text-white">
              AI Agents Registry
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-sans leading-relaxed">
            Active autonomous models registered with BankOS. Select any model to audit their current configurations.
          </p>

          <div className="space-y-2.5" id="agent-registry-list">
            {agents.map((agent) => {
              const isActive = agent.id === selectedAgentId;
              const isRunning = agent.status === "analyzing";
              
              return (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    isActive
                      ? "bg-slate-50 dark:bg-slate-800/60 border-sky-500/50 shadow-sm agent-active-glow"
                      : "bg-transparent border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-850/50"
                  }`}
                  id={`agent-tab-${agent.id}`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <span className="text-2xl bg-white dark:bg-slate-800 p-1.5 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-center">
                      {agent.avatar}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
                        {agent.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">
                        {agent.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isRunning ? (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                      </span>
                    ) : agent.status === "completed" ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-600"></div>
                    )}
                    <span className="text-[9px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
                      {agent.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Prompts, capabilities & details */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col h-full justify-between">
          <div className="space-y-5">
            {/* Header info */}
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center space-x-4">
                <span className="text-4xl bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                  {activeAgent.avatar}
                </span>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center space-x-2">
                    <span>{activeAgent.name}</span>
                    <span className="text-[10px] font-mono font-bold bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40 px-2 py-0.5 rounded-md">
                      {activeAgent.role}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                    {activeAgent.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Capabilities badges */}
            <div>
              <h5 className="text-[10px] font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-2">
                Core Capabilities Matrix
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {activeAgent.capabilities.map((cap, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-[10px] px-2.5 py-1 rounded-md font-sans"
                  >
                    ⚡ {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Prompt Editor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase flex items-center space-x-1">
                  <FileEdit className="h-3 w-3" />
                  <span>Agent System Instruction Directive (Hot-Reloadable)</span>
                </label>
                <span className="text-[10px] text-sky-500 font-mono font-medium">
                  Dynamic LLM Guardrails
                </span>
              </div>
              <textarea
                value={editedPrompt}
                onChange={(e) => setEditedPrompt(e.target.value)}
                rows={9}
                className="w-full text-xs font-mono p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all leading-relaxed"
                placeholder="Enter system prompt for agent..."
              />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
              <Shield className="h-3.5 w-3.5 text-sky-500" />
              <span className="text-[10px] font-sans">
                Edits apply to live workspace simulations.
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {successMessage && (
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 px-3 py-1.5 rounded-lg animate-fade-in">
                  {successMessage}
                </span>
              )}
              <button
                onClick={handleUpdatePrompt}
                className="bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white text-xs font-medium px-4 py-2 rounded-xl transition-all shadow-md shadow-sky-500/10 cursor-pointer flex items-center space-x-1.5"
                id="btn-update-prompt"
              >
                <Play className="h-3 w-3 fill-current" />
                <span>Hot-Reload Directive</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

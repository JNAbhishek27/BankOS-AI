import React, { useState, useEffect, useRef } from "react";
import { AgentState, AgentId, ChatMessage } from "../types";
import { Send, Cpu, User, ArrowRight, Loader2, Sparkles, MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface InteractiveChatProps {
  agents: AgentState[];
}

export const InteractiveChat: React.FC<InteractiveChatProps> = ({ agents }) => {
  const [activeAgentId, setActiveAgentId] = useState<AgentId>(AgentId.ORCHESTRATOR);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init",
      sender: "orchestrator",
      text: "Welcome to BankOS. I am the Central AI Orchestrator coordinating all autonomous operations. You can ask me high-level questions about loan processes, compliance standing, and fraud reviews, or select any specialized agent to converse with directly.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agentName: "Orchestrator AI (Central Engine)"
    }
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  const activeAgent = agents.find((a) => a.id === activeAgentId) || agents[0];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          activeAgentId: activeAgentId,
          history: messages.map((m) => ({
            sender: m.sender,
            text: m.text
          }))
        })
      });

      const data = await res.json();
      
      const agentMsg: ChatMessage = {
        id: `msg-agent-${Date.now()}`,
        sender: activeAgentId,
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentName: data.agentName,
        simulated: data.simulated
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (error) {
      console.error("Chat failure", error);
      
      const errMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        sender: activeAgentId,
        text: "Apologies, the secure BankOS gateway encountered a temporary connection glitch. Please ensure your environment is fully compiled or retry in a moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentName: activeAgent.name
      };
      
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[550px] transition-colors duration-300">
      {/* Sidebar: select agent to talk to */}
      <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col h-full overflow-hidden">
        <h4 className="font-display font-bold text-xs text-slate-800 dark:text-white mb-3 flex items-center space-x-2">
          <MessageSquare className="h-4 w-4 text-sky-500" />
          <span>Active Channels</span>
        </h4>
        <div className="space-y-1.5 overflow-y-auto flex-1 pr-1" id="chat-channels-grid">
          {agents.map((agent) => {
            const isSelected = agent.id === activeAgentId;
            return (
              <button
                key={agent.id}
                onClick={() => {
                  setActiveAgentId(agent.id);
                  // Add a polite introduction when switching agents
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: `switch-${Date.now()}`,
                      sender: agent.id,
                      text: `Channel established with **${agent.name}**. Ready to analyze ledger states. Ask me anything regarding my specialized role.`,
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      agentName: agent.name
                    }
                  ]);
                }}
                className={`w-full text-left p-3 rounded-xl border text-xs flex items-center space-x-3 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-50 dark:bg-slate-850 border-sky-500/40 font-semibold"
                    : "bg-transparent border-slate-100 dark:border-slate-850 hover:bg-slate-50/20 dark:hover:bg-slate-800/20"
                }`}
                id={`chat-agent-${agent.id}`}
              >
                <span className="text-xl bg-white dark:bg-slate-800 p-1.5 rounded-lg border border-slate-100 dark:border-slate-750">
                  {agent.avatar}
                </span>
                <div className="truncate">
                  <h5 className="text-[11px] text-slate-800 dark:text-slate-100 truncate">{agent.name.split(" ")[0]}</h5>
                  <p className="text-[9px] text-slate-400 font-mono truncate">{agent.role}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main: Chat dialog timeline */}
      <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col h-full overflow-hidden">
        {/* Header information */}
        <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
          <span className="text-2xl bg-slate-50 dark:bg-slate-800 p-2 rounded-xl border border-slate-100 dark:border-slate-700">
            {activeAgent.avatar}
          </span>
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-white flex items-center space-x-1.5">
              <span>{activeAgent.name}</span>
              <Sparkles className="h-3 w-3 text-sky-500" />
            </h4>
            <p className="text-[10px] text-slate-400 font-sans mt-0.5">{activeAgent.description}</p>
          </div>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-2" id="chat-messages-container">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 text-xs max-w-[85%] ${
                  isUser ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Avatar icon */}
                <div className={`p-2 rounded-xl border flex items-center justify-center shrink-0 ${
                  isUser
                    ? "bg-sky-500 border-sky-400 text-white"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                }`}>
                  {isUser ? <User className="h-3.5 w-3.5" /> : <span>{activeAgent.avatar}</span>}
                </div>

                {/* Bubble details */}
                <div className="space-y-1">
                  {!isUser && msg.agentName && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono font-bold text-slate-400 block tracking-tight uppercase">
                        {msg.agentName}
                      </span>
                      {msg.simulated && (
                        <span className="bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded" title="Primary AI under heavy quota load. High-fidelity backup active.">
                          SIM ENGINE ACTIVE
                        </span>
                      )}
                    </div>
                  )}
                  <div className={`p-3.5 rounded-2xl border leading-relaxed shadow-sm font-mono ${
                    isUser
                      ? "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-tr-none whitespace-pre-wrap text-xs"
                      : "bg-sky-50/20 dark:bg-sky-950/15 border-sky-500/10 text-slate-800 dark:text-slate-300 rounded-tl-none prose dark:prose-invert max-w-none text-xs"
                  }`}>
                    {isUser ? (
                      msg.text
                    ) : (
                      <div className="markdown-body">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                            li: ({ children }) => <li className="mb-0.5 leading-relaxed">{children}</li>,
                            h1: ({ children }) => <h1 className="text-sm font-bold mt-3 mb-1 text-slate-900 dark:text-white">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-sm font-bold mt-3 mb-1 text-slate-900 dark:text-white">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-xs font-bold mt-2.5 mb-1 text-slate-900 dark:text-white">{children}</h3>,
                            strong: ({ children }) => <strong className="font-bold text-slate-900 dark:text-white">{children}</strong>,
                            hr: () => <hr className="my-2.5 border-slate-200 dark:border-slate-800" />,
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 block text-right mt-0.5">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-3 text-xs">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                <span>{activeAgent.avatar}</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-800/30 border border-slate-150 dark:border-slate-800 p-3 rounded-2xl text-slate-400 font-mono">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-sky-500" />
                <span className="text-[10px]">Evaluating parameters...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input text form */}
        <form onSubmit={handleSendMessage} className="mt-4 pt-3 border-t border-slate-150 dark:border-slate-800/80 flex items-center gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isTyping}
            className="flex-1 text-xs font-mono p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all"
            placeholder={`Ask ${activeAgent.name.split(" ")[0]} a question or audit ledger...`}
            id="chat-input-field"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            className={`p-3.5 rounded-xl transition-all shadow-md cursor-pointer ${
              !inputMessage.trim() || isTyping
                ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed dark:bg-slate-800 dark:border-slate-800 dark:text-slate-600"
                : "bg-sky-600 hover:bg-sky-500 text-white shadow-sky-500/10 border border-sky-500"
            }`}
            id="chat-send-button"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

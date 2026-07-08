import React, { useEffect, useState } from "react";
import { BrainCircuit, Clock, Sun, Moon, ShieldAlert, CheckCircle2, User } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  currentUser: { name: string; role: string; email: string };
  isOnline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  currentUser,
  isOnline,
}) => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      try {
        const parts = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).formatToParts(now);

        const day = parts.find((p) => p.type === "day")?.value || "01";
        const month = parts.find((p) => p.type === "month")?.value || "01";
        const year = parts.find((p) => p.type === "year")?.value || "2026";
        const hour = parts.find((p) => p.type === "hour")?.value || "00";
        const minute = parts.find((p) => p.type === "minute")?.value || "00";
        const second = parts.find((p) => p.type === "second")?.value || "00";

        setTime(`${year}-${month}-${day} ${hour}:${minute}:${second} IST`);
      } catch (e) {
        // Fallback to basic string format if formatter fails
        setTime(now.toISOString().replace("T", " ").slice(0, 19) + " UTC");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between shrink-0">
      <div className="flex items-center space-x-3" id="nav-brand">
        <div className="bg-sky-600 text-white p-2 rounded-lg shadow-md">
          <BrainCircuit className="h-5 w-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-display font-bold text-lg tracking-tight text-white">
              BankOS <span className="text-sky-400 font-medium">AI</span>
            </h1>
            <span className="bg-slate-800 text-sky-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-slate-700">
              v1.0 MVP
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-sans tracking-wide uppercase">
            AI-Powered Multi-Agent Banking Orchestration & Compliance System
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* System Health / Status Indicator */}
        <div className="hidden md:flex items-center space-x-2 bg-slate-800 px-3.5 py-1 rounded-full border border-slate-700">
          <div className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isOnline ? "bg-emerald-400" : "bg-amber-400"} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isOnline ? "bg-emerald-500" : "bg-amber-500"}`}></span>
          </div>
          <span className="text-xs font-mono font-medium text-slate-300">
            {isOnline ? "ORCHESTRATOR ONLINE" : "SIMULATED AI GATEWAY"}
          </span>
        </div>

        {/* Live System clock */}
        <div className="hidden lg:flex items-center space-x-2 text-slate-300">
          <Clock className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-mono font-medium">{time}</span>
        </div>

        {/* User Badge */}
        <div className="flex items-center space-x-3 border-l border-slate-700 pl-6">
          <div className="bg-slate-800 p-2 rounded-full border border-slate-750">
            <User className="h-4 w-4 text-slate-300" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-200">{currentUser.name}</p>
            <p className="text-[10px] text-slate-400 font-mono">{currentUser.role}</p>
          </div>
        </div>

        {/* Light/Dark mode Switcher */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg border border-slate-700 transition-all duration-200 cursor-pointer"
          title="Toggle Theme"
          id="btn-theme-toggle"
        >
          {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
};

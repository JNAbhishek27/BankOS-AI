import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, ShieldCheck, Users, FileText, AlertTriangle, ShieldAlert } from "lucide-react";

// Macro static data for elegant banking charts
const auditVolumeData = [
  { month: "Jan", approved: 340, flagged: 45, rejected: 12 },
  { month: "Feb", approved: 380, flagged: 32, rejected: 18 },
  { month: "Mar", approved: 420, flagged: 50, rejected: 8 },
  { month: "Apr", approved: 480, flagged: 62, rejected: 15 },
  { month: "May", approved: 510, flagged: 40, rejected: 21 },
  { month: "Jun", approved: 590, flagged: 55, rejected: 14 }
];

const riskDistributionData = [
  { name: "Clear KYC / Low Risk", value: 65, color: "#10B981" },
  { name: "Compliance Flags / Medium Risk", value: 25, color: "#F59E0B" },
  { name: "Severe Fraud Indicators", value: 10, color: "#EF4444" }
];

const transactionTrendData = [
  { day: "Jul 01", normalVolume: 1200000, suspiciousVolume: 45000 },
  { day: "Jul 02", normalVolume: 1450000, suspiciousVolume: 32000 },
  { day: "Jul 03", normalVolume: 1320000, suspiciousVolume: 15000 },
  { day: "Jul 04", normalVolume: 1580000, suspiciousVolume: 98000 }, // High threat day
  { day: "Jul 05", normalVolume: 1650000, suspiciousVolume: 12000 },
  { day: "Jul 06", normalVolume: 1720000, suspiciousVolume: 85000 },
  { day: "Jul 07", normalVolume: 1890000, suspiciousVolume: 110000 }
];

export const ExecutiveAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 transition-colors duration-300">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="executive-stats-grid">
        {/* Metric 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
              Assets Under Audit (AUM)
            </span>
            <h3 className="text-xl font-display font-black tracking-tight text-slate-800 dark:text-white mt-1">
              ₹84.32 Cr
            </h3>
            <p className="text-[10px] text-emerald-500 font-mono mt-0.5 font-bold flex items-center">
              <TrendingUp className="h-3 w-3 mr-0.5" /> +14.2% Month-on-Month
            </p>
          </div>
          <div className="bg-sky-50 dark:bg-sky-950/40 text-sky-500 p-3 rounded-xl border border-sky-100 dark:border-sky-900/30">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
              Compliance Clear-Rate
            </span>
            <h3 className="text-xl font-display font-black tracking-tight text-slate-800 dark:text-white mt-1">
              98.45%
            </h3>
            <p className="text-[10px] text-emerald-500 font-mono mt-0.5 font-bold flex items-center">
              <ShieldCheck className="h-3 w-3 mr-0.5" /> High Regulator Standing
            </p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
              Active Audit Reports
            </span>
            <h3 className="text-xl font-display font-black tracking-tight text-slate-800 dark:text-white mt-1">
              2,845
            </h3>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
              100% Autonomous Coverage
            </p>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
            <FileText className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
              Threats Deflected
            </span>
            <h3 className="text-xl font-display font-black tracking-tight text-slate-800 dark:text-white mt-1">
              148 held
            </h3>
            <p className="text-[10px] text-rose-500 font-mono mt-0.5 font-bold flex items-center">
              <ShieldAlert className="h-3 w-3 mr-0.5" /> Card Cloning Defeated
            </p>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/40 text-rose-500 p-3 rounded-xl border border-rose-100 dark:border-rose-900/30">
            <ShieldAlert className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Grid: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left main: Volume Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-display font-bold text-sm text-slate-800 dark:text-white">
                Multi-Agent Decision Volume
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Autonomous audits compiled across all active portfolios
              </p>
            </div>
            <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-slate-500 dark:text-slate-400">
              Last 6 Months
            </span>
          </div>

          <div className="h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={auditVolumeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15, 23, 42, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="approved" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} name="Approved" />
                <Bar dataKey="flagged" stackId="a" fill="#F59E0B" name="Flagged / Held" />
                <Bar dataKey="rejected" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} name="Denied" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right sub: Risk distribution Pie */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
          <h4 className="font-display font-bold text-sm text-slate-800 dark:text-white mb-1">
            Portfolio Security Index
          </h4>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-6">
            Percentage representation of registered accounts by alert level
          </p>

          <div className="h-56 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(15, 23, 42, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">
                Total Dossiers
              </span>
              <span className="text-xl font-display font-black tracking-tight text-slate-800 dark:text-white">
                12,845
              </span>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            {riskDistributionData.map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">{entry.name}</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Transaction Volume vs Suspicious Velocity Curve */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-display font-bold text-sm text-slate-800 dark:text-white">
              Secured Volume Audit
            </h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              Comparison of general cleared transactions versus flagged threat volumes
            </p>
          </div>
        </div>

        <div className="h-64 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={transactionTrendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="day" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  background: "rgba(15, 23, 42, 0.9)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend iconType="plainline" />
              <Line type="monotone" dataKey="normalVolume" stroke="#0284C7" strokeWidth={2.5} name="Normal Assets Cleared (₹)" dot={false} />
              <Line type="monotone" dataKey="suspiciousVolume" stroke="#EF4444" strokeWidth={2.5} name="Flagged Assets Blocked (₹)" activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

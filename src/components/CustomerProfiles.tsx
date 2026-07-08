import React, { useState } from "react";
import { Customer, Transaction } from "../types";
import { Search, UserCheck, ShieldAlert, CreditCard, Landmark, Phone, Mail, MapPin } from "lucide-react";

interface CustomerProfilesProps {
  customers: Customer[];
  transactions: Transaction[];
  onSelectCustomer: (id: string) => void;
  selectedCustomerId: string;
}

export const CustomerProfiles: React.FC<CustomerProfilesProps> = ({
  customers,
  transactions,
  onSelectCustomer,
  selectedCustomerId,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];
  const activeTx = transactions.filter((t) => t.customerId === activeCustomer.id);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 transition-colors duration-300">
      {/* Directory Search list */}
      <div className="xl:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-slate-800 dark:text-white">
            Customer Directory
          </h3>
          <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-850 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">
            {filteredCustomers.length} records
          </span>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs font-sans pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500/50 focus:border-sky-500/50"
            placeholder="Search by name, pan, email..."
          />
        </div>

        {/* List items */}
        <div className="space-y-2 overflow-y-auto max-h-[420px]" id="customer-list-panel">
          {filteredCustomers.map((c) => {
            const isSelected = c.id === activeCustomer.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelectCustomer(c.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? "bg-slate-50 dark:bg-slate-800/60 border-sky-500/40 shadow-sm"
                    : "bg-transparent border-slate-200 dark:border-slate-800 hover:bg-slate-50/20 dark:hover:bg-slate-800/20"
                }`}
                id={`customer-item-${c.id}`}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    referrerPolicy="no-referrer"
                    className="h-9 w-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                      {c.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate">
                      PAN: {c.panNumber} • Score: {c.creditScore}
                    </p>
                  </div>
                </div>

                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md ${
                  c.kycStatus === "verified"
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30"
                    : c.kycStatus === "failed"
                    ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30"
                    : "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30"
                }`}>
                  KYC: {c.kycStatus.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Active Dossier & Transactions */}
      <div className="xl:col-span-2 space-y-4">
        {/* Dossier Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5 gap-4">
            <div className="flex items-center space-x-4">
              <img
                src={activeCustomer.avatar}
                alt={activeCustomer.name}
                referrerPolicy="no-referrer"
                className="h-16 w-16 rounded-full object-cover border-2 border-sky-500/20"
              />
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  {activeCustomer.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                  IDBI Active Account Holder • ID: <span className="font-mono font-bold">{activeCustomer.id}</span>
                </p>
              </div>
            </div>

            {/* Quick Balance indicator */}
            <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-left sm:text-right">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wide">
                Available Ledger Balance
              </span>
              <p className="text-base font-display font-black text-slate-800 dark:text-white">
                ₹{activeCustomer.balance.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Core financial matrices */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Credit Score</span>
              <p className={`text-base font-display font-black ${
                activeCustomer.creditScore >= 750
                  ? "text-emerald-500"
                  : activeCustomer.creditScore >= 600
                  ? "text-amber-500"
                  : "text-rose-500"
              }`}>
                {activeCustomer.creditScore}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Monthly Income</span>
              <p className="text-base font-display font-black text-slate-800 dark:text-white">
                ₹{activeCustomer.monthlyIncome.toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Existing Debt</span>
              <p className="text-base font-display font-black text-slate-800 dark:text-white font-mono">
                ₹{activeCustomer.existingDebt.toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">PEP Standing</span>
              <p className={`text-base font-display font-black ${
                activeCustomer.pepStatus === "clear" ? "text-emerald-500" : "text-rose-500"
              }`}>
                {activeCustomer.pepStatus.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Demographic metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 text-xs text-slate-600 dark:text-slate-300">
            <div className="space-y-3">
              <div className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-slate-400" />
                <span>{activeCustomer.email}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-slate-400" />
                <span>{activeCustomer.phone}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="truncate">{activeCustomer.address}</span>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between">
                <span className="font-mono text-[10px] text-slate-400 uppercase">PAN Number</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{activeCustomer.panNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[10px] text-slate-400 uppercase">Aadhaar Unified ID</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{activeCustomer.aadhaarNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[10px] text-slate-400 uppercase">Employment Designation</span>
                <span className="font-sans font-medium text-slate-850 dark:text-slate-200 text-right truncate max-w-[200px]">
                  {activeCustomer.employmentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History ledger list */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h4 className="font-display font-bold text-xs text-slate-800 dark:text-white mb-4">
            Recent Transaction Log Checks
          </h4>

          <div className="space-y-2" id="customer-transactions-log">
            {activeTx.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-150 dark:border-slate-800/80 bg-slate-50/20 dark:bg-slate-950/25 text-xs"
              >
                <div className="flex items-start space-x-3.5 min-w-0">
                  <span className={`p-2 rounded-lg font-mono font-black border shadow-sm ${
                    tx.type === "credit"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30"
                      : "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                  }`}>
                    {tx.type === "credit" ? "CR" : "DR"}
                  </span>

                  <div className="min-w-0">
                    <h5 className="font-bold text-slate-800 dark:text-slate-200 truncate">{tx.description}</h5>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                      {new Date(tx.date).toLocaleDateString()} • {tx.location}
                    </p>
                    {tx.riskLevel === "high" && tx.flagReason && (
                      <p className="text-[10px] text-rose-500 font-sans mt-1.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 p-2 rounded-lg leading-relaxed flex items-start">
                        <ShieldAlert className="h-3.5 w-3.5 mr-1 text-rose-500 shrink-0 mt-0.5" />
                        <span>{tx.flagReason}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-display font-black text-sm block ${
                    tx.type === "credit" ? "text-emerald-500" : "text-slate-800 dark:text-slate-100"
                  }`}>
                    {tx.type === "credit" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                  </span>
                  <span className={`text-[9px] font-mono font-bold uppercase mt-1 inline-block px-1.5 py-0.5 rounded ${
                    tx.status === "cleared"
                      ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600"
                      : tx.status === "held"
                      ? "bg-amber-50 dark:bg-amber-950/30 text-amber-600"
                      : "bg-rose-50 dark:bg-rose-950/30 text-rose-600"
                  }`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

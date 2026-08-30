"use client";

import { TrendingUp, RefreshCw, Layers } from "lucide-react";

interface WalletOverviewProps {
  onViewAll: () => void;
}

export default function WalletOverview({ onViewAll }: WalletOverviewProps) {
  return (
    <div className="flex flex-col gap-8 w-full text-left font-manrope">
      
      {/* Balance & Usage Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-stretch">
        
        {/* Available Balance Hero Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#001BD2] to-[#2D3FEA] text-white rounded-[32px] p-10 shadow-[0px_25px_50px_-12px_rgba(0,27,210,0.2)] relative overflow-hidden flex flex-col justify-between min-h-[268px]">
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full filter blur-xl"></div>
          
          <div className="flex flex-col gap-2 text-left z-10 relative">
            <span className="text-sm font-semibold tracking-[0.7px] text-[#CACDFF] uppercase">Available Balance</span>
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white mt-1">$42,850.00</h2>
          </div>

          <div className="flex flex-col items-end self-end text-right opacity-60 z-10 relative mt-4">
            <span className="text-[10px] font-medium tracking-[2.4px] text-white uppercase">Sovereign ID</span>
            <span className="font-mono text-sm tracking-widest text-white mt-1">**** 8842</span>
          </div>
        </div>

        {/* Usage This Month Card */}
        <div className="bg-white border border-[#C5C5D9]/10 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[32px] p-8 flex flex-col justify-between min-h-[268px]">
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col text-left">
              <span className="font-bold text-[#131B2E] text-lg">Usage This Month</span>
              <span className="text-xs text-[#454656] font-medium mt-1">October 1 - October 24</span>
            </div>
            <span className="text-xl font-bold text-[#001BD2]">$12,480</span>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <div className="flex justify-between items-center text-xs font-semibold text-[#454656]">
              <span>Spending Limit</span>
              <span className="text-[#131B2E] font-bold">$15,000</span>
            </div>
            <div className="w-full h-3 bg-[#E2E7FF] rounded-full overflow-hidden relative">
              <div className="absolute top-0 bottom-0 left-0 bg-[#001BD2] rounded-full" style={{ width: "83%" }}></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-[#F2F3FF] p-4 rounded-2xl flex flex-col text-left gap-1">
              <span className="text-[10px] font-bold text-[#454656]/80 uppercase">Active Claims</span>
              <span className="text-lg font-bold text-[#131B2E]">248</span>
            </div>
            <div className="bg-[#F2F3FF] p-4 rounded-2xl flex flex-col text-left gap-1">
              <span className="text-[10px] font-bold text-[#454656]/80 uppercase">Avg. Claim</span>
              <span className="text-lg font-bold text-[#131B2E]">$50.32</span>
            </div>
          </div>
        </div>

      </div>

      {/* Transaction History Section */}
      <div className="w-full bg-white border border-[#C5C5D9]/10 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[32px] overflow-hidden flex flex-col">
        <div className="px-8 py-6 flex justify-between items-center border-b border-[#C5C5D9]/5 bg-white">
          <h3 className="font-jakarta font-bold text-lg text-[#131B2E]">Transaction History</h3>
          <button onClick={onViewAll} className="bg-transparent border-none text-sm font-bold text-[#001BD2] hover:underline cursor-pointer">View All</button>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#C5C5D9]/10 bg-[#FAF8FF]">
                <th className="p-5 text-left text-[11px] font-bold tracking-wider text-[#454656] uppercase">Date</th>
                <th className="p-5 text-left text-[11px] font-bold tracking-wider text-[#454656] uppercase">Description</th>
                <th className="p-5 text-left text-[11px] font-bold tracking-wider text-[#454656] uppercase">Amount</th>
                <th className="p-5 text-left text-[11px] font-bold tracking-wider text-[#454656] uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "Oct 24, 2023", label: "Wallet Auto-Reload", val: "+$5,000.00", status: "Completed", isPos: true },
                { date: "Oct 22, 2023", label: "Campaign: Q4 Brand Launch", val: "-$1,240.50", status: "Processing", isPos: false },
                { date: "Oct 19, 2023", label: "API Usage Premium Tier", val: "-$450.00", status: "Completed", isPos: false },
                { date: "Oct 15, 2023", label: "Manual Deposit - Wire", val: "+$10,000.00", status: "Completed", isPos: true }
              ].map((tx, i) => (
                <tr key={i} className="border-b border-[#C5C5D9]/10 hover:bg-[#F2F3FF]/20 text-sm text-[#454656] transition-colors">
                  <td className="p-5 text-left font-medium">{tx.date}</td>
                  <td className="p-5 text-left font-bold text-[#131B2E]">{tx.label}</td>
                  <td className={`p-5 text-left font-bold ${tx.isPos ? "text-emerald-600" : "text-[#131B2E]"}`}>{tx.val}</td>
                  <td className="p-5 text-left">
                    <span className={`font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider ${
                      tx.status === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, Calendar } from "lucide-react";
import { useBrandApiStore } from "@/stores/useBrandApiStore";
import { formatDate, formatMoney, formatTime, titleCase, toNumber } from "../../utils/backendMappers";

export default function WalletDetails() {
  const [activePage, setActivePage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("Status");
  const wallet = useBrandApiStore((state) => state.wallet);
  const walletTransactions = useBrandApiStore((state) => state.walletTransactions);

  const allTransactions = walletTransactions.map((tx) => {
    const signed = toNumber(tx.signed_amount ?? tx.amount);
    return {
      id: String(tx.id ?? tx.created_at),
      date: formatDate(tx.created_at),
      time: formatTime(tx.created_at),
      label: String(tx.description ?? tx.category ?? "Ledger entry"),
      type: signed >= 0 ? "Deposits" : "Withdrawals",
      amount: formatMoney(signed),
      method: titleCase(tx.reference_type ?? "wallet"),
      badge: String(tx.category ?? "").toUpperCase(),
      status: "Succeeded",
      isPos: signed >= 0,
    };
  });

  const filteredTx = allTransactions.filter((tx) => {
    const matchesType = typeFilter === "All Types" || tx.type === typeFilter;
    const matchesStatus = statusFilter === "Status" || tx.status === statusFilter;
    return matchesType && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-8 w-full text-left font-manrope">
      <div className="flex flex-row flex-wrap items-center gap-3 w-full bg-[#F2F3FF] p-6 rounded-[24px]">
        <span className="font-jakarta font-bold text-sm text-[#131B2E] mr-auto">
          Transaction History
        </span>
        <select
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value); setActivePage(1); }}
          className="bg-white px-4 py-2 border-none rounded-full text-xs font-bold text-[#131B2E] shadow-sm outline-none cursor-pointer"
        >
          <option>All Types</option>
          <option>Deposits</option>
          <option>Withdrawals</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setActivePage(1); }}
          className="bg-white px-4 py-2 border-none rounded-full text-xs font-bold text-[#131B2E] shadow-sm outline-none cursor-pointer"
        >
          <option>Status</option>
          <option>Succeeded</option>
        </select>
        <div className="bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm text-xs font-bold text-[#131B2E]">
          <Calendar className="w-3.5 h-3.5 text-[#001BD2]" />
          <span>All Time</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
        <div className="bg-white border border-[#C5C5D9]/10 shadow-sm rounded-2xl p-6 flex flex-col text-left">
          <span className="text-xs font-bold text-[#454656] uppercase tracking-wider">Total Balance</span>
          <h3 className="font-jakarta font-extrabold text-2xl text-[#131B2E] mt-3">
            {formatMoney(wallet?.balance)}
          </h3>
        </div>
        <div className="bg-white border border-[#C5C5D9]/10 shadow-sm rounded-2xl p-6 flex flex-col text-left">
          <span className="text-xs font-bold text-[#454656] uppercase tracking-wider">Held Funds</span>
          <h3 className="font-jakarta font-extrabold text-2xl text-[#131B2E] mt-3">
            {formatMoney(wallet?.held)}
          </h3>
          <span className="text-[10px] text-[#454656] mt-1 font-semibold">reserved for active claims</span>
        </div>
        <div className="bg-gradient-to-br from-[#001BD2] to-[#2D3FEA] text-white rounded-2xl p-6 shadow-md flex justify-between items-center relative overflow-hidden min-h-[100px]">
          <div className="flex flex-col text-left">
            <span className="text-xs font-medium text-white/80 uppercase tracking-wider">Available</span>
            <h3 className="font-jakarta font-extrabold text-2xl text-white mt-1">
              {formatMoney(wallet?.available)}
            </h3>
          </div>
          <span className="text-[10px] font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-[6px] text-right">
            {String(wallet?.currency ?? "USD")}
          </span>
        </div>
      </div>

      <div className="w-full bg-white border border-[#C5C5D9]/10 shadow-sm rounded-2xl overflow-hidden flex flex-col">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#C5C5D9]/10 bg-[#FAF8FF]">
                <th className="p-4 text-left text-[11px] font-bold tracking-wider text-[#454656] uppercase">Date</th>
                <th className="p-4 text-left text-[11px] font-bold tracking-wider text-[#454656] uppercase">Type</th>
                <th className="p-4 text-left text-[11px] font-bold tracking-wider text-[#454656] uppercase">Amount</th>
                <th className="p-4 text-left text-[11px] font-bold tracking-wider text-[#454656] uppercase">Method</th>
                <th className="p-4 text-left text-[11px] font-bold tracking-wider text-[#454656] uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTx.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400 font-medium">
                    No transactions match the active filters.
                  </td>
                </tr>
              ) : (
                filteredTx.map((tx) => (
                  <tr key={tx.id} className="border-b border-[#C5C5D9]/10 hover:bg-[#F2F3FF]/30 text-sm text-[#454656] transition-colors">
                    <td className="p-4 text-left flex flex-col gap-0.5">
                      <span className="font-bold text-[#131B2E]">{tx.date}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{tx.time}</span>
                    </td>
                    <td className="p-4 text-left">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#E2E7FF] flex items-center justify-center text-[#001BD2]">
                          {tx.isPos ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                        </div>
                        <span className="font-bold text-[#131B2E]">{tx.label}</span>
                      </div>
                    </td>
                    <td className={`p-4 text-left font-bold ${tx.isPos ? "text-emerald-600" : "text-[#131B2E]"}`}>{tx.amount}</td>
                    <td className="p-4 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{tx.method}</span>
                        {tx.badge && <span className="bg-[#E2E7FF] text-[#131B2E] text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase">{tx.badge}</span>}
                      </div>
                    </td>
                    <td className="p-4 text-left">
                      <span className="font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider bg-emerald-100 text-emerald-700">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-[#FAF8FF] px-6 py-4 border-t border-[#C5C5D9]/10 flex flex-wrap justify-between items-center gap-4">
          <span className="text-xs font-semibold text-[#454656]">
            Showing 1-{filteredTx.length} of {filteredTx.length} transactions
          </span>
          <div className="flex items-center gap-1.5">
            <button onClick={() => activePage > 1 && setActivePage(activePage - 1)} className="w-8 h-8 rounded-lg bg-[#FAF8FF] hover:bg-slate-100 text-slate-400 border-none cursor-pointer flex items-center justify-center">
              Prev
            </button>
            <button className="w-8 h-8 rounded-lg border-none cursor-pointer flex items-center justify-center font-bold text-xs bg-[#001BD2] text-white">
              1
            </button>
            <button onClick={() => setActivePage(activePage + 1)} className="w-8 h-8 rounded-lg bg-[#FAF8FF] hover:bg-slate-100 text-slate-700 border-none cursor-pointer flex items-center justify-center">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import RedemptionRow from "./RedemptionRow";

interface RedemptionItem {
  id: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  userIdCode: string;
  redemptionsCount: number;
  reviewsCount: number;
  campaignName: string;
  subBrand: string;
  receiptThumbnailUrl: string;
  claimedTierLabel: string;
  claimedTierValue: string;
  submittedDate: string;
  submittedTime: string;
  status: "Pending" | "Approved" | "Rejected" | "Expired" | "Manual Review";
  issue?: string;
  priority?: "High" | "Medium";
}

interface RedemptionsTableProps {
  redemptions: RedemptionItem[];
  onViewDetails: (item: RedemptionItem) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function RedemptionsTable({ redemptions, onViewDetails, onApprove, onReject }: RedemptionsTableProps) {
  const [activeTab, setActiveTab] = useState<"Pending" | "Approved" | "Rejected" | "Expired" | "Manual Review">("Pending");
  const [dateFilter, setDateFilter] = useState("Last 30 Days");
  const [tierFilter, setTierFilter] = useState("All Tiers");
  const [showDate, setShowDate] = useState(false);
  const [showTier, setShowTier] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => { setPage(1); }, [activeTab, dateFilter, tierFilter]);

  let filtered = redemptions.filter(r => r.status === activeTab);
  if (dateFilter === "Last 30 Days") {
    filtered = filtered.filter(r => r.submittedDate.includes("May"));
  }
  if (tierFilter !== "All Tiers") {
    const num = tierFilter.split(" ")[1];
    filtered = filtered.filter(r => r.claimedTierLabel.includes(num) || r.claimedTierValue.includes(num === "3" ? "15" : num === "1" ? "4.5" : "28") || (r.priority === "High" && num === "3") || (r.priority === "Medium" && num === "1"));
  }

  const isManualReview = activeTab === "Manual Review";
  const itemsPerPage = 2;
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="flex flex-col gap-6 w-full font-manrope">
      <div className="bg-white border border-[#C5C5D9]/10 shadow-sm rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center w-full gap-4 relative">
        <div className="bg-[#F2F3FF] p-1 rounded-full flex items-center gap-1.5 overflow-x-auto">
          {(["Pending", "Approved", "Rejected", "Expired", "Manual Review"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 text-xs font-bold rounded-full transition-all border-none cursor-pointer ${activeTab === tab ? "bg-white text-[#001BD2] shadow-sm" : "text-[#454656] hover:text-slate-700"}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 relative">
          <div className="relative">
            <button onClick={() => { setShowDate(!showDate); setShowTier(false); }} className="bg-[#F2F3FF] px-4 py-2.5 rounded-full text-xs font-bold text-[#454656] flex items-center gap-2 border-none cursor-pointer">
              <img src="/redemption/dateIcno.svg" alt="Date" className="w-[14px] h-[14px]" /> {dateFilter} ▾
            </button>
            {showDate && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 shadow-lg rounded-xl py-1 z-30">
                {["Last 30 Days", "All Time"].map(d => (
                  <button key={d} onClick={() => { setDateFilter(d); setShowDate(false); }} className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 border-none bg-transparent cursor-pointer text-[#131B2E]">{d}</button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={() => { setShowTier(!showTier); setShowDate(false); }} className="bg-[#F2F3FF] px-4 py-2.5 rounded-full text-xs font-bold text-[#454656] flex items-center gap-2 border-none cursor-pointer">
              <img src="/redemption/tierAll.svg" alt="Tier" className="w-[14px] h-[14px]" /> {tierFilter} ▾
            </button>
            {showTier && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 shadow-lg rounded-xl py-1 z-30">
                {["All Tiers", "Tier 1", "Tier 3", "Tier 5"].map(t => (
                  <button key={t} onClick={() => { setTierFilter(t); setShowTier(false); }} className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 border-none bg-transparent cursor-pointer text-[#131B2E]">{t}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full bg-white border border-[#C5C5D9]/10 shadow-sm rounded-[22px] overflow-hidden flex flex-col">
        <div className="bg-[#F2F3FF] px-8 py-4.5 flex justify-between items-center w-full border-b border-[#C5C5D9]/5">
          <h3 className="font-jakarta font-bold text-base text-[#131B2E]">{isManualReview ? "Pending Audits" : "Completed Redemptions"}</h3>
          {isManualReview && (
            <div className="flex items-center gap-4 text-xs font-semibold text-[#454656]">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#BA1A1A]"></span> High Priority</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#505F76]"></span> Medium Priority</div>
            </div>
          )}
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#C5C5D9]/10 bg-[#FAF8FF]">
                <th className="p-5 text-left text-[10px] font-bold tracking-wider text-[#454656] uppercase">USER</th>
                <th className="p-5 text-left text-[10px] font-bold tracking-wider text-[#454656] uppercase">CAMPAIGN</th>
                <th className={`p-5 text-[10px] font-bold tracking-wider text-[#454656] uppercase ${isManualReview ? "text-left" : "text-center"}`}>{isManualReview ? "ISSUE" : "RECEIPT"}</th>
                <th className="p-5 text-left text-[10px] font-bold tracking-wider text-[#454656] uppercase">{isManualReview ? "SUBMITTED DATE" : "CLAIMED TIER"}</th>
                <th className="p-5 text-left text-[10px] font-bold tracking-wider text-[#454656] uppercase">{isManualReview ? "PRIORITY" : "SUBMITTED DATE"}</th>
                <th className="p-5 text-right text-[10px] font-bold tracking-wider text-[#454656] uppercase">{isManualReview ? "ACTIONS" : "STATUS"}</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(r => <RedemptionRow key={r.id} redemption={r} isManualReviewTab={isManualReview} onViewDetails={onViewDetails} onApprove={onApprove} onReject={onReject} />)}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-sm font-semibold text-slate-400">No redemptions match the current selection.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-5 border-t border-[#C5C5D9]/10 bg-[#F2F3FF]/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-[#454656] uppercase tracking-wider font-manrope">
          <span>Showing {paginated.length > 0 ? (page - 1) * itemsPerPage + 1 : 0}-{Math.min(page * itemsPerPage, filtered.length)} of {filtered.length} results</span>
          <div className="flex items-center gap-2">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="w-8 h-8 rounded-full border border-[#C5C5D9]/20 flex items-center justify-center hover:bg-slate-50 cursor-pointer bg-white disabled:opacity-50">◀</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-full font-bold flex items-center justify-center border cursor-pointer ${page === p ? "bg-[#001BD2] text-white border-[#001BD2]" : "bg-white text-[#131B2E] border-[#C5C5D9]/20 hover:bg-slate-50"}`}>{p}</button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="w-8 h-8 rounded-full border border-[#C5C5D9]/20 flex items-center justify-center hover:bg-slate-50 cursor-pointer bg-white disabled:opacity-50">▶</button>
          </div>
        </div>
      </div>
    </div>
  );
}

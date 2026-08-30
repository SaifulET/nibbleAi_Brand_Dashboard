/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

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

interface RedemptionDetailsViewProps {
  redemption: RedemptionItem;
  onBack: () => void;
}

export default function RedemptionDetailsView({ redemption, onBack }: RedemptionDetailsViewProps) {
  const [notes, setNotes] = useState<string[]>([
    "Receipt was exceptionally clear. Verified Kettle Sea Salt chips manually to confirm OCR."
  ]);
  const [newNote, setNewNote] = useState("");
  const [showAddNote, setShowAddNote] = useState(false);

  const initials = redemption.userName.split(" ").map(n => n[0]).join("").toUpperCase();

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()]);
      setNewNote("");
      setShowAddNote(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-slide-up text-left font-manrope">
      
      {/* Page Header with Back Click */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="bg-transparent border-none cursor-pointer text-xl font-bold text-[#131B2E] hover:text-[#001BD2] flex items-center gap-2">
          <span>←</span> Redemption Details
        </button>
      </div>

      {/* Main Title Block Card */}
      <div className="bg-white border border-[#C5C5D9]/15 shadow-sm rounded-3xl p-6 flex flex-row justify-between items-center w-full relative overflow-hidden border-l-[6px] border-l-[#001BD2]">
        <div className="flex flex-col text-left">
          <h2 className="font-jakarta font-extrabold text-2xl text-[#131B2E]">
            Redemption #{redemption.id === "rem1" ? "1284" : redemption.id.replace("rem", "102")}
          </h2>
          <span className="font-medium text-[#454656] text-sm mt-1">
            Campaign: {redemption.campaignName}
          </span>
        </div>
        <div className="flex items-center">
          <span className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 uppercase tracking-wider ${
            redemption.status === "Approved" ? "bg-[#E8F8F0] text-[#137333]" :
            redemption.status === "Rejected" ? "bg-[#FDF2F2] text-[#BA1A1A]" :
            "bg-[#FFFBEB] text-[#D97706]"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              redemption.status === "Approved" ? "bg-[#137333]" :
              redemption.status === "Rejected" ? "bg-[#BA1A1A]" :
              "bg-[#D97706]"
            }`}></span>
            Status: {redemption.status === "Manual Review" ? "Manual Review" : redemption.status}
          </span>
        </div>
      </div>

      {/* Bento Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
        
        {/* Left Column: Transaction Lifecycle */}
        <div className="bg-white border border-[#C5C5D9]/15 shadow-sm rounded-3xl p-6 flex flex-col gap-6">
          <span className="text-[10px] font-extrabold text-[#454656]/60 uppercase tracking-widest">
            Transaction Lifecycle
          </span>
          <div className="flex flex-col gap-6 pl-2 relative">
            {[
              { title: "Reservation Created", sub: "Oct 24, 2023 • 09:00", active: true, done: true },
              { title: "Purchase Made", sub: "Oct 24, 2023 • 11:30", active: true, done: true },
              { title: "Receipt Uploaded", sub: "Oct 24, 2023 • 14:20", active: true, done: true },
              { title: "OCR Match Successful", sub: "Oct 24, 2023 • 14:21", active: true, done: true },
              { 
                title: redemption.status === "Rejected" ? "Manual Review Rejected" : "Manual Review Approved", 
                sub: "Oct 25, 2023 • 10:15", 
                active: redemption.status !== "Pending", 
                done: redemption.status !== "Pending",
                isCheck: true,
                isReject: redemption.status === "Rejected"
              },
              { 
                title: "Payout Issued", 
                sub: "Oct 25, 2023 • 10:30", 
                active: redemption.status === "Approved", 
                done: redemption.status === "Approved",
                isDollar: true 
              },
            ].map((step, idx, arr) => (
              <div key={idx} className="flex gap-4 items-start relative min-h-[64px]">
                {idx < arr.length - 1 && (
                  <div className={`absolute left-3 top-6 w-[2px] h-[calc(100%-8px)] ${step.done ? "bg-[#001BD2]" : "bg-[#E2E7FF]"}`}></div>
                )}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                  step.isDollar && step.done ? "bg-[#16A34A] text-white" :
                  step.isCheck && step.done ? (step.isReject ? "bg-[#BA1A1A] text-white" : "bg-[#16A34A] text-white") :
                  step.done ? "bg-[#001BD2] text-white" : "bg-[#E2E7FF] text-slate-400"
                }`}>
                  {step.isDollar ? "💵" : step.isCheck ? "✓" : "•"}
                </div>
                <div className="flex flex-col text-left">
                  <span className={`text-sm font-bold ${step.active ? "text-[#131B2E]" : "text-[#454656]/50"}`}>{step.title}</span>
                  <span className="text-xs text-[#454656]/60 mt-0.5">{step.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column: Evidence Section */}
        <div className="bg-white border border-[#C5C5D9]/15 shadow-sm rounded-3xl p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-extrabold text-[#454656]/60 uppercase tracking-widest">
              Evidence Section
            </span>
            <a href="/redemption/EvedenceSectionReceipe.svg" target="_blank" className="text-xs font-bold text-[#001BD2] no-underline hover:underline">
              ↗ VIEW FULL
            </a>
          </div>
          <div className="bg-[#EEF0FF] rounded-2xl p-6 flex items-center justify-center border border-slate-100 min-h-[360px]">
            <img src="/redemption/EvedenceSectionReceipe.svg" alt="Receipt Scan" className="max-w-[220px] shadow-lg rounded object-contain" />
          </div>
        </div>

        {/* Right Column: Profile, Fraud, and Notes */}
        <div className="flex flex-col gap-6">
          {/* Customer Profile */}
          <div className="bg-white border border-[#C5C5D9]/15 shadow-sm rounded-3xl p-6 flex flex-col gap-4">
            <span className="text-[10px] font-extrabold text-[#454656]/60 uppercase tracking-widest">
              Customer Profile
            </span>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#001BD2] text-white font-extrabold text-sm flex items-center justify-center">
                {initials}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-[#131B2E] text-base">{redemption.userName}</span>
                <span className="text-xs text-[#454656]/70 mt-0.5">{redemption.userEmail}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-[#C5C5D9]/10 pt-4 mt-2">
              <div className="flex flex-col items-center">
                <span className="font-jakarta font-extrabold text-lg text-[#131B2E]">{redemption.redemptionsCount}</span>
                <span className="text-[9px] font-extrabold text-[#454656]/50 uppercase tracking-wider mt-1">Redemptions</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-jakarta font-extrabold text-lg text-[#131B2E]">99%</span>
                <span className="text-[9px] font-extrabold text-[#454656]/50 uppercase tracking-wider mt-1">Approval Rate</span>
              </div>
            </div>
          </div>

          {/* Fraud Flags */}
          <div className="bg-white border border-[#C5C5D9]/15 shadow-sm rounded-3xl p-6 flex flex-col gap-3 relative">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-extrabold text-[#454656]/60 uppercase tracking-widest">Fraud Flags</span>
              <img src="/redemption/FraudFlag.svg" alt="Shield" className="w-[18px] h-[18px] object-contain" />
            </div>
            <div className="bg-[#ECFDF5] border border-[#10B981]/10 rounded-2xl p-4 flex flex-col gap-1 text-left mt-2">
              <span className="text-xs font-bold text-[#137333]">0 flags found</span>
              <span className="text-[11px] text-[#137333]/85 font-medium">Clean match - Location and Time within normal bounds.</span>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="bg-white border border-[#C5C5D9]/15 shadow-sm rounded-3xl p-6 flex flex-col gap-3">
            <span className="text-[10px] font-extrabold text-[#454656]/60 uppercase tracking-widest">Internal Notes</span>
            <div className="flex flex-col gap-3 mt-2">
              {notes.map((note, i) => (
                <div key={i} className="bg-[#F2F3FF]/50 border-l-4 border-l-[#2D3FEA] p-4 rounded-r-xl text-left">
                  <p className="text-xs font-semibold text-[#131B2E] italic leading-relaxed">&ldquo;{note}&rdquo;</p>
                  <span className="text-[10px] text-[#454656]/60 font-semibold block mt-2">Annotated by Sarah J. • 10:12 AM</span>
                </div>
              ))}
            </div>
            {showAddNote ? (
              <div className="flex flex-col gap-2 mt-3">
                <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Type note here..." rows={2} className="w-full border border-slate-200 rounded-xl p-2 text-xs font-medium focus:outline-none focus:border-[#001BD2]" />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setShowAddNote(false)} className="px-3 py-1.5 text-[11px] font-bold bg-slate-100 hover:bg-slate-200 rounded-full border-none cursor-pointer text-[#131B2E]">Cancel</button>
                  <button onClick={handleAddNote} className="px-3 py-1.5 text-[11px] font-bold bg-[#001BD2] text-white hover:opacity-90 rounded-full border-none cursor-pointer">Save</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowAddNote(true)} className="w-full py-2 bg-white hover:bg-slate-50 border border-[#001BD2]/20 text-[#001BD2] font-bold text-xs rounded-full flex items-center justify-center gap-1.5 cursor-pointer mt-3">
                + Add Note
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

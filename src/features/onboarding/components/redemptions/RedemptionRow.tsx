/* eslint-disable @next/next/no-img-element */
"use client";

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

interface RedemptionRowProps {
  redemption: RedemptionItem;
  isManualReviewTab: boolean;
  onViewDetails: (item: RedemptionItem) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function RedemptionRow({
  redemption,
  isManualReviewTab,
  onViewDetails,
  onApprove,
  onReject,
}: RedemptionRowProps) {
  if (isManualReviewTab) {
    return (
      <tr className="border-b border-[#C5C5D9]/10 hover:bg-[#F2F3FF]/30 transition-colors text-sm text-[#454656] font-manrope">
        {/* User */}
        <td className="p-5 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-slate-200">
              <img src={redemption.userAvatar || "/redemption/User Avatar.svg"} alt={redemption.userName} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-[#131B2E]">{redemption.userName}</span>
              <span className="text-[11px] text-[#454656]/60 font-semibold mt-0.5">ID: {redemption.userIdCode}</span>
            </div>
          </div>
        </td>

        {/* Campaign */}
        <td className="p-5 text-left">
          <span className="bg-[#001BD2]/5 text-[#001BD2] font-bold text-xs px-3 py-1 rounded-md">
            {redemption.campaignName}
          </span>
        </td>

        {/* Issue */}
        <td className="p-5 text-left">
          <div className="flex flex-col items-start gap-0.5">
            <span className="font-bold text-[#131B2E] text-xs">
              {redemption.issue?.split(":")[0]}
            </span>
            <span className="text-xs text-[#454656] font-medium">
              {redemption.issue?.split(":")[1] || redemption.issue}
            </span>
          </div>
        </td>

        {/* Submitted Date */}
        <td className="p-5 text-left">
          <span className="font-medium text-[#131B2E] text-xs">{redemption.submittedDate}, {redemption.submittedTime}</span>
        </td>

        {/* Priority */}
        <td className="p-5 text-left">
          {redemption.priority === "High" ? (
            <span className="bg-[#BA1A1A]/10 text-[#BA1A1A] font-extrabold text-[11px] px-2.5 py-0.5 rounded-full">
              High
            </span>
          ) : (
            <span className="bg-[#505F76]/10 text-[#505F76] font-extrabold text-[11px] px-2.5 py-0.5 rounded-full">
              Medium
            </span>
          )}
        </td>

        {/* Actions */}
        <td className="p-5 text-right">
          <div className="flex items-center justify-end gap-2">
            <button onClick={() => onViewDetails(redemption)} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center cursor-pointer border-none bg-transparent" title="View Details">
              <img src="/redemption/viewIcon.svg" alt="View" className="w-[18px] h-[18px]" />
            </button>
            <button onClick={() => onApprove(redemption.id)} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center cursor-pointer border-none bg-transparent" title="Instant Approve">
              <img src="/redemption/ActionIcon.svg" alt="Approve" className="w-[18px] h-[12.5px]" />
            </button>
            <button onClick={() => onReject(redemption.id)} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center cursor-pointer border-none bg-transparent" title="Instant Reject">
              <img src="/redemption/BlockIcon.svg" alt="Reject" className="w-[13.3px] h-[16.6px]" />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  // Regular Tab Row (Pending, Approved, etc.)
  return (
    <tr className="border-b border-[#C5C5D9]/10 hover:bg-[#F2F3FF]/30 transition-colors text-sm text-[#454656] font-manrope">
      {/* User */}
      <td className="p-5 text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-slate-200">
            <img src={redemption.userAvatar || "/redemption/User Avatar.svg"} alt={redemption.userName} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-[#131B2E]">{redemption.userName}</span>
            <span className="text-xs text-[#454656]/70 mt-0.5">{redemption.userEmail}</span>
            <span className="text-[10px] font-bold text-[#001BD2]/60 mt-1 uppercase tracking-wider">
              {redemption.redemptionsCount} Redemptions • {redemption.reviewsCount} Reviews
            </span>
          </div>
        </div>
      </td>

      {/* Campaign */}
      <td className="p-5 text-left">
        <div className="flex flex-col text-xs gap-0.5">
          <span className="font-bold text-[#001BD2]">{redemption.campaignName}</span>
          <span className="text-slate-400 font-medium">{redemption.subBrand}</span>
        </div>
      </td>

      {/* Receipt */}
      <td className="p-5 text-center">
        <div 
          onClick={() => onViewDetails(redemption)}
          className="w-11 h-[58px] bg-[#EAEDFF] rounded-lg overflow-hidden flex items-center justify-center border border-slate-100 shadow-sm cursor-pointer hover:scale-105 transition-transform mx-auto"
        >
          <img src="/redemption/receipe.svg" alt="Receipt" className="w-8 h-10 object-contain" />
        </div>
      </td>

      {/* Claimed Tier */}
      <td className="p-5 text-left">
        <div className="flex flex-col gap-0.5 justify-center">
          <div className="flex items-baseline gap-1 font-jakarta text-[#131B2E]">
            <span className="font-bold text-base">{redemption.claimedTierValue}</span>
            <span className="text-xs text-[#454656] font-manrope">{redemption.claimedTierLabel}</span>
          </div>
          <span className="text-[9px] font-bold text-[#004956] uppercase tracking-wider">{redemption.claimedTierLabel.includes("Credits") ? "TIER 5 SOVEREIGN" : "TIER 3 DIAMOND"}</span>
        </div>
      </td>

      {/* Submitted Date */}
      <td className="p-5 text-left">
        <div className="flex flex-col text-xs gap-0.5">
          <span className="font-semibold text-[#131B2E]">{redemption.submittedDate}</span>
          <span className="text-slate-400 font-medium">{redemption.submittedTime}</span>
        </div>
      </td>

      {/* Status */}
      <td className="p-5 text-right">
        <div className="flex justify-end">
          {redemption.status === "Approved" ? (
            <span className="bg-[#F0FDF4] text-[#16A34A] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span> Approved
            </span>
          ) : redemption.status === "Rejected" ? (
            <span className="bg-[#FDF2F2] text-[#BA1A1A] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BA1A1A]"></span> Rejected
            </span>
          ) : redemption.status === "Manual Review" ? (
            <span className="bg-[#FFFBEB] text-[#D97706] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span> Review
            </span>
          ) : (
            <span className="bg-[#E2E7FF] text-[#001BD2] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#001BD2]"></span> Pending
            </span>
          )}
        </div>
      </td>
    </tr>
  );
}

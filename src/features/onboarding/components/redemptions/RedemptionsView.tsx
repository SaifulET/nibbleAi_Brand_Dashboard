"use client";

import { useState } from "react";
import RedemptionsStats from "./RedemptionsStats";
import RedemptionsTable from "./RedemptionsTable";
import RedemptionDetailsView from "./RedemptionDetailsView";
import RedemptionDrawer from "./RedemptionDrawer";
import { ApiRecord } from "@/lib/api/backendApi";
import { useBrandApiStore } from "@/stores/useBrandApiStore";
import { formatDate, formatMoney, formatTime, toNumber } from "../../utils/backendMappers";

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

const mapIssuedRedemption = (item: ApiRecord): RedemptionItem => ({
  id: String(item.id),
  userName: String(item.user_email ?? "Customer"),
  userEmail: String(item.user_email ?? ""),
  userAvatar: "",
  userIdCode: String(item.user ?? item.id).slice(0, 8),
  redemptionsCount: 1,
  reviewsCount: 0,
  campaignName: String(item.campaign_name ?? "Campaign"),
  subBrand: String(item.brand_name ?? ""),
  receiptThumbnailUrl: "/redemption/receipe.svg",
  claimedTierLabel: "Rewards",
  claimedTierValue: formatMoney(item.reward_amount),
  submittedDate: formatDate(item.issued_at ?? item.created_at),
  submittedTime: formatTime(item.issued_at ?? item.created_at),
  status: "Approved",
});

const mapManualReview = (item: ApiRecord): RedemptionItem => {
  const receipt = (item.receipt || {}) as ApiRecord;
  return {
    id: String(item.id),
    userName: "Customer",
    userEmail: "",
    userAvatar: "",
    userIdCode: String(receipt.id ?? item.id).slice(0, 8),
    redemptionsCount: 0,
    reviewsCount: 0,
    campaignName: String(receipt.campaign_name ?? "Campaign"),
    subBrand: String(receipt.brand_name ?? ""),
    receiptThumbnailUrl: "/redemption/receipe.svg",
    claimedTierLabel: "Rewards",
    claimedTierValue: formatMoney(receipt.reward_amount),
    submittedDate: formatDate(item.created_at),
    submittedTime: formatTime(item.created_at),
    status: "Manual Review",
    issue: String(receipt.decision_reason ?? "Receipt requires manual review"),
    priority: toNumber(receipt.total) >= 50 ? "High" : "Medium",
  };
};

export default function RedemptionsView() {
  const [selectedItem, setSelectedItem] = useState<RedemptionItem | null>(null);
  const [actionError, setActionError] = useState("");
  const issuedRedemptions = useBrandApiStore((state) => state.redemptions);
  const reviewQueue = useBrandApiStore((state) => state.reviewQueue);
  const approveReviewQueueItem = useBrandApiStore((state) => state.approveReviewQueueItem);
  const declineReviewQueueItem = useBrandApiStore((state) => state.declineReviewQueueItem);
  const redemptions = [
    ...reviewQueue.map(mapManualReview),
    ...issuedRedemptions.map(mapIssuedRedemption),
  ];

  const handleApprove = async (id: string) => {
    try {
      setActionError("");
      await approveReviewQueueItem(id);
      setSelectedItem(null);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Could not approve review item.");
    }
  };

  const handleReject = async (id: string) => {
    try {
      setActionError("");
      await declineReviewQueueItem(id, "Declined from brand dashboard.");
      setSelectedItem(null);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Could not reject review item.");
    }
  };

  const isDetailsPage = selectedItem && (
    selectedItem.status === "Approved" ||
    selectedItem.status === "Rejected" ||
    selectedItem.status === "Expired"
  );

  if (isDetailsPage && selectedItem) {
    return (
      <RedemptionDetailsView
        redemption={selectedItem}
        onBack={() => setSelectedItem(null)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full animate-slide-up text-left font-manrope">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4">
        <div className="flex flex-col gap-1.5 text-left">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-extrabold font-jakarta text-[#131B2E] tracking-tight leading-none">
              Redemptions
            </h2>
            <span className="bg-[#001BD2]/10 text-[#001BD2] font-bold text-xs px-3 py-1 rounded-full flex items-center leading-none mt-0.5">
              {redemptions.length}
            </span>
          </div>
          <p className="text-[#454656] text-sm md:text-base font-medium mt-1">
            Manage and verify cashback claims across all active campaigns.
          </p>
        </div>

        {/* Stats stack next to header */}
        <RedemptionsStats />
      </div>

      {actionError && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm font-semibold rounded-xl px-4 py-3">
          {actionError}
        </div>
      )}

      {/* Main Redemptions List Table */}
      <RedemptionsTable
        redemptions={redemptions}
        onViewDetails={setSelectedItem}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {/* Side Audit Drawer Modal for Pending / Manual Review */}
      {selectedItem && !isDetailsPage && (
        <RedemptionDrawer
          redemption={selectedItem}
          onClose={() => setSelectedItem(null)}
          onApprove={handleApprove}
        />
      )}

    </div>
  );
}

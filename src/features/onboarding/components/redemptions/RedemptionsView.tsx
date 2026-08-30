"use client";

import { useState } from "react";
import RedemptionsStats from "./RedemptionsStats";
import RedemptionsTable from "./RedemptionsTable";
import RedemptionDetailsView from "./RedemptionDetailsView";
import RedemptionDrawer from "./RedemptionDrawer";

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

const mockRedemptions: RedemptionItem[] = [
  {
    id: "rem1",
    userName: "Alex Sterling",
    userEmail: "alex.s@gmail.com",
    userAvatar: "/Notification/profile1.svg",
    userIdCode: "88231-A",
    redemptionsCount: 14,
    reviewsCount: 2,
    campaignName: "Summer Fuel 2024",
    subBrand: "National Petroleum",
    receiptThumbnailUrl: "/redemption/receipe.svg",
    claimedTierLabel: "Rewards",
    claimedTierValue: "$15.00",
    submittedDate: "May 12, 2024",
    submittedTime: "14:23 GMT",
    status: "Pending",
  },
  {
    id: "rem2",
    userName: "Maya Vance",
    userEmail: "maya.v@outlook.com",
    userAvatar: "",
    userIdCode: "99120-C",
    redemptionsCount: 8,
    reviewsCount: 1,
    campaignName: "Gourmet Rewards",
    subBrand: "Whole Foods Market",
    receiptThumbnailUrl: "/redemption/receipe.svg",
    claimedTierLabel: "Cashback",
    claimedTierValue: "$4.50",
    submittedDate: "May 11, 2024",
    submittedTime: "09:12 GMT",
    status: "Pending",
  },
  {
    id: "rem3",
    userName: "Julian Drake",
    userEmail: "j.drake@nibbl.io",
    userAvatar: "",
    userIdCode: "44521-X",
    redemptionsCount: 22,
    reviewsCount: 6,
    campaignName: "Spring Clean Eco",
    subBrand: "Patagonia Shop",
    receiptThumbnailUrl: "/redemption/receipe.svg",
    claimedTierLabel: "Credits",
    claimedTierValue: "$28.40",
    submittedDate: "May 11, 2024",
    submittedTime: "08:45 GMT",
    status: "Pending",
  },
  {
    id: "rem4",
    userName: "Elena Rodriguez",
    userEmail: "elena.r@gmail.com",
    userAvatar: "",
    userIdCode: "88231-A",
    redemptionsCount: 12,
    reviewsCount: 3,
    campaignName: "Winter Bloom 2024",
    subBrand: "National Petroleum",
    receiptThumbnailUrl: "/redemption/receipe.svg",
    claimedTierLabel: "Rewards",
    claimedTierValue: "$12.00",
    submittedDate: "Oct 24, 2023",
    submittedTime: "09:12 AM",
    status: "Manual Review",
    issue: "OCR Mismatch: Total $45.20 mismatch",
    priority: "High",
  },
  {
    id: "rem5",
    userName: "Marcus Thorne",
    userEmail: "marcus.t@nibbl.io",
    userAvatar: "",
    userIdCode: "99120-C",
    redemptionsCount: 5,
    reviewsCount: 1,
    campaignName: "Fresh Start Refresh",
    subBrand: "Whole Foods Market",
    receiptThumbnailUrl: "/redemption/receipe.svg",
    claimedTierLabel: "Cashback",
    claimedTierValue: "$6.50",
    submittedDate: "Oct 24, 2023",
    submittedTime: "10:45 AM",
    status: "Manual Review",
    issue: "Unclear Receipt: Blurry merchant logo",
    priority: "Medium",
  },
];

export default function RedemptionsView() {
  const [redemptions, setRedemptions] = useState<RedemptionItem[]>(mockRedemptions);
  const [selectedItem, setSelectedItem] = useState<RedemptionItem | null>(null);

  const handleApprove = (id: string) => {
    setRedemptions(prev => prev.map(r => r.id === id ? { ...r, status: "Approved" } : r));
    setSelectedItem(null);
  };

  const handleReject = (id: string) => {
    setRedemptions(prev => prev.map(r => r.id === id ? { ...r, status: "Rejected" } : r));
    setSelectedItem(null);
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
              1,240
            </span>
          </div>
          <p className="text-[#454656] text-sm md:text-base font-medium mt-1">
            Manage and verify cashback claims across all active campaigns.
          </p>
        </div>

        {/* Stats stack next to header */}
        <RedemptionsStats />
      </div>

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

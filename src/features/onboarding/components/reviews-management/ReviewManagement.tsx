"use client";

import { useState } from "react";
import ReviewKpiCard from "./ReviewKpiCard";
import ReviewRow from "./ReviewRow";
import { ApiRecord } from "@/lib/api/backendApi";
import { useBrandApiStore } from "@/stores/useBrandApiStore";
import { formatMoney, toNumber } from "../../utils/backendMappers";

interface ReviewItem {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAvatar?: string;
  productName: string;
  date: string;
  rating: number;
  reward: string;
  status: "Approved" | "Pending Approval";
  reviewText: string;
}

interface ReviewManagementProps {
  onBack: () => void;
}

const mapReview = (review: ApiRecord): ReviewItem => ({
  id: String(review.id),
  customerName: String(review.user_email ?? "Customer"),
  customerEmail: String(review.user_email ?? ""),
  customerAvatar: "",
  productName: String(review.product_name ?? "Product"),
  date:
    typeof review.created_at === "string"
      ? new Date(review.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "",
  rating: toNumber(review.rating),
  reward: "$0.00",
  status: String(review.status).toLowerCase() === "held" ? "Pending Approval" : "Approved",
  reviewText: String(review.content ?? ""),
});

export default function ReviewManagement({ onBack }: ReviewManagementProps) {
  const [activeTab, setActiveTab] = useState<"All" | "Pending">("All");
  const apiReviews = useBrandApiStore((state) => state.reviews);
  const analyticsOverview = useBrandApiStore((state) => state.analyticsOverview);
  const spend = (analyticsOverview?.spend || {}) as Record<string, unknown>;
  const totalReviews = toNumber(analyticsOverview?.reviews);
  const reviewSpend = toNumber(spend.review_reward) + toNumber(spend.review_fee);
  const [localStatuses, setLocalStatuses] = useState<Record<string, ReviewItem["status"]>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const reviews = apiReviews.map((review) => {
    const mapped = mapReview(review);
    return { ...mapped, status: localStatuses[mapped.id] || mapped.status };
  });

  const handleApprove = (id: string) => {
    setLocalStatuses((prev) => ({ ...prev, [id]: "Approved" }));
    setExpandedId(null);
  };

  const filtered = reviews.filter(r => activeTab === "All" || r.status === "Pending Approval");

  return (
    <div className="flex flex-col gap-8 w-full animate-slide-up text-left font-manrope bg-[#FAF8FF]">
      
      {/* Back breadcrumb arrow */}
      <button onClick={onBack} className="text-[#001BD2] font-bold text-2xl hover:opacity-80 transition-all self-start cursor-pointer border-none bg-transparent">
        ←
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-3xl font-extrabold font-jakarta text-[#131B2E] tracking-tight">Reviews Management</h2>
          <p className="text-[#454656] text-sm md:text-base font-medium">Monitor, moderate, and analyze cross-platform customer feedback.</p>
        </div>

        {/* Tab switchers */}
        <div className="bg-[#F2F3FF] p-1 rounded-full flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => setActiveTab("All")}
            className={`px-5 py-2 text-xs font-bold rounded-full transition-all border-none cursor-pointer ${
              activeTab === "All" ? "bg-white text-[#001BD2] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]" : "text-[#454656] hover:text-slate-700"
            }`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setActiveTab("Pending")}
            className={`px-5 py-2 text-xs font-bold rounded-full transition-all border-none cursor-pointer ${
              activeTab === "Pending" ? "bg-white text-[#001BD2] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]" : "text-[#454656] hover:text-slate-700"
            }`}
          >
            Pending Approval
          </button>
        </div>
      </div>

      {/* KPI Cards Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-2">
        <ReviewKpiCard title="Total Reviews" value={String(totalReviews)} badgeText="Backend" badgeType="green" iconPath="/reviews/TotalReviews.svg" iconBgColor="bg-[#001BD2]/5 text-[#001BD2]" />
        <ReviewKpiCard title="Review Spend" value={formatMoney(reviewSpend)} badgeText="Lifetime" badgeType="gray" iconPath="/reviews/ReviewSpend.svg" iconBgColor="bg-[#004956]/5 text-[#004956]" />
        <ReviewKpiCard title="Cost per Review" value={formatMoney(totalReviews ? reviewSpend / totalReviews : 0)} badgeText="Average" badgeType="gray" iconPath="/reviews/CostperReview.svg" iconBgColor="bg-[#505F76]/5 text-[#505F76]" />
        <ReviewKpiCard title="Reviews per Product" value={String(reviews.length)} badgeText="Visible" badgeType="gray" iconPath="/reviews/TotalReviews.svg" iconBgColor="bg-[#001BD2]/5 text-[#001BD2]" />
      </div>

      {/* Table Section */}
      <div className="w-full bg-white border border-[#C5C5D9]/10 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[32px] overflow-hidden flex flex-col mt-4">
        {/* Table Filters */}
        <div className="bg-[#F2F3FF] px-8 py-5 flex flex-col md:flex-row justify-between items-center w-full gap-4 border-b border-[#C5C5D9]/5">
          <h3 className="font-jakarta font-bold text-lg text-[#131B2E]">Completed Reviews</h3>
          
          <div className="flex items-center gap-4 flex-wrap justify-end">
            {/* Filter by Product */}
            <select className="bg-white border border-[#C5C5D9]/20 rounded-xl px-4 py-2.5 text-xs font-semibold text-[#131B2E] outline-none">
              <option>Filter by Product</option>
            </select>

            {/* Date filter dropdown */}
            <button className="bg-white border border-[#C5C5D9]/20 rounded-xl px-4 py-2.5 text-xs font-semibold text-[#131B2E] flex items-center gap-2 cursor-pointer">
              <span>📅</span> Oct 1 - Oct 31, 2023
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#C5C5D9]/10 bg-[#FAF8FF]">
                <th className="p-6 text-left text-[10px] font-bold tracking-wider text-[#454656]/60 uppercase">CUSTOMER</th>
                <th className="p-6 text-left text-[10px] font-bold tracking-wider text-[#454656]/60 uppercase">PRODUCT NAME</th>
                <th className="p-6 text-left text-[10px] font-bold tracking-wider text-[#454656]/60 uppercase">DATE</th>
                <th className="p-6 text-left text-[10px] font-bold tracking-wider text-[#454656]/60 uppercase">STAR RATING</th>
                <th className="p-6 text-left text-[10px] font-bold tracking-wider text-[#454656]/60 uppercase">REWARD</th>
                <th className="p-6 text-right text-[10px] font-bold tracking-wider text-[#454656]/60 uppercase">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <ReviewRow
                  key={r.id}
                  review={r}
                  isExpanded={expandedId === r.id}
                  onToggleExpand={() => setExpandedId(expandedId === r.id ? null : r.id)}
                  onApprove={() => handleApprove(r.id)}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-8 py-5 border-t border-[#C5C5D9]/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-[#454656]">
          <span>Showing 1 to {filtered.length} of {reviews.length} reviews</span>
          
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg border border-[#C5C5D9]/20 flex items-center justify-center hover:bg-slate-50 cursor-pointer bg-white text-[#131B2E]">◀</button>
            <button className="w-8 h-8 rounded-lg bg-[#001BD2] text-white flex items-center justify-center font-bold">1</button>
            <button className="w-8 h-8 rounded-lg border border-[#C5C5D9]/20 flex items-center justify-center hover:bg-slate-50 cursor-pointer bg-white text-[#131B2E]">2</button>
            <button className="w-8 h-8 rounded-lg border border-[#C5C5D9]/20 flex items-center justify-center hover:bg-slate-50 cursor-pointer bg-white text-[#131B2E]">3</button>
            <button className="w-8 h-8 rounded-lg border border-[#C5C5D9]/20 flex items-center justify-center hover:bg-slate-50 cursor-pointer bg-white text-[#131B2E]">▶</button>
          </div>
        </div>
      </div>

    </div>
  );
}

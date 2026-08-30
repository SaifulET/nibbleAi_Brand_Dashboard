"use client";

import { useState } from "react";
import ReviewKpiCard from "./ReviewKpiCard";
import ReviewRow from "./ReviewRow";

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

const initialReviews: ReviewItem[] = [
  {
    id: "r1",
    customerName: "Elena Rodriguez",
    customerEmail: "elena.r@example.com",
    customerAvatar: "/Notification/profile1.svg",
    productName: "Hydro-Glow Serum",
    date: "Oct 24, 2023",
    rating: 5,
    reward: "$2.50",
    status: "Approved",
    reviewText: "Nibbl's Hydro-Glow Serum really delivered. Rich and hydrating, it completely rejuvenated my skin texture.",
  },
  {
    id: "r2",
    customerName: "Marcus Chen",
    customerEmail: "marcus.c@nibbl.io",
    customerAvatar: "/Notification/profile1.svg",
    productName: "Zen Mode No-Caf",
    date: "Oct 22, 2023",
    rating: 4,
    reward: "$2.50",
    status: "Pending Approval",
    reviewText: "I'm usually skeptical of decaf options, but Nibbl's Zen Mode No-Caf really delivered. It has a rich, bold flavor profile that mirrors high-quality arabica beans without any of the jitteriness.",
  },
  {
    id: "r3",
    customerName: "Jordan Banks",
    customerEmail: "jordan.b@web.com",
    customerAvatar: "",
    productName: "Smart Scale V2",
    date: "Oct 20, 2023",
    rating: 5,
    reward: "$2.50",
    status: "Approved",
    reviewText: "The smart scale connects instantly to my phone. Clean build quality, accurate tracking, and a very premium aesthetic.",
  },
];

export default function ReviewManagement({ onBack }: ReviewManagementProps) {
  const [activeTab, setActiveTab] = useState<"All" | "Pending">("All");
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [expandedId, setExpandedId] = useState<string | null>("r2"); // default expanded marcus

  const handleApprove = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: "Approved" } : r));
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
        <ReviewKpiCard title="Total Reviews" value="24,892" badgeText="+12.5%" badgeType="green" iconPath="/reviews/TotalReviews.svg" iconBgColor="bg-[#001BD2]/5 text-[#001BD2]" />
        <ReviewKpiCard title="Review Spend" value="$62,230" badgeText="Lifetime" badgeType="gray" iconPath="/reviews/ReviewSpend.svg" iconBgColor="bg-[#004956]/5 text-[#004956]" />
        <ReviewKpiCard title="Cost per Review" value="$2.50" badgeText="Average" badgeType="gray" iconPath="/reviews/CostperReview.svg" iconBgColor="bg-[#505F76]/5 text-[#505F76]" />
        <ReviewKpiCard title="Reviews per Product" value="42.5" badgeText="Average per SKU" badgeType="gray" iconPath="/reviews/TotalReviews.svg" iconBgColor="bg-[#001BD2]/5 text-[#001BD2]" />
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
          <span>Showing 1 to {filtered.length} of 2,482 reviews</span>
          
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

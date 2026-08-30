/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

interface CampaignItem {
  id: string;
  name: string;
  createdDate: string;
  status: "Active" | "Paused";
  reviews: number;
  todayReviews: number;
  spend: number;
}

interface ReviewsLandingProps {
  campaigns: CampaignItem[];
  onCreateNew: () => void;
  onViewDetail: (camp: CampaignItem) => void;
  onReviewManagement: () => void;
}

export default function ReviewsLanding({ campaigns, onCreateNew, onViewDetail, onReviewManagement }: ReviewsLandingProps) {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="flex flex-col gap-8 w-full animate-slide-up text-left font-manrope">
      
      {/* Hero Header Section */}
      <div className="flex justify-between items-end w-full border-b border-slate-100 pb-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span>Reviews</span>
            <span>➔</span>
            <span className="text-[#001BD2]">Review Performance</span>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-extrabold font-jakarta text-[#131B2E] tracking-tight">Review Performance</h2>
            <span className="bg-emerald-100 text-[#15803D] text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
              ACTIVE
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium max-w-[600px] mt-1 leading-relaxed">
            Optimize and monitor your review acquisition workflows, track daily budgets, and oversee verified user feedback.
          </p>
        </div>

        {/* Header CTA Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReviewManagement}
            className="px-6 h-[46px] bg-[#E2E7FF] hover:bg-blue-100 text-[#001BD2] font-bold text-sm rounded-full transition-all cursor-pointer flex items-center gap-2 border-none"
          >
            <img src="/reviews/reviewManagementIcon.svg" alt="Management" className="w-[18px] h-[18px] object-contain" /> Review Management
          </button>
          <button
            onClick={onCreateNew}
            className="px-6 h-[46px] bg-[#001BD2] hover:bg-blue-700 text-white font-bold text-sm rounded-full transition-all shadow-md shadow-blue-500/10 cursor-pointer flex items-center gap-2 border-none"
          >
            <span>➕</span> Create Review Campaign
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 w-full">
        {/* Card 1 */}
        <div className="bg-white border border-[#C5C5D9]/10 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[120px] relative">
          <div className="flex justify-between items-center w-full">
            <span className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
              <img src="/reviews/reviewCampains.svg" alt="Campaigns" className="w-5 h-5 object-contain" />
            </span>
            <span className="bg-[#E2E7FF] text-[#001BD2] text-[9px] font-bold px-2 py-0.5 rounded-full">ACTIVE</span>
          </div>
          <div className="flex flex-col gap-0.5 mt-2">
            <span className="text-[22px] font-extrabold text-[#131B2E]">12</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">REVIEW CAMPAIGNS</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-[#C5C5D9]/10 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[120px]">
          <span className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center">
            <img src="/reviews/dailyBudget.svg" alt="Budget" className="w-5 h-5 object-contain" />
          </span>
          <div className="flex flex-col gap-0.5 mt-2">
            <span className="text-[22px] font-extrabold text-[#131B2E]">$450.00</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DAILY BUDGET</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-[#C5C5D9]/10 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[120px]">
          <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
            <img src="/reviews/TotalReviews.svg" alt="Total reviews" className="w-5 h-5 object-contain" />
          </span>
          <div className="flex flex-col gap-0.5 mt-2">
            <span className="text-[22px] font-extrabold text-[#131B2E]">1,240</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL REVIEWS (30D)</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-[#C5C5D9]/10 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[120px]">
          <span className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
            <img src="/reviews/ReviewSpend.svg" alt="Spend" className="w-5 h-5 object-contain" />
          </span>
          <div className="flex flex-col gap-0.5 mt-2">
            <span className="text-[22px] font-extrabold text-[#131B2E]">$2,850.00</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">REVIEW SPEND</span>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white border border-[#C5C5D9]/10 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[120px]">
          <span className="w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center">
            <img src="/reviews/CostperReview.svg" alt="Cost" className="w-5 h-5 object-contain" />
          </span>
          <div className="flex flex-col gap-0.5 mt-2">
            <span className="text-[22px] font-extrabold text-[#131B2E]">$2.30</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">COST PER REVIEW</span>
          </div>
        </div>
      </div>

      {/* Description text */}
      <span className="text-[10px] text-slate-400 font-bold tracking-wide -mt-2">
        ℹ️ All activity is based on verified purchases from submitted receipts.
      </span>

      {/* Secondary Tab Navigation */}
      <div className="flex gap-8 items-center border-b border-slate-100 w-full mt-2 font-jakarta">
        {["Overview", "QR Assets"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === tab ? "border-[#001BD2] text-[#001BD2]" : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table grid */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-[#131B2E] flex items-center gap-2">
            <img src="/reviews/ActiveCampains.svg" alt="Active Campaigns" className="w-5 h-5 object-contain" /> Active Campaigns
          </span>
        </div>

        <div className="w-full overflow-hidden border border-slate-100 rounded-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 h-12 text-slate-500 font-bold border-b border-slate-100">
                <th className="px-6 uppercase tracking-wider">CAMPAIGN NAME</th>
                <th className="px-6 uppercase tracking-wider">STATUS</th>
                <th className="px-6 uppercase tracking-wider">TOTAL REVIEWS</th>
                <th className="px-6 uppercase tracking-wider">SPEND</th>
                <th className="px-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((camp) => (
                <tr
                  key={camp.id}
                  onClick={() => onViewDetail(camp)}
                  className="h-16 border-b border-slate-50 hover:bg-slate-50/50 transition-colors font-semibold text-[#131B2E] cursor-pointer"
                >
                  <td className="px-6">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-[#131B2E]">{camp.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium">Created {camp.createdDate}</span>
                    </div>
                  </td>
                  <td className="px-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 w-fit ${
                      camp.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-500"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${camp.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`}></span>
                      {camp.status}
                    </span>
                  </td>
                  <td className="px-6">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold">{camp.reviews}</span>
                      {camp.todayReviews > 0 && (
                        <span className="text-[9px] text-emerald-600 font-bold">+{camp.todayReviews} today</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 text-sm font-bold">${camp.spend.toFixed(2)}</td>
                  <td className="px-6 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
                      <img src="/reviews/editIcon.svg" alt="Edit" className="w-[18px] h-[18px] object-contain inline" />
                    </button>
                    <button className="text-slate-400 hover:text-slate-600 p-1 ml-2 cursor-pointer">•••</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campaign Distribution Card */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-6 w-full">
        <div>
          <h3 className="text-base font-bold text-[#131B2E]">Campaign Distribution</h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Review volume spread across active geographic zones and user segments.</p>
        </div>

        <div className="flex gap-8 items-center mt-2 border-b border-slate-50 pb-4">
          <div className="flex flex-col text-left">
            <span className="text-2xl font-extrabold text-[#001BD2]">64%</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">North America</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-2xl font-extrabold text-[#004956]">22%</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Europe</span>
          </div>
        </div>

        {/* Stylized Bar Charts representing geographic trends */}
        <div className="bg-[#F2F3FF] p-6 rounded-2xl flex items-end justify-between h-[120px] w-full max-w-[600px] gap-2">
          {[38.39, 57.59, 43.19, 76.8, 67.19, 91.19, 81.59].map((height, idx) => (
            <div
              key={idx}
              className="bg-[#001BD2] rounded-t-lg transition-all duration-300 w-full"
              style={{
                height: `${height}%`,
                opacity: 0.2 + idx * 0.1,
              }}
            ></div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

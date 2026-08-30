import { useState } from "react";
import RebatesLandingCard from "./RebatesLandingCard";

interface Campaign {
  id: string;
  name: string;
  category: string;
  scope: string;
  dailyBudget: number;
  purchases: number;
  spendToday: number;
  status: "ACTIVE" | "PAUSED" | "COMPLETED";
}

interface RebatesLandingProps {
  campaigns: Campaign[];
  onCreateNew: () => void;
  onEditCampaign: (camp: Campaign) => void;
}

export default function RebatesLanding({ campaigns, onCreateNew, onEditCampaign }: RebatesLandingProps) {
  const [filter, setFilter] = useState<"ACTIVE" | "PAUSED" | "COMPLETED">("ACTIVE");

  const filteredCampaigns = campaigns.filter((camp) => camp.status === filter);

  const stats = [
    { label: "TOTAL CASHBACK", val: "$12,450", trend: "+12.5%", isPositive: true },
    { label: "REDEMPTION RATE", val: "68.2%", trend: "+4.1%", isPositive: true },
    { label: "AVG. CLAIM TIME", val: "14m", trend: "-2.0%", isPositive: false },
    { label: "ACTIVE USERS", val: "4.2k", trend: "+18.9%", isPositive: true },
  ];

  return (
    <div className="flex flex-col gap-10 w-full animate-slide-up">
      {/* Breadcrumbs & Header bar */}
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-1 text-left">
          <span className="text-xs font-manrope font-semibold text-slate-400">Overview &gt; <span className="text-[#001BD2]">Rebates</span></span>
          <h1 className="text-3xl font-extrabold font-jakarta text-[#131B2E] tracking-tight">Rebates</h1>
        </div>

        {/* Action Button */}
        <button
          onClick={onCreateNew}
          className="px-6 h-[46px] bg-[#001BD2] hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
        >
          <span>+</span> Create Rebate Campaign
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-[#FAF8FF] font-manrope self-start">
        {[
          { name: "Running", status: "ACTIVE" as const },
          { name: "Paused", status: "PAUSED" as const },
          { name: "Completed", status: "COMPLETED" as const },
        ].map((tab) => (
          <button
            key={tab.status}
            onClick={() => setFilter(tab.status)}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
              filter === tab.status
                ? "bg-[#001BD2] border-[#001BD2] text-white shadow-sm"
                : "bg-white border-slate-200 text-[#454656] hover:bg-slate-50"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Grid of campaigns */}
      {filteredCampaigns.length === 0 ? (
        <div className="bg-white border border-[#C5C5D9]/10 rounded-[20px] p-12 text-center text-sm font-medium text-slate-400 w-full">
          No rebate campaigns in this state
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
          {filteredCampaigns.map((camp) => (
            <RebatesLandingCard key={camp.id} campaign={camp} onEdit={onEditCampaign} />
          ))}
        </div>
      )}

      {/* Campaign Performance Section */}
      <section className="bg-white border border-slate-100 rounded-[20px] p-8 shadow-sm flex flex-col gap-6 w-full text-left">
        <div>
          <h2 className="text-xl font-bold text-[#131B2E]">Rebate Campaign Performance:</h2>
          <p className="text-xs text-[#64748B] font-medium leading-normal mt-2.5 max-w-xl">
            See how your campaigns are performing based on spend, offers, and verified purchases. Adjust rewards and daily budgets anytime to improve results.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-between border-t border-slate-100 pt-6 font-manrope">
          <p className="text-xs text-[#454656] leading-[1.7] font-medium max-w-sm">
            Your rebate campaigns are performing <span className="font-extrabold text-[#059669]">24% better</span> than last month. Automated budget reallocation has saved you <span className="font-bold text-[#131B2E]">$1,240</span> in potential overspend.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-1.5 min-w-[110px]">
                <span className="text-[10px] font-bold text-[#454656]/60 uppercase tracking-wider">{stat.label}</span>
                <span className="text-2xl font-extrabold text-[#131B2E]">{stat.val}</span>
                <span className={`text-[10px] font-bold ${stat.isPositive ? "text-[#059669]" : "text-[#BA1A1A]"}`}>
                  {stat.trend}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { Shield, ShoppingCart, MessageSquare, Calendar, Globe, MapPin } from "lucide-react";

export default function AnalyticsRebates() {
  return (
    <div className="flex flex-col gap-8 w-full text-left font-manrope animate-slide-up">
      
      {/* Filters Row */}
      <div className="flex flex-row flex-wrap items-center gap-3 w-full">
        <div className="bg-white border border-[#C5C5D9]/15 rounded-full px-4 py-2.5 flex items-center gap-2 shadow-sm text-xs font-bold text-[#454656] cursor-pointer">
          <Calendar className="w-3.5 h-3.5 text-[#001BD2]" />
          <span>Last 30 Days</span>
        </div>
        <div className="bg-white border border-[#C5C5D9]/15 rounded-full px-4 py-2.5 flex items-center gap-2 shadow-sm text-xs font-bold text-[#454656] cursor-pointer">
          <Globe className="w-3.5 h-3.5 text-[#001BD2]" />
          <span>Campaign Segment</span>
        </div>
        <div className="bg-white border border-[#C5C5D9]/15 rounded-full px-4 py-2.5 flex items-center gap-2 shadow-sm text-xs font-bold text-[#454656] cursor-pointer">
          <MapPin className="w-3.5 h-3.5 text-[#001BD2]" />
          <span>Location</span>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
        {[
          { title: "Claim Rate", val: "8.2%", icon: <Shield className="w-5 h-5 text-[#454656]" /> },
          { title: "Cost Per Purchase", val: "$12.40", icon: <ShoppingCart className="w-5 h-5 text-[#454656]" /> },
          { title: "Cost Per Review", val: "$2.15", icon: <MessageSquare className="w-5 h-5 text-[#454656]" /> }
        ].map((kpi, i) => (
          <div key={i} className="bg-white border border-[#C5C5D9]/15 shadow-sm rounded-3xl p-6 flex flex-col justify-between text-left min-h-[154px]">
            <div className="flex justify-between items-start gap-4">
              <div className="w-10 h-10 bg-[#E2E7FF] rounded-2xl flex items-center justify-center flex-shrink-0">{kpi.icon}</div>
              <span className="text-[10px] font-bold text-[#454656] tracking-[1.2px] uppercase mt-2">{kpi.title}</span>
            </div>
            <h3 className="font-jakarta font-extrabold text-3xl text-[#131B2E] mt-4 tracking-tight">{kpi.val}</h3>
          </div>
        ))}
      </div>

      {/* Detailed Campaign Performance Table */}
      <div className="w-full bg-white border border-slate-100 shadow-sm rounded-3xl overflow-hidden flex flex-col">
        <div className="px-8 py-5 border-b border-[#C5C5D9]/10 bg-white">
          <h3 className="font-jakarta font-bold text-lg text-[#131B2E]">Detailed Campaign Performance</h3>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#C5C5D9]/10 bg-[#F2F3FF]">
                <th className="p-5 text-left text-[10px] font-bold tracking-wider text-[#454656] uppercase">Campaign Name</th>
                <th className="p-5 text-left text-[10px] font-bold tracking-wider text-[#454656] uppercase">Status</th>
                <th className="p-5 text-right text-[10px] font-bold tracking-wider text-[#454656] uppercase">Redemptions</th>
                <th className="p-5 text-right text-[10px] font-bold tracking-wider text-[#454656] uppercase">Revenue (Est)</th>
                <th className="p-5 text-right text-[10px] font-bold tracking-wider text-[#454656] uppercase">ROI</th>
                <th className="p-5 text-left text-[10px] font-bold tracking-wider text-[#454656] uppercase">Growth</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Summer Kickoff BOGO", status: "Active", statCol: "bg-teal-100 text-teal-700", red: "2,450", rev: "$84,200", roi: "580%", barW: "80%", avatar: "/Rebate/budgetAndTier.svg" },
                { name: "Influencer Flash Sale", status: "Active", statCol: "bg-teal-100 text-teal-700", red: "1,820", rev: "$42,900", roi: "420%", barW: "65%", avatar: "/Rebate/budgetAndTier.svg" },
                { name: "New Arrival Rebate", status: "Paused", statCol: "bg-amber-100 text-amber-700", red: "640", rev: "$12,100", roi: "310%", barW: "40%", avatar: "/Rebate/budgetAndTier.svg" }
              ].map((row, i) => (
                <tr key={i} className="border-b border-[#C5C5D9]/5 hover:bg-[#F2F3FF]/30 transition-colors text-sm text-[#454656] font-manrope">
                  <td className="p-5 text-left flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E2E7FF] flex items-center justify-center text-[#001BD2] text-xs font-bold font-mono">📦</div>
                    <span className="font-bold text-[#131B2E]">{row.name}</span>
                  </td>
                  <td className="p-5 text-left">
                    <span className={`font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider ${row.statCol}`}>{row.status}</span>
                  </td>
                  <td className="p-5 text-right font-bold text-[#131B2E]">{row.red}</td>
                  <td className="p-5 text-right font-bold text-[#131B2E]">{row.rev}</td>
                  <td className="p-5 text-right font-bold text-[#001BD2]">{row.roi}</td>
                  <td className="p-5 text-left">
                    <div className="w-24 h-1.5 bg-[#E2E7FF] rounded-full overflow-hidden relative mt-1.5">
                      <div className="absolute top-0 bottom-0 left-0 bg-[#004956] rounded-full" style={{ width: row.barW }}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

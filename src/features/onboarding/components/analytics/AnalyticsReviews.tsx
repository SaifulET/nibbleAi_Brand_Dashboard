"use client";

import { Star } from "lucide-react";

export default function AnalyticsReviews() {
  return (
    <div className="flex flex-col gap-8 w-full text-left font-manrope animate-slide-up">
      
      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-stretch">
        {[
          { title: "Total Reviews", val: "1,284" },
          { title: "Review Spend", val: "$14.2k" },
          { title: "Avg. Rating", val: "4.8", stars: true },
          { title: "Cost Per Review", val: "$2.15" }
        ].map((kpi, i) => (
          <div key={i} className="bg-white border border-[#C5C5D9]/15 shadow-sm rounded-[20px] p-6 flex flex-col justify-between text-left min-h-[154px]">
            <span className="text-[10px] font-bold text-[#454656] tracking-[0.3px] uppercase">{kpi.title}</span>
            <div className="flex flex-col gap-2 mt-4">
              <h3 className="font-jakarta font-extrabold text-3xl text-[#131B2E] tracking-tight">{kpi.val}</h3>
              {kpi.stars && (
                <div className="flex gap-1 items-center mt-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24]" />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Top Reviewed Products Table */}
      <div className="w-full bg-white border border-slate-100 shadow-sm rounded-3xl overflow-hidden flex flex-col">
        <div className="bg-[#F2F3FF] px-8 py-5 border-b border-[#C5C5D9]/10">
          <h3 className="font-jakarta font-bold text-lg text-[#131B2E]">Top Reviewed Products</h3>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#C5C5D9]/10 bg-[#FAF8FF]">
                <th className="p-4 text-left text-[10px] font-bold tracking-wider text-[#454656] uppercase">Product Name</th>
                <th className="p-4 text-left text-[10px] font-bold tracking-wider text-[#454656] uppercase">SKU</th>
                <th className="p-4 text-right text-[10px] font-bold tracking-wider text-[#454656] uppercase">Total Reviews</th>
                <th className="p-4 text-right text-[10px] font-bold tracking-wider text-[#454656] uppercase">Avg Rating</th>
                <th className="p-4 text-right text-[10px] font-bold tracking-wider text-[#454656] uppercase">Review Spend</th>
                <th className="p-4 text-left text-[10px] font-bold tracking-wider text-[#454656] uppercase">Rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Nova Smartwatch G2", sku: "NOV-SMG2-BLK", revs: 428, rate: "4.9", spend: "$3,120", pct: "84%" },
                { name: "Aero Bass Pro 3", sku: "AER-BP3-GRY", revs: 312, rate: "4.7", spend: "$2,840", pct: "79%" },
                { name: "Turbo Run Core", sku: "TRB-RC-RED", revs: 294, rate: "4.5", spend: "$2,100", pct: "72%" }
              ].map((row, i) => (
                <tr key={i} className="border-b border-[#C5C5D9]/5 hover:bg-[#F2F3FF]/30 transition-colors text-sm text-[#454656] font-manrope">
                  <td className="p-4 text-left flex items-center gap-3">
                    <div className="w-8 h-10 rounded-lg bg-[#E2E7FF] flex items-center justify-center font-bold text-xs">📱</div>
                    <span className="font-bold text-[#131B2E]">{row.name}</span>
                  </td>
                  <td className="p-4 text-left font-mono text-xs">{row.sku}</td>
                  <td className="p-4 text-right font-bold text-[#131B2E]">{row.revs}</td>
                  <td className="p-4 text-right font-bold text-[#131B2E]">
                    <span className="inline-flex items-center gap-1">
                      {row.rate} <Star className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24] mt-0.5" />
                    </span>
                  </td>
                  <td className="p-4 text-right font-bold text-[#001BD2]">{row.spend}</td>
                  <td className="p-4 text-left">
                    <div className="w-24 h-1 bg-[#E2E7FF] rounded-full overflow-hidden relative mt-1.5">
                      <div className="absolute top-0 bottom-0 left-0 bg-[#004956] rounded-full" style={{ width: row.pct }}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-[#F2F3FF] p-4 text-center border-t border-[#C5C5D9]/10">
          <button className="bg-transparent border-none text-[10px] font-bold text-[#454656] tracking-[1.5px] uppercase hover:text-[#131B2E] cursor-pointer">
            View All Product Analytics
          </button>
        </div>
      </div>

    </div>
  );
}

"use client";

import { Star } from "lucide-react";
import { useBrandApiStore } from "@/stores/useBrandApiStore";
import { formatInteger, formatMoney, toNumber } from "../../utils/backendMappers";

export default function AnalyticsReviews() {
  const analyticsOverview = useBrandApiStore((state) => state.analyticsOverview);
  const products = useBrandApiStore((state) => state.analyticsProducts);
  const spend = (analyticsOverview?.spend || {}) as Record<string, unknown>;
  const totalReviews = toNumber(analyticsOverview?.reviews);
  const reviewSpend = toNumber(spend.review_reward) + toNumber(spend.review_fee);
  const averageRating = toNumber(analyticsOverview?.average_rating);
  const costPerReview = totalReviews ? reviewSpend / totalReviews : 0;

  return (
    <div className="flex flex-col gap-8 w-full text-left font-manrope animate-slide-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-stretch">
        {[
          { title: "Total Reviews", val: formatInteger(totalReviews) },
          { title: "Review Spend", val: formatMoney(reviewSpend, { compact: true }) },
          { title: "Avg. Rating", val: averageRating.toFixed(1), stars: true },
          { title: "Cost Per Review", val: formatMoney(costPerReview) },
        ].map((kpi) => (
          <div key={kpi.title} className="bg-white border border-[#C5C5D9]/15 shadow-sm rounded-[20px] p-6 flex flex-col justify-between text-left min-h-[154px]">
            <span className="text-[10px] font-bold text-[#454656] tracking-[0.3px] uppercase">{kpi.title}</span>
            <div className="flex flex-col gap-2 mt-4">
              <h3 className="font-jakarta font-extrabold text-3xl text-[#131B2E] tracking-tight">{kpi.val}</h3>
              {kpi.stars && (
                <div className="flex gap-1 items-center mt-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className={`w-3 h-3 ${idx < Math.round(averageRating) ? "fill-[#FBBF24] text-[#FBBF24]" : "text-slate-300"}`} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full bg-white border border-slate-100 shadow-sm rounded-3xl overflow-hidden flex flex-col">
        <div className="bg-[#F2F3FF] px-8 py-5 border-b border-[#C5C5D9]/10">
          <h3 className="font-jakarta font-bold text-lg text-[#131B2E]">Top Reviewed Products</h3>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#C5C5D9]/10 bg-[#FAF8FF]">
                <th className="p-4 text-left text-[10px] font-bold tracking-wider text-[#454656] uppercase">Product Name</th>
                <th className="p-4 text-right text-[10px] font-bold tracking-wider text-[#454656] uppercase">Total Reviews</th>
                <th className="p-4 text-right text-[10px] font-bold tracking-wider text-[#454656] uppercase">Avg Rating</th>
                <th className="p-4 text-right text-[10px] font-bold tracking-wider text-[#454656] uppercase">Reward Spend</th>
                <th className="p-4 text-left text-[10px] font-bold tracking-wider text-[#454656] uppercase">Rate</th>
              </tr>
            </thead>
            <tbody>
              {products.map((row) => {
                const reviews = toNumber(row.reviews_count);
                const rating = toNumber(row.average_rating);
                const pct = totalReviews ? Math.min(100, (reviews / totalReviews) * 100) : 0;
                return (
                  <tr key={String(row.product_id)} className="border-b border-[#C5C5D9]/5 hover:bg-[#F2F3FF]/30 transition-colors text-sm text-[#454656]">
                    <td className="p-4 text-left flex items-center gap-3">
                      <div className="w-8 h-10 rounded-lg bg-[#E2E7FF] flex items-center justify-center font-bold text-xs">P</div>
                      <span className="font-bold text-[#131B2E]">{String(row.name ?? "Product")}</span>
                    </td>
                    <td className="p-4 text-right font-bold text-[#131B2E]">{formatInteger(reviews)}</td>
                    <td className="p-4 text-right font-bold text-[#131B2E]">
                      <span className="inline-flex items-center gap-1">
                        {rating.toFixed(1)} <Star className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24] mt-0.5" />
                      </span>
                    </td>
                    <td className="p-4 text-right font-bold text-[#001BD2]">{formatMoney(row.reward_spend)}</td>
                    <td className="p-4 text-left">
                      <div className="w-24 h-1 bg-[#E2E7FF] rounded-full overflow-hidden relative mt-1.5">
                        <div className="absolute top-0 bottom-0 left-0 bg-[#004956] rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-sm font-semibold text-slate-400">
                    No review analytics yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

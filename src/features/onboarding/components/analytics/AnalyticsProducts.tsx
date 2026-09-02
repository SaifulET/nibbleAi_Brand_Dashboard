"use client";

import { Star } from "lucide-react";
import { useBrandApiStore } from "@/stores/useBrandApiStore";
import { formatInteger, formatMoney, toNumber } from "../../utils/backendMappers";

export default function AnalyticsProducts() {
  const products = useBrandApiStore((state) => state.analyticsProducts);

  return (
    <div className="flex flex-col gap-8 w-full text-left font-manrope animate-slide-up">
      <div className="w-full bg-white border border-slate-100 shadow-sm rounded-3xl overflow-hidden flex flex-col">
        <div className="bg-[#F2F3FF] px-8 py-5 border-b border-[#C5C5D9]/10">
          <h3 className="font-jakarta font-bold text-lg text-[#131B2E]">
            Product Performance
          </h3>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#C5C5D9]/10 bg-[#FAF8FF]">
                <th className="p-4 text-left text-[10px] font-bold tracking-wider text-[#454656] uppercase">Product</th>
                <th className="p-4 text-right text-[10px] font-bold tracking-wider text-[#454656] uppercase">Redemptions</th>
                <th className="p-4 text-right text-[10px] font-bold tracking-wider text-[#454656] uppercase">Reviews</th>
                <th className="p-4 text-right text-[10px] font-bold tracking-wider text-[#454656] uppercase">Avg Rating</th>
                <th className="p-4 text-right text-[10px] font-bold tracking-wider text-[#454656] uppercase">Reward Spend</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={String(product.product_id)} className="border-b border-[#C5C5D9]/5 hover:bg-[#F2F3FF]/30 transition-colors text-sm text-[#454656]">
                  <td className="p-4 text-left font-bold text-[#131B2E]">{String(product.name ?? "Product")}</td>
                  <td className="p-4 text-right font-bold text-[#131B2E]">{formatInteger(product.redemptions)}</td>
                  <td className="p-4 text-right font-bold text-[#131B2E]">{formatInteger(product.reviews_count)}</td>
                  <td className="p-4 text-right font-bold text-[#131B2E]">
                    <span className="inline-flex items-center gap-1">
                      {toNumber(product.average_rating).toFixed(1)}
                      <Star className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24]" />
                    </span>
                  </td>
                  <td className="p-4 text-right font-bold text-[#001BD2]">{formatMoney(product.reward_spend)}</td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-sm font-semibold text-slate-400">
                    No product analytics yet.
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

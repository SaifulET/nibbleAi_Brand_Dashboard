"use client";

import { Shield, ShoppingCart, MessageSquare, Calendar, Globe, MapPin } from "lucide-react";
import { useBrandApiStore } from "@/stores/useBrandApiStore";
import { formatInteger, formatMoney, titleCase, toNumber } from "../../utils/backendMappers";

export default function AnalyticsRebates() {
  const campaigns = useBrandApiStore((state) => state.analyticsCampaigns);
  const totals = campaigns.reduce<{
    reservations: number;
    approvals: number;
    redemptions: number;
    spend: number;
  }>(
    (acc, campaign) => ({
      reservations: acc.reservations + toNumber(campaign.reservations),
      approvals: acc.approvals + toNumber(campaign.approvals),
      redemptions: acc.redemptions + toNumber(campaign.redemptions),
      spend: acc.spend + toNumber(campaign.total_spend),
    }),
    { reservations: 0, approvals: 0, redemptions: 0, spend: 0 }
  );
  const claimRate = totals.reservations ? (totals.approvals / totals.reservations) * 100 : 0;
  const costPerPurchase = totals.approvals ? totals.spend / totals.approvals : 0;
  const costPerRedemption = totals.redemptions ? totals.spend / totals.redemptions : 0;

  return (
    <div className="flex flex-col gap-8 w-full text-left font-manrope animate-slide-up">
      <div className="flex flex-row flex-wrap items-center gap-3 w-full">
        <div className="bg-white border border-[#C5C5D9]/15 rounded-full px-4 py-2.5 flex items-center gap-2 shadow-sm text-xs font-bold text-[#454656]">
          <Calendar className="w-3.5 h-3.5 text-[#001BD2]" />
          <span>All Time</span>
        </div>
        <div className="bg-white border border-[#C5C5D9]/15 rounded-full px-4 py-2.5 flex items-center gap-2 shadow-sm text-xs font-bold text-[#454656]">
          <Globe className="w-3.5 h-3.5 text-[#001BD2]" />
          <span>Campaign Segment</span>
        </div>
        <div className="bg-white border border-[#C5C5D9]/15 rounded-full px-4 py-2.5 flex items-center gap-2 shadow-sm text-xs font-bold text-[#454656]">
          <MapPin className="w-3.5 h-3.5 text-[#001BD2]" />
          <span>All Locations</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
        {[
          { title: "Claim Rate", val: `${claimRate.toFixed(1)}%`, icon: <Shield className="w-5 h-5 text-[#454656]" /> },
          { title: "Cost Per Purchase", val: formatMoney(costPerPurchase), icon: <ShoppingCart className="w-5 h-5 text-[#454656]" /> },
          { title: "Cost Per Redemption", val: formatMoney(costPerRedemption), icon: <MessageSquare className="w-5 h-5 text-[#454656]" /> },
        ].map((kpi) => (
          <div key={kpi.title} className="bg-white border border-[#C5C5D9]/15 shadow-sm rounded-3xl p-6 flex flex-col justify-between text-left min-h-[154px]">
            <div className="flex justify-between items-start gap-4">
              <div className="w-10 h-10 bg-[#E2E7FF] rounded-2xl flex items-center justify-center flex-shrink-0">{kpi.icon}</div>
              <span className="text-[10px] font-bold text-[#454656] tracking-[1.2px] uppercase mt-2">{kpi.title}</span>
            </div>
            <h3 className="font-jakarta font-extrabold text-3xl text-[#131B2E] mt-4 tracking-tight">{kpi.val}</h3>
          </div>
        ))}
      </div>

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
                <th className="p-5 text-right text-[10px] font-bold tracking-wider text-[#454656] uppercase">Spend</th>
                <th className="p-5 text-right text-[10px] font-bold tracking-wider text-[#454656] uppercase">Reward Share</th>
                <th className="p-5 text-left text-[10px] font-bold tracking-wider text-[#454656] uppercase">Volume</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((row) => {
                const status = titleCase(row.status);
                const redemptions = toNumber(row.redemptions);
                const spend = toNumber(row.total_spend);
                const growth = Math.min(100, redemptions * 5);
                return (
                  <tr key={String(row.campaign_id)} className="border-b border-[#C5C5D9]/5 hover:bg-[#F2F3FF]/30 transition-colors text-sm text-[#454656]">
                    <td className="p-5 text-left flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E2E7FF] flex items-center justify-center text-[#001BD2] text-xs font-bold font-mono">R</div>
                      <span className="font-bold text-[#131B2E]">{String(row.name ?? "Campaign")}</span>
                    </td>
                    <td className="p-5 text-left">
                      <span className={`font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider ${status === "Active" ? "bg-teal-100 text-teal-700" : "bg-amber-100 text-amber-700"}`}>{status}</span>
                    </td>
                    <td className="p-5 text-right font-bold text-[#131B2E]">{formatInteger(redemptions)}</td>
                    <td className="p-5 text-right font-bold text-[#131B2E]">{formatMoney(spend)}</td>
                    <td className="p-5 text-right font-bold text-[#001BD2]">{spend ? `${Math.round((toNumber(row.reward_spend) / spend) * 100)}%` : "0%"}</td>
                    <td className="p-5 text-left">
                      <div className="w-24 h-1.5 bg-[#E2E7FF] rounded-full overflow-hidden relative mt-1.5">
                        <div className="absolute top-0 bottom-0 left-0 bg-[#004956] rounded-full" style={{ width: `${growth}%` }}></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {campaigns.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-sm font-semibold text-slate-400">
                    No campaign analytics yet.
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

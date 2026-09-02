/* eslint-disable @next/next/no-img-element */
"use client";

import { ApiRecord } from "@/lib/api/backendApi";
import { useBrandApiStore } from "@/stores/useBrandApiStore";
import { formatInteger, formatMoney, titleCase, toNumber } from "../../utils/backendMappers";

type DashboardCampaign = {
  id: string;
  name: string;
  type: "REBATE" | "REVIEW";
  status: string;
  spend: number;
  activity: string;
  activitySub: string;
  thumbnail: string;
};

const campaignId = (campaign: ApiRecord) =>
  String(campaign.id ?? campaign.campaign_id ?? "");

const statusText = (status: unknown) => titleCase(status || "draft");

export default function CampaignsTable() {
  const campaigns = useBrandApiStore((state) => state.campaigns);
  const reviewCampaigns = useBrandApiStore((state) => state.reviewCampaigns);
  const analyticsCampaigns = useBrandApiStore((state) => state.analyticsCampaigns);
  const analyticsByCampaign = new Map(
    analyticsCampaigns.map((row) => [String(row.campaign_id), row])
  );
  const rows: DashboardCampaign[] = [
    ...campaigns.map((campaign) => {
      const metrics = analyticsByCampaign.get(campaignId(campaign));
      const redemptions = toNumber(metrics?.redemptions);
      const approvals = toNumber(metrics?.approvals);
      return {
        id: campaignId(campaign),
        name: String(campaign.name ?? "Untitled rebate campaign"),
        type: "REBATE" as const,
        status: statusText(campaign.status),
        spend: toNumber(metrics?.total_spend),
        activity: `${formatInteger(approvals)} Purchases`,
        activitySub: `${formatInteger(redemptions)} Redemptions`,
        thumbnail: "/Auth/rebateImage.svg",
      };
    }),
    ...reviewCampaigns.map((campaign) => ({
      id: campaignId(campaign),
      name: String(campaign.name ?? "Untitled review campaign"),
      type: "REVIEW" as const,
      status: statusText(campaign.status),
      spend: toNumber(campaign.daily_budget),
      activity: `${formatInteger(campaign.prompts instanceof Array ? campaign.prompts.length : 0)} Prompts`,
      activitySub: `${formatMoney(campaign.reward_amount)} Reward`,
      thumbnail: "/Auth/reviewImage.svg",
    })),
  ].filter((campaign) => campaign.id);
  const activeRows = rows
    .filter((campaign) => campaign.status.toLowerCase() === "active")
    .slice(0, 5);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-sm font-jakarta font-extrabold text-[#454656] opacity-70 tracking-widest uppercase">
          ACTIVE CAMPAIGNS
        </h2>

        {/* Dropdowns Filters */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#C5C5D9]/20 rounded-lg text-xs font-bold text-[#454656] cursor-pointer hover:bg-slate-50">
            <span>All Types</span>
            <span className="text-[10px]">▼</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#C5C5D9]/20 rounded-lg text-xs font-bold text-[#454656] cursor-pointer hover:bg-slate-50">
            <span>Last 30 Days</span>
            <span className="text-[10px]">▼</span>
          </button>
        </div>
      </div>

      {/* Table Container Card */}
      <div className="bg-white border border-[#C5C5D9]/10 rounded-2xl shadow-sm overflow-hidden flex flex-col w-full">
        <table className="w-full text-left border-collapse font-manrope">
          <thead>
            <tr className="bg-[#F2F3FF] h-[55px] text-[#454656] text-[11px] font-bold tracking-wider uppercase border-b border-[#C5C5D9]/5">
              <th className="px-8 font-bold">CAMPAIGN NAME</th>
              <th className="px-8 font-bold">TYPE</th>
              <th className="px-8 font-bold">STATUS</th>
              <th className="px-8 font-bold text-right">SPEND</th>
              <th className="px-8 font-bold text-right">ACTIVITY</th>
            </tr>
          </thead>
          <tbody>
            {activeRows.map((row) => (
              <tr key={`${row.type}-${row.id}`} className="h-[88.5px] border-b border-[#C5C5D9]/5 hover:bg-slate-50/50 transition-colors">
                <td className="px-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#EAEDFF] overflow-hidden flex items-center justify-center flex-shrink-0">
                      <img
                        src={row.thumbnail}
                        alt="Campaign thumbnail"
                        className="w-10 h-10 object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#131B2E]">
                        {row.name}
                      </span>
                      <span className="text-[10px] text-[#454656] mt-0.5">
                        ID: {row.id.slice(0, 8)}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-8">
                  <span className={`${row.type === "REBATE" ? "bg-[#001BD2]/10 text-[#001BD2]" : "bg-[#004956]/10 text-[#004956]"} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tight`}>
                    {row.type}
                  </span>
                </td>
                <td className="px-8">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 ${row.status === "Active" ? "bg-[#10B981]" : "bg-[#FBBF24]"} rounded-full`}></span>
                    <span className="text-xs font-semibold text-[#454656]">
                      {row.status}
                    </span>
                  </div>
                </td>
                <td className="px-8 text-right">
                  <span className="text-sm font-bold text-[#131B2E]">
                    {formatMoney(row.spend)}
                  </span>
                </td>
                <td className="px-8 text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-[#131B2E]">
                      {row.activity}
                    </span>
                    <span className="text-[10px] text-[#454656] mt-0.5">
                      {row.activitySub}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
            {activeRows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-8 py-12 text-center text-sm font-semibold text-slate-400">
                  No active campaigns yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Table Footer */}
        <div className="flex justify-between items-center px-8 py-4 bg-[#F2F3FF] border-t border-[#C5C5D9]/5">
          <span className="text-[10px] font-manrope font-bold text-[#454656] tracking-wider uppercase">
            SHOWING {activeRows.length} OF {rows.length} CAMPAIGNS
          </span>
          <button className="font-manrope font-bold text-xs text-[#001BD2] hover:underline cursor-pointer">
            See All Activity
          </button>
        </div>
      </div>
    </section>
  );
}

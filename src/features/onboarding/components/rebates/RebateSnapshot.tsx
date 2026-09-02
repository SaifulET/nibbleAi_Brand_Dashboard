/* eslint-disable @next/next/no-img-element */
"use client";

import { useBrandApiStore } from "@/stores/useBrandApiStore";
import { formatInteger, formatMoney, toNumber } from "../../utils/backendMappers";

export default function RebateSnapshot() {
  const analyticsOverview = useBrandApiStore((state) => state.analyticsOverview);
  const spend = (analyticsOverview?.spend || {}) as Record<string, unknown>;
  const verifiedPurchases = toNumber(analyticsOverview?.approvals);
  const rebateSpend = toNumber(spend.rebate_reward) + toNumber(spend.rebate_fee);
  const redemptions = toNumber(analyticsOverview?.redemptions);
  const costPerPurchase = verifiedPurchases ? rebateSpend / verifiedPurchases : 0;
  const averageRebate = redemptions ? toNumber(spend.rebate_reward) / redemptions : 0;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-jakarta font-extrabold text-[#454656] opacity-70 tracking-widest uppercase">
          REBATE SNAPSHOT
        </h2>
      </div>

      {/* Grid 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Card 1: Verified Purchases */}
        <div className="bg-white border border-[#C5C5D9]/10 rounded-[20px] p-6 flex flex-col justify-between h-[198px] font-jakarta shadow-sm">
          <div className="flex justify-between items-start">
            <div className="w-[32px] h-[36px] bg-[#DFE0FF] rounded-2xl flex items-center justify-center">
              <img
                src="/Dashboard/verfiedPurchase.svg"
                alt="Verified Purchases"
                className="w-4 h-5 object-contain"
              />
            </div>
            <span className="bg-[#ECFDF5] text-[#059669] text-[10px] font-bold px-2 py-0.5 rounded-full">
              +12.5%
            </span>
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <span className="text-[12px] font-semibold text-[#454656] tracking-wider uppercase font-manrope">
              VERIFIED PURCHASES
            </span>
            <span className="text-[30px] font-extrabold text-[#131B2E]">
              {formatInteger(verifiedPurchases)}
            </span>
          </div>

          <div className="w-full h-1.5 bg-[#F2F3FF] rounded-full mt-2 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 bg-[#001BD2] rounded-full w-[75%]"></div>
          </div>
        </div>

        {/* Card 2: Rebate Spend */}
        <div className="bg-white border border-[#C5C5D9]/10 rounded-[20px] p-6 flex flex-col justify-between h-[198px] font-jakarta shadow-sm">
          <div className="flex justify-between items-start">
            <div className="w-[36px] h-[36px] bg-[#D3E4FE] rounded-2xl flex items-center justify-center">
              <img
                src="/Dashboard/RebateSpend.svg"
                alt="Rebate Spend"
                className="w-5 h-5 object-contain"
              />
            </div>
            <span className="bg-[#ECFDF5] text-[#059669] text-[10px] font-bold px-2 py-0.5 rounded-full">
              +4.2%
            </span>
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <span className="text-[12px] font-semibold text-[#454656] tracking-wider uppercase font-manrope">
              REBATE SPEND
            </span>
            <span className="text-[30px] font-extrabold text-[#131B2E]">
              {formatMoney(rebateSpend, { compact: true })}
            </span>
          </div>

          {/* Micro Chart Simulator */}
          <div className="flex items-end gap-2.5 h-6 mt-2 pt-1">
            <div className="w-full bg-[#001BD2]/20 h-[30%] rounded-t-sm"></div>
            <div className="w-full bg-[#001BD2]/20 h-[50%] rounded-t-sm"></div>
            <div className="w-full bg-[#001BD2] h-[80%] rounded-t-sm"></div>
            <div className="w-full bg-[#001BD2]/40 h-[40%] rounded-t-sm"></div>
            <div className="w-full bg-[#001BD2]/60 h-[65%] rounded-t-sm"></div>
          </div>
        </div>

        {/* Card 3: Cost Per Purchase */}
        <div className="bg-white border border-[#C5C5D9]/10 rounded-[20px] p-6 flex flex-col justify-between h-[198px] font-jakarta shadow-sm">
          <div className="flex justify-between items-start">
            <div className="w-[33px] h-[34px] bg-[#ACEDFF] rounded-2xl flex items-center justify-center">
              <img
                src="/Dashboard/costperPurchase.svg"
                alt="Cost Per Purchase"
                className="w-4 h-[18px] object-contain"
              />
            </div>
            <span className="bg-[#FEF2F2] text-[#DC2626] text-[10px] font-bold px-2 py-0.5 rounded-full">
              -2.1%
            </span>
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <span className="text-[12px] font-semibold text-[#454656] tracking-wider uppercase font-manrope">
              COST PER PURCHASE
            </span>
            <span className="text-[30px] font-extrabold text-[#131B2E]">
              {formatMoney(costPerPurchase)}
            </span>
          </div>

          <span className="text-[10px] font-manrope font-medium text-[#454656] mt-2">
            Industry benchmark: $14.50
          </span>
        </div>

        {/* Card 4: Average Rebate Paid */}
        <div className="bg-white border border-[#C5C5D9]/10 rounded-[20px] p-6 flex flex-col justify-between h-[198px] font-jakarta shadow-sm">
          <div className="flex justify-between items-start">
            <div className="w-[36px] h-[35px] bg-[#DFE0FF] rounded-2xl flex items-center justify-center">
              <img
                src="/Dashboard/avarageRebatePaid.svg"
                alt="Average Rebate Paid"
                className="w-5 h-[19px] object-contain"
              />
            </div>
            <span className="bg-[#ECFDF5] text-[#059669] text-[10px] font-bold px-2 py-0.5 rounded-full">
              +0.5%
            </span>
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <span className="text-[12px] font-semibold text-[#454656] tracking-wider uppercase font-manrope">
              AVERAGE REBATE PAID
            </span>
            <span className="text-[30px] font-extrabold text-[#131B2E]">
              {formatMoney(averageRebate)}
            </span>
          </div>

          <div className="w-full h-1.5 bg-[#F2F3FF] rounded-full mt-2 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 bg-[#004956] rounded-full w-[60%]"></div>
          </div>
        </div>
      </div>

      <p className="text-[11px] font-manrope font-medium text-[#454656]/70 leading-normal mt-1">
        You control your daily spend and reward values — performance updates based on your campaign setup.
      </p>
    </section>
  );
}

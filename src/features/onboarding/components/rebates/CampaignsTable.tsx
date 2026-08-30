/* eslint-disable @next/next/no-img-element */
export default function CampaignsTable() {
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
            {/* Row 1 */}
            <tr className="h-[88.5px] border-b border-[#C5C5D9]/5 hover:bg-slate-50/50 transition-colors">
              <td className="px-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#EAEDFF] overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img
                      src="/Auth/rebateImage.svg"
                      alt="Campaign thumbnail"
                      className="w-10 h-10 object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#131B2E]">
                      Spring Runner 500 Launch
                    </span>
                    <span className="text-[10px] text-[#454656] mt-0.5">
                      ID: #REB-004521
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-8">
                <span className="bg-[#001BD2]/10 text-[#001BD2] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tight">
                  REBATE
                </span>
              </td>
              <td className="px-8">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#10B981] rounded-full"></span>
                  <span className="text-xs font-semibold text-[#454656]">
                    Active
                  </span>
                </div>
              </td>
              <td className="px-8 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-[#131B2E]">
                    $4,500.00
                  </span>
                  <span className="text-[10px] text-[#454656] mt-0.5">
                    Remaining: $1.2k
                  </span>
                </div>
              </td>
              <td className="px-8 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-[#131B2E]">
                    342 Purchases
                  </span>
                  <span className="text-[10px] text-[#059669] font-bold mt-0.5">
                    92% Claim Rate
                  </span>
                </div>
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="h-[88.5px] border-b border-[#C5C5D9]/5 hover:bg-slate-50/50 transition-colors">
              <td className="px-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#EAEDFF] overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img
                      src="/Auth/reviewImage.svg"
                      alt="Campaign thumbnail"
                      className="w-10 h-10 object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#131B2E]">
                      Elite Chrono Review Blitz
                    </span>
                    <span className="text-[10px] text-[#454656] mt-0.5">
                      ID: #REV-009923
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-8">
                <span className="bg-[#004956]/10 text-[#004956] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tight">
                  REVIEW
                </span>
              </td>
              <td className="px-8">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#10B981] rounded-full"></span>
                  <span className="text-xs font-semibold text-[#454656]">
                    Active
                  </span>
                </div>
              </td>
              <td className="px-8 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-[#131B2E]">
                    $1,200.00
                  </span>
                  <span className="text-[10px] text-[#454656] mt-0.5">
                    Remaining: $800
                  </span>
                </div>
              </td>
              <td className="px-8 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-[#131B2E]">
                    84 Reviews
                  </span>
                  <span className="text-[10px] text-[#454656] mt-0.5">
                    4.8 Avg Rating
                  </span>
                </div>
              </td>
            </tr>

            {/* Row 3 */}
            <tr className="h-[88.5px] hover:bg-slate-50/50 transition-colors">
              <td className="px-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#EAEDFF] overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img
                      src="/Auth/rebateImage.svg"
                      alt="Campaign thumbnail"
                      className="w-10 h-10 object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#131B2E]">
                      Summer Shades Discount
                    </span>
                    <span className="text-[10px] text-[#454656] mt-0.5">
                      ID: #REB-004812
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-8">
                <span className="bg-[#001BD2]/10 text-[#001BD2] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tight">
                  REBATE
                </span>
              </td>
              <td className="px-8">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FBBF24] rounded-full"></span>
                  <span className="text-xs font-semibold text-[#454656]">
                    Paused
                  </span>
                </div>
              </td>
              <td className="px-8 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-[#131B2E]">
                    $850.00
                  </span>
                  <span className="text-[10px] text-[#454656] mt-0.5">
                    Budget Capped
                  </span>
                </div>
              </td>
              <td className="px-8 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-[#131B2E]">
                    56 Purchases
                  </span>
                  <span className="text-[10px] text-[#454656] mt-0.5">
                    100% Fulfilled
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Table Footer */}
        <div className="flex justify-between items-center px-8 py-4 bg-[#F2F3FF] border-t border-[#C5C5D9]/5">
          <span className="text-[10px] font-manrope font-bold text-[#454656] tracking-wider uppercase">
            SHOWING 3 OF 12 ACTIVE CAMPAIGNS
          </span>
          <button className="font-manrope font-bold text-xs text-[#001BD2] hover:underline cursor-pointer">
            See All Activity
          </button>
        </div>
      </div>
    </section>
  );
}

/* eslint-disable @next/next/no-img-element */
interface CampaignItem {
  id: string;
  name: string;
  createdDate: string;
  status: "Active" | "Paused";
  reviews: number;
  todayReviews: number;
  spend: number;
}

interface ReviewDetailsProps {
  campaign: CampaignItem;
  onBack: () => void;
}

export default function ReviewDetails({ campaign, onBack }: ReviewDetailsProps) {
  return (
    <div className="flex flex-col gap-8 w-full animate-slide-up text-left font-manrope">
      
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <button onClick={onBack} className="hover:text-slate-600 cursor-pointer">Reviews</button>
        <span>➔</span>
        <span className="text-[#131B2E]">Details: {campaign.name}</span>
      </div>

      <div className="flex justify-between items-center w-full pb-4 border-b border-slate-100">
        <h2 className="text-3xl font-extrabold font-jakarta text-[#131B2E] tracking-tight">
          Review Detail: {campaign.name}
        </h2>
        <button
          onClick={onBack}
          className="px-5 h-[38px] border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold text-xs rounded-xl transition-colors cursor-pointer"
        >
          ← Back to List
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        {/* Left Column (Review Summary content) */}
        <div className="flex flex-col gap-6 w-full lg:max-w-[64%] bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
          <div className="bg-[#F2F3FF] px-6 py-4 flex justify-between items-center border-b border-slate-100">
            <h3 className="text-sm font-bold text-[#131B2E]">Review Summary</h3>
            <span className="text-xs text-slate-400 font-bold">Oct 24, 2023</span>
          </div>

          <div className="p-8 flex flex-col gap-4">
            {/* 5 gold stars */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <img key={i} src="/reviews/star.svg" alt="Star" className="w-5 h-5 object-contain" />
              ))}
            </div>

            <p className="text-lg font-medium text-[#131B2E] leading-relaxed italic mt-2">
              &quot;The crunch on these chips is incomparable. I love that they use real sea salt without it being overwhelming. Definitely my new go-to snack.&quot;
            </p>
          </div>
        </div>

        {/* Right Column (Featured SKU metadata) */}
        <div className="w-full lg:max-w-[36%] flex flex-col gap-6">
          {/* Featured Product Card */}
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm flex flex-col w-full">
            <div className="relative w-full h-[180px] bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden">
              <img
                src="/Auth/rebateImage.svg"
                alt="Featured Product"
                className="max-h-[85%] max-w-[85%] object-contain"
              />
              <span className="absolute bottom-4 left-4 bg-slate-900/70 text-white text-[9px] font-extrabold px-3 py-1 rounded uppercase tracking-wider">
                FEATURED PRODUCT
              </span>
            </div>

            <div className="p-6 flex flex-col gap-4 text-left font-manrope">
              <h4 className="text-base font-extrabold text-[#131B2E]">Kettle Sea Salt Chips</h4>
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-50 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">SKU</span>
                  <span className="text-[#131B2E] font-bold">KTL-SS-01</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Price</span>
                  <span className="text-[#001BD2] font-extrabold">$4.99</span>
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Stats Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5 w-full text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CAMPAIGN STATS</span>

            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] text-slate-400 font-semibold">Active Campaign</span>
              <h4 className="text-sm font-bold text-[#131B2E]">Fall Snack Refresh</h4>
            </div>

            <div className="flex justify-between items-center border-t border-slate-50 pt-4">
              <span className="text-xs text-slate-400 font-semibold">Review Reward</span>
              <span className="bg-[#DFE0FF] text-[#000866] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                $2.00 Cashback
              </span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

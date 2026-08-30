/* eslint-disable @next/next/no-img-element */
interface ProductItem {
  id: string;
  name: string;
  category: string;
  imageSrc: string;
}

interface RewardTier {
  id: string;
  name: string;
  structure: string;
  reward: string;
  maxPayout: string;
  minPurchase: string;
  allocation: number;
}

interface CreateCampaignStep4Props {
  onBack: () => void;
  onPublish: () => void;
  draftData: { name: string; startDate: string; endDate: string; isActive: boolean };
  selectedProducts: ProductItem[];
  tiers: RewardTier[];
}

export default function CreateCampaignStep4({
  onBack,
  onPublish,
  draftData,
  selectedProducts,
  tiers,
}: CreateCampaignStep4Props) {
  return (
    <div className="flex flex-col justify-center items-start pt-6 md:pt-12 px-4 md:px-12 pb-[142.5px] gap-5 w-full min-h-[1224px] font-manrope text-left mx-auto">
      
      {/* Progress Tracker */}
      <div className="relative flex flex-row justify-between items-center w-full max-w-[928px] h-[72px] isolate mx-auto overflow-x-auto gap-8 md:gap-0 pb-2">
        {/* Horizontal Divider Line */}
        <div className="absolute h-[2px] left-0 right-0 top-1/2 -translate-y-1/2 bg-[#EAEDFF] z-0"></div>

        {/* Step 1: Basic Info (Inactive/done) */}
        <div className="flex flex-col items-center gap-3 w-[65px] h-[72px] z-10 flex-shrink-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#DAE2FD]">
            <span className="text-[#454656] text-base font-normal font-manrope">1</span>
          </div>
          <span className="text-[#454656] text-xs font-semibold opacity-60 font-manrope whitespace-nowrap">Basic Info</span>
        </div>

        {/* Step 2: Products (Inactive/done) */}
        <div className="flex flex-col items-center gap-3 w-[62px] h-[72px] z-10 flex-shrink-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#DAE2FD]">
            <span className="text-[#454656] text-base font-normal font-manrope">2</span>
          </div>
          <span className="text-[#454656] text-xs font-semibold opacity-60 font-manrope whitespace-nowrap">Products</span>
        </div>

        {/* Step 3: Budget & Offers (Inactive/done) */}
        <div className="flex flex-col items-center gap-3 w-[105px] h-[72px] z-10 flex-shrink-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#DAE2FD]">
            <span className="text-[#454656] text-base font-normal font-manrope">3</span>
          </div>
          <span className="text-[#454656] text-xs font-semibold opacity-60 font-manrope whitespace-nowrap">Budget & Offers</span>
        </div>

        {/* Step 4: Review & publish (Active) */}
        <div className="flex flex-col items-center gap-3 w-[112px] h-[72px] z-10 flex-shrink-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#001BD2] shadow-[0px_0px_0px_8px_#DFE0FF] relative">
            <span className="text-white text-base font-normal font-manrope z-10">4</span>
          </div>
          <span className="text-[#011CD2] text-xs font-semibold font-manrope whitespace-nowrap">Review & publish</span>
        </div>
      </div>

      {/* Asymmetric Bento Grid Review Layout */}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[928px] mt-6 relative items-start h-auto lg:h-[722.5px] mx-auto">
        
        {/* Left Column: Primary Identity & Products (Col Span 8) */}
        <div className="flex flex-col gap-6 w-full lg:w-[610.67px] h-auto lg:h-[544px] flex-shrink-0">
          
          {/* Section 1: Campaign Identity */}
          <div className="w-full lg:w-[610.67px] min-h-[252px] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[24px] overflow-hidden flex flex-col flex-shrink-0">
            {/* Header */}
            <div className="bg-[#F2F3FF] px-8 py-4 flex justify-between items-center w-full border-b border-[#EAEDFF]">
              <h3 className="font-jakarta font-bold text-lg text-[#131B2E]">Campaign Identity</h3>
            </div>
            {/* Body */}
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 min-h-[192px] w-full">
              <div className="w-32 h-32 bg-[#EAEDFF] rounded-2xl flex-shrink-0 overflow-hidden flex items-center justify-center">
                <img
                  src="/Rebate/Campaign Thumbnail.svg"
                  alt="Campaign Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1.5 text-left">
                <span className="text-sm font-bold text-[#001BD2] tracking-[1.4px] uppercase font-manrope">ACTIVE CAMPAIGN</span>
                <h4 className="text-2xl font-extrabold text-[#131B2E] font-manrope">{draftData.name || "Summer Cashback 2024"}</h4>
                
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2">
                  <div className="flex items-center gap-1.5">
                    <img src="/Rebate/dateIcon.svg" alt="Date" className="w-3 h-3.5 object-contain" />
                    <span className="text-[#454656] text-base font-medium font-manrope">{draftData.startDate || "June 1"} - {draftData.endDate || "Aug 31"}</span>
                  </div>
                  <div className="hidden md:block w-1.5 h-1.5 bg-[#C5C5D9] rounded-full"></div>
                  <div className="flex items-center gap-1.5">
                    <img src="/Rebate/globalIcon.svg" alt="Global" className="w-[13.33px] h-[13.33px] object-contain" />
                    <span className="text-[#454656] text-base font-medium font-manrope">Global Region</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Selected Products */}
          <div className="w-full lg:w-[610.67px] min-h-[268px] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[24px] overflow-hidden flex flex-col flex-shrink-0">
            {/* Header */}
            <div className="bg-[#F2F3FF] px-8 py-4 flex justify-between items-center w-full border-b border-[#EAEDFF]">
              <h3 className="font-jakarta font-bold text-lg text-[#131B2E]">Selected Products</h3>
              <span className="text-xs font-bold text-[#454656] font-manrope">{selectedProducts.length} Products Managed</span>
            </div>
            {/* Body */}
            <div className="p-8 flex flex-row gap-4 h-[208px] overflow-x-auto w-full">
              {selectedProducts.map((p) => (
                <div key={p.id} className="w-[245px] h-[112px] bg-[#FAF8FF] rounded-2xl p-4 flex items-center gap-4 flex-shrink-0">
                  <div className="w-16 h-16 bg-white border border-[#C5C5D9]/10 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img src="/Rebate/selectedProductSmallImage.svg" alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col text-left">
                    <h4 className="text-base font-bold text-[#131B2E] font-manrope line-clamp-1">{p.name}</h4>
                    <span className="text-sm text-[#454656] font-normal font-manrope mt-1">SKU: {p.id}-CER-01</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Budget & Strategy (Col Span 4) */}
        <div className="flex flex-col gap-6 w-full lg:w-[293.33px] h-auto lg:h-[723px] flex-shrink-0">
          
          {/* Section 3: Budget & Tiers */}
          <div className="w-full lg:w-[293.33px] min-h-[386px] bg-white border border-[#001BD2]/10 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[24px] overflow-hidden flex flex-col flex-shrink-0">
            {/* Header */}
            <div className="h-[60px] bg-[#001BD2]/5 px-8 py-4 flex items-center w-full border-b border-[#001BD2]/10 gap-2">
              <img src="/Rebate/budgetAndTier.svg" alt="Budget" className="w-[19px] h-[18px] object-contain" />
              <h3 className="font-jakarta font-bold text-lg text-[#001BD2]">Budget & Tiers</h3>
            </div>
            {/* Body */}
            <div className="p-8 flex flex-col gap-8 h-auto w-full">
              <div className="flex flex-col gap-1 text-left">
                <span className="text-sm font-semibold text-[#454656] tracking-[0.7px] uppercase font-manrope">DAILY ALLOCATION</span>
                <span className="text-[36px] font-extrabold text-[#131B2E] leading-none mt-1 font-manrope">$150.00</span>
              </div>
              <div className="flex flex-col gap-4">
                {tiers.filter(t => t.allocation > 0).map((t, idx) => (
                  <div key={t.id} className="relative flex flex-col text-left border-l-2 border-[#2D3FEA] pl-6 h-[44px]">
                    <div className="absolute w-2 h-2 rounded-full bg-[#001BD2] -left-[5px] top-0"></div>
                    <span className="text-xs font-bold text-[#454656] uppercase font-manrope">{t.name}</span>
                    <div className="flex justify-between items-end mt-0.5 w-full max-w-[201px]">
                      <span className="text-lg font-bold text-[#131B2E] font-manrope">{t.reward} / {t.allocation}%</span>
                      {idx === 0 && (
                        <span className="bg-[#D0E1FB] text-[#505F76] text-[10px] font-bold px-2 py-0.5 rounded-lg font-manrope uppercase">OPTIMAL</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Fallback Offer */}
          <div className="w-full lg:w-[293.33px] min-h-[313px] bg-[#131B2E] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)] rounded-[24px] p-6 md:p-8 flex flex-col gap-6 justify-between flex-shrink-0">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-3">
                <div className="w-[34.52px] h-[40px] bg-[#2D3FEA]/20 rounded-2xl flex items-center justify-center">
                  <img src="/Rebate/fallbackIcon.svg" alt="Fallback" className="w-4 h-5 object-contain" />
                </div>
                <h3 className="font-jakarta font-bold text-lg text-white">Fallback</h3>
              </div>
              <span className="bg-[#001BD2] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">ENABLED</span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-1 text-left w-full h-[86px]">
              <span className="text-xs text-white/60 font-normal font-manrope">Standard Reward</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-white font-manrope">$2.00</span>
                <span className="text-sm font-medium text-white/40 font-manrope">Fixed Amount</span>
              </div>
            </div>

            <p className="text-xs text-white/50 font-normal leading-[20px] font-manrope italic w-full h-auto">
              &quot;Fallback offers ensure customer satisfaction when primary tier inventory is depleted.&quot;
            </p>
          </div>

        </div>
      </div>

      {/* Footer Actions */}
      <div className="w-full max-w-[928px] h-auto border-t border-[#C5C5D9]/10 py-8 flex flex-col md:flex-row justify-center items-center gap-4 mt-8 mx-auto">
        <button
          onClick={onPublish}
          className="relative w-[243.75px] h-[60px] bg-gradient-to-r from-[#001BD2] to-[#2D3FEA] text-white font-extrabold text-lg rounded-full transition-all shadow-[0px_25px_50px_-12px_rgba(0,27,210,0.3)] hover:opacity-90 active:scale-[0.98] cursor-pointer flex items-center justify-center"
        >
          Publish Campaign
        </button>
        <button onClick={onBack} className="text-xs font-bold text-[#757688] hover:underline cursor-pointer">
          Go back and edit
        </button>
      </div>

    </div>
  );
}

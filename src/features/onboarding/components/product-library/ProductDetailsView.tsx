/* eslint-disable @next/next/no-img-element */
interface Product {
  id: string;
  name: string;
  imageSrc: string;
  category: string;
  flavor: string;
  format: string;
  size: string;
  aliases: string[];
  activeCampaigns: number;
}
interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onEditAliases: (prod: Product) => void | Promise<void>;
  onDelete: (prodId: string) => void;
}
export default function ProductDetailsView({ product, onBack, onEditAliases, onDelete }: ProductDetailsProps) {
  const specs = [
    { label: "Category", val: product.category },
    { label: "Brand", val: "Kettle" },
    { label: "Flavor", val: product.flavor },
    { label: "Format", val: product.format },
    { label: "Size", val: product.size },
    { label: "SKU", val: `KET-SS-${product.id}0Z-01` },
  ];
  return (
    <div className="flex flex-col gap-8 w-full animate-slide-up">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-manrope font-semibold">
        <button onClick={onBack} className="text-slate-400 hover:text-slate-600 cursor-pointer">Product Library</button>
        <span className="text-slate-300">&gt;</span>
        <span className="text-[#001BD2]">{product.name}</span>
      </div>
      {/* Header Actions */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-extrabold font-jakarta text-[#131B2E] tracking-tight">{product.name}</h1>
          <span className="bg-[#ECFDF5] text-[#059669] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase">
            <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></span>Active
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => onDelete(product.id)} className="px-6 h-11 bg-[#001BD2] hover:bg-blue-700 text-white font-bold text-sm rounded-full transition-colors active:scale-[0.98] cursor-pointer">Delete</button>
          <button onClick={() => onEditAliases(product)} className="px-6 h-11 bg-white hover:bg-slate-50 text-[#001BD2] border border-[#001BD2]/20 font-bold text-sm rounded-full transition-colors active:scale-[0.98] cursor-pointer flex items-center gap-2">
            <img src="/ProductLibary/editIcon.svg" alt="Edit" className="w-[14px] h-[14px] object-contain" />Edit Product
          </button>
        </div>
      </div>
      {/* Two Columns Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        {/* Left Column */}
        <div className="flex-grow flex flex-col gap-6 w-full lg:max-w-[60%]">
          {/* Visual Image Card */}
          <div className="bg-white border border-slate-100 rounded-[20px] shadow-sm overflow-hidden relative w-full h-[360px] md:h-[420px] flex items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-white">
            <img src={product.imageSrc} alt={product.name} className="max-h-full max-w-full object-contain" />
            <div className="absolute left-6 bottom-6 flex flex-col gap-2 items-start">
              <span className="bg-slate-800/40 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">BEST SELLER</span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Premium {product.flavor || "Product"} Variant</h2>
            </div>
          </div>
          {/* Product Description */}
          <div className="bg-white border border-slate-100 rounded-[20px] p-8 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#131B2E]">
              <img src="/ProductLibary/ProductDescription].svg" alt="Description" className="w-5 h-5 object-contain" />
              <span>Product Description</span>
            </div>
            <p className="text-sm font-manrope text-[#454656] leading-[1.62] font-medium">
              Our {product.name} is crafted with a dedication to simplicity and quality. Each batch is carefully processed to ensure the perfect quality and premium texture. Using only clean, high-quality ingredients, we deliver a timeless snacking and lifestyle experience for customers.
            </p>
          </div>
          {/* Technical Specifications */}
          <div className="bg-white border border-slate-100 rounded-[20px] p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-2 text-sm font-bold text-[#131B2E]">
              <img src="/ProductLibary/technicalSpecificaiton.svg" alt="Specs" className="w-5 h-5 object-contain" />
              <span>Technical Specifications</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-manrope">
              {specs.map((spec, idx) => (
                <div key={idx} className="bg-[#FAF8FF] p-4 rounded-xl flex flex-col gap-1 border border-[#C5C5D9]/10">
                  <span className="text-[10px] font-bold text-[#454656]/60 uppercase tracking-wider">{spec.label}</span>
                  <span className="text-sm font-extrabold text-[#131B2E]">{spec.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="w-full lg:max-w-[40%] flex flex-col gap-6">
          {/* Active Campaigns */}
          <div className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-sm flex flex-col gap-6 w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-[#131B2E]">Active Campaigns</h2>
              <button className="text-xs font-bold text-[#001BD2] hover:underline cursor-pointer">View All</button>
            </div>
            <div className="flex flex-col gap-5">
              {/* Campaign 1 */}
              <div className="border border-slate-100 p-4 rounded-xl flex flex-col gap-3 font-manrope bg-[#FAF8FF]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E2E7FF] flex items-center justify-center flex-shrink-0">
                      <img src="/ProductLibary/rebateIcon.svg" alt="Rebate" className="w-[18px] h-[18px] object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#131B2E]">Summer BBQ Rebate</span>
                      <span className="text-[10px] text-[#64748B] font-medium">Expires in 12 days</span>
                    </div>
                  </div>
                  <span className="bg-blue-50 text-[#001BD2] text-[9px] font-bold px-2 py-0.5 rounded">REBATE</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold text-[#454656] pt-1">
                  <span>Participation</span><span className="text-[#131B2E] font-bold">4,203 Claims</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 bg-[#001BD2] rounded-full w-[80%]"></div>
                </div>
              </div>
              {/* Campaign 2 */}
              <div className="border border-slate-100 p-4 rounded-xl flex flex-col gap-3 font-manrope bg-[#FAF8FF]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E2E7FF] flex items-center justify-center flex-shrink-0">
                      <img src="/ProductLibary/VerifyReview].svg" alt="Review" className="w-[18px] h-[18px] object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#131B2E]">Verified Review Push</span>
                      <span className="text-[10px] text-[#64748B] font-medium">No expiration</span>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-[#059669] text-[9px] font-bold px-2 py-0.5 rounded">REVIEW</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold text-[#454656] pt-1">
                  <span>Avg. Stars</span><span className="text-[#131B2E] font-bold">4.9 / 5.0</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 bg-[#004956] rounded-full w-[95%]"></div>
                </div>
              </div>
            </div>
          </div>
          {/* OCR Aliases */}
          <div className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-sm flex flex-col gap-4 w-full">
            <div>
              <h2 className="text-base font-bold text-[#131B2E]">OCR Aliases</h2>
              <p className="text-[10px] text-[#64748B] font-medium mt-1 leading-normal">Recognized variations for receipt scanning</p>
            </div>
            <div className="flex flex-wrap gap-2 py-2">
              {product.aliases.map((alias) => (
                <div key={alias} className="bg-[#F2F3FF] text-[#001BD2] px-3 py-1 rounded-full text-xs font-semibold border border-slate-100">{alias}</div>
              ))}
            </div>
            <button onClick={() => onEditAliases(product)} className="w-full h-11 bg-[#E2E7FF] hover:bg-blue-100 text-[#001BD2] font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98] font-manrope">
              + Add Alias
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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

interface ProductCardProps {
  product: Product;
  onViewDetails: (prod: Product) => void;
  onEditAliases: (prod: Product) => void;
}

export default function ProductCard({ product, onViewDetails, onEditAliases }: ProductCardProps) {
  return (
    <div className="bg-white border border-[#C5C5D9]/10 rounded-[20px] p-6 shadow-sm flex flex-col justify-between h-[420px] font-jakarta hover:shadow-md transition-shadow relative group">
      {/* Top image section */}
      <div className="relative w-full h-[180px] bg-slate-50 rounded-xl overflow-hidden mb-4">
        <img
          src={product.imageSrc}
          alt={product.name}
          className="w-full h-full object-contain"
        />
        {/* Edit Button overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEditAliases(product);
          }}
          className="absolute right-3 top-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-slate-100 hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
        >
          <img
            src="/ProductLibary/editIcon.svg"
            alt="Edit"
            className="w-[14px] h-[14px] object-contain"
          />
        </button>
      </div>

      {/* Attributes */}
      <div className="flex-grow flex flex-col gap-3 justify-between">
        <div className="flex flex-col gap-2">
          {/* Title */}
          <h3 className="text-base font-bold text-[#131B2E] tracking-tight line-clamp-1">
            {product.name}
          </h3>

          {/* Category & Tags Row */}
          <div className="flex flex-wrap gap-1.5">
            <span className="bg-[#E2E7FF] text-[#001BD2] text-[9px] font-bold px-2 py-0.5 rounded">
              {product.category}
            </span>
            <span className="bg-[#EFF6FF] text-[#2563EB] text-[9px] font-bold px-2 py-0.5 rounded">
              {product.flavor}
            </span>
            <span className="bg-[#FAF5FF] text-[#9333EA] text-[9px] font-bold px-2 py-0.5 rounded">
              {product.format}
            </span>
          </div>
        </div>

        {/* Summary Text Details */}
        <div className="flex flex-col gap-1 border-t border-slate-100 pt-3">
          <div className="flex justify-between items-center text-xs font-semibold text-[#454656]">
            <span>Aliases: {product.aliases.length}</span>
            <span className="text-[#001BD2]">
              Active Campaigns: {product.activeCampaigns}
            </span>
          </div>
        </div>

        {/* Footer Actions Link */}
        <button
          onClick={() => onViewDetails(product)}
          className="w-full flex items-center justify-between text-xs font-bold text-[#001BD2] hover:underline pt-2 cursor-pointer mt-1"
        >
          <span>View Details</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

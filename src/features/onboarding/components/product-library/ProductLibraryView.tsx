import ProductCard from "./ProductCard";

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

interface ProductLibraryViewProps {
  products: Product[];
  onViewDetails: (prod: Product) => void;
  onEditAliases: (prod: Product) => void;
  onAddNew: () => void;
}

export default function ProductLibraryView({
  products,
  onViewDetails,
  onEditAliases,
  onAddNew,
}: ProductLibraryViewProps) {
  return (
    <div className="flex flex-col gap-8 w-full animate-slide-up">
      {/* Header Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold font-jakarta text-[#131B2E]">
          Product Library
        </h1>
      </div>

      {/* Metrics Header Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#C5C5D9]/10 rounded-2xl p-6 shadow-sm flex flex-col font-jakarta">
          <span className="text-xs font-semibold text-[#454656] tracking-wider uppercase font-manrope">
            Total SKUs
          </span>
          <span className="text-[30px] font-extrabold text-[#131B2E] mt-2">
            {1279 + products.length}
          </span>
        </div>
        <div className="bg-white border border-[#C5C5D9]/10 rounded-2xl p-6 shadow-sm flex flex-col font-jakarta">
          <span className="text-xs font-semibold text-[#454656] tracking-wider uppercase font-manrope">
            Active Categories
          </span>
          <span className="text-[30px] font-extrabold text-[#131B2E] mt-2">
            12
          </span>
        </div>
        <div className="bg-white border border-[#C5C5D9]/10 rounded-2xl p-6 shadow-sm flex flex-col font-jakarta">
          <span className="text-xs font-semibold text-[#454656] tracking-wider uppercase font-manrope">
            Out of Stock
          </span>
          <span className="text-[30px] font-extrabold text-[#DC2626] mt-2">
            42
          </span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {products.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            onViewDetails={onViewDetails}
            onEditAliases={onEditAliases}
          />
        ))}

        {/* Add New Product Card */}
        <button
          onClick={onAddNew}
          className="bg-white border-2 border-dashed border-[#C5C5D9]/40 rounded-[20px] p-6 shadow-sm flex flex-col items-center justify-center gap-4 h-[420px] hover:border-[#001BD2] hover:bg-[#E2E7FF]/5 transition-colors cursor-pointer w-full group"
        >
          <div className="w-12 h-12 rounded-full bg-[#E2E7FF] text-[#001BD2] font-bold flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
            +
          </div>
          <div className="text-center font-jakarta">
            <h3 className="text-sm font-bold text-[#131B2E]">
              Add New Product
            </h3>
            <p className="text-xs text-[#64748B] font-medium mt-1">
              Manual entry or direct upload
            </p>
          </div>
        </button>
      </div>

      {/* Pagination footer */}
      <div className="flex justify-between items-center px-4 py-4 bg-[#F2F3FF] border-t border-[#C5C5D9]/5 rounded-xl font-manrope mt-4">
        <span className="text-xs font-semibold text-[#454656]">
          Showing 1 - {products.length} of {1279 + products.length} products
        </span>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-500 hover:bg-slate-50">
            ‹
          </button>
          <button className="w-8 h-8 rounded-lg bg-[#001BD2] text-white flex items-center justify-center text-xs font-bold">
            1
          </button>
          <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-500 hover:bg-slate-50">
            2
          </button>
          <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-500 hover:bg-slate-50">
            3
          </button>
          <span className="px-1 text-slate-400 text-xs">...</span>
          <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-500 hover:bg-slate-50">
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

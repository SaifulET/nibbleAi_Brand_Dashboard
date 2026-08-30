/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import ReviewsStepper from "./ReviewsStepper";
import BudgetCoordinationNote from "./BudgetCoordinationNote";
import ProductSelectCard from "./ProductSelectCard";
import ReviewsFooter from "./ReviewsFooter";

interface ProductItem {
  id: string;
  name: string;
  category: string;
  imageSrc: string;
}

interface CreateReviewStep2Props {
  initialSelectedIds: string[];
  onBack: () => void;
  onContinue: (selectedIds: string[]) => void;
}

const selectProductsList: ProductItem[] = [
  { id: "101", name: "Aura Ceramic Vase", category: "Homeware Collection", imageSrc: "/trail_mix.jpg" },
  { id: "102", name: "Swift-Step Runner", category: "Performance Gear", imageSrc: "/nitro_cold_brew.jpg" },
  { id: "103", name: "Zenith Wireless Audio", category: "Personal Electronics", imageSrc: "/lime_sparkler.jpg" },
  { id: "104", name: "Retro-Scope X1", category: "Photography Assets", imageSrc: "/trail_mix.jpg" },
  { id: "105", name: "Oracle Sunwear", category: "Fashion Accessories", imageSrc: "/nitro_cold_brew.jpg" },
  { id: "106", name: "Vital Essence Serum", category: "Health & Beauty", imageSrc: "/lime_sparkler.jpg" },
  { id: "107", name: "Chronos Smart Wear", category: "Smart Tech", imageSrc: "/trail_mix.jpg" },
  { id: "108", name: "Verdant Office Suite", category: "Sustainability Line", imageSrc: "/nitro_cold_brew.jpg" },
];

export default function CreateReviewStep2({ initialSelectedIds, onBack, onContinue }: CreateReviewStep2Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds.length > 0 ? initialSelectedIds : ["107"]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = (prodId: string) => {
    setSelectedIds(prev => prev.includes(prodId) ? prev.filter(id => id !== prodId) : [...prev, prodId]);
  };

  const filtered = selectProductsList.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full animate-slide-up text-left font-manrope">
      <ReviewsStepper activeStep={2} />
      <BudgetCoordinationNote />

      {/* Search Input */}
      <div className="w-full max-w-[509px] relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search the product library by name, SKU, or category..."
          className="w-full h-11 bg-white border border-transparent shadow-[0px_0px_0px_1px_rgba(197,197,217,0.15),0px_1px_2px_rgba(0,0,0,0.05)] rounded-xl pl-12 pr-6 text-sm focus:outline-none focus:border-[#001BD2] text-slate-800 placeholder-slate-400 font-medium"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <img src="/reviews/searchIcon.svg" alt="Search" className="w-[18px] h-[18px] object-contain" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full justify-items-center">
        {filtered.map(p => (
          <ProductSelectCard
            key={p.id}
            product={p}
            isSelected={selectedIds.includes(p.id)}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {/* Footer */}
      <ReviewsFooter
        leftElement={
          <span className="text-sm font-bold text-[#001BD2]">
            {selectedIds.length} Products Selected
          </span>
        }
        rightElement={
          <>
            <button onClick={onBack} className="text-sm font-bold text-[#001BD2] bg-transparent border-none cursor-pointer hover:underline">
              Back
            </button>
            <button
              onClick={() => onContinue(selectedIds)}
              disabled={selectedIds.length === 0}
              className={`px-8 h-11 bg-gradient-to-r from-[#001BD2] to-[#2D3FEA] hover:opacity-90 text-white font-bold text-sm rounded-full transition-all shadow-[0px_20px_25px_-5px_rgba(0,27,210,0.2)] cursor-pointer border-none flex items-center justify-center ${
                selectedIds.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Continue to Budget
            </button>
          </>
        }
      />
    </div>
  );
}

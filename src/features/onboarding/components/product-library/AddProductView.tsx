/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

interface AddProductViewProps {
  onCancel: () => void;
  onSave: (product: {
    name: string;
    description: string;
    brand: string;
    category: string;
    flavor: string;
    format: string;
    size: string;
    aliases: string[];
  }) => void;
}

export default function AddProductView({ onCancel, onSave }: AddProductViewProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("Beverages");
  const [flavor, setFlavor] = useState("");
  const [format, setFormat] = useState("");
  const [size, setSize] = useState("");
  const [aliases, setAliases] = useState<string[]>([
    "Kettle Chips",
    "Kettle Sea Salt",
    "Kettle 5oz",
    "KET SS 5Z",
  ]);
  const [aliasInput, setAliasInput] = useState("");

  const handleAddAlias = (e: React.FormEvent) => {
    e.preventDefault();
    if (aliasInput.trim() && !aliases.includes(aliasInput.trim())) {
      setAliases([...aliases, aliasInput.trim()]);
      setAliasInput("");
    }
  };

  const handleRemoveAlias = (alias: string) => {
    setAliases(aliases.filter((a) => a !== alias));
  };

  const handleSave = () => {
    if (!name) return;
    onSave({ name, description, brand, category, flavor, format, size, aliases });
  };

  return (
    <div className="flex flex-col gap-8 w-full animate-slide-up">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-manrope font-semibold">
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 cursor-pointer">
          Product Library
        </button>
        <span className="text-slate-300">&gt;</span>
        <span className="text-[#001BD2]">Add Product</span>
      </div>

      <h1 className="text-3xl font-extrabold font-jakarta text-[#131B2E] tracking-tight">
        Add New Product
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        {/* Left Column (Main Form fields) */}
        <div className="flex-grow flex flex-col gap-6 w-full lg:max-w-[65%]">
          {/* Identity */}
          <div className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-sm flex flex-col gap-6 w-full">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E2E7FF] flex items-center justify-center flex-shrink-0">
                <img
                  src="/ProductLibary/productIdentity.svg"
                  alt="Identity"
                  className="w-[18px] h-[18px] object-contain"
                />
              </div>
              <h2 className="text-base font-bold text-[#131B2E]">Product Identity</h2>
            </div>

            {/* Drag & Drop mockup */}
            <div className="border-2 border-dashed border-[#C5C5D9]/40 rounded-xl p-8 flex flex-col items-center justify-center gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                <img
                  src="/ProductLibary/dragAndDrop.svg"
                  alt="Upload"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="text-center font-manrope">
                <p className="text-sm font-bold text-[#131B2E]">Drag and drop product imagery</p>
                <p className="text-xs text-[#64748B] mt-1">High-resolution PNG or JPG. Max 5MB.</p>
              </div>
              <button className="px-4 py-2 bg-[#E2E7FF] text-[#001BD2] text-xs font-bold rounded-lg hover:bg-blue-100 active:scale-[0.98] transition-all cursor-pointer">
                Browse Files
              </button>
            </div>

            <div className="flex flex-col gap-4 font-manrope">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#454656] uppercase tracking-wider">PRODUCT NAME</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Organic Dark Roast Cold Brew"
                  className="w-full h-11 bg-white border border-slate-200/80 rounded-xl px-4 text-sm focus:outline-none focus:border-[#001BD2] text-slate-800 placeholder-slate-400 shadow-inner"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#454656] uppercase tracking-wider">PRODUCT DESCRIPTION</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the key features and benefits of this product..."
                  className="w-full bg-white border border-slate-200/80 rounded-xl p-4 text-sm focus:outline-none focus:border-[#001BD2] text-slate-800 placeholder-slate-400 shadow-inner resize-none"
                />
              </div>
            </div>
          </div>

          {/* Attributes */}
          <div className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-sm flex flex-col gap-6 w-full font-manrope">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E2E7FF] flex items-center justify-center flex-shrink-0">
                <img
                  src="/ProductLibary/coreAttribute.svg"
                  alt="Attributes"
                  className="w-[18px] h-[18px] object-contain"
                />
              </div>
              <h2 className="text-base font-bold text-[#131B2E]">Core Attributes</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#454656] uppercase tracking-wider">BRAND</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Select or enter brand"
                  className="w-full h-11 bg-white border border-slate-200/80 rounded-xl px-4 text-sm focus:outline-none focus:border-[#001BD2] text-slate-800 placeholder-slate-400 shadow-inner"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#454656] uppercase tracking-wider">CATEGORY</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 bg-white border border-slate-200/80 rounded-xl px-4 text-sm focus:outline-none focus:border-[#001BD2] text-slate-800 shadow-inner"
                >
                  <option>Beverages</option>
                  <option>Snacks</option>
                  <option>Pantry</option>
                  <option>Confectionery</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#454656] uppercase tracking-wider">FLAVOR</label>
                <input
                  type="text"
                  value={flavor}
                  onChange={(e) => setFlavor(e.target.value)}
                  placeholder="e.g. Vanilla, Spicy, Citrus"
                  className="w-full h-11 bg-white border border-slate-200/80 rounded-xl px-4 text-sm focus:outline-none focus:border-[#001BD2] text-slate-800 placeholder-slate-400 shadow-inner"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#454656] uppercase tracking-wider">FORMAT</label>
                <input
                  type="text"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  placeholder="e.g. Can, Box, Bottle"
                  className="w-full h-11 bg-white border border-slate-200/80 rounded-xl px-4 text-sm focus:outline-none focus:border-[#001BD2] text-slate-800 placeholder-slate-400 shadow-inner"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#454656] uppercase tracking-wider">SIZE / VOLUME</label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Value (e.g. 12)"
                className="w-full h-11 bg-white border border-slate-200/80 rounded-xl px-4 text-sm focus:outline-none focus:border-[#001BD2] text-slate-800 placeholder-slate-400 shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Right Column (OCR & CTA buttons) */}
        <div className="w-full lg:max-w-[35%] flex flex-col gap-6">
          <div className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-sm flex flex-col gap-4 w-full">
            <div>
              <h2 className="text-base font-bold text-[#131B2E]">OCR Aliases</h2>
              <p className="text-[10px] text-[#64748B] font-medium mt-1 leading-normal">Recognized variations for receipt scanning</p>
            </div>

            <div className="flex flex-wrap gap-2 py-2">
              {aliases.map((alias) => (
                <div key={alias} className="flex items-center gap-1.5 bg-[#F2F3FF] text-[#001BD2] px-3 py-1 rounded-full text-xs font-semibold border border-slate-100">
                  <span>{alias}</span>
                  <button type="button" onClick={() => handleRemoveAlias(alias)} className="text-[#BA1A1A] font-bold hover:scale-110 cursor-pointer">×</button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddAlias} className="flex gap-2">
              <input
                type="text"
                value={aliasInput}
                onChange={(e) => setAliasInput(e.target.value)}
                placeholder="Add new alias..."
                className="flex-1 h-9 bg-white border border-slate-200 rounded-lg px-3 text-xs focus:outline-none focus:border-[#001BD2] text-slate-800 placeholder-slate-400"
              />
              <button type="submit" className="h-9 px-3 bg-[#E2E7FF] text-[#001BD2] text-xs font-bold rounded-lg hover:bg-blue-100 active:scale-[0.98] transition-all cursor-pointer">+ Add</button>
            </form>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={handleSave}
              disabled={!name}
              className={`flex items-center justify-center w-full h-[52px] rounded-full text-white font-bold text-sm bg-[#001BD2] hover:bg-blue-700 transition-colors shadow-md active:scale-[0.98] ${!name ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              Save Product
            </button>
            <button onClick={onCancel} className="flex items-center justify-center w-full h-[52px] rounded-full bg-[#E2E7FF] text-[#001BD2] font-bold text-sm hover:bg-blue-100 transition-colors active:scale-[0.98] cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

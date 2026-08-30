"use client";

import { useState } from "react";
import { ShieldCheck, Pencil, ArrowUpRight } from "lucide-react";

export default function BrandProfileTab() {
  const [brandName, setBrandName] = useState("Nibbl Inc.");
  const [category, setCategory] = useState("Fintech & Payments");
  const [website, setWebsite] = useState("nibbl.io");
  const [email, setEmail] = useState("support@nibbl.io");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full text-left font-manrope">
      
      {/* Left Columns (Form + Visual Assets) */}
      <div className="lg:col-span-2 flex flex-col gap-8">
        
        {/* Brand Identity Card */}
        <div className="bg-white border border-[#C5C5D9]/10 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[20px] overflow-hidden">
          <div className="bg-[#F2F3FF] px-8 py-5 border-b border-[#C5C5D9]/5">
            <h3 className="font-jakarta font-bold text-sm tracking-[1.4px] text-[#454656] uppercase">
              Brand Identity
            </h3>
          </div>
          <div className="p-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#454656] uppercase tracking-wider pl-1">Brand Name</label>
                <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} className="bg-[#F2F3FF] border-none rounded-2xl px-5 py-3.5 text-sm font-semibold text-[#131B2E] outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#454656] uppercase tracking-wider pl-1">Industry Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-[#F2F3FF] border-none rounded-2xl px-5 py-3.5 text-sm font-semibold text-[#131B2E] outline-none cursor-pointer">
                  <option>Fintech & Payments</option>
                  <option>E-Commerce & Retail</option>
                  <option>Food & Beverage</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#454656] uppercase tracking-wider pl-1">Website URL</label>
              <div className="bg-[#F2F3FF] rounded-2xl flex items-center px-5 py-3.5 gap-1.5">
                <span className="text-sm font-medium text-[#757688]">https://</span>
                <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} className="bg-transparent border-none outline-none text-sm font-semibold text-[#131B2E] flex-1" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#454656] uppercase tracking-wider pl-1">Support Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[#F2F3FF] border-none rounded-2xl px-5 py-3.5 text-sm font-semibold text-[#131B2E] outline-none" />
              <span className="text-[10.5px] text-[#454656]/75 mt-0.5 pl-1 leading-none font-medium">This email will be visible to your customers in campaign footers.</span>
            </div>
          </div>
        </div>

        {/* Visual Assets Card */}
        <div className="bg-white border border-[#C5C5D9]/10 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[20px] overflow-hidden">
          <div className="bg-[#F2F3FF] px-8 py-5 border-b border-[#C5C5D9]/5">
            <h3 className="font-jakarta font-bold text-sm tracking-[1.4px] text-[#454656] uppercase">
              Visual Assets
            </h3>
          </div>
          <div className="p-8 flex flex-row items-center gap-8 flex-wrap">
            <div className="relative w-[128px] h-[128px] bg-[#001BD2]/5 border-2 border-dashed border-[#C5C5D9] rounded-[20px] flex items-center justify-center flex-shrink-0">
              <div className="w-12 h-12 bg-[#001BD2] text-white font-extrabold text-xl rounded-2xl flex items-center justify-center">N</div>
              <button className="absolute -right-2 -bottom-2 w-7 h-7 rounded-full bg-white shadow-md border-none flex items-center justify-center cursor-pointer text-[#001BD2]"><Pencil className="w-3.5 h-3.5" /></button>
            </div>
            <div className="flex flex-col gap-4 max-w-[380px]">
              <div className="flex flex-col text-left">
                <span className="font-bold text-[#131B2E] text-base">Brand Logo</span>
                <span className="text-xs text-[#454656] font-medium leading-relaxed mt-1">Upload a high-resolution logo (SVG or PNG). Recommended size is at least 512x512px.</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="bg-[#E2E7FF] hover:bg-[#D0D7FF] px-4 py-2 rounded-full text-xs font-bold text-[#001BD2] border-none cursor-pointer">Upload New</button>
                <button className="bg-transparent hover:bg-red-50 px-4 py-2 rounded-full text-xs font-bold text-[#BA1A1A] border-none cursor-pointer">Remove</button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Right Column: Standing + Logs */}
      <div className="flex flex-col gap-8">
        
        {/* Account Standing */}
        <div className="bg-gradient-to-br from-[#001BD2] to-[#2D3FEA] text-white rounded-[20px] p-6 shadow-[0px_20px_25px_-5px_rgba(0,27,210,0.1)] relative overflow-hidden min-h-[170px]">
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full filter blur-xl"></div>
          <div className="flex justify-between items-start z-10 relative">
            <ShieldCheck className="w-6 h-6 text-white/80" />
            <span className="bg-white/20 px-2.5 py-1 rounded-[8px] text-[10px] font-extrabold tracking-wider uppercase">Verified</span>
          </div>
          <div className="flex flex-col mt-7 text-left z-10 relative">
            <span className="text-xs font-medium text-white/70">Account Standing</span>
            <p className="text-[11px] text-white/95 font-semibold mt-2 leading-relaxed">Your brand profile is 92% complete. Complete the Security Audit to reach 100%.</p>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-[#F2F3FF] rounded-[20px] p-6 flex flex-col gap-6 text-left">
          <span className="text-xs font-bold text-[#454656] tracking-[1.2px] uppercase">Activity Log</span>
          <div className="flex flex-col gap-4">
            {[
              { title: "Profile updated", sub: "2 hours ago • Alex S.", color: "bg-[#4CD7F6]" },
              { title: "API Key generated", sub: "Yesterday • System", color: "bg-[#C5C5D9]" },
              { title: "Support email changed", sub: "3 days ago • Sarah L.", color: "bg-[#C5C5D9]" }
            ].map((log, i) => (
              <div key={i} className="flex gap-3 items-center">
                <div className={`w-1 h-8 rounded-full ${log.color}`}></div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-[#131B2E]">{log.title}</span>
                  <span className="text-[10px] text-[#454656] font-medium mt-0.5">{log.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

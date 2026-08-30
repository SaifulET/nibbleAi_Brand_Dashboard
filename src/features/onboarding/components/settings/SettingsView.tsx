"use client";

import { useState } from "react";
import BrandProfileTab from "./BrandProfileTab";
import TeamTab from "./TeamTab";
import SecurityTab from "./SecurityTab";
import InviteUserModal from "./InviteUserModal";
import { Search } from "lucide-react";

export default function SettingsView() {
  const [activeTabSetting, setActiveTabSetting] = useState<"Brand Profile" | "Team" | "Security">("Brand Profile");
  const [showInvite, setShowInvite] = useState(false);

  const handleSendInvite = (email: string, role: string) => {
    alert(`Invitation sent to ${email} for role: ${role}`);
  };

  return (
    <div className="flex flex-col gap-8 w-full animate-slide-up text-left font-manrope">
      
      {/* Top Header Integration with Search & Save button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4">
        
        {/* Left header area with title & search input */}
        <div className="flex items-center gap-4 flex-wrap">
          <h2 className="text-3xl font-extrabold font-jakarta text-[#131B2E] tracking-tight leading-none">
            Settings
          </h2>
          <div className="bg-[#F2F3FF] border border-[#C5C5D9]/10 rounded-full px-4 py-2 flex items-center gap-2 w-[240px] shadow-sm">
            <Search className="w-3.5 h-3.5 text-[#001BD2]" />
            <input
              type="text"
              placeholder="Search settings..."
              className="bg-transparent border-none outline-none text-xs font-semibold text-[#131B2E] placeholder-[#6B7280]/60 w-full"
            />
          </div>
        </div>

        {/* Right header save button */}
        <button className="bg-gradient-to-r from-[#001BD2] to-[#2D3FEA] hover:opacity-95 text-white font-extrabold text-sm px-8 py-2.5 rounded-full border-none cursor-pointer shadow-[0px_10px_15px_-3px_rgba(0,27,210,0.2)]">
          Save Changes
        </button>
      </div>

      {/* Settings Navigation Tabs Switcher */}
      <div className="bg-[#F2F3FF] p-1.5 rounded-full flex items-center gap-1.5 w-fit border border-[#C5C5D9]/5 relative z-10">
        {(["Brand Profile", "Team", "Security"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTabSetting(tab)}
            className={`px-6 py-2 text-xs font-bold rounded-full transition-all border-none cursor-pointer ${
              activeTabSetting === tab 
                ? "bg-white text-[#001BD2] shadow-sm" 
                : "text-[#454656] hover:text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Tab Contents */}
      <div className="w-full mt-2 relative">
        {activeTabSetting === "Brand Profile" && <BrandProfileTab />}
        {activeTabSetting === "Team" && <TeamTab onInviteClick={() => setShowInvite(true)} />}
        {activeTabSetting === "Security" && <SecurityTab />}
      </div>

      {/* Invitation Modal popup */}
      {showInvite && (
        <InviteUserModal
          onClose={() => setShowInvite(false)}
          onSend={handleSendInvite}
        />
      )}

    </div>
  );
}

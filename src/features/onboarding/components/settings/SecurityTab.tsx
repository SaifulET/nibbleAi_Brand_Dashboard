"use client";

import { useState } from "react";
import { Lock, Laptop, Phone, Monitor, ShieldCheck } from "lucide-react";

interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  time: string;
  ip: string;
  isCurrent: boolean;
}

const mockSessions: Session[] = [
  { id: "s1", device: "MacBook Pro 16\"", browser: "Chrome", location: "San Francisco, US", time: "ACTIVE NOW", ip: "192.168.1.1", isCurrent: true },
  { id: "s2", device: "iPhone 15 Pro", browser: "Safari", location: "London, UK", time: "2 HOURS AGO", ip: "192.168.1.45", isCurrent: false },
  { id: "s3", device: "Windows Workstation", browser: "Edge", location: "Berlin, DE", time: "YESTERDAY", ip: "82.12.44.102", isCurrent: false }
];

export default function SecurityTab() {
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [tfa, setTfa] = useState(false);

  const handleRevoke = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  const handleLogoutAll = () => {
    setSessions(sessions.filter(s => s.isCurrent));
  };

  return (
    <div className="flex flex-col gap-8 w-full text-left font-manrope">
      
      {/* Title Header */}
      <div className="flex flex-col gap-1 text-left w-full">
        <h2 className="font-jakarta font-extrabold text-2xl text-[#131B2E]">Protection</h2>
        <p className="text-xs text-[#454656] font-medium leading-relaxed max-w-[672px]">
          Manage your organization&apos;s gatekeeping, access tokens, and multi-layered authentication protocols for Nibbl Admin.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
        
        {/* Left column: Credentials + 2FA */}
        <div className="lg:col-span-2 flex flex-col gap-6 w-full">
          
          {/* Change Credentials Form */}
          <div className="bg-white border border-[#C5C5D9]/10 shadow-sm rounded-2xl overflow-hidden flex flex-col">
            <div className="bg-[#F2F3FF] px-8 py-5 border-b border-[#C5C5D9]/5 flex items-center gap-3">
              <Lock className="w-4 h-4 text-[#001BD2]" />
              <h3 className="font-jakarta font-bold text-sm text-[#131B2E]">Change Credentials</h3>
            </div>
            <div className="p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#454656] uppercase tracking-wider pl-1">Current Password</label>
                <input type="password" placeholder="••••••••••••" className="bg-[#F2F3FF] border border-[#C5C5D9]/15 rounded-xl px-4 py-3 text-sm outline-none text-[#131B2E]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#454656] uppercase tracking-wider pl-1">New Password</label>
                  <input type="password" placeholder="••••••••••••" className="bg-[#F2F3FF] border border-[#C5C5D9]/15 rounded-xl px-4 py-3 text-sm outline-none text-[#131B2E]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#454656] uppercase tracking-wider pl-1">Confirm New Password</label>
                  <input type="password" placeholder="••••••••••••" className="bg-[#F2F3FF] border border-[#C5C5D9]/15 rounded-xl px-4 py-3 text-sm outline-none text-[#131B2E]" />
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button className="bg-[#001BD2]/10 hover:bg-[#001BD2]/15 px-6 py-2.5 rounded-full text-sm font-bold text-[#001BD2] border-none cursor-pointer">
                  Update Key
                </button>
              </div>
            </div>
          </div>

          {/* Two-Factor Authentication Card */}
          <div className="bg-gradient-to-r from-[#001BD2] to-[#2D3FEA] text-white rounded-2xl p-6 relative overflow-hidden flex flex-row items-center justify-between gap-6 flex-wrap min-h-[120px]">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full filter blur-xl"></div>
            <div className="flex flex-col text-left max-w-[280px] z-10 relative">
              <span className="font-bold text-base">Two-Factor Authentication</span>
              <p className="text-[11px] text-[#CACDFF] font-medium leading-relaxed mt-2">Add an additional layer of security to your account by requiring more than just a password to log in.</p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-full z-10 relative">
              <span className="text-xs font-bold uppercase">{tfa ? "Protection Enabled" : "Protection Disabled"}</span>
              <button onClick={() => setTfa(!tfa)} className={`w-12 h-6 rounded-full p-1 border-none cursor-pointer transition-colors relative flex items-center ${tfa ? "bg-[#10B981]" : "bg-white/30"}`}>
                <span className={`w-4 h-4 rounded-full bg-white transition-transform ${tfa ? "translate-x-6" : "translate-x-0"}`}></span>
              </button>
            </div>
          </div>

        </div>

        {/* Right column: Active Sessions + Compliance */}
        <div className="flex flex-col gap-6 w-full">
          
          {/* Active Sessions */}
          <div className="bg-white border border-[#C5C5D9]/10 shadow-sm rounded-2xl overflow-hidden flex flex-col">
            <div className="bg-[#F2F3FF] px-8 py-5 border-b border-[#C5C5D9]/5 flex justify-between items-center w-full">
              <h3 className="font-jakarta font-bold text-sm text-[#131B2E] flex items-center gap-2">📱 Active Sessions</h3>
              <span className="bg-[#001BD2]/10 text-[#001BD2] font-bold text-[9px] px-2 py-0.5 rounded tracking-wide">{sessions.length} LIVE</span>
            </div>
            <div className="flex flex-col">
              {sessions.map((s, i) => (
                <div key={i} className="px-6 py-4 flex justify-between items-center border-b border-[#C5C5D9]/10 relative">
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-[#E2E7FF] flex items-center justify-center flex-shrink-0 text-[#001BD2]">
                      {s.device.includes("iPhone") ? <Phone className="w-5 h-5" /> : s.device.includes("MacBook") ? <Laptop className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-[#131B2E]">{s.device}</span>
                      <span className="text-[10px] text-slate-400 font-semibold mt-0.5">{s.browser} • {s.location}</span>
                      {s.isCurrent ? (
                        <span className="text-[9px] font-extrabold text-[#059669] uppercase tracking-wider mt-1 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-[#10B981]"></span> Active Now
                        </span>
                      ) : (
                        <span className="text-[9px] text-[#454656] font-semibold mt-1 uppercase tracking-wide">{s.time} • {s.ip}</span>
                      )}
                    </div>
                  </div>
                  {!s.isCurrent && (
                    <button onClick={() => handleRevoke(s.id)} className="bg-transparent border-none cursor-pointer text-xs font-bold text-[#BA1A1A] hover:underline">Revoke</button>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-[#F2F3FF] p-6 flex border-t border-[#C5C5D9]/10">
              <button onClick={handleLogoutAll} className="w-full py-2.5 bg-white border border-[#BA1A1A]/20 hover:bg-red-50 text-[#BA1A1A] font-extrabold text-xs rounded-lg flex items-center justify-center gap-1.5 cursor-pointer">
                Logout all devices
              </button>
            </div>
          </div>

          {/* Audit Transparency compliance */}
          <div className="bg-[#F2F3FF] rounded-2xl p-6 flex flex-row items-center justify-between gap-6 relative min-h-[140px] text-left">
            <div className="flex flex-col gap-2 max-w-[170px]">
              <span className="font-jakarta font-extrabold text-sm text-[#131B2E]">Audit Transparency</span>
              <p className="text-[10.5px] text-[#454656] leading-relaxed font-semibold">Immutable logs verify uptime & token access metrics.</p>
              <div className="flex gap-4 mt-2">
                <div className="flex flex-col"><span className="text-sm font-extrabold text-[#001BD2]">99.9%</span><span className="text-[8px] font-extrabold text-[#454656]/50 uppercase tracking-wider">Uptime</span></div>
                <div className="flex flex-col"><span className="text-sm font-extrabold text-[#001BD2]">AES-256</span><span className="text-[8px] font-extrabold text-[#454656]/50 uppercase tracking-wider">Encryption</span></div>
              </div>
            </div>
            <div className="w-[100px] h-[90px] bg-white border border-slate-100 shadow-sm rounded-xl flex items-center justify-center flex-shrink-0 text-[#001BD2] text-xl">🛡️</div>
          </div>

        </div>

      </div>

    </div>
  );
}

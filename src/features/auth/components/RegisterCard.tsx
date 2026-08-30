/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import StrengthBar from "./StrengthBar";
import CategoryGrid from "./CategoryGrid";

export default function RegisterCard() {
  return (
    <div className="min-h-screen w-full bg-[#FAF8FF] flex items-center justify-center p-4 py-16 md:py-24 font-jakarta">
      {/* Registration Card Wrapper */}
      <div className="w-full max-w-[576px] bg-white rounded-3xl shadow-xl p-6 md:p-10 flex flex-col gap-8 border border-slate-100/50 animate-slide-up">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative w-[194px] h-[72px]">
            <Image
              src="/Auth/LogoImage.svg"
              alt="NibblAI Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Header Title */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#131B2E] tracking-tight">
            Get started with NibblAI
          </h2>
          <p className="text-sm font-medium text-[#454656] leading-relaxed">
            Create your enterprise account and access the dashboard.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
          {/* Row 1: Full Name & Business Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#454656]">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full h-12 bg-white border border-slate-200 rounded-2xl px-4 text-sm focus:outline-none focus:border-[#001BD2] focus:ring-1 focus:ring-[#001BD2] font-manrope placeholder-slate-400"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#454656]">Business Phone</label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full h-12 bg-white border border-slate-200 rounded-2xl px-4 text-sm focus:outline-none focus:border-[#001BD2] focus:ring-1 focus:ring-[#001BD2] font-manrope placeholder-slate-400"
              />
            </div>
          </div>

          {/* Row 2: Company/Brand Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-extrabold text-[#454656]">Company/Brand name</label>
            <input
              type="text"
              placeholder="e.g. Acme Corp"
              className="w-full h-12 bg-white border border-slate-200 rounded-2xl px-4 text-sm focus:outline-none focus:border-[#001BD2] focus:ring-1 focus:ring-[#001BD2] font-manrope placeholder-slate-400"
            />
          </div>

          {/* Row 3: Website URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-extrabold text-[#454656]">Website URL</label>
            <input
              type="text"
              placeholder="www.yourbrand.com"
              className="w-full h-12 bg-white border border-slate-200 rounded-2xl px-4 text-sm focus:outline-none focus:border-[#001BD2] focus:ring-1 focus:ring-[#001BD2] font-manrope placeholder-slate-400"
            />
          </div>

          {/* Row 4: Work Email Address */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#454656]">Work Email Address</label>
            <input
              type="email"
              placeholder="john@company.com"
              className="w-full h-12 bg-white border border-slate-200 rounded-2xl px-4 text-sm focus:outline-none focus:border-[#001BD2] focus:ring-1 focus:ring-[#001BD2] font-manrope placeholder-slate-400"
            />
          </div>

          {/* Row 5: Office Location Select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#454656]">Office Location</label>
            <select className="w-full h-12 bg-white border border-slate-200 rounded-2xl px-4 text-sm focus:outline-none focus:border-[#001BD2] focus:ring-1 focus:ring-[#001BD2] font-manrope text-slate-800">
              <option>North America (Global HQ)</option>
              <option>Europe (EU HQ)</option>
              <option>Asia-Pacific (APAC HQ)</option>
              <option>Latin America (LATAM HQ)</option>
            </select>
          </div>

          {/* Row 6: Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#454656]">Password</label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full h-12 bg-white border border-slate-200 rounded-2xl px-4 text-sm focus:outline-none focus:border-[#001BD2] focus:ring-1 focus:ring-[#001BD2] font-manrope placeholder-slate-400"
            />
          </div>

          {/* Password Strength */}
          <StrengthBar />

          {/* Business Category Grid */}
          <CategoryGrid />

          {/* Acceptance Checkbox */}
          <div className="flex items-center gap-3 py-1 font-manrope">
            <input
              type="checkbox"
              id="terms"
              className="w-5 h-5 rounded-md border-slate-300 text-[#001BD2] focus:ring-[#001BD2] cursor-pointer"
            />
            <label htmlFor="terms" className="text-[13px] font-medium text-[#454656] cursor-pointer">
              I accept the{" "}
              <span className="text-[#001BD2] hover:underline">Terms and Conditions</span> and{" "}
              <span className="text-[#001BD2] hover:underline">Privacy Policy</span>
            </label>
          </div>

          {/* Create Account Button */}
          <Link
            href="/onboarding"
            className="flex items-center justify-center w-full h-[60px] rounded-full text-white font-bold text-lg bg-gradient-to-r from-[#001BD2] to-[#2D3FEA] hover:opacity-95 transition-all shadow-lg shadow-blue-600/25 active:scale-[0.98]"
          >
            Create Account
          </Link>

          {/* OR Divider */}
          <div className="flex items-center justify-center gap-4 py-1">
            <div className="h-[1px] bg-slate-200 flex-1"></div>
            <span className="text-xs font-extrabold tracking-widest text-[#757688] uppercase">
              Or
            </span>
            <div className="h-[1px] bg-slate-200 flex-1"></div>
          </div>

          {/* Google Sign Up Button */}
          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full h-12 rounded-full border border-[#001BD2]/20 hover:border-[#001BD2]/30 bg-[#E2E7FF] text-[#001BD2] font-bold text-sm transition-all duration-200 cursor-pointer"
          >
            <img
              src="/Auth/3rdPageIcons/googleIcon.svg"
              alt="Google icon"
              className="w-5 h-5 object-contain"
            />
            <span>Sign up with Google</span>
          </button>
        </form>

        {/* Footer Login Link */}
        <div className="text-center font-manrope text-sm font-medium text-[#454656]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#001BD2] font-extrabold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

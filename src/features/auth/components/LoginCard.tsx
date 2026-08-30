/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";

export default function LoginCard() {
  return (
    <div className="min-h-screen w-full bg-[#FAF8FF] flex items-center justify-center p-4 py-16 md:py-24 font-jakarta">
      {/* Login Card Wrapper */}
      <div className="w-full max-w-[448px] bg-white rounded-3xl shadow-xl p-6 md:p-10 flex flex-col gap-10 border border-slate-100/50 animate-slide-up">
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
            Welcome back
          </h2>
          <p className="text-sm font-medium text-[#454656] leading-relaxed">
            Access your enterprise dashboard
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
          {/* Email Address */}
          <div className="flex flex-col gap-1.5 font-manrope">
            <label className="text-xs font-bold text-[#454656]">Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full h-14 bg-white border border-slate-200 rounded-2xl px-4 text-sm focus:outline-none focus:border-[#001BD2] focus:ring-1 focus:ring-[#001BD2] placeholder-[#454656]/40"
            />
          </div>

          {/* Password Section */}
          <div className="flex flex-col gap-1.5 font-manrope">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-[#454656]">Password</label>
              <Link href="/reset-password" className="font-bold text-[#001BD2] hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full h-14 bg-white border border-slate-200 rounded-2xl px-4 text-sm focus:outline-none focus:border-[#001BD2] focus:ring-1 focus:ring-[#001BD2] placeholder-[#454656]/40"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-3 font-manrope">
            <input
              type="checkbox"
              id="remember"
              className="w-5 h-5 rounded-md border-slate-300 text-[#001BD2] focus:ring-[#001BD2] cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs font-semibold text-[#454656] cursor-pointer">
              Remember me for 30 days
            </label>
          </div>

          {/* Sign In Button */}
          <Link
            href="/onboarding"
            className="flex items-center justify-center w-full h-[56px] rounded-full text-white font-bold text-lg bg-gradient-to-r from-[#001BD2] to-[#2D3FEA] hover:opacity-95 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
          >
            Sign In
          </Link>

          {/* OR Divider */}
          <div className="flex items-center justify-center gap-4 py-1">
            <div className="h-[1px] bg-slate-200 flex-1"></div>
            <span className="text-xs font-extrabold tracking-widest text-[#454656] uppercase">
              Or continue with
            </span>
            <div className="h-[1px] bg-slate-200 flex-1"></div>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full h-14 rounded-full border border-slate-200 hover:bg-slate-50 text-[#131B2E] font-bold text-sm transition-all duration-200 cursor-pointer"
          >
            <img
              src="/Auth/3rdPageIcons/googleIcon.svg"
              alt="Google icon"
              className="w-5 h-5 object-contain"
            />
            <span>Sign in with Google</span>
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center font-manrope text-sm font-medium text-[#454656]">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#001BD2] font-bold hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

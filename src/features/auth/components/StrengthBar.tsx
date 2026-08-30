export default function StrengthBar() {
  return (
    <div className="w-full flex flex-col gap-2 font-manrope">
      {/* Bars Row */}
      <div className="flex gap-1.5 w-full">
        <div className="h-1 flex-1 rounded-full bg-[#001BD2]"></div>
        <div className="h-1 flex-1 rounded-full bg-[#001BD2]"></div>
        <div className="h-1 flex-1 rounded-full bg-[#001BD2]"></div>
        <div className="h-1 flex-1 rounded-full bg-[#1971d9]/20"></div>
      </div>

      {/* Strength Label */}
      <div className="flex justify-between items-center text-[10px] font-extrabold tracking-wider text-[#001BD2]">
        <span>PASSWORD STRENGTH: STRONG</span>
      </div>
    </div>
  );
}

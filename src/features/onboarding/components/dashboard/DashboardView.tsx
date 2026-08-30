import RebateSnapshot from "../rebates/RebateSnapshot";
import ReviewSnapshot from "../reviews/ReviewSnapshot";
import CampaignsTable from "../rebates/CampaignsTable";

export default function DashboardView() {
  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Welcome Message */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold font-jakarta text-[#131B2E]">
          Welcome back, Adrian
        </h1>
        <p className="text-sm font-manrope text-[#454656] font-medium">
          Here&apos;s what&apos;s happening with your campaigns today.
        </p>
      </div>

      {/* SNAPSHOTS */}
      <RebateSnapshot />
      <ReviewSnapshot />
      <CampaignsTable />
    </div>
  );
}

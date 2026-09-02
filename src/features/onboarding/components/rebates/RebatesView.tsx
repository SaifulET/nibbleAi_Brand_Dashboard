import { useState } from "react";
import RebatesLanding from "./RebatesLanding";
import CreateCampaignStep1 from "./CreateCampaignStep1";
import CreateCampaignStep2 from "./CreateCampaignStep2";
import CreateCampaignStep3 from "./CreateCampaignStep3";
import CreateCampaignStep4 from "./CreateCampaignStep4";
import CreateCampaignSuccess from "./CreateCampaignSuccess";
import AddCustomTierModal from "./AddCustomTierModal";
import { useBrandApiStore } from "@/stores/useBrandApiStore";
import { ApiRecord } from "@/lib/api/backendApi";
import { toNumber } from "../../utils/backendMappers";

interface Campaign {
  id: string;
  name: string;
  category: string;
  scope: string;
  dailyBudget: number;
  purchases: number;
  spendToday: number;
  status: "ACTIVE" | "PAUSED" | "COMPLETED";
}

interface RewardTier {
  id: string;
  name: string;
  structure: string;
  reward: string;
  maxPayout: string;
  minPurchase: string;
  allocation: number;
}

interface CampaignDraft {
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  dailyBudget?: number;
  fallback?: {
    rewardAmount: string;
    isEnabled: boolean;
    description?: string;
  };
}

const initialTiers: RewardTier[] = [
  { id: "1", name: "01 Executive Peak", structure: "Free up to X", reward: "Free", maxPayout: "20", minPurchase: "50", allocation: 20 },
  { id: "2", name: "02 Mid-Tier Value", structure: "Dollar Off", reward: "$10 off", maxPayout: "10", minPurchase: "30", allocation: 30 },
  { id: "3", name: "03 Entry Level", structure: "Percent Off", reward: "10% off", maxPayout: "5", minPurchase: "15", allocation: 50 },
  { id: "4", name: "04 BOGO Deal", structure: "BOGO", reward: "BOGO", maxPayout: "15", minPurchase: "Min 2", allocation: 0 },
];

const statusMap = (status: unknown): Campaign["status"] => {
  const value = String(status || "").toUpperCase();
  if (value === "ACTIVE" || value === "PAUSED" || value === "COMPLETED") return value;
  return "PAUSED";
};

const mapCampaign = (campaign: ApiRecord): Campaign => ({
  id: String(campaign.id),
  name: String(campaign.name ?? "Untitled rebate campaign"),
  category: String(campaign.product_name ?? "Products"),
  scope: String(campaign.description ?? "Backend campaign"),
  dailyBudget: toNumber(campaign.daily_budget),
  purchases: toNumber(campaign.approvals ?? campaign.reservations),
  spendToday: toNumber(campaign.total_spend ?? campaign.daily_budget),
  status: statusMap(campaign.status),
});

const parseRewardAmount = (reward: string) => {
  const numeric = Number(reward.replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) && numeric > 0 ? numeric : 1;
};

export default function RebatesView() {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [draftData, setDraftData] = useState<CampaignDraft>({ name: "", startDate: "", endDate: "", isActive: true });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [tiers, setTiers] = useState<RewardTier[]>(initialTiers);
  const [showAddTierModal, setShowAddTierModal] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const apiCampaigns = useBrandApiStore((state) => state.campaigns);
  const apiProducts = useBrandApiStore((state) => state.products);
  const createCampaign = useBrandApiStore((state) => state.createCampaign);

  const stepProducts = apiProducts.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
    imageSrc: product.imageSrc,
  }));
  const campaigns = apiCampaigns.map(mapCampaign);
  const selectedProducts = stepProducts.filter((p) => selectedIds.includes(p.id));

  const handleCreateNewClick = () => {
    setDraftData({ name: "", startDate: "", endDate: "", isActive: true });
    setSelectedIds(stepProducts[0] ? [stepProducts[0].id] : []);
    setTiers(initialTiers);
    setSubmitError("");
    setStep(1);
  };

  const handlePublishCampaign = async () => {
    try {
      setSubmitError("");
      await createCampaign({
        name: draftData.name || "Untitled Rebate Campaign",
        productIds: selectedIds,
        dailyBudget: draftData.dailyBudget ?? 150,
        startAt: draftData.startDate ? new Date(draftData.startDate).toISOString() : undefined,
        endAt: draftData.endDate ? new Date(draftData.endDate).toISOString() : undefined,
        isActive: draftData.isActive,
        fallback: draftData.fallback,
        tiers: tiers
          .filter((tier) => tier.allocation > 0)
          .map((tier) => ({
            rewardAmount: parseRewardAmount(tier.maxPayout || tier.reward),
            allocationPercent: tier.allocation,
          })),
      });
      setStep(5);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not publish campaign.");
    }
  };

  const handleAddTier = (newTier: Omit<RewardTier, "id">) => {
    const freshTier: RewardTier = { id: String(tiers.length + 1), ...newTier };
    setTiers([...tiers, freshTier]);
    setShowAddTierModal(false);
  };

  return (
    <div className="w-full">
      {step === 0 && (
        <RebatesLanding campaigns={campaigns} onCreateNew={handleCreateNewClick} onEditCampaign={() => setStep(1)} />
      )}
      {submitError && (
        <div className="mb-4 bg-red-50 border border-red-100 text-red-700 text-sm font-semibold rounded-xl px-4 py-3">
          {submitError}
        </div>
      )}
      {step === 1 && (
        <CreateCampaignStep1 initialData={draftData} onCancel={() => setStep(0)} onContinue={(data) => { setDraftData((current) => ({ ...current, ...data })); setStep(2); }} />
      )}
      {step === 2 && (
        <CreateCampaignStep2 products={stepProducts} initialSelectedIds={selectedIds} onBack={() => setStep(1)} onContinue={(ids) => { setSelectedIds(ids); setStep(3); }} />
      )}
      {step === 3 && (
        <CreateCampaignStep3
          tiers={tiers}
          onBack={() => setStep(2)}
          onContinue={(budgetDraft) => {
            setDraftData((current) => ({ ...current, ...budgetDraft }));
            setStep(4);
          }}
          onAddCustomTierClick={() => setShowAddTierModal(true)}
        />
      )}
      {step === 4 && (
        <CreateCampaignStep4 draftData={draftData} selectedProducts={selectedProducts} tiers={tiers} onBack={() => setStep(3)} onPublish={handlePublishCampaign} />
      )}
      {step === 5 && (
        <CreateCampaignSuccess onFinish={() => setStep(0)} />
      )}
      {showAddTierModal && (
        <AddCustomTierModal onClose={() => setShowAddTierModal(false)} onAdd={handleAddTier} />
      )}
    </div>
  );
}

import { useState } from "react";
import RebatesLanding from "./RebatesLanding";
import CreateCampaignStep1 from "./CreateCampaignStep1";
import CreateCampaignStep2 from "./CreateCampaignStep2";
import CreateCampaignStep3 from "./CreateCampaignStep3";
import CreateCampaignStep4 from "./CreateCampaignStep4";
import CreateCampaignSuccess from "./CreateCampaignSuccess";
import AddCustomTierModal from "./AddCustomTierModal";

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

const initialCampaigns: Campaign[] = [
  { id: "1", name: "Summer Splash Rebate", category: "Lifestyle Accessories", scope: "Q3 Drive", dailyBudget: 500, purchases: 124, spendToday: 342.50, status: "ACTIVE" },
  { id: "2", name: "Premium Brew Launch", category: "Beverages", scope: "National Campaign", dailyBudget: 1200, purchases: 892, spendToday: 1150.00, status: "ACTIVE" },
  { id: "3", name: "Winter Glow Skin", category: "Beauty", scope: "Pre-Season Test", dailyBudget: 250, purchases: 42, spendToday: 0, status: "PAUSED" },
];

const initialTiers: RewardTier[] = [
  { id: "1", name: "01 Executive Peak", structure: "Free up to X", reward: "Free", maxPayout: "20", minPurchase: "50", allocation: 20 },
  { id: "2", name: "02 Mid-Tier Value", structure: "Dollar Off", reward: "$10 off", maxPayout: "10", minPurchase: "30", allocation: 30 },
  { id: "3", name: "03 Entry Level", structure: "Percent Off", reward: "10% off", maxPayout: "5", minPurchase: "15", allocation: 50 },
  { id: "4", name: "04 BOGO Deal", structure: "BOGO", reward: "BOGO", maxPayout: "15", minPurchase: "Min 2", allocation: 0 },
];

const stepProducts = [
  { id: "101", name: "Aura Ceramic Vase", category: "Homeware Collection", imageSrc: "/Auth/rebateImage.svg" },
  { id: "102", name: "Swift-Step Runner", category: "Performance Gear", imageSrc: "/Auth/rebateImage.svg" },
  { id: "103", name: "Zenith Wireless Audio", category: "Personal Electronics", imageSrc: "/Auth/rebateImage.svg" },
  { id: "104", name: "Retro-Scope X1", category: "Photography Assets", imageSrc: "/Auth/rebateImage.svg" },
  { id: "105", name: "Oracle Sunwear", category: "Fashion Accessories", imageSrc: "/Auth/rebateImage.svg" },
  { id: "106", name: "Vital Essence Serum", category: "Health & Beauty", imageSrc: "/Auth/rebateImage.svg" },
  { id: "107", name: "Chronos Smart Wear", category: "Smart Tech", imageSrc: "/Auth/rebateImage.svg" },
  { id: "108", name: "Verdant Office Suite", category: "Sustainability Line", imageSrc: "/Auth/rebateImage.svg" },
];

export default function RebatesView() {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [draftData, setDraftData] = useState({ name: "", startDate: "", endDate: "", isActive: true });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [tiers, setTiers] = useState<RewardTier[]>(initialTiers);
  const [showAddTierModal, setShowAddTierModal] = useState(false);

  const selectedProducts = stepProducts.filter((p) => selectedIds.includes(p.id));

  const handleCreateNewClick = () => {
    setDraftData({ name: "", startDate: "", endDate: "", isActive: true });
    setSelectedIds(["101", "102"]); // default select vase and runner as in step 4 review screenshot
    setTiers(initialTiers);
    setStep(1);
  };

  const handlePublishCampaign = () => {
    const newCamp: Campaign = {
      id: String(campaigns.length + 1),
      name: draftData.name || "Summer Cashback 2024",
      category: "Beverages",
      scope: "Q3 Campaign Launch",
      dailyBudget: 150,
      purchases: 0,
      spendToday: 0,
      status: draftData.isActive ? "ACTIVE" : "PAUSED",
    };
    setCampaigns([newCamp, ...campaigns]);
    setStep(5);
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
      {step === 1 && (
        <CreateCampaignStep1 initialData={draftData} onCancel={() => setStep(0)} onContinue={(data) => { setDraftData(data); setStep(2); }} />
      )}
      {step === 2 && (
        <CreateCampaignStep2 initialSelectedIds={selectedIds} onBack={() => setStep(1)} onContinue={(ids) => { setSelectedIds(ids); setStep(3); }} />
      )}
      {step === 3 && (
        <CreateCampaignStep3 tiers={tiers} onBack={() => setStep(2)} onContinue={() => setStep(4)} onAddCustomTierClick={() => setShowAddTierModal(true)} />
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

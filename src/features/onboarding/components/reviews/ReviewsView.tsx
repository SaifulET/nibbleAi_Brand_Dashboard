import { useState } from "react";
import ReviewsLanding from "./ReviewsLanding";
import ReviewDetails from "./ReviewDetails";
import CreateReviewStep1 from "./CreateReviewStep1";
import CreateReviewStep2 from "./CreateReviewStep2";
import CreateReviewStep3 from "./CreateReviewStep3";
import CreateReviewStep5 from "./CreateReviewStep5";
import ReviewManagement from "../reviews-management/ReviewManagement";

interface CampaignItem {
  id: string;
  name: string;
  createdDate: string;
  status: "Active" | "Paused";
  reviews: number;
  todayReviews: number;
  spend: number;
}

const initialCampaigns: CampaignItem[] = [
  { id: "1", name: "NeoWatch Series 5 Launch", createdDate: "Oct 12, 2023", status: "Active", reviews: 482, todayReviews: 22, spend: 1108.60 },
  { id: "2", name: "Acoustic Pro Refresh", createdDate: "Nov 01, 2023", status: "Active", reviews: 295, todayReviews: 18, spend: 678.50 },
  { id: "3", name: "PureFlow Kettle Beta", createdDate: "Oct 28, 2023", status: "Paused", reviews: 154, todayReviews: 0, spend: 354.20 },
];

export default function ReviewsView() {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 5 | 6 | 7>(0);
  const [campaigns, setCampaigns] = useState<CampaignItem[]>(initialCampaigns);
  const [selectedCamp, setSelectedCamp] = useState<CampaignItem | null>(null);

  const [draft, setDraft] = useState({
    name: "",
    description: "",
    isActive: true,
    selectedIds: [] as string[],
    reward: "$2.00 Cashback",
    budget: 100,
  });

  const handleCreateNewClick = () => {
    setDraft({
      name: "",
      description: "",
      isActive: true,
      selectedIds: [],
      reward: "$2.00 Cashback",
      budget: 100,
    });
    setStep(1);
  };

  const handlePublish = () => {
    const newCamp: CampaignItem = {
      id: String(campaigns.length + 1),
      name: draft.name || "Summer Influencer Review Drive",
      createdDate: "Today",
      status: draft.isActive ? "Active" : "Paused",
      reviews: 0,
      todayReviews: 0,
      spend: 0,
    };
    setCampaigns([newCamp, ...campaigns]);
    setStep(0);
  };

  return (
    <div className="w-full">
      {step === 0 && (
        <ReviewsLanding
          campaigns={campaigns}
          onCreateNew={handleCreateNewClick}
          onViewDetail={(camp) => { setSelectedCamp(camp); setStep(6); }}
          onReviewManagement={() => setStep(7)}
        />
      )}

      {step === 1 && (
        <CreateReviewStep1
          initialData={draft}
          onCancel={() => setStep(0)}
          onContinue={(data) => { setDraft({ ...draft, ...data }); setStep(2); }}
        />
      )}

      {step === 2 && (
        <CreateReviewStep2
          initialSelectedIds={draft.selectedIds}
          onBack={() => setStep(1)}
          onContinue={(ids) => { setDraft({ ...draft, selectedIds: ids }); setStep(3); }}
        />
      )}

      {step === 3 && (
        <CreateReviewStep3
          onBack={() => setStep(2)}
          onContinue={(reward, budget) => { setDraft({ ...draft, reward, budget }); setStep(5); }}
        />
      )}

      {step === 5 && (
        <CreateReviewStep5
          draftData={{
            name: draft.name,
            description: draft.description,
            isActive: draft.isActive,
            reward: draft.reward,
            budget: draft.budget,
            selectedCount: draft.selectedIds.length,
          }}
          onBack={() => setStep(3)}
          onPublish={handlePublish}
        />
      )}

      {step === 6 && selectedCamp && (
        <ReviewDetails campaign={selectedCamp} onBack={() => setStep(0)} />
      )}

      {step === 7 && (
        <ReviewManagement onBack={() => setStep(0)} />
      )}
    </div>
  );
}

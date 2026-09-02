"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import DashboardView from "./dashboard/DashboardView";
import ProductLibraryView from "./product-library/ProductLibraryView";
import ProductDetailsView from "./product-library/ProductDetailsView";
import AddProductView from "./product-library/AddProductView";
import EditAliasesModal from "./product-library/EditAliasesModal";
import RebatesView from "./rebates/RebatesView";
import ReviewsView from "./reviews/ReviewsView";
import RedemptionsView from "./redemptions/RedemptionsView";
import SettingsView from "./settings/SettingsView";
import WalletView from "./wallet/WalletView";
import AnalyticsView from "./analytics/AnalyticsView";
import CustomersView from "./customers/CustomersView";
import { Product } from "../utils/mockData";
import { useBrandApiStore } from "@/stores/useBrandApiStore";

export default function OnboardingView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [viewMode, setViewMode] = useState<"list" | "details" | "add">("list");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    products: apiProducts,
    notifications: apiNotifications,
    loadWorkspace,
    loadProductAliases,
    createProduct,
    deleteProduct,
    updateProductAliases,
    markAllNotificationsRead,
    wallet,
    accessToken,
    refreshToken,
    selectedBrandId,
    brandApplications,
    profile,
    status,
    error,
  } = useBrandApiStore();

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      router.replace("/login");
      return;
    }
    void loadWorkspace();
  }, [accessToken, refreshToken, loadWorkspace, router]);

  if (!accessToken && !refreshToken) {
    return null;
  }

  const visibleTab = !selectedBrandId && activeTab !== "Settings" ? "Dashboard" : activeTab;

  // Callbacks
  const handleAddNew = () => setViewMode("add");
  
  const handleViewDetails = async (prod: Product) => {
    await loadProductAliases(prod.id);
    const latest = useBrandApiStore.getState().products.find((item) => item.id === prod.id);
    setSelectedProduct(latest || prod);
    setViewMode("details");
  };

  const handleEditAliases = async (prod: Product) => {
    await loadProductAliases(prod.id);
    const latest = useBrandApiStore.getState().products.find((item) => item.id === prod.id);
    setSelectedProduct(latest || prod);
    setShowEditModal(true);
  };

  const handleDeleteProduct = (prodId: string) => {
    void deleteProduct(prodId);
    setSelectedProduct(null);
    setViewMode("list");
  };

  const handleSaveProduct = async (newProd: {
    name: string;
    description: string;
    brand: string;
    category: string;
    flavor: string;
    format: string;
    size: string;
    aliases: string[];
  }) => {
    await createProduct({
      name: newProd.name,
      description: newProd.description,
      category: newProd.category,
      flavor: newProd.flavor,
      format: newProd.format,
      size_volume: newProd.size,
      sku: newProd.format || newProd.size || newProd.name,
    });
    const created = useBrandApiStore.getState().products.find((product) => product.name === newProd.name);
    if (created && newProd.aliases.length) {
      await updateProductAliases(created.id, newProd.aliases);
    }
    setViewMode("list");
  };

  const handleSaveAliases = async (updatedAliases: string[]) => {
    if (!selectedProduct) return;
    await updateProductAliases(selectedProduct.id, updatedAliases);
    const latest = useBrandApiStore.getState().products.find((product) => product.id === selectedProduct.id);
    setSelectedProduct(latest || { ...selectedProduct, aliases: updatedAliases });
    setShowEditModal(false);
  };

  return (
    <div className="flex flex-row min-h-screen bg-[#FAF8FF] font-jakarta w-full">
      <Sidebar 
        activeTab={visibleTab} 
        setActiveTab={(tab) => { setActiveTab(tab); setSidebarOpen(false); }} 
        setViewMode={setViewMode} 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        hasBrandAccess={Boolean(selectedBrandId)}
      />
      
      <div className="flex-grow min-w-0 flex flex-col relative">
        <Header
          notifications={apiNotifications}
          walletBalance={`$${String(wallet?.available ?? wallet?.balance ?? "0.00")}`}
          userName={String(profile?.full_name ?? profile?.email ?? "Brand user")}
          userRole={String(profile?.role ?? "brand")}
          avatarUrl={typeof profile?.avatar_url === "string" ? profile.avatar_url : undefined}
          handleMarkAllRead={() => {
            void markAllNotificationsRead();
          }}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 p-4 md:p-8 flex flex-col gap-12 w-full">
          {status === "error" && error && (
            <div className="bg-red-50 border border-red-100 text-red-700 text-sm font-semibold rounded-xl px-4 py-3">
              {error}
            </div>
          )}
          {!selectedBrandId && status !== "loading" ? (
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#001BD2]">
                Brand access pending
              </p>
              <h1 className="text-2xl font-extrabold text-[#131B2E] mt-2">
                Your brand workspace is not active yet.
              </h1>
              <p className="text-sm font-medium text-[#454656] leading-relaxed mt-3">
                {brandApplications.length
                  ? "Your brand application has been submitted and is waiting for admin approval."
                  : "No approved brand workspace is connected to this account yet."}
              </p>
            </div>
          ) : (
            <>
              {visibleTab === "Dashboard" && <DashboardView />}
          
              {visibleTab === "Rebate" && <RebatesView />}
          
              {visibleTab === "Reviews" && <ReviewsView />}
          
              {visibleTab === "Redemptions" && <RedemptionsView />}
          
              {visibleTab === "Settings" && <SettingsView />}

              {visibleTab === "Wallet" && <WalletView />}

              {visibleTab === "Analytics" && <AnalyticsView />}

              {visibleTab === "Customers" && <CustomersView />}
          
              {visibleTab === "Product Library" && viewMode === "list" && (
                <ProductLibraryView
                  products={apiProducts}
                  onViewDetails={handleViewDetails}
                  onEditAliases={handleEditAliases}
                  onAddNew={handleAddNew}
                />
              )}

              {visibleTab === "Product Library" && viewMode === "details" && selectedProduct && (
                <ProductDetailsView
                  product={selectedProduct}
                  onBack={() => setViewMode("list")}
                  onEditAliases={handleEditAliases}
                  onDelete={handleDeleteProduct}
                />
              )}

              {visibleTab === "Product Library" && viewMode === "add" && (
                <AddProductView
                  onCancel={() => setViewMode("list")}
                  onSave={handleSaveProduct}
                />
              )}
            </>
          )}
        </main>
      </div>

      {showEditModal && selectedProduct && (
        <EditAliasesModal
          product={selectedProduct}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveAliases}
        />
      )}
    </div>
  );
}

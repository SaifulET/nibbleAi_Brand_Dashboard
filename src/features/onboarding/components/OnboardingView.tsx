"use client";

import { useState } from "react";
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
import {
  NotificationItem,
  Product,
  initialNotifications,
  initialProducts,
} from "../utils/mockData";

export default function OnboardingView() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [viewMode, setViewMode] = useState<"list" | "details" | "add">("list");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [showEditModal, setShowEditModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Callbacks
  const handleAddNew = () => setViewMode("add");
  
  const handleViewDetails = (prod: Product) => {
    setSelectedProduct(prod);
    setViewMode("details");
  };

  const handleEditAliases = (prod: Product) => {
    setSelectedProduct(prod);
    setShowEditModal(true);
  };

  const handleDeleteProduct = (prodId: string) => {
    setProducts(products.filter((p) => p.id !== prodId));
    setSelectedProduct(null);
    setViewMode("list");
  };

  const handleSaveProduct = (newProd: {
    name: string;
    description: string;
    brand: string;
    category: string;
    flavor: string;
    format: string;
    size: string;
    aliases: string[];
  }) => {
    const freshProduct: Product = {
      id: String(products.length + 1),
      name: newProd.name,
      imageSrc: "/Auth/rebateImage.svg", // default fallback
      category: newProd.category.toUpperCase(),
      flavor: newProd.flavor.toUpperCase() || "NATURAL",
      format: newProd.format.toUpperCase() || "STANDARD",
      size: newProd.size || "Standard",
      aliases: newProd.aliases,
      activeCampaigns: 0,
    };
    setProducts([...products, freshProduct]);
    setViewMode("list");
  };

  const handleSaveAliases = (updatedAliases: string[]) => {
    if (!selectedProduct) return;
    const nextProducts = products.map((p) =>
      p.id === selectedProduct.id ? { ...p, aliases: updatedAliases } : p
    );
    setProducts(nextProducts);
    setSelectedProduct({ ...selectedProduct, aliases: updatedAliases });
    setShowEditModal(false);
  };

  return (
    <div className="flex flex-row min-h-screen bg-[#FAF8FF] font-jakarta w-full">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => { setActiveTab(tab); setSidebarOpen(false); }} 
        setViewMode={setViewMode} 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex-grow min-w-0 flex flex-col relative">
        <Header
          notifications={notifications}
          handleMarkAllRead={() => setNotifications([])}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 p-4 md:p-8 flex flex-col gap-12 w-full">
          {activeTab === "Dashboard" && <DashboardView />}
          
          {activeTab === "Rebate" && <RebatesView />}
          
          {activeTab === "Reviews" && <ReviewsView />}
          
          {activeTab === "Redemptions" && <RedemptionsView />}
          
          {activeTab === "Settings" && <SettingsView />}

          {activeTab === "Wallet" && <WalletView />}

          {activeTab === "Analytics" && <AnalyticsView />}

          {activeTab === "Customers" && <CustomersView />}
          
          {activeTab === "Product Library" && viewMode === "list" && (
            <ProductLibraryView
              products={products}
              onViewDetails={handleViewDetails}
              onEditAliases={handleEditAliases}
              onAddNew={handleAddNew}
            />
          )}

          {activeTab === "Product Library" && viewMode === "details" && selectedProduct && (
            <ProductDetailsView
              product={selectedProduct}
              onBack={() => setViewMode("list")}
              onEditAliases={handleEditAliases}
              onDelete={handleDeleteProduct}
            />
          )}

          {activeTab === "Product Library" && viewMode === "add" && (
            <AddProductView
              onCancel={() => setViewMode("list")}
              onSave={handleSaveProduct}
            />
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

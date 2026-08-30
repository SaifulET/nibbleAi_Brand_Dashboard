"use client";

import { useState } from "react";
import CustomerMetrics from "./CustomerMetrics";
import CustomerLedger, { CustomerData } from "./CustomerLedger";
import CustomerProfileView from "./CustomerProfileView";
import SuspendCustomerModal from "./SuspendCustomerModal";
import { Bell } from "lucide-react";

const initialCustomersList: CustomerData[] = [
  { id: "1", name: "Alexander Knight", memberId: "NB-9021", email: "a.knight@portfolio.com", phone: "+1 (555) 012-9921", claims: 42, rewards: "$12,482.00", status: "Active", lastActivity: "2 mins ago", avatar: "/Notification/profile1.svg" },
  { id: "2", name: "Helena Sterling", memberId: "NB-4452", email: "h.sterling@nexus.io", phone: "+44 20 7946 0124", claims: 15, rewards: "$4,290.50", status: "Active", lastActivity: "1 hour ago", avatar: "/Notification/profile1.svg" },
  { id: "3", name: "Julian Rossi", memberId: "NB-1182", email: "rossi@vanguard.co", phone: "+1 (555) 321-0012", claims: 0, rewards: "$0.00", status: "Suspended", lastActivity: "3 days ago", avatar: "/Notification/profile1.svg" },
  { id: "4", name: "Maya Thornton", memberId: "NB-7729", email: "maya.t@creative.studio", phone: "+61 2 9876 5432", claims: 8, rewards: "$2,150.75", status: "Active", lastActivity: "12 mins ago", avatar: "/Notification/profile1.svg" }
];

export default function CustomersView() {
  const [customers, setCustomers] = useState<CustomerData[]>(initialCustomersList);
  const [selectedCust, setSelectedCust] = useState<CustomerData | null>(null);
  const [modalCust, setModalCust] = useState<CustomerData | null>(null);
  const [filterTab, setFilterTab] = useState<"All" | "Active" | "Suspended">("All");

  const handleConfirmToggle = () => {
    if (!modalCust) return;
    setCustomers(prev => prev.map(c => c.id === modalCust.id ? { ...c, status: c.status === "Active" ? "Suspended" : "Active" } : c));
    if (selectedCust && selectedCust.id === modalCust.id) {
      setSelectedCust(prev => prev ? { ...prev, status: prev.status === "Active" ? "Suspended" : "Active" } : null);
    }
    setModalCust(null);
  };

  const filtered = customers.filter(c => filterTab === "All" || c.status === filterTab);

  return (
    <div className="flex flex-col gap-8 w-full animate-slide-up text-left font-manrope">
      
      {/* Upper header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4 pb-2">
        <div className="flex flex-col gap-1 text-left">
          <h2 className="text-3xl font-extrabold font-jakarta text-[#131B2E] tracking-tight leading-none">Customer Management</h2>
          <p className="text-xs text-[#454656] font-medium mt-1">Manage institutional ledgers and member status.</p>
        </div>
      </div>

      {selectedCust ? (
        <CustomerProfileView
          customer={selectedCust}
          onBack={() => setSelectedCust(null)}
          onToggleSuspend={setModalCust}
        />
      ) : (
        <div className="flex flex-col gap-8 w-full">
          {/* Filters Row */}
          <div className="bg-[#F2F3FF] p-1.5 rounded-full flex items-center gap-1.5 w-fit border border-[#C5C5D9]/5">
            {(["All", "Active", "Suspended"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-6 py-2 text-xs font-bold rounded-full transition-all border-none cursor-pointer ${
                  filterTab === tab ? "bg-white text-[#001BD2] shadow-sm" : "text-[#454656] hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <CustomerMetrics />
          
          <CustomerLedger
            customers={filtered}
            onSelectCustomer={setSelectedCust}
            onToggleSuspend={setModalCust}
          />
        </div>
      )}

      <SuspendCustomerModal
        isOpen={modalCust !== null}
        customerName={modalCust?.name || ""}
        isSuspended={modalCust?.status === "Suspended"}
        onConfirm={handleConfirmToggle}
        onClose={() => setModalCust(null)}
      />

    </div>
  );
}

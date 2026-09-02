"use client";

import { useState } from "react";
import CustomerMetrics from "./CustomerMetrics";
import CustomerLedger, { CustomerData } from "./CustomerLedger";
import CustomerProfileView from "./CustomerProfileView";
import SuspendCustomerModal from "./SuspendCustomerModal";
import { ApiRecord } from "@/lib/api/backendApi";
import { useBrandApiStore } from "@/stores/useBrandApiStore";
import { formatMoney, toNumber } from "../../utils/backendMappers";

const mapCustomer = (customer: ApiRecord): CustomerData => {
  const ref = String(customer.customer_ref ?? customer.id ?? "");
  const email = String(customer.email ?? "");
  const name = String(customer.full_name ?? (email || ref || "Anonymous customer"));
  return {
    id: ref,
    name,
    memberId: ref.slice(0, 12),
    email: email || "Hidden by plan",
    phone: "Unavailable",
    claims: toNumber(customer.redemptions),
    rewards: formatMoney(customer.total_earned),
    status: "Active",
    lastActivity: "Backend record",
    avatar: "/Notification/profile1.svg",
  };
};

export default function CustomersView() {
  const [selectedCust, setSelectedCust] = useState<CustomerData | null>(null);
  const [modalCust, setModalCust] = useState<CustomerData | null>(null);
  const [filterTab, setFilterTab] = useState<"All" | "Active" | "Suspended">("All");
  const apiCustomers = useBrandApiStore((state) => state.customers);
  const [localStatuses, setLocalStatuses] = useState<Record<string, CustomerData["status"]>>({});
  const customers = apiCustomers.map((customer) => {
    const mapped = mapCustomer(customer);
    return { ...mapped, status: localStatuses[mapped.id] || mapped.status };
  });

  const handleConfirmToggle = () => {
    if (!modalCust) return;
    setLocalStatuses((prev) => ({
      ...prev,
      [modalCust.id]: modalCust.status === "Active" ? "Suspended" : "Active",
    }));
    if (selectedCust && selectedCust.id === modalCust.id) {
      setSelectedCust(prev => prev ? { ...prev, status: prev.status === "Active" ? "Suspended" : "Active" } : null);
    }
    setModalCust(null);
  };

  const filtered = customers.filter(c => filterTab === "All" || c.status === filterTab);
  const totalClaims = customers.reduce((sum, customer) => sum + customer.claims, 0);
  const totalRewards = apiCustomers.reduce(
    (sum, customer) => sum + toNumber(customer.total_earned),
    0
  );

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

          <CustomerMetrics
            totalMembers={customers.length}
            activePercent={customers.length ? `${Math.round((customers.filter((c) => c.status === "Active").length / customers.length) * 100)}%` : "0%"}
            totalRewards={formatMoney(totalRewards)}
            averageClaims={customers.length ? (totalClaims / customers.length).toFixed(1) : "0"}
          />
          
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

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ApiError,
  ApiRecord,
  backendApi,
  apiClient,
  nibblApi,
  tokenStorage,
} from "@/lib/api/backendApi";
import { NotificationItem, Product } from "@/features/onboarding/utils/mockData";

type LoadState = "idle" | "loading" | "success" | "error";

const listResults = (response: unknown): ApiRecord[] => {
  if (Array.isArray(response)) return response as ApiRecord[];
  if (
    response &&
    typeof response === "object" &&
    Array.isArray((response as { results?: unknown }).results)
  ) {
    return (response as { results: ApiRecord[] }).results;
  }
  if (
    response &&
    typeof response === "object" &&
    Array.isArray((response as { customers?: unknown }).customers)
  ) {
    return (response as { customers: ApiRecord[] }).customers;
  }
  return [];
};

const readError = (error: unknown) =>
  error instanceof ApiError
    ? error.message
    : error instanceof TypeError
      ? "Could not reach the Nibbl API. Check your connection and API URL."
      : "Something went wrong.";

const applicationDraftKey = "nibbl-brand-application-draft";

const networkRetry = async <T>(request: () => Promise<T>, attempts = 2): Promise<T> => {
  try {
    return await request();
  } catch (error) {
    if (attempts > 1 && error instanceof TypeError) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return networkRetry(request, attempts - 1);
    }
    throw error;
  }
};

const optionalRequest = async <T>(request: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await networkRetry(request);
  } catch {
    return fallback;
  }
};

const saveApplicationDraft = (body: ApiRecord) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(applicationDraftKey, JSON.stringify(body));
};

const submitSavedApplicationDraft = async () => {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem(applicationDraftKey);
  if (!raw) return;
  const body = JSON.parse(raw) as ApiRecord;
  await apiClient.request(backendApi.brand.createApplication, { body });
  localStorage.removeItem(applicationDraftKey);
};

const mapProduct = (item: ApiRecord, index: number, fallbackBrandName = ""): Product => ({
  id: String(item.id ?? index),
  name: String(item.name ?? "Untitled product"),
  description: typeof item.description === "string" ? item.description : "",
  brand: String(
    item.brand_name ??
      (item.brand && typeof item.brand === "object"
        ? (item.brand as ApiRecord).name
        : undefined) ??
      fallbackBrandName
  ),
  imageSrc: String(item.image_url ?? item.image ?? "/Auth/rebateImage.svg"),
  category: String(item.category ?? "UNCATEGORIZED").toUpperCase(),
  flavor: String(
    item.flavor ??
      (item.attributes &&
      typeof item.attributes === "object" &&
      "flavor" in item.attributes
        ? (item.attributes as Record<string, unknown>).flavor
        : "")
  ).toUpperCase(),
  format: String(item.format ?? item.sku ?? "").toUpperCase(),
  size: String(item.size_volume ?? item.size ?? ""),
  sku: String(item.sku ?? ""),
  aliases: Array.isArray(item.aliases)
    ? item.aliases.map((alias) =>
        typeof alias === "object" && alias && "alias_text" in alias
          ? String((alias as ApiRecord).alias_text)
          : String(alias)
      )
    : [],
  aliasCount: Number(item.alias_count ?? (Array.isArray(item.aliases) ? item.aliases.length : 0)),
  aliasRecords: Array.isArray(item.aliases)
    ? item.aliases
        .filter((alias): alias is ApiRecord => Boolean(alias) && typeof alias === "object")
        .map((alias) => ({
          id: String(alias.id ?? alias.alias_text),
          alias_text: String(alias.alias_text ?? ""),
        }))
    : [],
  activeCampaigns: Number(item.active_campaigns ?? item.campaign_count ?? 0),
});

const mapNotification = (item: ApiRecord): NotificationItem => ({
  id: String(item.id ?? item.created_at ?? Math.random()),
  title: String(item.title ?? item.type ?? "Notification"),
  time: typeof item.created_at === "string" ? new Date(item.created_at).toLocaleString() : "",
  message: String(item.body ?? item.message ?? ""),
  iconSrc: "/Notification/notifications.svg",
  bgClass: "bg-[rgba(0,27,210,0.1)]",
  iconColor: "#001BD2",
});

const brandNameFromState = (state: {
  brand: ApiRecord | null;
  brands: ApiRecord[];
  selectedBrandId: string | null;
}) => {
  const selectedBrand =
    state.brand ||
    state.brands.find((brand) => String(brand.id ?? "") === state.selectedBrandId);
  return String(selectedBrand?.name ?? selectedBrand?.brand_name ?? "");
};

interface BrandApiState {
  accessToken: string | null;
  refreshToken: string | null;
  profile: ApiRecord | null;
  selectedBrandId: string | null;
  brands: ApiRecord[];
  brandApplications: ApiRecord[];
  brand: ApiRecord | null;
  wallet: ApiRecord | null;
  walletTransactions: ApiRecord[];
  products: Product[];
  campaigns: ApiRecord[];
  reviewCampaigns: ApiRecord[];
  redemptions: ApiRecord[];
  reviewQueue: ApiRecord[];
  reviews: ApiRecord[];
  customers: ApiRecord[];
  analyticsOverview: ApiRecord | null;
  analyticsCampaigns: ApiRecord[];
  analyticsProducts: ApiRecord[];
  members: ApiRecord[];
  notifications: NotificationItem[];
  status: LoadState;
  error: string | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  registerAndApply: (body: {
    fullName: string;
    email: string;
    password: string;
    brandName: string;
    website?: string;
    phone?: string;
  }) => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  resendEmailVerification: (email: string) => Promise<void>;
  loadWorkspace: () => Promise<void>;
  selectBrand: (brandId: string) => Promise<void>;
  loadProducts: (brandId?: string) => Promise<void>;
  loadProductAliases: (productId: string) => Promise<void>;
  createProduct: (body: ApiRecord | FormData) => Promise<Product>;
  updateProduct: (productId: string, body: ApiRecord | FormData) => Promise<void>;
  updateProductAliases: (productId: string, aliases: string[]) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  createCampaign: (body: {
    name: string;
    description?: string;
    productIds: string[];
    dailyBudget: string | number;
    startAt?: string;
    endAt?: string;
    isActive?: boolean;
    tiers?: { rewardAmount: string | number; allocationPercent: string | number }[];
    fallback?: { rewardAmount: string | number; isEnabled: boolean; description?: string };
  }) => Promise<void>;
  updateCampaign: (campaignId: string, body: {
    name: string;
    description?: string;
    dailyBudget: string | number;
    startAt?: string;
    endAt?: string;
    isActive?: boolean;
    tiers?: { rewardAmount: string | number; allocationPercent: string | number }[];
    fallback?: { rewardAmount: string | number; isEnabled: boolean; description?: string };
  }) => Promise<void>;
  createReviewCampaign: (body: {
    name: string;
    description?: string;
    productIds: string[];
    dailyBudget: string | number;
    rewardAmount?: string | number;
    isActive?: boolean;
  }) => Promise<void>;
  approveReviewQueueItem: (itemId: string) => Promise<void>;
  declineReviewQueueItem: (itemId: string, reason: string) => Promise<void>;
  updateBrandProfile: (body: ApiRecord) => Promise<void>;
  inviteMember: (email: string, role: string) => Promise<void>;
  removeMember: (membershipId: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  fundWallet: (amount: string, idempotencyKey: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useBrandApiStore = create<BrandApiState>()(
  persist(
    (set, get) => ({
      accessToken: tokenStorage.getAccess(),
      refreshToken: tokenStorage.getRefresh(),
      profile: null,
      selectedBrandId: null,
      brands: [],
      brandApplications: [],
      brand: null,
      wallet: null,
      walletTransactions: [],
      products: [],
      campaigns: [],
      reviewCampaigns: [],
      redemptions: [],
      reviewQueue: [],
      reviews: [],
      customers: [],
      analyticsOverview: null,
      analyticsCampaigns: [],
      analyticsProducts: [],
      members: [],
      notifications: [],
      status: "idle",
      error: null,
      login: async (email, password, rememberMe = false) => {
        set({ status: "loading", error: null });
        try {
          const tokens = await nibblApi.login({
            email: email.trim().toLowerCase(),
            password,
            remember_me: rememberMe,
          });
          tokenStorage.set(tokens.access, tokens.refresh);
          const profile = tokens.user || (await nibblApi.me());
          try {
            await submitSavedApplicationDraft();
          } catch {
            // Email verification or approval gating can block this until a later login.
          }
          set({
            accessToken: tokens.access,
            refreshToken: tokens.refresh,
            profile,
            status: "success",
          });
        } catch (error) {
          set({ status: "error", error: readError(error) });
          throw error;
        }
      },
      registerAndApply: async ({ fullName, email, password, brandName, website, phone }) => {
        set({ status: "loading", error: null });
        try {
          await nibblApi.register({
            full_name: fullName,
            email: email.trim().toLowerCase(),
            password,
            role: "consumer",
            accept_terms: true,
          });
          saveApplicationDraft({
            brand_name: brandName,
            contact_email: email,
            website,
            message: phone ? `Business phone: ${phone}` : "",
          });
          set({ status: "success" });
        } catch (error) {
          set({ status: "error", error: readError(error) });
          throw error;
        }
      },
      verifyEmail: async (email, code) => {
        set({ status: "loading", error: null });
        try {
          await nibblApi.verifyEmail({ email: email.trim().toLowerCase(), code: code.trim() });
          set({ status: "success" });
        } catch (error) {
          set({ status: "error", error: readError(error) });
          throw error;
        }
      },
      resendEmailVerification: async (email) => {
        set({ status: "loading", error: null });
        try {
          await nibblApi.resendEmailVerification(email.trim().toLowerCase());
          set({ status: "success" });
        } catch (error) {
          set({ status: "error", error: readError(error) });
          throw error;
        }
      },
      loadWorkspace: async () => {
        set({ status: "loading", error: null });
        try {
          const [profile, brandsResponse, applicationsResponse, notificationsResponse] = await Promise.all([
            networkRetry(() => nibblApi.me()),
            networkRetry(() => apiClient.request<unknown>(backendApi.brand.brands)),
            optionalRequest(
              () => apiClient.request<unknown>(backendApi.brand.applications),
              []
            ),
            optionalRequest(() => nibblApi.notifications({ unread: true }), []),
          ]);
          const brands = listResults(brandsResponse);
          const selectedBrandId = get().selectedBrandId || String(brands[0]?.id ?? "");
          set({
            profile,
            brands,
            brandApplications: listResults(applicationsResponse),
            selectedBrandId: selectedBrandId || null,
            notifications: listResults(notificationsResponse).map(mapNotification),
          });
          if (selectedBrandId) await get().selectBrand(selectedBrandId);
          set({ status: "success" });
        } catch (error) {
          set({ status: "error", error: readError(error) });
        }
      },
      selectBrand: async (brandId) => {
        set({ selectedBrandId: brandId });
        const [
          brand,
          wallet,
          walletTransactions,
          products,
          campaigns,
          reviewCampaigns,
          redemptions,
          reviewQueue,
          reviews,
          customers,
          analyticsOverview,
          analyticsCampaigns,
          analyticsProducts,
          members,
        ] =
          await Promise.all([
            networkRetry(() => apiClient.request<ApiRecord>(backendApi.brand.brandDetail(brandId))),
            optionalRequest(() => apiClient.request<ApiRecord>(backendApi.brand.wallet(brandId)), {}),
            optionalRequest(() => apiClient.request<unknown>(backendApi.brand.walletTransactions(brandId)), []),
            networkRetry(() => apiClient.request<unknown>(backendApi.brand.products(brandId))),
            optionalRequest(() => apiClient.request<unknown>(backendApi.brand.campaigns(brandId)), []),
            optionalRequest(() => apiClient.request<unknown>(backendApi.brand.reviewCampaigns(brandId)), []),
            optionalRequest(() => apiClient.request<unknown>(backendApi.brand.redemptions(brandId)), []),
            optionalRequest(() => apiClient.request<unknown>(backendApi.brand.reviewQueue(brandId)), []),
            optionalRequest(() => apiClient.request<unknown>(backendApi.brand.reviews(brandId)), []),
            optionalRequest(() => apiClient.request<unknown>(backendApi.brand.customers(brandId)), []),
            optionalRequest(() => apiClient.request<ApiRecord>(backendApi.brand.analyticsOverview(brandId)), {}),
            optionalRequest(() => apiClient.request<unknown>(backendApi.brand.analyticsCampaigns(brandId)), []),
            optionalRequest(() => apiClient.request<unknown>(backendApi.brand.analyticsProducts(brandId)), []),
            optionalRequest(() => apiClient.request<unknown>(backendApi.brand.members(brandId)), []),
          ]);
        set({
          brand,
          wallet,
          walletTransactions: listResults(walletTransactions),
          products: listResults(products).map((product, index) =>
            mapProduct(product, index, String(brand.name ?? brand.brand_name ?? ""))
          ),
          campaigns: listResults(campaigns),
          reviewCampaigns: listResults(reviewCampaigns),
          redemptions: listResults(redemptions),
          reviewQueue: listResults(reviewQueue),
          reviews: listResults(reviews),
          customers: listResults(customers),
          analyticsOverview,
          analyticsCampaigns: listResults(analyticsCampaigns),
          analyticsProducts: listResults(analyticsProducts),
          members: listResults(members),
        });
      },
      loadProducts: async (brandId = get().selectedBrandId || undefined) => {
        if (!brandId) return;
        const response = await apiClient.request<unknown>(backendApi.brand.products(brandId));
        const brandName = brandNameFromState(get());
        set({
          products: listResults(response).map((product, index) =>
            mapProduct(product, index, brandName)
          ),
        });
      },
      loadProductAliases: async (productId) => {
        const brandId = get().selectedBrandId;
        if (!brandId) return;
        const response = await apiClient.request<unknown>(
          backendApi.brand.productAliases(brandId, productId)
        );
        const aliasRecords = listResults(response).map((alias) => ({
          id: String(alias.id ?? alias.alias_text),
          alias_text: String(alias.alias_text ?? ""),
        }));
        set({
          products: get().products.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  aliases: aliasRecords.map((alias) => alias.alias_text),
                  aliasRecords,
                }
              : product
          ),
        });
      },
      createProduct: async (body) => {
        const brandId = get().selectedBrandId;
        if (!brandId) throw new Error("Select a brand before creating products.");
        const response = await apiClient.request<ApiRecord>(
          backendApi.brand.createProduct(brandId),
          { body }
        );
        await get().loadProducts(brandId);
        return mapProduct(response, get().products.length, brandNameFromState(get()));
      },
      updateProduct: async (productId, body) => {
        const brandId = get().selectedBrandId;
        if (!brandId) throw new Error("Select a brand before editing products.");
        await apiClient.request(backendApi.brand.updateProduct(brandId, productId), { body });
        await get().loadProducts(brandId);
      },
      updateProductAliases: async (productId, aliases) => {
        const brandId = get().selectedBrandId;
        if (!brandId) throw new Error("Select a brand before editing aliases.");
        const product = get().products.find((item) => item.id === productId);
        const existing = product?.aliasRecords || [];
        const normalized = new Set(aliases.map((alias) => alias.trim()).filter(Boolean));
        const existingByText = new Map(
          existing.map((alias) => [alias.alias_text.trim().toLowerCase(), alias])
        );

        await Promise.all(
          aliases
            .map((alias) => alias.trim())
            .filter((alias) => alias && !existingByText.has(alias.toLowerCase()))
            .map((alias) =>
              apiClient.request(backendApi.brand.createProductAlias(brandId, productId), {
                body: { alias_text: alias },
              })
            )
        );

        await Promise.all(
          existing
            .filter((alias) => !normalized.has(alias.alias_text))
            .map((alias) =>
              apiClient.request(
                backendApi.brand.deleteProductAlias(brandId, productId, alias.id)
              )
            )
        );

        await get().loadProductAliases(productId);
      },
      deleteProduct: async (productId) => {
        const brandId = get().selectedBrandId;
        if (!brandId) throw new Error("Select a brand before deleting products.");
        await apiClient.request(backendApi.brand.deleteProduct(brandId, productId));
        await get().loadProducts(brandId);
      },
      createCampaign: async ({
        name,
        description = "",
        productIds,
        dailyBudget,
        startAt,
        endAt,
        isActive = true,
        tiers = [],
        fallback,
      }) => {
        const brandId = get().selectedBrandId;
        if (!brandId) throw new Error("Select a brand before creating campaigns.");
        const campaign = await apiClient.request<ApiRecord>(
          backendApi.brand.createCampaign(brandId),
          {
            body: {
              name,
              description,
              product: productIds,
              daily_budget: String(dailyBudget),
              start_at: startAt || null,
              end_at: endAt || null,
            },
          }
        );
        const campaignId = String(campaign.id);
        const tierPayload = tiers.length
          ? tiers
          : [{ rewardAmount: "5.00", allocationPercent: "100.00" }];
        await apiClient.request(backendApi.brand.setCampaignTiers(brandId, campaignId), {
          body: {
            tiers: tierPayload.map((tier) => ({
              reward_amount: String(tier.rewardAmount),
              allocation_percent: String(tier.allocationPercent),
            })),
          },
        });
        if (fallback) {
          await apiClient.request(backendApi.brand.setCampaignFallback(brandId, campaignId), {
            body: {
              reward_amount: String(fallback.rewardAmount),
              is_enabled: fallback.isEnabled,
              description: fallback.description || "",
            },
          });
        }
        if (isActive) {
          await apiClient.request(backendApi.brand.activateCampaign(brandId, campaignId));
        }
        const campaigns = await apiClient.request<unknown>(
          backendApi.brand.campaigns(brandId)
        );
        set({ campaigns: listResults(campaigns) });
      },
      updateCampaign: async (
        campaignId,
        {
          name,
          description = "",
          dailyBudget,
          startAt,
          endAt,
          isActive = true,
          tiers = [],
          fallback,
        }
      ) => {
        const brandId = get().selectedBrandId;
        if (!brandId) throw new Error("Select a brand before editing campaigns.");
        const currentCampaign = get().campaigns.find(
          (campaign) => String(campaign.id ?? "") === campaignId
        );
        const currentStatus = String(currentCampaign?.status ?? "").toLowerCase();
        await apiClient.request(backendApi.brand.updateCampaign(brandId, campaignId), {
          body: {
            name,
            description,
            daily_budget: String(dailyBudget),
            start_at: startAt || null,
            end_at: endAt || null,
          },
        });
        if (tiers.length) {
          await apiClient.request(backendApi.brand.setCampaignTiers(brandId, campaignId), {
            body: {
              tiers: tiers.map((tier) => ({
                reward_amount: String(tier.rewardAmount),
                allocation_percent: String(tier.allocationPercent),
              })),
            },
          });
        }
        if (fallback) {
          await apiClient.request(backendApi.brand.setCampaignFallback(brandId, campaignId), {
            body: {
              reward_amount: String(fallback.rewardAmount),
              is_enabled: fallback.isEnabled,
              description: fallback.description || "",
            },
          });
        }
        if (isActive && currentStatus !== "active") {
          await apiClient.request(backendApi.brand.activateCampaign(brandId, campaignId));
        } else if (!isActive && currentStatus === "active") {
          await apiClient.request(backendApi.brand.pauseCampaign(brandId, campaignId));
        }
        const campaigns = await apiClient.request<unknown>(
          backendApi.brand.campaigns(brandId)
        );
        set({ campaigns: listResults(campaigns) });
      },
      createReviewCampaign: async ({
        name,
        description = "",
        productIds,
        dailyBudget,
        rewardAmount,
        isActive = true,
      }) => {
        const brandId = get().selectedBrandId;
        if (!brandId) throw new Error("Select a brand before creating review campaigns.");
        const campaign = await apiClient.request<ApiRecord>(
          backendApi.brand.createReviewCampaign(brandId),
          {
            body: {
              name,
              daily_budget: String(dailyBudget),
              reward_amount: rewardAmount ? String(rewardAmount) : undefined,
              product_context: description,
              product_ids: productIds,
            },
          }
        );
        const campaignId = String(campaign.id);
        await apiClient.request(
          backendApi.brand.generateReviewCampaignPrompts(brandId, campaignId),
          { body: { count: 4 } }
        );
        if (isActive) {
          await apiClient.request(
            backendApi.brand.activateReviewCampaign(brandId, campaignId)
          );
        }
        const reviewCampaigns = await apiClient.request<unknown>(
          backendApi.brand.reviewCampaigns(brandId)
        );
        set({ reviewCampaigns: listResults(reviewCampaigns) });
      },
      approveReviewQueueItem: async (itemId) => {
        const brandId = get().selectedBrandId;
        if (!brandId) throw new Error("Select a brand before approving reviews.");
        await apiClient.request(backendApi.brand.approveReviewQueueItem(brandId, itemId));
        const [reviewQueue, redemptions] = await Promise.all([
          apiClient.request<unknown>(backendApi.brand.reviewQueue(brandId)),
          apiClient.request<unknown>(backendApi.brand.redemptions(brandId)),
        ]);
        set({
          reviewQueue: listResults(reviewQueue),
          redemptions: listResults(redemptions),
        });
      },
      declineReviewQueueItem: async (itemId, reason) => {
        const brandId = get().selectedBrandId;
        if (!brandId) throw new Error("Select a brand before declining reviews.");
        await apiClient.request(backendApi.brand.declineReviewQueueItem(brandId, itemId), {
          body: { reason },
        });
        const reviewQueue = await apiClient.request<unknown>(
          backendApi.brand.reviewQueue(brandId)
        );
        set({ reviewQueue: listResults(reviewQueue) });
      },
      updateBrandProfile: async (body) => {
        const brandId = get().selectedBrandId;
        if (!brandId) throw new Error("Select a brand before updating profile.");
        const brand = await apiClient.request<ApiRecord>(
          backendApi.brand.updateBrand(brandId),
          { body }
        );
        set({ brand });
      },
      inviteMember: async (email, role) => {
        const brandId = get().selectedBrandId;
        if (!brandId) throw new Error("Select a brand before inviting members.");
        await apiClient.request(backendApi.brand.addMember(brandId), {
          body: {
            email,
            role: role.toLowerCase() === "admin" ? "admin" : "member",
          },
        });
        const members = await apiClient.request<unknown>(backendApi.brand.members(brandId));
        set({ members: listResults(members) });
      },
      removeMember: async (membershipId) => {
        const brandId = get().selectedBrandId;
        if (!brandId) throw new Error("Select a brand before removing members.");
        await apiClient.request(backendApi.brand.removeMember(brandId, membershipId));
        set({
          members: get().members.filter((member) => String(member.id) !== membershipId),
        });
      },
      changePassword: async (currentPassword, newPassword) => {
        await nibblApi.changePassword({
          current_password: currentPassword,
          new_password: newPassword,
        });
      },
      fundWallet: async (amount, idempotencyKey) => {
        const brandId = get().selectedBrandId;
        if (!brandId) throw new Error("Select a brand before funding wallet.");
        await apiClient.request(backendApi.brand.fundWallet(brandId), {
          body: { amount, idempotency_key: idempotencyKey },
        });
        const [wallet, transactions] = await Promise.all([
          apiClient.request<ApiRecord>(backendApi.brand.wallet(brandId)),
          apiClient.request<unknown>(backendApi.brand.walletTransactions(brandId)),
        ]);
        set({ wallet, walletTransactions: listResults(transactions) });
      },
      markAllNotificationsRead: async () => {
        await nibblApi.markAllNotificationsRead();
        set({ notifications: [] });
      },
      logout: async () => {
        const refresh = tokenStorage.getRefresh();
        if (refresh) {
          try {
            await nibblApi.logout(refresh);
          } catch {
            // Local token cleanup still needs to happen if the network call fails.
          }
        }
        tokenStorage.clear();
        set({
          accessToken: null,
          refreshToken: null,
          profile: null,
          selectedBrandId: null,
          brands: [],
          brandApplications: [],
          brand: null,
          wallet: null,
          walletTransactions: [],
          products: [],
          campaigns: [],
          reviewCampaigns: [],
          redemptions: [],
          reviewQueue: [],
          reviews: [],
          customers: [],
          analyticsOverview: null,
          analyticsCampaigns: [],
          analyticsProducts: [],
          members: [],
          notifications: [],
        });
      },
    }),
    {
      name: "nibbl-brand-api",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        selectedBrandId: state.selectedBrandId,
      }),
    }
  )
);

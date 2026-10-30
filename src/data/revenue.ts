import type { BranchId } from "./branches.ts";

export const WEEK_DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const;

export const weeklyRevenue: Record<BranchId, number[]> = {
  alagbado: [112000, 128000, 98000, 146000, 172000, 198000, 121000],
  ipaja:    [84_000, 96_000, 81_000, 118000, 139000, 161000, 94_000],
  isashi:   [61_000, 71_000, 68_000, 94_000, 112000, 133000, 76_000],
};

export const kpis = {
  activeMembers:  { alagbado: 486, ipaja: 412, isashi: 350 } as Record<BranchId, number>,
  capacity:       { alagbado: 320, ipaja: 480, isashi: 260 } as Record<BranchId, number>,
  checkInsToday:  { alagbado: 74,  ipaja: 63,  isashi: 49  } as Record<BranchId, number>,
  revenueToday:   { alagbado: 312600, ipaja: 205400, isashi: 178900 } as Record<BranchId, number>,
  monthlyRevenue: { alagbado: 7400000, ipaja: 5900000, isashi: 4300000 } as Record<BranchId, number>,
  expiringCount:  { alagbado: 38, ipaja: 29, isashi: 22 } as Record<BranchId, number>,
  expiringRevenue:{ alagbado: 760000, ipaja: 580000, isashi: 440000 } as Record<BranchId, number>,
  newThisMonth:   { alagbado: 41, ipaja: 33, isashi: 28 } as Record<BranchId, number>,
  growthToday:    { alagbado: 12, ipaja: 9,  isashi: 16 } as Record<BranchId, number>,
  growthMonth:    { alagbado: 8,  ipaja: 11, isashi: 6  } as Record<BranchId, number>,
};

/** Plan mix: number of active members per plan type, per branch */
export const planMix: Record<BranchId, Record<"DAY" | "MONTHLY" | "QUARTERLY" | "ANNUAL", number>> = {
  alagbado: { DAY: 28,  MONTHLY: 241, QUARTERLY: 112, ANNUAL: 105 },
  ipaja:    { DAY: 34,  MONTHLY: 198, QUARTERLY: 96,  ANNUAL: 84  },
  isashi:   { DAY: 19,  MONTHLY: 172, QUARTERLY: 88,  ANNUAL: 71  },
};

export function totalActive(): number {
  return kpis.activeMembers.alagbado + kpis.activeMembers.ipaja + kpis.activeMembers.isashi;
}

export function totalRevenueToday(): number {
  return kpis.revenueToday.alagbado + kpis.revenueToday.ipaja + kpis.revenueToday.isashi;
}

export function totalMonthlyRevenue(): number {
  return kpis.monthlyRevenue.alagbado + kpis.monthlyRevenue.ipaja + kpis.monthlyRevenue.isashi;
}
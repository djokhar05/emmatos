import { cn } from "../lib/cn.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthed } from "../lib/auth.ts";
import { useBranch } from "../lib/store.tsx";
import { kpis, totalActive, totalRevenueToday, totalMonthlyRevenue } from "../data/revenue.ts";
import { BRANCH_COLORS } from "../data/branches.ts";
import type { BranchId } from "../data/branches.ts";
import { AdminNavRail } from "../components/admin/Rail.tsx";
import { AdminTopBar } from "../components/admin/TopBar.tsx";
import { KpiCard, type KpiData } from "../components/admin/KpiCard.tsx";
import { RevenueChart } from "../components/admin/RevenueChart.tsx";
import { CheckinsFeed } from "../components/admin/CheckinsFeed.tsx";
import { BranchPerformance } from "../components/admin/BranchPerformance.tsx";
import { MembersTable } from "../components/admin/MembersTable.tsx";

export function AdminDashboard() {
  const nav = useNavigate();
  const { branch } = useBranch();

  useEffect(() => {
    if (!isAuthed()) nav("/admin/login");
  }, [nav]);

  /* ── KPI helpers ───────────────────────────── */
  const br = branch as BranchId;
  const isSingle = branch !== "all" && br !== undefined;
  const color = isSingle ? BRANCH_COLORS[br] : undefined;

  const kpiActive: KpiData = {
    label: "Active Members",
    current: isSingle ? kpis.activeMembers[br] : totalActive(),
    previous: isSingle ? Math.round(kpis.activeMembers[br] * 0.91) : Math.round(totalActive() * 0.93),
    format: "number",
    color,
  };
  const totalExpiring = Object.values(kpis.expiringCount).reduce((a, b) => a + b, 0);
  const totalMonthly  = totalMonthlyRevenue();
  const totalMembers  = totalActive();

  const kpiCheckins: KpiData = {
    label: "Check-ins Today",
    current: isSingle ? kpis.checkInsToday[br] : Object.values(kpis.checkInsToday).reduce((a, b) => a + b, 0),
    previous: undefined,
    format: "number",
    color,
  };
  const kpiExpiring: KpiData = {
    label: "Expiring Soon",
    current: isSingle ? kpis.expiringCount[br] : totalExpiring,
    previous: undefined,
    format: "number",
    color: isSingle ? color : "#E6352B",
    alert: true,
  };
  const kpiRpm: KpiData = {
    label: "Rev / Member",
    current: isSingle
      ? Math.round(kpis.monthlyRevenue[br] / kpis.activeMembers[br])
      : Math.round(totalMonthly / totalMembers),
    previous: isSingle
      ? Math.round((kpis.monthlyRevenue[br] * 0.92) / (kpis.activeMembers[br] * 0.91))
      : Math.round((totalMonthly * 0.93) / (totalMembers * 0.93)),
    format: "naira",
    color,
  };
  const kpiRevenueToday: KpiData = {
    label: "Today Revenue",
    current: isSingle ? kpis.revenueToday[br] : totalRevenueToday(),
    previous: isSingle ? Math.round(kpis.revenueToday[br] * 0.88) : Math.round(totalRevenueToday() * 0.9),
    format: "naira",
    color,
  };
  const kpiRevenueMonth: KpiData = {
    label: "Monthly Revenue",
    current: isSingle ? kpis.monthlyRevenue[br] : totalMonthlyRevenue(),
    previous: isSingle ? Math.round(kpis.monthlyRevenue[br] * 0.92) : Math.round(totalMonthlyRevenue() * 0.93),
    format: "naira",
    color,
  };

  return (
    <div className={cn("flex min-h-screen bg-ink")}>
      <AdminNavRail />

      <main
        className={cn(
          "min-w-0 w-full flex-1 ml-0 px-3 pt-[112px] pb-6 sm:px-4 lg:ml-64 lg:w-auto lg:p-6",
          "flex flex-col gap-4",
        )}
      >
        <AdminTopBar />

        {/* KPI row */}
        <div
          className={cn("grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3 lg:gap-4 xl:grid-cols-6")}
          style={{ animation: "enter-slide-up 800ms 0.1s both" }}
        >
          <KpiCard data={kpiActive} />
          <KpiCard data={kpiCheckins} />
          <KpiCard data={kpiRevenueToday} />
          <KpiCard data={kpiRevenueMonth} />
          <KpiCard data={kpiExpiring} />
          <KpiCard data={kpiRpm} />
        </div>

        {/* Chart + Feed row */}
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-4",
          )}
          style={{ animation: "enter-slide-up 800ms 0.2s both" }}
        >
          <RevenueChart />
          <CheckinsFeed />
        </div>

        {/* Branch-level operating performance */}
        <div style={{ animation: "enter-slide-up 800ms 0.3s both" }}>
          <BranchPerformance />
        </div>

        {/* Members table */}
        <div style={{ animation: "enter-slide-up 800ms 0.4s both" }}>
          <MembersTable />
        </div>
      </main>
    </div>
  );
}
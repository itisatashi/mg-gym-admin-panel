import { useState } from "react";
import { HiBanknotes } from "react-icons/hi2";

import { useAllMembers } from "./useAllMembers";
import { useAllDailyVisits } from "./useAllDailyVisits";
import { useSettings } from "../settings/useSettings";
import { PLAN_TYPES } from "../../helpers/planTypes";
import Spinner from "../../ui/Spinner";

const DATE_FILTERS = [
  { value: "all", label: "All Time" },
  { value: "this_month", label: "This Month" },
  { value: "last_month", label: "Last Month" },
  { value: "last_3_months", label: "Last 3 Months" },
  { value: "this_year", label: "This Year" },
];

const PLAN_COLORS = {
  "1_month": "from-indigo-500 to-purple-500",
  "2_month": "from-violet-500 to-fuchsia-500",
  "3_month": "from-cyan-500 to-blue-500",
  "6_month": "from-green-500 to-emerald-500",
  "1_year": "from-amber-500 to-orange-500",
};

function getDateRange(filter) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  switch (filter) {
    case "this_month":
      return {
        from: new Date(year, month, 1).toISOString().split("T")[0],
        to: new Date(year, month + 1, 0).toISOString().split("T")[0],
      };
    case "last_month":
      return {
        from: new Date(year, month - 1, 1).toISOString().split("T")[0],
        to: new Date(year, month, 0).toISOString().split("T")[0],
      };
    case "last_3_months":
      return {
        from: new Date(year, month - 2, 1).toISOString().split("T")[0],
        to: now.toISOString().split("T")[0],
      };
    case "this_year":
      return {
        from: `${year}-01-01`,
        to: now.toISOString().split("T")[0],
      };
    default:
      return { from: null, to: null };
  }
}

function formatUZS(amount) {
  return amount.toLocaleString() + " UZS";
}

function RevenueOverview() {
  const { members, isLoading: isLoadingMembers } = useAllMembers();
  const { dailyVisits, isLoading: isLoadingVisits } = useAllDailyVisits();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const [dateFilter, setDateFilter] = useState("all");

  if (isLoadingMembers || isLoadingSettings || isLoadingVisits)
    return <Spinner size={60} />;

  // Filter members by startDate within selected range
  const { from, to } = getDateRange(dateFilter);
  const filteredMembers = from
    ? members?.filter((m) => m.startDate >= from && m.startDate <= to)
    : members || [];

  // Filter daily visits by date within selected range
  const filteredVisits = from
    ? dailyVisits?.filter((v) => v.date >= from && v.date <= to)
    : dailyVisits || [];

  // Calculate revenue per plan type
  const planRevenue = PLAN_TYPES.map((plan) => {
    const count = filteredMembers.filter(
      (m) => m.planType === plan.value,
    ).length;
    const price = Number(settings?.[`price_${plan.value}`]) || 0;

    return { ...plan, count, price, revenue: count * price };
  });

  // Calculate daily visit revenue
  const dayPassRevenue = filteredVisits.reduce(
    (sum, v) => sum + (v.amount || 25000),
    0,
  );
  const dayPassCount = filteredVisits.length;

  const totalRevenue =
    planRevenue.reduce((sum, p) => sum + p.revenue, 0) + dayPassRevenue;
  const totalMembers = filteredMembers.length + dayPassCount;

  return (
    <div className="card p-6 flex flex-col">
      {/* Header + Filter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <HiBanknotes className="text-xl text-green-400" />
          </div>
          <h2 className="text-lg font-semibold">Revenue Overview</h2>
        </div>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="input w-auto text-sm py-2 px-3"
        >
          {DATE_FILTERS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Total Revenue */}
      <div className="text-center p-6 bg-white/5 rounded-2xl mb-6">
        <p className="text-sm text-text-muted mb-1">Total Revenue</p>
        <p className="text-3xl font-bold text-green-400">
          {formatUZS(totalRevenue)}
        </p>
        <p className="text-sm text-text-muted mt-1">
          from {totalMembers} members
        </p>
      </div>

      {/* Per-Plan Breakdown */}
      <div className="grid grid-cols-2 gap-3">
        {planRevenue.map((plan) => (
          <div
            key={plan.value}
            className="p-4 bg-white/5 rounded-xl flex items-center gap-3"
          >
            <div
              className={`w-2 h-10 rounded-full bg-linear-to-b ${PLAN_COLORS[plan.value]}`}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-muted">{plan.label}</p>
              <p className="font-semibold truncate">
                {formatUZS(plan.revenue)}
              </p>
              <p className="text-xs text-text-muted">{plan.count} members</p>
            </div>
          </div>
        ))}

        {/* Day Pass Revenue */}
        <div className="p-4 bg-white/5 rounded-xl flex items-center gap-3">
          <div className="w-2 h-10 rounded-full bg-linear-to-b from-orange-500 to-red-500" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-text-muted">Day Passes</p>
            <p className="font-semibold truncate">
              {formatUZS(dayPassRevenue)}
            </p>
            <p className="text-xs text-text-muted">{dayPassCount} visits</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueOverview;

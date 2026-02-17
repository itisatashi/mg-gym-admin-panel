// Plan types configuration - single source of truth
export const PLAN_TYPES = [
  { value: "1_month", label: "1 Month", months: 1 },
  { value: "2_month", label: "2 Months", months: 2 },
  { value: "3_month", label: "3 Months", months: 3 },
  { value: "6_month", label: "6 Months", months: 6 },
  { value: "1_year", label: "1 Year", months: 12 },
];

// Helper to get months from plan value
export function getMonthsFromPlan(planValue) {
  const plan = PLAN_TYPES.find((p) => p.value === planValue);
  return plan?.months || 0;
}

export function getMonthsFromPlanWithLabel(planValue) {
  const plan = PLAN_TYPES.find((p) => p.value === planValue);
  return plan?.label || "none";
}

// Get today with time reset to midnight
export function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

// Check if date is after today (active)
export function isActive(endDate) {
  const end = new Date(endDate);
  return end >= getToday();
}

// Check if date is within this week (Monday - Sunday)
export function isThisWeek(endDate) {
  const today = getToday();
  const end = new Date(endDate);

  // Get Monday of this week
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  // Get Sunday of this week
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return end >= monday && end <= sunday;
}

// Check if date is in this current month
export function isThisMonth(date) {
  const today = getToday();
  const d = new Date(date);

  return (
    d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()
  );
}

// Get days until a date
export function getDaysUntil(date) {
  const today = getToday();
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

// Check if expiring within N days (default 7)
export function isExpiringSoon(endDate, days = 7) {
  const daysUntil = getDaysUntil(endDate);
  return daysUntil >= 0 && daysUntil <= days;
}

// Get urgency text
export function getExpiryText(endDate) {
  const days = getDaysUntil(endDate);

  if (days === 0) return { text: "TODAY!", urgent: true };
  if (days === 1) return { text: "TOMORROW!", urgent: true };
  if (days <= 3) return { text: `${days} days left`, urgent: true };
  return { text: `${days} days left`, urgent: false };
}

// Calculate end date based on plan
export function calculateEndDate(startDate, planType) {
  if (!startDate || !planType) return "";

  const start = new Date(startDate);

  const monthsToAdd = {
    "1_month": 1,
    "2_month": 2,
    "3_month": 3,
    "6_month": 6,
    "1_year": 12,
  };

  const months = monthsToAdd[planType] || 0;
  start.setMonth(start.getMonth() + months);

  return start.toISOString().split("T")[0];
}

// get today
export const today = new Date().toISOString().split("T")[0];

import supabase from "./supabase";

// ============ GET ALL SETTINGS ============
export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*");

  if (error) {
    console.error("Error fetching settings:", error);
    throw new Error("Settings could not be loaded");
  }

  // Convert array to object for easier use
  // [{ key: "price_1_month", value: "150000" }] → { price_1_month: "150000" }
  const settingsObject = {};
  data.forEach((item) => {
    settingsObject[item.key] = item.value;
  });

  return settingsObject;
}

// ============ UPDATE SETTING ============
export async function updateSetting({ key, value }) {
  const { error } = await supabase
    .from("settings")
    .update({ value, updated_at: new Date().toISOString() })
    .eq("key", key);

  if (error) {
    console.error("Error updating setting:", error);
    throw new Error("Setting could not be updated");
  }

  return { key, value };
}

// ============ UPDATE MULTIPLE SETTINGS ============
export async function updateSettings(settings) {
  // settings = { price_1_month: "150000", price_3_month: "400000", ... }
  const updates = Object.entries(settings).map(([key, value]) =>
    updateSetting({ key, value }),
  );

  await Promise.all(updates);
  return settings;
}

import supabase from "./supabase";

// ============ GET TODAY'S VISITS ============
export async function getTodayVisits() {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("daily_visits")
    .select("*")
    .eq("date", today)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching daily visits:", error);
    throw new Error("Daily visits could not be loaded");
  }

  return data;
}

// ============ GET ALL VISITS (for revenue) ============
export async function getAllDailyVisits() {
  const { data, error } = await supabase
    .from("daily_visits")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching daily visits:", error);
    throw new Error("Daily visits could not be loaded");
  }

  return data;
}

// ============ CREATE VISIT ============
export async function createDailyVisit(visit) {
  const { data, error } = await supabase
    .from("daily_visits")
    .insert([visit])
    .select()
    .single();

  if (error) {
    console.error("Error creating daily visit:", error);
    throw new Error("Daily visit could not be created");
  }

  return data;
}

// ============ DELETE VISIT ============
export async function deleteDailyVisit(id) {
  const { error } = await supabase.from("daily_visits").delete().eq("id", id);

  if (error) {
    console.error("Error deleting daily visit:", error);
    throw new Error("Daily visit could not be deleted");
  }

  return id;
}

import supabase from "./supabase";
import { PAGE_SIZE } from "../helpers/constants";

// Helper: Get today's date in YYYY-MM-DD format
function getDateString(daysFromNow = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split("T")[0];
}

// Get all members
export async function getAllMembers() {
  const { data, error } = await supabase.from("members").select("*");

  if (error) {
    console.error("Error fetching:", error);
    throw new Error("Members could not be loaded");
  }

  return data;
}

// Get members by filter
export async function getMembers({ page = 1, search = "", status = "" } = {}) {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("members")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (search) {
    query = query.ilike("fullName", `%${search}%`);
  }

  // Add status filter (convert status to date conditions)
  const today = getDateString(0);
  const weekFromNow = getDateString(7);

  if (status === "active") {
    query = query.gt("endDate", weekFromNow);
  } else if (status === "expiring") {
    query = query.gte("endDate", today).lte("endDate", weekFromNow);
  } else if (status === "expired") {
    query = query.lt("endDate", today);
  }

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching:", error);
    throw new Error("Members could not be loaded");
  }

  return { members: data, totalCount: count };
}

// Add member
export async function createMember(newMember) {
  const { data, error } = await supabase
    .from("members")
    .insert([newMember])
    .select()
    .single();

  if (error) {
    console.error("Error creating member:", error);
    throw new Error("Member could not be created");
  }

  return data;
}

// Update member
export async function updateMember(id, updatedMember) {
  const { data, error } = await supabase
    .from("members")
    .update(updatedMember)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating member:", error);
    throw new Error("Member could not be updated");
  }

  return data;
}

// Delete member
export async function deleteMember(id) {
  const { error } = await supabase.from("members").delete().eq("id", id);

  if (error) {
    console.error("Error deleting member:", error);
    throw new Error("Member could not be deleted");
  }

  return id;
}

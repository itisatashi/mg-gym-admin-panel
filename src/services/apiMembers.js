import supabase from "./supabase";

// Get members
export async function getMembers() {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching:", error);
    throw new Error("Members could not be loaded");
  }

  return data;
}

// Add member
export async function createMember(newMember) {
  const memberData = {
    ...newMember,
    status: newMember.status || "active",
  };

  const { data, error } = await supabase
    .from("members")
    .insert([memberData])
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
    throw new Error("Member could not be updateded");
  }

  return data;
}

// Delete member
export async function deleteMember(id) {
  const { error } = await supabase.from("members").delete().eq("id", id);

  if (error) {
    console.error("Error deleting member:", error);
    throw new Error("Member could not be updateded");
  }

  return id;
}

import supabase from "./supabase";

// ============ LOGIN ============
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  // Fetch profile to return complete user object
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profileError) {
    console.error("Profile fetch error during login:", profileError);
    // Don't throw here, just return user without profile if it fails (graceful degradation)
    // Or throw if profile is critical. We'll return user with potentially missing profile.
  }

  // Return data with user merged with profile, matching getCurrentUser shape
  return {
    ...data,
    user: { ...data.user, profile },
  };
}

// ============ LOGOUT ============
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

// ============ GET CURRENT USER ============
export async function getCurrentUser() {
  // Check if there's an active session
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  // Get user data
  const { data: user, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  // Get user's profile (with role)
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.user.id)
    .single();

  if (profileError) throw new Error(profileError.message);

  return { ...user.user, profile };
}

// ============ CREATE STAFF (via Edge Function) ============
export async function createStaffAccount({ email, password, fullName }) {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-staff`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          (await supabase.auth.getSession()).data.session?.access_token
        }`,
      },
      body: JSON.stringify({ email, password, fullName }),
    },
  );

  const data = await response.json();

  if (data.error) throw new Error(data.error);

  return data;
}

// ============ GET ALL STAFF PROFILES ============
export async function getStaffProfiles() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "staff")
    .order("created_at", { ascending: false });

  if (error) throw new Error("Could not load staff");

  return data;
}

// ============ DELETE STAFF (via Edge Function) ============
export async function deleteStaffProfile(id) {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-staff`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          (await supabase.auth.getSession()).data.session?.access_token
        }`,
      },
      body: JSON.stringify({ userId: id }),
    },
  );

  const data = await response.json();

  if (data.error) throw new Error(data.error);

  return id;
}

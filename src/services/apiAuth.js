import supabase from "./supabase";

// ============ LOGIN ============
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
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

// ============ CREATE STAFF (Owner only) ============
export async function createStaffAccount({ email, password, fullName }) {
  // Create auth user
  const { data: authData, error: authError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  // Note: admin.createUser requires service_role key
  // For client-side, we'll use a different approach (see below)

  if (authError) throw new Error(authError.message);

  // Create profile
  const { error: profileError } = await supabase.from("profiles").insert([
    {
      id: authData.user.id,
      email,
      fullName: fullName,
      role: "staff",
    },
  ]);

  if (profileError) throw new Error(profileError.message);

  return authData;
}

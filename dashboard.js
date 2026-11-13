import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "./config.js";
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
const { data: { session }, error } = await supabase.auth.getSession();
if (error || !session) location.replace("login.html");
else {
  const name = session.user.user_metadata?.display_name || "ব্যবহারকারী";
  document.getElementById("userName").textContent = name;
  document.getElementById("userEmail").textContent = session.user.email || "";
}
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await supabase.auth.signOut();
  location.replace("login.html");
});

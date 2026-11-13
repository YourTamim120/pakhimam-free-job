import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";
const configured = SUPABASE_URL.startsWith("https://") && !SUPABASE_URL.includes("PASTE_") && SUPABASE_ANON_KEY.length > 30 && !SUPABASE_ANON_KEY.includes("PASTE_");
if (!configured) { alert("Supabase সেটআপ সম্পূর্ণ হয়নি।"); location.href = "login.html"; }
else {
 const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 const { data: { session } } = await supabase.auth.getSession();
 if (!session) location.href = "login.html";
 else {
  const name = session.user.user_metadata?.display_name || session.user.email?.split("@")[0] || "সদস্য";
  document.getElementById("userName").textContent = name;
 }
 document.getElementById("logoutBtn").addEventListener("click", async () => { await supabase.auth.signOut(); location.href = "index.html"; });
}

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

const form = document.querySelector("form");
const message = document.getElementById("message");
const button = document.getElementById("submitBtn");
const say = (text) => { message.style.display = "block"; message.textContent = text; };
const configured = SUPABASE_URL.startsWith("https://") && !SUPABASE_URL.includes("PASTE_") && SUPABASE_ANON_KEY.length > 30 && !SUPABASE_ANON_KEY.includes("PASTE_");

if (!configured) {
  say("সেটআপ বাকি আছে: Supabase Project URL ও anon/public key বসানোর পর নিবন্ধন ও লগইন চালু হবে। এখনো কোনো তথ্য পাঠানো হচ্ছে না।");
  button.disabled = true;
  button.textContent = "সেটআপ সম্পূর্ণ হলে চালু হবে";
} else {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); button.disabled = true; say("অনুগ্রহ করে অপেক্ষা করুন…");
    try {
      if (form.id === "registerForm") {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: name }, emailRedirectTo: location.origin + location.pathname.replace(/[^/]*$/, "login.html") } });
        if (error) throw error;
        say(data.session ? "নিবন্ধন সফল। এখন ড্যাশবোর্ডে যাচ্ছেন…" : "নিবন্ধনের অনুরোধ সফল। ইমেইলে পাঠানো নিশ্চিতকরণ লিংক খুলে তারপর লগইন করুন।");
        if (data.session) setTimeout(() => location.href = "dashboard.html", 1200);
      } else {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        say("লগইন সফল। ড্যাশবোর্ডে যাচ্ছেন…"); setTimeout(() => location.href = "dashboard.html", 700);
      }
    } catch (error) { say(error.message || "অনুরোধ সম্পন্ন হয়নি। তথ্য যাচাই করে আবার চেষ্টা করুন।"); }
    finally { button.disabled = false; }
  });
}

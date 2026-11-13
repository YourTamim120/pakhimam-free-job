import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "./config.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
const message = document.getElementById("formMessage");
const setMessage = (text, error=false) => { if(message){message.textContent=text;message.style.color=error?"#ff9b9b":"#55d6c2";} };

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;
    if (password !== confirm) return setMessage("দুটি পাসওয়ার্ড মিলছে না।", true);
    if (SUPABASE_PUBLISHABLE_KEY.includes("PASTE_")) return setMessage("আগে js/config.js ফাইলে Publishable Key বসান।", true);
    const button = registerForm.querySelector("button");
    button.disabled = true; button.textContent = "অপেক্ষা করুন...";
    const { error } = await supabase.auth.signUp({
      email, password, options: {
        data: { display_name: name },
        emailRedirectTo: `${location.origin}${location.pathname.replace("register.html","login.html")}`
      }
    });
    button.disabled = false; button.textContent = "নিবন্ধন সম্পন্ন করুন";
    if (error) return setMessage(error.message, true);
    setMessage("নিবন্ধনের অনুরোধ সফল হয়েছে। ইমেইলে verification link এলে সেটি খুলুন, তারপর লগইন করুন।");
    registerForm.reset();
  });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    if (SUPABASE_PUBLISHABLE_KEY.includes("PASTE_")) return setMessage("আগে js/config.js ফাইলে Publishable Key বসান।", true);
    const button = loginForm.querySelector("button");
    button.disabled = true; button.textContent = "লগইন হচ্ছে...";
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    button.disabled = false; button.textContent = "লগইন করুন";
    if (error) return setMessage(error.message, true);
    location.href = "dashboard.html";
  });
}

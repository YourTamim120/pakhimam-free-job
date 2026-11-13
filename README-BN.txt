PakhiMam Free Job — Real Development Foundation (Phase 1)

এই প্যাকেজে:
- বাংলা Homepage
- Supabase Auth-ভিত্তিক Registration ও Login
- Login-required Dashboard
- Supabase config placeholder
- প্রাথমিক secure profiles table + RLS SQL

Android থেকে GitHub-এ আপলোড:
1) ZIP Extract করুন।
2) GitHub Repository > Add file > Upload files।
3) ZIP-এর ভেতরের index.html, register.html, login.html, dashboard.html, css ফোল্ডার, js ফোল্ডার এবং database ফোল্ডার আপলোড করুন।
4) পুরোনো একই নামের ফাইল replace করুন; নতুন ফোল্ডারগুলোর ভেতরের path ঠিক রাখুন।
5) Commit changes দিন।

Supabase সেটআপ এখনো বাকি:
A) https://supabase.com এ Free account খুলে New project তৈরি করুন।
B) Project URL ও anon/public key কপি করুন।
C) js/config.js-এ placeholder দুটো বদলান।
D) Supabase SQL Editor-এ database/schema.sql-এর SQL চালান।
E) Authentication > URL Configuration-এ Site URL দিন:
   https://yourtamim120.github.io
   Redirect URL allowlist-এ দিন:
   https://yourtamim120.github.io/pakhimam-free-job/**
F) Auth > Providers-এ Email provider enabled রাখুন। Email confirmation enabled থাকলে signup-এর পর inbox থেকে confirm করতে হবে।

নিরাপত্তা:
- শুধু anon/public key frontend-এ ব্যবহার করা যাবে। service_role key, database password বা secret কখনো GitHub-এ দেবেন না।
- Public repository-তে frontend code সবাই দেখতে পাবে।
- এই পর্যায়ে profile/auth foundation মাত্র। Referral rewards, wallet, cash withdrawal, admin roles এখনো নেই।
- টাকা জমা, joining fee বা নিশ্চিত আয়ের প্রতিশ্রুতি দেবেন না। কোনো financial reward চালুর আগে বৈধ funding, পরিষ্কার policy, abuse prevention এবং server-side approval তৈরি করতে হবে।
- Supabase Free tier সীমিত; production-এ যাওয়ার আগে backup, privacy notice ও security review জরুরি।

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("agrivani_is_logged_in") === "true";
      const userRole = localStorage.getItem("agrivani_user_role");
      const hasOnboarded = localStorage.getItem("agrivani_onboarded") === "true";

      if (isLoggedIn) {
        if (userRole === "officer" || userRole === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/home");
        }
      } else {
        if (!hasOnboarded) {
          router.replace("/get-started");
        } else {
          router.replace("/auth");
        }
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FDFFF1] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#144733] border-t-transparent animate-spin" />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Search, Bell } from "lucide-react";
import { getUser, type AuthUser } from "@/lib/auth-storage";

const getInitials = (user: AuthUser | null) => {
  if (!user) return "?";
  const first = user.first_name?.[0] ?? "";
  const last = user.last_name?.[0] ?? "";
  return (first + last).toUpperCase() || user.email[0].toUpperCase();
};

const DashboardHeader = () => {
  // read from localStorage only after mount to avoid SSR/client mismatch
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search jobs, internships and scholarships"
          className="h-[44px] w-full rounded-full border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#2b6b41]"
        />
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50"
      >
        <Bell size={18} />
      </button>

      <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-[#f6e9eb] text-xs font-semibold text-[#1f4c33]">
        {getInitials(user)}
      </div>
    </div>
  );
};

export default DashboardHeader;
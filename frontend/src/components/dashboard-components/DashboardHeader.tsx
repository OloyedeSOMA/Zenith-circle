"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

import { getStudentProfile } from "@/lib/profile-api";
import { getUser } from "@/lib/auth-storage";

const getInitials = (
  firstName?: string,
  lastName?: string
) => {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
};

export default function DashboardHeader() {
  const user = getUser();

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getStudentProfile();

         const photo =
          typeof profile?.profile_photo === "string"
            ? profile.profile_photo
            : null;

        setProfilePhoto(photo);
      } catch (error) {
        console.error("Failed to load student profile:", error);
      }
    };

    loadProfile();
  }, []);

  const initials = getInitials(
    user?.first_name,
    user?.last_name
  );

  return (
    <header className="flex items-center justify-between gap-4">
      {/* Search */}
      <div className="relative w-full max-w-[420px]">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
        />

        <input
          type="text"
          placeholder="Search opportunities"
          className="h-11 w-full rounded-lg border border-primary bg-white pl-10 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {profilePhoto ? (
          <Image
            src={profilePhoto}
            alt={`${user?.first_name ?? "User"} profile`}
            width={42}
            height={42}
            unoptimized
            className="h-[42px] w-[42px] rounded-full object-cover"
          />
        ) : (
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            {initials || "U"}
          </div>
        )}

        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-gray-900">
            {user?.first_name} {user?.last_name}
          </p>

          <p className="text-xs text-gray-400">
            Student
          </p>
        </div>
      </div>
    </header>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";

import {
  useRecruiterProfile,
  useStudentProfile,
} from "@/hooks/useProfile";

interface ProfileDropdownProps {
  email: any;
  role: any;
  onLogout: () => void;
}

const ProfileDropdown = ({
  email,
  role,
  onLogout,
}: ProfileDropdownProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const studentProfile = useStudentProfile();
  const recruiterProfile = useRecruiterProfile();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const profileQuery =
    role === "student"
      ? studentProfile
      : recruiterProfile;

  const profile = profileQuery.data;

  const isProfileComplete = Boolean(profile?.email);

  const handleDashboardClick = () => {
    if (profileQuery.isLoading) {
      return;
    }

    setOpen(false);

    if (isProfileComplete) {
      router.push(
        role === "student"
          ? "/student-dashboard"
          : "/recruiter-dashboard"
      );
    } else {
      router.push(
        role === "student"
          ? "/student-profile"
          : "/recruiter-profile"
      );
    }
  };

  const handleProfileClick = () => {
    if (profileQuery.isLoading) {
      return;
    }

    setOpen(false);

    if (isProfileComplete) {
      router.push(
        role === "student"
          ? "/student-dashboard/profile"
          : "/recruiter-dashboard/profile"
      );
    } else {
      router.push(
        role === "student"
          ? "/student-profile"
          : "/recruiter-profile"
      );
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-gray-200 px-2 py-1 transition hover:border-primary"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
          <User size={18} />
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          <div className="border-b p-5">
            <p className="font-medium text-gray-900">
              {email}
            </p>

            <p className="mt-1 text-sm capitalize text-gray-500">
              {role}
            </p>
          </div>

          <div className="py-2">
            {/* Dashboard */}
            <button
              type="button"
              onClick={handleDashboardClick}
              disabled={profileQuery.isLoading}
              className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LayoutDashboard size={18} />

              {profileQuery.isLoading
                ? "Checking profile..."
                : "Dashboard"}
            </button>

            {/* Profile */}
            <button
              type="button"
              onClick={handleProfileClick}
              disabled={profileQuery.isLoading}
              className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <User size={18} />

              {profileQuery.isLoading
                ? "Checking profile..."
                : "Profile"}
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center gap-3 px-5 py-3 text-left text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
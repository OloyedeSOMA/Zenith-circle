"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";

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
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
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
            <p className="font-medium text-gray-900">{email}</p>

            <p className="mt-1 text-sm capitalize text-gray-500">
              {role}
            </p>
          </div>

          <div className="py-2">
            <Link
              href={role === "student" ? "/student-dashboard" : "/recruiter-dashboard"}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              href={role === "student" ? "/student-profile" : "/recruiter-profile"}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50"
            >
              <User size={18} />
              Profile
            </Link>

            {/* <Link
              href="/settings"
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50"
            >
              <Settings size={18} />
              Settings
            </Link> */}

            <button
              onClick={onLogout}
              className="flex w-full items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50"
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

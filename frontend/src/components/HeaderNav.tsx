"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Menu,
  X,
  User,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";

import Logo from "../../public/logo.png";
import Button from "./Button";
import ProfileDropdown from "./ProfileDropdown";
import { clearAuth, getRefreshToken, getUser, isAuthenticated } from "@/lib/auth-storage";
import { logOut } from "@/lib/auth-api";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Jobs", href: "/jobs" },
  { name: "Internships", href: "/internships" },
  { name: "Scholarships", href: "/scholarships" },
];

const HeaderNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(getUser());

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoggedIn(isAuthenticated());
    setUser(getUser());
    setMounted(true);
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        // setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const refreshToken = getRefreshToken();

    if (refreshToken) {
      try {
        await logOut({ refresh_token: refreshToken });
      } catch (error) {
        console.error("Logout request failed:", error);
      }
    }

    clearAuth();
    setLoggedIn(false);
    setUser(null);
    setIsOpen(false);

    window.location.href = "/";
  };
    


  return (
    <>

      <header className="sticky top-0 z-50 flex w-full justify-center border-b border-gray-200 bg-white">
        <div className="flex h-16 w-full max-w-[90%] items-center justify-between">

          <Link href="/">
            <Image
              src={Logo}
              alt="OpportunityHub NG"
              className="h-auto w-44"
              priority
            />
          </Link>

          {/* Desktop Nav */}

          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition ${
                    isActive
                      ? "text-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right */}

          <div className="hidden items-center gap-3 md:flex">
          <button
            aria-label="Notifications"
            className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100"
          >
            <Bell size={20} />
          </button>

          {mounted && (loggedIn ? (
            <ProfileDropdown
              email={user?.email}
              role={user?.role}
              onLogout={handleLogout}
            />
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="primary"
                  className="h-10 w-20 bg-primary-light text-sm text-primary"
                >
                  Log in
                </Button>
              </Link>

              <Link href="/signup">
                <Button
                  variant="primary"
                  className="h-10 w-24 text-sm"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          ))}
        </div>

          {/* Mobile */}

          <div className="flex items-center gap-2 md:hidden">
            <button className="rounded-full p-2 hover:bg-gray-100">
              <Bell size={20} />
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}

      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-80 flex-col overflow-y-auto bg-white p-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b pb-4">
          <Image
            src={Logo}
            alt="logo"
            className="w-40"
            priority
          />

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {mounted && (loggedIn ? (
          <div className="mt-4 rounded-xl bg-gray-50 p-5">

            {/* <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              <User size={24} />
            </div> */}

            <p className="mt-4 font-semibold break-all">
              {user?.email}
            </p>

            <p className="text-sm capitalize text-gray-500">
              {user?.role}
            </p>
          </div>
        ): (<></>))}

        <nav className="mt-3 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-primary-light font-semibold text-primary"
                    : "hover:bg-gray-100 hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {mounted && (loggedIn ? (
          <div className="mt-1 flex flex-col gap-1">

            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              <User size={18} />
              Profile
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              <Settings size={18} />
              Settings
            </Link>

            <button
              onClick={handleLogout}
              className="mt-1 flex items-center gap-3 rounded-lg px-4 py-3 text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>
        ) : (
          <div className="mt-2 flex flex-col gap-3">

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
            >
              <Button
                variant="primary"
                className="h-11 w-full bg-primary-light"
              >
                Log in
              </Button>
            </Link>

            <Link
              href="/signup"
              onClick={() => setIsOpen(false)}
            >
              <Button
                variant="primary"
                className="h-11 w-full"
              >
                Sign Up
              </Button>
            </Link>

          </div>
        ))}
      </aside>
    </>
  );
};

export default HeaderNav;
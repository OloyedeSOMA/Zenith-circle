"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, Menu, X } from "lucide-react";

import Logo from "../../public/logo.png";
import Button from "./Button";

const navLinks = [
  {
    name: "Jobs",
    href: "/jobs",
  },
  {
    name: "Internships",
    href: "/internships",
  },
  {
    name: "Scholarships",
    href: "/scholarships",
  },
];

const HeaderNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="mx-auto flex justify-center sticky top-0 z-50 w-full max-w-[100%] border-b border-gray-200 bg-white">
        <div className=" flex h-15 w-full max-w-[90%] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/">
            <Image
              src={Logo}
              alt="OpportunityHub NG"
              priority
              className="h-auto w-50"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              aria-label="Notifications"
              className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100"
            >
              <Bell size={20} />
            </button>

            <Link href="/login">
              <Button
                variant="primary"
                className="bg-primary-light h-10 w-20 p-2 text-primary text-sm font-medium"
              >
                Log in
              </Button>
            </Link>

            <Link href="/signup">
              <Button
                variant="primary"
                className="h-10 w-20 p-2 text-white text-sm font-medium"
              >
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              aria-label="Notifications"
              className="rounded-full p-2 text-gray-700"
            >
              <Bell size={20} />
            </button>

            <button
              aria-label="Open Menu"
              onClick={() => setIsOpen(true)}
              className="rounded-full p-2 text-gray-700"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-72 flex-col bg-white p-6 shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="mt-10 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-gray-700 transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Buttons */}
        <div className="mt-auto flex flex-col gap-3">
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
          >
            <Button
              variant="secondary"
              className="h-11 w-full"
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
      </aside>
    </>
  );
};

export default HeaderNav;
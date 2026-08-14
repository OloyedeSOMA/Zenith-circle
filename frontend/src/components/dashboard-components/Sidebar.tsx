"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, X, type LucideIcon } from "lucide-react";

export interface SidebarNavLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarProps {
  navLinks: SidebarNavLink[];
  isOpen?: boolean;
  onClose?: () => void;
  onLogout?: () => void;
}

export default function Sidebar({
  navLinks,
  isOpen = false,
  onClose,
  onLogout,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[250px] flex-col
          border-r border-gray-200 bg-white
          transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-5 py-5 lg:hidden">
          <h2 className="text-lg font-bold text-primary">
            OpportunityHub
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Desktop logo */}
        <div className="hidden px-6 py-6 lg:block">
          <h2 className="text-xl font-bold text-primary">
            OpportunityHub
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-2 px-4 py-4">
          {navLinks.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                }`}
              >
                <Icon size={19} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-200 px-4 py-4">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
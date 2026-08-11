"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, LogOut, type LucideIcon } from "lucide-react";
import { clearAuth } from "@/lib/auth-storage";

export interface SidebarNavLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarProps {
  navLinks: SidebarNavLink[];
}

const Sidebar = ({ navLinks }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[220px] shrink-0 flex-col justify-between border-r border-gray-100 bg-white px-4 py-6">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-1.5 px-2">
          <span className="text-[14px] font-extrabold tracking-tight text-[#1f4c33]">
            OPPORTUNITYHUB
          </span>
          <span className="rounded-[6px] bg-[#2b6b41] px-1.5 py-0.5 text-[10px] font-bold text-white">
            NG
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#2b6b41] text-white"
                    : "text-[#5c5457] hover:bg-[#f6e9eb]"
                }`}
              >
                <Icon size={18} strokeWidth={2} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium text-[#5c5457] transition hover:bg-[#f6e9eb]"
        >
          <Settings size={18} />
          Settings
        </Link>
        <button
          type="button"
          onClick={clearAuth}
          className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-sm font-medium text-[#5c5457] transition hover:bg-[#f6e9eb]"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, LayoutDashboard, Bookmark, Clock, Bell, User, Menu,} from "lucide-react";
import Sidebar, { type SidebarNavLink } from "@/components/dashboard-components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Suspense } from "react";
import LoadingSplash from "@/components/LoadingSplash";
import { clearAuth } from "@/lib/auth-storage";

const recruiterNavLinks: SidebarNavLink[] = [
    { 
        label: "Home", href: "/", icon: Home 
    },
    {
        label: "Dashboard",
        href: "/recruiter-dashboard",
        icon: LayoutDashboard,
    },
    {
      label: "Create Opportunities",
      href: "/recruiter-dashboard/create-opportunity",
      icon: Bookmark,
    },
    {
      label: "Submissions",
      href: "/recruiter-dashboard/submissions",
      icon: Bookmark,
    },
    {
      label: "Profile",
      href: "/recruiter-dashboard/profile",
      icon: User,
    },
];
export default function RecruiterDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const handleLogout = () => {
        clearAuth();
        router.push("/login");
    };

  return (
    <Suspense fallback={<LoadingSplash />}>
      <ProtectedRoute requiredRole="recruiter">
        <div className="min-h-screen bg-[#faf9f8]">
          <Sidebar
            navLinks={recruiterNavLinks}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onLogout={handleLogout}
          />

          <main className="min-h-screen lg:ml-[250px]">
            {/* Mobile top bar */}
            <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-5 py-4 lg:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
                className="rounded-lg p-2 text-secondary hover:bg-gray-100"
              >
                <Menu size={22} />
              </button>

              <span className="font-semibold text-primary">
                OpportunityHub
              </span>
            </div>

            <div className="px-5 py-6 sm:px-8">
              {children}
            </div>
          </main>
        </div>
      </ProtectedRoute>
    </Suspense>
  );
}
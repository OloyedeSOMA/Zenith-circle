"use client";

import { Home, Search, Bookmark, Clock, Bell, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getUser, type AuthUser } from "@/lib/auth-storage";
import Sidebar, { type SidebarNavLink } from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import StatsSection, { type StatItem } from "./StatSection";
import RecommendedOpportunities from "./RecommendedOpportunities";
import BrowseByCategory from "./BrowseByCategory";

const studentNavLinks: SidebarNavLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Saved Opportunities", href: "/saved", icon: Bookmark },
  { label: "Reminders", href: "/reminders", icon: Clock },
  { label: "Notification", href: "/notifications", icon: Bell },
  { label: "Profile", href: "/profile", icon: User },
];

interface StudentDashboardProps {
  stats: {
    newOpportunities: number;
    saved: number;
    applicationsInProgress: number;
    reminders: number;
  };
}

const StudentDashboard = ({ stats }: StudentDashboardProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const statItems: StatItem[] = [
    {
      value: stats.newOpportunities,
      label: "New Opportunities",
      sublabel: "This week",
      color: "orange",
    },
    {
      value: stats.saved,
      label: "Saved",
      sublabel: "Opportunities",
      color: "green",
    },
    {
      value: stats.applicationsInProgress,
      label: "Applications",
      sublabel: "In Progress",
      color: "purple",
      highlighted: true,
    },
    {
      value: stats.reminders,
      label: "Reminders",
      sublabel: "Upcoming",
      color: "purple",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#faf9f8]">
      <Sidebar navLinks={studentNavLinks} />

      <main className="flex-1 px-8 py-6">
        <div className="flex flex-col gap-8">
          <DashboardHeader />

          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.first_name ?? "there"} 👋
            </h1>

            <p className="text-sm text-gray-400">
              Explore verified opportunities tailored for you
            </p>
          </div>

          <StatsSection stats={statItems} />

          <RecommendedOpportunities />

          <BrowseByCategory />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
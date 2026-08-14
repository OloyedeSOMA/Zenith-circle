"use client";


import { useEffect, useState } from "react";

import { getUser, type AuthUser } from "@/lib/auth-storage";
// import Sidebar, { type SidebarNavLink } from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import StatsSection, { type StatItem } from "./StatSection";
import RecommendedOpportunities from "./RecommendedOpportunities";
import BrowseByCategory from "./BrowseByCategory";
import { useGetSavedOpportunities } from "@/hooks/useSaved";


interface StudentDashboardProps {
  stats: {
  newOpportunities: number;
  applicationsInProgress: number;
  reminders: number;
  };
}

const StudentDashboard = ({stats,}: StudentDashboardProps) => {


  const [user, setUser] = useState<AuthUser | null>(null);
  const { data: savedOpportunities = [] } = useGetSavedOpportunities();

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
      value: savedOpportunities.length,
      label: "Saved",
      sublabel: "Opportunities",
      color: "green",
    },
    {
      value: stats.applicationsInProgress,
      label: "Applications",
      sublabel: "In Progress",
      color: "blue",
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
  );
};

export default StudentDashboard;

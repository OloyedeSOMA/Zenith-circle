"use client";

import { useEffect, useState } from "react";
import StudentDashboard from "@/components/dashboard-components/StudentDashboard";
import { getAppliedOpportunityIds } from "@/lib/opportunity-storage";

export default function StudentDashboardPage() {
  const [applicationCount, setApplicationCount] = useState(0);

  useEffect(() => {
    const updateApplicationCount = () => {
      setApplicationCount(getAppliedOpportunityIds().length);
    };

    updateApplicationCount();

    window.addEventListener(
      "applied-opportunities-updated",
      updateApplicationCount
    );

    return () => {
      window.removeEventListener(
        "applied-opportunities-updated",
        updateApplicationCount
      );
    };
  }, []);

  return (
    <StudentDashboard
      stats={{
        newOpportunities: 0,
        applicationsInProgress: applicationCount,
        reminders: 0,
      }}
    />
  );
}
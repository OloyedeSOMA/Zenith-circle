"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import ProtectedRoute from "@/components/ProtectedRoute";
import LoadingSplash from "@/components/LoadingSplash";
import DashboardProfile from "@/components/dashboard-components/profile/DashboardProfile";
import { useRecruiterProfile } from "@/hooks/useProfile";

function RecruiterDashboardProfileContent() {
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
  } = useRecruiterProfile();

  useEffect(() => {
    if (!isLoading && isError) {
      router.replace("/recruiter-profile");
    }
  }, [isLoading, isError, router]);

  if (isLoading) {
    return <LoadingSplash />;
  }

  if (isError || !data) {
    return <LoadingSplash />;
  }

  return <DashboardProfile role="recruiter" />;
}

export default function RecruiterDashboardProfilePage() {
  return (
    <ProtectedRoute requiredRole="recruiter">
      <RecruiterDashboardProfileContent />
    </ProtectedRoute>
  );
}
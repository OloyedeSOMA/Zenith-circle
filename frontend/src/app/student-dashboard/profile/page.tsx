"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import ProtectedRoute from "@/components/ProtectedRoute";
import LoadingSplash from "@/components/LoadingSplash";
import DashboardProfile from "@/components/dashboard-components/profile/DashboardProfile";
import { useStudentProfile } from "@/hooks/useProfile";

function StudentDashboardProfileContent() {
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
  } = useStudentProfile();

  useEffect(() => {
    if (!isLoading && isError) {
      router.replace("/student-profile");
    }
  }, [isLoading, isError, router]);

  if (isLoading) {
    return <LoadingSplash />;
  }

  if (isError || !data) {
    return <LoadingSplash />;
  }

  return <DashboardProfile role="student" />;
}

export default function StudentDashboardProfilePage() {
  return (
    <ProtectedRoute requiredRole="student">
      <StudentDashboardProfileContent />
    </ProtectedRoute>
  );
}
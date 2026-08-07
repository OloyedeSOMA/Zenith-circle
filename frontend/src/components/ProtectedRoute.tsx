"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSplash from "./LoadingSplash"
import { getUser, isAuthenticated } from "@/lib/auth-storage";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "student" | "recruiter";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }

    if (requiredRole) {
      const user = getUser();
      if (user?.role !== requiredRole) {
        router.replace("/");
        return;
      }
    }

    setIsChecking(false);
  }, [router, requiredRole]);

  if (isChecking) {
    return (
      <LoadingSplash/>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
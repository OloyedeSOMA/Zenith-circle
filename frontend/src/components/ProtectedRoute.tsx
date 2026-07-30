"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LoadingSplash from "./LoadingSplash";
import { isAuthenticated } from "@/lib/auth-storage";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({
  children,
}: ProtectedRouteProps) => {
  const router = useRouter();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }

    setChecking(false);
  }, [router]);

  if (checking) {
    return <LoadingSplash />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
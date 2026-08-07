"use client";

import { useRouter } from "next/navigation";
import { getUser, isAuthenticated } from "@/lib/auth-storage";
import { getStudentProfile } from "@/lib/profile-api";

interface RequireStudentAccessOptions {
  onSuccess: () => void;
  onRoleMismatch: () => void;
}

export async function requireStudentAccess(
  router: ReturnType<typeof useRouter>,
  { onSuccess, onRoleMismatch }: RequireStudentAccessOptions
) {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";

  if (!isAuthenticated()) {
    router.push(`/login?next=${encodeURIComponent(currentPath)}`);
    return;
  }

  const user = getUser();
  if (user?.role !== "student") {
    onRoleMismatch();
    return;
  }

  try {
    await getStudentProfile();
    onSuccess();
  } catch {
    router.push(`/student-profile?next=${encodeURIComponent(currentPath)}`);
  }
}
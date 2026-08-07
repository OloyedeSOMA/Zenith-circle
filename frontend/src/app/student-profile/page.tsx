import StudentProfile from "@/components/setup-profile/StudentProfile";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Suspense } from "react";
import LoadingSplash from "@/components/LoadingSplash";

export default function StudentProfilePage() {

  return (
    <Suspense fallback={<LoadingSplash/>}>
      <ProtectedRoute requiredRole="student">
        <StudentProfile/>
      </ProtectedRoute>
    </Suspense>
  );
}

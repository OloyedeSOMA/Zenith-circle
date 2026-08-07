import RecruiterProfile from "@/components/setup-profile/RecruiterProfile";
import ProtectedRoute from "@/components/ProtectedRoute"
export default function SetupProfilePage() {
  return (
    <ProtectedRoute requiredRole="recruiter">
      <RecruiterProfile />
    </ProtectedRoute>
  );
}

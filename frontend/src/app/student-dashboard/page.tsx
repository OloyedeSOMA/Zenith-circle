
import StudentDashboard from "@/components/dashboard-components/StudentDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function StudentDashboardPage() {
    return (
    <ProtectedRoute requiredRole="student">
      <StudentDashboard stats={{
          newOpportunities: 0,
          saved: 0,
          applicationsInProgress: 0,
          reminders: 0,
        }}/>
    </ProtectedRoute>
  );
}
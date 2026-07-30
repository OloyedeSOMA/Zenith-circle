import { Suspense } from "react";

import AuthCard from "@/components/AuthCard";
import ResetPasswordForm from "@/components/AuthForm/ResetPasswordForm";
import LoadingSplash from "@/components/LoadingSplash";

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <AuthCard>
        <Suspense fallback={<LoadingSplash />}>
          <ResetPasswordForm />
        </Suspense>
      </AuthCard>
    </main>
  );
}
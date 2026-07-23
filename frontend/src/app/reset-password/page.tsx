import AuthCard from "@/components/AuthCard";
import ResetPasswordForm from "@/components/AuthForm/ResetPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-between bg-background">
      <AuthCard>
        <ResetPasswordForm />
      </AuthCard>
    </main>
  );
}
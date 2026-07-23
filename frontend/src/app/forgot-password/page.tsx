import AuthCard from "@/components/AuthCard";
import ForgotPasswordForm from "@/components/AuthForm/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-between bg-background">
      <AuthCard>
        <ForgotPasswordForm />
      </AuthCard>
    </main>
  );
}
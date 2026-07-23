import AuthCard from "@/components/AuthCard";
import VerifyCodeForm from "@/components/AuthForm/VerifyCodeForm";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-between bg-background">
      <AuthCard>
        <VerifyCodeForm email="user@example.com"/>
      </AuthCard>
    </main>
  );
}
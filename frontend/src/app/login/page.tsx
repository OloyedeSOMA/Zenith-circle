import AuthCard from "@/components/AuthCard"
import LoginForm from "@/components/AuthForm/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-between bg-background">
      <AuthCard>
        <LoginForm />
      </AuthCard>
    </main>
  );
}
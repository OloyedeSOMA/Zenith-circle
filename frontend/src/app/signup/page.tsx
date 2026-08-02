import AuthCard from "@/components/AuthCard";
import SignupForm from "@/components/AuthForm/SignupForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <AuthCard>
        <SignupForm />
      </AuthCard>
    </main>
  );
}
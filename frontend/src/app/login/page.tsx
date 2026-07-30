"use client"
import { useState } from "react";
import AuthCard from "@/components/AuthCard"
import LoginForm from "@/components/AuthForm/LoginForm";
import LoadingSplash from "@/components/LoadingSplash";

export default function LoginPage() {
  const [redirecting, setRedirecting] = useState(false);

  if (redirecting) {
    return <LoadingSplash />;
  }
  return (
    <main className="flex min-h-screen items-center justify-between bg-background">
      <AuthCard>
        <LoginForm onRedirecting={()=> setRedirecting(true)}/>
      </AuthCard>
    </main>
  );
}
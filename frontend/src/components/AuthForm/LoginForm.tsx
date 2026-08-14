"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Input from "../Input";
import Button from "../Button";
import GoogleIcon from "../../../public/Social.png";
import AuthFormCard from "./AuthFormCard";

import { useLogin } from "@/hooks/useAuth";
import { getRecruiterProfile } from "@/lib/profile-api";
import StatusModal from "../StatusModal";
import {
  setAccessToken,
  setRefreshToken,
  setUser,
} from "@/lib/auth-storage";
import { trackEvent } from "@/lib/gtag";

interface LoginFormProps {
  onRedirecting: () => void;
}

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = ({ onRedirecting }: LoginFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  const { mutate, isPending } = useLogin();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({ mode: "onChange" });

  const onSubmit = (data: LoginFormValues) => {
    setError("");

    mutate(data, {
      onSuccess: (response) => {
        trackEvent("login", {
          method: "email",
        });
        setAccessToken(response.tokens.access_token);
        setRefreshToken(response.tokens.refresh_token);
        setUser(response.user);
        reset();

        onRedirecting();

        const nextPath = searchParams.get("next");

        if (response.user.role === "recruiter") {
          getRecruiterProfile().then(() => {
            router.push("/recruiter-dashboard");
          })
          .catch(() => {
            router.push("/recruiter-profile");
          });

       return;
        }

        
        setTimeout(() => {
          router.push(nextpath || "/");
        }, 1000);
      },

      onError: (err: any) => {
        console.error(err);

        setError(
          err?.message ||
            "Invalid email or password."
        );
      },
    });
  };

  return (
    <AuthFormCard
      title="OpportunityHub NG"
      subtitle="Login"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex w-full max-w-[440px] flex-col gap-6"
      >
        <Input
          label="Email"
          placeholder="Email"
          register={register("email", {
            required: "Email is required",
          })}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          placeholder="Enter Password"
          type="password"
          register={register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Password should contain at least 8 Characters" }
          })}
          error={errors.password?.message}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={!isValid || isPending}
          className="h-[49px] w-full font-medium"
        >
          {isPending ? "Logging In.." : "Log In"}
        </Button>

        <div className="my-1 flex w-full items-center gap-3">
          <span className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <Button
          type="button"
          variant="secondary"
          className="flex h-[49px] w-full items-center justify-center gap-2 font-medium"
        >
          <Image src={GoogleIcon} alt="google icon" priority />
          Login with Google
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-primary">
            Sign up
          </Link>
        </p>

        <p className="text-center text-sm text-gray-600">
          Forgot Password?{" "}
          <Link href="/forgot-password" className="font-medium text-primary">
            Forgot password
          </Link>
        </p>
      </form>
      <StatusModal
        open={!!error}
        type="error"
        message={error}
        buttonText="Try Again"
        onButtonClick={() => setError("")}
        onClose={() => setError("")}
      />
    </AuthFormCard>
  );
};

export default LoginForm;

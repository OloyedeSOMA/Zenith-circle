"use client";

import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import AuthFormCard from "./AuthFormCard";
import { useResetPassword } from "@/hooks/useAuth";
import LoadingSplash from "../LoadingSplash";
import StatusModal from "../StatusModal";

interface ResetPasswordValues {
  identifier: string;
  password: string;
}

const ResetPasswordForm = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const { mutate, isPending} = useResetPassword();

  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors},
  } = useForm<ResetPasswordValues>({
    mode: "onChange",
  });

  const password = watch("password") ?? "";

  const onSubmit = (data: ResetPasswordValues) => {
    setError("");

    if (!id || !token) {
      setError("Invalid reset password link.");
      return;
    }

    mutate(
      {
        id,
        token,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          console.log(response);

          setRedirecting(true);
          reset();
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        },

        onError: (err: any) => {
          console.error(err);

          setError(
            err.message || "Unable to reset password."
          );
        },
      }
    );
  };

  if (isPending || redirecting) {
    return <LoadingSplash />;
  }

  return (
    <AuthFormCard
      title="OpportunityHub NG"
      subtitle="Use a password you haven't used before"
    >
    <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex w-full max-w-[440px] flex-col gap-6"
      >
        <Input
          label="Email"
          placeholder="comfrot@gmail.com"
          register={register("identifier", {
            required: "Email is required",
          })}
          error={errors.identifier?.message}
        />

        <Input
          label="Password"
          placeholder="Enter new password"
          type="password"
          register={register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Password should contain at least 8 Characters" },
          })}
          error={undefined}
          hint={
            errors.password?.message ??
            (password.length > 0 && password.length < 8
              ? "Password should contain at least 8 Characters"
              : undefined)
          }
        />
        <Button
          type="submit"
          variant="muted"
          className="h-[49px] w-full font-medium"
        >
          Reset Password
        </Button>
      </form>

      <StatusModal
        open={!!error}
        type="error"
        message={error}
        buttonText="Okay"
        onButtonClick={() => setError("")}
        onClose={() => setError("")}
      />
    </AuthFormCard>
  );
};

export default ResetPasswordForm;
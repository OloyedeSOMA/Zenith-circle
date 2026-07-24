"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import SuccessModal from "../SuccessModal";
import AuthFormCard from "./AuthFormCard";

interface ResetPasswordValues {
  identifier: string;
  password: string;
}

const ResetPasswordForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordValues>({ mode: "onChange" });

  const password = watch("password") ?? "";

  const onSubmit = async (data: ResetPasswordValues) => {
    setServerError(null);
    try {
      // TODO: replace with the real endpoint once the backend is ready
      // await api.post("/auth/reset-password", data);
      console.log(data);
      setShowSuccess(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  };

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
          label="Email/Phone Number"
          placeholder="comfrot@gmail.com"
          register={register("identifier", {
            required: "Email or phone number is required",
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

        {serverError && (
          <p className="text-sm text-error" role="alert">
            {serverError}
          </p>
        )}

        <Button
          type="submit"
          variant="muted"
          className="h-[49px] w-full font-medium"
        >
          Reset Password
        </Button>
      </form>

      <SuccessModal
        open={showSuccess}
        message="Password changed successfully"
        buttonText="Log in"
        onButtonClick={() => router.push("/login")}
        onClose={() => setShowSuccess(false)}
      />
    </AuthFormCard>
  );
};

export default ResetPasswordForm;
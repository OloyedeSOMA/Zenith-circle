"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import AuthFormCard from "./AuthFormCard";

interface ForgotPasswordValues {
  identifier: string;
}

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ForgotPasswordValues>({ mode: "onChange" });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setServerError(null);
    try {
      // TODO: replace with the real endpoint once the backend is ready
      // await api.post("/auth/forgot-password", data);
      console.log(data);
      router.push("/verify-code");
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthFormCard
      title="OpportunityHub NG"
      subtitle="Reset Password"
      info_text= "An OTP will be sent to your registered email or phone number"
    >
    

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex w-full max-w-[440px] flex-col gap-6"
      >
        <Input
          label="Email/Phone Number"
          placeholder="Enter Details"
          register={register("identifier", {
            required: "Email or phone number is required",
          })}
          error={errors.identifier?.message}
        />

        {serverError && (
          <p className="text-sm text-error" role="alert">
            {serverError}
          </p>
        )}

        <Button
          type="submit"
          variant="danger"
          disabled={!isValid || isSubmitting}
          className="h-[49px] w-full font-medium"
        >
          {isSubmitting ? "Sending..." : "Recover Password"}
        </Button>
      </form>
    </AuthFormCard>
  );
};

export default ForgotPasswordForm;
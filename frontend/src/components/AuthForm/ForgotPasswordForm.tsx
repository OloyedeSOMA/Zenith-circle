"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../Input";
import Button from "../Button";

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
    <div className="h-auto w-full max-w-[542px] rounded-lg border border-gray-300">
      <div className="flex flex-col items-center gap-1 text-center mb-5">
        <h1 className="text-lg font-bold text-gray-900">OpportunityHub NG</h1>
        <p className="text-sm text-gray-500">Reset Password</p>
        <p className="text-sm text-gray-500">
          An OTP will be sent to your registered email or phone number
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6 px-4 pb-12 pt-8 sm:px-8"
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
          className="mx-auto h-[49px] w-full max-w-[440px] font-medium"
        >
          {isSubmitting ? "Sending..." : "Recover Password"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
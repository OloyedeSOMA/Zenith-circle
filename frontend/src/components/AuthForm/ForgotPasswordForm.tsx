"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import AuthFormCard from "./AuthFormCard";
import StatusModal from "../StatusModal";
import { useForgotPassword } from "@/hooks/useAuth";

interface ForgotPasswordValues {
  email: string;
}

const ForgotPasswordForm = () => {
  const { mutate} = useForgotPassword();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ForgotPasswordValues>({ mode: "onChange" });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setError("");

    mutate(data, {
      onSuccess: (response) => {
        console.log(response);

        reset();

        setSuccess(true);
      },

      onError: (err: any) => {
        console.error(err);

        setError(err.message || "Unable to send reset link.");
      },
    });
  };

  return (
    <AuthFormCard
      title="OpportunityHub NG"
      subtitle="Reset Password"
      info_text= "A reset link will be sent to your email"
    >
    

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex w-full max-w-[440px] flex-col gap-6"
      >
        <Input
          label="Email"
          placeholder="Enter Details"
          register={register("email", {
            required: "Email is required",
          })}
          error={errors.email?.message}
        />

        <Button
          type="submit"
          variant="danger"
          disabled={!isValid || isSubmitting}
          className="h-[49px] w-full font-medium"
        >
          {isSubmitting ? "Sending..." : "Recover Password"}
        </Button>
      </form>
      <StatusModal
        open={success}
        type="success"
        message="A reset link has been sent to your email."
        buttonText="Okay"
        onButtonClick={() => setSuccess(false)}
        onClose={() => setSuccess(false)}
      />

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

export default ForgotPasswordForm;
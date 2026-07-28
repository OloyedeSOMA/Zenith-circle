"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useResendActivation } from "@/hooks/useAuth";
import AuthCard from "@/components/AuthCard";
import Input from "@/components/Input";
import Button from "@/components/Button";
import AuthFormCard from "@/components/AuthForm/AuthFormCard";
import StatusModal from "@/components/StatusModal";

interface ResendActivationValues {
  email: string;
}

export default function ResendActivation() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { mutate, isPending } = useResendActivation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResendActivationValues>({ mode: "onChange" });

  const onSubmit = async (data: ResendActivationValues) => {
    setError("");

    mutate(data, {
      onSuccess: (response) => {
        console.log(response);
        reset();
        setSuccess(true);
      },

      onError: (err: any) => {
        console.error(err);

        setError(
          err.message || "Unable to resend activation link."
        );
      },
    });
  };

//   if (isPending) {
//     return <LoadingSplash />;
//   }

  return (
    <main className="flex min-h-screen items-center justify-between bg-background">
        <AuthCard>
            <AuthFormCard
            title="OpportunityHub NG"
            subtitle="Resend Activation Link"
            info_text= "An activation link will be sent to your email"
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
                {isSubmitting ? "Sending..." : "Resend Activation Link"}
                </Button>
            </form>
            </AuthFormCard>
        </AuthCard>
        <StatusModal
        open={success}
        type="success"
        message="A new activation link has been sent to your email."
        buttonText="Go to Login"
        onButtonClick={() => router.push("/login")}
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
    </main>
  );
};
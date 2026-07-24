"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../Button";
import OtpInput from "../OtpInput";
import AuthFormCard from "./AuthFormCard";

interface VerifyCodeValues {
  code: string;
}

interface VerifyCodeFormProps {

  email: string;
}

const RESEND_COOLDOWN_SECONDS = 60;

const VerifyCodeForm = ({ email }: VerifyCodeFormProps) => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<VerifyCodeValues>({ mode: "onChange", defaultValues: { code: "" } });

  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setInterval(() => setCooldown((c) => Math.max(c - 1, 0)), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const onSubmit = async (data: VerifyCodeValues) => {
    setServerError(null);
    try {
      // TODO: replace with the real endpoint once the backend is ready
      // await api.post("/auth/verify-otp", { email, code: data.code });
      console.log(data);
      router.push("/reset-password");
    } catch {
      setServerError("Wrong OTP, please recheck");
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    try {
      // TODO: replace with the real endpoint once the backend is ready
      // await api.post("/auth/resend-otp", { email });
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch {
      setServerError("Couldn't resend the code. Please try again.");
    }
  };

  return (
    <AuthFormCard
      title="OpportunityHub NG"
      subtitle="Verify Code"
      info_text="Please enter the code sent to the email "
    >
    <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex w-full max-w-[440px] flex-col gap-6"
      >
        <OtpInput name="code" control={control} length={6} error={serverError ?? undefined} />

        <p className="text-sm text-gray-500">
          Didn't receive OTP?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0}
            className="font-medium text-primary underline disabled:cursor-not-allowed disabled:text-gray-400 disabled:no-underline"
          >
            {cooldown > 0 ? `Resend code (${cooldown}s)` : "Resend code"}
          </button>
        </p>

        <Button
          type="submit"
          variant="danger"
          disabled={!isValid || isSubmitting}
          className="h-[49px] w-full font-medium"
        >
          {isSubmitting ? "Verifying..." : "Verify"}
        </Button>
      </form>
    </AuthFormCard>
  );
};

export default VerifyCodeForm;
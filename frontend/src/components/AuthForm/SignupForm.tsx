"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "../Input";
import Button from "../Button";
import AuthFormCard from "./AuthFormCard";
import SuccessModal from "../SuccessModal";
import { useRegister } from "@/hooks/useAuth";

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const SignupForm = () => {
  const router = useRouter();
  const {mutate, isPending,} = useRegister();
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const onSubmit = (data: SignupFormValues) => {
    mutate(
    {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
      role: "student",
    },
    {
      onSuccess: (response) => {
        console.log("Register response:", response);
        reset();
        setShowSuccess(true);
      },

      onError: (error) => {
        console.error(error);
        console.log(data);
      },
    }
  );
  };

  const policyLink = "https://docs.google.com/document/d/1Hobafy_YF06Isxz3KFYNMCsY3cc8UJTR/edit?usp=sharing&ouid=111787107402201421453&rtpof=true&sd=true";

  return (
    <AuthFormCard
      title="OpportunityHub NG"
      subtitle="Create Account"
    >

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex w-full max-w-[440px] flex-col gap-6"
      >
        <Input
          label="First name"
          placeholder="First name"
          register={register("firstName", { required: "First name is required" })}
          error={errors.firstName?.message}
        />

        <Input
          label="Last name"
          placeholder="Last name"
          register={register("lastName", { required: "First name is required" })}
          error={errors.lastName?.message}
        />

        <Input
          label="Email/Phone"
          placeholder="Email/Phone"
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

        <Input
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          register={register("confirmPassword", {
            required: "Please confirm your password",
          })}
          error={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          variant="primary"
          className="h-[49px] w-full font-medium"
          disabled={isPending}
        >
          {isPending? "Creating Account.." : "Create Account"}
        </Button>

        <label className="flex w-full items-start gap-2 text-xs text-gray-600">
          <input
            type="checkbox"
            {...register("agreeToTerms", { required: true })}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-primary"
          />
          <span>
            By continuing, you agree to our{" "}
            <Link href={policyLink} className="text-primary underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href={policyLink} className="text-primary underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary">
            Login
          </Link>
        </p>

        
      </form>
      <SuccessModal
        open={showSuccess}
        message="Account created successfully. Check your mail to activate your account"
        buttonText="Okay"
        onButtonClick={() => router.push("/login")}
        onClose={() => setShowSuccess(false)}
      />
    </AuthFormCard>
  );
};

export default SignupForm;
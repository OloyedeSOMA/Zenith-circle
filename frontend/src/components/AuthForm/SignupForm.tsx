"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import Input from "../Input";
import Button from "../Button";

interface SignupFormValues {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const onSubmit = (data: SignupFormValues) => {
    console.log(data);
  };

  return (
    <div className="h-auto w-full max-w-[542px] rounded-lg border border-gray-300">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-lg font-bold text-gray-900">OpportunityHub NG</h1>
        <p className="text-sm text-gray-500">Create Admin Account</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6 px-4 pb-12 pt-8 sm:px-8"
      >
        <Input
          label="First name"
          placeholder="First name"
          register={register("firstName", { required: "First name is required" })}
          error={errors.firstName?.message}
        />

        <Input
          label="Email/Phone"
          placeholder="Email/Phone"
          register={register("email", {
            required: "Email or phone number is required",
          })}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          placeholder="Enter Password"
          type="password"
          register={register("password", { required: "Password is required" })}
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
          className="mx-auto h-[49px] w-full max-w-[440px] font-medium"
        >
          Create Account
        </Button>

        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary">
            Login
          </Link>
        </p>

        <label className="mx-auto flex w-full max-w-[440px] items-start gap-2 text-xs text-gray-600">
          <input
            type="checkbox"
            {...register("agreeToTerms", { required: true })}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-primary"
          />
          <span>
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-primary underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary underline">
              Privacy Policy
            </Link>
          </span>
        </label>
      </form>
    </div>
  );
};

export default SignupForm;
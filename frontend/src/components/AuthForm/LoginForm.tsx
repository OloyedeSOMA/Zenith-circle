"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import Input from "../Input";
import Button from "../Button";
import GoogleIcon from "../../../public/Social.png"

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({mode:"onChange"});

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <div className="h-auto w-full max-w-[542px] rounded-lg border border-gray-300">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-lg font-bold text-gray-900">OpportunityHub NG</h1>
        <p className="text-sm text-gray-500">Create Account</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6 px-4 pb-12 pt-8 sm:px-8"
      >
        <Input
          label="Email/Phone Number"
          placeholder="Email/Phone Number"
          register={register("email", {
            required: "Email or phone number is required",
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
          disabled={!isValid || isSubmitting}
          className="mx-auto h-[49px] w-full max-w-[440px] font-medium"
        >
          Log in
        </Button>

        <div className="mx-auto flex w-full max-w-[440px] items-center gap-3">
          <span className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <Button
          type="button"
          variant="secondary"
          className="mx-auto flex h-[49px] w-full max-w-[440px] items-center justify-center gap-2 font-medium"
        >
          <Image src={GoogleIcon} alt="google icon" priority/>
          Login with Google
        </Button>

        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-primary">
            Sign up
          </Link>
        </p>
        <p className="text-sm text-gray-600">
          Forgot Password?{" "}
          <Link href="/forgot-password" className="font-medium text-primary">
             forgot password
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
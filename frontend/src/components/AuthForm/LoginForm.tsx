"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import Input from "../Input";
import Button from "../Button";
import GoogleIcon from "../../../public/Social.png"
import AuthFormCard from "./AuthFormCard";

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
    <AuthFormCard
      title="OpportunityHub NG"
      subtitle="Login"
    >

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex w-full max-w-[440px] flex-col gap-6"
      >
        <Input
          label="Email"
          placeholder="Email"
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

        <Button
          type="submit"
          variant="primary"
          disabled={!isValid || isSubmitting}
          className="h-[49px] w-full font-medium"
        >
          Log in
        </Button>

        <div className="my-1 flex w-full items-center gap-3">
          <span className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <Button
          type="button"
          variant="secondary"
          className="flex h-[49px] w-full items-center justify-center gap-2 font-medium"
        >
          <Image src={GoogleIcon} alt="google icon" priority/>
          Login with Google
        </Button>
        
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-primary">
            Sign up
          </Link>
        </p>

        <p className="text-center text-sm text-gray-600">
          Forgot Password?{" "}
          <Link href="/forgot-password" className="font-medium text-primary">
            Forgot password
          </Link>
        </p>
      </form>
    </AuthFormCard>
  );
};

export default LoginForm;
"use client";

import { InputHTMLAttributes, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
  hint?: string;
  inputHeight?: string;
}

const Input = ({
  label,
  register,
  error,
  hint,
  type = "text",
  className = "",
  inputHeight = "h-[49px]",
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`flex w-full flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="relative w-full">
        <input
          {...register}
          {...props}
          type={inputType}
          className={`w-full ${inputHeight} rounded-lg border border-gray-300 bg-white px-4 leading-normal text-gray-900 placeholder:text-gray-400 ${
            isPassword ? "pr-12" : ""
          } outline-none focus:border-primary`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-error">{error}</p>}
      {!error && hint && <p className="text-sm text-accent">{hint}</p>}
    </div>
  );
};

export default Input;
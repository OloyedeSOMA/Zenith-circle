"use client";

import { UseFormRegisterReturn } from "react-hook-form";

interface ProfileFieldInputProps {
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
  type?: string;
}

const ProfileFieldInput = ({
  label,
  placeholder,
  register,
  error,
  type = "text",
}: ProfileFieldInputProps) => {
  return (
    <div className="flex flex-col gap-1 rounded-[18px] bg-[#E6E6E6] px-4 py-3">
      <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1f4c33]">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full bg-transparent text-[15px] text-[#2b2d33] placeholder:text-[#a99ea1] outline-none"
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default ProfileFieldInput;
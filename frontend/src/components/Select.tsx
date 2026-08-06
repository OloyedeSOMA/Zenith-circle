"use client";

import { SelectHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  register?: UseFormRegisterReturn;
  error?: string;
  options: Array<{ label: string; value: string }>;
  className?: string;
}

const Select = ({
  label,
  register,
  error,
  options,
  className = "",
  ...props
}: SelectProps) => {
  return (
    <div className={`flex w-full flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <select
        {...(register ?? {})}
        {...props}
        className="h-[49px] w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-primary"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
};

export default Select;

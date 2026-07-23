"use client";

import { useRef } from "react";
import type { KeyboardEvent, ClipboardEvent } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { AlertCircle } from "lucide-react";

interface OtpInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  length?: number;
  error?: string;
}

function OtpInput<T extends FieldValues>({
  name,
  control,
  length = 6,
  error,
}: OtpInputProps<T>) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value) =>
          (typeof value === "string" && value.length === length) ||
          "Please enter the full code",
      }}
      render={({ field: { value = "", onChange } }) => {
        const digits: string[] = Array.from({ length }, (_, i) => value[i] ?? "");

        const setDigit = (index: number, char: string) => {
          const next = digits.slice();
          next[index] = char;
          onChange(next.join(""));
        };

        const handleChange = (index: number, raw: string) => {
          const char = raw.replace(/[^0-9]/g, "").slice(-1);
          setDigit(index, char || "");
          if (char && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
          }
        };

        const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Backspace") {
            if (digits[index]) {
              setDigit(index, "");
            } else if (index > 0) {
              inputsRef.current[index - 1]?.focus();
              setDigit(index - 1, "");
            }
          }
          if (e.key === "ArrowLeft" && index > 0) inputsRef.current[index - 1]?.focus();
          if (e.key === "ArrowRight" && index < length - 1) inputsRef.current[index + 1]?.focus();
        };

        const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
          e.preventDefault();
          const pasted = e.clipboardData
            .getData("text")
            .replace(/[^0-9]/g, "")
            .slice(0, length);
          onChange(pasted);
          inputsRef.current[Math.min(pasted.length, length - 1)]?.focus();
        };

        return (
          <div className="mx-auto flex w-full max-w-[440px] flex-col gap-2">
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`aspect-square w-full min-w-0 rounded-lg border bg-white text-center text-lg font-medium text-gray-900 outline-none focus:border-primary ${
                    error ? "border-error" : "border-gray-300"
                  }`}
                />
              ))}
            </div>

            {error && (
              <p className="flex items-center justify-center gap-1.5 text-center text-sm text-error">
                <AlertCircle size={14} />
                {error}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}

export default OtpInput;
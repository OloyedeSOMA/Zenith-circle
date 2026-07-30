"use client";

import { useEffect } from "react";
import { Check, X } from "lucide-react";
import Button from "./Button";

interface StatusModalProps {
  open: boolean;
  type: "success" | "error";
  message: string;
  buttonText: string;
  onButtonClick: () => void;
  onClose?: () => void;
}

const StatusModal = ({
  open,
  type,
  message,
  buttonText,
  onButtonClick,
  onClose,
}: StatusModalProps) => {
  useEffect(() => {
    if (!open || !onClose) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const isSuccess = type === "success";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-[420px] flex-col items-center rounded-2xl bg-white px-6 py-8 text-center shadow-xl sm:px-8"
        >
            <div
                className={`flex h-14 w-14 items-center justify-center rounded-full ${
                isSuccess ? "bg-primary" : "bg-error"
                }`}
            >
                {isSuccess ? (
                <Check className="text-white" size={28} strokeWidth={3} />
                ) : (
                <X className="text-white" size={28} strokeWidth={3} />
                )}
            </div>

            <div className="mt-6 flex w-full flex-col items-center gap-6">
                <p className="max-w-[300px] text-center text-base leading-7 text-gray-700">
                {message}
                </p>

                <Button
                type="button"
                variant={isSuccess ? "primary" : "error"}
                onClick={onButtonClick}
                className={"h-[49px] w-full max-w-[240px] "}
                >
                {buttonText}
                </Button>
            </div>
        </div>
    </div>
  );
};

export default StatusModal;
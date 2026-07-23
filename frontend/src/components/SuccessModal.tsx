"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";
import Button from "./Button";

interface SuccessModalProps {
  open: boolean;
  message: string;
  buttonText: string;
  onButtonClick: () => void;
  onClose?: () => void;
}

const SuccessModal = ({ open, message, buttonText, onButtonClick, onClose }: SuccessModalProps) => {
  useEffect(() => {
    if (!open || !onClose) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-[542px] flex-col items-center justify-center gap-8 rounded-2xl bg-white px-8 py-12 shadow-xl sm:min-h-[470px] sm:px-14 sm:py-14"
      >
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary">
          <Check className="text-white" size={32} strokeWidth={3} />
        </div>

        <p className="text-center text-lg font-normal text-gray-800">{message}</p>

        <Button
          type="button"
          variant="primary"
          onClick={onButtonClick}
          className="h-[49px] w-full max-w-[300px] font-normal"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default SuccessModal;
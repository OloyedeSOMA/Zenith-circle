"use client";

import { Pencil } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  email: string;
  image?: string | null;
  subtitle?: string;
  onEdit: () => void;
}

export default function ProfileHeader({
  name,
  email,
  image,
  subtitle,
  onEdit,
}: ProfileHeaderProps) {
  return (
    <div className="relative rounded-[12px] border border-[#a9aaa4] bg-white p-4">
      <button
        type="button"
        onClick={onEdit}
        className="absolute right-3 top-3 rounded-md bg-[#2b6b41] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[#245b37]"
      >
        <span className="flex items-center gap-1">
          <Pencil size={12} />
          Edit Profile
        </span>
      </button>

      <div className="flex items-start gap-3 pr-28">
        <div className="h-[64px] w-[64px] shrink-0 overflow-hidden rounded-full bg-[#e6e6e6]">
          {image ? (
            <img
              src={image}
              alt={`${name} profile`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-bold text-[#2b6b41]">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-bold text-[#1f1f1f]">
            {name}
          </h2>

          <p className="text-xs text-[#625c5d]">
            {email}
          </p>

          {subtitle && (
            <p className="mt-1 text-xs text-[#625c5d]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
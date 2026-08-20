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
    <div className="relative rounded-[12px] border border-[#a9aaa4] bg-white p-5">
      <button
        type="button"
        onClick={onEdit}
        className="absolute right-4 top-4 rounded-md bg-[#2b6b41] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#245b37]"
      >
        <span className="flex items-center gap-1.5">
          <Pencil size={14} />
          Edit Profile
        </span>
      </button>

      <div className="flex items-start gap-4 pr-32">
        <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full bg-[#e6e6e6]">
          {image ? (
            <img
              src={image}
              alt={`${name} profile`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-bold text-[#2b6b41]">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0 pt-1">
          <h2 className="text-lg font-bold text-[#1f1f1f]">
            {name}
          </h2>

          <p className="mt-0.5 text-sm text-[#625c5d]">
            {email}
          </p>

          {subtitle && (
            <p className="mt-1.5 text-sm text-[#625c5d]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";

import StudentProfileEditForm from "./edit/StudentProfileEditForm";
import RecruiterProfileEditForm from "./edit/RecruiterProfileEditForm";

import {
  StudentProfileResponse,
  RecruiterProfileResponse,
} from "@/types/profile";

interface ProfileEditModalProps {
  open: boolean;
  role: "student" | "recruiter";
  studentProfile?: StudentProfileResponse;
  recruiterProfile?: RecruiterProfileResponse;
  onClose: () => void;
}

export default function ProfileEditModal({
  open,
  role,
  studentProfile,
  recruiterProfile,
  onClose,
}: ProfileEditModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-[650px] overflow-y-auto rounded-[18px] bg-white p-5 shadow-xl">
        {role === "student" ? (
          <StudentProfileEditForm
            profile={studentProfile}
            onClose={onClose}
          />
        ) : (
          <RecruiterProfileEditForm
            profile={recruiterProfile}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}
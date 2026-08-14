"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";

import Button from "@/components/Button";
import ProfileFieldInput from "@/components/ProfileFieldInput";

import {
  useUpdateStudentProfile,
} from "@/hooks/useProfile";

import {
  StudentProfileRequest,
  StudentProfileResponse,
} from "@/types/profile";

const MAX_FILE_SIZE_MB = 5;

const ACCEPTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

const skillOptions = [
  "UI Design",
  "UX Research",
  "Figma",
  "Prototyping",
  "User Testing",
  "Graphic Design",
  "Motion Design",
  "HTML/CSS",
  "React",
  "AI Tools",
  "JavaScript",
  "Python",
  "Financial Modelling",
  "Excel/Spreadsheets",
];

const levelOptions = [
  "100L",
  "200L",
  "300L",
  "400L",
  "500L",
];

interface StudentProfileEditFormProps {
  profile?: StudentProfileResponse;
  onClose: () => void;
}

const chipClass = (selected: boolean) =>
  selected
    ? "rounded-full border border-[#3f8a52] bg-[#d5f4cf] px-3 py-1.5 text-xs font-medium text-[#1b4e2c]"
    : "rounded-full border border-transparent px-3 py-1.5 text-xs text-[#514a4c] hover:bg-[#f1f1f1]";

export default function StudentProfileEditForm({
  profile,
  onClose,
}: StudentProfileEditFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(
    profile?.profile_photo || null
  );

  const [skills, setSkills] = useState<string[]>(
    profile?.skills || []
  );

  const { mutate, isPending } =
    useUpdateStudentProfile();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Partial<StudentProfileRequest>>({
    mode: "onChange",
    defaultValues: {
      display_name: profile?.display_name || "",
      email: profile?.email || "",
      institution: profile?.institution || "",
      course_of_study: profile?.course_of_study || "",
      current_level: profile?.current_level || "",
      expected_graduation:
        profile?.expected_graduation || "",
    },
  });

  const photo = watch("profile_photo");

  useEffect(() => {
    setPreview(profile?.profile_photo || null);
    setSkills(profile?.skills || []);

    setValue(
      "display_name",
      profile?.display_name || ""
    );

    setValue(
      "email",
      profile?.email || ""
    );

    setValue(
      "institution",
      profile?.institution || ""
    );
    setValue(
      "course_of_study",
      profile?.course_of_study || ""
    );

    setValue(
      "current_level",
      profile?.current_level || ""
    );

    setValue(
      "expected_graduation",
      profile?.expected_graduation || ""
    );
  }, [profile, setValue]);

  const handlePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return;
    }

    setValue("profile_photo", file, {
      shouldValidate: true,
    });

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setPreview(URL.createObjectURL(file));
  };

  const toggleSkill = (skill: string) => {
    setSkills((current) => {
      if (current.includes(skill)) {
        return current.filter((item) => item !== skill);
      }

      return [...current, skill];
    });
  };

  const onSubmit = (
    data: Partial<StudentProfileRequest>
  ) => {
    mutate(
      {
        ...data,
        skills,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#1f4c33]">
            Edit Profile
          </h2>

          <p className="text-xs text-[#70696b]">
            Update your personal information
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-sm text-[#70696b] hover:text-[#1f1f1f]"
        >
          Cancel
        </button>
      </div>

      {/* PHOTO */}
      <div className="flex flex-col items-center gap-3 rounded-[16px] bg-[#E6E6E6] px-4 py-5">
        <button
          type="button"
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="flex h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-full border border-dashed border-[#3f8a52] bg-white"
        >
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <Upload
              size={20}
              className="text-[#3f8a52]"
            />
          )}
        </button>

        <span className="text-xs text-[#5f6f63]">
          {photo instanceof File
            ? photo.name
            : "Change profile photo"}
        </span>

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          className="hidden"
          onChange={handlePhotoChange}
        />
      </div>

      {/* NAME */}
      <ProfileFieldInput
        label="Full Name"
        placeholder="Enter your full name"
        register={register("display_name", {
          required: "Name is required",
        })}
        error={errors.display_name?.message}
      />

      {/* EMAIL */}
      <ProfileFieldInput
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        register={register("email", {
          required: "Email is required",
        })}
        error={errors.email?.message}
      />

      {/* INSTITUTION */}
      <ProfileFieldInput
        label="Institution"
        placeholder="Enter your institution"
        register={register("institution", {
          required: "Institution is required",
        })}
        error={errors.institution?.message}
      />

      <ProfileFieldInput
        label="Course of study"
        placeholder="Enter your course"
        register={register("course_of_study", {
          required: "Course is required",
        })}
        error={errors.course_of_study?.message}
      />

      {/* LEVEL */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-[#1f4c33]">
          Current Level
        </label>

        <div className="flex flex-wrap gap-1">
          {levelOptions.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() =>
                setValue(
                  "current_level",
                  level,
                  {
                    shouldValidate: true,
                  }
                )
              }
              className={chipClass(
                watch("current_level") === level
              )}
            >
              {level}
            </button>
          ))}
        </div>

        {errors.current_level?.message && (
          <p className="text-xs text-red-500">
            {errors.current_level.message}
          </p>
        )}
      </div>

      {/* GRADUATION */}
      <ProfileFieldInput
        label="Expected Graduation"
        type="date"
        register={register(
          "expected_graduation",
          {
            required:
              "Expected graduation is required",
          }
        )}
        error={
          errors.expected_graduation?.message
        }
      />

      {/* SKILLS */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-[#1f4c33]">
          Skills
        </label>

        <div className="flex flex-wrap gap-1">
          {skillOptions.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() =>
                toggleSkill(skill)
              }
              className={chipClass(
                skills.includes(skill)
              )}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          className="h-[42px] rounded-[10px] px-5 text-sm"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="primary"
          disabled={isPending}
          className="h-[42px] rounded-[10px] bg-[#2b6b41] px-5 text-sm"
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
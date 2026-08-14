"use client";

import { useEffect, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import ProfileFieldInput from "@/components/ProfileFieldInput";

import { useUpdateRecruiterProfile } from "@/hooks/useProfile";

import {
  RecruiterProfileRequest,
  RecruiterProfileResponse,
} from "@/types/profile";

const MAX_FILE_SIZE_MB = 5;

const ACCEPTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

interface RecruiterProfileEditFormProps {
  profile?: RecruiterProfileResponse;
  onClose: () => void;
}

export default function RecruiterProfileEditForm({
  profile,
  onClose,
}: RecruiterProfileEditFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(
    profile?.logo || null
  );

  const { mutate, isPending } =
    useUpdateRecruiterProfile();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Partial<RecruiterProfileRequest>>({
    mode: "onChange",
    defaultValues: {
      organisation: profile?.organisation || "",
      description: profile?.description || "",
      website: profile?.website || "",
      location: profile?.location || "",
    },
  });

  const logo = watch("logo");

  useEffect(() => {
    setPreview(profile?.logo || null);

    setValue(
      "organisation",
      profile?.organisation || ""
    );

    setValue(
      "description",
      profile?.description || ""
    );

    setValue(
      "website",
      profile?.website || ""
    );

    setValue(
      "location",
      profile?.location || ""
    );
  }, [profile, setValue]);

  const handleLogoChange = (
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

    setValue("logo", file, {
      shouldValidate: true,
    });

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = (
    data: Partial<RecruiterProfileRequest>
  ) => {
    mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
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
            Update your organisation information
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

      {/* LOGO */}
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
              alt="Organisation logo"
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
          {logo instanceof File
            ? logo.name
            : "Change organisation logo"}
        </span>

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          className="hidden"
          onChange={handleLogoChange}
        />
      </div>

      {/* ORGANISATION */}
      <ProfileFieldInput
        label="Organisation"
        placeholder="Enter organisation name"
        register={register(
          "organisation",
          {
            required:
              "Organisation name is required",
          }
        )}
        error={
          errors.organisation?.message
        }
      />

      {/* DESCRIPTION */}
      <ProfileFieldInput
        label="Description"
        placeholder="Tell students about your organisation"
        register={register(
          "description",
          {
            required:
              "Description is required",
          }
        )}
        error={
          errors.description?.message
        }
      />

      {/* WEBSITE */}
      <ProfileFieldInput
        label="Website"
        placeholder="https://yourcompany.com"
        register={register("website", {
          required: "Website is required",
          pattern: {
            value:
              /^https?:\/\/.+\..+/,
            message:
              "Enter a valid URL",
          },
        })}
        error={
          errors.website?.message
        }
      />

      {/* LOCATION */}
      <ProfileFieldInput
        label="Location"
        placeholder="e.g. Lagos, Nigeria"
        register={register(
          "location",
          {
            required:
              "Location is required",
          }
        )}
        error={
          errors.location?.message
        }
      />

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
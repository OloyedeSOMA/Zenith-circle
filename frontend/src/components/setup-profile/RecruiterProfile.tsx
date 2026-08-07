"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";
import Button from "@/components/Button";
import ProfileFieldInput from "@/components/ProfileFieldInput";
import StatusModal from "@/components/StatusModal";
import { useCreateRecruiterProfile } from "@/hooks/useProfile";
import { RecruiterProfileRequest } from "@/types/profile";
import { trackEvent } from "@/lib/gtag";
const MAX_FILE_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

const RecruiterProfile = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const closeErrorModal = () => setError("");
  const { mutate, isPending } = useCreateRecruiterProfile();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RecruiterProfileRequest>({
    mode: "onChange",
  });

  const logoFile = watch("logo");

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("logo", file, { shouldValidate: true });

    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = (data: RecruiterProfileRequest) => {
    mutate(data, {
      onSuccess: (response) => {
        console.log(" profile response:", response);
        trackEvent("recruiterProfile_completed ", {
          organisation: organisation, 
          organisation_website: website,
          
        })
        reset();
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        setSuccess(true);
        router.push("/");
      },
      onError: (error: any) => {
        console.error(error.message);
        setError(error.message || "Unable to create profile.");
      },
    });
  };

  return (
    <div className="min-h-screen w-full bg-white px-4 py-10">
      <div className="mx-auto flex w-full max-w-[700px] flex-col gap-6 rounded-[24px] bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full p-1 text-[#205338] transition hover:bg-[#f1e8ea]"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-1 text-left">
          <h1 className="text-[24px] font-bold text-[#1f4c33]">Recruiter profile</h1>
          <p className="text-sm text-[#83787b]">
            Set up your organisation so students can discover your brand.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <ProfileFieldInput
            label="Organisation"
            placeholder="e.g. Zenith Circle"
            register={register("organisation", { required: "Organisation name is required" })}
            error={errors.organisation?.message}
          />

          <ProfileFieldInput
            label="Description"
            placeholder="Tell students what your organisation does"
            register={register("description", { required: "Description is required" })}
            error={errors.description?.message}
          />

          <ProfileFieldInput
            label="Website"
            placeholder="https://yourcompany.com"
            register={register("website", {
              required: "Website is required",
              pattern: { value: /^https?:\/\/.+\..+/, message: "Enter a valid URL" },
            })}
            error={errors.website?.message}
          />

          <ProfileFieldInput
            label="Location"
            placeholder="e.g. Lagos, Nigeria"
            register={register("location", { required: "Location is required" })}
            error={errors.location?.message}
          />
          <div className="flex flex-col items-center gap-3 rounded-[18px] bg-[#E6E6E6] px-4 py-5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full border border-dashed border-[#3f8a52] bg-white"
            >
              {preview ? (
                <img src={preview} alt="Logo preview" className="h-full w-full object-cover" />
              ) : (
                <Upload size={17} className="text-[#3f8a52]" />
              )}
            </button>
            <span className="text-xs text-[#5f6f63]">
              {logoFile?.name ?? "Tap to upload your organisation logo"}
            </span>

            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_TYPES.join(",")}
              className="hidden"
              onChange={handleLogoChange}
            />
            <input
              type="hidden"
              {...register("logo", {
                required: "Logo is required",
                validate: (file) => {
                  if (!file) return "Logo is required";
                  if (!ACCEPTED_TYPES.includes(file.type)) {
                    return "Only PNG, JPG or WEBP files are allowed";
                  }
                  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                    return `File must be under ${MAX_FILE_SIZE_MB}MB`;
                  }
                  return true;
                },
              })}
            />
            {errors.logo?.message && (
              <p className="text-xs text-red-500">{errors.logo.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            className="h-[48px] w-full rounded-[14px] bg-[#2b6b41] text-sm font-semibold"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Continue"}
          </Button>
        </form>
      </div>
      <StatusModal 
      open={success} type="success" 
      message="Profile created successfully. Proceed to dashboard" 
      buttonText="Okay" onButtonClick={() => router.push("/")} 
      onClose={() => setSuccess(false)} /> 
      
      <StatusModal 
      open={!!error} type="error" 
      message={error} buttonText="Okay" 
      onButtonClick={closeErrorModal} 
      onClose={closeErrorModal} />
    </div>
  );
};

export default RecruiterProfile;

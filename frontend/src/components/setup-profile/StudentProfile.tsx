"use client";

import { useRef, useState, } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";
import Button from "@/components/Button";
import ProfileFieldInput from "@/components/ProfileFieldInput";
import StepProgress from "@/components/StepProgress";
import StatusModal from "@/components/StatusModal";
import { useCreateStudentProfile } from "@/hooks/useProfile";
import { StudentProfileRequest } from "@/types/profile";
import { trackEvent } from "@/lib/gtag";
const MAX_FILE_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

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

const interestOptions = [
  "Product Design",
  "HealthTech",
  "Public Health",
  "E-commerce",
  "Developer",
  "FinTech",
  "Project Management",
  "Social Media Manager",
];

const levelOptions = ["100L", "200L", "300L", "400L", "500L"];

const TOTAL_STEPS = 4;

type NotificationPrefs = {
  matchProfile: boolean;
  deadline7: boolean;
  deadline24: boolean;
  applicationStatus: boolean;
  weeklyDigest: boolean;
  announcement: boolean;
};

const stepFields: Record<number, (keyof StudentProfileRequest)[]> = {
  0: ["profile_photo", "display_name", "email"],
  1: ["institution", "course_of_study", "current_level", "expected_graduation"],
  2: [],
  3: [],
};

const chipClass = (selected: boolean) =>
  selected
    ? "rounded-full border border-[#3f8a52] bg-[#d5f4cf] px-3 py-1.5 text-sm font-medium text-[#1b4e2c] transition"
    : "px-2 py-1.5 text-sm text-[#514a4c] transition hover:text-[#2b2d33]";

const StudentProfile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const closeErrorModal = () => setError("");

  const [notifications, setNotifications] = useState<NotificationPrefs>({
    matchProfile: true,
    deadline7: true,
    deadline24: true,
    applicationStatus: true,
    weeklyDigest: false,
    announcement: false,
  });

  const { mutate, isPending } = useCreateStudentProfile();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<StudentProfileRequest>({
    mode: "onChange",
    defaultValues: {
      display_name: "",
      email: "",
      institution: "",
      course_of_study: "",
      current_level: "",
      expected_graduation: "",
      skills: [],
      interests: [],
    },
  });

  const skills = watch("skills");
  const interests = watch("interests");
  const currentLevel = watch("current_level");
  const profilePhoto = watch("profile_photo");

  const stepTitles = [
    "Tell us about you",
    "Your academic background",
    "Skills & interests",
    "Stay in the loop",
  ];

  const stepDescriptions = [
    "We use this to personalise your experience",
    "Helps us match eligible opportunities",
    "Select the fields that best describe you",
    "Customise your notification preferences",
  ];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("profile_photo", file, { shouldValidate: true });

    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  };

  const toggleChip = (group: "skills" | "interests", value: string) => {
    const current = group === "skills" ? skills : interests;
    const alreadySelected = current.includes(value);
    setValue(
      group,
      alreadySelected ? current.filter((item) => item !== value) : [...current, value],
      { shouldValidate: true }
    );
  };

  const toggleNotification = (key: keyof NotificationPrefs) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const goBack = () => (step === 0 ? router.back() : setStep((prev) => prev - 1));

  const handleContinue = async () => {
    const isStepValid = await trigger(stepFields[step]);
    if (!isStepValid) return;

    if (step < TOTAL_STEPS - 1) {
      setStep((prev) => prev + 1);
      return;
    }

    handleSubmit(onSubmit)();
  };

  const onSubmit = (data: StudentProfileRequest) => {
    mutate(data, {
      onSuccess: (response) => {
        console.log("Student profile response:", response);
        
        reset();
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        setSuccess(true);
      },
      onError: (error: any) => {
        setError(error.message || "Unable to save your profile.");
      },
    });
  };

  return (
    <div className="min-h-screen w-full bg-white px-4 py-10">
      <div className="mx-auto flex w-full max-w-[700px] flex-col gap-6 rounded-[24px] bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
        <div className="relative flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={goBack}
            className="absolute left-0 top-0 rounded-full p-1 text-[#205338] transition hover:bg-[#f1e8ea]"
            aria-label="Go to previous step"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[24px] font-bold text-[#1f4c33]">Set up your profile</h1>
          <StepProgress currentStep={step} totalSteps={TOTAL_STEPS} />
        </div>

        <div className="flex flex-col gap-1 text-left">
          <h1 className="text-[24px] font-bold text-[#1f4c33]">{stepTitles[step]}</h1>
          <p className="text-sm text-[#83787b]">{stepDescriptions[step]}</p>
        </div>

        <form className="flex flex-col gap-4">
          {step === 0 && (
            <>

              <ProfileFieldInput
                label="Display name"
                placeholder="Enter your display name"
                register={register("display_name", {
                  required: "Display name is required",
                })}
                error={errors.display_name?.message}
              />

              <ProfileFieldInput
                label="Email"
                placeholder="Enter your email"
                type="email"
                register={register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                error={errors.email?.message}
              />

              <div className="flex flex-col items-center gap-3 rounded-[18px] bg-[#E6E6E6] px-4 py-5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full border border-dashed border-[#3f8a52] bg-white"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile photo preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Upload size={17} className="text-[#3f8a52]" />
                  )}
                </button>
                <span className="text-xs text-[#5f6f63]">
                  {profilePhoto?.name ?? "Tap to upload your profile photo"}
                </span>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_TYPES.join(",")}
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <input
                  type="hidden"
                  {...register("profile_photo", {
                    required: "Profile photo is required",
                    validate: (file) => {
                      if (!file) return "Profile photo is required";
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
                {errors.profile_photo?.message && (
                  <p className="text-xs text-red-500">{errors.profile_photo.message}</p>
                )}
              </div>
            </>
          )}

          {step === 1 && (
            <>
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
                  required: "Course of study is required",
                })}
                error={errors.course_of_study?.message}
              />

              <div className="flex flex-col gap-2 rounded-[18px] bg-[#E6E6E6] px-4 py-3">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1f4c33]">
                  Current level
                </label>
                <div className="flex flex-wrap gap-1">
                  {levelOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setValue("current_level", option, { shouldValidate: true })
                      }
                      className={chipClass(currentLevel === option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {errors.current_level?.message && (
                  <p className="text-xs text-red-500">{errors.current_level.message}</p>
                )}
                <input
                  type="hidden"
                  {...register("current_level", { required: "Please select your level" })}
                />
              </div>

              <ProfileFieldInput
                label="Expected graduation"
                type="date"
                register={register("expected_graduation", {
                  required: "Expected graduation is required",
                })}
                error={errors.expected_graduation?.message}
              />
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex flex-col gap-2 rounded-[18px] bg-[#E6E6E6] px-4 py-3">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1f4c33]">
                  Your skills
                </label>
                <div className="flex flex-wrap gap-1">
                  {skillOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleChip("skills", option)}
                      className={chipClass(skills.includes(option))}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-[18px] bg-[#E6E6E6] px-4 py-3">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1f4c33]">
                  Career interest
                </label>
                <div className="flex flex-wrap gap-1">
                  {interestOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleChip("interests", option)}
                      className={chipClass(interests.includes(option))}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-3">
              {[
                { key: "matchProfile", label: "New opportunities matching my profile" },
                { key: "deadline7", label: "Deadline reminders - 7 days before" },
                { key: "deadline24", label: "Deadline reminders - 24 hours before" },
                { key: "applicationStatus", label: "Application Status Updates" },
                { key: "weeklyDigest", label: "Weekly Opportunity Digest" },
                { key: "announcement", label: "Platform Announcement" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between rounded-[16px] bg-[#E6E6E6] px-4 py-3"
                >
                  <span className="text-[14px] text-[#2b2d33]">{item.label}</span>
                  <button
                    type="button"
                    onClick={() => toggleNotification(item.key as keyof NotificationPrefs)}
                    className={`relative h-[26px] w-[48px] rounded-full transition ${
                      notifications[item.key as keyof NotificationPrefs]
                        ? "bg-[#2b6b41]"
                        : "bg-[#c8bec1]"
                    }`}
                  >
                    <span
                      className={`absolute top-[3px] h-[20px] w-[20px] rounded-full bg-white transition ${
                        notifications[item.key as keyof NotificationPrefs]
                          ? "right-[3px]"
                          : "left-[3px]"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </form>

        <Button
          type="button"
          variant="primary"
          className="h-[48px] w-full rounded-[14px] bg-[#2b6b41] text-sm font-semibold"
          onClick={handleContinue}
          disabled={isPending}
        >
          {isPending
            ? "Saving..."
            : step === TOTAL_STEPS - 1
            ? "Finish Set Up"
            : "Continue"}
        </Button>
      </div>

      <StatusModal
        open={success}
        type="success"
        message="Profile created successfully. You're all set to explore opportunities."
        buttonText="Okay"
        onButtonClick={() => router.push(nextPath || "/")}
        onClose={() => setSuccess(false)}
      />

      <StatusModal
        open={!!error}
        type="error"
        message={error}
        buttonText="Okay"
        onButtonClick={closeErrorModal}
        onClose={closeErrorModal}
      />
    </div>
  );
};

export default StudentProfile;

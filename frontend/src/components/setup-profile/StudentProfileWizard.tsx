// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { ArrowLeft } from "lucide-react";
// import Button from "@/components/Button";
// import Input from "@/components/Input";

// type StudentProfileForm = {
//   displayName: string;
//   phoneNumber: string;
//   gender: string;
//   dateOfBirth: string;
//   university: string;
//   courseStudy: string;
//   currentLevel: string;
//   expectedGraduation: string;
//   skills: string[];
//   interests: string[];
//   notifications: {
//     matchProfile: boolean;
//     deadline7: boolean;
//     deadline24: boolean;
//     applicationStatus: boolean;
//     weeklyDigest: boolean;
//     announcement: boolean;
//   };
// };

// const skillOptions = [
//   "UI Design",
//   "UX Research",
//   "Figma",
//   "Prototyping",
//   "User Testing",
//   "HTML/CSS",
//   "Adobe XD",
//   "React",
//   "AI Tools",
// ];

// const interestOptions = [
//   "Product Design",
//   "HealthTech",
//   "Public Health",
//   "E-commerce",
//   "Developer",
//   "FinTech",
//   "Project Management",
//   "Social Media Manager",
// ];

// const genderOptions = ["Male", "Female", "Prefer not to say"];
// const levelOptions = ["100L", "200L", "300L", "400L", "500L"];

// const initialForm: StudentProfileForm = {
//   displayName: "",
//   phoneNumber: "",
//   gender: "",
//   dateOfBirth: "",
//   university: "",
//   courseStudy: "",
//   currentLevel: "",
//   expectedGraduation: "",
//   skills: [],
//   interests: [],
//   notifications: {
//     matchProfile: true,
//     deadline7: true,
//     deadline24: true,
//     applicationStatus: true,
//     weeklyDigest: false,
//     announcement: false,
//   },
// };

// const StudentProfileWizard = () => {
//   const router = useRouter();
//   const [step, setStep] = useState(0);
//   const [form, setForm] = useState<StudentProfileForm>(initialForm);

//   const progressSteps = [0, 1, 2, 3];
//   const stepTitles = [
//     "Tell us about you",
//     "Your academic background",
//     "Skills & interests",
//     "Stay in the loop",
//   ];

//   const stepDescriptions = [
//     "We use this to personalise your experience",
//     "Helps us match eligible opportunities",
//     "Select the fields that best describe you",
//     "Customise your notification preferences",
//   ];

//   const currentTitle = stepTitles[step];
//   const currentDescription = stepDescriptions[step];

//   const toggleChip = (group: "skills" | "interests", value: string) => {
//     setForm((prev) => {
//       const currentSelection = prev[group];
//       const alreadySelected = currentSelection.includes(value);
//       return {
//         ...prev,
//         [group]: alreadySelected
//           ? currentSelection.filter((item) => item !== value)
//           : [...currentSelection, value],
//       };
//     });
//   };

//   const toggleNotification = (key: keyof StudentProfileForm["notifications"]) => {
//     setForm((prev) => ({
//       ...prev,
//       notifications: {
//         ...prev.notifications,
//         [key]: !prev.notifications[key],
//       },
//     }));
//   };

//   const handleContinue = () => {
//     if (step < 3) {
//       setStep((prev) => prev + 1);
//       return;
//     }

//     router.push("/");
//   };

//   return (
//     <div className="min-h-screen bg-white px-5 py-8 text-[#205338]">
//       <div className="mx-auto flex max-w-[860px] flex-col gap-6 rounded-[18px] border border-[#d9d3d6] bg-[#fdfdfd] p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
//         <div className="flex items-center justify-between">
//           <button
//             type="button"
//             onClick={() => (step === 0 ? router.back() : setStep((prev) => prev - 1))}
//             className="rounded-full p-2 text-[#205338] transition hover:bg-[#f1e8ea]"
//             aria-label="Go to previous step"
//           >
//             <ArrowLeft size={20} />
//           </button>

//           <div className="flex items-center gap-3">
//             {progressSteps.map((index) => (
//               <div
//                 key={index}
//                 className={`h-[4px] w-[118px] rounded-full ${
//                   index <= step ? "bg-[#2b6b41]" : "bg-[#e7d9dc]"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-col gap-2">
//           <h1 className="text-[28px] font-semibold text-[#1f4c33]">{currentTitle}</h1>
//           <p className="text-sm text-[#4d6b56]">{currentDescription}</p>
//         </div>

//         {step === 0 && (
//           <div className="space-y-4 rounded-[20px] bg-[#f7f3f4] p-5">
//             <Input
//               label="DISPLAY NAME"
//               placeholder="Enter your display name"
//               value={form.displayName}
//               onChange={(e) => setForm((prev) => ({ ...prev, displayName: e.target.value }))}
//               className="text-[15px]"
//               inputHeight="h-[56px]"
//             />

//             <Input
//               label="PHONE NUMBER"
//               placeholder="Enter your phone number"
//               value={form.phoneNumber}
//               onChange={(e) => setForm((prev) => ({ ...prev, phoneNumber: e.target.value }))}
//               className="text-[15px]"
//               inputHeight="h-[56px]"
//             />

//             <div className="flex flex-col gap-2">
//               <label className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#5f6f63]">
//                 GENDER
//               </label>
//               <div className="flex flex-wrap gap-3">
//                 {genderOptions.map((option) => {
//                   const selected = form.gender === option;
//                   return (
//                     <button
//                       key={option}
//                       type="button"
//                       onClick={() => setForm((prev) => ({ ...prev, gender: option }))}
//                       className={`rounded-[10px] border px-3 py-2 text-sm transition ${
//                         selected
//                           ? "border-[#3f8a52] bg-[#d5f4cf] text-[#1b4e2c]"
//                           : "border-[#d8d4d7] bg-white text-[#2b2d33]"
//                       }`}
//                     >
//                       {option}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             <Input
//               label="DATE OF BIRTH"
//               placeholder="DD/MM/YYYY"
//               value={form.dateOfBirth}
//               onChange={(e) => setForm((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
//               className="text-[15px]"
//               inputHeight="h-[56px]"
//             />
//           </div>
//         )}

//         {step === 1 && (
//           <div className="space-y-4 rounded-[20px] bg-[#f7f3f4] p-5">
//             <Input
//               label="UNIVERSITY"
//               placeholder="Enter your university"
//               value={form.university}
//               onChange={(e) => setForm((prev) => ({ ...prev, university: e.target.value }))}
//               className="text-[15px]"
//               inputHeight="h-[56px]"
//             />

//             <Input
//               label="COURSE STUDY"
//               placeholder="Enter your course"
//               value={form.courseStudy}
//               onChange={(e) => setForm((prev) => ({ ...prev, courseStudy: e.target.value }))}
//               className="text-[15px]"
//               inputHeight="h-[56px]"
//             />

//             <div className="flex flex-col gap-2">
//               <label className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#5f6f63]">
//                 CURRENT LEVEL
//               </label>
//               <div className="flex flex-wrap gap-3">
//                 {levelOptions.map((option) => {
//                   const selected = form.currentLevel === option;
//                   return (
//                     <button
//                       key={option}
//                       type="button"
//                       onClick={() => setForm((prev) => ({ ...prev, currentLevel: option }))}
//                       className={`rounded-[10px] border px-3 py-2 text-sm transition ${
//                         selected
//                           ? "border-[#3f8a52] bg-[#d5f4cf] text-[#1b4e2c]"
//                           : "border-[#d8d4d7] bg-white text-[#2b2d33]"
//                       }`}
//                     >
//                       {option}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             <Input
//               label="EXPECTED GRADUATION"
//               placeholder="Enter your graduation month/year"
//               value={form.expectedGraduation}
//               onChange={(e) => setForm((prev) => ({ ...prev, expectedGraduation: e.target.value }))}
//               className="text-[15px]"
//               inputHeight="h-[56px]"
//             />
//           </div>
//         )}

//         {step === 2 && (
//           <div className="space-y-8 rounded-[20px] bg-[#f7f3f4] p-5">
//             <div className="space-y-3">
//               <label className="block text-[13px] font-semibold uppercase tracking-[0.24em] text-[#5f6f64]">
//                 YOUR SKILLS
//               </label>

//               <div className="flex flex-wrap gap-3">
//                 {skillOptions.map((option) => {
//                   const selected = form.skills.includes(option);
//                   return (
//                     <button
//                       key={option}
//                       type="button"
//                       onClick={() => toggleChip("skills", option)}
//                       className={`rounded-[10px] border px-3 py-2 text-sm transition ${
//                         selected
//                           ? "border-[#3f8a52] bg-[#d5f4cf] text-[#1b4e2c]"
//                           : "border-[#d8d4d7] bg-white text-[#2b2d33]"
//                       }`}
//                     >
//                       {option}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="space-y-3">
//               <label className="block text-[13px] font-semibold uppercase tracking-[0.24em] text-[#5f6f64]">
//                 CAREER INTEREST
//               </label>

//               <div className="flex flex-wrap gap-3">
//                 {interestOptions.map((option) => {
//                   const selected = form.interests.includes(option);
//                   return (
//                     <button
//                       key={option}
//                       type="button"
//                       onClick={() => toggleChip("interests", option)}
//                       className={`rounded-[10px] border px-3 py-2 text-sm transition ${
//                         selected
//                           ? "border-[#3f8a52] bg-[#d5f4cf] text-[#1b4e2c]"
//                           : "border-[#d8d4d7] bg-white text-[#2b2d33]"
//                       }`}
//                     >
//                       {option}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         )}

//         {step === 3 && (
//           <div className="space-y-3 rounded-[20px] bg-[#f7f3f4] p-5">
//             {[
//               { key: "matchProfile", label: "New opportunities matching my profile" },
//               { key: "deadline7", label: "Deadline reminders - 7 days before" },
//               { key: "deadline24", label: "Deadline reminders - 24 hours before" },
//               { key: "applicationStatus", label: "Application Status Updates" },
//               { key: "weeklyDigest", label: "Weekly Opportunity Digest" },
//               { key: "announcement", label: "Platform Announcement" },
//             ].map((item) => (
//               <div
//                 key={item.key}
//                 className="flex items-center justify-between rounded-[16px] border border-[#e8dce0] bg-white px-4 py-3"
//               >
//                 <span className="text-[15px] text-[#153526]">{item.label}</span>
//                 <button
//                   type="button"
//                   onClick={() => toggleNotification(item.key as keyof StudentProfileForm["notifications"])}
//                   className={`relative h-[28px] w-[54px] rounded-full transition ${
//                     form.notifications[item.key as keyof StudentProfileForm["notifications"]]
//                       ? "bg-[#2b6b41]"
//                       : "bg-[#a69ca1]"
//                   }`}
//                 >
//                   <span
//                     className={`absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white transition ${
//                       form.notifications[item.key as keyof StudentProfileForm["notifications"]]
//                         ? "right-[3px]"
//                         : "left-[3px]"
//                     }`}
//                   />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="flex items-center justify-between gap-4 pt-2">
//           <Button
//             type="button"
//             variant="muted"
//             className="h-[46px] rounded-[10px] px-5 text-sm font-semibold"
//             onClick={() => (step === 0 ? router.back() : setStep((prev) => prev - 1))}
//           >
//             Back
//           </Button>

//           <Button
//             type="button"
//             variant="primary"
//             className="h-[46px] rounded-[10px] bg-[#2b6b41] px-8 text-sm font-semibold"
//             onClick={handleContinue}
//           >
//             {step === 3 ? "Finish Set Up" : "Continue"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfileWizard;

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";

type StudentProfileForm = {
  displayName: string;
  phoneNumber: string;
  dateOfBirth: string;
  university: string;
  courseStudy: string;
  currentLevel: string;
  expectedGraduation: string;
  skills: string[];
  interests: string[];
  notifications: {
    matchProfile: boolean;
    deadline7: boolean;
    deadline24: boolean;
    applicationStatus: boolean;
    weeklyDigest: boolean;
    announcement: boolean;
  };
};

const skillOptions = [
  "UI Design",
  "UX Research",
  "Figma",
  "Prototyping",
  "User Testing",
  "HTML/CSS",
  "Adobe XD",
  "React",
  "AI Tools",
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

// Fields validated before the user can advance from each step
const stepFields: Record<number, (keyof StudentProfileForm)[]> = {
  0: ["displayName", "phoneNumber", "dateOfBirth"],
  1: ["university", "courseStudy", "currentLevel", "expectedGraduation"],
  2: [], // skills/interests optional - remove if you want to require at least one
  3: [],
};

const StudentProfileWizard = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<StudentProfileForm>({
    mode: "onChange",
    defaultValues: {
      displayName: "",
      phoneNumber: "",
      dateOfBirth: "",
      university: "",
      courseStudy: "",
      currentLevel: "",
      expectedGraduation: "",
      skills: [],
      interests: [],
      notifications: {
        matchProfile: true,
        deadline7: true,
        deadline24: true,
        applicationStatus: true,
        weeklyDigest: false,
        announcement: false,
      },
    },
  });

  const skills = watch("skills");
  const interests = watch("interests");
  const currentLevel = watch("currentLevel");
  const notifications = watch("notifications");

  const progressSteps = [0, 1, 2, 3];
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

  const currentTitle = stepTitles[step];
  const currentDescription = stepDescriptions[step];

  const toggleChip = (group: "skills" | "interests", value: string) => {
    const current = group === "skills" ? skills : interests;
    const alreadySelected = current.includes(value);
    setValue(
      group,
      alreadySelected ? current.filter((item) => item !== value) : [...current, value],
      { shouldValidate: true }
    );
  };

  const toggleNotification = (key: keyof StudentProfileForm["notifications"]) => {
    setValue(
      "notifications",
      { ...notifications, [key]: !notifications[key] },
      { shouldValidate: true }
    );
  };

  const goBack = () => (step === 0 ? router.back() : setStep((prev) => prev - 1));

  const handleContinue = async () => {
    const isStepValid = await trigger(stepFields[step]);
    if (!isStepValid) return;

    if (step < 3) {
      setStep((prev) => prev + 1);
      return;
    }

    handleSubmit(onSubmit)();
  };

  const onSubmit = (data: StudentProfileForm) => {
    // TODO: wire this up to your profile mutation once the API is ready
    // e.g. mutate(data, { onSuccess: () => router.push("/") })
    console.log("Student profile data:", data);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white px-5 py-8 text-[#205338]">
      <div className="mx-auto flex max-w-[860px] flex-col gap-6 rounded-[18px] border border-[#d9d3d6] bg-[#fdfdfd] p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            className="rounded-full p-2 text-[#205338] transition hover:bg-[#f1e8ea]"
            aria-label="Go to previous step"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex items-center gap-3">
            {progressSteps.map((index) => (
              <div
                key={index}
                className={`h-[4px] w-[118px] rounded-full ${
                  index <= step ? "bg-[#2b6b41]" : "bg-[#e7d9dc]"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-[28px] font-semibold text-[#1f4c33]">{currentTitle}</h1>
          <p className="text-sm text-[#4d6b56]">{currentDescription}</p>
        </div>

        <form>
          {step === 0 && (
            <div className="space-y-4 rounded-[20px] bg-[#f7f3f4] p-5">
              <Input
                label="DISPLAY NAME"
                placeholder="Enter your display name"
                register={register("displayName", {
                  required: "Display name is required",
                })}
                error={errors.displayName?.message}
                className="text-[15px]"
                inputHeight="h-[56px]"
              />

              <Input
                label="PHONE NUMBER"
                placeholder="Enter your phone number"
                register={register("phoneNumber", {
                  required: "Phone number is required",
                })}
                error={errors.phoneNumber?.message}
                className="text-[15px]"
                inputHeight="h-[56px]"
              />

              <Input
                label="DATE OF BIRTH"
                placeholder="DD/MM/YYYY"
                register={register("dateOfBirth", {
                  required: "Date of birth is required",
                })}
                error={errors.dateOfBirth?.message}
                className="text-[15px]"
                inputHeight="h-[56px]"
              />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4 rounded-[20px] bg-[#f7f3f4] p-5">
              <Input
                label="UNIVERSITY"
                placeholder="Enter your university"
                register={register("university", {
                  required: "University is required",
                })}
                error={errors.university?.message}
                className="text-[15px]"
                inputHeight="h-[56px]"
              />

              <Input
                label="COURSE STUDY"
                placeholder="Enter your course"
                register={register("courseStudy", {
                  required: "Course of study is required",
                })}
                error={errors.courseStudy?.message}
                className="text-[15px]"
                inputHeight="h-[56px]"
              />

              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#5f6f63]">
                  CURRENT LEVEL
                </label>
                <div className="flex flex-wrap gap-3">
                  {levelOptions.map((option) => {
                    const selected = currentLevel === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setValue("currentLevel", option, { shouldValidate: true })
                        }
                        className={`rounded-[10px] border px-3 py-2 text-sm transition ${
                          selected
                            ? "border-[#3f8a52] bg-[#d5f4cf] text-[#1b4e2c]"
                            : "border-[#d8d4d7] bg-white text-[#2b2d33]"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {errors.currentLevel?.message && (
                  <p className="text-xs text-red-500">{errors.currentLevel.message}</p>
                )}
                <input
                  type="hidden"
                  {...register("currentLevel", { required: "Please select your level" })}
                />
              </div>

              <Input
                label="EXPECTED GRADUATION"
                placeholder="Enter your graduation month/year"
                register={register("expectedGraduation", {
                  required: "Expected graduation is required",
                })}
                error={errors.expectedGraduation?.message}
                className="text-[15px]"
                inputHeight="h-[56px]"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 rounded-[20px] bg-[#f7f3f4] p-5">
              <div className="space-y-3">
                <label className="block text-[13px] font-semibold uppercase tracking-[0.24em] text-[#5f6f64]">
                  YOUR SKILLS
                </label>

                <div className="flex flex-wrap gap-3">
                  {skillOptions.map((option) => {
                    const selected = skills.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleChip("skills", option)}
                        className={`rounded-[10px] border px-3 py-2 text-sm transition ${
                          selected
                            ? "border-[#3f8a52] bg-[#d5f4cf] text-[#1b4e2c]"
                            : "border-[#d8d4d7] bg-white text-[#2b2d33]"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[13px] font-semibold uppercase tracking-[0.24em] text-[#5f6f64]">
                  CAREER INTEREST
                </label>

                <div className="flex flex-wrap gap-3">
                  {interestOptions.map((option) => {
                    const selected = interests.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleChip("interests", option)}
                        className={`rounded-[10px] border px-3 py-2 text-sm transition ${
                          selected
                            ? "border-[#3f8a52] bg-[#d5f4cf] text-[#1b4e2c]"
                            : "border-[#d8d4d7] bg-white text-[#2b2d33]"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3 rounded-[20px] bg-[#f7f3f4] p-5">
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
                  className="flex items-center justify-between rounded-[16px] border border-[#e8dce0] bg-white px-4 py-3"
                >
                  <span className="text-[15px] text-[#153526]">{item.label}</span>
                  <button
                    type="button"
                    onClick={() =>
                      toggleNotification(item.key as keyof StudentProfileForm["notifications"])
                    }
                    className={`relative h-[28px] w-[54px] rounded-full transition ${
                      notifications[item.key as keyof StudentProfileForm["notifications"]]
                        ? "bg-[#2b6b41]"
                        : "bg-[#a69ca1]"
                    }`}
                  >
                    <span
                      className={`absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white transition ${
                        notifications[item.key as keyof StudentProfileForm["notifications"]]
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

        <div className="flex items-center justify-between gap-4 pt-2">
          <Button
            type="button"
            variant="muted"
            className="h-[46px] rounded-[10px] px-5 text-sm font-semibold"
            onClick={goBack}
          >
            Back
          </Button>

          <Button
            type="button"
            variant="primary"
            className="h-[46px] rounded-[10px] bg-[#2b6b41] px-8 text-sm font-semibold"
            onClick={handleContinue}
          >
            {step === 3 ? "Finish Set Up" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileWizard;
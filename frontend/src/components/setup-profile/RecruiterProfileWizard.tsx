// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { ArrowLeft } from "lucide-react";
// import Button from "@/components/Button";
// import Input from "@/components/Input";

// const RecruiterProfileWizard = () => {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     organisation: "Zenith Circle",
//     description: "We help students discover opportunities early.",
//     website: "https://example.com",
//     location: "Lagos, Nigeria",
//     logo: "https://example.com/logo.png",
//   });

//   return (
//     <div className="min-h-screen bg-white px-5 py-8 text-[#205338]">
//       <div className="mx-auto flex max-w-[860px] flex-col gap-6 rounded-[18px] border border-[#d9d3d6] bg-[#fdfdfd] p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
//         <div className="flex items-center justify-between">
//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="rounded-full p-2 text-[#205338] transition hover:bg-[#f1e8ea]"
//             aria-label="Go back"
//           >
//             <ArrowLeft size={20} />
//           </button>
//         </div>

//         <div className="flex flex-col gap-2">
//           <h1 className="text-[28px] font-semibold text-[#1f4c33]">Recruiter profile</h1>
//           <p className="text-sm text-[#4d6b56]">Set up your organisation so students can discover your brand.</p>
//         </div>

//         <div className="space-y-4 rounded-[20px] bg-[#f7f3f4] p-5">
//           <Input
//             label="Organisation"
//             value={form.organisation}
//             onChange={(e) => setForm((prev) => ({ ...prev, organisation: e.target.value }))}
//             className="text-[15px]"
//             inputHeight="h-[56px]"
//           />

//           <Input
//             label="Description"
//             value={form.description}
//             onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
//             className="text-[15px]"
//             inputHeight="h-[56px]"
//           />

//           <Input
//             label="Website"
//             value={form.website}
//             onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
//             className="text-[15px]"
//             inputHeight="h-[56px]"
//           />

//           <Input
//             label="Location"
//             value={form.location}
//             onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
//             className="text-[15px]"
//             inputHeight="h-[56px]"
//           />

//           <Input
//             label="Logo"
//             value={form.logo}
//             onChange={(e) => setForm((prev) => ({ ...prev, logo: e.target.value }))}
//             className="text-[15px]"
//             inputHeight="h-[56px]"
//           />
//         </div>

//         <div className="flex justify-center pt-2">
//           <Button
//             type="button"
//             variant="primary"
//             className="h-[46px] w-[200px] rounded-[10px] bg-[#2b6b41] text-sm font-semibold"
//             onClick={() => router.push("/")}
//           >
//             Continue
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruiterProfileWizard;


"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";

interface RecruiterProfileFormValues {
  organisation: string;
  description: string;
  website: string;
  location: string;
  logo: string;
}

const RecruiterProfileWizard = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecruiterProfileFormValues>({
    mode: "onChange",
  });

  const onSubmit = (data: RecruiterProfileFormValues) => {
    // TODO: wire this up to your profile mutation once the API is ready
    // e.g. mutate(data, { onSuccess: () => router.push("/") })
    console.log("Recruiter profile data:", data);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white px-5 py-8 text-[#205338]">
      <div className="mx-auto flex max-w-[860px] flex-col gap-6 rounded-[18px] border border-[#d9d3d6] bg-[#fdfdfd] p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full p-2 text-[#205338] transition hover:bg-[#f1e8ea]"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-[28px] font-semibold text-[#1f4c33]">Recruiter profile</h1>
          <p className="text-sm text-[#4d6b56]">
            Set up your organisation so students can discover your brand.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Input
            label="Organisation"
            placeholder="e.g. Zenith Circle"
            register={register("organisation", {
              required: "Organisation name is required",
            })}
            error={errors.organisation?.message}
            className="text-[15px]"
            inputHeight="h-[56px]"
          />

          <Input
            label="Description"
            placeholder="Tell students what your organisation does"
            register={register("description", {
              required: "Description is required",
            })}
            error={errors.description?.message}
            className="text-[15px]"
            inputHeight="h-[56px]"
          />

          <Input
            label="Website"
            placeholder="https://yourcompany.com"
            register={register("website", {
              required: "Website is required",
              pattern: {
                value: /^https?:\/\/.+\..+/,
                message: "Enter a valid URL",
              },
            })}
            error={errors.website?.message}
            className="text-[15px]"
            inputHeight="h-[56px]"
          />

          <Input
            label="Location"
            placeholder="e.g. Lagos, Nigeria"
            register={register("location", {
              required: "Location is required",
            })}
            error={errors.location?.message}
            className="text-[15px]"
            inputHeight="h-[56px]"
          />

          <Input
            label="Logo"
            placeholder="https://yourcompany.com/logo.png"
            register={register("logo")}
            error={errors.logo?.message}
            className="text-[15px]"
            inputHeight="h-[56px]"
          />

          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              variant="primary"
              className="h-[46px] w-[200px] rounded-[10px] bg-[#2b6b41] text-sm font-semibold"
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecruiterProfileWizard;
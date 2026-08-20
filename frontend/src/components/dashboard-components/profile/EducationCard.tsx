import { GraduationCap } from "lucide-react";

interface EducationCardProps {
  institution: string;
  course: string;
  level: string;
  graduation: string;
}

export default function EducationCard({
  institution,
  course,
  level,
  graduation,
}: EducationCardProps) {
  return (
    <div className="rounded-[12px] border border-[#a9aaa4] bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-bold text-[#1f1f1f]">
          Education
        </h3>

        <span className="text-sm text-[#70696b]">
          {graduation || "—"}
        </span>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e6e6e6] text-[#2b6b41]">
          <GraduationCap size={20} />
        </div>

        <div>
          <p className="text-sm font-semibold text-[#363132]">
            {course || "Course not provided"}
          </p>

          <p className="mt-0.5 text-sm text-[#70696b]">
            {institution || "Institution not provided"}
          </p>

          <p className="mt-1 text-sm text-[#70696b]">
            {level || "Level not provided"}
          </p>
        </div>
      </div>
    </div>
  );
}
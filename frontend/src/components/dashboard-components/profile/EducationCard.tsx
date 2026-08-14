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
    <div className="rounded-[12px] border border-[#a9aaa4] bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-bold text-[#1f1f1f]">
          Education
        </h3>

        <span className="text-[10px] text-[#70696b]">
          {graduation || "—"}
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#e6e6e6] text-xs">
          <GraduationCap />
        </div>

        <div>
          <p className="text-xs font-semibold text-[#363132]">
            {course || "Course not provided"}
          </p>

          <p className="text-[11px] text-[#70696b]">
            {institution || "Institution not provided"}
          </p>

          <p className="mt-1 text-[10px] text-[#70696b]">
            {level || "Level not provided"}
          </p>
        </div>
      </div>
    </div>
  );
}

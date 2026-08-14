import { Box, SquarePen, FileText, SquareDot, Tag } from "lucide-react";
import { Opportunity } from "@/types/opportunity";


interface OpportunityOverviewPanelProps {
  opportunity: Opportunity;
}

export default function OpportunityOverviewPanel({
  opportunity,
}:OpportunityOverviewPanelProps) {
  const {
    description,
    responsibilities,
    requirements,
    skills_required,
    benefits,
} = opportunity;
  return (
    <div className="flex flex-col gap-6">
      <section className="border-b border-primary p-5 sm:p-6">
        <h2 className="text-base font-semibold text-gray-900">
          About the Opportunity
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          {description ||
            "No further details available for this opportunity yet."}
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ChecklistCard
          icon={<SquarePen size={18} className="text-primary" />}
          title="Responsibilities"
          items={responsibilities}
        />
        <ChecklistCard
          icon={<FileText size={18} className="text-primary" />}
          title="Requirements"
          items={requirements}
        />
      </div>
        <div className="grid grid-cols-1 border-b border-primary gap-6 lg:grid-cols-2">
        <section className="p-5 sm:p-6">
            <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <Tag size={18} className="text-primary" />
            Skills Required
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
            {skills_required.map((skill) => (
                <span
                key={skill}
                className="rounded-md bg-primary-light px-3 py-1.5 text-xs font-medium text-primary-700"
                >
                {skill}
                </span>
            ))}
            </div>
        </section>

        <section className="p-5 sm:p-6">
            <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <Box size={18} className="text-primary" />
            Benefits
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
            {benefits.map((benefit) => (
                <span
                key={benefit}
                className="flex items-center gap-1.5 rounded-md bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700"
                >
                
                {benefit}
                </span>
            ))}
            </div>
        </section>
        </div>
    </div>
  );
}

function ChecklistCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <section className="p-5 sm:p-6">
      <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
        {icon}
        {title}
      </h2>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-sm text-gray-600"
          >
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-primary">
              <SquareDot size={14} className="text-white" />
            </div>
            {/* <SquareDot size={16} className="mt-0.5 shrink-0 text-emerald-600" /> */}
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { CheckCircle2, ClipboardList, Gift, ListChecks, Sparkles } from "lucide-react";

const RESPONSIBILITIES = [
  "Conduct user research and analyze user needs",
  "Create wireframes, prototypes and mockups",
  "Design responsive and accessible interfaces",
  "Collaborate with developers and product teams",
  "Participate in design reviews and feedback sessions",
  "Improve existing user experiences",
];

const REQUIREMENTS = [
  "Final-year student or recent graduate",
  "Familiarity with Figma or Adobe XD",
  "Portfolio of UI/UX design projects",
  "Understanding of design principles",
  "Good communication and teamwork skills",
];

const SKILLS = [
  "Figma",
  "UI Design",
  "UX Research",
  "Wireframing",
  "Prototyping",
  "Design System",
];

const BENEFITS = [
  "Hybrid",
  "Monthly Stipend",
  "Mentorship & Training",
  "Career Growth",
];

interface OpportunityOverviewPanelProps {
  description?: string;
}

export default function OpportunityOverviewPanel({
  description,
}: OpportunityOverviewPanelProps) {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-[18px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
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
          icon={<ClipboardList size={18} />}
          title="Responsibilities"
          items={RESPONSIBILITIES}
        />
        <ChecklistCard
          icon={<ListChecks size={18} />}
          title="Requirements"
          items={REQUIREMENTS}
        />
      </div>

      <section className="rounded-[18px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
          <Sparkles size={18} className="text-emerald-700" />
          Skills Required
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-[18px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
          <Gift size={18} className="text-amber-700" />
          Benefits
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {BENEFITS.map((benefit) => (
            <span
              key={benefit}
              className="flex items-center gap-1.5 rounded-md bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700"
            >
              <Gift size={14} />
              {benefit}
            </span>
          ))}
        </div>
      </section>
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
    <section className="rounded-[18px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
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
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

"use client";

import { useState } from "react";
import {
  ClipboardList,
  ListChecks,
  Sparkles,
  Gift,
  CheckCircle2,
  Clock,
} from "lucide-react";

const TABS = ["Overview"] as const;
type Tab = (typeof TABS)[number];

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

const SKILLS = ["Figma", "UI Design", "UX Research", "Wireframing", "Prototyping", "Design System"];

const BENEFITS = ["Hybrid", "Monthly Stipend", "Mentorship & Training", "Career Growth"];

const TIMELINE = [
  { label: "Application Opens", date: "1 July, 2026", done: true },
  { label: "Application Deadline", date: "31 July, 2026", done: true },
  { label: "Shortlisting", date: "10 August, 2026", done: false },
  { label: "Interviews", date: "15 - 20 August, 2026", done: false },
  { label: "Start Date", date: "1 September, 2026", done: false },
];

export default function OpportunityDetailsTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div className="mt-6">
      {/* Tab nav */}
      <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`-mb-px border-b-2 pb-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-gray-900 text-black"
                : "text-black-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {activeTab === "Overview" && <OverviewContent />}
      </div>
    </div>
  );
}

function OverviewContent() {
  return (
    <div className="flex flex-col gap-6">
      {/* About */}
      <section className="rounded-xl border border-gray-200 p-5 sm:p-6">
        <h2 className="text-base font-semibold text-gray-900">
          About the Opportunity
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          Join the team as a Product Designer junior staff and collaborate
          with experienced designers to create intuitive digital experiences.
          You&apos;ll participate in user research, wireframing, prototyping,
          and usability testing while working on real products that impact
          thousands of users.
        </p>
      </section>

      {/* Responsibilities + Requirements */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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

      <div className="grid grid-cols-1 border border-b border-gray-200 gap-6 lg:grid-cols-2">
        {/* Skills Required */}
        <section className="p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <Sparkles size={18} />
            Skills Required
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-primary-light text-primary px-3 py-1.5 text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <Gift size={18} />
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

      {/* Application Timeline */}
      <section className="rounded-xl  p-5 sm:p-6">
        <h2 className="text-base font-semibold text-gray-900">
          Application Timeline
        </h2>
        <div className="mt-6 border border-gray-200 overflow-x-auto">
          <div className="flex min-w-max items-start sm:min-w-0 sm:flex-wrap">
            {TIMELINE.map((step, i) => (
              <div
                key={step.label}
                className="relative flex flex-1 flex-col items-center px-3 text-center sm:min-w-[140px]"
              >
                {i > 0 && (
                  <span className="absolute right-1/2 top-[13px] h-px w-full bg-gray-200" />
                )}
                <span
                  className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full ${
                    step.done
                      ? "bg-emerald-600 text-white"
                      : "border-2 border-gray-200 bg-white text-gray-400"
                  }`}
                >
                  {step.done ? <CheckCircle2 size={16} /> : <Clock size={14} />}
                </span>
                <p className="mt-3 text-xs font-medium text-gray-900 sm:text-sm">
                  {step.label}
                </p>
                <p className="mt-1 text-xs text-gray-500">{step.date}</p>
              </div>
            ))}
          </div>
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
    <section className="rounded-xl border border-gray-200 p-5 sm:p-6">
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
            <CheckCircle2
              size={16}
              className="mt-0.5 shrink-0 text-emerald-600"
            />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
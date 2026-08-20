"use client";
import { formatDeadline } from "./OpportunityDetailsHeader";
import {
  Calendar,
  TriangleAlert,
  Users,
  CircleQuestionMark,
  Flag,
} from "lucide-react";

interface OpportunityTimelineProps {
    creationDate:string;
    deadline?: string;
}

export const getDeadlineCountdown = (deadline?: string) => {
  if (!deadline) return "No deadline";

  const now = new Date().getTime();
  const deadlineTime = new Date(deadline).getTime();

  const difference = deadlineTime - now;

  if (difference <= 0) {
    return "Deadline passed";
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (difference % (1000 * 60 * 60)) /
      (1000 * 60)
  );

  return `${days}d ${hours}h ${minutes}m left`;
};


export default function OpportunityTimeline({ creationDate, deadline}: OpportunityTimelineProps) {
  
    const TIMELINE = [
        {
            label: "Application Opens",
            date: formatDeadline(creationDate),
            icon: Calendar,
            bg: "bg-orange-100",
            color: "text-orange-500",
        },
        {
            label: "Application Deadline",
            date: formatDeadline(deadline),
            icon: TriangleAlert,
            bg: "bg-red-100",
            color: "text-red-500",
        },
        {
            label: "Shortlisting",
            date: "To be communicated",
            icon: Users,
            bg: "bg-gray-100",
            color: "text-gray-500",
        },
        {
            label: "Interviews",
            date: "To be communicated",
            icon: CircleQuestionMark,
            bg: "bg-gray-100",
            color: "text-gray-500",
        },
        {
            label: "Start Date",
            date: "To be communicated",
            icon: Flag,
            bg: "bg-green-100",
            color: "text-primary",
        },
    ];
    return (
        <section className="p-5 sm:p-6">
        <h2 className="text-base font-semibold text-gray-900">
            Application Timeline
        </h2>

        <div className="relative overflow-x-auto rounded-lg p-5">
            <p className="absolute right-5 top-5 text-sm font-semibold text-red-500">
                {getDeadlineCountdown(deadline)}
            </p>
        </div>
        <div className="mt-6 overflow-x-auto border border-primary rounded-lg p-5">
            <div className="flex min-w-[680px] items-start gap-3">
            {TIMELINE.map((step, index) => {
                const Icon = step.icon;

                return (
                    <div
                    key={step.label}
                    className="relative flex min-w-[130px] flex-1 flex-col items-center text-center"
                    >
                    {index > 0 && (
                        <span className="absolute -left-6 top-[20px] h-px w-[calc(100%+24px)] border-t border-dashed border-gray-300" />
                    )}

                    <div
                        className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${step.bg}`}
                    >
                        <Icon
                        size={18}
                        className={step.color}
                        {...(step.label === "Start Date" && { fill: "currentColor" })}
                        />
                    </div>

                    <p className="mt-3 text-xs font-medium text-gray-900 sm:text-sm">
                        {step.label}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        {step.date}
                    </p>
                    </div>
                );
                })}
            </div>
        </div>
        </section>
  );
}

import { CheckCircle2, Clock } from "lucide-react";

const TIMELINE = [
  { label: "Application Opens", date: "1 July, 2026", done: true },
  { label: "Application Deadline", date: "31 July, 2026", done: true },
  { label: "Shortlisting", date: "10 August, 2026", done: false },
  { label: "Interviews", date: "15 - 20 August, 2026", done: false },
  { label: "Start Date", date: "1 September, 2026", done: false },
];

export default function OpportunityTimeline() {
  return (
    <section className="rounded-[18px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-semibold text-gray-900">
        Application Timeline
      </h2>

      <div className="mt-6 overflow-x-auto">
        <div className="flex min-w-[680px] items-start gap-3">
          {TIMELINE.map((step, index) => (
            <div
              key={step.label}
              className="relative flex flex-1 min-w-[130px] flex-col items-center text-center"
            >
              {index > 0 && (
                <span className="absolute -left-6 top-[13px] h-px w-[calc(100%+24px)] bg-gray-200" />
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
  );
}

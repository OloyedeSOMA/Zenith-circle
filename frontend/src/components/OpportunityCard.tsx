import Link from "next/link";
import Image from "next/image";
import { Bookmark, MapPin } from "lucide-react";

import { Opportunity, OpportunityTag } from "@/types/opportunity";
import { trackEvent } from "@/lib/gtag";

const TAG_STYLES: Record<OpportunityTag, string> = {
  New: "bg-[#D8F0D4] text-[#2F6D37]",
  Featured: "bg-[#FFE6CC] text-[#F08A24]",
  "Closing soon": "bg-[#FFE1E1] text-[#E53935]",
};

const TYPE_STYLES: Record<string, string> = {
  Internship: "bg-[#5DCB7B] text-[#2B5A35]",
  Scholarship: "bg-[#5DCB7B] text-[#2B5A35]",
  job: "bg-[#FFD59D] text-[#D97500]",
  "Graduate Program": "bg-[#FFD59D] text-[#D97500]",
  internship: "bg-[#5DCB7B] text-[#2B5A35]",
  scholarship: "bg-[#5DCB7B] text-[#2B5A35]",
  "graduate program": "bg-[#FFD59D] text-[#D97500]",
};

const MODE_STYLES: Record<string, string> = {
  Hybrid: "bg-[#F2E5E5] text-[#7A6F6F]",
  Remote: "bg-[#F2E5E5] text-[#7A6F6F]",
  "On-site": "bg-[#F2E5E5] text-[#7A6F6F]",
  "Full time": "bg-[#F2E5E5] text-[#7A6F6F]",
  "Part time": "bg-[#F2E5E5] text-[#7A6F6F]",
  remote: "bg-[#F2E5E5] text-[#7A6F6F]",
  hybrid: "bg-[#F2E5E5] text-[#7A6F6F]",
  onsite: "bg-[#F2E5E5] text-[#7A6F6F]",
};

const formatDeadline = (value?: string) => {
  if (!value) return "N/A";

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
};

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export default function OpportunityCard({
  opportunity,
}: OpportunityCardProps) {
  const {
    slug,
    title,
    organisation,
    organisation_logo,
    location,
    opportunity_type,
    field,
    deadline,
    is_remote,
  } = opportunity;

  const tag = opportunity.tag ?? "New";
  const logo = organisation_logo || "/jobimage1.png";
  const company = organisation || "Unknown organisation";
  const workMode = is_remote ? "Remote" : "On-site";
  const type = opportunity_type || field || "Opportunity";
  const commitment = field || "General";
  const formattedDeadline = formatDeadline(deadline);

  return (
    <Link
      href={`/opportunities/${slug || ""}`}
      onClick={() =>
        trackEvent("select_opportunity", {
          opportunity_id: slug,
          opportunity_title: title,
          company_name: company,
        })
      }
      className="flex h-auto w-full max-w-[310px] flex-col items-center overflow-hidden rounded-lg border border-primary bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="w-full flex flex-col">
      {/* Header */}

      <div className="flex items-start justify-between px-2 pt-5">
        <span
          className={`flex h-[35px] w-auto items-center rounded-lg p-5 text-sm font-medium ${TAG_STYLES[tag]}`}
        >
          {tag}
        </span>

        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="text-secondary transition hover:text-primary"
        >
          <Bookmark size={20} strokeWidth={1.8} />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-2 pt-5 gap-1">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={logo}
            alt={company}
            width={40}
            height={40}
            unoptimized
            className="h-full w-full object-contain"
          />
        </div>

        <h3 className="mt-5 min-h-[48px] line-clamp-2 text-[14px] font-semibold leading-6 text-secondary">
          {title}
        </h3>

        <p className="mt-1 min-h-[30px] line-clamp-2 text-base text-gray-500">
          {company}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {field}
        </p>

        <div className="mt-1 flex items-center gap-1">
          <MapPin
            size={18}
            className="shrink-0 text-secondary"
          />

          <span className="text-base text-secondary">
            {location}
          </span>

          <span
            className={`flex h-[33px] w-auto items-center rounded-xl px-4 text-sm ${
              MODE_STYLES[workMode]
            }`}
          >
            {workMode}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className={`flex h-[33px] items-center rounded-xl px-5 text-sm font-medium ${
              TYPE_STYLES[type.toLowerCase()]
            }`}
          >
            {type}
          </span>
        </div>

        <div className="mt-auto border-t w-full border-gray-200 px-2 py-4">
          <p className="text-base">
            <span className="font-semibold text-secondary">
              Deadline:
            </span>{" "}
            <span className="text-secondary">
              {formattedDeadline}
            </span>
          </p>
        </div>
      </div>
      </div>
    </Link>
  );
}

export function OpportunityCardSkeleton() {
  return (
    <div className="flex h-[284px] w-full max-w-[298px] flex-col overflow-hidden rounded-2xl border border-primary bg-white animate-pulse">
      <div className="flex items-start justify-between px-5 pt-5">
        <div className="h-[35px] w-14 rounded-lg bg-gray-200" />
        <div className="h-5 w-5 rounded bg-gray-200" />
      </div>

      <div className="flex flex-1 flex-col px-5 pt-5">
        <div className="h-10 w-10 rounded-full bg-gray-200" />

        <div className="mt-5 h-4 w-4/5 rounded bg-gray-200" />
        <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />

        <div className="mt-4 h-4 w-2/3 rounded bg-gray-200" />

        <div className="mt-4 flex gap-2">
          <div className="h-[33px] w-[98px] rounded-xl bg-gray-200" />
          <div className="h-[33px] w-[78px] rounded-xl bg-gray-200" />
        </div>

        <div className="mt-auto -mx-5 border-t border-gray-200 px-5 py-4">
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

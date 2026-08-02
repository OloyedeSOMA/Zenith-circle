import Image from "next/image";
import {
  Building2,
  Bookmark,
  ExternalLink,
  FileText,
  MapPin,
  Share2,
} from "lucide-react";

import { Opportunity } from "@/types/opportunity";

interface OpportunityDetailsHeaderProps {
  opportunity: Opportunity;
}

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

export default function OpportunityDetailsHeader({
  opportunity,
}: OpportunityDetailsHeaderProps) {
  const {
    organisation,
    organisation_logo,
    title,
    location,
    opportunity_type,
    field,
    deadline,
    is_remote,
  } = opportunity;

  const company = organisation || "Unknown organisation";
  const logo = organisation_logo || "/jobimage1.png";
  const workMode = is_remote ? "Remote" : "On-site";
  const type = opportunity_type || field || "Opportunity";
  const commitment = field || "General";

  return (
    <div className="flex flex-col gap-6 border-b border-gray-200 pb-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white">
            <Image
              src={logo}
              alt={`${company} logo`}
              width={48}
              height={48}
              unoptimized
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-[28px]">
              {title}
            </h1>
            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              {company}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            {type}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
            {commitment}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {location}
          </span>
          <span className="flex items-center gap-1.5">
            <Building2 size={16} className="shrink-0" />
            {workMode}
          </span>
          <span className="flex items-center gap-1.5">
            <FileText size={16} className="shrink-0" />
            Deadline: <span className="font-semibold text-red-600">{formatDeadline(deadline)}</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
        >
          Apply Now
          <ExternalLink size={16} />
        </button>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Saved Opportunity
            <Bookmark size={16} />
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Share
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
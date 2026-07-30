import Image from "next/image";
import {
  MapPin,
  Building2,
  FileText,
  Bookmark,
  Share2,
  ExternalLink,
} from "lucide-react";
import { Opportunity } from "@/types/opportunity";

interface OpportunityDetailsHeaderProps {
  opportunity: Opportunity;
}

export default function OpportunityDetailsHeader({
  opportunity,
}: OpportunityDetailsHeaderProps) {
  const {
    logo,
    title,
    company,
    location,
    workMode,
    commitment,
    deadline,
    postedAt,
  } = opportunity;

  return (
    <div className="flex flex-wrap items-start justify-between gap-6 border-b border-gray-200 pb-6">
      {/* Identity + meta — grows, wraps freely on small screens */}
      <div className="min-w-[260px] flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white">
            <Image
              src={logo}
              alt={`${company} logo`}
              width={24}
              height={24}
              className="h-full w-full object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            {title}
          </h1>
        </div>

        <p className="mt-1 text-gray-500">{company}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {location}
          </span>
          <span className="flex items-center gap-1.5">
            <Building2 size={16} className="shrink-0" />
            {workMode}
          </span>
          <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
            {commitment}
          </span>
          {postedAt && (
            <span className="flex items-center gap-1.5">
              <FileText size={16} className="shrink-0" />
              {postedAt}
            </span>
          )}
          <span>
            Deadline:{" "}
            <span className="font-medium text-red-600">{deadline}</span>
          </span>
        </div>
      </div>

      {/* Actions — wraps below identity block on narrow screens */}
      <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-900"
        >
          Apply Now
          <ExternalLink size={16} />
        </button>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Saved Opportunity
            <Bookmark size={16} />
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Share
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
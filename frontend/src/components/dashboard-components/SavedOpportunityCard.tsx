"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, Building2, CalendarDays, MapPin, MoreVertical } from "lucide-react";
import { useState } from "react";
import { Opportunity as SavedOpportunityData } from "@/types/savedOpportunity";
import { useRemoveSave } from "@/hooks/useSaved";
import {
  removeSavedOpportunity,
} from "@/lib/opportunity-storage";

interface SavedOpportunityCardProps {
  opportunity: SavedOpportunityData;
  onRemoved?: (opportunityId: string) => void;
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

const formatPostedDate = (value?: string) => {
  if (!value) return "Posted recently";

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Posted recently";
  }

  const now = new Date();
  const difference = now.getTime() - parsedDate.getTime();

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (days <= 0) return "Posted today";
  if (days === 1) return "Posted a day ago";
  if (days < 7) return `Posted ${days} days ago`;
  if (days < 14) return "Posted a week ago";
  if (days < 30) {
    return `Posted ${Math.floor(days / 7)} weeks ago`;
  }

  return `Posted ${Math.floor(days / 30)} months ago`;
};

export default function SavedOpportunityCard({
  opportunity,
  onRemoved,
}: SavedOpportunityCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const { mutate: removeSave } = useRemoveSave();

  const {
    id,
    slug,
    title,
    organisation,
    organisation_logo,
    location,
    opportunity_type,
    field,
    deadline,
    is_remote,
    created_at,
  } = opportunity;

  const company = organisation || "Unknown organisation";
  const logo = organisation_logo || "/jobimage1.png";
  const workMode = is_remote ? "Hybrid" : "On-site";
  const type = opportunity_type || "Opportunity";
  const commitment = field || "General";

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isRemoving) return;

    setIsRemoving(true);

    removeSave(id, {
      onSuccess: () => {
        removeSavedOpportunity(id);
        onRemoved?.(id);
        setIsRemoving(false);
      },
      onError: () => {
        setIsRemoving(false);
      },
    });
  };

  return (
    <article
      className={`w-full rounded-lg border border-primary bg-white transition-all duration-200 ${
        isRemoving ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <div className="grid grid-cols-[48px_minmax(0,1fr)_auto] gap-4 px-4 py-4 sm:grid-cols-[56px_minmax(0,1fr)_auto] sm:px-5 sm:py-5">
        {/* Logo */}
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-white sm:h-14 sm:w-14">
          <Image
            src={logo}
            alt={`${company} logo`}
            width={44}
            height={44}
            unoptimized
            className="h-10 w-10 object-contain sm:h-11 sm:w-11"
          />
        </div>

        {/* Main information */}
        <div className="min-w-0">
          <Link
            href={`/opportunities/${slug || id}`}
            className="block w-fit max-w-full"
          >
            <h3 className="truncate text-sm font-bold text-gray-900 transition hover:text-primary sm:text-base">
              {title}
            </h3>
          </Link>

          <p className="mt-0.5 truncate text-xs text-gray-500 sm:text-sm">
            {company}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] text-gray-500 sm:text-xs">
            <span className="flex items-center gap-1">
              <MapPin size={12} className="shrink-0" />
              <span className="max-w-[120px] truncate">
                {location || "Location not specified"}
              </span>
            </span>

            <span className="flex items-center gap-1">
              <Building2 size={12} className="shrink-0" />
              {workMode}
            </span>

            <span className="rounded-md bg-[#FFD59D] px-2 py-1 font-medium text-[#D97500]">
              {commitment}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[10px] sm:text-xs">
            <span className="flex items-center gap-1 text-gray-500">
              <CalendarDays size={12} className="shrink-0" />
              {formatPostedDate(created_at)}
            </span>

            <span className="text-gray-500">
              Deadline:{" "}
              <span className="font-medium text-red-500">
                {formatDeadline(deadline)}
              </span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex min-w-[80px] flex-col items-end justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleRemove}
              disabled={isRemoving}
              aria-label="Remove saved opportunity"
              className="rounded-md p-1.5 text-primary transition hover:bg-primary/10 disabled:cursor-not-allowed"
            >
              <Bookmark
                size={16}
                fill="currentColor"
                strokeWidth={1.8}
              />
            </button>

            <button
              type="button"
              aria-label="More options"
              className="rounded-md p-1.5 text-gray-500 transition hover:bg-gray-100"
            >
              <MoreVertical size={16} />
            </button>
          </div>

          <Link
            href={`/opportunities/${slug || id}`}
            className="text-[10px] font-medium text-gray-500 transition hover:text-primary sm:text-xs"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
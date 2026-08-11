import Image from "next/image";
import { MapPin, Bookmark } from "lucide-react";
import { Opportunity } from "@/types/opportunity";
import { formatDeadline } from "@/components/OpportunityDetailsHeader";

interface OpportunityCardProps {
  opportunity: Opportunity;
  onToggleSave?: (opportunity: Opportunity) => void;
}

const isClosingSoon = (deadline?: string) => {
  if (!deadline) return false;
  const daysLeft = (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  return daysLeft >= 0 && daysLeft <= 7;
};

const OpportunityCard = ({ opportunity, onToggleSave }: OpportunityCardProps) => {
  const {
    title,
    organisation,
    organisation_logo,
    location,
    is_remote,
    field,
    opportunity_type,
    deadline,
    is_saved,
  } = opportunity;

  return (
    <div className="flex flex-col gap-3 rounded-[16px] border border-gray-100 bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-100 bg-white">
          <Image
            src={organisation_logo || "/jobimage1.png"}
            alt={organisation}
            width={20}
            height={20}
            unoptimized
            className="h-5 w-5 object-contain"
          />
        </div>

        <div className="flex items-center gap-2">
          {isClosingSoon(deadline) && (
            <span className="rounded-full bg-[#fbe1e5] px-2 py-0.5 text-[10px] font-semibold text-[#c23b55]">
              Closing soon
            </span>
          )}
          <button
            type="button"
            onClick={() => onToggleSave?.(opportunity)}
            aria-label="Save opportunity"
            className="text-gray-400 transition hover:text-[#2b6b41]"
          >
            <Bookmark size={16} fill={is_saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="line-clamp-1 text-sm font-semibold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500">{organisation}</p>
      </div>

      <div className="flex items-center gap-1 text-xs text-gray-500">
        <MapPin size={13} />
        {location}
        {typeof is_remote === "boolean" && (
          <span className="text-gray-400">· {is_remote ? "Remote" : "On-site"}</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {field && (
          <span className="rounded-full bg-[#d5f4cf] px-2.5 py-1 text-[11px] font-semibold text-[#1b6b3a]">
            {field}
          </span>
        )}
        {opportunity_type && (
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium capitalize text-gray-600">
            {opportunity_type}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-400">Deadline: {formatDeadline(deadline)}</p>
    </div>
  );
};

export default OpportunityCard;
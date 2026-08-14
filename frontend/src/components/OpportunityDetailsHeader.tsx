"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Building2,
  Bookmark,
  ExternalLink,
  FileText,
  MapPin,
  Share2,
} from "lucide-react";

import { Opportunity } from "@/types/opportunity";
import { requireStudentAccess } from "@/lib/access-guard";
import StatusModal from "@/components/StatusModal";
import { trackEvent } from "@/lib/gtag";
import { useSave, useRemoveSave } from "@/hooks/useSaved";
import {
  addAppliedOpportunity,
  addSavedOpportunity,
  isOpportunityApplied,
  isOpportunitySaved,
  removeSavedOpportunity,
} from "@/lib/opportunity-storage";

interface OpportunityDetailsHeaderProps {
  opportunity: Opportunity;
}

export const formatDeadline = (value?: string) => {
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
  const router = useRouter();

  const [roleMismatchMessage, setRoleMismatchMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const { mutate: save, isPending: isSaving } = useSave();
  const { mutate: removeSave, isPending: isRemoving } = useRemoveSave();

  const {
    id,
    organisation,
    organisation_logo,
    title,
    location,
    opportunity_type,
    application_url,
    field,
    deadline,
    is_remote,
    created_at,
  } = opportunity;

  const company = organisation || "Unknown organisation";
  const logo = organisation_logo || "/jobimage1.png";
  const workMode = is_remote ? "Remote" : "On-site";
  const type = opportunity_type || field || "Opportunity";
  const commitment = field || "General";

  useEffect(() => {
    if (!id) return;

    setIsSaved(isOpportunitySaved(id));
    setIsApplied(isOpportunityApplied(id));
  }, [id]);

  const handleApply = () => {
    requireStudentAccess(router, {
      onSuccess: () => {
        if (!id) return;

        addAppliedOpportunity(id);
        setIsApplied(true);

        trackEvent("apply_opportunity", {
          opportunity_id: id,
          opportunity_title: title,
          company_name: company,
          application_link: application_url,
        });

        if (application_url) {
          window.open(
            application_url,
            "_blank",
            "noopener,noreferrer"
          );
        }
      },

      onRoleMismatch: () =>
        setRoleMismatchMessage(
          "Only student accounts can apply for opportunities."
        ),
    });
  };

  const handleSave = () => {
    if (!id || isSaving || isRemoving) return;

    requireStudentAccess(router, {
      onSuccess: () => {
        if (isSaved) {
          removeSave(id, {
            onSuccess: () => {
              removeSavedOpportunity(id);
              setIsSaved(false);

              trackEvent("remove_saved_opportunity", {
                opportunity_id: id,
                opportunity_title: title,
                company_name: company,
              });
            },
          });

          return;
        }

        save(id, {
          onSuccess: () => {
            addSavedOpportunity(id);
            setIsSaved(true);

            trackEvent("save_opportunity", {
              opportunity_id: id,
              opportunity_title: title,
              company_name: company,
            });
          },
        });
      },

      onRoleMismatch: () =>
        setRoleMismatchMessage(
          "Only student accounts can save opportunities."
        ),
    });
  };

  const isSavingOrRemoving = isSaving || isRemoving;

  return (
    <>
      <div className="flex flex-col gap-6 border-b border-primary pb-6 lg:flex-row lg:items-start lg:justify-between">
        {/* Left section */}
        <div className="flex-1">
          <div className="grid grid-cols-[80px_1fr] gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-gray-200 bg-white p-3">
              <Image
                src={logo}
                alt={`${company} logo`}
                width={56}
                height={56}
                unoptimized
                className="h-14 w-14 object-contain"
              />
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-[28px]">
                {title}
              </h1>

              <p className="text-base text-gray-600">
                {company}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  {location}
                </span>

                <span className="flex items-center gap-1.5">
                  <Building2 size={16} />
                  {workMode}
                </span>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {type}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  {commitment}
                </span>

                <span className="flex items-center gap-1.5">
                  <FileText size={16} />
                  Posted at:
                  <span className="font-semibold">
                    {formatDeadline(created_at)}
                  </span>
                </span>

                <span className="flex items-center gap-1.5">
                  Deadline:
                  <span className="font-semibold text-red-600">
                    {formatDeadline(deadline)}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex w-full flex-col items-center gap-3 lg:w-[190px]">
          <button
            type="button"
            onClick={handleApply}
            className={`inline-flex w-full items-center justify-center gap-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-900 ${
              isApplied ? "opacity-90" : ""
            }`}
          >
            {isApplied ? "Applied" : "Apply Now"}
            <ExternalLink size={16} />
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSavingOrRemoving}
            className={`inline-flex w-full items-center justify-center gap-1 rounded-xl px-4 py-3 text-sm font-medium transition ${
              isSaved
                ? "border border-primary bg-primary text-white"
                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
            } ${
              isSavingOrRemoving
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
          >
            {isSaved ? "Saved Opportunity" : "Save Opportunity"}

            <Bookmark
              size={16}
              fill={isSaved ? "currentColor" : "none"}
            />
          </button>

          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center gap-2 text-sm font-medium text-gray-700"
          >
            Share
            <Share2 size={16} />
          </button>
        </div>

        <StatusModal
          open={!!roleMismatchMessage}
          type="error"
          message={roleMismatchMessage}
          buttonText="Okay"
          onButtonClick={() => setRoleMismatchMessage("")}
          onClose={() => setRoleMismatchMessage("")}
        />
      </div>
    </>
  );
}
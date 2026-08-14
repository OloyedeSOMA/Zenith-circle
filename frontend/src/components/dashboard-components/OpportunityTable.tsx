"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

import { useDeleteOpportunity } from "@/hooks/useOpportunity";

interface OpportunityTableProps {
  opportunities: any[];
  emptyMessage?: string;
}

const formatDate = (date: string) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusStyles = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "approved":
      return "bg-[#d5f4cf] text-[#1b6b3a]";

    case "pending":
      return "bg-[#fce1cd] text-[#b5610a]";

    case "rejected":
      return "bg-[#f9d8d8] text-[#b42318]";

    default:
      return "bg-[#eeeeee] text-[#666666]";
  }
};

export default function OpportunityTable({
  opportunities,
  emptyMessage = "No opportunities found.",
}: OpportunityTableProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const deleteMutation = useDeleteOpportunity();

  const handleDelete = (id: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) return;

    deleteMutation.mutate(id);

    setOpenMenu(null);
  };

  if (opportunities.length === 0) {
    return (
      <div className="flex min-h-[260px] items-center justify-center">
        <p className="text-sm text-[#70696b]">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[700px] border-collapse">
        <thead>
          <tr className="border-b border-[#eeeeee]">
            <th className="px-5 py-4 text-left text-xs font-semibold text-[#1f1f1f]">
              Title
            </th>

            <th className="px-5 py-4 text-left text-xs font-semibold text-[#1f1f1f]">
              Category
            </th>

            <th className="px-5 py-4 text-left text-xs font-semibold text-[#1f1f1f]">
              Submitted On
            </th>

            <th className="px-5 py-4 text-left text-xs font-semibold text-[#1f1f1f]">
              Status
            </th>

            <th className="w-[60px] px-3 py-4"></th>
          </tr>
        </thead>

        <tbody>
          {opportunities.map((opportunity) => (
            <tr
              key={opportunity.id}
              className="border-b border-[#eeeeee] last:border-b-0 hover:bg-[#fafafa]"
            >
              {/* Title */}
              <td className="max-w-[300px] px-5 py-5">
                <p
                  className="truncate text-sm font-medium text-[#1f1f1f]"
                  title={opportunity.title}
                >
                  {opportunity.title}
                </p>
              </td>

              {/* Category */}
              <td className="px-5 py-5">
                <span className="text-sm text-[#514a4c]">
                  {opportunity.opportunity_type
                    ? opportunity.opportunity_type
                        .charAt(0)
                        .toUpperCase() +
                      opportunity.opportunity_type.slice(1)
                    : "—"}
                </span>
              </td>

              {/* Date */}
              <td className="px-5 py-5">
                <span className="text-sm text-[#514a4c]">
                  {formatDate(opportunity.created_at)}
                </span>
              </td>

              {/* Status */}
              <td className="px-5 py-5">
                <span
                  className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${getStatusStyles(
                    opportunity.status
                  )}`}
                >
                  {opportunity.status
                    ? opportunity.status.charAt(0).toUpperCase() +
                      opportunity.status.slice(1)
                    : "Pending"}
                </span>
              </td>

              {/* Actions */}
              <td className="relative px-3 py-5">
                <button
                  type="button"
                  aria-label={`Options for ${opportunity.title}`}
                  onClick={() =>
                    setOpenMenu(
                      openMenu === opportunity.id
                        ? null
                        : opportunity.id
                    )
                  }
                  className="rounded-lg p-2 text-[#70696b] transition hover:bg-gray-100 hover:text-[#1f1f1f]"
                >
                  <MoreVertical size={18} />
                </button>

                {openMenu === opportunity.id && (
                  <div className="absolute right-3 top-[48px] z-20 w-[150px] overflow-hidden rounded-lg border border-[#e5e5e5] bg-white py-1 shadow-lg">
                    <Link
                      href={`/recruiter-dashboard/create-opportunity?edit=${opportunity.id}`}
                      onClick={() => setOpenMenu(null)}
                      className="flex items-center gap-2 px-3 py-2.5 text-sm text-[#1f1f1f] hover:bg-[#f7f7f7]"
                    >
                      <Pencil size={15} />
                      Edit
                    </Link>

                    <button
                      type="button"
                      disabled={deleteMutation.isPending}
                      onClick={() =>
                        handleDelete(
                          opportunity.id,
                          opportunity.title
                        )
                      }
                      className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-[#b42318] hover:bg-[#fff5f5] disabled:opacity-50"
                    >
                      <Trash2 size={15} />
                      {deleteMutation.isPending
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
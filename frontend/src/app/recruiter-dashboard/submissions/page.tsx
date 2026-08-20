"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import OpportunityTable from "@/components/dashboard-components/OpportunityTable";
import { useMyOpportunities } from "@/hooks/useOpportunity";

export default function SubmissionsPage() {
  const {
    data,
    isLoading,
    isError,
  } = useMyOpportunities();

  const opportunities = data ?? [];

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/recruiter-dashboard"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[#70696b] hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <h1 className="text-xl font-bold text-[#1f1f1f]">
            My Submissions
          </h1>

          <p className="mt-1 text-sm text-[#70696b]">
            View and manage all the opportunities you have created.
          </p>
        </div>
      </div>
      <section className="rounded-[16px] border border-[#a9aaa4] bg-white">

        <div className="flex items-center justify-between border-b border-[#eeeeee] px-5 py-4">
          <div>
            <h2 className="text-base font-bold text-[#1f1f1f]">
              All Opportunities
            </h2>

            <p className="mt-1 text-sm text-[#70696b]">
              {opportunities.length}{" "}
              {opportunities.length === 1
                ? "opportunity"
                : "opportunities"}{" "}
              created
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-[#70696b]">
              Loading submissions...
            </p>
          </div>
        ) : isError ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-red-500">
              Unable to load your submissions.
            </p>
          </div>
        ) : (
          <OpportunityTable
            opportunities={opportunities}
            emptyMessage="You haven't created any opportunities yet."
          />
        )}
      </section>
    </div>
  );
}
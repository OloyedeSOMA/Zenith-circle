"use client";

import Link from "next/link";
import { Plus, FileText } from "lucide-react";
import StatSection from "./StatSection";
import OpportunityTable from "./OpportunityTable";
import { useMyOpportunities } from "@/hooks/useOpportunity";

export default function RecruiterDashboard() {
  const {
    data,
    isLoading,
    isError,
  } = useMyOpportunities();

  const opportunities = data ?? [];

  const totalOpportunities = opportunities.length;

  const pendingOpportunities = opportunities.filter(
    (opportunity: any) =>
      opportunity.status?.toLowerCase() === "pending"
  ).length;

  const approvedOpportunities = opportunities.filter(
    (opportunity: any) =>
      opportunity.status?.toLowerCase() === "approved"
  ).length;

  const totalApplications = opportunities.reduce(
    (total: number, opportunity: any) =>
      total + (opportunity.application_count ?? 0),
    0
  );

  const stats = [
    {
      value: totalOpportunities,
      label: "Total Opportunities",
      sublabel: "All opportunities created",
      color: "orange" as const,
    },
    {
      value: pendingOpportunities,
      label: "Pending Review",
      sublabel: "Awaiting approval",
      color: "purple" as const,
    },
    {
      value: approvedOpportunities,
      label: "Published",
      sublabel: "Approved opportunities",
      color: "green" as const,
    },
    {
      value: totalApplications,
      label: "Applications",
      sublabel: "Applications received",
      color: "blue" as const,
    },
  ];

  const recentOpportunities = opportunities.slice(0, 5);

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#1f1f1f]">
            Welcome back, Recruiter 👋
          </h1>

          <p className="mt-1 text-sm text-[#70696b]">
            Here&apos;s what&apos;s happening with your opportunities.
          </p>
        </div>

        <Link
          href="/recruiter-dashboard/create-opportunity"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white transition hover:opacity-90"
        >
          <Plus size={18} />
          Create New Opportunity
        </Link>
      </div>

      <StatSection stats={stats} />
      <section className="rounded-[16px] border border-[#a9aaa4] bg-white">

        <div className="flex items-center justify-between border-b border-[#eeeeee] px-5 py-4">
          <div>
            <h2 className="text-base font-bold text-[#1f1f1f]">
              Recent Submissions
            </h2>

            <p className="mt-1 text-sm text-[#70696b]">
              Your recently created opportunities
            </p>
          </div>

          <Link
            href="/recruiter-dashboard/submissions"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        
        {isLoading ? (
          <div className="flex min-h-[260px] items-center justify-center">
            <p className="text-sm text-[#70696b]">
              Loading opportunities...
            </p>
          </div>
        ) : isError ? (
          <div className="flex min-h-[260px] items-center justify-center">
            <p className="text-sm text-red-500">
              Unable to load your opportunities.
            </p>
          </div>
        ) : opportunities.length === 0 ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center px-5 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3f3f3]">
              <FileText
                size={22}
                className="text-primary"
              />
            </div>

            <h3 className="text-sm font-semibold text-[#1f1f1f]">
              No opportunities yet
            </h3>

            <p className="mt-1 max-w-sm text-sm text-[#70696b]">
              Create your first opportunity to start
              reaching qualified candidates.
            </p>

            <Link
              href="/recruiter-dashboard/create-opportunity"
              className="mt-4 text-sm font-medium text-primary hover:underline"
            >
              Create an opportunity
            </Link>
          </div>
        ) : (
          <OpportunityTable
            opportunities={recentOpportunities}
          />
        )}
      </section>
    </div>
  );
}
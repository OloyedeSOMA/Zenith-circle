"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";
import { fetchOpportunities } from "@/data/opportunities";
import OpportunityCard, {
  OpportunityCardSkeleton,
} from "./OpportunityCard";
import Pagination from "./Pagination";

const PER_PAGE = 8;

export default function OpportunitiesSection() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["opportunities", page],
    queryFn: () => fetchOpportunities({ page, perPage: PER_PAGE }),
    placeholderData: keepPreviousData,
  });

  const opportunities = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="w-full max-w-[100%] flex justify-center mb-40">
      <div className="mx-auto w-[90%] max-w-[1276px] flex flex-col gap-2">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Recommended for you
            </h2>
            <p className="text-sm text-gray-500">
              Opportunities handpicked based on your profile and interests
            </p>
          </div>
          <Link
            href="/opportunities"
            className="hidden text-sm font-medium text-gray-700 hover:underline sm:block"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 sm:place-items-stretch lg:grid-cols-4">
          {isLoading || isFetching
            ? Array.from({ length: PER_PAGE }).map((_, i) => (
                <OpportunityCardSkeleton key={i} />
              ))
            : opportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
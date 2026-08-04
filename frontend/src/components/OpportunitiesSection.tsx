"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchOpportunities } from "@/lib/opportunity-api";
import OpportunityCard, {
  OpportunityCardSkeleton,
} from "./OpportunityCard";
import Pagination from "./Pagination";
import NoOpportunitiesFound from "./NoOpportunitiesFound";

const PER_PAGE = 16;

interface OpportunitiesSectionProps {
  search?: string;
  filters?: {
    opportunity_type?: string;
    field?: string;
    organisation?: string;
    location?: string;
    is_remote?: boolean;
  };
}

export default function OpportunitiesSection({
  search = "",
  filters = {},
}: OpportunitiesSectionProps) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search, filters]);

  const queryParams = useMemo(() => ({
    page: 1,
    page_size: 200,
    search: search.trim() || undefined,
  }), [search]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["opportunities", queryParams],
    queryFn: () => fetchOpportunities(queryParams),
  });

  const opportunities = data?.results ?? [];

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const matchesType =
        !filters.opportunity_type ||
        opportunity.opportunity_type?.toLowerCase() ===
          filters.opportunity_type.toLowerCase();

      const matchesField =
        !filters.field ||
        opportunity.field?.toLowerCase() === filters.field.toLowerCase();

      const matchesOrganisation =
        !filters.organisation ||
        opportunity.organisation?.toLowerCase() ===
          filters.organisation.toLowerCase();

      const matchesLocation =
        !filters.location ||
        (filters.location === "Remote"
          ? opportunity.is_remote === true
          : opportunity.location?.toLowerCase() ===
            filters.location.toLowerCase());

      const matchesRemote =
        typeof filters.is_remote !== "boolean" ||
        filters.is_remote === opportunity.is_remote;

      return (
        matchesType &&
        matchesField &&
        matchesOrganisation &&
        matchesLocation &&
        matchesRemote
      );
    });
  }, [opportunities, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredOpportunities.length / PER_PAGE));
  const paginatedOpportunities = filteredOpportunities.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="my-8">
    <div className="grid grid-cols-1 place-items-center gap-1 sm:grid-cols-2 sm:place-items-stretch lg:grid-cols-4">
      {isLoading || isFetching
        ? Array.from({ length: PER_PAGE }).map((_, i) => (
            <OpportunityCardSkeleton key={i} />
          ))
        : paginatedOpportunities.length > 0
          ? paginatedOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
              />
            ))
          : (
              <NoOpportunitiesFound />
            )}
    </div>

    <Pagination
      page={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
    </div>
  );
}
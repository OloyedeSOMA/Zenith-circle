"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { fetchOpportunities } from "@/lib/opportunity-api";
import OpportunityCard, {
  OpportunityCardSkeleton,
} from "@/components/OpportunityCard";
import NoOpportunitiesFound from "@/components/NoOpportunitiesFound";

const RECOMMENDED_COUNT = 6;

const RecommendedOpportunities = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["recommended-opportunities"],
    queryFn: () =>
      fetchOpportunities({
        page: 1,
        page_size: RECOMMENDED_COUNT,
      }),
  });

  const opportunities = data?.results ?? [];

  const loading = isLoading || isFetching;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Recommended for you
          </h2>

          <p className="text-sm text-gray-400">
            Opportunities handpicked based on your profile and interests
          </p>
        </div>

        <Link
          href="/opportunities"
          className="text-sm font-medium text-[#2b6b41]"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: RECOMMENDED_COUNT }).map((_, index) => (
            <OpportunityCardSkeleton key={index} />
          ))
        ) : opportunities.length > 0 ? (
          opportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
            />
          ))
        ) : (
          <NoOpportunitiesFound />
        )}
      </div>
    </div>
  );
};

export default RecommendedOpportunities;
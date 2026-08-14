"use client";

import { useGetSavedOpportunities } from "@/hooks/useSaved";
import NoOpportunitiesFound from "@/components/NoOpportunitiesFound";
import SavedOpportunityCard from "./SavedOpportunityCard";

export default function SavedOpportunities() {
  const {
    data: savedOpportunities,
    isError,
  } = useGetSavedOpportunities();
  //const opportunities = SavedOpportunities?.results ?? [];

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-500">
          Unable to load your saved opportunities.
        </p>
      </div>
    );
  }

  if (!savedOpportunities || savedOpportunities.length === 0) {
    return <NoOpportunitiesFound />;
  }

  return (
    <section className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Saved Opportunities
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          All the opportunities you&apos;ve saved for later
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {savedOpportunities.map((savedOpportunity) => (
          <SavedOpportunityCard
            key={savedOpportunity.id}
            opportunity={savedOpportunity.opportunity}
          />
        ))}
      </div>
    </section>
  );
}
import Link from "next/link";
import { notFound } from "next/navigation";

import HeaderNav from "@/components/HeaderNav";
import OpportunityDetailsHeader from "@/components/OpportunityDetailsHeader";
import OpportunityOverviewPanel from "@/components/OpportunityOverviewPanel";
import OpportunityTimeline from "@/components/OpportunityTimeline";
import Footer from "@/components/Footer";
import { fetchOpportunityBySlug } from "@/lib/opportunity-api";

interface OpportunityDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function OpportunityDetailsPage({
  params,
}: OpportunityDetailsPageProps) {
  const { id } = await params;

  let opportunity;

  try {
    opportunity = await fetchOpportunityBySlug(id);
  } catch {
    notFound();
  }

  if (!opportunity) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full">
      <HeaderNav />

      <main className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/opportunities" className="hover:text-primary">
            Opportunities
          </Link>
          <span>/</span>
          <span className="text-gray-700">Details</span>
        </div>

        <section className="overflow-hidden rounded-[24px] border border-primary ">
          <div className="p-4 sm:p-6 lg:p-8">
            <OpportunityDetailsHeader opportunity={opportunity} />
            <div className="relative my-6">
              <h2 className="absolute left-1/2 -top-3 -translate-x-1/2 bg-white px-4 text-lg font-semibold text-gray-900">
                Overview
              </h2>
            </div>
            <div className="mt-6 border-t border-gray-200 pt-6">
              <OpportunityOverviewPanel description={opportunity.description} />
            </div>

            <div className="mt-6">
              <OpportunityTimeline creationDate={opportunity.created_at} deadline={opportunity.deadline}/>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
